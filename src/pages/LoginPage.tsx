import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-cream-300 p-8 md:p-12 shadow-xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-6 bg-navy-900 flex items-center justify-center">
              <span className="text-gold-400 font-serif text-2xl font-bold">御</span>
            </div>
            <h1 className="text-2xl font-serif text-navy-900 mb-2">管理後台登入</h1>
            <p className="text-navy-600/60 text-sm">請輸入您的帳號及密碼</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-2">
                <User size={14} className="inline mr-2 text-gold-500" />
                帳號
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none transition-colors"
                placeholder="twmeric"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-800 mb-2">
                <Lock size={14} className="inline mr-2 text-gold-500" />
                密碼
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-navy-900 focus:border-gold-400 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-navy-900 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:from-amber-300 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '登入中...' : '登入'}
              {!loading && <ArrowRight className="ml-2" size={18} />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-cream-200 text-center">
            <p className="text-xs text-navy-500">
              預設帳號：twmeric / 密碼：admin360
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
