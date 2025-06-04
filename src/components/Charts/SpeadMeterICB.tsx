"use client";

import React from "react";
import GaugeBg from "./gauge-bg.png";

// Constants for gauge dimensions and configuration
const gaugeWidth = 170;
const gaugeHeight = 50;
const gaugeContentWidth = gaugeWidth - 12;
const gaugeBarsNb = 10;
const gaugeBarWidth = gaugeContentWidth / gaugeBarsNb;
const gaugeBarMargin = 1;
const gaugeBarRadius = 10;

const lowBattery = 25;

// Inline styles
const styles = {
  container: {
    position: "relative" as const,
    width: `${gaugeWidth}px`,
    height: `${gaugeHeight}px`,
  },
  barsContainer: {
    width: `${gaugeWidth}px`,
    height: `${gaugeHeight}px`,
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginLeft: "3px",
  },
  barContainer: {
    width: `${gaugeBarWidth}px`,
    height: `${gaugeHeight - 10}px`,
    paddingLeft: `${gaugeBarMargin}px`,
    paddingRight: `${gaugeBarMargin}px`,
  },
  bar: (barColor: string) => ({
    width: `${gaugeBarWidth - gaugeBarMargin * 2}px`,
    height: "100%",
    backgroundColor: barColor,
    zIndex: 1,
  }),
  barFirst: {
    borderTopLeftRadius: `${gaugeBarRadius}px`,
    borderBottomLeftRadius: `${gaugeBarRadius}px`,
  },
  barLast: {
    borderTopRightRadius: `${gaugeBarRadius}px`,
    borderBottomRightRadius: `${gaugeBarRadius}px`,
  },
  barRed: {
    backgroundColor: "#8b0000",
  },
  barGrey: {
    backgroundColor: "#e6e6e6",
  },
  bg: {
    position: "absolute" as const,
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 0,
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  barText: (barColor: string) => ({
    //backgroundColor: barColor,
    padding: "5px",
    borderRadius: "5px",
    color: barColor, // Ensure the text is visible against the background
  }),
};

// Define props type for the Battery component
const sizeLevelColors = {
  Low: "#3f5c8c", // Blue
  Moderate: "#ffd700", // Yellow
  High: "#ffa500", // Orange
  Critical: "#ff4500", // Red-Orange
  "Extreme Critical": "#8b0000", // Dark Red
} as const;

// Type for valid size levels
type SizeLevel = keyof typeof sizeLevelColors;

// Define props type for the Battery component
interface BatteryProps {
  percentage: number; // Percentage of battery charge
  sizeLevel: SizeLevel; // Complexity size level
}

// Battery Component
const Battery: React.FC<BatteryProps> = ({ percentage,sizeLevel }) => {
  // Calculate the number of filled bars
  const filledBars = Math.round((percentage / 100) * gaugeBarsNb);
  const barIndices = Array.from({ length: gaugeBarsNb }, (_, index) => index);


  const barColor = sizeLevelColors[sizeLevel] || "#3f5c8c"; // Default to blue if no match


  return (
    <>
      {/* Battery Container */}
      <div style={styles.container}>
        {/* Background Image */}
        <img src={GaugeBg.src} style={styles.bg} alt="Battery Background" />

        {/* Bars */}
        <div style={styles.barsContainer}>
          {barIndices.map((index) => (
            <div key={index} style={styles.barContainer}>
              <div
                style={{
                  ...styles.bar(barColor),
                  ...(index === 0 && styles.barFirst),
                  ...(index === gaugeBarsNb - 1 && styles.barLast),
                  ...(index >= filledBars && styles.barGrey),
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Battery Percentage Text */}
      <div style={styles.barText(barColor)}>
        Size of function -{" "}
        <span style={percentage < lowBattery ? styles.green : styles.red}>
          {percentage}%
        </span>{" "}
        ({sizeLevel})
      </div>
    </>
  );
};

export default Battery;
