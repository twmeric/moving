import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';

const DEFAULT_MESSAGE = '您好，我想查詢企業搬遷服務，請問方便安排免費上門評估嗎？';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: cms, loading } = useCMS();

  if (loading || !cms) return null;

  const whatsappUrl = `https://wa.me/${cms.site.whatsappNumber}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 overflow-hidden"
            >
              <div className="bg-[#075E54] px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-serif text-sm font-bold">御</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{cms.site.name}客服團隊</div>
                    <div className="text-green-200 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                      通常在 5 分鐘內回覆
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-5 py-4 bg-[#ECE5DD] min-h-[120px]">
                <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    您好！👋 歡迎聯絡{cms.site.name}。
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed mt-1">
                    如需預約免費上門評估或查詢搬遷方案，請點擊下方按鈕直接與我們對話。
                  </p>
                </div>
              </div>

              <div className="px-5 py-4 bg-white border-t border-gray-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm rounded-full transition-colors shadow-lg shadow-green-500/20"
                >
                  <MessageCircle size={20} />
                  開始 WhatsApp 對話
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 transition-colors relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          {isOpen ? <X className="text-white" size={26} /> : <MessageCircle className="text-white" size={28} />}
          {!isOpen && (
            <span className="absolute right-full mr-3 bg-navy-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              WhatsApp 即時諮詢
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default WhatsAppButton;
