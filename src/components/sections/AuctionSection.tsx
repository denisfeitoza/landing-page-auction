import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, Timer, Container, StickyNote, ArrowRight, Video, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, SlideInRight } from '@/components/ui/SectionWrapper';
import IPhoneScrollAnimation, { AuctionStatus } from './IPhoneScrollAnimation';

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
            { t: 0, name: 'User1965', amount: 250, displayAmount: '+$250' } // Winner
        ]
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
            { t: 0, name: 'User8403', amount: 250, displayAmount: '+$250' }
        ]
    }
];

export const AuctionSection: React.FC = () => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Timeline State
    const [timeLeft, setTimeLeft] = useState(6);
    const [status, setStatus] = useState<AuctionStatus>('live');

    // Dynamic Bid State
    const [currentPrice, setCurrentPrice] = useState(0);
    const [latestBid, setLatestBid] = useState<{ name: string, amount: string } | null>(null);
    const [winnerName, setWinnerName] = useState<string | undefined>(undefined);

    const currentItem = AUCTION_ITEMS[currentIndex];

    // Reset cycle when index changes
    useEffect(() => {
        setTimeLeft(6);
        setStatus('live');
        setCurrentPrice(currentItem.basePrice);
        setLatestBid(null);
        setWinnerName(undefined);
    }, [currentIndex, currentItem]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (status === 'live') {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    const newTime = prev - 1;

                    // Check for scheduled bids at this second (approx)
                    const bidAtTime = currentItem.bids.find(b => b.t === newTime);
                    if (bidAtTime) {
                        setCurrentPrice(p => p + bidAtTime.amount);
                        setLatestBid({ name: bidAtTime.name, amount: bidAtTime.displayAmount });
                    }

                    if (newTime <= -1) { // End of cycle (0 -> -1 to allow 0s bid to show)
                        handleSoldSequence();
                        return 0; // Hold at 0
                    }
                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, currentItem]);

    const handleSoldSequence = () => {
        setStatus('sold');
        const winner = currentItem.bids[currentItem.bids.length - 1];
        setWinnerName(winner.name);

        // Stage 1: Winner Revealed (2s)
        setTimeout(() => {
            setStatus('transition');

            // Stage 2: Loading Next (2s total)
            // Switch content halfway through the transition for fluidity
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % AUCTION_ITEMS.length);
            }, 800);

            setTimeout(() => {
                setStatus('live');
            }, 2000);
        }, 2000);
    };

    const features = [
        { icon: Gavel, textKey: 'auction.feature1' },
        { icon: Container, textKey: 'auction.feature2' },
        { icon: Video, textKey: 'auction.feature3' },
        { icon: StickyNote, textKey: 'auction.feature4' },
    ];

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <SectionWrapper id="auction" className="py-24 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10 lg:gap-y-12 items-start">
                    {/* 1. Header Text (Top on Mobile, Left on Desktop) */}
                    <div className="order-1 lg:col-start-1">
                        <FadeInUp>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                {t('auction.liveHeader')}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                {t('auction.title')}
                            </h2>
                            <p className="text-xl text-white/80 font-light border-l-2 border-gold pl-4 mb-6">
                                {t('auction.subtitle')}
                            </p>
                            <p className="text-white/60 leading-relaxed text-lg">
                                {t('auction.description')}
                            </p>
                            <p className="text-white/40 text-sm mt-3">
                                {t('auction.offices')}
                            </p>
                        </FadeInUp>
                    </div>

                    {/* 2. Visual Card - Auction Interface Mockup (2nd on Mobile, Right on Desktop) */}
                    <SlideInRight delay={0.3} className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-3 relative">
                        {/* Main Card */}
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl shadow-gold/5 group h-[500px] md:h-[600px] flex flex-col">
                            {/* Card Header with Live Status */}
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
                                <div className={`bg-black/60 backdrop-blur font-mono text-sm px-2 py-1 rounded border flex items-center gap-1 transition-colors ${timeLeft <= 2 ? 'text-red-500 border-red-500/50' : 'text-gold border-gold/20'}`}>
                                    <Timer className="w-3 h-3" />
                                    00:0{Math.max(0, timeLeft)}s
                                </div>
                            </div>

                            {/* Product Image Placeholder - 60% Height */}
                            <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative overflow-hidden">
                                <IPhoneScrollAnimation
                                    imageSrc={currentItem.image}
                                    status={status}
                                    winnerName={winnerName}
                                    latestBid={latestBid}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80 pointer-events-none" />
                            </div>

                            {/* Card Body - Fixed Height at Bottom */}
                            <div className="p-6 relative bg-[#121212] z-30 border-t border-white/5">
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
                                                <h3 className="text-white font-bold text-lg mb-1">{currentItem.subtitle} - {currentItem.title}</h3>
                                                <div className="flex items-center gap-2 text-[10px] text-white/50">
                                                    <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/20">{currentItem.grade}</span>
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
                                                className="font-mono text-2xl font-bold"
                                            >
                                                {formatCurrency(currentPrice)}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Bid Button Mockup - White Text/Numbers & Bolder */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.02, 1],
                                        borderColor: ['rgba(245,158,11,0.2)', 'rgba(245,158,11,0.6)', 'rgba(245,158,11,0.2)']
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    onClick={() => window.open('https://auctions.goldprimefzco.com/', '_blank')}
                                    className="w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg p-3 flex items-center justify-center gap-3 cursor-pointer transition-colors group/btn shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                                >
                                    <span className="text-white text-[11px] font-black group-hover:text-amber-200 transition-colors uppercase tracking-[0.15em]">{t('auction.placeBid')}</span>
                                    <span className="text-white font-mono font-bold text-base">{formatCurrency(currentPrice + 250)}</span>
                                </motion.div>

                                {/* Live Feed Users - With Icons */}
                                <div className="mt-4 flex items-center gap-2 justify-center">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-5 h-5 rounded-full bg-neutral-800 border border-[#121212] flex items-center justify-center text-neutral-500">
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

                        {/* Decorative Elements around card */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 blur-[50px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-blue-500/20 blur-[40px] rounded-full pointer-events-none" />
                    </SlideInRight>

                    {/* 3. Feature Cards (3rd on Mobile, Left on Desktop) */}
                    <div className="order-3 lg:col-start-1">
                        <FadeInUp delay={0.2} className="grid grid-cols-2 gap-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors group">
                                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-medium text-white/90">{t(feature.textKey)}</span>
                                    </div>
                                );
                            })}
                        </FadeInUp>
                    </div>

                    {/* 4. Access Button (Bottom on Mobile, Left on Desktop) */}
                    <div className="order-4 lg:col-start-1">
                        <FadeInUp delay={0.4}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.open('https://auctions.goldprimefzco.com/', '_blank')}
                                className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors shadow-lg shadow-gold/20 w-full md:w-auto justify-center"
                            >
                                <Gavel className="w-5 h-5" />
                                {t('auction.cta')}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </motion.button>
                        </FadeInUp>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
