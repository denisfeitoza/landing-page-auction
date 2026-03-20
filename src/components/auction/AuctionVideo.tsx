import React from 'react';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp } from '@/components/ui/SectionWrapper';

interface AuctionVideoProps {
  youtubeId?: string;
}

export const AuctionVideo: React.FC<AuctionVideoProps> = ({ youtubeId }) => {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="video" className="py-20 sm:py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              {t('auctionLP.video.label')}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('auctionLP.video.title')}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
              {t('auctionLP.video.subtitle')}
            </p>
          </FadeInUp>
        </div>

        {/* Video Container — vertical/portrait aspect (9:16) for mobile-first */}
        <FadeInUp delay={0.3}>
          <div className="max-w-sm mx-auto">
            {youtubeId ? (
              <div
                className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-gold/10 bg-[#121212]"
                style={{ aspectRatio: '9/16' }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                  title="How to use GoldPrime Auctions"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              /* Placeholder — shown until the YouTube ID is provided */
              <div
                className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] flex flex-col items-center justify-center group cursor-pointer hover:border-gold/30 transition-all duration-500"
                style={{ aspectRatio: '9/16' }}
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

                {/* Play button */}
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-500 group-hover:scale-110">
                    <Play className="w-8 h-8 text-gold ml-1" fill="currentColor" />
                  </div>
                  <div className="text-center px-6">
                    <p className="text-white/80 font-semibold text-base mb-2">
                      {t('auctionLP.video.placeholder')}
                    </p>
                    <p className="text-white/30 text-sm">
                      {t('auctionLP.video.duration')}
                    </p>
                  </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gold/5 to-transparent" />
              </div>
            )}
          </div>
        </FadeInUp>

        {/* Caption */}
        <FadeInUp delay={0.4}>
          <p className="text-center text-white/30 text-sm mt-6">
            {t('auctionLP.video.caption')}
          </p>
        </FadeInUp>
      </div>
    </SectionWrapper>
  );
};
