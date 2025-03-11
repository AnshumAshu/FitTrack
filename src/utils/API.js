// // get logged in user's info 

// export const getMe = (token) => {
//   return fetch('/api/user/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const createUser = (userData) => {
//   return fetch("/api/user", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
// };

// export const loginUser = (userData) => {
//   return fetch("/api/user/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
// };

// export const createCardio = (cardioData, token) => {
//   return fetch("/api/exercise/cardio", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(cardioData)
//   })
// }

// export const createResistance = (resistanceData, token) => {
//   return fetch("/api/exercise/resistance", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(resistanceData)
//   })
// }

// export const getCardioById = (cardioId, token) => {
//   return fetch(`/api/exercise/cardio/${cardioId}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     }
//   })
// }

// export const getResistanceById = (resistanceId, token) => {
//   return fetch(`/api/exercise/resistance/${resistanceId}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     }
//   })
// }

// export const deleteCardio = (cardioId, token) => {
//   return fetch(`/api/exercise/cardio/${cardioId}`, {
//     method: "DELETE",
//     headers: {
//       authorization: `Bearer ${token}`,
//     }
//   })
// }

// export const deleteResistance = (resistanceId, token) => {
//   return fetch(`/api/exercise/resistance/${resistanceId}`, {
//     method: "DELETE",
//     headers: {
//       authorization: `Bearer ${token}`,
//     }
//   })
// }




// get logged in user's info
export const getMe = (token) => {
  return fetch('/api/user/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const createCardio = (cardioData, token) => {
  return fetch("/api/exercise/cardio", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardioData),
  });
};

export const createResistance = (resistanceData, token) => {
  return fetch("/api/exercise/resistance", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resistanceData),
  });
};

export const createDiet = (dietData, token) => {
  console.log(dietData)
  return fetch("/api/exercise/diet", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dietData),
  });
};

export const getCardioById = (cardioId, token) => {
  return fetch(`/api/exercise/cardio/${cardioId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const getResistanceById = (resistanceId, token) => {
  return fetch(`/api/exercise/resistance/${resistanceId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const getDietById = (dietId, token) => {
  return fetch(`/api/exercise/diet/${dietId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCardio = (cardioId, token) => {
  return fetch(`/api/exercise/cardio/${cardioId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteResistance = (resistanceId, token) => {
  return fetch(`/api/exercise/resistance/${resistanceId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteDiet = (dietId, token) => {
  return fetch(`/api/exercise/diet/${dietId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};



// //for chart
// // utils/API.js
// export const getExerciseById = async (type, id, token) => {
//   const response = await fetch(`/api/${type}/${id}`, {
//       headers: {
//           Authorization: `Bearer ${token}`,
//       },
//   });
//   return response;
// };
