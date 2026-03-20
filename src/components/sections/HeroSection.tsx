import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import heroBackground from '@/assets/hero-background.webp';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: 10, suffix: '+', label: t('stats.years') },
    { value: 100, suffix: '+', label: t('stats.technicians') },
    { value: 20, suffix: 'k+', label: t('stats.devices') },
    { value: 6, suffix: '', label: t('stats.countries') },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Subtle Accent */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse-soft" />
            <span className="text-sm text-muted-foreground font-medium tracking-wide">
              Dubai, UAE · Since 2017
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-foreground mb-6"
          >
            <span className="block">Premier Premium</span>
            <span className="block text-gold">iPhone Trading Hub</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#contact')}
              className="group flex items-center gap-2 bg-charcoal text-white px-7 py-3.5 rounded-lg font-medium transition-all duration-300 hover:bg-charcoal-light"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#services')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium border border-border text-foreground hover:border-gold hover:text-gold transition-all duration-300"
            >
              {t('hero.cta.secondary')}
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 lg:mt-28"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-8 border-t border-border">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                end={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
