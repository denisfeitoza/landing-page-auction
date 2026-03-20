import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    { questionKey: 'faq.q1', answerKey: 'faq.a1' },
    { questionKey: 'faq.q2', answerKey: 'faq.a2' },
    { questionKey: 'faq.q3', answerKey: 'faq.a3' },
    { questionKey: 'faq.q4', answerKey: 'faq.a4' },
    { questionKey: 'faq.q5', answerKey: 'faq.a5' },
    { questionKey: 'faq.q6', answerKey: 'faq.a6' },
  ];

  return (
    <SectionWrapper id="faq" className="section-padding bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-ultra uppercase mb-4 block">
              FAQ
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-foreground mb-4">{t('faq.title')}</h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-muted-foreground text-lg">{t('faq.subtitle')}</p>
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
                      ? 'bg-charcoal border-charcoal' 
                      : 'bg-card border-border hover:border-gold/30'
                  }`}
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? -1 : index)} 
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <h3 className={`font-medium pr-4 transition-colors ${
                      isOpen ? 'text-white' : 'text-foreground'
                    }`}>
                      {t(item.questionKey)}
                    </h3>
                    
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-gold' : 'bg-secondary'
                    }`}>
                      {isOpen 
                        ? <Minus className="w-4 h-4 text-charcoal" />
                        : <Plus className="w-4 h-4 text-foreground" />
                      }
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
                          <p className="text-white/60 leading-relaxed">
                            {t(item.answerKey)}
                          </p>
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
