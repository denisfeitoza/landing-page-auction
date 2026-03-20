import { motion, AnimatePresence } from 'framer-motion'
import { Check, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export type AuctionStatus = 'live' | 'sold' | 'transition';

interface Bid {
  name: string;
  amount: string;
}

interface IPhoneScrollAnimationProps {
  imageSrc: string
  status: AuctionStatus
  winnerName?: string
  latestBid?: Bid | null
}

export default function IPhoneScrollAnimation({ imageSrc, status, winnerName, latestBid }: IPhoneScrollAnimationProps) {
  const { language } = useLanguage()
  const soldLabel = language === 'pt-BR' ? 'VENDIDO' : language === 'es' ? 'VENDIDO' : 'SOLD'
  const formatAmount = (amt: string) => {
    if (amt.includes('+')) return amt;
    return `+${amt}`;
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-transparent">
      {/* Container for Phone Image */}
      <div className="relative z-10 h-[100%] w-auto aspect-[9/19] flex items-center justify-center translate-y-4">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={imageSrc}
            src={imageSrc}
            alt="Auction Item"
            className="absolute w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            initial={{ x: 150, opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: status === 'sold' ? 1.05 : 1.25,
              rotate: 0,
              filter: status === 'transition' ? 'blur(4px) brightness(0.7)' : 'blur(0px) brightness(1)'
            }}
            exit={{ x: -150, opacity: 0, scale: 0.8, rotate: -10 }}
            transition={{
              type: "spring",
              stiffness: 120, // Slightly slower, more fluid
              damping: 20,
              mass: 1
            }}
          />
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {status === 'live' && latestBid && (
          <motion.div
            key={latestBid.amount + latestBid.name}
            className="absolute bottom-6 left-6 z-30 bg-white/10 backdrop-blur-2xl border border-white/20 text-white pl-2 pr-4 py-1.5 rounded-full flex items-center gap-2 shadow-2xl"
            initial={{ opacity: 0, y: 20, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center text-green-400 shrink-0">
              <User size={12} />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white/90 font-semibold truncate max-w-[120px]">
                {latestBid.name}
              </span>
              <span className="font-bold text-green-400">
                {formatAmount(latestBid.amount)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'sold' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black/20 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="border-[3px] border-gold/50 p-3 px-8 rounded-2xl bg-gold/10 backdrop-blur-xl -rotate-6 shadow-[0_0_50px_rgba(212,175,55,0.35)] mb-6 border-dashed"
              initial={{ scale: 3, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: -6 }}
              transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
            >
              <h2 className="text-5xl font-black text-gold tracking-[0.25em] uppercase mb-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                {soldLabel}
              </h2>
            </motion.div>

            {winnerName && (
              <motion.div
                className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 px-6 py-2.5 rounded-full flex items-center gap-3 shadow-2xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-green-400" strokeWidth={4} />
                </div>
                <span className="text-white font-bold text-base">
                  {winnerName}
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {status === 'transition' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <div className="w-12 h-12 border-4 border-white/5 border-t-gold rounded-full animate-spin shadow-2xl" />
              <div className="absolute inset-0 blur-lg bg-gold/20 rounded-full animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
