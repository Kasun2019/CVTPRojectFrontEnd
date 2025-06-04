"use client";

import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

// Define styles
const styles = {
  dial: {
    display: "inline-block",
    width: `100%`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px",
  },
  title: {
    fontSize: "1em",
    color: "#000",
  },
};

// Define the props type for the Speedometer component
interface SpeedometerProps {
  id: string; // Unique identifier for the component
  value: number; // Current value to display on the speedometer
  title: string; // Title to display below the speedometer
}

// Speedometer component
const Speedometer: React.FC<SpeedometerProps> = ({ id, value, title }) => {
  return (
    <div style={styles.dial} id={id}>
      <ReactSpeedometer
        maxValue={120}
        minValue={0}
        height={100}
        width={200}
        value={value}
        needleTransition="easeQuadIn"
        needleTransitionDuration={1000}
        needleColor="blue"
        startColor="green"
        segments={10}
        endColor="red"
      />
      <div style={styles.title}>{title}</div>
    </div>
  );
};

export default Speedometer;
