import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { isSameDay, isSameWeek, isSameMonth, parseISO } from "date-fns";

const ResistanceBarChart = ({ data }) => {
  const [filterPeriod, setFilterPeriod] = useState("daily");

  const filterDataByPeriod = (data, period) => {
    const now = new Date();
    return data.filter((exercise) => {
      const exerciseDate = parseISO(exercise.date); // Convert ISO string to Date object
      if (period === "daily") return isSameDay(exerciseDate, now);
      if (period === "weekly") return isSameWeek(exerciseDate, now);
      if (period === "monthly") return isSameMonth(exerciseDate, now);
      return false;
    });
  };

  // Filter resistance data
  const filteredData = filterDataByPeriod(data, filterPeriod);

  // Map the filtered data to a suitable format for the chart
  const chartData = filteredData.map((exercise) => ({
    name: exercise.name, 
    weight: exercise.weight, 
    sets: exercise.sets, 
  }));

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>Select Period: </label>
        <select
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="weight" fill="#8884d8" />
          <Bar dataKey="sets" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResistanceBarChart;
