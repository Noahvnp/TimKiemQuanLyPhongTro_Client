import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const labels = ["Tháng 10", "Tháng 11", "Tháng 12"];

const BarChart = ({ dataOverview }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Tin đăng",
        data: [10, 6, dataOverview?.posts],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 30,
      },
      {
        label: "Doanh thu",
        data: [4, 2, +dataOverview?.amount / Math.pow(10, 6)],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 30,
      },
      {
        label: "Người thuê",
        data: [8, 4, dataOverview?.contracts],
        backgroundColor: "rgba(53, 162, 102, 0.5)",
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "x",
    grouped: true,
    categoryPercentage: 0.8,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê tháng 12/2023",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 mb-5 w-3/4 bg-primary border border-gray-200 rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
