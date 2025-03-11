import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if exists
const loadCartFromStorage = () => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
};

const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromStorage()
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            saveCartToStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((_, index) => index !== action.payload);
            saveCartToStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cart");
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
