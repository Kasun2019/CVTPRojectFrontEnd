"use client"; // Mark this as a client-side component

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChartCC from "@/components/Charts/ChartCC";
import ChartCCDetails from "@/components/Charts/ChartCCDetails";
import ChartCCDetailsMore from "@/components/Charts/ChartCCDetailsMore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'; // Use client-side hooks only in client components
import Extable from "@/components/ExpandableRow/ExTable";
import ChartFunctionEve from "@/components/Charts/ChartFunctionEve";
import ChartCbDetails from "@/components/Charts/ChartCbDetails";

const LineEve = () => {
  // Client-side hooks (useSearchParams) must be inside a Client Component
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>(searchParams.get('category'));
  const [functionName, setfunctionName] = useState<string | null>(searchParams.get('function_name'));
  const [functionDes, setfunctionDes] = useState<string | null>();
  const [chartOneColumn, setChartOneColumn] = useState<object[]>([]);
  const [icbDataCollection, setIcbDataCollection] = useState<object[]>([]);
  const [loading, setLoading] = useState(true);
  const [emptyLines, setEmptyLines] = useState(0);
  const [emptyNoneLines, setEmptyNoneLines] = useState(0);
  const [perLines, setPerLines] = useState(0);

  const filePath = localStorage.getItem('projectFile');

  const select_function = functionName == null ? "" :functionName
  const select_category = category == null ? "" :category


  const [data, setData] = useState<DataRow[]>([]);

  type DataRow = {
    des: string;
    child: {
     
    }[];
  };

  useEffect(() => {
    setLoading(true)
    let dataBandle: { name: string; value: number }[] = [];
    let dataBandle1: { name: string; value: number }[] = [];
    fetch(`http://127.0.0.1:8081/analyze/nesting_level_all?class_name=${encodeURIComponent(select_category)}&function_name=${encodeURIComponent(select_function)}&path=${filePath}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Error:', data.error);
        } else {
          let totalNest=[];
          let totalTypC=[];
          let totalTypCEry=[];
          let totalInh=[];
          let totalThrd=[];
          let totalComp=[];
          let totalRecs=[];
          let totalSize= [];
          let totalIcb=0;
          console.log(data)
          let processedData: DataRow[] = [];
          for (let key in data) {

            if(key != "issue_analyze_line_methods"  && key != "analyze_CC_methods"){
           
            let keyname = "";
            const dt = data[key].detail
            
            let stm: { des: string }[] = [];

            if(key == "issue_analized_nesting"){
              dataBandle.push(
                { name: "nesting_levels_total", value: data[key]["nesting_levels_total"] },
                { name: "nesting_levels_count", value: data[key]["nesting_levels_count"] }
              );
              keyname = "Nesting level of control structures";
              for (let key1 in dt) {
                let fn = dt[key1][0]+"";
                if (fn.includes("Found function")) {
                  setfunctionDes(fn+" at line "+dt[key1][2])
                }else{
                  stm.push({des:dt[key1][0]+ " found at line "+dt[key1][2]+ " nesting Level "+dt[key1][1]});
                  totalNest[dt[key1][2]] = dt[key1][1]
                }
                
              }
            }
            if(key == "issue_analized_type_of_control"){
              dataBandle.push(
                { name: "control_structure_total", value: data[key]["control_structure_total"] },
                { name: "control_structure_count", value: data[key]["control_structure_count"] }
              );
              
              keyname = "Type of control structures";
              totalTypCEry = data[key].line_detail
              
              for (let key1 in dt) {
                  let output = dt[key1][0].replace(/([a-z])([A-Z])/g, '$1 $2');
                  stm.push({des:dt[key1][1]+ "  "+output+ " found. value:"+dt[key1][2]});
                  let nms = dt[key1][0]
                  let sss = dt[key1][2]
                  console.log("totalTypCEry")
                  
                  for (let key1 in totalTypCEry) {
                      console.log(totalTypCEry[key1][0])
                      let n = totalTypCEry[key1][0] 
                      let nn = nms
                      if(n == nn){
                        totalTypC[totalTypCEry[key1][1]] = [sss]
                        delete totalTypCEry[key1];
                        console.log(totalTypCEry)
                        break
                      }
                  }
              }
              

            }
            if(key == "issue_calculate_inheritance_level"){
              dataBandle.push(
                { name: "inheritence_levels_total", value: data[key]["inheritence_levels_total"] },
                { name: "inheritence_levels_count", value: data[key]["inheritence_levels_count"] }
              );
              keyname = "Inheritance Level";
              
              for (let key1 in dt) {
                  stm.push({des:" Line No: "+key1+" -> "+dt[key1][0]});
                  totalInh[Number(key1)] = 1
              }
            }
            if(key == "issue_analyzed_fuction_size"){
              keyname = "Size of Function";
              dataBandle1.push(
                { name: "function_complexities", value: data[key]["function_complexities"] },
                { name: "total_line_count", value: data[key]["total_line_count"] }
              );
              
              for (let key1 in dt) {
                  stm.push({des:dt[key1][0]});
                  totalSize[dt[key1][1]] = [dt[key1][2]]
              }
            }
            if(key == "issue_analyzed_thread_size"){
              keyname = "Thread Size";
            
              dataBandle.push(
                { name: "thread_total", value: data[key]["thread_levels_total"] },
                { name: "thread_count", value: data[key]["thread_levels_count"] }
              );
              dataBandle1.push(
                { name: "thread_total", value: data[key]["thread_levels_total"] },
              );
             // console.log(dt)
              for (let key1 in dt) {
                  totalThrd[Number(key1)] = dt[key1][1] 
                  stm.push({des:dt[key1][0]});
              }
            }
            if(key == "issue_analyzed_compound"){
              keyname = "Compound Conditional";
              dataBandle.push(
                { name: "compound_total", value: data[key]["compaund_levels_total"] },
                { name: "compound_count", value: data[key]["compaund_levels_count"] }
              );
             // console.log(dt)
              for (let key1 in dt) {
                  totalComp[Number(key1)] = dt[key1][1] 
                  stm.push({des:dt[key1][0]});
              }
            }
            if(key == "issue_analyze_recursive_methods"){
              keyname = "Recursive Methods";
              dataBandle.push(
                { name: "recursive_total", value: data[key]["recursive_total"] },
                { name: "recursive_count", value: data[key]["recursive_levels_count"] }
              );
             // console.log(dt)
              for (let key1 in dt) {
                  totalRecs[Number(key1)] = dt[key1][1]
                  stm.push({des:"Line :"+key1+" -> "+dt[key1][0]});
              }
            }

            processedData.push({
              des: keyname, // The key from data
              child: stm // Access the structure under detail
            });

          }else{

            if(key == "issue_analyze_line_methods"){
              let empty_lines = data[key].empty_lines
              let non_empty_lines = data[key].non_empty_lines
              let total_lines = data[key].total_lines

              let perTot = Number(non_empty_lines)/Number(total_lines) * 100

            
              dataBandle1.push(
                { name: "empty_lines", value: empty_lines},
                { name: "non_empty_lines", value: non_empty_lines },
                { name: "perTot", value: perTot },
              );
            }
            if(key == "analyze_CC_methods"){
              let cyclomatic_complexity = data[key].cyclomatic_complexity
              let line_count = data[key].line_count

              

              dataBandle1.push(
                { name: "cyclomatic_complexity", value: cyclomatic_complexity},
                { name: "line_count", value: line_count },
              );


            }

          }
          }

          console.log("totalSize ")
         
          // totalIcb =  totalSize 
          totalIcb = calculateTotal(totalSize,totalNest,totalTypC,totalInh,totalThrd,totalComp,totalRecs)
          dataBandle1.push(
            { name: "icb_total", value: totalIcb },
          );
          
         //console.log(totalIcb);
          
          setData(processedData);
          setChartOneColumn(dataBandle);
          setIcbDataCollection(dataBandle1)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  }, [category, select_function, filePath]);

  type Result = {
    [key: number]: number;  // key is a number (line number), and value is the product (number)
  };
  function calculateTotal(data: any[], ...arrays: any[]) {
    let totalProduct = 0;

    // Loop through each key in the data
    for (const key in data) {
        const lineKey = Number(key);  // Convert key to a number (line number)

        // Ensure that the key exists in all arrays and in data
        if (data[lineKey] && data[lineKey][0] !== undefined) {
            // Multiply the data value with the corresponding value from each array
            const sizeValue = data[lineKey][0];

            // Multiply the values of the matching keys from data and arrays
            const product = arrays.reduce((acc, array) => {
                return acc * (array[lineKey]?.[0] ?? 1);  // Default to 1 if not found
            }, sizeValue);
            
            // Add the calculated product to totalProduct
            totalProduct += product;
        }
    }

    return totalProduct
}

  if (loading) {
    // Render a loading state before data is fully loaded
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Function Evaluation" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Class {category} {functionDes}
                </h3>
              </div>
              <div className="p-7">
                
              <ChartFunctionEve data={[chartOneColumn]}/>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-7" >
              <Extable data={data} />
           
            </div>
            </div>
            
          </div>

          <div className="col-span-5 ">
            {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-7"> */}
                {/* Any additional content */}
                <ChartCbDetails data={chartOneColumn} icbData={icbDataCollection} />
              {/* </div>
            </div> */}
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default LineEve;
