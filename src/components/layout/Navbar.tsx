import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Gavel } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import logoSvg from '@/assets/logo-goldprime.svg';

interface SubMenuItem {
  key: string;
  href: string;
}

interface MenuItem {
  key: string;
  href: string;
  submenu?: SubMenuItem[];
}

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.global', href: '#global' },
    { key: 'nav.auction', href: '#auction' },
    { key: 'nav.faq', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Small delay on mobile to allow the menu to start closing
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveSubmenu(null);
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
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logoSvg}
                alt="GoldPrime FZCO"
                className="h-10 w-auto opacity-90"
              />
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
            <div className="flex items-center gap-6">
              <LanguageSwitcher />

              {/* Auction Platform Button */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://auctions.goldprimefzco.com/', '_blank')}
                className="hidden lg:flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-wide rounded-lg bg-white/15 backdrop-blur-xl text-white border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-black/10"
              >
                <Gavel className="w-3.5 h-3.5" />
                {t('nav.auction.platform')}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('#contact')}
                className="hidden lg:flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-wide rounded-lg bg-white/15 backdrop-blur-xl text-white border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-black/10"
              >
                {t('nav.contact')}
              </motion.button>

              {/* Mobile Menu Toggle */}
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
            <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-black/40 backdrop-blur-2xl border-l border-white/10 shadow-2xl overflow-y-auto">
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
                    onClick={() => window.open('https://auctions.goldprimefzco.com/', '_blank')}
                    className="flex justify-center items-center gap-2 w-full bg-white/10 text-white text-xs font-medium uppercase tracking-widest border border-white/10 px-6 py-4 rounded-lg hover:bg-white/15 hover:border-white/20 transition-all shadow-lg"
                  >
                    <Gavel className="w-4 h-4" />
                    {t('nav.auction.platform')}
                  </button>

                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full bg-white/15 backdrop-blur-xl text-white border border-white/20 px-6 py-3 rounded-lg font-medium hover:bg-white/25 hover:border-white/30 transition-all"
                  >
                    {t('nav.contact')}
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
