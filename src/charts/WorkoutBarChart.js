import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { isSameDay, isSameWeek, isSameMonth, parseISO } from "date-fns";

const WorkoutBarChart = ({ cardioData, resistanceData }) => {
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

  // Filter cardio data
  const filteredCardioData = filterDataByPeriod(cardioData, filterPeriod);

  // Filter resistance data
  const filteredResistanceData = filterDataByPeriod(
    resistanceData,
    filterPeriod
  );

  // Map the resistance data to a suitable format for the bar chart
  const resistanceChartData = filteredResistanceData.map((exercise) => ({
    name: exercise.name,
    weight: exercise.weight,
    sets: exercise.sets,
  }));

  // Map the cardio data to a suitable format for the bar chart
  const cardioChartData = filteredCardioData.map((exercise) => ({
    name: exercise.name,
    distance: exercise.distance,
    duration: exercise.duration,
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

      <div>
        {/* Resistance Data Chart */}
        {resistanceChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resistanceChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="weight" fill="#8884d8" name="Weight (kg)" />
              <Bar dataKey="sets" fill="#82ca9d" name="Sets" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No Data Available for Resistance Training</p>
        )}

        {/* Add Margin Between Charts */}
        <div style={{ margin: "50px 0" }}></div>

        {/* Cardio Data Chart */}
        {cardioChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cardioChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="distance" fill="#ff7300" name="Distance (km)" />
              <Bar dataKey="duration" fill="#387908" name="Duration (min)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No Data Available for Cardio</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutBarChart;
