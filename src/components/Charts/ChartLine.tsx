"use client";

import React, { Component, useEffect, useState } from "react";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ChartLine extends Component {
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: ""
			},
			axisX:{
				valueFormatString: "DD MMM",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "",
				crosshair: {
					enabled: false
				}
			},
			toolTip:{
				shared:true
			},  
			legend:{
				cursor: "pointer",
				verticalAlign: "top",
				horizontalAlign: "right",
				dockInsidePlotArea: true,
				itemclick: function(e) {
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					} else{
						e.dataSeries.visible = true;
					}
					e.chart.render();
				}
			},
			data: [{
				type: "line",
				showInLegend: true,
				name: "Total Visit",
				lineDashType: "dash",
				markerType: "square",
				xValueFormatString: "DD MMM, YYYY",
				dataPoints: [
					{ x: new Date(2024, 11, 3), y: 2 },
					{ x: new Date(2024, 11, 4), y: 3 },
					{ x: new Date(2024, 11, 5), y: 1 },
					{ x: new Date(2024, 12, 6), y: 3 },
					{ x: new Date(2024, 12, 7), y: 1 },
					{ x: new Date(2024, 12, 8), y: 1 },
				]
			}, {
				type: "line",
				showInLegend: true,
				name: "Unique Visit",
				lineDashType: "dot",
				dataPoints: [
					{ x: new Date(2024, 11, 3), y: 4 },
					{ x: new Date(2024, 11, 4), y: 2 },
					{ x: new Date(2024, 11, 5), y: 2 },
					{ x: new Date(2024, 12, 6), y: 7 },
					{ x: new Date(2024, 12, 7), y: 2 },
					{ x: new Date(2024, 12, 8), y: 1 },
				]
			}]
		}	
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref}  containerProps={{width: "10%",height: "10%"}}*/
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default ChartLine;     