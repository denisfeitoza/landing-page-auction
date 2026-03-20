import React from 'react';
import { motion } from 'framer-motion';
import { useContactForm } from '@/hooks/useContactForm';
import { useLanguage } from '@/contexts/LanguageContext';

export const ContactForm: React.FC = () => {
  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } = useContactForm();
  const { t } = useLanguage();

  const inputClasses = `
    w-full bg-white/5 border border-white/10 rounded-xl
    px-4 py-4 text-white placeholder-white/40 
    focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300
    font-medium
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <input
          type="text"
          placeholder={t('contact.form.name')}
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={inputClasses}
        />
        {errors.name && (
          <span className="text-destructive text-sm mt-2 block font-medium">{errors.name}</span>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder={t('contact.form.email')}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={inputClasses}
        />
        {errors.email && (
          <span className="text-destructive text-sm mt-2 block font-medium">{errors.email}</span>
        )}
      </div>

      <div>
        <textarea
          placeholder={t('contact.form.message')}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={4}
          className={`${inputClasses} resize-none h-32 pt-4`}
        />
        {errors.message && (
          <span className="text-destructive text-sm mt-2 block font-medium">{errors.message}</span>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01, backgroundColor: '#E5C158' }}
        whileTap={{ scale: 0.99 }}
        className="w-full bg-gold text-charcoal h-14 rounded-xl font-bold text-base uppercase tracking-wider shadow-lg shadow-gold/10 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center transition-colors"
      >
        {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
      </motion.button>
    </form>
  );
};
