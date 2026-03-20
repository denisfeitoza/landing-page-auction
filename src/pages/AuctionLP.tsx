import React from 'react';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { AuctionNavbar } from '@/components/auction/AuctionNavbar';
import { AuctionHero } from '@/components/auction/AuctionHero';
import { AuctionAdvantages } from '@/components/auction/AuctionAdvantages';
import { AuctionHowItWorks } from '@/components/auction/AuctionHowItWorks';
import { AuctionGrades } from '@/components/auction/AuctionGrades';
import { AuctionModels } from '@/components/auction/AuctionModels';
import { AuctionLiveDemo } from '@/components/auction/AuctionLiveDemo';
import { AuctionVideo } from '@/components/auction/AuctionVideo';
import { AuctionTrust } from '@/components/auction/AuctionTrust';
import { AuctionFAQ } from '@/components/auction/AuctionFAQ';
import { AuctionCTA } from '@/components/auction/AuctionCTA';
import { AuctionFooter } from '@/components/auction/AuctionFooter';
import { WhatsAppBubble } from '@/components/auction/WhatsAppBubble';

const AuctionLP = () => {
  return (
    <main className="flex flex-col w-full bg-black font-sans min-h-screen">
      <ScrollProgress />
      <AuctionNavbar />

      <AuctionHero />
      <AuctionAdvantages />
      <AuctionHowItWorks />
      {/* <AuctionVideo /> */}
      <AuctionLiveDemo />
      <AuctionGrades />
      {/* <AuctionModels /> */}
      <AuctionTrust />
      <AuctionFAQ />
      <AuctionCTA />
      <AuctionFooter />
      <WhatsAppBubble />
    </main>
  );
};

export default AuctionLP;
