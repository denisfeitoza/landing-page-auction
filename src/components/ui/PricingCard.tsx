import React from 'react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  planName: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  isHighlighted?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  period,
  description,
  features,
  isHighlighted = false,
  buttonText = "Get Started",
  onButtonClick
}) => {
  const cardBg = isHighlighted ? "bg-[#1B1B1B]" : "bg-white";
  const headerBg = isHighlighted ? "bg-[#575757]" : "bg-neutral-100";
  const textColor = isHighlighted ? "text-white" : "text-[#1B1B1B]";
  const priceColor = isHighlighted ? "text-white" : "text-[#1B1B1B]";
  const descColor = isHighlighted ? "text-white" : "text-[#575757]";
  const featureColor = isHighlighted ? "text-[#A8FF36]" : "text-[#1B1B1B]";
  const buttonBg = isHighlighted ? "bg-[#A8FF36]" : "bg-[#1B1B1B]";
  const buttonTextColor = isHighlighted ? "text-[#1B1B1B]" : "text-white";
  const buttonRadius = isHighlighted ? "rounded-full" : "rounded-xl";
  const iconFill = isHighlighted ? "#A8FF36" : "#1B1B1B";

  return (
    <div className={`flex w-full max-w-[402px] h-[613px] flex-col justify-between items-start shadow-lg ${cardBg} p-6 rounded-3xl border border-[#EBEBEB] max-md:max-w-full`}>
      <div className="flex w-full flex-col items-start gap-3 rounded-lg">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-[23px] h-[23px] relative shrink-0">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.66886 13.0527L14.0492 6.67238L13.0491 5.67234L7.66886 11.0526L4.96413 8.34789L3.96409 9.34792L7.66886 13.0527ZM9.01743 18.0315C7.7704 18.0315 6.59827 17.7949 5.50104 17.3217C4.40381 16.8484 3.4494 16.2062 2.63782 15.3949C1.82625 14.5836 1.18367 13.6296 0.71011 12.5329C0.236703 11.4361 0 10.2643 0 9.01743C0 7.7704 0.236624 6.59827 0.709873 5.50104C1.18312 4.40381 1.82538 3.4494 2.63664 2.63782C3.4479 1.82625 4.40191 1.18367 5.49867 0.71011C6.59543 0.236703 7.76724 0 9.0141 0C10.2611 0 11.4333 0.236624 12.5305 0.709872C13.6277 1.18312 14.5821 1.82538 15.3937 2.63664C16.2053 3.4479 16.8479 4.40191 17.3214 5.49867C17.7948 6.59543 18.0315 7.76724 18.0315 9.0141C18.0315 10.2611 17.7949 11.4333 17.3217 12.5305C16.8484 13.6277 16.2062 14.5821 15.3949 15.3937C14.5836 16.2053 13.6296 16.8479 12.5329 17.3214C11.4361 17.7948 10.2643 18.0315 9.01743 18.0315Z" fill={iconFill} />
              </svg>
            </div>
            <div className={`${featureColor} text-[13px] font-medium leading-[19px]`}>
              {feature.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className={`flex flex-col items-start gap-8 w-full ${headerBg} p-3 rounded-xl`}>
        <div className="flex flex-col justify-center items-start gap-5 w-full">
          <div className={`${textColor} text-center text-[23px] font-medium leading-[30px]`}>
            {planName}
          </div>
          <div className="flex justify-center items-center gap-3">
            <div className={`${priceColor} text-center text-[38px] font-medium leading-[46px]`}>
              {price}
            </div>
            <div className="text-[#575757] text-center text-[13px] font-medium leading-[19px]">
              {period}
            </div>
          </div>
          <div className={`${descColor} text-[15px] font-medium leading-[23px] w-full`}>
            {description}
          </div>
        </div>
      </div>
      
      <button 
        onClick={onButtonClick}
        className={`flex justify-center items-center gap-3 w-full cursor-pointer ${buttonBg} px-6 py-3 ${buttonRadius} border border-[#EBEBEB] hover:opacity-90 transition-opacity`}
      >
        <div className={`${buttonTextColor} text-[17px] font-medium leading-[25px]`}>
          {buttonText}
        </div>
      </button>
    </div>
  );
};
