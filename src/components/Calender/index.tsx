
"use client";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Network from "react-vis-network-graph";
import nodeData from "./data.json";

const Calender: React.FC = () => {
  const graphRef = useRef<any>(null);
  const [datas, setDatas] = useState<string>("--");
  const _data = {
    nodes: [
      {
        id: "AWS",
        name: "AWS",
        label: "1",
        title: "AWS",
        shape: "image",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4qneFgROiufDyIrsXWpq_GhoQWnnxHuoclPljXeXgtlcGEParu75dPQ4TLafJeLJssXc&usqp=CAU",
        size: 20,
        cost: "$1000"
      },
      // Other nodes...
    ],
    edges: [
      { from: "AWS", to: "IBM", color: "red" },
      // Other edges...
    ]
  };

  const [data, setData] = useState<typeof _data>(_data);

  const options = {
    interaction: {
      selectable: true,
      hover: true
    },
    manipulation: {
      enabled: true,
      initiallyActive: true,
      addNode: false,
      addEdge: false,
      editNode: undefined,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true,
      shapeProperties: {
        borderDashes: false,
        useImageSize: false,
        useBorderWithImage: false
      },
      controlNodeStyle: {
        shape: "dot",
        size: 6,
        color: {
          background: "#ff0000",
          border: "#3c3c3c",
          highlight: {
            background: "#07f968",
            border: "#3c3c3c"
          }
        },
        borderWidth: 2,
        borderWidthSelected: 2
      },
      height: "100%",
      color: "green",
      hover: "true",
      nodes: {
        size: 20
      }
    }
  };

  const handleNodeClick = (event: any) => {
    console.log("Node clicked:", event);
    setDatas(event.nodes[0]);
  };

  const handleZoomIn = () => {
    if (graphRef.current) {
      // Implement zoom in logic
    }
  };

  const handleZoomOut = () => {
    if (graphRef.current) {
      // Implement zoom out logic
    }
  };

  const handleDataDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <>
     
    </>
  );
};

export default Calender;
