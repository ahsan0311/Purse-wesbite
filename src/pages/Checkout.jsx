import React, { useState } from "react";
import { useCart } from "../hooks/useCart";

export default function Checkout() {
  const cart = useCart((state) => state.cart);
  const totalPrice = useCart((state) => state.totalPrice);
  const clearCart = useCart((state) => state.clearCart); // <-- Get clearCart method

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Create form data
    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/mqageaoo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        clearCart(); // <-- Clear the cart after successful submission
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p>Your order has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-16 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    {item.qty} x ${item.price}
                  </p>
                </div>
                <p className="font-semibold">${item.qty * item.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalPrice()}</span>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              required
            />

            {/* Hidden inputs for cart items */}
            {cart.map((item, index) => (
              <input
                key={item.id}
                type="hidden"
                name={`item_${index}`}
                value={`${item.name} x ${item.qty} = $${item.qty * item.price}`}
              />
            ))}

            <input type="hidden" name="total" value={`$${totalPrice()}`} />

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
