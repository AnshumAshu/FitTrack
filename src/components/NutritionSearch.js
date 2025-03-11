import { useState } from "react";
import { Navigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import axios from "axios";
import Header from "./Header";
import nutritionIcon from "../assets/images/cardio.png"; // Replace with an appropriate icon

export default function NutritionSearch() {
  const [food, setFood] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const loggedIn = Auth.loggedIn();

  // const handleDateChange = (date) => {
  //   setStartDate(date);
  // };

  const handleFoodChange = (event) => {
    const { value } = event.target;
    setFood(value);
  };

  const validateForm = (food) => {
    return food;
  };

  const getNutrition = async () => {
    try {
      setError(""); // Clear previous errors
      const response = await axios.post("http://localhost:3001/api/nutrition", { food });
      console.log(response.data);  // Log the API response to check the structure
      setResult(response.data);
      setMessage("Nutrition data fetched successfully!");
    } catch (err) {
      setError("Failed to fetch nutrition data. Please try again.");
    }
  };

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="nutrition-search">
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title text-center">Nutrition Analyzer</h2>
        <form
          className="nutrition-form d-flex flex-column"
          onSubmit={(e) => {
            e.preventDefault();
            getNutrition();
          }}
        >
          <div className="d-flex justify-content-center">
            <img
              alt="nutrition"
              src={nutritionIcon}
              className="nutrition-form-icon"
            />
          </div>
          <label>Food Item:</label>
          <input
            type="text"
            name="food"
            id="food"
            placeholder="Enter food item (e.g., 2 eggs)"
            value={food}
            onChange={handleFoodChange}
          />
          {/* <label>Date:</label> */}
          {/* <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
          /> */}
          <button
            className="submit-btn"
            type="submit"
            disabled={!validateForm(food)}
          >
            Analyze
          </button>
        </form>

        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}

        {result ? (
          <div className="nutrition-info">
            <h3>Nutrition Info:</h3>
            {result.map((item, index) => (
              <div key={index}>
                <p>
                  <strong>Food:</strong> {food}
                </p>
                <p>
                  <strong>Calories:</strong> {item.calories} kcal
                </p>
                <p>
                  <strong>Protein:</strong> {item.protein_g}g
                </p>
                <p>
                  <strong>Carbs:</strong> {item.carbohydrates_total_g}g
                </p>
                <p>
                  <strong>Fats:</strong> {item.fat_total_g}g
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No nutrition data available or invalid response.</p>
        )}
      </div>
    </div>
  );
}
