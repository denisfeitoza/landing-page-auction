import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, Timer, ArrowRight, User, Radio, Tag, BarChart3, Lock, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, SlideInRight } from '@/components/ui/SectionWrapper';
import IPhoneScrollAnimation, { AuctionStatus } from '@/components/sections/IPhoneScrollAnimation';

const AUCTION_ITEMS = [
  {
    id: 1,
    image: '/auction/2.webp',
    title: 'iPhone 14 Pro Max',
    subtitle: '100 Pieces',
    grade: 'Grade A+',
    basePrice: 42250,
    lot: '#8842',
    bids: [
      { t: 4, name: 'User4821', amount: 1000, displayAmount: '+$1,000' },
      { t: 2, name: 'User7342', amount: 500, displayAmount: '+$500' },
      { t: 0, name: 'User1965', amount: 250, displayAmount: '+$250' },
    ],
  },
  {
    id: 2,
    image: '/auction/3.webp',
    title: 'iPhone 15 Pro Max',
    subtitle: '100 Pieces',
    grade: 'Grade A+',
    basePrice: 55750,
    lot: '#8843',
    bids: [
      { t: 4, name: 'User3587', amount: 1000, displayAmount: '+$1,000' },
      { t: 2, name: 'User6214', amount: 500, displayAmount: '+$500' },
      { t: 0, name: 'User8403', amount: 250, displayAmount: '+$250' },
    ],
  },
];

export const AuctionLiveDemo: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [status, setStatus] = useState<AuctionStatus>('live');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [latestBid, setLatestBid] = useState<{ name: string; amount: string } | null>(null);
  const [winnerName, setWinnerName] = useState<string | undefined>(undefined);

  const currentItem = AUCTION_ITEMS[currentIndex];

  useEffect(() => {
    setTimeLeft(6);
    setStatus('live');
    setCurrentPrice(currentItem.basePrice);
    setLatestBid(null);
    setWinnerName(undefined);
  }, [currentIndex, currentItem]);

  const handleSoldSequence = useCallback(() => {
    setStatus('sold');
    const winner = [...currentItem.bids].sort((a, b) => a.t - b.t)[0];
    setWinnerName(winner.name);

    setTimeout(() => {
      setStatus('transition');
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % AUCTION_ITEMS.length);
      }, 800);
      setTimeout(() => {
        setStatus('live');
      }, 2000);
    }, 2000);
  }, [currentItem.bids]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'live') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          const bidAtTime = currentItem.bids.find((b) => b.t === newTime);
          if (bidAtTime) {
            setCurrentPrice((p) => p + bidAtTime.amount);
            setLatestBid({ name: bidAtTime.name, amount: bidAtTime.displayAmount });
          }
          if (newTime <= -1) {
            handleSoldSequence();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, currentItem, handleSoldSequence]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <SectionWrapper id="live-demo" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10 lg:gap-y-12 items-start">
          {/* Left Content */}
          <div className="order-1 lg:col-start-1">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {t('auctionLP.liveDemo.badge')}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t('auctionLP.liveDemo.title')}
              </h2>
              <p className="text-xl text-white/80 font-light border-l-2 border-gold pl-4 mb-6">
                {t('auctionLP.liveDemo.subtitle')}
              </p>
              <p className="text-white/50 leading-relaxed text-base mb-4">
                {t('auctionLP.liveDemo.description')}
              </p>
            </FadeInUp>

            {/* Feature mini cards */}
            <FadeInUp delay={0.2} className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {([
                { icon: Radio, textKey: 'auctionLP.liveDemo.feat1', color: 'text-red-400' },
                { icon: Tag, textKey: 'auctionLP.liveDemo.feat2', color: 'text-gold' },
                { icon: BarChart3, textKey: 'auctionLP.liveDemo.feat3', color: 'text-blue-400' },
                { icon: Lock, textKey: 'auctionLP.liveDemo.feat4', color: 'text-emerald-400' },
              ] as { icon: LucideIcon; textKey: string; color: string }[]).map((feat, i) => {
                const FeatIcon = feat.icon;
                return (
                <div
                  key={i}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-gold/20 transition-colors"
                >
                  <FeatIcon className={`w-5 h-5 ${feat.color} shrink-0`} />
                  <span className="text-sm font-medium text-white/80">{t(feat.textKey)}</span>
                </div>
                );
              })}
            </FadeInUp>

            {/* CTA */}
            <FadeInUp delay={0.4}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://auctions.goldprimefzco.com/', '_blank')}
                className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-colors shadow-lg shadow-gold/20 w-full md:w-auto justify-center mt-8"
              >
                <Gavel className="w-5 h-5" />
                {t('auctionLP.liveDemo.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </FadeInUp>
          </div>

          {/* Right - Auction Card */}
          <SlideInRight delay={0.3} className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-3 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl shadow-gold/5 group h-[420px] sm:h-[500px] md:h-[600px] flex flex-col">
              {/* Card Header */}
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                <div className="flex gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg shrink-0">
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                    {t('auction.live')}
                  </span>
                  <span className="bg-black/60 backdrop-blur text-white/90 text-[10px] font-medium px-1.5 py-0.5 rounded border border-white/10 whitespace-nowrap">
                    {t('auction.lot')} {currentItem.lot}
                  </span>
                </div>
                <div
                  className={`bg-black/60 backdrop-blur font-mono text-sm px-2 py-1 rounded border flex items-center gap-1 transition-colors ${
                    timeLeft <= 2 ? 'text-red-500 border-red-500/50' : 'text-gold border-gold/20'
                  }`}
                >
                  <Timer className="w-3 h-3" />
                  00:{String(Math.max(0, timeLeft)).padStart(2, '0')}s
                </div>
              </div>

              {/* Product Image */}
              <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative overflow-hidden">
                <IPhoneScrollAnimation
                  imageSrc={currentItem.image}
                  status={status}
                  winnerName={winnerName}
                  latestBid={latestBid}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 relative bg-[#121212] z-30 border-t border-white/5">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-white font-bold text-sm sm:text-lg mb-1">
                          {currentItem.subtitle} - {currentItem.title}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] text-white/50">
                          <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/20">
                            {currentItem.grade}
                          </span>
                          <span>•</span>
                          <span>{t('auction.certified')}</span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{t('auction.currentBid')}</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currentPrice}
                        initial={{ opacity: 0, scale: 1.2, color: '#FCD34D' }}
                        animate={{ opacity: 1, scale: 1, color: '#F59E0B' }}
                        className="font-mono text-xl sm:text-2xl font-bold"
                      >
                        {formatCurrency(currentPrice)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bid Button */}
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    borderColor: ['rgba(245,158,11,0.2)', 'rgba(245,158,11,0.6)', 'rgba(245,158,11,0.2)'],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  onClick={() => window.open('https://auctions.goldprimefzco.com/', '_blank')}
                  className="w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg p-3 flex items-center justify-center gap-3 cursor-pointer transition-colors group/btn shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                >
                  <span className="text-white text-[11px] font-black group-hover:text-amber-200 transition-colors uppercase tracking-[0.15em]">
                    {t('auction.placeBid')}
                  </span>
                  <span className="text-white font-mono font-bold text-base">{formatCurrency(currentPrice + 250)}</span>
                </motion.div>

                {/* Live Feed */}
                <div className="mt-4 flex items-center gap-2 justify-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full bg-neutral-800 border border-[#121212] flex items-center justify-center text-neutral-500"
                      >
                        <User size={8} />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-white/40 font-medium">
                    <span className="text-green-500 animate-pulse mr-1">●</span>
                    142 {t('auction.watching')}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative glows */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-blue-500/20 blur-[40px] rounded-full pointer-events-none" />
          </SlideInRight>
        </div>
      </div>
    </SectionWrapper>
  );
};
