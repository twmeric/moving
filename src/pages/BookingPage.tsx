import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Building2,
  User,
  Phone,
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  FileText,
} from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import { CMSLoader } from '../components/CMSLoader';
import type { BookingForm } from '../types';

const BookingPage: React.FC = () => {
  const { data: cms, loading } = useCMS();
  const [form, setForm] = useState<BookingForm>({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    relocationType: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('提交失敗，請稍後再試');
      const data = await res.json();
      setSubmitted(true);
      // Open WhatsApp after short delay
      setTimeout(() => {
        window.open(data.whatsappUrl, '_blank');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失敗');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading || !cms) return <CMSLoader />;

  const relocationTypes = cms.services.items.map((s) => s.title).concat(['辦公室搬遷', '展覽場地佈置', '其他']);

  const timeSlots = [
    '09:00 - 11:00',
    '11:00 - 13:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 後（夜間服務）',
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-20 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 mx-auto mb-8 bg-gold-400/10 border-2 border-gold-400 flex items-center justify-center">
            <CheckCircle2 className="text-gold-500" size={36} />
          </div>
          <h2 className="text-3xl font-serif text-navy-900 mb-4">預約已確認</h2>
          <p className="text-navy-600/80 text-lg mb-6">
            感謝您的信任。我們的資深顧問將於 24 小時內致電確認上門評估安排。同時已為您開啟 WhatsApp 對話。
          </p>
          <div className="bg-white border border-cream-300 p-6 text-left space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-navy-600/60">公司名稱</span>
              <span className="text-navy-900 font-medium">{form.companyName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-navy-600/60">搬遷類型</span>
              <span className="text-navy-900 font-medium">{form.relocationType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-navy-600/60">期望日期</span>
              <span className="text-navy-900 font-medium">{form.preferredDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-navy-600/60">期望時段</span>
              <span className="text-navy-900 font-medium">{form.preferredTime}</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-navy-900 pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="gold-divider" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase">Book Assessment</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl text-white font-serif mb-4"
          >
            預約免費上門評估
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg max-w-2xl"
          >
            填寫以下表單，我們的資深顧問將親臨貴公司進行專業評估，為您制定最佳搬遷方案。
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white border border-cream-300 p-8 md:p-12">
                <h3 className="text-2xl font-serif text-navy-900 mb-2">填寫評估資料</h3>
                <p className="text-navy-600/60 text-sm mb-8">所有標記 * 的欄位為必填項目</p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-navy-800 mb-2">
                      <Building2 size={14} className="inline mr-2 text-gold-500" />
                      公司名稱 *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      required
                      placeholder="例：ABC 醫療集團"
                      className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 placeholder:text-navy-400/50 focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-2">
                      <User size={14} className="inline mr-2 text-gold-500" />
                      聯絡人 *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={form.contactPerson}
                      onChange={handleChange}
                      required
                      placeholder="姓名"
                      className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 placeholder:text-navy-400/50 focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-2">
                      <Phone size={14} className="inline mr-2 text-gold-500" />
                      聯絡電話 *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+852 XXXX XXXX"
                      className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 placeholder:text-navy-400/50 focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-navy-800 mb-2">
                      電郵地址
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@company.com"
                      className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 placeholder:text-navy-400/50 focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-navy-800 mb-2">
                      <FileText size={14} className="inline mr-2 text-gold-500" />
                      搬遷類型 *
                    </label>
                    <select
                      name="relocationType"
                      value={form.relocationType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none transition-colors"
                    >
                      <option value="">請選擇搬遷類型</option>
                      {relocationTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-2">
                      <Calendar size={14} className="inline mr-2 text-gold-500" />
                      期望評估日期 *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-2">
                      <Clock size={14} className="inline mr-2 text-gold-500" />
                      期望時段 *
                    </label>
                    <select
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none transition-colors"
                    >
                      <option value="">請選擇時段</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-navy-800 mb-2">
                      補充說明
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="如有特殊設備需求或場地限制，請在此說明..."
                      className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 placeholder:text-navy-400/50 focus:border-gold-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                        提交中...
                      </span>
                    ) : (
                      <>
                        提交預約
                        <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </button>
                  <span className="text-xs text-navy-600/50">
                    提交後，我們將於 24 小時內確認預約
                  </span>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-cream-300 p-8">
                <h4 className="font-serif text-lg text-navy-900 mb-6">免費評估包含</h4>
                <ul className="space-y-4">
                  {[
                    '現場設備規格記錄',
                    '搬遷路線實地勘察',
                    '包裝方案建議',
                    '詳細報價單',
                    '時間表規劃',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-navy-700/80">
                      <CheckCircle2 size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-navy-900 p-8">
                <Shield className="text-gold-400 mb-4" size={28} />
                <h4 className="text-white font-serif text-lg mb-3">安心承諾</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  所有搬遷項目均享有百萬級物流保險保障，從評估到完工全程專業跟進。
                </p>
              </div>

              <div className="bg-white border border-cream-300 p-8">
                <h4 className="font-serif text-lg text-navy-900 mb-4">即時聯絡</h4>
                <div className="space-y-3">
                  <a
                    href={`tel:${cms.site.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-sm text-navy-700 hover:text-gold-600 transition-colors"
                  >
                    <Phone size={16} className="text-gold-500" />
                    {cms.site.phone}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-navy-700">
                    <Clock size={16} className="text-gold-500" />
                    週一至週六 09:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
