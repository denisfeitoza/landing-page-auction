import React, { useState } from 'react';
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
import { LeadFormModal } from '@/components/auction/LeadFormModal';

const AuctionLP = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);

  return (
    <main className="flex flex-col w-full bg-black font-sans min-h-screen">
      <ScrollProgress />
      <AuctionNavbar onRequestAccess={openForm} />

      <AuctionHero onRequestAccess={openForm} />
      <AuctionAdvantages />
      <AuctionHowItWorks />
      {/* <AuctionVideo /> */}
      <AuctionLiveDemo onRequestAccess={openForm} />
      <AuctionGrades />
      {/* <AuctionModels /> */}
      <AuctionTrust />
      <AuctionFAQ />
      <AuctionCTA onRequestAccess={openForm} />
      <AuctionFooter />
      <WhatsAppBubble />

      <LeadFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </main>
  );
};

export default AuctionLP;
