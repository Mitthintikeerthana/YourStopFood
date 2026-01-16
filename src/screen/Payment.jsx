import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.app.cartData);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    upiId: "",
    name: "",
    email: "",
    phone: ""
  });

  const totalAmount = cartData?.reduce((acc, rest) => {
    const resTotal = rest.menuItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return acc + resTotal;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
        alert("Please fill in all card details");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!formData.upiId) {
        alert("Please enter UPI ID");
        return;
      }
    }

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in delivery details");
      return;
    }

    // Simulate payment processing
    alert(`Payment of ₹${totalAmount.toFixed(2)} processed successfully!`);

    // Redirect to tracking page instead of home
    navigate('/tracking');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-orange-500 tracking-wide">
              🍽️ YourStopFood
            </h1>
          </Link>
          <p className="text-gray-700 font-medium">Checkout</p>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION - PAYMENT FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Information</h2>
            
            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Payment Method</h3>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-orange-500"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center gap-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-orange-500"
                  />
                  <span>UPI</span>
                </label>
                
                <label className="flex items-center gap-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-500">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-orange-500"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === "card" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Card Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === "upi" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">UPI Details</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="yourname@upi"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Cash on Delivery Info */}
            {paymentMethod === "cod" && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Cash on Delivery</h3>
                <p className="text-yellow-700">
                  Pay in cash when your order is delivered to your doorstep.
                </p>
              </div>
            )}

            {/* Delivery Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION — ORDER SUMMARY */}
        <div className="bg-white shadow-md rounded-xl p-5 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {cartData.map((restaurant) => (
              <div key={restaurant.id}>
                <h3 className="font-semibold text-gray-700 border-b pb-2 mb-2">
                  {restaurant.restaurantDetails.name}
                </h3>
                {restaurant.menuItems.map((item) => (
                  <div key={item.item_id} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm mt-4 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Place Order
          </button>
          
          <Link
            to="/cart"
            className="mt-3 block text-center text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;