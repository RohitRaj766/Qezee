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
        show: false 
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false 
        },
        labels: {
          rotate: -90, // Rotate labels 90 degrees
          rotateAlways: true,
          style: {
            colors: '#fff', // Set all labels to white
            fontSize: '20px',
            fontWeight: 'bold',
          },
          offsetX: 0, // Adjust as needed
          offsetY: -150, // Adjust as needed to overlap with bars
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
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0, // Set border radius to 0 for custom CSS handling
          dataLabels: {
            position: 'top' 
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const index = opts.dataPointIndex;
          const quiz = user.LoggedInUser.totalquizzes[index];
          const correct = quiz.correct || 0;
          const wrong = quiz.wrong || 0;
          const notAttempted = quiz.notattempted || 0;
          const total = correct + wrong + notAttempted;
          return `${correct}/${total}`;
        },
        style: {
          colors: ['#F5B400'],
          fontSize: '16px',
          fontWeight: 'bold'
        },
        offsetY: -50 // Adjust this value as needed to position the label
      }
    },
    series: [] 
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
            height="420"
            className="bar-chart"
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
