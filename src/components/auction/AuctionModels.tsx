import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

interface PhoneModel {
  name: string;
  storage: string;
  grades: string[];
  lot: number;
  priceRange: string;
}

export const AuctionModels: React.FC = () => {
  const { t } = useLanguage();

  const models: PhoneModel[] = [
    { name: 'iPhone 16', storage: '128GB', grades: ['A+', 'LL+'], lot: 100, priceRange: '$45K - $50K' },
    { name: 'iPhone 15 Pro', storage: '256GB', grades: ['A+', 'MIX'], lot: 100, priceRange: '$40K - $48K' },
    { name: 'iPhone 14 Pro', storage: '128GB', grades: ['LL+', 'B+'], lot: 100, priceRange: '$33K - $42K' },
    { name: 'iPhone 14', storage: '128GB', grades: ['LL+', 'MIX'], lot: 100, priceRange: '$23K - $30K' },
    { name: 'iPhone 13', storage: '128GB', grades: ['A+', 'MIX'], lot: 100, priceRange: '$22K - $28K' },
  ];

  const gradeColors: Record<string, string> = {
    'A+': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'LL+': 'text-gold bg-gold/10 border-gold/20',
    'B+': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'BC+': 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    'C+': 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
    'MIX': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };

  return (
    <SectionWrapper id="models" className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              {t('auctionLP.models.label')}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('auctionLP.models.title')}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {t('auctionLP.models.subtitle')}
            </p>
          </FadeInUp>
        </div>

        {/* Models Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {models.map((model, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(212,175,55,0.3)' }}
                transition={{ duration: 0.3 }}
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 group flex flex-col h-full"
              >
                {/* Model Name */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                  <span className="text-white/40 text-sm">{model.storage}</span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5 flex-1">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">
                      {t('auctionLP.models.lotSize')}
                    </span>
                    <span className="text-white font-semibold">{model.lot} pcs</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">
                      {t('auctionLP.models.priceRange')}
                    </span>
                    <span className="text-gold font-semibold text-sm">{model.priceRange}</span>
                  </div>
                </div>

                {/* Grades */}
                <div className="flex items-center gap-2 mb-5">
                  {model.grades.map((grade) => (
                    <span
                      key={grade}
                      className={`text-[10px] font-bold px-2 py-1 rounded-md border ${gradeColors[grade]}`}
                    >
                      {grade}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => window.open('https://auctions.goldprimefzco.com/', '_blank')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 text-sm font-medium hover:bg-gold/10 hover:border-gold/20 hover:text-gold transition-all duration-300 group/btn"
                >
                  {t('auctionLP.models.viewAuctions')}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
};
