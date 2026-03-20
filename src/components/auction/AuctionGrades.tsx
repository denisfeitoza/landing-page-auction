import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

interface Grade {
  name: string;
  titleKey: string;
  descKey: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const AuctionGrades: React.FC = () => {
  const { t } = useLanguage();

  const grades: Grade[] = [
    {
      name: 'A+',
      titleKey: 'auctionLP.grades.aplus.title',
      descKey: 'auctionLP.grades.aplus.desc',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    },
    {
      name: 'LL+',
      titleKey: 'auctionLP.grades.llplus.title',
      descKey: 'auctionLP.grades.llplus.desc',
      color: 'text-gold',
      bgColor: 'bg-gold/10',
      borderColor: 'border-gold/20 hover:border-gold/40',
    },
    {
      name: 'B+',
      titleKey: 'auctionLP.grades.bplus.title',
      descKey: 'auctionLP.grades.bplus.desc',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    },
    {
      name: 'BC+',
      titleKey: 'auctionLP.grades.bcplus.title',
      descKey: 'auctionLP.grades.bcplus.desc',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20 hover:border-teal-500/40',
    },
    {
      name: 'C+',
      titleKey: 'auctionLP.grades.cplus.title',
      descKey: 'auctionLP.grades.cplus.desc',
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-500/10',
      borderColor: 'border-zinc-500/20 hover:border-zinc-500/40',
    },
    {
      name: 'MIX',
      titleKey: 'auctionLP.grades.mix.title',
      descKey: 'auctionLP.grades.mix.desc',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
    },
  ];

  return (
    <SectionWrapper id="grades" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              {t('auctionLP.grades.label')}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('auctionLP.grades.title')}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {t('auctionLP.grades.subtitle')}
            </p>
          </FadeInUp>
        </div>

        {/* Grades Grid */}
        <StaggerContainer className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4" staggerDelay={0.08}>
          {grades.map((grade, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative p-4 sm:p-5 rounded-2xl border ${grade.borderColor} bg-white/[0.02] transition-all duration-500 text-center group h-full flex flex-col`}
              >
                {/* Grade Badge */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${grade.bgColor} mx-auto mb-4`}>
                  <span className={`text-xl font-black ${grade.color}`}>{grade.name}</span>
                </div>

                {/* Description */}
                <p className="text-white/40 text-xs leading-relaxed flex-1">
                  {t(grade.descKey)}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
};
