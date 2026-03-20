import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Instagram, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ContactForm } from '@/components/ui/ContactForm';
import { SectionWrapper, FadeInUp, SlideInLeft, SlideInRight } from '@/components/ui/SectionWrapper';
import logoSvg from '@/assets/logo-goldprime.svg';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: MapPin, labelKey: 'footer.address', value: 'LCA14, Logistics Cluster Row-A, Dubai CommerCity, Dubai, UAE' },
    { icon: Phone, labelKey: 'footer.phone', value: '+961 78 777 946 (Sales)\n+971 55 794 3420 (Service Center)\n+971 52 778 7995 (Owner)' },
    { icon: Mail, labelKey: 'footer.email', value: 'info@goldprimefzco.com' },
    { icon: Globe, labelKey: 'footer.website', value: 'www.goldprimefzco.com' },
    { icon: Instagram, labelKey: 'footer.social', value: '@goldprime_fzco' },
  ];

  return (
    <>
      {/* CTA Banner */}
      <SectionWrapper className="section-padding bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-charcoal p-10 md:p-16"
          >
            {/* Subtle accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold/5 rounded-full blur-[100px]" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <FadeInUp>
                <span className="text-gold text-xs font-medium tracking-ultra uppercase mb-4 block">
                  Get Started
                </span>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <h2 className="text-white mb-8">{t('contact.title')}</h2>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-gold text-charcoal px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-gold-light"
                >
                  {t('contact.cta')}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </FadeInUp>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Footer / Contact Section */}
      <footer id="contact" className="relative bg-charcoal pt-20 pb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Right - Form (1st on Mobile, 2nd on Desktop) */}
            <div className="order-1 lg:order-2">
              <SlideInRight>
                <div id="contact-form" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6">{t('contact.form.title')}</h3>
                  <ContactForm />
                </div>
              </SlideInRight>
            </div>

            {/* Left - Info (2nd on Mobile, 1st on Desktop) */}
            <div className="order-2 lg:order-1">
              <SlideInLeft>
                <div className="flex items-center gap-3 mb-8">
                  <img src={logoSvg} alt="GoldPrime" className="h-10 w-auto" />
                </div>

                <p className="text-white/60 mb-10 max-w-md leading-relaxed">
                  The leading premium iPhone trading hub in Dubai, offering comprehensive solutions for global B2B partners.
                </p>

                <div className="space-y-5">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <div className="text-white/40 text-xs uppercase tracking-wide mb-1">{t(item.labelKey)}</div>
                          {item.labelKey === 'footer.phone' ? (
                            <div className="space-y-1">
                              {item.value.split('\n').map((line, i) => {
                                const phoneMatch = line.match(/\+[\d\s]+/);
                                if (phoneMatch) {
                                  const rawPhone = phoneMatch[0].replace(/\s+/g, '');
                                  return (
                                    <div key={i}>
                                      <a
                                        href={`https://wa.me/${rawPhone.replace('+', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white text-sm hover:text-gold transition-all duration-300 inline-block hover:translate-x-1"
                                      >
                                        {line}
                                      </a>
                                    </div>
                                  );
                                }
                                return <div key={i} className="text-white text-sm">{line}</div>;
                              })}
                            </div>
                          ) : item.labelKey === 'footer.email' ? (
                            <a href={`mailto:${item.value}`} className="text-white text-sm hover:text-gold transition-all duration-300 block hover:translate-x-1">{item.value}</a>
                          ) : item.labelKey === 'footer.website' ? (
                            <a href={`https://${item.value}`} target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gold transition-all duration-300 block hover:translate-x-1">{item.value}</a>
                          ) : item.labelKey === 'footer.social' ? (
                            <a href={`https://instagram.com/${item.value.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gold transition-all duration-300 block hover:translate-x-1">{item.value}</a>
                          ) : (
                            <div className="text-white text-sm whitespace-pre-line">{item.value}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SlideInLeft>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} GoldPrime FZCO. {t('footer.rights')}
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-white/40 hover:text-gold text-sm transition-colors">Privacy</a>
                <a href="#" className="text-white/40 hover:text-gold text-sm transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
