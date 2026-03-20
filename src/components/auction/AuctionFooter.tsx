import React from 'react';
import { MapPin, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoSvg from '@/assets/logo-goldprime.svg';

export const AuctionFooter: React.FC = () => {
  const { t } = useLanguage();

  const locations = [
    { city: 'São Paulo', country: 'Brazil' },
    { city: 'Ciudad del Este', country: 'Paraguay' },
    { city: 'Dubai', country: 'UAE' },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] pt-16 pb-8 overflow-hidden border-t border-white/[0.04]">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoSvg} alt="GoldPrime" className="h-8 w-auto" />
              <span className="text-gold text-xs font-semibold uppercase tracking-widest">Auctions</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {t('auctionLP.footer.description')}
            </p>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider font-medium mb-4">
              {t('auctionLP.footer.locations')}
            </h4>
            <div className="space-y-3">
              {locations.map((loc, index) => (
                <div key={index} className="flex items-center gap-2 text-white/50 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                  <span>{loc.city}, {loc.country}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider font-medium mb-4">
              {t('auctionLP.footer.contact')}
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:info@goldprimefzco.com"
                className="flex items-center gap-2 text-white/50 text-sm hover:text-gold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                info@goldprimefzco.com
              </a>
              <a
                href="https://www.goldprimefzco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 text-sm hover:text-gold transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                www.goldprimefzco.com
              </a>
              <a
                href="https://auctions.goldprimefzco.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 text-sm hover:text-gold transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                auctions.goldprimefzco.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.05]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} GoldPrime FZCO. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-white/30 hover:text-gold text-sm transition-colors">{t('auctionLP.footer.privacy')}</a>
              <a href="/terms" className="text-white/30 hover:text-gold text-sm transition-colors">{t('auctionLP.footer.terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
