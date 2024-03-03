import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  useEffect(() => {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow',
        'Yellow',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 585, 74],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 205, 86)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    const config = {
      type: 'pie',
      data: data,
      options: {}
    };

    var chartPie = new Chart(document.getElementById('chartPie'), config);

    return () => {
      chartPie.destroy();
    };
  }, []);

  return (
    <div style={{ height: '33rem', paddingBottom: '4rem', textAlign: 'center', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="py-3 px-5 bg-gray-50">Pie chart</div>
        <canvas style={{ padding: '1rem', marginLeft: '4rem', marginRight: '4rem', display: 'block', boxSizing: 'border-box', height: '423px', width: '423px' }} id="chartPie" width="423px" height="423px"></canvas>
      </div>
    </div>
  );
};

export default PieChart;
