import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Gavel, PackageCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

export const AuctionHowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      icon: UserPlus,
      titleKey: 'auctionLP.how.step1.title',
      descKey: 'auctionLP.how.step1.desc',
    },
    {
      number: '02',
      icon: Gavel,
      titleKey: 'auctionLP.how.step2.title',
      descKey: 'auctionLP.how.step2.desc',
    },
    {
      number: '03',
      icon: PackageCheck,
      titleKey: 'auctionLP.how.step3.title',
      descKey: 'auctionLP.how.step3.desc',
    },
  ];

  return (
    <SectionWrapper id="how-it-works" className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              {t('auctionLP.how.label')}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('auctionLP.how.title')}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {t('auctionLP.how.subtitle')}
            </p>
          </FadeInUp>
        </div>

        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 relative" staggerDelay={0.15}>
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-[72px] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Number circle */}
                  <div className="relative mb-8">
                    <div className="w-[88px] h-[88px] rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Icon className="w-8 h-8 text-gold relative z-10" />
                    </div>
                    <span className="absolute -top-3 -right-3 text-4xl font-bold text-white/[0.04] select-none">
                      {step.number}
                    </span>
                    {/* Dot indicator for connector */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold/30 border-2 border-gold/50 mt-[44px]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                    {t(step.descKey)}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
};
