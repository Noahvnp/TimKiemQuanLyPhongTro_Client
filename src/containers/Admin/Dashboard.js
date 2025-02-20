import React, { useEffect, useState } from "react";
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

import icons from "../../utils/icons";
import { apiGetOverviewAdmin } from "../../services";

const { MdOutlineBarChart, LuFileLineChart, LuFileBarChart2, FaUsers } = icons;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const labels = ["Tháng 10", "Tháng 11", "Tháng 12"];

const Dashboard = () => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    apiGetOverviewAdmin().then((response) => setdata(response?.data?.response));
  }, []);

  const dataChart = {
    labels,
    datasets: [
      {
        label: "Tin đăng",
        data: [52, 71, data?.posts || 0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 30,
      },
      {
        label: "Người dùng",
        data: [64, 69, data?.users || 0],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 30,
      },
      {
        label: "Người thuê",
        data: [8, 4, data?.renters || 0],
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
    <div className="flex flex-col gap-6">
      <div className="p-4 grid grid-cols-4 gap-6 [&>*]:font-medium [&>*]:border [&>*]:border-gray-200 [&>*]:rounded-xl [&>*]:p-3 [&>*]:shadow-lg">
        <div className="bg-primary flex items-center gap-4">
          <span>
            <LuFileLineChart size={50} color="blue" />
          </span>
          <div className="flex flex-col">
            Tin đăng <span className="text-2xl">{data?.posts}</span>
          </div>
        </div>
        <div className="bg-primary flex items-center gap-4">
          <span>
            <FaUsers size={50} color="blue" />
          </span>
          <div className="flex flex-col">
            Người dùng <span className="text-2xl">{data?.users}</span>
          </div>
        </div>
        <div className="bg-primary flex items-center gap-4">
          <span>
            <FaUsers size={50} color="blue" />
          </span>
          <div className="flex flex-col">
            Người thuê <span className="text-2xl">{data?.renters}</span>
          </div>
        </div>
        <div className="bg-primary flex items-center gap-4">
          <span>
            <LuFileBarChart2 size={50} color="blue" />
          </span>
          <div className="flex flex-col">
            Số hợp đồng <span className="text-2xl">{data?.contracts}</span>
          </div>
        </div>
      </div>
      <div className="px-4 mb-6 flex items-center justify-center">
        <div className="p-4 mb-5 w-4/5 bg-primary border border-gray-200 rounded-lg shadow-lg">
          <Bar data={dataChart} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
