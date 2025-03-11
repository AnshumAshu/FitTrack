// import React, { useState, useEffect } from 'react';
// import { useParams, Navigate, useNavigate } from 'react-router-dom';
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

// import Auth from '../utils/auth';
// import { getCardioById, getResistanceById, deleteCardio, deleteResistance } from '../utils/API';
// import { formatDate } from '../utils/dateFormat';
// import Header from "./Header";
// import cardioIcon from "../assets/images/cardio-w.png"
// import resistanceIcon from "../assets/images/resistance-w.png"


// export default function SingleExercise() {
//     const { id, type } = useParams();
//     const [cardioData, setCardioData] = useState({})
//     const [resistanceData, setResistanceData] = useState({})


//     const loggedIn = Auth.loggedIn();
//     const navigate = useNavigate()

//     useEffect(() => {
//         const displayExercise = async (exerciseId) => {
//             //get token
//             const token = loggedIn ? Auth.getToken() : null;
//             if (!token) return false;

//             // fetch cardio data by id
//             if (type === "cardio") {
//                 try {
//                     const response = await getCardioById(exerciseId, token);
//                     if (!response.ok) { throw new Error('something went wrong!') }

//                     const cardio = await response.json()
//                     cardio.date = formatDate(cardio.date)
//                     setCardioData(cardio)
//                 } catch (err) { console.error(err) }
//             }

//             // fetch resistance data by id
//             else if (type === "resistance") {
//                 try {
//                     const response = await getResistanceById(exerciseId, token);
//                     if (!response.ok) { throw new Error('something went wrong!') }

//                     const resistance = await response.json()
//                     resistance.date = formatDate(resistance.date)
//                     setResistanceData(resistance)
//                 } catch (err) { console.error(err) }
//             }
//         }
//         displayExercise(id)
//     }, [id, type, loggedIn])

//     if (!loggedIn) {
//         return <Navigate to="/login" />;
//     }

//     const handleDeleteExercise = async (exerciseId) => {
//         const token = loggedIn ? Auth.getToken() : null;
//         if (!token) return false;

//         confirmAlert({
//             title: "Delete Exercise",
//             message: "Are you sure you want to delete this exercise?",
//             buttons: [
//                 {
//                     label: "Cancel",
//                 },
//                 {
//                     label: "Delete",
//                     onClick: async () => {
//                         // delete cardio data
//                         if (type === "cardio") {
//                             try {
//                                 const response = await deleteCardio(exerciseId, token);
//                                 if (!response.ok) { throw new Error('something went wrong!') }
//                             }
//                             catch (err) { console.error(err) }
//                         }

//                         // delete resistance data
//                         else if (type === "resistance") {
//                             try {
//                                 const response = await deleteResistance(exerciseId, token);
//                                 if (!response.ok) { throw new Error('something went wrong!') }
//                             }
//                             catch (err) { console.error(err) }
//                         }

//                         // go back to history
//                         navigate("/history")
//                     }
//                 }
//             ]
//         });
//     }

//     return (
//         <div className={type === "cardio" ? "single-cardio" : "single-resistance"}>
//             <Header />
//             <h2 className='title text-center'>History</h2>
//             <div className="single-exercise d-flex flex-column align-items-center text-center">
//                 {type === "cardio" && (<div className='cardio-div '>
//                     <div className='d-flex justify-content-center'><img alt="cardio" src={cardioIcon} className="exercise-form-icon" /></div>
//                     <p><span>Date: </span> {cardioData.date}</p>
//                     <p><span>Name: </span> {cardioData.name}</p>
//                     <p><span>Distance: </span> {cardioData.distance} miles</p>
//                     <p><span>Duration: </span> {cardioData.duration} minutes</p>
//                     <button className='delete-btn' onClick={() => handleDeleteExercise(id)}>Delete Exercise</button>
//                 </div>)}
//                 {type === "resistance" && (<div className='resistance-div'>
//                     <div className='d-flex justify-content-center'><img alt="resistance" src={resistanceIcon} className="exercise-form-icon" /></div>
//                     <p><span>Date: </span> {resistanceData.date}</p>
//                     <p><span>Name: </span> {resistanceData.name}</p>
//                     <p><span>Weight: </span> {resistanceData.weight} lbs</p>
//                     <p><span>Sets: </span> {resistanceData.sets}</p>
//                     <p><span>Reps: </span> {resistanceData.reps}</p>
//                     <button className='delete-btn' onClick={() => handleDeleteExercise(id)}>Delete Exercise</button>
//                 </div>)}
//             </div>
//         </div>

//     )
// }




import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Auth from '../utils/auth';
import { getCardioById, getResistanceById, getDietById, deleteCardio, deleteResistance, deleteDiet } from '../utils/API';
import { formatDate } from '../utils/dateFormat';
import Header from "./Header";
import cardioIcon from "../assets/images/cardio-w.png";
import resistanceIcon from "../assets/images/resistance-w.png";
import dietIcon from "../assets/images/diet-w.png"; // Add your diet icon here

export default function SingleExercise() {
    const { id, type } = useParams();
    const [cardioData, setCardioData] = useState({});
    const [resistanceData, setResistanceData] = useState({});
    const [dietData, setDietData] = useState({}); // State for diet data

    const loggedIn = Auth.loggedIn();
    const navigate = useNavigate();

    useEffect(() => {
        const displayExercise = async (exerciseId) => {
            //get token
            const token = loggedIn ? Auth.getToken() : null;
            if (!token) return false;

            // fetch cardio data by id
            if (type === "cardio") {
                try {
                    const response = await getCardioById(exerciseId, token);
                    if (!response.ok) { throw new Error('something went wrong!') }

                    const cardio = await response.json();
                    cardio.date = formatDate(cardio.date);
                    setCardioData(cardio);
                } catch (err) { console.error(err); }
            }

            // fetch resistance data by id
            else if (type === "resistance") {
                try {
                    const response = await getResistanceById(exerciseId, token);
                    if (!response.ok) { throw new Error('something went wrong!') }

                    const resistance = await response.json();
                    resistance.date = formatDate(resistance.date);
                    setResistanceData(resistance);
                } catch (err) { console.error(err); }
            }

            // fetch diet data by id
            else if (type === "diet") { // Diet data fetch
                try {
                    const response = await getDietById(exerciseId, token);
                    if (!response.ok) { throw new Error('something went wrong!') }

                    const diet = await response.json();
                    diet.date = formatDate(diet.date);
                    setDietData(diet);
                } catch (err) { console.error(err); }
            }
        }
        displayExercise(id);
    }, [id, type, loggedIn]);

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    const handleDeleteExercise = async (exerciseId) => {
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        confirmAlert({
            title: "Delete Exercise",
            message: "Are you sure you want to delete this exercise?",
            buttons: [
                {
                    label: "Cancel",
                },
                {
                    label: "Delete",
                    onClick: async () => {
                        // delete cardio data
                        if (type === "cardio") {
                            try {
                                const response = await deleteCardio(exerciseId, token);
                                if (!response.ok) { throw new Error('something went wrong!') }
                            }
                            catch (err) { console.error(err); }
                        }

                        // delete resistance data
                        else if (type === "resistance") {
                            try {
                                const response = await deleteResistance(exerciseId, token);
                                if (!response.ok) { throw new Error('something went wrong!') }
                            }
                            catch (err) { console.error(err); }
                        }

                        // delete diet data
                        else if (type === "diet") { // Diet delete
                            try {
                                const response = await deleteDiet(exerciseId, token);
                                if (!response.ok) { throw new Error('something went wrong!') }
                            }
                            catch (err) { console.error(err); }
                        }

                        // go back to history
                        navigate("/history");
                    }
                }
            ]
        });
    }

    return (
        <div className={type === "cardio" ? "single-cardio" : type === "resistance" ? "single-resistance" : "single-diet"}>
            <Header />
            <h2 className='title text-center'>History</h2>
            <div className="single-exercise d-flex flex-column align-items-center text-center">
                {type === "cardio" && (<div className='cardio-div'>
                    <div className='d-flex justify-content-center'><img alt="cardio" src={cardioIcon} className="exercise-form-icon" /></div>
                    <p><span>Date: </span> {cardioData.date}</p>
                    <p><span>Name: </span> {cardioData.name}</p>
                    <p><span>Distance: </span> {cardioData.distance} miles</p>
                    <p><span>Duration: </span> {cardioData.duration} minutes</p>
                    <button className='delete-btn' onClick={() => handleDeleteExercise(id)}>Delete Exercise</button>
                </div>)}

                {type === "resistance" && (<div className='resistance-div'>
                    <div className='d-flex justify-content-center'><img alt="resistance" src={resistanceIcon} className="exercise-form-icon" /></div>
                    <p><span>Date: </span> {resistanceData.date}</p>
                    <p><span>Name: </span> {resistanceData.name}</p>
                    <p><span>Weight: </span> {resistanceData.weight} lbs</p>
                    <p><span>Sets: </span> {resistanceData.sets}</p>
                    <p><span>Reps: </span> {resistanceData.reps}</p>
                    <button className='delete-btn' onClick={() => handleDeleteExercise(id)}>Delete Exercise</button>
                </div>)}

                {type === "diet" && (<div className='diet-div'>
                    <div className='d-flex justify-content-center'><img alt="diet" src={dietIcon} className="exercise-form-icon" /></div>
                    <p><span>Meal Type: </span> {dietData.mealType}</p>
                    <p><span>Name: </span> {dietData.food}</p>
                    <p><span>Date: </span> {dietData.date}</p>
                    
                    <p><span>Calories: </span> {dietData.calories} kcal</p>
                    <p><span>Protein: </span> {dietData.protein}</p>
                    <button className='delete-btn' onClick={() => handleDeleteExercise(id)}>Delete Exercise</button>
                </div>)}
            </div>
        </div>
    )
}
