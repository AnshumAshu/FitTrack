import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth";
import { formatDate } from '../utils/dateFormat';
import Header from "../components/Header";
import dietIcon from "../assets/images/diet.png";  // Diet icon for display

export default function DietHistory() {
  const [userData, setUserData] = useState({});
  const [dietData, setDietData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(6);

  const loggedIn = Auth.loggedIn();
  let currentDate;

  // everytime loggedIn/userdata changes, the getuserdata runs
  useEffect(() => {
    const getUserData = async () => {
      try {
        //get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();

        // Combine diet data into a single array
        if (user.diet) {
          const diet = user.diet;
          //console.log(user.diet)
          // Sort diet data by date
          diet.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });

          // Format date in diet data
          diet.forEach(item => {
            item.date = formatDate(item.date);
          });

          setUserData(user);
          setDietData(diet);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [loggedIn, userData]);

  function showMoreItems() {
    setDisplayedItems(displayedItems + 6);
  }

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className='title'>Diet History</h2>
        {dietData.length ? (
          <div className='history-data'>
            {/* Map the diet data */}
            {dietData.slice(0, displayedItems).map((diet) => {
              let dateToDisplay;
              if (diet.date !== currentDate) {
                currentDate = diet.date;
                dateToDisplay = diet.date;
              }
              return (
                <div className='history-div d-flex' key={diet._id}>
                  <div className='date d-flex align-items-center'>{dateToDisplay}</div>
                  <Link className='text-decoration-none' to={`/history/diet/${diet._id}`}>
                    <div className="history-card diet-title d-flex">
                      <div className='d-flex align-items-center'>
                        <img alt="diet" src={dietIcon} className="history-icon" />
                      </div>
                      <div>
                        <p className='history-name'>{diet.meal}</p>
                        <p className='history-index'>{diet.calories} kcal</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
            {/* Show more items */}
            {dietData.length > displayedItems ? (
              <div className='d-flex justify-content-center'>
                <button className='show-btn' onClick={showMoreItems}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  Show More
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h3 className='history-text'>No diet data yet...</h3>
            <Link to="/diet"><button className='home-btn'>Add Diet</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}





// import React, { useState, useEffect } from 'react';
// import { Navigate, Link } from 'react-router-dom';
// import { getMe } from '../utils/API';
// import Auth from "../utils/auth";
// import { formatDate } from '../utils/dateFormat';
// import Header from "../components/Header";
// import dietIcon from "../assets/images/diet.png";  

// export default function DietHistory() {
//     const [dietData, setDietData] = useState([]);
//     const [displayedItems, setDisplayedItems] = useState(6);
//     const loggedIn = Auth.loggedIn();
//     let currentDate;

//     useEffect(() => {
//         const getUserData = async () => {
//             try {
//                 const token = loggedIn ? Auth.getToken() : null;
//                 if (!token) return false;

//                 const response = await getMe(token);

//                 if (!response.ok) {
//                     throw new Error("Something went wrong!");
//                 }

//                 const user = await response.json();

//                 if (user.diet) {
//                     const diet = user.diet;
//                     diet.sort((a, b) => new Date(b.date) - new Date(a.date));
//                     diet.forEach(item => { item.date = formatDate(item.date); });

//                     setDietData(diet);
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         getUserData();
//     }, [loggedIn]);  // Removed dependency on dietData to avoid infinite loop

//     function showMoreItems() {
//         setDisplayedItems(displayedItems + 6);
//     }

//     if (!loggedIn) {
//         return <Navigate to="/login" />;
//     }

//     return (
//         <div className='history'>
//             <Header />
//             <div className="d-flex flex-column align-items-center">
//                 <h2 className='title'>Diet History</h2>
//                 {dietData.length ? (
//                     <div className='history-data'>
//                         {dietData.slice(0, displayedItems).map((diet) => {
//                             let dateToDisplay;
//                             if (diet.date !== currentDate) {
//                                 currentDate = diet.date;
//                                 dateToDisplay = diet.date;
//                             }
//                             return (
//                                 <div className='history-div d-flex' key={diet._id}>
//                                     <div className='date d-flex align-items-center'>{dateToDisplay}</div>
//                                     <Link className='text-decoration-none' to={`/history/diet/${diet._id}`}>
//                                         <div className="history-card diet-title d-flex">
//                                             <div className='d-flex align-items-center'>
//                                                 <img alt="diet" src={dietIcon} className="history-icon" />
//                                             </div>
//                                             <div>
//                                                 <p className='history-name'>{diet.mealType}</p>
//                                                 <p className='history-index'>{diet.calories} kcal</p>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 </div>
//                             );
//                         })}
//                         {dietData.length > displayedItems && (
//                             <button className='show-btn' onClick={showMoreItems}>Show More</button>
//                         )}
//                     </div>
//                 ) : (
//                     <h3 className='history-text'>No diet data yet...</h3>
//                 )}
//             </div>
//         </div>
//     );
// }





// import React, { useEffect } from 'react';
// import { Navigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMe } from '../utils/API';
// import Auth from "../utils/auth";
// import { formatDate } from '../utils/dateFormat';
// import { setDietEntries } from '../redux/dietSlice';
// import Header from "../components/Header";
// import dietIcon from "../assets/images/diet.png";

// export default function DietHistory() {
//     const dispatch = useDispatch();
//     const dietEntries = useSelector((state) => state.diet.dietEntries);
//     const loggedIn = Auth.loggedIn();

//     useEffect(() => {
//         const fetchDietData = async () => {
//             try {
//                 if (!loggedIn) return;

//                 const token = Auth.getToken();
//                 const response = await getMe(token);

//                 if (!response.ok) {
//                     throw new Error("Something went wrong!");
//                 }

//                 const user = await response.json();

//                 if (user.diet) {
//                     const sortedDiet = user.diet.sort((a, b) => new Date(b.date) - new Date(a.date));
//                     sortedDiet.forEach(item => (item.date = formatDate(item.date)));
//                     dispatch(setDietEntries(sortedDiet));
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchDietData();
//     }, [dispatch, loggedIn]);

//     if (!loggedIn) {
//         return <Navigate to="/login" />;
//     }

//     return (
//         <div className='history'>
//             <Header />
//             <div className="d-flex flex-column align-items-center">
//                 <h2 className='title'>Diet History</h2>
//                 {dietEntries.length ? (
//                     <div className='history-data'>
//                         {dietEntries.map((diet) => (
//                             <div className='history-div d-flex' key={diet._id}>
//                                 <div className='date d-flex align-items-center'>{diet.date}</div>
//                                 <Link className='text-decoration-none' to={`/history/diet/${diet._id}`}>
//                                     <div className="history-card diet-title d-flex">
//                                         <div className='d-flex align-items-center'>
//                                             <img alt="diet" src={dietIcon} className="history-icon" />
//                                         </div>
//                                         <div>
//                                             <p className='history-name'>{diet.food}</p>
//                                             <p className='history-index'>{diet.calories} kcal</p>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <h3>No diet data yet...</h3>
//                 )}
//             </div>
//         </div>
//     );
// }
