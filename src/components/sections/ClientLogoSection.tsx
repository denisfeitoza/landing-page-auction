import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { PremiumBadgeSlider } from '@/components/ui/PremiumBadgeSlider';

export const ClientLogoSection: React.FC = () => {
  return (
    <SectionWrapper id="partners" className="-mt-16 md:mt-0 py-8 md:py-20 lg:py-24 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <PremiumBadgeSlider />
      </div>
    </SectionWrapper>
  );
};
