import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Eye, title: t('about.vision.title'), description: t('about.vision.text') },
    { icon: Target, title: t('about.mission.title'), description: t('about.mission.text') },
  ];

  return (
    <SectionWrapper id="about" className="pt-20 pb-20 md:py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <FadeInUp>
              <span className="text-gold text-xs font-medium tracking-ultra uppercase mb-4 block">
                GoldPrime FZCO
              </span>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h2 className="text-foreground mb-6">{t('about.title')}</h2>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                {t('about.description')}
              </p>
            </FadeInUp>

            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex gap-4 p-5 bg-secondary/50 rounded-xl border border-border hover:border-gold/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Images */}
          <FadeInUp delay={0.3} className="relative">
            <div className="relative">
              {/* Main Image - Team */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-charcoal/10"
              >
                <img
                  src="/WhatsApp Image 2025-10-11 at 17.43.00.jpg"
                  alt={t('about.image.alt')}
                  className="w-full aspect-[4/3] object-cover object-[50%_75%] scale-105 contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                <div className="absolute inset-0 backdrop-gradient-mask" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <p className="text-white text-sm md:text-lg font-semibold whitespace-nowrap">{t('about.image.technicians')}</p>
                  <p className="text-white/70 text-[10px] md:text-sm whitespace-nowrap">{t('about.image.location')}</p>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-gold/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gold/10 rounded-xl -z-10" />
            </div>
          </FadeInUp>
        </div>
      </div>
    </SectionWrapper>
  );
};
