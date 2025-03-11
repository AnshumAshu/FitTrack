// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// // Example: You can change this to `calories`, `protein`, or any other metric you'd like to show.
// const DietPieChart = ({ dietData }) => {
//   // Prepare the data for the pie chart
//   const pieChartData = dietData.map((meal) => ({
//     name: meal.food,  // Food name (e.g., "Aaloo paratha")
//     value: meal.calories,  // Use calories for visualization (or protein, fat, etc.)
//   }));

//   // Define color for each segment (optional)
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8042"];

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <PieChart>
//         <Pie
//           data={pieChartData}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"  // Center of the pie
//           cy="50%"  // Center of the pie
//           outerRadius={80}  // Radius of the outer pie
//           fill="#8884d8"
//           label
//         >
//           {pieChartData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default DietPieChart;








// import React, { useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { isSameDay, isSameWeek, isSameMonth, parseISO } from "date-fns";

// const DietPieChart = ({ dietData }) => {
//   const [filterPeriod, setFilterPeriod] = useState("daily");

//   // Function to filter dietData based on the selected period (daily, weekly, monthly)
//   const filterDataByPeriod = (data, period) => {
//     const now = new Date();
//     return data.filter((meal) => {
//       const mealDate = parseISO(meal.date); // Convert the ISO string to a Date object
//       if (period === "daily") {
//         return isSameDay(mealDate, now);
//       } else if (period === "weekly") {
//         return isSameWeek(mealDate, now);
//       } else if (period === "monthly") {
//         return isSameMonth(mealDate, now);
//       }
//       return false;
//     });
//   };

//   // Filter data based on the selected period
//   const filteredData = filterDataByPeriod(dietData, filterPeriod);

//   // Sum up calories and protein for the filtered data
//   const totalCalories = filteredData.reduce((sum, meal) => sum + meal.calories, 0);
//   const totalProtein = filteredData.reduce((sum, meal) => sum + meal.protein, 0);

//   // If totalCalories or totalProtein is 0, display a message to the user
//   if (totalCalories === 0 && totalProtein === 0) {
//     return (
//       <div>
//         <div style={{ marginBottom: "20px" }}>
//           <label>Select Period: </label>
//           <select
//             value={filterPeriod}
//             onChange={(e) => setFilterPeriod(e.target.value)}
//           >
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//           </select>
//         </div>
//         <p>No data available for the selected period.</p>
//       </div>
//     );
//   }

//   // Data for the pie chart
//   const pieChartData = [
//     { name: "Calories", value: totalCalories },
//     { name: "Protein", value: totalProtein },
//   ];

//   // Define color for each segment (optional)
//   const COLORS = ["#0088FE", "#00C49F"];

//   return (
//     <div>
//       {/* Dropdown for period selection */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>Select Period: </label>
//         <select
//           value={filterPeriod}
//           onChange={(e) => setFilterPeriod(e.target.value)}
//         >
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={pieChartData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"  // Center of the pie
//             cy="50%"  // Center of the pie
//             outerRadius={80}  // Radius of the outer pie
//             fill="#8884d8"
//             label
//           >
//             {pieChartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>

//       {/* Display total calories and protein */}
//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <p><strong>Total Calories: </strong>{totalCalories}</p>
//         <p><strong>Total Protein: </strong>{totalProtein}g</p>
//       </div>
//     </div>
//   );
// };

// export default DietPieChart;










import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { isSameDay, isSameWeek, isSameMonth, parseISO } from "date-fns";

const DietPieChart = ({ dietData }) => {
  const [filterPeriod, setFilterPeriod] = useState("daily");

  // Function to filter dietData based on the selected period (daily, weekly, monthly)
  const filterDataByPeriod = (data, period) => {
    const now = new Date();
    return data.filter((meal) => {
      const mealDate = typeof meal.date === "string" ? parseISO(meal.date) : new Date(meal.date);
      if (period === "daily") {
        return isSameDay(mealDate, now);
      } else if (period === "weekly") {
        return isSameWeek(mealDate, now, { weekStartsOn: 1 }); // Week starts on Monday
      } else if (period === "monthly") {
        return isSameMonth(mealDate, now);
      }
      return false;
    });
  };

  // Filter data based on the selected period
  const filteredData = filterDataByPeriod(dietData, filterPeriod);

  // Debugging console logs
  console.log("Filtered Data:", filteredData);
  console.log("Raw Data:", dietData);

  // Sum up calories and protein for the filtered data
  const totalCalories = filteredData.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = filteredData.reduce((sum, meal) => sum + meal.protein, 0);

  // If totalCalories or totalProtein is 0, display a message to the user
  if (totalCalories === 0 && totalProtein === 0) {
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
        <p>No data available for the selected period.</p>
      </div>
    );
  }

  // Data for the pie chart
  const pieChartData = [
    { name: "Calories", value: totalCalories },
    { name: "Protein", value: totalProtein },
  ];

  // Define color for each segment (optional)
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div>
      {/* Dropdown for period selection */}
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
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"  // Center of the pie
            cy="50%"  // Center of the pie
            outerRadius={80}  // Radius of the outer pie
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Display total calories and protein */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p><strong>Total Calories: </strong>{totalCalories}</p>
        <p><strong>Total Protein: </strong>{totalProtein}g</p>
      </div>
    </div>
  );
};

export default DietPieChart;
