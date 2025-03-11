// import React from "react";
// // rename browserRouter as router
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// // import pages and components
// import Home from "./pages/Home";
// import History from "./pages/History";
// import DietHistory from "./pages/Diet_History";
// import Exercise from "./pages/Exercise";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Error from "./pages/Error";
// import SingleExercise from "./components/SingleExercise"
// import Cardio from "./components/Cardio";
// import Resistance from "./components/Resistance";
// import Diet from "./components/Diet";

// import HealthHub from "./components/HealthHub";
// import Cart from "./components/Cart";

// //ai
// import NutritionSearch from "./components/NutritionSearch";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/history" element={<History />} />
//         <Route path="/diet_history" element={<DietHistory />} />
//         <Route path="/history/:type/:id" element={<SingleExercise />} />
//         <Route path="/exercise" element={<Exercise />} />
//         <Route path="/exercise/cardio" element={<Cardio />} />
//         <Route path="/exercise/resistance" element={<Resistance />} />
//         <Route path="/exercise/diet" element={<Diet />} />

//         <Route path="/HealthHub" element={<HealthHub />} />
//         <Route path="/Cart" element={<Cart />} />

//         <Route path="/nutrition-search" element={<NutritionSearch />} /> 

        

//         <Route path="*" element={<Error />} />
//       </Routes>
//     </Router >
//   );
// }

// export default App;






// src/App.js
import React from "react";
// rename browserRouter as router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import pages and components
import Home from "./pages/Home";
import History from "./pages/History";
import DietHistory from "./pages/Diet_History";
import Exercise from "./pages/Exercise";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import SingleExercise from "./components/SingleExercise"
import Cardio from "./components/Cardio";
import Resistance from "./components/Resistance";
import Diet from "./components/Diet";

import HealthHub from "./components/HealthHub";
import Cart from "./components/Cart";
// ai
import NutritionSearch from "./components/NutritionSearch";
// Import Status page
import Status from "./pages/Status";  // <-- Import the Status page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="/diet_history" element={<DietHistory />} />
        <Route path="/history/:type/:id" element={<SingleExercise />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/exercise/cardio" element={<Cardio />} />
        <Route path="/exercise/resistance" element={<Resistance />} />
        <Route path="/exercise/diet" element={<Diet />} />
        <Route path="/HealthHub" element={<HealthHub />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/nutrition-search" element={<NutritionSearch />} />
        {/* Add Status route here */}
        <Route path="/status" element={<Status />} />  {/* <-- Add this route */}

        <Route path="*" element={<Error />} />
      </Routes>
    </Router >
  );
}

export default App;



