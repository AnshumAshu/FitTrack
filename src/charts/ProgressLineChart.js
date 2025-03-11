import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { isSameDay, isSameWeek, isSameMonth, parseISO } from "date-fns";

const ProgressLineChart = ({ cardioData }) => {
  const [filterPeriod, setFilterPeriod] = useState("daily");

  const filterDataByPeriod = (data, period) => {
    const now = new Date();
    return data.filter((activity) => {
      const activityDate = parseISO(activity.date); // Convert ISO string to Date object
      if (period === "daily") return isSameDay(activityDate, now);
      if (period === "weekly") return isSameWeek(activityDate, now);
      if (period === "monthly") return isSameMonth(activityDate, now);
      return false;
    });
  };

  // Filter cardio data
  const filteredCardioData = filterDataByPeriod(cardioData, filterPeriod);

  // Map cardio data to a suitable format for the chart
  const chartData = filteredCardioData.map((activity, index) => ({
    name: activity.name,
    distance: activity.distance,
    duration: activity.duration,
    index: index + 1
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

      {/* Check if data is available, otherwise show a message */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Data is not available</p>
      )}
    </div>
  );
};

export default ProgressLineChart;
