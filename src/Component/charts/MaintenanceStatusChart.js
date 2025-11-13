// src/components/Charts/MaintenanceStatusChart.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const MaintenanceStatusChart = ({ data }) => {
  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Maintenance Status Overview</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx={150}
          cy={100}
          outerRadius={80}
          label
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MaintenanceStatusChart;
