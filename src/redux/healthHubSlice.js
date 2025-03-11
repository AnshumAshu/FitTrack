import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    healthData: [],
};

const healthHubSlice = createSlice({
    name: "healthHub",
    initialState,
    reducers: {
        addHealthData: (state, action) => {
            state.healthData.push(action.payload);
        },
        removeHealthData: (state, action) => {
            state.healthData = state.healthData.filter(data => data.id !== action.payload);
        },
        clearHealthData: (state) => {
            state.healthData = [];
        }
    },
});

export const { addHealthData, removeHealthData, clearHealthData } = healthHubSlice.actions;
export default healthHubSlice.reducer;
