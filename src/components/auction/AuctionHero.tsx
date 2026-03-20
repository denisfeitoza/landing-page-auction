import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, ArrowRight, MapPin, Shield, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const AuctionHero: React.FC<{ onRequestAccess: () => void }> = ({ onRequestAccess }) => {
  const { t } = useLanguage();

  const stats = [
    { icon: MapPin, value: '3', label: t('auctionLP.hero.stat.locations') },
    { icon: Users, value: '100+', label: t('auctionLP.hero.stat.lotUnits') },
    { icon: Shield, value: '6', label: t('auctionLP.hero.stat.grades') },
    { icon: Clock, value: '48h', label: t('auctionLP.hero.stat.express') },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/8 rounded-full blur-[150px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">
              {t('auctionLP.hero.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
          >
            {t('auctionLP.hero.title1')}
            <br />
            <span className="text-gold-gradient">{t('auctionLP.hero.title2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed px-2 sm:px-0"
          >
            {t('auctionLP.hero.subtitle')}
          </motion.p>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10 text-sm text-white/40"
          >
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gold/60" />São Paulo</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gold/60" />Ciudad del Este</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gold/60" />Dubai</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRequestAccess}
              className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 rounded-xl font-bold text-base hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 w-full sm:w-auto justify-center"
            >
              <Gavel className="w-5 h-5" />
              {t('auctionLP.hero.cta1')}
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#live-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-xl font-medium text-base hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto justify-center"
            >
              {t('auctionLP.hero.cta2')}
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="relative p-3 sm:p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-gold/20 transition-all duration-500 group"
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-1 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};
