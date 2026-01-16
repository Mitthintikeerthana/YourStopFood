import React from "react";
import { useGetResaturantData } from "../Hook";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

const Home = () => {
  useGetResaturantData();
  const restaurantData = useSelector((state) => state.app.restaurantData);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500 tracking-wide">
            🍽️ YourStopFood
          </h1>

          <Link
            to="/cart"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          >
            Cart
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Popular Restaurants
        </h2>

        {restaurantData?.length === 0 ? (
          <div className="w-full text-center py-16 text-gray-500 text-lg">
            Loading Restaurants...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {restaurantData.map((obj) => (
              <RestaurantCard key={obj.id} data={obj} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
