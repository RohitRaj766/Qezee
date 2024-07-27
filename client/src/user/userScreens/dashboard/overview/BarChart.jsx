import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import './BarChart.scss'

const BarChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      grid: {
        show: false 
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        axisBorder: {
          show: false 
        },
        axisTicks: {
          show: false 
        },
        labels: {
          show: false 
        },
        lines: {
          show: false 
        }
      },
      yaxis: {
        axisBorder: {
          show: false 
        },
        axisTicks: {
          show: false 
        },
        labels: {
          show: false 
        },
        lines: {
          show: false 
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    },
    series: [
      {
        name: 'series-1',
        data: [15, 13, 11, 19, 16, 12, 8, 17 , 20, 11]
      }
    ]
  });

  return (
    // Bar chart
    <div className="bar">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="950"
            height="300"
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
