import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, ArrowRight, Sparkles, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp } from '@/components/ui/SectionWrapper';

export const AuctionCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#111] to-[#0a0a0a] p-6 sm:p-10 md:p-16 border border-white/[0.06]"
        >
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold/5 rounded-full blur-[100px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            {/* Urgency Badge */}
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span className="text-red-400 text-xs font-bold uppercase tracking-wider">
                  {t('auctionLP.cta.urgencyBadge')}
                </span>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t('auctionLP.cta.title')}
              </h2>
            </FadeInUp>

            <FadeInUp delay={0.15}>
              <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
                {t('auctionLP.cta.description')}
              </p>
            </FadeInUp>

            {/* Free badge */}
            <FadeInUp delay={0.2}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 mb-8">
                <Gift className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">
                  {t('auctionLP.cta.freeBadge')}
                </span>
              </div>
            </FadeInUp>

            {/* CTA Buttons */}
            <FadeInUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://auctions.goldprimefzco.com/', '_blank')}
                  className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 rounded-xl font-bold text-base hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 w-full sm:w-auto justify-center"
                >
                  <Gavel className="w-5 h-5" />
                  {t('auctionLP.cta.button')}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.a
                  href="https://wa.me/96178777946"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 text-green-400 px-8 py-4 rounded-xl font-bold text-base hover:bg-green-600/30 transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </motion.a>
              </div>
            </FadeInUp>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
