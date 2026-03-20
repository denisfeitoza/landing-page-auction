import React from 'react';

interface ProcessCardProps {
  stepNumber: string;
  title: string;
  description: string;
  iconSvg: string;
  backgroundColor?: string;
  isHighlighted?: boolean;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({
  stepNumber,
  title,
  description,
  iconSvg,
  backgroundColor = "bg-neutral-100",
  isHighlighted = false
}) => {
  const iconBgColor = isHighlighted ? "bg-white" : "bg-[#1B1B1B]";
  const arrowBgColor = isHighlighted ? "bg-[#1B1B1B]" : "bg-transparent border border-[#575757]";
  const arrowStroke = isHighlighted ? "white" : "#1B1B1B";

  return (
    <div className={`flex w-full max-w-[402px] h-[402px] flex-col justify-between items-start ${backgroundColor} p-6 rounded-xl max-md:max-w-full max-sm:h-auto max-sm:min-h-[350px]`}>
      <div className="flex w-full flex-col items-start gap-12">
        <div className={`flex w-14 h-14 justify-center items-center ${iconBgColor} p-1 rounded-full`}>
          <div dangerouslySetInnerHTML={{ __html: iconSvg }} />
        </div>
        <div className="text-[#1B1B1B] text-right text-[75px] font-medium leading-[25px] w-full">
          {stepNumber}
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="text-[#1B1B1B] text-[17px] font-normal leading-[17px] max-w-[299px]">
          {description}
        </div>
        <div className={`flex w-12 h-12 justify-center items-center ${arrowBgColor} p-1 rounded-full`}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.086 6.69064L6.69067 16.086" stroke={arrowStroke} strokeWidth="1.42354" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.49023 6.64319L16.086 6.68969L16.1334 13.2864" stroke={arrowStroke} strokeWidth="1.42354" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
