import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const piechar = () => {
    useEffect(() => {
        // Data for the pie chart
        const dataPie = {
          labels: ["JavaScript", "Python", "Ruby"],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(133, 105, 241)",
                "rgb(164, 101, 241)",
                "rgb(101, 143, 241)",
              ],
              hoverOffset: 4,
            },
          ],
        };
    
        // Configuration for the pie chart
        const configPie = {
          type: "pie",
          data: dataPie,
          options: {},
        };
    
        // Create the chart
        var chartPie = new Chart(document.getElementById("chartPie"), configPie);
    
        // Clean up function to destroy the chart when the component unmounts
        return () => {
          chartPie.destroy();
        };
      }, []); // Empty dependency array ensures the effect runs only once
    
      return (
        <div className="shadow-lg rounded-lg overflow-hidden">
          <div className="py-3 px-5 bg-gray-50">Pie chart</div>
          <canvas className="p-1 ml-40 mr-40" id="chartPie"></canvas>
        </div>
      );
    };
    
export default piechar
