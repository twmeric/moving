import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Shield, Truck, Package, Clock } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import { getIcon } from '../lib/icons';
import { CMSLoader } from '../components/CMSLoader';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const highlights = [
  { icon: Shield, label: '百萬級承保', color: 'text-blue-600' },
  { icon: Truck, label: '專業車隊', color: 'text-violet-600' },
  { icon: Package, label: '防震包裝', color: 'text-amber-600' },
  { icon: Clock, label: '24小時服務', color: 'text-emerald-600' },
];

const ServicesPage: React.FC = () => {
  const { data: cms, loading } = useCMS();

  if (loading || !cms) return <CMSLoader />;

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-semibold">{cms.services.eyebrow}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl text-white font-serif mb-6"
          >
            {cms.services.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg max-w-2xl"
          >
            我們深諳每個行業的獨特需求，以三十年經驗為基礎，為不同領域度身訂造最安全高效的搬遷方案。
          </motion.p>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="flex items-center gap-3"
              >
                <item.icon className={item.color} size={22} />
                <span className="text-navy-800 text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto space-y-28">
          {cms.services.items.map((service, idx) => {
            const Icon = getIcon(service.icon);
            const firstColor = service.features[0]?.color || 'from-blue-600 to-cyan-500';
            return (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <motion.div variants={fadeUp} custom={0} className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-72 md:h-96 object-cover shadow-2xl"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${firstColor} opacity-20`} />
                    <div className={`absolute -bottom-3 -right-3 w-full h-full border-2 border-amber-400/30 -z-10`} />
                    <div className={`absolute top-4 left-4 px-4 py-2 bg-gradient-to-r ${firstColor} text-white text-xs font-bold uppercase tracking-wider`}>
                      {service.subtitle}
                    </div>
                  </motion.div>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${firstColor} flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white" size={26} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl text-navy-900 font-serif">{service.title}</h2>
                    </div>
                  </motion.div>
                  <motion.p variants={fadeUp} custom={1} className="text-navy-700/80 leading-relaxed mb-8">
                    {service.description}
                  </motion.p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feat, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={i + 1}
                        className="bg-white border border-gray-100 p-4 hover:border-amber-400/40 hover:shadow-md transition-all duration-300"
                      >
                        <h4 className="text-navy-900 font-medium text-sm mb-1">{feat.title}</h4>
                        <p className="text-navy-600/70 text-xs">{feat.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div variants={fadeUp} custom={3} className="space-y-2 mb-6">
                    {service.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-navy-600">
                        <CheckCircle2 size={14} className="text-amber-500" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeUp} custom={4}>
                    <Link
                      to="/booking"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/20"
                    >
                      預約免費評估
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-navy-900 via-navy-800 to-indigo-900 section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl text-white font-serif mb-6">
            需要度身訂造的搬遷方案？
          </h2>
          <p className="text-white/60 text-lg mb-10">
            每間企業的需求都是獨一無二的。讓我們的資深顧問為您量身定制最安全高效的物流計劃。
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-navy-900 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:from-amber-300 hover:to-orange-400 shadow-xl shadow-amber-500/25"
          >
            獲取專屬物流方案
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
