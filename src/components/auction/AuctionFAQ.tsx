import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

export const AuctionFAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    { questionKey: 'auctionLP.faq.q1', answerKey: 'auctionLP.faq.a1' },
    { questionKey: 'auctionLP.faq.q2', answerKey: 'auctionLP.faq.a2' },
    { questionKey: 'auctionLP.faq.q3', answerKey: 'auctionLP.faq.a3' },
    { questionKey: 'auctionLP.faq.q4', answerKey: 'auctionLP.faq.a4' },
    { questionKey: 'auctionLP.faq.q5', answerKey: 'auctionLP.faq.a5' },
    { questionKey: 'auctionLP.faq.q6', answerKey: 'auctionLP.faq.a6' },
  ];

  return (
    <SectionWrapper id="faq" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              FAQ
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('auctionLP.faq.title')}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-white/50 text-lg">
              {t('auctionLP.faq.subtitle')}
            </p>
          </FadeInUp>
        </div>

        {/* FAQ Items */}
        <StaggerContainer className="space-y-3" staggerDelay={0.08}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <StaggerItem key={index}>
                <motion.div
                  layout
                  className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'bg-white/[0.04] border-gold/20'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-gold/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <h3 className={`font-medium pr-4 transition-colors ${isOpen ? 'text-white' : 'text-white/80'}`}>
                      {t(item.questionKey)}
                    </h3>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-gold' : 'bg-white/[0.06]'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-black" />
                      ) : (
                        <Plus className="w-4 h-4 text-white/60" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5">
                          <p className="text-white/50 leading-relaxed">{t(item.answerKey)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
};
