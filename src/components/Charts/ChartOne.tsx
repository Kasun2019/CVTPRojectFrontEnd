"use client";

import { ApexOptions } from "apexcharts";
import React , {useEffect,useState}from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

//


interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {

const [chartOneColumn,setChartOneColumn] = useState<string[]>([]);
const [chartOneValues,setChartOneValues] = useState<number[]>([]);

const [chartThreeColumn,setChartThreeColumn] = useState<string[]>([]);
const [chartThreeValues,setChartThreeValues] = useState<number[]>([]);

const [chartTwoColumn,setChartTwoColumn] = useState<string[]>([]);
const [chartTwoValues,setChartTwoValues] = useState<number[]>([]);

const filePath = localStorage.getItem('projectFile');

const options: ApexOptions = {
  
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE","#198754"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE","#198754"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: chartOneColumn,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 200,
    },
};
  const [avgcomplexity,setAvgcomplexity] = useState(0.0);
  const [totComplexity,setTotcomplexity] = useState(0.0);
  const [totFunction,setTotFunction] = useState(0.0);

  useEffect(()=>{
    fetch(`http://127.0.0.1:8080/analyze/cc?path=${filePath}`) 
    .then((response)  => response.json())
    .then((data) =>{
      
      setAvgcomplexity(data.average_complexity);
      setTotcomplexity(data.total_complexity);
      setTotFunction(data.total_functions);
      

      if (data && data.class_complexities) {
        const classNames = Object.keys(data.class_complexities);
        const complexities = Object.values(data.class_complexities);
        const numericalComplexities = complexities.map(value => Number(value));

        setChartOneColumn(classNames);
        setChartOneValues(numericalComplexities);
      } else {
        console.error('Invalid data format:', data);
      }
  }),

  fetch(`http://127.0.0.1:8081/analyze/icb?path=${filePath}`) 
    .then((response)  => response.json())
    .then((data) =>{
      
      if (data && data.class_complexities) {
        const classNames = Object.keys(data.class_complexities);
        const complexities = Object.values(data.class_complexities);
        const numericalComplexities = complexities.map(value => Number(value));

        setChartTwoColumn(classNames);
        setChartTwoValues(numericalComplexities);
      } else {
        console.error('Invalid data format:', data);
      }
  }),

  fetch(`http://127.0.0.1:8082/analyze/cfs?path=${filePath}`) 
    .then((response)  => response.json())
    .then((data) =>{
      
      if (data && data.class_complexities) {
        const classNames = Object.keys(data.class_complexities);
        const complexities = Object.values(data.class_complexities);
        const numericalComplexities = complexities.map(value => Number(value));

        setChartThreeColumn(classNames);
        setChartThreeValues(numericalComplexities);
      } else {
        console.error('Invalid data format:', data);
      }
  })

},[])
  const series = [
      {
        name: "Cyclomatic Complexity",
        data: chartOneValues,
      },

      {
        name: "ICB Size",
        data: chartTwoValues,
      },
      {
        name: "CFS Size",
        data: chartThreeValues,
      },
    ]

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Project Overview (CC)</p>
              <p className="text-sm font-medium">Total Complexity :{totComplexity}</p>
              <p className="text-sm font-medium">Avg Complexity :{avgcomplexity !== undefined?avgcomplexity.toFixed(5):0}</p>
              <p className="text-sm font-medium">Total Functions:{totFunction}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Project Overview (ICB)</p>
              <p className="text-sm font-medium"></p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-success">Project Overview (CFS)</p>
              <p className="text-sm font-medium"></p>
            </div>
          </div>
        </div>
        {/* <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div> */}
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
