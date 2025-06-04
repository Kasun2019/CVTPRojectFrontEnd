import React from "react";
import Thermometer from "react-thermometer-component";

const styles = {
  dial: {
    display: "inline-block",
    width: `50%`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px"
  },
  title: {
    fontSize: "1em",
    color: "#000",
    marginTop: "10px"
  }
};

interface TempProps {
  id: string;
  value: number;
  title: string;
  maxVal: number;
}

const Temp: React.FC<TempProps> = ({ id, value, title , maxVal }) => {
  return (
    <div style={styles.dial} id={id}>
      <Thermometer
        theme="light"
        value={value}
        max={maxVal}
        steps={1}
        format=""
        size="normal"
        height="150"
      />
      <div style={styles.title}>
        {title}
      </div>
    </div>
  );
};

export default Temp;
