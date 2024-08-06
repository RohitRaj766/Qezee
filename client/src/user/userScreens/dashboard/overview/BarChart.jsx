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
          show: true  
        },
        axisTicks: {
          show: true  
        },
        labels: {
          rotate: -90, 
          rotateAlways: true,
          style: {
            colors: '#fff', 
            fontSize: '22px',
            fontWeight: 'bold',
          },
          offsetX: 0, 
          offsetY: -175, 
        }
      },
      yaxis: {
        axisBorder: {
          show: true  
        },
        axisTicks: {
          show: true  
        },
        labels: {
          show: true  
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0, 
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
          fontSize: '22px',
          fontWeight: 'bold'
        },
        offsetY: -35, 
        textAnchor: 'middle' 
      },
      tooltip: {
        y: {
          formatter: function (value, { series, seriesIndex, dataPointIndex }) {
            const quiz = user.LoggedInUser.totalquizzes[dataPointIndex];
            const correct = quiz.correct || 0;
            const wrong = quiz.wrong || 0;
            const notAttempted = quiz.notattempted || 0;
            return `Correct: ${correct}<br>Wrong: ${wrong}<br>Not Attempted: ${notAttempted}`;
          }
        }
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
              name: 'Score',
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
          <div className="scores">
            {user && user.LoggedInUser && user.LoggedInUser.totalquizzes.map((quiz, index) => (
              <div key={index} className="score-item">
                {quiz.correct}/{quiz.correct+quiz.wrong+quiz.notattempted}
              </div>
            ))}
          </div>
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
