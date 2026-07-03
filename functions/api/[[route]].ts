import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import type { Env, CMSData, Client, Order, Booking, Branch } from '../types';
import { defaultCMSData, deepMergeDefaults } from '../cms/default';

const app = new Hono<{ Bindings: Env }>().basePath('/api');

app.use('*', async (c, next) => {
  const origin = c.req.header('Origin') || '*';
  c.header('Access-Control-Allow-Origin', origin);
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.header('Access-Control-Allow-Credentials', 'true');
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  await next();
});

const CMS_KEY = 'cms:data';
const DEFAULT_USER = 'twmeric';
const DEFAULT_PASS = 'admin360';

// ---------- JWT helpers ----------

async function signJWT(payload: object, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const header = { alg: 'HS256', typ: 'JWT' };
  const b64Header = btoa(JSON.stringify(header));
  const b64Payload = btoa(JSON.stringify(payload));
  const data = `${b64Header}.${b64Payload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const b64Sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `${data}.${b64Sig}`;
}

async function verifyJWT(token: string, secret: string): Promise<{ username: string } | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [h, p, s] = parts;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const signatureBytes = Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(`${h}.${p}`)
  );
  if (!valid) return null;
  try {
    const payload = JSON.parse(atob(p));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// ---------- Auth middleware ----------

async function authMiddleware(c: any, next: any) {
  const auth = c.req.header('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const payload = await verifyJWT(token, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ error: 'Invalid token' }, 401);
  }
  c.set('user', payload);
  await next();
}

// ---------- CMS routes ----------

app.get('/cms', async (c) => {
  const stored = await c.env.CMS_KV.get<CMSData>(CMS_KEY, 'json');
  const data = stored ? deepMergeDefaults(stored) : defaultCMSData;
  return c.json(data);
});

app.put('/cms', authMiddleware, async (c) => {
  const body = await c.req.json<Partial<CMSData>>();
  const stored = await c.env.CMS_KV.get<CMSData>(CMS_KEY, 'json');
  const merged = deepMergeDefaults(stored || {});
  const updated: CMSData = { ...merged, ...body };
  await c.env.CMS_KV.put(CMS_KEY, JSON.stringify(updated));
  return c.json(updated);
});

// ---------- Auth routes ----------

app.post('/auth/login', async (c) => {
  try {
    const { username, password } = await c.req.json<{ username: string; password: string }>();
    if (username !== DEFAULT_USER || password !== DEFAULT_PASS) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    const token = await signJWT(
      {
        username,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      c.env.JWT_SECRET
    );
    return c.json({ token, username });
  } catch (err: any) {
    return c.json({ error: 'Login failed', details: err?.message || String(err) }, 500);
  }
});

app.get('/auth/me', authMiddleware, async (c) => {
  return c.json({ user: c.get('user') });
});

// ---------- CRM helpers ----------

function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ---------- CRM clients routes ----------

app.get('/crm/clients', authMiddleware, async (c) => {
  const { results: clients } = await c.env.DB.prepare(
    'SELECT id, company, status, special_notes, created_at, updated_at FROM clients ORDER BY company'
  ).all<Client>();

  const clientList: Client[] = [];
  for (const row of clients || []) {
    const { results: branches } = await c.env.DB.prepare(
      'SELECT id, client_id, name, address, contact, phone FROM branches WHERE client_id = ? ORDER BY name'
    )
      .bind(row.id)
      .all<Branch>();

    clientList.push({
      ...row,
      specialNotes: JSON.parse(row.special_notes as unknown as string || '[]'),
      branches: (branches || []) as unknown as Branch[],
    });
  }

  return c.json(clientList);
});

app.post('/crm/clients', authMiddleware, async (c) => {
  const body = await c.req.json<Client>();
  const id = generateId('c');
  await c.env.DB.prepare(
    'INSERT INTO clients (id, company, status, special_notes) VALUES (?, ?, ?, ?)'
  )
    .bind(id, body.company, body.status || 'active', JSON.stringify(body.specialNotes || []))
    .run();

  if (body.branches?.length) {
    for (const b of body.branches) {
      const bid = generateId('b');
      await c.env.DB.prepare(
        'INSERT INTO branches (id, client_id, name, address, contact, phone) VALUES (?, ?, ?, ?, ?, ?)'
      )
        .bind(bid, id, b.name, b.address, b.contact, b.phone)
        .run();
    }
  }

  return c.json({ id });
});

app.put('/crm/clients/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<Client>();
  await c.env.DB.prepare(
    'UPDATE clients SET company = ?, status = ?, special_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  )
    .bind(body.company, body.status, JSON.stringify(body.specialNotes || []), id)
    .run();

  await c.env.DB.prepare('DELETE FROM branches WHERE client_id = ?').bind(id).run();
  if (body.branches?.length) {
    for (const b of body.branches) {
      const bid = b.id || generateId('b');
      await c.env.DB.prepare(
        'INSERT INTO branches (id, client_id, name, address, contact, phone) VALUES (?, ?, ?, ?, ?, ?)'
      )
        .bind(bid, id, b.name, b.address, b.contact, b.phone)
        .run();
    }
  }

  return c.json({ success: true });
});

app.delete('/crm/clients/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('DELETE FROM clients WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

// ---------- CRM orders routes ----------

app.get('/crm/orders', authMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, client_id, company, type, status, date, amount, notes, created_at FROM orders ORDER BY date DESC'
  ).all<Order>();
  return c.json(results || []);
});

app.post('/crm/orders', authMiddleware, async (c) => {
  const body = await c.req.json<Order>();
  const id = generateId('O');
  await c.env.DB.prepare(
    'INSERT INTO orders (id, client_id, company, type, status, date, amount, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  )
    .bind(id, body.clientId, body.company, body.type, body.status, body.date, body.amount, body.notes)
    .run();
  return c.json({ id });
});

app.put('/crm/orders/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<Order>();
  await c.env.DB.prepare(
    'UPDATE orders SET client_id = ?, company = ?, type = ?, status = ?, date = ?, amount = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  )
    .bind(body.clientId, body.company, body.type, body.status, body.date, body.amount, body.notes, id)
    .run();
  return c.json({ success: true });
});

app.delete('/crm/orders/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('DELETE FROM orders WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

app.get('/crm/stats', authMiddleware, async (c) => {
  const activeClients = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM clients WHERE status = 'active'"
  ).first<{ count: number }>();
  const pendingOrders = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM orders WHERE status = 'pending'"
  ).first<{ count: number }>();
  const monthlyRevenue = await c.env.DB.prepare(
    "SELECT COALESCE(SUM(CAST(REPLACE(REPLACE(amount, '$', ''), ',', '') AS INTEGER)), 0) as total FROM orders WHERE status = 'completed' AND strftime('%Y-%m', date) = strftime('%Y-%m', 'now')"
  ).first<{ total: number }>();
  const monthlyCompleted = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM orders WHERE status = 'completed' AND strftime('%Y-%m', date) = strftime('%Y-%m', 'now')"
  ).first<{ count: number }>();

  return c.json({
    activeClients: activeClients?.count || 0,
    pendingOrders: pendingOrders?.count || 0,
    monthlyRevenue: monthlyRevenue?.total || 0,
    monthlyCompleted: monthlyCompleted?.count || 0,
  });
});

// ---------- Booking route ----------

app.post('/booking', async (c) => {
  try {
    const body = await c.req.json<Booking>();
    const id = generateId('B');
    await c.env.DB.prepare(
      'INSERT INTO bookings (id, company_name, contact_person, phone, email, relocation_type, preferred_date, preferred_time, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
      .bind(
        id,
        body.companyName,
        body.contactPerson,
        body.phone,
        body.email || '',
        body.relocationType,
        body.preferredDate,
        body.preferredTime,
        body.notes || ''
      )
      .run();

    const message = `【御搬遷預約查詢】\n公司：${body.companyName}\n聯絡人：${body.contactPerson}\n電話：${body.phone}\n搬遷類型：${body.relocationType}\n期望日期：${body.preferredDate}\n期望時段：${body.preferredTime}\n補充：${body.notes || '無'}`;
    const whatsappUrl = `https://wa.me/85212345678?text=${encodeURIComponent(message)}`;

    return c.json({ id, whatsappUrl, message: 'Booking saved' });
  } catch (err: any) {
    return c.json({ error: 'Booking failed', details: err?.message || String(err) }, 500);
  }
});

// ---------- Health ----------

app.get('/health', (c) => {
  return c.json({ service: 'moving-api', ok: true, time: Date.now() });
});

export const onRequest = handle(app);
