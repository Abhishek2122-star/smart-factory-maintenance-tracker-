import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SparePartsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
        <p>No spare parts data to display</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="partName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" name="Quantity Used" />
          <Bar dataKey="cost" fill="#82ca9d" name="Cost ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparePartsChart;
