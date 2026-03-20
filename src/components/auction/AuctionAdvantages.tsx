import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CalendarClock, Truck, Boxes, Camera, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

export const AuctionAdvantages: React.FC = () => {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: CreditCard,
      titleKey: 'auctionLP.adv.1.title',
      descKey: 'auctionLP.adv.1.desc',
      highlight: true,
    },
    {
      icon: CalendarClock,
      titleKey: 'auctionLP.adv.2.title',
      descKey: 'auctionLP.adv.2.desc',
    },
    {
      icon: Truck,
      titleKey: 'auctionLP.adv.3.title',
      descKey: 'auctionLP.adv.3.desc',
    },
    {
      icon: Boxes,
      titleKey: 'auctionLP.adv.4.title',
      descKey: 'auctionLP.adv.4.desc',
    },
    {
      icon: Camera,
      titleKey: 'auctionLP.adv.5.title',
      descKey: 'auctionLP.adv.5.desc',
    },
    {
      icon: Rocket,
      titleKey: 'auctionLP.adv.6.title',
      descKey: 'auctionLP.adv.6.desc',
    },
  ];

  return (
    <SectionWrapper id="advantages" className="py-24 bg-black relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-800/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              {t('auctionLP.adv.label')}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('auctionLP.adv.title')}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {t('auctionLP.adv.subtitle')}
            </p>
          </FadeInUp>
        </div>

        {/* Advantages Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {advantages.map((adv, index) => {
            const Icon = adv.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'rgba(212,175,55,0.3)' }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-6 rounded-2xl border transition-all duration-500 group h-full ${
                    adv.highlight
                      ? 'bg-gold/[0.06] border-gold/20 shadow-lg shadow-gold/5'
                      : 'bg-white/[0.02] border-white/[0.06]'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    adv.highlight ? 'bg-gold/20' : 'bg-gold/10 group-hover:bg-gold/20'
                  }`}>
                    <Icon className="w-6 h-6 text-gold" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t(adv.titleKey)}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t(adv.descKey)}
                  </p>

                  {adv.highlight && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-gold/20 text-gold px-2 py-1 rounded-full">
                        {t('auctionLP.adv.popular')}
                      </span>
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
};
