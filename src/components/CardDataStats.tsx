import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}


  

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
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
      <div className="flex items-center space-x-2">
        <div className="flex h-5.5 w-5.5 items-center justify-center ">
          {children}
        </div>
        <span >{title}</span> 
      </div>
      <div className="d-flex justify-content-center align-items-center" >
        <div className="text-center">
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="text-center mb-2">
          <span className="text-sm font-medium">{title}</span>
        </div>

        <div className="text-center">
          <span className={`text-sm font-medium ${textColor} p-1`}>
            {rate && rateText+" "+rate+"%"}
          </span>
        </div>
    

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          {/* {rate} */}

          {/* {levelUp && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )} */}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
