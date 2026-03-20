import React from 'react';

interface CountryItemProps {
  flagSrc: string;
  countryName: string;
  altText?: string;
}

export const CountryItem: React.FC<CountryItemProps> = ({ 
  flagSrc, 
  countryName, 
  altText = "" 
}) => {
  return (
    <div className="flex items-center gap-4 max-sm:flex-col max-sm:text-center">
      <img
        src={flagSrc}
        alt={altText}
        className="w-[50px] h-[50px] shrink-0"
      />
      <div className="text-[#3B3A38] text-[25px] font-normal leading-[25px] text-center">
        {countryName.includes('\n') ? (
          countryName.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < countryName.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))
        ) : (
          countryName
        )}
      </div>
    </div>
  );
};
