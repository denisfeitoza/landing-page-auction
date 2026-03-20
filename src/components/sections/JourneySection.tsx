import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp } from '@/components/ui/SectionWrapper';

export const JourneySection: React.FC = () => {
  const { t } = useLanguage();

  const timeline = [
    { year: '2017', title: t('journey.2017.title'), description: t('journey.2017.desc') },
    { year: '2019', title: t('journey.2019.title'), description: t('journey.2019.desc') },
    { year: '2021', title: t('journey.2021.title'), description: t('journey.2021.desc') },
    { year: '2023', title: t('journey.2023.title'), description: t('journey.2023.desc') },
    { year: '2025', title: t('journey.2025.title'), description: t('journey.2025.desc') },
    { year: '2026', title: t('journey.2026.title'), description: t('journey.2026.desc'), link: 'https://auctions.goldprimefzco.com', linkText: t('journey.2026.cta') },
  ];

  return (
    <SectionWrapper className="py-12 md:py-24 bg-secondary/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
          <FadeInUp>
            <div className="flex flex-col items-center">
              <span className="text-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-2 md:mb-4">
                Timeline
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight font-display leading-[1.15] drop-shadow-sm">
                {t('journey.title')}
              </h2>
              <div className="w-12 md:w-16 h-1 bg-gold rounded-full mb-4 md:mb-6" />
            </div>
          </FadeInUp>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Main Timeline Line with Gradient */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="grid lg:grid-cols-6 gap-6 md:gap-12 lg:gap-8">
            {timeline.map((item, index) => (
              <FadeInUp key={index} delay={0.1 * index}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative text-center group"
                >
                  {/* Visual Connector / Dot */}
                  <div className="flex justify-center mb-4 md:mb-8 relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center z-10 relative shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow duration-300"
                    >
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gold" />
                    </motion.div>

                    {/* Glowing highlight behind the dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-gold/10 rounded-full blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content Card */}
                  <div className="bg-charcoal/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 md:p-6 hover:border-gold/30 transition-colors duration-300 h-full">
                    <span className="text-gold text-[8px] md:text-[10px] font-bold tracking-widest uppercase mb-2 md:mb-3 block opacity-80">
                      {item.title}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-2 md:mb-3 tracking-tighter">
                      {item.year}
                    </h3>
                    <p className="text-white/80 text-[12px] md:text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-gold text-[11px] md:text-xs font-bold hover:text-gold/80 transition-colors uppercase tracking-wider border-b border-gold/30 hover:border-gold/60 pb-0.5"
                      >
                        {item.linkText}
                      </a>
                    )}
                  </div>
                </motion.div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-gold/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </SectionWrapper>
  );
};
