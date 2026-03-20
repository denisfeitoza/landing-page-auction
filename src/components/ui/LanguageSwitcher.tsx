import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg shadow-black/5">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('pt-BR')}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${language === 'pt-BR'
          ? 'bg-white/20 backdrop-blur-xl text-white border border-white/30 shadow-lg shadow-white/10'
          : 'text-white/60 hover:text-white/90 hover:bg-white/5'
          }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="text-sm">🇧🇷</span>
          <span className="hidden sm:inline">PT</span>
        </span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${language === 'en'
          ? 'bg-white/20 backdrop-blur-xl text-white border border-white/30 shadow-lg shadow-white/10'
          : 'text-white/60 hover:text-white/90 hover:bg-white/5'
          }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="text-sm">🇺🇸</span>
          <span className="hidden sm:inline">EN</span>
        </span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('es')}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${language === 'es'
          ? 'bg-white/20 backdrop-blur-xl text-white border border-white/30 shadow-lg shadow-white/10'
          : 'text-white/60 hover:text-white/90 hover:bg-white/5'
          }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="text-sm">🇪🇸</span>
          <span className="hidden sm:inline">ES</span>
        </span>
      </motion.button>
    </div>
  );
};
