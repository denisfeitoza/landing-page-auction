import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gavel, CheckCircle2, Mail, ChevronDown, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

const PHONE_CODES = [
  { code: '+55', flag: '🇧🇷', country: 'BR' },
  { code: '+1', flag: '🇺🇸', country: 'US' },
  { code: '+971', flag: '🇦🇪', country: 'AE' },
  { code: '+595', flag: '🇵🇾', country: 'PY' },
  { code: '+961', flag: '🇱🇧', country: 'LB' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+34', flag: '🇪🇸', country: 'ES' },
  { code: '+49', flag: '🇩🇪', country: 'DE' },
  { code: '+33', flag: '🇫🇷', country: 'FR' },
];

const AVAILABLE_COUNTRIES = [
  { key: 'brazil', flag: '🇧🇷' },
  { key: 'paraguay', flag: '🇵🇾' },
  { key: 'uae', flag: '🇦🇪' },
  { key: 'usa', flag: '🇺🇸' },
  { key: 'europe', flag: '🇪🇺' },
  { key: 'other', flag: '🌍' },
];

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [phoneCode, setPhoneCode] = useState('+55');
  const [showPhoneCodes, setShowPhoneCodes] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown="phone"]')) {
        setShowPhoneCodes(false);
      }
      if (!target.closest('[data-dropdown="countries"]')) {
        setShowCountryDropdown(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { data: inserted, error } = await supabase.from('auction_leads').insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_country_code: phoneCode,
        phone: data.phone,
        countries: selectedCountries,
        language,
        source: 'auction_lp',
      }).select('id').single();

      if (error) throw error;

      // Generate short readable ID from UUID
      const shortId = `GP-${(inserted?.id || '').substring(0, 8).toUpperCase()}`;
      setLeadId(shortId);
      setIsSuccess(true);
      reset();
      setSelectedCountries([]);
    } catch (err) {
      console.error('Error submitting lead:', err);
      toast.error(t('auctionLP.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setLeadId('');
    reset();
    setSelectedCountries([]);
    setShowPhoneCodes(false);
    setShowCountryDropdown(false);
    onClose();
  };

  const selectedPhoneCode = PHONE_CODES.find((p) => p.code === phoneCode) || PHONE_CODES[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl bg-[#1a1a14] border border-gold/10 shadow-2xl shadow-gold/5 -webkit-overflow-scrolling-touch"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-gold/5 blur-[50px] pointer-events-none" />

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {t('auctionLP.form.successTitle')}
                    </h3>
                    <p className="text-white/60 text-base mb-8 max-w-sm leading-relaxed">
                      {t('auctionLP.form.successDescription')}
                    </p>

                    {/* Credentials delivery info */}
                    <div className="w-full space-y-3 mb-8">
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-gold" />
                        </div>
                        <div className="text-left">
                          <p className="text-white text-sm font-semibold">{t('auctionLP.form.credEmail')}</p>
                          <p className="text-white/40 text-xs">{t('auctionLP.form.credEmailDesc')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-white text-sm font-semibold">{t('auctionLP.form.credWhatsApp')}</p>
                          <p className="text-white/40 text-xs">{t('auctionLP.form.credWhatsAppDesc')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Lead ID Badge */}
                    <div className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4">
                      <span className="text-white/40 text-xs">{t('auctionLP.form.yourId')}</span>
                      <span className="text-gold font-mono font-bold text-sm">{leadId}</span>
                    </div>

                    {/* WhatsApp CTA - Primary action */}
                    <motion.a
                      href={`https://api.whatsapp.com/send/?phone=556281767612&text=${encodeURIComponent(`${t('auctionLP.form.whatsappMessage')} ${leadId}`)}&type=phone_number&app_absent=0`}
                      target="_blank"
                      rel="noopener noreferrer"
                      animate={{
                        boxShadow: ['0 0 20px rgba(22,163,74,0.3)', '0 0 40px rgba(22,163,74,0.5)', '0 0 20px rgba(22,163,74,0.3)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-full flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-5 rounded-xl font-bold text-base hover:bg-green-500 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t('auctionLP.form.whatsappCta')}
                    </motion.a>
                  </motion.div>
                ) : (
                  /* Form State */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                        <Gavel className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{t('auctionLP.form.title')}</h2>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm mb-6">{t('auctionLP.form.subtitle')}</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      {/* Name row - stacks on very small screens */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-1.5">
                            {t('auctionLP.form.firstName')}
                          </label>
                          <input
                            {...register('firstName')}
                            placeholder={t('auctionLP.form.firstNamePh')}
                            className={`w-full bg-white/[0.04] border ${errors.firstName ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-colors`}
                          />
                          {errors.firstName && (
                            <p className="text-red-400 text-xs mt-1">{t('auctionLP.form.required')}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-1.5">
                            {t('auctionLP.form.lastName')}
                          </label>
                          <input
                            {...register('lastName')}
                            placeholder={t('auctionLP.form.lastNamePh')}
                            className={`w-full bg-white/[0.04] border ${errors.lastName ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-colors`}
                          />
                          {errors.lastName && (
                            <p className="text-red-400 text-xs mt-1">{t('auctionLP.form.required')}</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-1.5">
                          {t('auctionLP.form.email')}
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder={t('auctionLP.form.emailPh')}
                          className={`w-full bg-white/[0.04] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-colors`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">{t('auctionLP.form.invalidEmail')}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-1.5">
                          {t('auctionLP.form.phone')}
                        </label>
                        <div className="flex gap-2">
                          {/* Country code selector */}
                          <div className="relative" data-dropdown="phone">
                            <button
                              type="button"
                              onClick={() => setShowPhoneCodes(!showPhoneCodes)}
                              className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-3 text-white text-sm hover:border-gold/30 transition-colors min-w-[100px]"
                            >
                              <span className="text-lg">{selectedPhoneCode.flag}</span>
                              <span className="text-white/80">{selectedPhoneCode.code}</span>
                              <ChevronDown className="w-3 h-3 text-white/40 ml-auto" />
                            </button>
                            <AnimatePresence>
                              {showPhoneCodes && (
                                <motion.div
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="absolute top-full left-0 mt-1 w-40 bg-[#222218] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[200px] overflow-y-auto"
                                >
                                  {PHONE_CODES.map((pc) => (
                                    <button
                                      key={pc.code}
                                      type="button"
                                      onClick={() => {
                                        setPhoneCode(pc.code);
                                        setShowPhoneCodes(false);
                                      }}
                                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-white/5 transition-colors ${phoneCode === pc.code ? 'bg-gold/10 text-gold' : 'text-white/80'}`}
                                    >
                                      <span className="text-lg">{pc.flag}</span>
                                      <span>{pc.code}</span>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <input
                            {...register('phone')}
                            type="tel"
                            placeholder={t('auctionLP.form.phonePh')}
                            className={`flex-1 bg-white/[0.04] border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-colors`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1">{t('auctionLP.form.required')}</p>
                        )}
                      </div>

                      {/* Countries */}
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-1.5">
                          {t('auctionLP.form.countries')}
                        </label>
                        <div className="relative" data-dropdown="countries">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="w-full flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm hover:border-gold/30 transition-colors"
                          >
                            <span className={`${selectedCountries.length > 0 ? 'text-white' : 'text-white/25'} truncate max-w-[calc(100%-24px)]`}>
                              {selectedCountries.length > 0
                                ? selectedCountries.map((c) => {
                                    const country = AVAILABLE_COUNTRIES.find((ac) => ac.key === c);
                                    return country ? `${country.flag} ${t(`auctionLP.form.country.${c}`)}` : c;
                                  }).join(', ')
                                : t('auctionLP.form.countriesPh')
                              }
                            </span>
                            <ChevronDown className="w-4 h-4 text-white/40" />
                          </button>
                          <AnimatePresence>
                            {showCountryDropdown && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute top-full left-0 right-0 mt-1 bg-[#222218] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[220px] overflow-y-auto"
                              >
                                {AVAILABLE_COUNTRIES.map((country) => (
                                  <button
                                    key={country.key}
                                    type="button"
                                    onClick={() => toggleCountry(country.key)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors ${selectedCountries.includes(country.key) ? 'bg-gold/10' : ''}`}
                                  >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${selectedCountries.includes(country.key) ? 'bg-gold border-gold' : 'border-white/20'}`}>
                                      {selectedCountries.includes(country.key) && (
                                        <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                    </div>
                                    <span className="text-lg">{country.flag}</span>
                                    <span className={selectedCountries.includes(country.key) ? 'text-gold' : 'text-white/80'}>
                                      {t(`auctionLP.form.country.${country.key}`)}
                                    </span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Info text */}
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gold/5 border border-gold/10">
                        <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        <p className="text-white/50 text-xs leading-relaxed">
                          {t('auctionLP.form.credentialsInfo')}
                        </p>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gold text-black px-6 py-4 rounded-xl font-bold text-sm hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {t('auctionLP.form.submitting')}
                          </>
                        ) : (
                          <>
                            <Gavel className="w-4 h-4" />
                            {t('auctionLP.form.submit')}
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
