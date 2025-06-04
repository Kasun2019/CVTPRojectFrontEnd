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

interface IssueData {
  blank_lines:string[];
  excessive_spaces:string[];
  naming_conventions:string[];
  total_blank_lines:number;
  variable_declaration:string[];
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
    percentage:number,
    total_line:number,
    total_vul: 
              {
                blank_lines: [],
                excessive_spaces: [],
                naming_conventions: [],
                total_blank_lines: number,
                tot_excessive_spaces: number,
                tot_naming_conventions_count: number,
                tot_blank_lines_in_variable_declaration: number,
                tot_duplication_block: number,
                variable_declaration: []
              },

  }
}

const ChartCCDetailsMore: React.FC<ChartCCProps> = ({ data,icbData }) => {

const router = useRouter();




const [totalEvaluvatedLines, setTotalEvaluvatedLines] = useState(0);
const [totalExecutedLines, setTotalExecutedLines] = useState(0);
const [totalDuplicationBlock, setTotalDuplicationBlock] = useState(0);
const [preOfEveVal, setPreOfEveVal] = useState(0);
const [preOfVaul, setPreOfVaul] = useState(0);
const [preOfDupli, setPreOfDupli] = useState(0);
const [sizeOfClass, setsizeOfClass] = useState(0);
const [totalVul, settotalVul] = useState(0);
const threshold_complexity = 20

useEffect(()=>{
  
  if (icbData) {
    const icbComplexity = icbData.complexity;
    const icbLineCount= icbData.line_count;
    const icbPercentage= icbData.percentage;
    const icbtotalLine= icbData.total_line;

    

    const total_blank_lines = icbData.total_vul.total_blank_lines;
    const tot_excessive_spaces = icbData.total_vul.tot_excessive_spaces;
    const tot_naming_conventions_count = icbData.total_vul.tot_naming_conventions_count;
    const tot_blank_lines_in_variable_declaration = icbData.total_vul.tot_blank_lines_in_variable_declaration;
    const tot_duplication_block = icbData.total_vul.tot_duplication_block;
 
    const total_issues = total_blank_lines + tot_excessive_spaces + tot_naming_conventions_count + tot_blank_lines_in_variable_declaration

    console.log(icbData.total_vul)

    

  

    setTotalEvaluvatedLines(icbLineCount);
    setTotalExecutedLines(icbtotalLine);
    settotalVul(total_issues);
    setTotalDuplicationBlock(tot_duplication_block);
    setPreOfEveVal((icbLineCount/totalExecutedLines)*100);
    setPreOfDupli((tot_duplication_block/totalExecutedLines)*100);
    setPreOfVaul((total_issues/totalExecutedLines)*100);
    //setSeriesData(percentages);
    setsizeOfClass(icbPercentage);



    
  } else {
    console.error('Invalid data format:', icbData);
  }
//})
},[icbData])



  return (
    <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Number of Lines" total={totalExecutedLines.toString()} rate="" levelUp>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5"/></svg>
        </CardDataStats>

        <CardDataStats title="Evaluated Lines" total={totalEvaluvatedLines.toString()} rate={preOfEveVal.toFixed(2)} levelUp>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
        </CardDataStats>

        <CardDataStats title="Vulnerabilities" total={totalVul.toString()} rate={preOfVaul.toFixed(2)} levelUp>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </CardDataStats>

        <CardDataStats title="Duplication Block" total={totalDuplicationBlock.toString()} rate={preOfDupli.toFixed(2)} levelUp>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </CardDataStats>

    </div>


    
      </>
  );
};

export default ChartCCDetailsMore;
