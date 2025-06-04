"use client";
import { ApexOptions } from "apexcharts";
import React,{useEffect,useState} from "react";
import ReactApexChart from "react-apexcharts";
import { useRouter,useSearchParams } from 'next/navigation';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface FunctionData {
  ccn: number;
  file: string;
  function: string;
  param: number;
  tokens: number;
}

interface ChartCCProps {
  data: {
    nesting_levels_total: number;
    nesting_levels_count: number;
    control_structure_total: number;
    control_structure_count: number;
  };
}
interface SeriesData {
  indexLabel: string;
  y: number;
}
const ChartFunctionEve = ({ data }: { data: any[][] }) => {

const router = useRouter();
const [chartOneColumn,setChartOneColumn] = useState<SeriesData[]>([]);
const [chartOneValues,setChartOneValues] = useState<number[]>([]);
const [totalComplexity,setTotalComplexity] = useState(0);
const [totalFunction,setTotalFunction] = useState(0);
const searchParams = useSearchParams();

// Get query parameters from URL
const [category, setCategory] = useState<string | null>(searchParams.get('category'));
const [value, setValue] = useState<string | null>(searchParams.get('value'));

const options = {
  exportEnabled: true,
  animationEnabled: true,
  theme: "light2",
  // title: {
  //     text: "Developer Work Week"
  // },
  subtitles: [{
      text: "Function"
  }],
  indexLabelPlacement: "inside",
  data: [{
      type: "doughnut",
      //startAngle: 90,
      indexLabel: "{indexLabel} ({y})",
      yValueFormatString: "#,##0.0#"%"",
      dataPoints: chartOneColumn
  }]
};
useEffect(()=>{
  console.log(data)
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    // Flatten the nested array and extract the values
    const flattenedData = data[0];

    const nestingLevelsTotal = flattenedData.find(
      (item) => item.name === "nesting_levels_total"
    )?.value;

    const controlStructureTotal = flattenedData.find(
      (item) => item.name === "control_structure_total"
    )?.value;

    const inheritenceLevelTotal = flattenedData.find(
      (item) => item.name === "inheritence_levels_total"
    )?.value;
    
    const threadLevelTotal = flattenedData.find(
      (item) => item.name === "thread_count"
    )?.value;

    const compoundLevelTotal = flattenedData.find(
      (item) => item.name === "compound_total"
    )?.value;

    const recrsiveLevelTotal = flattenedData.find(
      (item) => item.name === "recursive_total"
    )?.value;

    if (
      typeof nestingLevelsTotal === "number" &&
      typeof controlStructureTotal === "number" &&
      typeof inheritenceLevelTotal === "number"
    ) {
      let perNest = Number(
        ((nestingLevelsTotal / (nestingLevelsTotal + controlStructureTotal + inheritenceLevelTotal + threadLevelTotal + compoundLevelTotal)) * 100).toFixed(2)
      );
      
      let perCont = Number(
        ((controlStructureTotal / (nestingLevelsTotal + controlStructureTotal + inheritenceLevelTotal + threadLevelTotal + compoundLevelTotal + recrsiveLevelTotal)) * 100).toFixed(2)
      );

      let perInh = Number(
        ((inheritenceLevelTotal / (nestingLevelsTotal + controlStructureTotal + inheritenceLevelTotal + threadLevelTotal + compoundLevelTotal + recrsiveLevelTotal)) * 100).toFixed(2)
      );

      let perThre = Number(
        ((threadLevelTotal / (nestingLevelsTotal + controlStructureTotal + inheritenceLevelTotal + threadLevelTotal + compoundLevelTotal + recrsiveLevelTotal)) * 100).toFixed(2)
      );

      let perComp= Number(
        ((compoundLevelTotal / (nestingLevelsTotal + controlStructureTotal + inheritenceLevelTotal + threadLevelTotal + compoundLevelTotal + recrsiveLevelTotal)) * 100).toFixed(2)
      );

      let perRec= Number(
        ((recrsiveLevelTotal / (nestingLevelsTotal + controlStructureTotal + inheritenceLevelTotal + threadLevelTotal + compoundLevelTotal + recrsiveLevelTotal)) * 100).toFixed(2)
      );
      let series: SeriesData[] = [
        {
          indexLabel: `Nesting Level ${perNest}%`,
          y: nestingLevelsTotal,
        },
        {
          indexLabel: `Control Structure ${perCont}%`,
          y: controlStructureTotal,
        },
        {
          indexLabel: `Inheritence  ${perInh}%`,
          y: inheritenceLevelTotal,
        },
        {
          indexLabel: `Thread  ${perThre}%`,
          y: threadLevelTotal,
        },
        {
          indexLabel: `Compound St  ${perComp}%`,
          y: compoundLevelTotal,
        },
        {
          indexLabel: `Recursive Md  ${perRec}%`,
          y: recrsiveLevelTotal,
        },
      ];

      setChartOneColumn(series);
    } else {
      console.error("Required data keys are missing or invalid.");
    }
  } else {
    console.error("Invalid data format:", data);
  }
}, [data]);




  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-#0FADCF dark:text-white">
          {category}
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
                
            </span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div id="chartThree" className="mx-auto flex justify-center mixed-chart"
         >
              <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />

        </div>
      </div>

      
    </div>
  );
};

export default ChartFunctionEve;
