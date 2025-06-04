"use client";
import { ApexOptions } from "apexcharts";
import React,{useEffect,useState} from "react";
import ReactApexChart from "react-apexcharts";
import { useRouter,useSearchParams } from 'next/navigation';

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
}

const ChartCC: React.FC<ChartCCProps> = ({ data }) => {

const router = useRouter();
const [chartOneColumn,setChartOneColumn] = useState<string[]>([]);
const [chartOneValues,setChartOneValues] = useState<number[]>([]);
const [totalComplexity,setTotalComplexity] = useState(0);
const [totalFunction,setTotalFunction] = useState(0);
const searchParams = useSearchParams();

// Get query parameters from URL
const [category, setCategory] = useState<string | null>(searchParams.get('category'));
const [value, setValue] = useState<string | null>(searchParams.get('value'));



console.log(searchParams);

const options: ApexOptions = {
  
  chart: {
    id: "basic-bar",
    events: {
      dataPointSelection: (event, chartContext, config) => {
        const selectedCategory = chartOneColumn[config.dataPointIndex];
        const selectedValue = chartOneValues[config.dataPointIndex];
        const passCate = category==null ? "" : category
        // Example: You can trigger navigation or card switching here
       /// console.log(`You clicked on ${selectedCategory} with value ${selectedValue}`);
        const url = `/lineEve?category=${encodeURIComponent(passCate)}&function_name=${encodeURIComponent(selectedCategory.toString())}`; ///////?category=${encodeURIComponent(selectedCategory)}&value=${encodeURIComponent(selectedValue.toString())}
        router.push(url);
        
      }
  }
},
  xaxis: {
    categories: chartOneColumn
  }


};


useEffect(()=>{
  
  // fetch(`http://127.0.0.1:8080/analyze/ccd?param1=${encodeURIComponent(category)}`) 
  // .then((response)  => response.json())
  // .then((data) =>{
  
    if (data && data.class_complexities) {

      const functionNames = data.functions.map((item: any) => item.function);
      const ccnValues = data.functions.map((item: any) => item.ccn);

      // const methodName = functionNames.map((fn: string) => {
      //   // Ensure each element is a string and use split() to get the method name
      //   return typeof fn === 'string' ? fn.split('::').pop() : fn;
      // });

      const methodName = functionNames.map((fn) => fn.split('::').pop() || '');
     
        
       setChartOneColumn(methodName);
       setChartOneValues(ccnValues);
       setTotalComplexity(data.total_complexity);
       setTotalFunction(data.total_functions);
    } else {
      console.error('Invalid data format:', data);
    }
//})
},[data])
  const series = [{
    name: "CC",
    data: chartOneValues
  }]
 


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
        <div id="chartThree" className="mx-auto flex justify-center mixed-chart">
          <ReactApexChart options={options} series={series} type="bar" width={500}/>
        </div>
      </div>

      
    </div>
  );
};

export default ChartCC;
