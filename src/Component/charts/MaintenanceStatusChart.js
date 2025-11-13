import React from "react";
import { Pie } from "react-chartjs-2";

const MaintenanceStatusChart = ({ data }) => {
  const statuses = ["On Time", "Due Soon", "Overdue"];
  const counts = statuses.map(
    (status) => data.filter((m) => m.status === status).length
  );

  const chartData = {
    labels: statuses,
    datasets: [
      {
        data: counts,
        backgroundColor: ["#4CAF50", "#FFEB3B", "#F44336"],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Machine Status Overview</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default MaintenanceStatusChart;
