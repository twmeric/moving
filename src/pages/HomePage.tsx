import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import { getIcon } from '../lib/icons';
import { CMSLoader } from '../components/CMSLoader';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const HomePage: React.FC = () => {
  const { data: cms, loading } = useCMS();

  if (loading || !cms) return <CMSLoader />;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cms.hero.backgroundImage}
            alt={cms.site.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/80 to-indigo-900/60" />
        </div>

        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              <span className="text-amber-300 text-sm tracking-[0.3em] uppercase font-medium">
                {cms.hero.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl text-white font-serif leading-tight mb-8"
            >
              {cms.hero.title[0]}
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {cms.hero.highlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
            >
              {cms.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-navy-900 font-bold text-sm tracking-wider uppercase rounded-none border-0 transition-all duration-300 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-amber-500/25"
              >
                {cms.hero.primaryCta}
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link to="/services" className="btn-secondary">
                {cms.hero.secondaryCta}
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10"
          >
            {cms.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-amber-400 font-serif text-3xl md:text-4xl mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              <span className="text-orange-600 text-xs tracking-[0.3em] uppercase font-semibold">{cms.trust.eyebrow}</span>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl text-navy-900 mb-6">
              {cms.trust.title}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-navy-600 text-lg max-w-2xl mx-auto">
              {cms.trust.description}
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="relative"
            >
              <img
                src={cms.trust.image}
                alt={cms.trust.title}
                className="w-full h-80 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-amber-400/40 -z-10" />
              <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-navy-900 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                {cms.trust.badge}
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {cms.trust.features.map((item, i) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="bg-white border border-gray-100 p-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className={`w-12 h-12 mb-4 bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <h3 className="text-navy-900 text-base font-semibold mb-2">{item.title}</h3>
                    <p className="text-navy-600/70 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-gradient-to-b from-gray-50 to-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              <span className="text-orange-600 text-xs tracking-[0.3em] uppercase font-semibold">{cms.services.eyebrow}</span>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl text-navy-900 mb-6">
              {cms.services.title}
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {cms.services.items.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.div
                  key={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.features[0]?.color || 'from-blue-600 to-cyan-500'} opacity-40`} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-navy-900">
                      {service.badge}
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${service.features[0]?.color || 'from-blue-600 to-cyan-500'} flex items-center justify-center shadow-lg`}>
                        <Icon className="text-white" size={20} />
                      </div>
                      <h3 className="text-white text-xl font-serif font-bold drop-shadow-lg">{service.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {service.features.slice(0, 4).map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-navy-700/80 text-sm">
                          <CheckCircle2 size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 text-navy-900 text-sm font-semibold hover:text-orange-600 transition-colors"
                    >
                      了解更多
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative bg-navy-900 section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cms.process.backgroundImage}
            alt="Process"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/95 via-navy-900/90 to-navy-950/95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-semibold">{cms.process.eyebrow}</span>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl text-white mb-6">
              {cms.process.title}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-2xl mx-auto">
              {cms.process.description}
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cms.process.steps.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative group"
              >
                <div className={`text-6xl font-serif font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {item.step}
                </div>
                <h3 className="text-white text-lg font-serif mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl text-navy-900 font-serif mb-6">
              {cms.cta.title[0]}
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{cms.cta.highlight}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-navy-700/70 text-lg mb-10 max-w-2xl mx-auto">
              {cms.cta.description}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm tracking-wider uppercase rounded-none transition-all duration-300 hover:from-amber-400 hover:to-orange-500 shadow-xl shadow-orange-500/25"
              >
                {cms.cta.primaryCta}
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <a
                href={`tel:${cms.site.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-navy-900 text-white font-semibold text-sm tracking-wider uppercase rounded-none transition-all duration-300 hover:bg-navy-800 shadow-lg"
              >
                {cms.cta.phoneCta} {cms.site.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
