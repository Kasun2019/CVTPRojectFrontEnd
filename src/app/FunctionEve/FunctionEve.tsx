"use client"; // Mark this as a client-side component

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChartCC from "@/components/Charts/ChartCC";
import ChartCCDetails from "@/components/Charts/ChartCCDetails";
import ChartCCDetailsMore from "@/components/Charts/ChartCCDetailsMore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'; // Use client-side hooks only in client components

const FunctionEve = () => {
  // Client-side hooks (useSearchParams) must be inside a Client Component
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>(searchParams.get('category'));
  const [chartOneColumn, setChartOneColumn] = useState<object[]>([]);
  const [icbDataCollection, setIcbDataCollection] = useState<object[]>([]);
  const [loading, setLoading] = useState(true);

  const filePath = localStorage.getItem('projectFile');

  useEffect(() => {
    if (category) {
      setLoading(true);
      fetch(`http://127.0.0.1:8080/analyze/ccd?param1=${encodeURIComponent(category)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.class_complexities) {
            console.log(data.functions);
            setChartOneColumn(data);
          } else {
            console.error('Invalid data format:', data);
          }
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(`http://127.0.0.1:8081/analyze/class_size_icb?class_name=${encodeURIComponent(category)}&path=${filePath}`)
        .then((response) => response.json())
        .then((data) => {

          if (data.error) {
            console.error('Error:', data.error);
          } else {
              const usefulPercentage = data.useful_percentage;
              setIcbDataCollection(data);
          }
          
        })
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setLoading(false));

    }
  }, [category]);

  if (loading) {
    // Render a loading state before data is fully loaded
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Class Evaluation" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Class Information
                </h3>
              </div>
              <div className="p-7">
                {/* Pass the fetched data to ChartCC */}
                <ChartCC data={chartOneColumn} />
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-7">
                {/* Any additional content */}
                <ChartCCDetails data={chartOneColumn} icbData={icbDataCollection} />
              </div>
            </div>
          </div>

          <div className="col-span-5 ">
            {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-7"> */}
                {/* Any additional content */}
                <ChartCCDetailsMore data={chartOneColumn} icbData={icbDataCollection} />
              {/* </div>
            </div> */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FunctionEve;
