import React from "react";
import GaugeChart from "react-gauge-chart";

// Define styles for the component
const styles = {
  dial: {
    display: "inline-block",
    width: "250px",
    height: "auto",
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px",
  },
  title: {
    fontSize: "1em",
    color: "#000",
  },
};

// Define the props interface
interface DialProps {
  id: string;
  value: number; // Expecting a numeric value
  title: string;
}

const Dial: React.FC<DialProps> = ({ id, value, title }) => {
  const percent = value / 100; // Convert value to percentage

  return (
    <div style={styles.dial}>
      <GaugeChart
        id={id}
        nrOfLevels={30}
        colors={["#00cccc", "#00ffff", "#ff0000"]}
        arcWidth={0.5}
        percent={percent}
        textColor="#000"
        formatTextValue={(value: any) => value}
      />
      <div style={styles.title}>{title}</div>
    </div>
  );
};

export default Dial;
