import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { isSameDay, isSameWeek, isSameMonth, parseISO } from 'date-fns';
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler, ArcElement);

const FitnessRadarChart = ({ cardioData, resistanceData, dietData }) => {
  const [filterPeriod, setFilterPeriod] = useState("daily");

  const filterDataByPeriod = (data, period) => {
    const now = new Date();
    return data.filter(item => {
      const itemDate = parseISO(item.date); // Convert ISO date to Date object
      if (period === "daily") return isSameDay(itemDate, now);
      if (period === "weekly") return isSameWeek(itemDate, now);
      if (period === "monthly") return isSameMonth(itemDate, now);
      return false;
    });
  };

  // Filter data for each category based on the selected period
  const filteredCardioData = filterDataByPeriod(cardioData, filterPeriod);
  const filteredResistanceData = filterDataByPeriod(resistanceData, filterPeriod);
  const filteredDietData = filterDataByPeriod(dietData, filterPeriod);

  const cardioValue = filteredCardioData.reduce((total, item) => total + item.duration, 0); 
  const resistanceValue = filteredResistanceData.reduce((total, item) => total + item.weight * item.sets, 0); 
  const runningValue = filteredCardioData.filter(item => item.name === "running").reduce((total, item) => total + item.duration, 0); 
  const dietValue = filteredDietData.reduce((total, item) => total + item.calories, 0); 

  const chartData = {
    labels: ['Cardio', 'Resistance', 'Running', 'Diet'],
    datasets: [
      {
        label: 'Fitness Level',
        data: [cardioValue, resistanceValue, runningValue, dietValue],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

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

      <Radar data={chartData} />
    </div>
  );
};

export default FitnessRadarChart;
