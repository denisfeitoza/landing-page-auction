import React from 'react';
import { motion } from 'framer-motion';
import { Package, Wrench, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

import process1 from '@/assets/process/process-1.webp';
import process2 from '@/assets/process/process-2.webp';
import process3 from '@/assets/process/process-3.webp';

export const ProcessSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      icon: Package,
      titleKey: 'process.step1.title',
      descKey: 'process.step1.desc',
      image: process1
    },
    {
      number: '02',
      icon: Wrench,
      titleKey: 'process.step2.title',
      descKey: 'process.step2.desc',
      isHighlighted: true,
      image: process2
    },
    {
      number: '03',
      icon: Award,
      titleKey: 'process.step3.title',
      descKey: 'process.step3.desc',
      image: process3
    },
  ];

  return (
    <SectionWrapper id="services" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <FadeInUp>
              <span className="text-gold text-xs font-medium tracking-ultra uppercase mb-4 block">
                How It Works
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="text-foreground">{t('process.title')}</h2>
            </FadeInUp>
          </div>

        </div>

        {/* Process Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full min-h-[360px] rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 border border-white/10"
                >
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={step.image}
                      alt=""
                      className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:via-black/50 transition-colors duration-300" />
                  </div>

                  {/* Content Container - Ensure z-index puts it above image */}
                  <div className="relative z-10 p-8 flex flex-col h-full justify-between">
                    <div>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm mb-6 border border-white/10">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>

                      {/* Number */}
                      <div className="absolute top-8 right-8 text-6xl font-bold text-white/5 font-display">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-auto pt-8">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-white">
                            {t(step.titleKey)}
                          </h3>
                          <p className="text-sm leading-relaxed text-white/70">
                            {t(step.descKey)}
                          </p>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.1, rotate: -45 }}
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gold overflow-hidden"
                        >
                          <img
                            src="/Design sem nome (5).png"
                            alt="Arrow"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
};
