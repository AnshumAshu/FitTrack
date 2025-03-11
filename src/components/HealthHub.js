import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Auth from "../utils/auth";
import Header from "../components/Header";

import wheyProtein from "../assets/images/whey_protien.jpg";
import multiVitamin from "../assets/images/multi_vitamin.jpg";
import fishOil from "../assets/images/fish_oil.jpg";

const supplements = [
    { id: 1, name: "Whey Protein", price: 49.99, details: "High-quality whey protein for muscle recovery.", image: wheyProtein },
    { id: 2, name: "Multivitamins", price: 29.99, details: "Essential vitamins and minerals for daily health.", image: multiVitamin },
    { id: 3, name: "Fish Oil", price: 19.99, details: "Omega-3 fatty acids for heart and brain health.", image: fishOil }
];


export default function HealthHub() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [message, setMessage] = useState("");

    // Check if the user is logged in
    const loggedIn = Auth.loggedIn();
    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    // Add to cart function
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setMessage(`${product.name} added to cart!`);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="health-hub">
            <Header />
            <div className="container">
                <h2 className="title text-center">Health Hub</h2>

                {message && <p className="alert-message">{message}</p>}

                <div className="supplement-list">
                    {supplements.map((item) => (
                        <div key={item.id} className="supplement-card">
                            <img src={item.image} alt={item.name} className="supplement-image" />
                            <h3>{item.name}</h3>
                            <p>{item.details}</p>
                            <p><strong>{item.price.toFixed(2)}</strong></p>
                            <button onClick={() => handleAddToCart(item)} className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    ))}
                </div>

                {/* Navigate to Cart Page */}
                <Link to="/cart">
                    <button className="go-to-cart-btn">Go to Cart ({cartItems.length})</button>
                </Link>
            </div>
        </div>
    );
}
