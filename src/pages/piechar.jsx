import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const PieChart = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=200');
        const products = response.data.products;

        // Count the number of products per category
        const categoriesCount = products.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + 1;
          return acc;
        }, {});

        // Convert categoriesCount object into an array of objects
        const categoriesDataArray = Object.entries(categoriesCount).map(([category, count]) => ({
          category,
          count,
        }));

        setCategoriesData(categoriesDataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!categoriesData.length) return; // Return if no data

    // Destroy the previous chart instance if it exists
    const existingChartInstance = Chart.getChart('chartPie');
    if (existingChartInstance) {
      existingChartInstance.destroy();
    }

    // Render the pie chart using Chart.js
    const renderChart = () => {
      const ctx = document.getElementById('chartPie').getContext('2d');

      const labels = categoriesData.map(({ category }) => category);
      const data = categoriesData.map(({ count }) => count);

      const config = {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Products per Category',
            data: data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
            ],
            hoverOffset: 4,
          }],
        },
      };

      new Chart(ctx, config);
    };

    renderChart(); // Render the chart
  }, [categoriesData]); // Trigger the effect when categoriesData changes

  return (
    <div style={{ height: '33rem', paddingBottom: '4rem', textAlign: 'center', display: 'flex', alignContent: 'center', justifyContent: 'center',  }}>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="py-3 px-5 bg-gray-50">Pie chart</div>
        <canvas style={{ padding: '1rem', marginLeft: '4rem', marginRight: '4rem', display: 'block', boxSizing: 'border-box', height: '423px', width: '423px' }} id="chartPie" width="423px" height="423px"></canvas>
      </div>
    </div>
  );
};

export default PieChart;
