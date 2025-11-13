import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MaintenanceStatusChart = ({ data }) => {
  const getStatus = (nextDueDate) => {
    if (!nextDueDate) return "Pending";
    const today = new Date().toISOString().split("T")[0];
    const daysUntilDue = Math.ceil(
      (new Date(nextDueDate) - new Date(today)) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDue < 0) return "Overdue";
    if (daysUntilDue <= 7) return "Due Soon";
    return "On Time";
  };

  const statuses = ["On Time", "Due Soon", "Overdue", "Pending"];
  const chartData = statuses.map((status) => ({
    name: status,
    value: data.filter((log) => getStatus(log.nextDue) === status).length,
  })).filter(item => item.value > 0);

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  if (chartData.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
        <p>No maintenance data to display</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaintenanceStatusChart;
