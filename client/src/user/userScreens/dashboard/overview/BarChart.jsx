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
        show: false // Removes background grid lines
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        axisBorder: {
          show: false // Removes the x-axis line
        },
        axisTicks: {
          show: false // Removes the x-axis ticks
        },
        labels: {
          show: false // Hides x-axis labels
        },
        lines: {
          show: false // Ensures no lines are drawn for x-axis
        }
      },
      yaxis: {
        axisBorder: {
          show: false // Removes the y-axis line
        },
        axisTicks: {
          show: false // Removes the y-axis ticks
        },
        labels: {
          show: false // Hides y-axis labels
        },
        lines: {
          show: false // Ensures no lines are drawn for y-axis
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
            width="800"
            height="300"
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
