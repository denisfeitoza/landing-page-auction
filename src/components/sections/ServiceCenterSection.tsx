import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, SlideInLeft } from '@/components/ui/SectionWrapper';
import iphoneOrange from '@/assets/iphone-orange.webp';
import iphonePurple from '@/assets/iphone-purple.webp';
import advancedTechImg from '@/assets/advanced-tech.webp';
import certificationLabel from '@/assets/certification-label.webp';
import tagImage1 from '@/assets/Add_this_tag_2k_202601241231.webp';
import tagImage2 from '@/assets/Add_this_tag_2k_202601241232.webp';
import tagImage3 from '@/assets/Add_this_tag_2k_202601241233.webp';
import tagImage4 from '@/assets/Add_this_tag_2k_202601241233 (1).webp';
import { useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export const ServiceCenterSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  const tagImages = [tagImage1, tagImage2, tagImage3, tagImage4];

  useEffect(() => {
    // Optimization: Only run interval when component is in view
    if (!isInView) return;

    const timer = setInterval(() => {
      setCurrentTagIndex((prev) => (prev + 1) % tagImages.length);
    }, 1000); // Change images every 1 second
    return () => clearInterval(timer);
  }, [isInView]);

  const services = [
    'service.list.item1',
    'service.list.item2',
    'service.list.item3',
    'service.list.item4',
    'service.list.item5',
    'service.list.item6',
  ];

  return (
    <SectionWrapper id="service-center" className="py-12 md:py-20 bg-secondary/30">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 relative">
          <SlideInLeft>
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Decorative Accent Line - Modern UI Touch */}
              <div className="hidden md:block w-1.5 h-24 bg-gradient-to-b from-gold via-gold/50 to-transparent rounded-full mt-2" />

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-gold/50 md:hidden" />
                  <span className="text-gold text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                    {t('nav.services.center')}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gold mb-6 tracking-tight font-display leading-[1.15] drop-shadow-sm">
                  {t('service.title')}
                </h2>

                <div className="max-w-3xl">
                  <p className="text-white text-lg leading-relaxed drop-shadow-md">
                    {t('service.description')}
                  </p>
                </div>
              </div>
            </div>
          </SlideInLeft>

          {/* Subtle background glow effect - Optimized with gradient instead of heavy blur */}
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full -z-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)' }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          <FadeInUp className="lg:col-span-7">
            <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden group border border-border bg-charcoal">
              <img
                src={tagImages[currentTagIndex]}
                alt="iPhone with GoldPrime certification label"
                decoding="sync"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover"
              />


              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent pointer-events-none" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-10">
                <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-gold text-charcoal text-[8px] md:text-[10px] font-bold tracking-widest uppercase rounded-full mb-2 md:mb-4 shadow-lg">
                  {t('service.certified.badge')}
                </span>
                <h3 className="text-white text-xl md:text-3xl font-bold mb-1 md:mb-3 tracking-tight drop-shadow-sm">
                  {t('service.premium.title')}
                </h3>
                <p className="text-white/95 max-w-[280px] md:max-w-md text-[10px] md:text-base leading-relaxed font-semibold drop-shadow-sm">
                  {t('service.premium.desc')}
                </p>
              </div>
            </div>
          </FadeInUp>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Image - Technology */}
            <FadeInUp delay={0.1} className="flex-1">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
                className="relative h-full min-h-[250px] rounded-2xl overflow-hidden group"
              >
                <img
                  src={advancedTechImg}
                  alt="Laboratory technicians testing iPhones"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                <div className="absolute bottom-6 left-6 pr-6">
                  <h4 className="text-white font-bold text-lg mb-1 drop-shadow-md">{t('service.tech.title')}</h4>
                  <p className="text-white/95 text-sm font-medium leading-snug drop-shadow-md">{t('service.tech.desc')}</p>
                </div>
              </motion.div>
            </FadeInUp>

            {/* Services List - Perfectly aligned via flex-col gap */}
            <FadeInUp delay={0.2}>
              <div className="bg-card border border-border rounded-2xl p-6">
                <h4 className="font-bold text-foreground mb-5 text-lg">{t('service.list.title')}</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-4">
                  {services.map((serviceKey, index) => (
                    <li key={index} className="flex items-start gap-3 text-[15px] text-foreground/80 leading-tight">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{t(serviceKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Bottom Row - Product Images */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <FadeInUp delay={0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative h-[210px] rounded-2xl overflow-hidden group bg-gradient-to-br from-orange-50 to-orange-100"
            >
              <img
                src={iphoneOrange}
                alt="Premium iPhone"
                className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative h-[210px] rounded-2xl overflow-hidden group bg-secondary"
            >
              <img
                src={certificationLabel}
                alt="GoldPrime Certification Label"
                className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative h-[210px] rounded-2xl overflow-hidden group bg-gradient-to-br from-purple-50 to-purple-100"
            >
              <img
                src={iphonePurple}
                alt="Premium iPhone"
                className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          </FadeInUp>
        </div>
      </div>
    </SectionWrapper>
  );
};
