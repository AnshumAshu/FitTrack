//import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  // Handle Razorpay checkout
  const handleRazorpayCheckout = () => {
    const options = {
      key: "rzp_test_yQH2JtxblOtrqp", // Replace with your Razorpay test key
      amount: totalPrice * 100, // Amount in paise (1 INR = 100 paise)
      currency: "INR", // Set the currency to INR (Indian Rupees)
      name: "Your Store Name", // Your store or app name
      description: "Your Order Description", // Description of the order
      image: "https://your-logo-url.com", // Your logo URL (optional)
      handler: function (response) {
        // Handle the payment success response here
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        dispatch(clearCart());
        navigate("/"); // Navigate back to the homepage after successful payment
      },
      prefill: {
        name: "John Doe", // User's name (can be fetched from the profile)
        email: "john@example.com", // User's email (can be fetched from the profile)
        contact: "1234567890", // User's contact number
      },
      theme: {
        color: "#F37254", // Set the color of the Razorpay popup
      },
      // Optional: UPI should be enabled by default in test mode (check Razorpay test account settings)
      payment_method: {
        upi: false, // Enable UPI for testing (Razorpay test accounts typically support this)
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="cart">
      <Header />
      <div className="container">
        <h2 className="title text-center">Shopping Cart</h2>

        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>{item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(index))}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <h3>Total: {totalPrice.toFixed(2)}</h3>

            <button
              onClick={handleRazorpayCheckout}
              className="checkout-btn"
            >
              Checkout
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
