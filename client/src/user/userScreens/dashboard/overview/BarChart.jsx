import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import './BarChart.scss'

const BarChart = () => {
  const categories = ['John', 'Doe', 'Mary', 'Smith', 'Robert', 'Johnson', 'Michael', 'Brown', 'William', 'David'];
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      grid: {
        show: false 
      },
      xaxis: {
        categories: categories,
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
          horizontal: false,
          dataLabels: {
            position: 'center' // Set the position of the data labels
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return categories[opts.dataPointIndex]; // Return the corresponding name from the categories array
        },
        style: {
          colors: ['#fff'] // Set the color of the data labels
        }
      }
    },
    series: [
      {
        name: 'series-1',
        data: [15, 13, 11, 19, 16, 12, 8, 17, 20, 11]
      }
    ]
  });

  return (
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