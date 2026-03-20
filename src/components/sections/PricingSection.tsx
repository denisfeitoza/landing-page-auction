import React from 'react';
import { PricingCard } from '@/components/ui/PricingCard';

export const PricingSection: React.FC = () => {
  const pricingPlans = [
    {
      planName: "Starter Plan",
      price: "$300.00",
      period: "/Month",
      description: "Perfect for small projects and startups looking to kickstart their ideas.",
      features: [
        { text: "Focused on functionality", included: true },
        { text: "Clear Communication", included: true },
        { text: "2 Revisions for a polished.", included: true },
        { text: "Project Flexibility", included: true },
        { text: "Professional Quality", included: true },
        { text: "1-Week Turnaround deadlines.", included: true },
        { text: "Revisions Included", included: true },
        { text: "1 Design Concept", included: true }
      ],
      isHighlighted: false
    },
    {
      planName: "Premium Plan",
      price: "$1,200.00",
      period: "/Month",
      description: "Best for established brands aiming for impactful, user-focused designs.",
      features: [
        { text: "Multiple Design Concepts", included: true },
        { text: "Unlimited Revisions", included: true },
        { text: "Prototyping Included", included: true },
        { text: "User-Centered Focus", included: true },
        { text: "Responsive and Scalable Design", included: true },
        { text: "Comprehensive Brand Consistency", included: true },
        { text: "High-Quality Deliverables", included: true },
        { text: "Dedicated Support", included: true }
      ],
      isHighlighted: true
    },
    {
      planName: "Essentials Plan",
      price: "$600.00",
      period: "/Month",
      description: "Perfectly suited for laying a strong foundation for your product.",
      features: [
        { text: "Two Unique Design Concepts", included: true },
        { text: "Three Revision Rounds", included: true },
        { text: "Responsive Design", included: true },
        { text: "Strategic Design Approach", included: true },
        { text: "Professional Quality", included: true },
        { text: "Timely Turnaround", included: true },
        { text: "Collaborative Process", included: true },
        { text: "Affordable Investment", included: true }
      ],
      isHighlighted: false
    }
  ];

  const handlePlanSelect = (planName: string) => {
    alert(`Selected ${planName}! Contact us to get started.`);
  };

  return (
    <section className="flex justify-center items-center w-full overflow-hidden relative bg-white py-28 px-14 max-sm:px-5 max-sm:py-12">
      <div className="flex w-full max-w-[1253px] flex-col items-center gap-10">
        <h2 className="text-[#1B1B1B] text-center text-3xl font-medium leading-[38px] max-sm:text-2xl max-sm:leading-[30px]">
          <span>
            Transparent Pricing, Tailored Solutions,
            <br />
            Exceptional Design for Every Need
          </span>
        </h2>
        <div className="flex items-start gap-6 w-full max-md:flex-wrap max-md:justify-center max-sm:gap-4">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              planName={plan.planName}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              isHighlighted={plan.isHighlighted}
              onButtonClick={() => handlePlanSelect(plan.planName)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
