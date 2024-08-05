import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import './BarChart.scss';

const BarChart = () => {
  const user = useSelector((state) => state.auth.user);
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      grid: {
        show: false // Hide grid lines
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: false // Hide axis border
        },
        axisTicks: {
          show: false // Hide axis ticks
        },
        labels: {
          show: false // Hide x-axis labels
        }
      },
      yaxis: {
        axisBorder: {
          show: false // Hide axis border
        },
        axisTicks: {
          show: false // Hide axis ticks
        },
        labels: {
          show: false // Hide y-axis labels
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'inside' // Position data labels inside the bars
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          // Display quiz name inside each bar
          return categories[opts.dataPointIndex];
        },
        style: {
          colors: ['#fff'], // White color for better contrast
          fontSize: '12px'
        }
      }
    },
    series: [] // Initialize with empty series
  });

  useEffect(() => {
    if (user && user.LoggedInUser) {
      const quizzes = user.LoggedInUser.totalquizzes;

      if (Array.isArray(quizzes)) {
        const quizNames = quizzes.map((quiz) => quiz.name);
        const correctValues = quizzes.map((quiz) => quiz.correct);

        setCategories(quizNames);

        setChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: quizNames
            }
          },
          series: [
            {
              name: 'Correct',
              data: correctValues
            }
          ]
        }));
      } else {
        console.error("totalquizzes is not an array", quizzes);
      }
    }
  }, [user]);

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
