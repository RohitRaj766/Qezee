import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import './BarChart.scss';

const BarChart = () => {
  const user = useSelector((state) => state.auth.user);
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
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
            position: 'top' // Position data labels on top of the bars
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          // Display the name of the quiz in the center
          return opts.w.config.xaxis.categories[opts.dataPointIndex];
        },
        style: {
          colors: ['#fff'], // Set text color for contrast
          fontSize: '12px'
        },
        offsetY: +100,
        offsetX: +0
         // Adjust position of the label (tweak as needed)
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
