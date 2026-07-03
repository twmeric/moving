import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../hooks/useCMS';
import { useAuthStore } from '../store/authStore';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: cms, loading } = useCMS();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: '首頁' },
    { href: '/services', label: '專業範疇' },
    { href: '/booking', label: '預約評估' },
    { href: isAuthenticated ? '/admin' : '/login', label: '管理後台' },
  ];

  if (loading || !cms) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-gold-400 flex items-center justify-center">
              <span className="font-serif text-gold-400 text-lg font-bold">御</span>
            </div>
            <div>
              <span className="text-white font-serif text-lg tracking-wide">{cms.site.name}</span>
              <span className="hidden md:block text-gold-400/70 text-[10px] tracking-[0.3em] uppercase">
                {cms.site.tagline}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                  location.pathname === link.href ? 'text-gold-400' : 'text-white/80 hover:text-gold-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${cms.site.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-white/80 hover:text-gold-400 transition-colors"
            >
              <Phone size={16} />
              <span className="text-sm tracking-wide">{cms.site.phone}</span>
            </a>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-navy-900 font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-amber-500/20"
            >
              免費評估
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-navy-900/98 backdrop-blur-lg border-t border-gold-400/20"
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-lg tracking-wider ${
                    location.pathname === link.href ? 'text-gold-400' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-navy-900 font-bold text-xs tracking-wider uppercase"
                >
                  立即預約免費評估
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
