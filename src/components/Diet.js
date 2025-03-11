import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { createDiet } from '../utils/API';
import Header from "./Header";
import dietIcon from "../assets/images/diet-w.png";

export default function Diet() {
    const [dietForm, setDietForm] = useState({
        mealType: "", 
        food: "",
        calories: "",
        protein: "",
        date: ""
    });
    const [startDate, setStartDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const loggedIn = Auth.loggedIn();

    const handleDietChange = (event) => {
        const { name, value } = event.target;
        setDietForm({ ...dietForm, [name]: value });
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        handleDietChange({
            target: { name: "date", value: date }
        });
    };

    const validateForm = (form) => {
        return form.food && form.calories && form.protein && form.date;
    };

    const handleDietSubmit = async (event) => {
        event.preventDefault();

        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const userId = Auth.getUserId();

        if (validateForm(dietForm)) {
            //console.log(dietForm)
            try {
                dietForm.userId = userId;
                const response = await createDiet(dietForm, token);
                //console.log(response);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                setMessage("Diet successfully added!");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } catch (err) {
                console.error(err);
            }
        }

        setDietForm({
            mealType: "", 
            food: "",
            calories: "",
            protein: "",
            date: ""
        });
    };

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='diet'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>Add Diet</h2>
                <form className='diet-form d-flex flex-column' onSubmit={handleDietSubmit}>
                    <div className='d-flex justify-content-center'><img alt="diet" src={dietIcon} className="exercise-form-icon" /></div>
                    
                    {/* <Meal Type (Dropdown) */}
                     <label>Meal Type:</label>
                    <select name="mealType" value={dietForm.mealType} onChange={handleDietChange}>
                         <option value="">Select Meal</option>
                         <option value="Breakfast">Breakfast</option>
                         <option value="Lunch">Lunch</option>
                         <option value="Dinner">Dinner</option>
                         <option value="Snacks">Snacks</option>
                    </select>
                      {/* Food Name */}
                    <label>Food:</label>
                    <input type="text" name="food" id="food" placeholder="food name "
                        value={dietForm.food} onChange={handleDietChange} />
                    {/* Calories */}
                    <label>Calories:</label>
                    <input type="number" name="calories" id="calories" placeholder="0"
                        value={dietForm.calories} onChange={handleDietChange} />
                     {/* Protein */}
                    <label>Protein (g):</label>
                    <input type="number" name="protein" id="protein" placeholder="0"
                        value={dietForm.protein} onChange={handleDietChange} />
                    {/* date */}
                    <label>Date:</label>
                    <DatePicker selected={startDate} value={dietForm.date} onChange={handleDateChange} placeholderText="mm/dd/yyyy" />
                    <button className='submit-btn diet-submit-btn' type="submit" disabled={!validateForm(dietForm)}>Add</button>
                </form>
                <p className='message'>{message}</p>
            </div>
        </div>
    );
}







// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Auth from "../utils/auth";
// import { createDiet } from '../utils/API';
// import { addDiet } from '../redux/dietSlice';
// import Header from "./Header";
// import dietIcon from "../assets/images/diet-w.png";

// export default function Diet() {
//     const dispatch = useDispatch();
//     const [dietForm, setDietForm] = useState({
//         food: "",
//         calories: "",
//         protein: "",
//         date: ""
//     });
//     const [startDate, setStartDate] = useState(new Date());
//     const [message, setMessage] = useState("");
//     const loggedIn = Auth.loggedIn();

//     const handleDietChange = (event) => {
//         const { name, value } = event.target;
//         setDietForm({ ...dietForm, [name]: value });
//     };

//     const handleDateChange = (date) => {
//         setStartDate(date);
//         setDietForm({ ...dietForm, date });
//     };

//     const validateForm = (form) => {
//         return form.food && form.calories && form.protein && form.date;
//     };

//     const handleDietSubmit = async (event) => {
//         event.preventDefault();

//         if (!loggedIn) return;

//         const token = Auth.getToken();
//         const userId = Auth.getUserId();

//         if (validateForm(dietForm)) {
//             try {
//                 dietForm.userId = userId;
//                 const response = await createDiet(dietForm, token);

//                 if (!response.ok) {
//                     throw new Error('Something went wrong!');
//                 }

//                 dispatch(addDiet(dietForm));  // ✅ Update Redux Store

//                 setMessage("Diet successfully added!");
//                 setTimeout(() => setMessage(""), 3000);

//                 setDietForm({
//                     food: "",
//                     calories: "",
//                     protein: "",
//                     date: ""
//                 });
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     };

//     if (!loggedIn) {
//         return <Navigate to="/login" />;
//     }

//     return (
//         <div className='diet'>
//             <Header />
//             <div className="d-flex flex-column align-items-center">
//                 <h2 className='title text-center'>Add Diet</h2>
//                 <form className='diet-form d-flex flex-column' onSubmit={handleDietSubmit}>
//                     <div className='d-flex justify-content-center'>
//                         <img alt="diet" src={dietIcon} className="exercise-form-icon" />
//                     </div>
//                     <label>Food:</label>
//                     <input type="text" name="food" placeholder="Chicken Salad"
//                         value={dietForm.food} onChange={handleDietChange} />
//                     <label>Calories:</label>
//                     <input type="number" name="calories" placeholder="0"
//                         value={dietForm.calories} onChange={handleDietChange} />
//                     <label>Protein (g):</label>
//                     <input type="number" name="protein" placeholder="0"
//                         value={dietForm.protein} onChange={handleDietChange} />
//                     <label>Date:</label>
//                     <DatePicker selected={startDate} onChange={handleDateChange} placeholderText="mm/dd/yyyy" />
//                     <button className='submit-btn diet-submit-btn' type="submit" disabled={!validateForm(dietForm)}>Add</button>
//                 </form>
//                 <p className='message'>{message}</p>
//             </div>
//         </div>
//     );
// }

