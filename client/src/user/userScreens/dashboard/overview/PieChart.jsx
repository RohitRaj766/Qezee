import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import './PieChart.scss';

const PieChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      colors: ['#45CE30', '#FF3E4D', '#007bff'],
      legend: {
        position: 'bottom'
      },
      labels: ['Correct', 'Incorrect', 'Not Attempted'],
      plotOptions: {
        pie: {
            donut: {
                size: '30%'
            }
        }
      }
    },
    series: [54, 20, 26]
  });

  return (
    <div className="pie">
        <h2>Total Questions - 100</h2>
      <div className="donut">
        <Chart 
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width="350"
        />
      </div>
    </div>
  );
}

export default PieChart;
