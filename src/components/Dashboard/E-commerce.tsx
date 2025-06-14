"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { useRouter,useSearchParams } from 'next/navigation';
import CardDataCommon from "../CardDataCommon";
import { FaFileCode, FaFileImage, FaFileAlt } from "react-icons/fa";
import Dial from "../Charts/Dial";
import ChartLine from "../Charts/ChartLine";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";


const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const ECommerce: React.FC = () => {
  const router = useRouter();
  const filePath = localStorage.getItem('projectFile');

  const [totalFiles,settotalFiles] = useState(0);
  const [javaFiles,setJavaFiles] = useState(0);
  const [imageFiles,setImageFiles] = useState(0);
  const [otherFiles,setOtherFiles] = useState(0);

  const [cfsComplex,setCfsComplex] = useState(0);
  const [cfsRate , setCfsRate] = useState('');
  const [classTotalVulCount, setClassTotalVulCount] = useState([]);
  const [totValCt, setTotValCt] = useState([]);

  let lastName;
  if (filePath) {
    lastName = filePath.split('\\').pop();
    
  console.log(lastName);
  }

  const series = [
    {
      name: "Visited Time",
      data: [5, 10, 8, 3, 2, 1, 4],
    }
  ];
useEffect(()=>{
  fetch(`http://127.0.0.1:8081/analyze/count_files_list?path=${filePath}`) 
    .then((response)  => response.json())
    .then((data) =>{
      
      if (data) {
        // Extract lists

        console.log("data")
        console.log(data)
        const totalFiles = data[0].total_files ?? 0;
        const javaFiles = data[0].java_files ?? 0;
        const imageFiles = data[0].image_files ?? 0;
        const otherFiles = data[0].other_files ?? 0;

        settotalFiles(totalFiles)
        setJavaFiles(javaFiles)
        setImageFiles(imageFiles)
        setOtherFiles(otherFiles)

        let cfsC = Math.round((Number(totalFiles)/Number(data[1].class_complexities))*100)
        setCfsComplex(cfsC)

        if (cfsC < 30) {
          setCfsRate("Good");
        } else if (cfsC <= 50) {
          setCfsRate("Moderate");
        } else {
          setCfsRate("Critical");
        }

        let val_cut = data[1].class_total_vul_count
        console.log(val_cut)
        setTotValCt(val_cut);
      } else {
        settotalFiles(0);
        setJavaFiles(0);
        setImageFiles(0);
        setOtherFiles(0);
      }
  })
},[filePath]);

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 0,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["Ju", "Jl", "Og", "Sep", "Oc", "No", "De"],
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 300,
    fontSize: "12px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};


  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <div className="rounded-sm   bg-white px-5.5 py-3 shadow-default  justify-content-center align-items-center">
      <div className="flex items-center space-x-2">
        <div className="flex h-5.5 items-center justify-center">
          {filePath ? (
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Project Name : {lastName}</span> // Show the file path if it exists
          ) : (
            <span>Upload Your Project</span> // Prompt to upload if the file path is empty
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center">
    
      <Link href="/ProjectLinkButton" onClick={()=>{
        console.log("click ");
       // const url = `/ProjectLinkButton`; 
       // router.push(url);
      }
    
        
      }  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10">
              <span>
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_182_46495)">
                    <path
                      d="M18.875 11.4375C18.3125 10.8438 17.5625 10.5312 16.75 10.5312C16.125 10.5312 15.5625 10.7188 15.0625 11.0938C15 11.125 14.9688 11.1562 14.9062 11.2188C14.8438 11.1875 14.8125 11.125 14.75 11.0938C14.25 10.7188 13.6875 10.5312 13.0625 10.5312C12.9062 10.5312 12.7812 10.5312 12.6562 10.5625C11.7188 9.5 10.5625 8.75 9.3125 8.40625C10.625 7.75 11.5312 6.40625 11.5312 4.875C11.5312 2.6875 9.75 0.9375 7.59375 0.9375C5.40625 0.9375 3.65625 2.71875 3.65625 4.875C3.65625 6.4375 4.5625 7.78125 5.875 8.40625C4.5625 8.78125 3.40625 9.53125 2.4375 10.6562C1.125 12.2188 0.375 14.4062 0.3125 16.7812C0.3125 17.0312 0.4375 17.25 0.65625 17.3438C1.5 17.75 4.4375 19.0938 7.59375 19.0938C9.28125 19.0938 10.8438 18.8125 10.9062 18.8125C11.25 18.75 11.4688 18.4375 11.4062 18.0938C11.3438 17.75 11.0312 17.5312 10.6875 17.5938C10.6875 17.5938 9.15625 17.875 7.59375 17.875C5.0625 17.8438 2.65625 16.875 1.5625 16.375C1.65625 14.4375 2.3125 12.7187 3.375 11.4375C4.46875 10.125 5.96875 9.40625 7.59375 9.40625C9.03125 9.40625 10.375 10 11.4375 11.0312C11.2812 11.1562 11.125 11.2812 11 11.4062C10.4688 11.9688 10.1875 12.75 10.1875 13.5938C10.1875 14.4375 10.5 15.2188 11.1562 16C11.6875 16.6562 12.4375 17.2812 13.2812 18L13.3125 18.0312C13.5937 18.25 13.9062 18.5312 14.2188 18.8125C14.4062 19 14.6875 19.0938 14.9375 19.0938C15.1875 19.0938 15.4687 19 15.6562 18.8125C16 18.5312 16.3125 18.25 16.5938 18C17.4375 17.2812 18.1875 16.6562 18.7188 16C19.375 15.2188 19.6875 14.4375 19.6875 13.5938C19.6875 12.7812 19.4062 12.0312 18.875 11.4375ZM4.875 4.875C4.875 3.375 6.09375 2.1875 7.5625 2.1875C9.0625 2.1875 10.25 3.40625 10.25 4.875C10.25 6.375 9.03125 7.5625 7.5625 7.5625C6.09375 7.5625 4.875 6.34375 4.875 4.875ZM17.75 15.2188C17.2812 15.7812 16.5938 16.375 15.7812 17.0625C15.5312 17.2812 15.2188 17.5312 14.9062 17.7812C14.625 17.5312 14.3438 17.2812 14.0938 17.0938L14.0625 17.0625C13.25 16.375 12.5625 15.7812 12.0938 15.2188C11.625 14.6562 11.4062 14.1562 11.4062 13.625C11.4062 13.0937 11.5938 12.625 11.9062 12.2812C12.2188 11.9375 12.6563 11.75 13.0938 11.75C13.4375 11.75 13.75 11.8438 14 12.0625C14.125 12.1562 14.2188 12.25 14.3125 12.375C14.5938 12.7188 15.1875 12.7188 15.5 12.375C15.5938 12.25 15.7187 12.1562 15.8125 12.0625C16.0937 11.8438 16.4062 11.75 16.7188 11.75C17.1875 11.75 17.5938 11.9375 17.9062 12.2812C18.2188 12.625 18.4062 13.0937 18.4062 13.625C18.4375 14.1875 18.2188 14.6562 17.75 15.2188Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_182_46495">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Upload Project
            </Link>
      </div>
    </div>
        <CardDataCommon title="Project Status" total="" rate="" details="" >
            <div className="flex items-center mb-2">
              <Dial id="dial1" value={cfsComplex} title={cfsRate} />
            </div>
        </CardDataCommon>
        <CardDataCommon title="Total files" total={totalFiles.toString()} rate="" details="" >
          <div className="bg-gray-100 rounded-lg w-64">
          <h2 className="text-lg font-bold text-center">File Details</h2>
          <div className="flex items-center mb-2">
            <FaFileCode className="text-blue-500 text-xl mr-2" />
            <span className="text-sm font-medium">Java Files:</span>
            <span className="text-sm font-bold ml-auto text-blue-700">{javaFiles || 0}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaFileImage className="text-green-500 text-xl mr-2" />
            <span className="text-sm font-medium">Image Files:</span>
            <span className="text-sm font-bold ml-auto text-green-700">{imageFiles || 0}</span>
          </div>
          <div className="flex items-center">
            <FaFileAlt className="text-gray-500 text-xl mr-2" />
            <span className="text-sm font-medium">Other Files:</span>
            <span className="text-sm font-bold ml-auto text-gray-700">{otherFiles || 0}</span>
          </div>
        </div>
        </CardDataCommon>
        <CardDataCommon title="Project History" total="" rate="" details="">
          <div className="flex items-center">
          <div id="chartTwo" className="-mb-9 -ml-5">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={150}
              width={"100%"}
            />
          </div>
          </div>
        </CardDataCommon>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo data={totValCt}/>
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
