import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
// import dietReducer from "./dietSlice"; // ✅ Import dietReducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // diet: dietReducer, // ✅ Add dietReducer to the store
  },
});

export default store;
