import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { FloatingButtons } from '@/components/ui/FloatingButtons';
import GoldPrimeHero from '@/components/sections/GoldPrimeHero';
import { ClientLogoSection } from '@/components/sections/ClientLogoSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServiceCenterSection } from '@/components/sections/ServiceCenterSection';
import { GlobalPresenceSection } from '@/components/sections/GlobalPresenceSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { AuctionSection } from '@/components/sections/AuctionSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <main className="flex flex-col w-full bg-black font-sans min-h-screen">
      <ScrollProgress />
      <Navbar />
      <FloatingButtons />

      <GoldPrimeHero />
      <ClientLogoSection />
      <AboutSection />
      <ProcessSection />
      <ServiceCenterSection />
      <GlobalPresenceSection />
      <JourneySection />
      <AuctionSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
};

export default Index;
