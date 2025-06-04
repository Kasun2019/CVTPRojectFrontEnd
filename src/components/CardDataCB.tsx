import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  children?: ReactNode; // Add children prop to allow nested components
}

const CardDataCB: React.FC<CardDataStatsProps> = ({ title, children }) => {
  return (
    <div className="rounded-sm bg-white px-5.5 py-3 shadow-default justify-content-center align-items-center">
      <div className="flex items-center space-x-2">
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>{title}</span>
      </div>
      {/* Render any child components passed */}
      <div>{children}</div>
    </div>
  );
};

export default CardDataCB;