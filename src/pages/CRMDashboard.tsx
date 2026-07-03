import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  FileText,
  Calendar,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  MapPin,
  Phone,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Edit3,
  Trash2,
  X,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import type { Client, Order, Branch } from '../types';

const API_BASE = '/api';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  quoted: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-gray-100 text-gray-700',
};

const statusLabels: Record<string, string> = {
  pending: '待評估',
  quoted: '已報價',
  confirmed: '已確認',
  completed: '已完成',
};

const CRMDashboard: React.FC = () => {
  const { token, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'orders'>('overview');
  const [clients, setClients] = useState<Client[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ activeClients: 0, pendingOrders: 0, monthlyRevenue: 0, monthlyCompleted: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  // Modals
  const [clientModal, setClientModal] = useState<Client | null>(null);
  const [orderModal, setOrderModal] = useState<Order | null>(null);

  const fetchAll = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [clientsRes, ordersRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/crm/clients`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/crm/orders`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/crm/stats`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (!clientsRes.ok || !ordersRes.ok) throw new Error('Failed to load CRM data');
      setClients(await clientsRes.json());
      setOrders(await ordersRes.json());
      setStats(await statsRes.json());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const saveClient = async (client: Client) => {
    if (!token) return;
    const method = clients.some((c) => c.id === client.id) ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `${API_BASE}/crm/clients/${client.id}` : `${API_BASE}/crm/clients`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(client),
    });
    if (!res.ok) throw new Error('Failed to save client');
    await fetchAll();
  };

  const deleteClient = async (id: string) => {
    if (!token || !confirm('確定刪除此客戶？')) return;
    await fetch(`${API_BASE}/crm/clients/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    await fetchAll();
  };

  const saveOrder = async (order: Order) => {
    if (!token) return;
    const method = orders.some((o) => o.id === order.id) ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `${API_BASE}/crm/orders/${order.id}` : `${API_BASE}/crm/orders`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Failed to save order');
    await fetchAll();
  };

  const deleteOrder = async (id: string) => {
    if (!token || !confirm('確定刪除此訂單？')) return;
    await fetch(`${API_BASE}/crm/orders/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    await fetchAll();
  };

  const filteredClients = clients.filter((c) => c.company.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredOrders = orders.filter(
    (o) => o.company.toLowerCase().includes(searchTerm.toLowerCase()) || o.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { key: 'overview' as const, label: '總覽', icon: Building2 },
    { key: 'clients' as const, label: '客戶檔案', icon: Users },
    { key: 'orders' as const, label: '報價與訂單', icon: FileText },
  ];

  if (loading && clients.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-gold-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-24">
      <div className="bg-navy-900 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="gold-divider" />
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase">CRM Dashboard</span>
            </div>
            <h1 className="text-2xl md:text-3xl text-white font-serif">企業客戶管理系統</h1>
          </div>
          <button onClick={logout} className="text-white/80 hover:text-white text-sm flex items-center gap-2">
            <ArrowLeft size={16} /> 登出
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-cream-200 px-6 lg:px-12 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-gold-400 text-navy-900'
                  : 'border-transparent text-navy-500 hover:text-navy-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                placeholder="搜尋客戶或訂單..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-cream-300 bg-cream-50 text-sm rounded-none focus:border-gold-400 focus:outline-none w-48 md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: '活躍客戶', value: stats.activeClients.toString(), icon: Building2, color: 'text-blue-600' },
                  { label: '待處理訂單', value: stats.pendingOrders.toString(), icon: Clock, color: 'text-amber-600' },
                  { label: '本月營收', value: `$${stats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600' },
                  { label: '本月完成', value: stats.monthlyCompleted.toString(), icon: CheckCircle2, color: 'text-navy-600' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-cream-300 p-6">
                    <stat.icon size={20} className={`${stat.color} mb-3`} />
                    <div className="text-2xl font-serif text-navy-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-navy-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-cream-300">
                <div className="px-6 py-4 border-b border-cream-200 flex items-center justify-between">
                  <h3 className="font-serif text-lg text-navy-900">最近訂單</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-gold-600 hover:text-gold-700 font-medium">
                    查看全部 →
                  </button>
                </div>
                <div className="divide-y divide-cream-200">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-navy-900">{order.company}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                            {statusLabels[order.status]}
                          </span>
                        </div>
                        <div className="text-xs text-navy-500">{order.type} · {order.date}</div>
                      </div>
                      <div className="text-sm font-medium text-navy-900">{order.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-white border border-cream-300">
                <div className="px-6 py-4 border-b border-cream-200">
                  <h3 className="font-serif text-lg text-navy-900">即將上門評估</h3>
                </div>
                <div className="divide-y divide-cream-200">
                  {orders.filter((o) => o.status === 'pending' || o.status === 'confirmed').map((order) => (
                    <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                        <Calendar size={20} className="text-gold-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-navy-900">{order.company}</div>
                        <div className="text-xs text-navy-500">{order.type} · {order.notes}</div>
                      </div>
                      <div className="text-xs text-navy-600">{order.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'clients' && (
            <motion.div key="clients" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-navy-900">客戶檔案</h2>
                <button
                  onClick={() =>
                    setClientModal({
                      id: '',
                      company: '',
                      status: 'active',
                      specialNotes: [],
                      branches: [],
                    })
                  }
                  className="btn-primary text-xs py-2 px-4"
                >
                  <Plus size={14} className="mr-1" />
                  新增客戶
                </button>
              </div>

              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <div key={client.id} className="bg-white border border-cream-300 overflow-hidden">
                    <button
                      onClick={() => setExpandedClient(expandedClient === client.id ? null : client.id)}
                      className="w-full px-6 py-5 flex items-center gap-4 hover:bg-cream-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-navy-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-gold-400 font-serif text-lg">{client.company[0]}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-navy-900 font-medium">{client.company}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${client.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                            {client.status === 'active' ? '活躍' : '暫停'}
                          </span>
                        </div>
                        <span className="text-xs text-navy-500">{client.branches.length} 個分店 / 地址</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); setClientModal(client); }}
                          className="p-2 hover:bg-cream-100 transition-colors rounded"
                        >
                          <Edit3 size={14} className="text-navy-400" />
                        </button>
                        {expandedClient === client.id ? <ChevronDown size={18} className="text-navy-400" /> : <ChevronRight size={18} className="text-navy-400" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedClient === client.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-cream-200 pt-5">
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-navy-800 mb-3 flex items-center gap-2">
                                <MapPin size={14} className="text-gold-500" />
                                分店 / 地址
                              </h4>
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {client.branches.map((branch) => (
                                  <div key={branch.id} className="border border-cream-200 p-4 bg-cream-50">
                                    <div className="text-sm font-medium text-navy-900 mb-1">{branch.name}</div>
                                    <div className="text-xs text-navy-500 mb-2">{branch.address}</div>
                                    <div className="flex items-center gap-2 text-xs text-navy-600"><Users size={12} /> {branch.contact}</div>
                                    <div className="flex items-center gap-2 text-xs text-navy-600 mt-1"><Phone size={12} /> {branch.phone}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-navy-800 mb-3 flex items-center gap-2">
                                <AlertTriangle size={14} className="text-amber-500" />
                                特殊要求備忘
                              </h4>
                              <div className="space-y-2">
                                {client.specialNotes.map((note, i) => (
                                  <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200/50 p-3">
                                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-navy-800">{note}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-navy-900">報價與訂單追蹤</h2>
                <button
                  onClick={() =>
                    setOrderModal({
                      id: '',
                      clientId: clients[0]?.id || '',
                      company: clients[0]?.company || '',
                      type: '',
                      status: 'pending',
                      date: new Date().toISOString().slice(0, 10),
                      amount: '待報價',
                      notes: '',
                    })
                  }
                  className="btn-primary text-xs py-2 px-4"
                >
                  <Plus size={14} className="mr-1" />
                  新增訂單
                </button>
              </div>

              <div className="bg-white border border-cream-300 overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-cream-50 border-b border-cream-200 text-xs font-medium text-navy-500 uppercase tracking-wider">
                  <div className="col-span-1">編號</div>
                  <div className="col-span-3">客戶</div>
                  <div className="col-span-2">類型</div>
                  <div className="col-span-2">日期</div>
                  <div className="col-span-1">金額</div>
                  <div className="col-span-1">狀態</div>
                  <div className="col-span-2">操作</div>
                </div>

                <div className="divide-y divide-cream-200">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="px-6 py-4 md:grid md:grid-cols-12 md:gap-4 md:items-center space-y-2 md:space-y-0 hover:bg-cream-50 transition-colors">
                      <div className="col-span-1 text-xs text-navy-500 font-mono">{order.id.slice(0, 8)}</div>
                      <div className="col-span-3">
                        <div className="text-sm font-medium text-navy-900">{order.company}</div>
                        <div className="text-xs text-navy-500 md:hidden">{order.type}</div>
                      </div>
                      <div className="col-span-2 text-sm text-navy-700 hidden md:block">{order.type}</div>
                      <div className="col-span-2 text-sm text-navy-600">{order.date}</div>
                      <div className="col-span-1 text-sm font-medium text-navy-900">{order.amount}</div>
                      <div className="col-span-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <button onClick={() => setOrderModal(order)} className="p-1.5 hover:bg-cream-100 transition-colors" title="編輯">
                          <Edit3 size={14} className="text-navy-400" />
                        </button>
                        <button onClick={() => deleteOrder(order.id)} className="p-1.5 hover:bg-red-50 transition-colors" title="刪除">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {clientModal && (
        <ClientModal
          client={clientModal}
          onClose={() => setClientModal(null)}
          onSave={async (c) => { await saveClient(c); setClientModal(null); }}
          onDelete={clientModal.id ? () => { deleteClient(clientModal.id); setClientModal(null); } : undefined}
        />
      )}

      {orderModal && (
        <OrderModal
          order={orderModal}
          clients={clients}
          onClose={() => setOrderModal(null)}
          onSave={async (o) => { await saveOrder(o); setOrderModal(null); }}
          onDelete={orderModal.id ? () => { deleteOrder(orderModal.id); setOrderModal(null); } : undefined}
        />
      )}
    </div>
  );
};

function ClientModal({
  client,
  onClose,
  onSave,
  onDelete,
}: {
  client: Client;
  onClose: () => void;
  onSave: (c: Client) => void;
  onDelete?: () => void;
}) {
  const [form, setForm] = useState<Client>(JSON.parse(JSON.stringify(client)));

  const updateBranch = (idx: number, branch: Branch) => {
    const next = [...form.branches];
    next[idx] = branch;
    setForm({ ...form, branches: next });
  };

  const addBranch = () => {
    setForm({
      ...form,
      branches: [...form.branches, { id: '', clientId: form.id, name: '', address: '', contact: '', phone: '' }],
    });
  };

  const removeBranch = (idx: number) => {
    setForm({ ...form, branches: form.branches.filter((_, i) => i !== idx) });
  };

  const updateNote = (idx: number, value: string) => {
    const next = [...form.specialNotes];
    next[idx] = value;
    setForm({ ...form, specialNotes: next });
  };

  const addNote = () => setForm({ ...form, specialNotes: [...form.specialNotes, ''] });
  const removeNote = (idx: number) => setForm({ ...form, specialNotes: form.specialNotes.filter((_, i) => i !== idx) });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-navy-900/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-cream-300 shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-cream-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-serif text-navy-900">{form.id ? '編輯客戶' : '新增客戶'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-cream-100"><X size={18} className="text-navy-500" /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-navy-700 mb-1">公司名稱</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900" />
            </div>
            <div>
              <label className="block text-sm text-navy-700 mb-1">狀態</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900">
                <option value="active">活躍</option>
                <option value="inactive">暫停</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-navy-900">分店 / 地址</h4>
              <button onClick={addBranch} className="text-xs text-gold-600 hover:text-gold-700 font-medium">+ 新增分店</button>
            </div>
            <div className="space-y-3">
              {form.branches.map((b, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 items-end p-3 border border-cream-200 bg-cream-50">
                  <input placeholder="名稱" value={b.name} onChange={(e) => updateBranch(i, { ...b, name: e.target.value })} className="px-3 py-2 border border-cream-300 bg-white text-navy-900 text-sm" />
                  <input placeholder="地址" value={b.address} onChange={(e) => updateBranch(i, { ...b, address: e.target.value })} className="px-3 py-2 border border-cream-300 bg-white text-navy-900 text-sm" />
                  <input placeholder="聯絡人" value={b.contact} onChange={(e) => updateBranch(i, { ...b, contact: e.target.value })} className="px-3 py-2 border border-cream-300 bg-white text-navy-900 text-sm" />
                  <div className="flex gap-2">
                    <input placeholder="電話" value={b.phone} onChange={(e) => updateBranch(i, { ...b, phone: e.target.value })} className="flex-1 px-3 py-2 border border-cream-300 bg-white text-navy-900 text-sm" />
                    <button onClick={() => removeBranch(i)} className="p-2 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-navy-900">特殊要求備忘</h4>
              <button onClick={addNote} className="text-xs text-gold-600 hover:text-gold-700 font-medium">+ 新增備忘</button>
            </div>
            <div className="space-y-2">
              {form.specialNotes.map((note, i) => (
                <div key={i} className="flex gap-2">
                  <input value={note} onChange={(e) => updateNote(i, e.target.value)} className="flex-1 px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900 text-sm" />
                  <button onClick={() => removeNote(i)} className="p-2 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-cream-200 px-6 py-4 flex items-center justify-between">
          <div>
            {onDelete && (
              <button onClick={onDelete} className="text-sm text-red-600 hover:text-red-700">刪除客戶</button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-5 py-2 border border-cream-300 text-navy-700 text-sm hover:bg-cream-50">取消</button>
            <button onClick={() => onSave(form)} className="px-5 py-2 bg-navy-900 text-white text-sm hover:bg-navy-800">儲存</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function OrderModal({
  order,
  clients,
  onClose,
  onSave,
  onDelete,
}: {
  order: Order;
  clients: Client[];
  onClose: () => void;
  onSave: (o: Order) => void;
  onDelete?: () => void;
}) {
  const [form, setForm] = useState<Order>(JSON.parse(JSON.stringify(order)));

  const handleClientChange = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    setForm({ ...form, clientId, company: client?.company || '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-navy-900/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-xl border border-cream-300 shadow-2xl">
        <div className="px-6 py-4 border-b border-cream-200 flex items-center justify-between">
          <h3 className="text-lg font-serif text-navy-900">{form.id ? '編輯訂單' : '新增訂單'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-cream-100"><X size={18} className="text-navy-500" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-navy-700 mb-1">客戶</label>
            <select value={form.clientId} onChange={(e) => handleClientChange(e.target.value)} className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900">
              <option value="">選擇客戶</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.company}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-navy-700 mb-1">搬遷類型</label>
            <input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-navy-700 mb-1">日期</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900" />
            </div>
            <div>
              <label className="block text-sm text-navy-700 mb-1">狀態</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900">
                <option value="pending">待評估</option>
                <option value="quoted">已報價</option>
                <option value="confirmed">已確認</option>
                <option value="completed">已完成</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-navy-700 mb-1">金額</label>
            <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900" />
          </div>
          <div>
            <label className="block text-sm text-navy-700 mb-1">備註</label>
            <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-navy-900 resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-cream-200 flex items-center justify-between">
          {onDelete ? <button onClick={onDelete} className="text-sm text-red-600 hover:text-red-700">刪除訂單</button> : <span />}
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-5 py-2 border border-cream-300 text-navy-700 text-sm hover:bg-cream-50">取消</button>
            <button onClick={() => onSave(form)} className="px-5 py-2 bg-navy-900 text-white text-sm hover:bg-navy-800">儲存</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CRMDashboard;
