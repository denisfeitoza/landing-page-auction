import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Award, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

export const AuctionTrust: React.FC = () => {
  const { t } = useLanguage();

  const trustItems = [
    {
      icon: ShieldCheck,
      titleKey: 'auctionLP.trust.item1.title',
      descKey: 'auctionLP.trust.item1.desc',
    },
    {
      icon: Eye,
      titleKey: 'auctionLP.trust.item2.title',
      descKey: 'auctionLP.trust.item2.desc',
    },
    {
      icon: Award,
      titleKey: 'auctionLP.trust.item3.title',
      descKey: 'auctionLP.trust.item3.desc',
    },
    {
      icon: Users,
      titleKey: 'auctionLP.trust.item4.title',
      descKey: 'auctionLP.trust.item4.desc',
    },
  ];

  return (
    <SectionWrapper className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              {t('auctionLP.trust.label')}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('auctionLP.trust.title')}
            </h2>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-gold/20 transition-all duration-500 group h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {t(item.descKey)}
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
