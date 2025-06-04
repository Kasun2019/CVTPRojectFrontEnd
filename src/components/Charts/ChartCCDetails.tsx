"use client";
import { ApexOptions } from "apexcharts";
import React,{useEffect,useState} from "react";
import ReactApexChart from "react-apexcharts";
import { useRouter,useSearchParams } from 'next/navigation';
import CardDataStats from "../CardDataStats";

interface FunctionData {
  ccn: number;
  file: string;
  function: string;
  param: number;
  tokens: number;
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
  icbData:{
    complexity:number,
    line_count:number,
    percentage:number

  }
}

const ChartCCDetails: React.FC<ChartCCProps> = ({ data,icbData }) => {

const router = useRouter();
const [chartOneColumn,setChartOneColumn] = useState<string[]>([]);
const [chartOneValues,setChartOneValues] = useState<number[]>([]);
const [totalFunction,setTotalFunction] = useState(0);
const searchParams = useSearchParams();

const [chartLabels, setChartLabels] = useState<any[]>([]);
const [chartColors, setChartColors] = useState<string[]>([]);
const [chartLabels1, setChartLabels1] = useState<string>();
const [chartColors1, setChartColors1] = useState<string[]>([]);
const [totalComplexity, setTotalComplexity] = useState(0);
const [sizeOfClass, setsizeOfClass] = useState(0);
const [seriesData, setSeriesData] = useState();
const threshold_complexity = 20


const options: ApexOptions = {
  
    chart: {
      height: 280,
      type: "radialBar",
    },
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "65%",
          background: "#293450",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px",
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [`${chartLabels[0]}`],

  // chart: {
  //   type: 'donut',
  // },
  // colors: chartColors,
  // labels: chartLabels,
  // plotOptions: {
  //   pie: {
  //     donut: {
  //       labels: {
  //         show: true,
  //         name: {
  //           show: true,
  //           offsetY:0,
  //           color:'#6c757d'
  //         },
  //         value: {
  //           show: true,
  //           fontSize: "20px",
  //           fontWeight: "bold",
  //           color: "#333",
  //           formatter: (val) => `${totalComplexity}%`, // Show percentage value
  //         },
  //         total: {
  //           show: true,
  //           showAlways: true,
  //           label: `${chartLabels[0]}`,
  //           fontSize: "10px",
  //           fontWeight: "bold",
  //           color: "#777",
  //           formatter: () => `${totalComplexity}%`, // Display total progress
  //         },
  //       },
        
  //     }
  //   }
  // },
  // dataLabels: {
  //   enabled: false
  // },
  // legend: {
  //   show: false
  // },
  // stroke: {
  //   lineCap: "round", 
  // },
};

const options2: ApexOptions = {
  chart: {
    height: 280,
    type: "radialBar",
  },
  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "65%",
        background: "#293450",
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15,
        },
      },
      dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "13px",
        },
        value: {
          color: "#fff",
          fontSize: "30px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: [`${chartLabels1}`],
};


useEffect(()=>{
  

    if (data && data.class_complexities) {
      const ccnValues = data.functions.map((item) => item.ccn);
      const ccnTokens= data.functions.map((item) => item.tokens);

      // Calculate labels and colors based on CCN values
      const labels = ccnValues.map((ccn) => {
        if (ccn <= 10) return "Low";
        if (ccn <= 20) return "Moderate";
        if (ccn <= 50) return "High";
        return "Very High";
      });

      const color = (() => {
        switch (labels[0]) {
          case "Low":
            return "#28a745"; // Green
          case "Moderate":
            return "#ffc107"; // Yellow
          case "High":
            return "#fd7e14"; // Orange
          case "Very High":
            return "#dc3545"; // Red
          default:
            return "#6c757d"; // Gray
        }
      })();

      const totalCCN = ccnValues.reduce((sum, ccn) => sum + ccn, 0);
      const totalTokens = ccnTokens.reduce((sum, tk) => sum + tk, 0);
      //const percentages = (totalCCN / ccnTokens) * 100;

      // Calculations
      const average_complexity = data.average_complexity;
      const percentages = (data.total_complexity / totalTokens) * 100;

      

      const additional_color = [color]
     
        
      setChartLabels(labels);
      setChartColors(additional_color);
      //setSeriesData(percentages);
      setTotalComplexity(parseFloat(percentages.toFixed(2)));

      
    } else {
      console.error('Invalid data format:', data);
    }
//})
},[data])
const series = [totalComplexity];


useEffect(()=>{
  


  if (icbData) {
    const icbComplexity = icbData.complexity;
    const icbLineCount= icbData.line_count;
    const icbPercentage= icbData.percentage;

   
    // Calculate labels and colors based on CCN values
    const labels = (() => {
      if (icbPercentage <= 100) return "Low";
      if (icbPercentage <= 200) return "Moderate";
      if (icbPercentage <= 500) return "High";
      return "Very High";
    })();

  

    const color = (() => {
      switch (labels) {
        case "Low":
          return "#28a745"; // Green
        case "Moderate":
          return "#ffc107"; // Yellow
        case "High":
          return "#fd7e14"; // Orange
        case "Very High":
          return "#dc3545"; // Red
        default:
          return "#6c757d"; // Gray
      }
    })();
   

    const additional_lable = [labels,""]
    const additional_color = [color,"#E0E0E0"]
   
      
    setChartLabels1(labels);
    setChartColors1(additional_color);
    //setSeriesData(percentages);
    setsizeOfClass(icbPercentage);

    
  } else {
    console.error('Invalid data format:', icbData);
  }
//})
},[icbData])
const series2 = [sizeOfClass];


  return (
    <>
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-3 justify-between gap-2">
        {/* <div className="flex justify-center items-center ">
          <h5 className="text-sm font-semibold text-#0FADCF dark:text-white">
          Complexity
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              
            </span>
          </div>
        </div> */}
      </div>

      <div className="mb-5" >
        <h5 className="text-sm font-semibold text-#0FADCF dark:text-white text-center">
          Complexity
        </h5>
        <div id="chartThree" className="mx-auto flex justify-center donut-chart">
          <ReactApexChart options={options} series={series} type="radialBar" width={250}/>
        </div>
        <h5 className="text-sm font-semibold text-#0FADCF dark:text-white text-center">
          Size of Class
        </h5>
        <div id="chartThree" className="mx-auto flex justify-center donut-chart">
          <ReactApexChart options={options2} series={series2} type="radialBar" width={250}/>
        </div>
      </div>
  
    </div>


    
      </>
  );
};

export default ChartCCDetails;
