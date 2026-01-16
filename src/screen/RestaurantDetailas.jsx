import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetResaturantData } from "../Hook";
import { dummyImage } from "../components/RestaurantCard";
import { addItemsInCart } from "../Store/app";

const RestaurantDetailas = () => {
  const dispatch = useDispatch();
  useGetResaturantData();
  const { id } = useParams();

  const allRestaurantData = useSelector((state) => state.app.restaurantData);
  
  const restaurantData = allRestaurantData.find((data) => data.id === id);

  const [imageUri, setImageUri] = useState(restaurantData?.image_url ?? "");

  function handleImageError() {
    const idx = Math.floor(Math.random() * (dummyImage.length - 1));
    setImageUri(dummyImage[idx]);
  }

  function handleClick(itemId) {
    dispatch(addItemsInCart({ resId: id, item_id: itemId }));
  }

  if (!restaurantData)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl">
        Loading...
      </div>
    );

  const { name, rating, cuisine, address, menu } = restaurantData;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-orange-500 tracking-wide">
              🍽️ YourStopFood
            </h1>
          </Link>

          <Link
            to="/cart"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          >
            Cart
          </Link>
        </div>
      </nav>

      {/* Restaurant Header */}
      <div className="max-w-6xl mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden">
        <img
          onError={handleImageError}
          src={imageUri}
          alt={name}
          className="w-full h-[350px] object-cover"
        />

        <div className="p-6 flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>

          <div className="flex gap-3 items-center text-sm">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full">
              ⭐ {rating}
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">
              {cuisine}
            </span>
          </div>

          <p className="text-gray-600 mt-1">{address}</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto mt-8 px-2 sm:px-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu Items</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menu?.map((item) => (
            <div
              key={item.item_id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-4 p-4">
                {/* Food Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-24 object-cover rounded-lg"
                />

                {/* Content */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="font-bold text-gray-900 mt-1">
                      ₹ {item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      handleClick(item.item_id);
                    }}
                    className="self-start mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State If No Menu */}
        {menu?.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No food items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailas;
