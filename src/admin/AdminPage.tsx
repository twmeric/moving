import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Save,
  LogOut,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import { useAuth } from '../hooks/useAuth';
import type { CMSData, ServiceItem } from '../types';

type TabKey = 'site' | 'hero' | 'stats' | 'trust' | 'services' | 'process' | 'cta' | 'footer';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'site', label: '網站資訊' },
  { key: 'hero', label: '首頁 Hero' },
  { key: 'stats', label: '統計數字' },
  { key: 'trust', label: '信任指標' },
  { key: 'services', label: '服務項目' },
  { key: 'process', label: '流程' },
  { key: 'cta', label: 'CTA' },
  { key: 'footer', label: '頁腳' },
];

const iconNames = [
  'Shield',
  'Award',
  'Clock',
  'TrendingUp',
  'Stethoscope',
  'Sparkles',
  'GraduationCap',
  'Truck',
  'Package',
];

const colorOptions = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-fuchsia-600 to-pink-500',
  'from-blue-600 to-cyan-500',
  'from-emerald-600 to-teal-500',
];

const AdminPage: React.FC = () => {
  const { data, loading, error, updateCMS } = useCMS();
  const { token, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('site');
  const [form, setForm] = useState<CMSData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (data && !form) {
      setForm(JSON.parse(JSON.stringify(data)));
    }
  }, [data, form]);

  const handleSave = async () => {
    if (!form || !token) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      await updateCMS(form, token);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '儲存失敗');
    } finally {
      setSaving(false);
    }
  };

  const updateField = <K extends keyof CMSData>(section: K, value: CMSData[K]) => {
    setForm((prev) => (prev ? { ...prev, [section]: value } : prev));
  };

  const updateNested = <K extends keyof CMSData>(
    section: K,
    field: keyof CMSData[K],
    value: any
  ) => {
    setForm((prev) =>
      prev ? { ...prev, [section]: { ...prev[section], [field]: value } } : prev
    );
  };

  if (loading || !form) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-gold-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-6">
        <div className="bg-white border border-red-200 p-8 max-w-lg text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={32} />
          <h2 className="text-lg font-serif text-navy-900 mb-2">載入失敗</h2>
          <p className="text-navy-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-24 pb-12">
      {/* Header */}
      <div className="bg-navy-900 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase">CMS Admin</span>
            </div>
            <h1 className="text-2xl text-white font-serif">內容管理後台</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-navy-900 font-bold text-sm tracking-wider uppercase transition-all hover:from-amber-300 hover:to-orange-400 disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
              儲存變更
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-3 border border-white/30 text-white text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              登出
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-6">
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm"
          >
            <CheckCircle2 size={18} />
            <span>內容已成功儲存並即時生效。</span>
          </motion.div>
        )}
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-sm">
            <AlertTriangle size={18} />
            <span>{saveError}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-6">
        <div className="bg-white border-b border-cream-200 flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-gold-400 text-navy-900'
                  : 'border-transparent text-navy-500 hover:text-navy-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-8">
        <div className="bg-white border border-cream-300 p-8">
          {activeTab === 'site' && (
            <div className="grid md:grid-cols-2 gap-6">
              {[
                ['name', '品牌名稱'],
                ['tagline', '英文標語'],
                ['phone', '電話'],
                ['whatsappNumber', 'WhatsApp 號碼'],
                ['email', '電郵'],
                ['licenseNumber', '牌照編號'],
                ['copyright', '版權文字'],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-navy-800 mb-2">{label}</label>
                  <input
                    type="text"
                    value={(form.site as any)[key]}
                    onChange={(e) =>
                      updateField('site', { ...form.site, [key]: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-navy-800 mb-2">地址</label>
                <textarea
                  rows={3}
                  value={form.site.address}
                  onChange={(e) => updateField('site', { ...form.site, address: e.target.value })}
                  className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-6">
              <Input label="眉標" value={form.hero.eyebrow} onChange={(v) => updateNested('hero', 'eyebrow', v)} />
              <Input label="主標題第一行" value={form.hero.title[0]} onChange={(v) => updateNested('hero', 'title', [v, form.hero.title[1]])} />
              <Input label="主標題第二行" value={form.hero.title[1]} onChange={(v) => updateNested('hero', 'title', [form.hero.title[0], v])} />
              <Input label="高亮文字" value={form.hero.highlight} onChange={(v) => updateNested('hero', 'highlight', v)} />
              <TextArea label="描述" value={form.hero.description} onChange={(v) => updateNested('hero', 'description', v)} />
              <Input label="主按鈕文字" value={form.hero.primaryCta} onChange={(v) => updateNested('hero', 'primaryCta', v)} />
              <Input label="次要按鈕文字" value={form.hero.secondaryCta} onChange={(v) => updateNested('hero', 'secondaryCta', v)} />
              <Input label="背景圖片 URL" value={form.hero.backgroundImage} onChange={(v) => updateNested('hero', 'backgroundImage', v)} />
            </div>
          )}

          {activeTab === 'stats' && (
            <ArrayEditor
              items={form.stats}
              onChange={(items) => updateField('stats', items)}
              renderItem={(item, idx, update) => (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="數值"
                    value={item.value}
                    onChange={(e) => update({ ...item, value: e.target.value })}
                    className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none"
                  />
                  <input
                    placeholder="標籤"
                    value={item.label}
                    onChange={(e) => update({ ...item, label: e.target.value })}
                    className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none"
                  />
                </div>
              )}
              defaultItem={{ value: '', label: '' }}
            />
          )}

          {activeTab === 'trust' && (
            <div className="space-y-6">
              <Input label="眉標" value={form.trust.eyebrow} onChange={(v) => updateNested('trust', 'eyebrow', v)} />
              <Input label="標題" value={form.trust.title} onChange={(v) => updateNested('trust', 'title', v)} />
              <TextArea label="描述" value={form.trust.description} onChange={(v) => updateNested('trust', 'description', v)} />
              <Input label="圖片 URL" value={form.trust.image} onChange={(v) => updateNested('trust', 'image', v)} />
              <Input label="角標文字" value={form.trust.badge} onChange={(v) => updateNested('trust', 'badge', v)} />
              <h4 className="font-medium text-navy-900 pt-4 border-t border-cream-200">特色區塊</h4>
              <ArrayEditor
                items={form.trust.features}
                onChange={(items) => updateNested('trust', 'features', items)}
                renderItem={(item, idx, update) => (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={item.icon}
                        onChange={(e) => update({ ...item, icon: e.target.value })}
                        className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                      >
                        {iconNames.map((i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                      <select
                        value={item.color}
                        onChange={(e) => update({ ...item, color: e.target.value })}
                        className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                      >
                        {colorOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      placeholder="標題"
                      value={item.title}
                      onChange={(e) => update({ ...item, title: e.target.value })}
                      className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                    />
                    <input
                      placeholder="描述"
                      value={item.desc}
                      onChange={(e) => update({ ...item, desc: e.target.value })}
                      className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                    />
                  </div>
                )}
                defaultItem={{ icon: 'Shield', title: '', desc: '', color: colorOptions[0] }}
              />
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8">
              <Input label="眉標" value={form.services.eyebrow} onChange={(v) => updateNested('services', 'eyebrow', v)} />
              <Input label="標題" value={form.services.title} onChange={(v) => updateNested('services', 'title', v)} />
              <ArrayEditor
                items={form.services.items}
                onChange={(items) => updateNested('services', 'items', items)}
                renderItem={(item, idx, update) => <ServiceEditor item={item} onChange={update} />}
                defaultItem={{
                  id: `service_${Date.now()}`,
                  icon: 'Shield',
                  title: '新服務',
                  subtitle: '',
                  image: '',
                  description: '',
                  features: [],
                  specs: [],
                  badge: '',
                }}
              />
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-6">
              <Input label="眉標" value={form.process.eyebrow} onChange={(v) => updateNested('process', 'eyebrow', v)} />
              <Input label="標題" value={form.process.title} onChange={(v) => updateNested('process', 'title', v)} />
              <TextArea label="描述" value={form.process.description} onChange={(v) => updateNested('process', 'description', v)} />
              <Input label="背景圖片 URL" value={form.process.backgroundImage} onChange={(v) => updateNested('process', 'backgroundImage', v)} />
              <ArrayEditor
                items={form.process.steps}
                onChange={(items) => updateNested('process', 'steps', items)}
                renderItem={(item, idx, update) => (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="步驟編號"
                        value={item.step}
                        onChange={(e) => update({ ...item, step: e.target.value })}
                        className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                      />
                      <select
                        value={item.color}
                        onChange={(e) => update({ ...item, color: e.target.value })}
                        className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                      >
                        {colorOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      placeholder="標題"
                      value={item.title}
                      onChange={(e) => update({ ...item, title: e.target.value })}
                      className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                    />
                    <input
                      placeholder="描述"
                      value={item.desc}
                      onChange={(e) => update({ ...item, desc: e.target.value })}
                      className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                    />
                  </div>
                )}
                defaultItem={{ step: '', title: '', desc: '', color: colorOptions[0] }}
              />
            </div>
          )}

          {activeTab === 'cta' && (
            <div className="space-y-6">
              <Input label="標題第一行" value={form.cta.title[0]} onChange={(v) => updateNested('cta', 'title', [v, form.cta.title[1]])} />
              <Input label="標題第二行" value={form.cta.title[1]} onChange={(v) => updateNested('cta', 'title', [form.cta.title[0], v])} />
              <Input label="高亮文字" value={form.cta.highlight} onChange={(v) => updateNested('cta', 'highlight', v)} />
              <TextArea label="描述" value={form.cta.description} onChange={(v) => updateNested('cta', 'description', v)} />
              <Input label="主按鈕文字" value={form.cta.primaryCta} onChange={(v) => updateNested('cta', 'primaryCta', v)} />
              <Input label="電話按鈕前綴" value={form.cta.phoneCta} onChange={(v) => updateNested('cta', 'phoneCta', v)} />
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8">
              <TextArea label="品牌描述" value={form.footer.brandDesc} onChange={(v) => updateNested('footer', 'brandDesc', v)} />
              <div>
                <h4 className="font-medium text-navy-900 mb-3">服務連結</h4>
                <ArrayEditor
                  items={form.footer.serviceLinks}
                  onChange={(items) => updateNested('footer', 'serviceLinks', items)}
                  renderItem={(item, idx, update) => (
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="文字"
                        value={item.label}
                        onChange={(e) => update({ ...item, label: e.target.value })}
                        className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                      />
                      <input
                        placeholder="連結"
                        value={item.href}
                        onChange={(e) => update({ ...item, href: e.target.value })}
                        className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                      />
                    </div>
                  )}
                  defaultItem={{ label: '', href: '/' }}
                />
              </div>
              <div>
                <h4 className="font-medium text-navy-900 mb-3">公司連結</h4>
                <ArrayEditor
                  items={form.footer.companyLinks}
                  onChange={(items) => updateNested('footer', 'companyLinks', items)}
                  renderItem={(item, idx, update) => (
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="文字"
                        value={item.label}
                        onChange={(e) => update({ ...item, label: e.target.value })}
                        className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                      />
                      <input
                        placeholder="連結"
                        value={item.href}
                        onChange={(e) => update({ ...item, href: e.target.value })}
                        className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
                      />
                    </div>
                  )}
                  defaultItem={{ label: '', href: '/' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-800 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-800 mb-2">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none resize-none"
      />
    </div>
  );
}

function ArrayEditor<T>({
  items,
  onChange,
  renderItem,
  defaultItem,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (item: T) => void) => React.ReactNode;
  defaultItem: T;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-3 p-4 border border-cream-200 bg-cream-50">
          <GripVertical size={18} className="text-navy-300 mt-2" />
          <div className="flex-1">{renderItem(item, idx, (newItem) => {
            const next = [...items];
            next[idx] = newItem;
            onChange(next);
          })}</div>
          <button
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="p-2 text-red-400 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, defaultItem])}
        className="inline-flex items-center px-4 py-2 border border-navy-900 text-navy-900 text-sm font-medium hover:bg-navy-900 hover:text-white transition-colors"
      >
        <Plus size={16} className="mr-2" />
        新增項目
      </button>
    </div>
  );
}

function ServiceEditor({ item, onChange }: { item: ServiceItem; onChange: (item: ServiceItem) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="服務 ID"
          value={item.id}
          onChange={(e) => onChange({ ...item, id: e.target.value })}
          className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
        />
        <select
          value={item.icon}
          onChange={(e) => onChange({ ...item, icon: e.target.value })}
          className="px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900"
        >
          {iconNames.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
      <input placeholder="標題" value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900" />
      <input placeholder="副標題" value={item.subtitle} onChange={(e) => onChange({ ...item, subtitle: e.target.value })} className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900" />
      <input placeholder="圖片 URL" value={item.image} onChange={(e) => onChange({ ...item, image: e.target.value })} className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900" />
      <input placeholder="角標" value={item.badge} onChange={(e) => onChange({ ...item, badge: e.target.value })} className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900" />
      <textarea placeholder="描述" rows={3} value={item.description} onChange={(e) => onChange({ ...item, description: e.target.value })} className="w-full px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900 resize-none" />
      <div>
        <label className="text-xs text-navy-500 uppercase tracking-wider">特色（每行一項：標題|描述）</label>
        <textarea
          rows={4}
          value={item.features.map((f) => `${f.title}|${f.desc}`).join('\n')}
          onChange={(e) => {
            const features = e.target.value.split('\n').filter(Boolean).map((line) => {
              const [title, ...rest] = line.split('|');
              return { title: title.trim(), desc: rest.join('|').trim() };
            });
            onChange({ ...item, features });
          }}
          className="w-full mt-1 px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900 resize-none"
        />
      </div>
      <div>
        <label className="text-xs text-navy-500 uppercase tracking-wider">規格（每行一項）</label>
        <textarea
          rows={3}
          value={item.specs.join('\n')}
          onChange={(e) => onChange({ ...item, specs: e.target.value.split('\n').filter(Boolean) })}
          className="w-full mt-1 px-4 py-2 border border-cream-300 bg-cream-50 text-navy-900 resize-none"
        />
      </div>
    </div>
  );
}

export default AdminPage;
