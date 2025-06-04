"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardDataCB from "../CardDataCB";
import Battery from "./SpeadMeterICB";
import Speedometer from "./Speedometer";
import ReactApexChart from "react-apexcharts";
import Temp from "./Temp";
import Barometer from "./Barometer";

interface FunctionData {
  ccn: number;
  file: string;
  function: string;
  param: number;
  tokens: number;
}

interface IssueData {
  blank_lines: string[];
  excessive_spaces: string[];
  naming_conventions: string[];
  total_blank_lines: number;
  variable_declaration: string[];
}

interface IcbDataItem {
  name: string;
  value: number;
}

interface ChartCCProps {
  data: {
    average_complexity: number;
    class_complexities: Record<string, number>;
    class_names: string[];
    functions: FunctionData[];
    total_complexity: number;
    total_functions: number;
  };
  icbData: IcbDataItem[];
}

const ChartCbDetails: React.FC<ChartCCProps> = ({ data, icbData }) => {
  const router = useRouter();

  const [functionComplexities, setFunctionComplexities] = useState(0);
  const [totalLineCount, setTotalLineCount] = useState(0);
  const [totalThreadCount, setTotalThreadCount] = useState(0);
  const [batteryPercentage, setBatteryPercentage] = useState(0);
  const [speedThreadLeavel, setSpeedThreadLeavel] = useState('');
  const [batterySizeLevel, setBatterySizeLevel] = useState('');

  const [pieEmptyLines, setPieEmptyLines] = useState(0);
  const [pieNonEmptyLines, setPieNonEmptyLines] = useState(0);
  const [piePerTot, setPiePerTot] = useState(0);

  const [cyclomaticComplexity, setCyclomaticComplexity] = useState(0);
  const [cyclomaticComplexityRate, setCyclomaticComplexityRate] = useState('');
  const [icbComplexityRate, setIcbComplexityRate] = useState('');
  const [icbComplexity, seticbComplexity] = useState(0);

 

  useEffect(() => {
  if (icbData) {
    // Extracting values from icbData
    const funcComplexity = icbData.find((item) => item.name === "function_complexities")?.value || 0;
    const totalLines = icbData.find((item) => item.name === "total_line_count")?.value || 0;
    const totalThread = icbData.find((item) => item.name === "thread_total")?.value || 0;
    const emptyLines = icbData.find((item) => item.name === "empty_lines")?.value || 0;
    const nonEmptyLines = icbData.find((item) => item.name === "non_empty_lines")?.value || 0;
    const perTot = icbData.find((item) => item.name === "perTot")?.value || 0;
    const cyclomaticComplexity = icbData.find((item) => item.name === "cyclomatic_complexity")?.value || 0;
    const icbTotal = icbData.find((item) => item.name === "icb_total")?.value || 0;

    setFunctionComplexities(funcComplexity);
    setTotalLineCount(totalLines);
    setTotalThreadCount(totalThread);

    setPieEmptyLines(emptyLines);
    setPieNonEmptyLines(nonEmptyLines);
    setPiePerTot(perTot);

    setCyclomaticComplexity(cyclomaticComplexity);
    seticbComplexity(icbTotal);
    
    console.log("icb "+(icbComplexity))
    let percentage = 0;
    let complexityLevel = "";
    // Calculate battery percentage dynamically
    const ratio = funcComplexity / totalLines;

      if (ratio < 2) {
        percentage = 20;
        complexityLevel = "Low";
      } else if (ratio >= 2 && ratio < 5) {
        percentage = 50;
        complexityLevel = "Moderate";
      } else if (ratio >= 5 && ratio < 8) {
        percentage = 80;
        complexityLevel = "High";
      } else if (ratio >= 8 && ratio <= 10) {
        percentage = 100;
        complexityLevel = "Critical";
      } else if (ratio > 10) {
        percentage = 100;
        complexityLevel = "Extreme Critical";
      }         

    const threadLevel = determineThreadLevel(totalThread);
    setSpeedThreadLeavel(threadLevel);
    setBatteryPercentage(percentage);
    setBatterySizeLevel(complexityLevel);


    let complexityRating = "";

    if (cyclomaticComplexity >= 1 && cyclomaticComplexity <= 10) {
        complexityRating = "CC : Good"; // Simple and maintainable
    } else if (cyclomaticComplexity >= 11 && cyclomaticComplexity <= 20) {
        complexityRating = "CC : Moderate"; // Moderate complexity
    } else if (cyclomaticComplexity >= 21 && cyclomaticComplexity <= 30) {
        complexityRating = "CC : Bad"; // High complexity, refactoring recommended
    } else if (cyclomaticComplexity > 30) {
        complexityRating = "CC : Critical"; // Extremely complex, urgent refactoring required
    } else {
        complexityRating = "CC : Undefined"; // In case of invalid or undefined value
    }


    let icbRating = "";

    if (icbTotal >= 1 && icbTotal <= 100) {
      icbRating = "ICB : Good"; // Simple and maintainable
    } else if (icbTotal >= 101 && icbTotal <= 200) {
      icbRating = "ICB : Moderate"; // Moderate complexity
    } else if (icbTotal >= 201 && icbTotal <= 300) {
      icbRating = "ICB : Bad"; // High complexity, refactoring recommended
    } else if (icbTotal > 301) {
      icbRating = "ICB : Critical"; // Extremely complex, urgent refactoring required
    } else {
      icbRating = "ICB : Undefined"; // In case of invalid or undefined value
    }

    setCyclomaticComplexityRate(complexityRating)
    setIcbComplexityRate(icbRating)


  } else {
    console.error("Invalid icbData format:", icbData);
  }
}, [icbData]);

const determineThreadLevel = (totalThread: number): string => {
  if (totalThread <= 24) {
    return "Low Thread: Keep the same level for optimal performance.";
  } else if (totalThread > 24 && totalThread <= 36) {
    return "Moderate Thread: Review if threading can be optimized.";
  } else if (totalThread > 36 && totalThread <= 60) {
    return "High Thread: Consider reducing the number of threads.";
  } else if (totalThread > 60 && totalThread <= 84) {
    return "Critical Thread: Immediate action required to optimize thread usage.";
  } else {
    return "Extreme Critical Thread: System is under extreme load; urgent optimization needed.";
  }
};

const chartData = {
  series: [pieNonEmptyLines,pieEmptyLines],

  options: {
    chart: { type: "donut" },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: false },
    fill: { colors: ['#17a589', '#d0ece7'] },
    states: {
      hover: { filter: { type: "lighten", value: 0.5 } },
      active: { filter: { type: "none", value: 0 } }
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: { show: false },
            total: {
              show: true,
              showAlways: true,
              formatter: function (w) {

                const totals = w.globals.seriesTotals;

                const result = totals.reduce((a, b) => (a/(a + b))*100);
                console.log("totals");
                console.log(result);

                return (result).toFixed(2);
             
                // return piePerTot.toFixed(2); 
              }
            }
          }
        }
      }
    }
  }
};

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Card for Function Complexities */}
        <CardDataCB title="Function Size">
          <span>Total Line Count {totalLineCount} Lines</span>
          <Battery percentage={batteryPercentage} sizeLevel={batterySizeLevel}/>
        </CardDataCB>

        {/* Card for Total Lines */}
        <CardDataCB title="Thread">
          <Speedometer id="dial5" value={totalThreadCount} title={speedThreadLeavel}/>
        </CardDataCB>

        <CardDataCB title="Code Quality">
          <ReactApexChart options={chartData.options} series={chartData.series} type="donut"/>
          <span>Empty {pieEmptyLines} Lines</span><br/>
          <span>Excecuted {pieNonEmptyLines} Lines</span>
        </CardDataCB>

        <CardDataCB title="Helth">
          {/* <Barometer id="dial9" value={30} title="Barometer" /> */}
          <Temp id="dial7" value={cyclomaticComplexity} title={cyclomaticComplexityRate} maxVal={50}/>
          <Temp id="dial7" value={icbComplexity} title={icbComplexityRate} maxVal={300}/>
        </CardDataCB>
      </div>
    </>
  );
};

export default ChartCbDetails;
