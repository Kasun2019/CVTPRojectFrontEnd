import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  details: ReactNode;
}


  

const CardDataCommon: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  details
}) => {
  let rateText = '';
  let textColor = '';

  if (parseFloat(rate) > 80) {
    rateText = 'Critical';
    textColor = 'bg-red-400'; // Amber color
  } else if (parseFloat(rate) > 50) {
    rateText = 'High';
    textColor = 'bg-amber-400'; // Green color
  }else if (parseFloat(rate) > 35) {
    rateText = 'Moderate';
    textColor = 'bg-amber-200'; // Green color
  }else if (parseFloat(rate) >= 20) {
    rateText = 'Low';
    textColor = 'bg-green-300'; // Green color
  }else if (parseFloat(rate) < 20) {
    rateText = 'Very Low';
    textColor = 'bg-green-400'; // Red color
  }
  return (
    <div className="rounded-sm   bg-white px-5.5 py-3 shadow-default  justify-content-center align-items-center">
      <div className="flex items-center space-x-2 text-center">
        <div className="text-center">
          <span className="text-center">{title}</span> 
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center" >
        <div className="text-center">
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
          {children}
      </div>
    </div>
  );
};

export default CardDataCommon;
