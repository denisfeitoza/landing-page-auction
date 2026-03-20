import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gavel, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import logoSvg from '@/assets/logo-goldprime.svg';

export const AuctionNavbar: React.FC<{ onRequestAccess: () => void }> = ({ onRequestAccess }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { key: 'auctionLP.nav.advantages', href: '#advantages' },
    { key: 'auctionLP.nav.howItWorks', href: '#how-it-works' },
    { key: 'auctionLP.nav.grades', href: '#grades' },
    { key: 'auctionLP.nav.models', href: '#models' },
    { key: 'auctionLP.nav.faq', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800/50'
          : 'bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logoSvg}
                alt="GoldPrime FZCO"
                className="h-8 w-auto opacity-90"
              />
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-white/30 text-sm">|</span>
                <span className="text-gold text-xs font-semibold uppercase tracking-widest">Auctions</span>
              </div>
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300 group"
                >
                  {t(item.key)}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRequestAccess}
                className="hidden lg:flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wide rounded-lg bg-gold text-black hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
              >
                <Gavel className="w-3.5 h-3.5" />
                {t('auctionLP.nav.accessPlatform')}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-black/90 backdrop-blur-2xl border-l border-white/10 shadow-2xl overflow-y-auto">
              <div className="p-6 pt-24 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center w-full px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
                  >
                    <span className="font-medium">{t(item.key)}</span>
                  </motion.button>
                ))}

                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); onRequestAccess(); }}
                    className="flex justify-center items-center gap-2 w-full bg-gold text-black text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                  >
                    <Gavel className="w-4 h-4" />
                    {t('auctionLP.nav.accessPlatform')}
                  </button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
