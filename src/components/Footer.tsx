import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';

const Footer: React.FC = () => {
  const { data: cms, loading } = useCMS();

  if (loading || !cms) return null;

  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border-2 border-gold-400 flex items-center justify-center">
                <span className="font-serif text-gold-400 text-lg font-bold">御</span>
              </div>
              <div>
                <span className="text-white font-serif text-lg">{cms.site.name}</span>
                <span className="block text-gold-400/60 text-[10px] tracking-[0.3em] uppercase">
                  {cms.site.tagline}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              {cms.footer.brandDesc}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-sans text-sm tracking-wider uppercase mb-6">專業範疇</h4>
            <ul className="space-y-3">
              {cms.footer.serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-sm hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-sans text-sm tracking-wider uppercase mb-6">公司資訊</h4>
            <ul className="space-y-3">
              {cms.footer.companyLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-sm hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-sans text-sm tracking-wider uppercase mb-6">聯絡我們</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{cms.site.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{cms.site.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm whitespace-pre-line">{cms.site.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{cms.site.copyright}</p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <span>私隱政策</span>
            <span>服務條款</span>
            <span>{cms.site.licenseNumber}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
