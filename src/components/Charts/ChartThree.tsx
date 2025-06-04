import { ApexOptions } from "apexcharts";
import React,{useEffect,useState} from "react";
import ReactApexChart from "react-apexcharts";
import { useRouter } from 'next/navigation';

const ChartThree: React.FC = () => {
const filePath = localStorage.getItem('projectFile');
const router = useRouter();
const [chartOneColumn,setChartOneColumn] = useState<string[]>([]);
const [chartOneValues,setChartOneValues] = useState<number[]>([]);

const options: ApexOptions = {
  
  chart: {
    id: "basic-bar",
    events: {
      dataPointSelection: (event, chartContext, config) => {
        const selectedCategory = chartOneColumn[config.dataPointIndex];
        const selectedValue = chartOneValues[config.dataPointIndex];
        
        // Example: You can trigger navigation or card switching here
       /// console.log(`You clicked on ${selectedCategory} with value ${selectedValue}`);
        const url = `/FunctionEve?category=${encodeURIComponent(selectedCategory)}&value=${encodeURIComponent(selectedValue.toString())}`; ///////?category=${encodeURIComponent(selectedCategory)}&value=${encodeURIComponent(selectedValue.toString())}
        router.push(url);
        
      }
  }
},
  xaxis: {
    categories: chartOneColumn
  }


};

useEffect(()=>{
  fetch(`http://127.0.0.1:8082/analyze/cfs?path=${filePath}`) 
  .then((response)  => response.json())
  .then((data) =>{
    console.log('data retrive cfs', data);
    if (data && data.class_complexities) {
      const classNames = Object.keys(data.class_complexities);
      const complexities = Object.values(data.class_complexities);
      const numericalComplexities = complexities.map(value => Number(value));

       setChartOneColumn(classNames);
       setChartOneValues(numericalComplexities);
    } else {
      console.error('Invalid data format:', data);
    }
})
},[])
  const series = [{
    name: "CFS",
    data: chartOneValues
  }]

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-#0FADCF dark:text-white">
            Project OverView
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

export default ChartThree;
