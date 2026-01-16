import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Tracking = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState('preparing');
  const [estimatedTime, setEstimatedTime] = useState(25); // in minutes

  // Simulate order progression
  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Move to next status when timer reaches 0
          if (orderStatus === 'preparing') {
            setOrderStatus('on_the_way');
            return 15; // 15 minutes remaining
          } else if (orderStatus === 'on_the_way') {
            setOrderStatus('delivered');
            return 0;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 3000); // Update every 3 seconds for demo purposes

    return () => clearInterval(timer);
  }, [orderStatus]);

  const getStatusText = () => {
    switch(orderStatus) {
      case 'preparing':
        return 'Preparing your order';
      case 'on_the_way':
        return 'On the way to you';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Preparing your order';
    }
  };

  const getStatusDescription = () => {
    switch(orderStatus) {
      case 'preparing':
        return 'Your order is being prepared by the restaurant';
      case 'on_the_way':
        return 'Your order is on its way to you';
      case 'delivered':
        return 'Your order has been delivered. Enjoy your meal!';
      default:
        return 'Your order is being prepared by the restaurant';
    }
  };

  const handleTrackAgain = () => {
    setOrderStatus('preparing');
    setEstimatedTime(25);
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
          <p className="text-gray-700 font-medium">Track Order</p>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order #ORD-{Math.floor(100000 + Math.random() * 900000)}</h2>
          <p className="text-gray-600">Thank you for your order!</p>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800">{getStatusText()}</h3>
              <p className="text-gray-600">{getStatusDescription()}</p>
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
              {orderStatus === 'delivered' ? 'Completed' : `${estimatedTime} min`}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Order Placed</span>
              <span>Preparing</span>
              <span>On the Way</span>
              <span>Delivered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-orange-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ 
                  width: orderStatus === 'preparing' ? '33%' : 
                         orderStatus === 'on_the_way' ? '66%' : 
                         '100%' 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700">Delivery Address</h4>
              <p className="text-gray-600">123 Food Street, Delicious City</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Contact</h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Payment Method</h4>
              <p className="text-gray-600 capitalize">Credit/Debit Card</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Order Time</h4>
              <p className="text-gray-600">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleTrackAgain}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Track Another Order
          </button>
          <Link
            to="/"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-all text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tracking;