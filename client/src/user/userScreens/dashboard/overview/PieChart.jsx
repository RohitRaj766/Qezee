import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import './PieChart.scss';

const PieChart = () => {
  const user = useSelector((state) => state.auth.user);

  const [chartData, setChartData] = useState({
    options: {
      colors: ['#45CE30', '#FF3E4D', '#007bff'],
      legend: {
        position: 'bottom'
      },
      labels: ['Correct', 'Wrong', 'Not Attempted'],
      plotOptions: {
        pie: {
          donut: {
            size: '30%'
          }
        }
      }
    },
    series: [0, 0, 0]
  });

  useEffect(() => {
    if (user && user.LoggedInUser && user.LoggedInUser.totalquestions) {
      const { correct, wrong, notattempted } = user.LoggedInUser.totalquestions;
      setChartData({
        ...chartData,
        series: [correct, wrong, notattempted]
      });
    }
  }, [user]);

  return (
    <div className="pie">
      <h2>Total Questions - {user ? user.LoggedInUser.totalquestions.correct + user.LoggedInUser.totalquestions.wrong + user.LoggedInUser.totalquestions.notattempted : "0"}</h2>
      <div className="donut">
        <Chart 
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width="420"
        />
      </div>
    </div>
  );
}

export default PieChart;