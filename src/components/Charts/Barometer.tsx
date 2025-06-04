"use client";

import React from "react";
import { Chart } from "react-google-charts";

const styles = {
  dial: {
    width: `auto`,
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

interface BarometerProps {
  id: string; // Unique identifier for the component
  value: number; // The gauge value
  title: string; // The gauge title/label
}

const Barometer: React.FC<BarometerProps> = ({ id, value, title }) => {
  return (
    <div style={styles.dial}>
      <Chart
        height={120}
        chartType="Gauge"
        loader={<div>Loading...</div>}
        data={[
          ["Label", "Value"],
          [title, value],
        ]}
        options={{
          redFrom: 90,
          redTo: 200,
          yellowFrom: 50,
          yellowTo: 90,
          minorTicks: 5,
          min: -200,
          max: 200,
        }}
      />
    </div>
  );
};

export default Barometer;
