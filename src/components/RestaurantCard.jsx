import React, { useState } from "react";
import { Link } from "react-router-dom";

export const dummyImage = [
  "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
  "https://images.unsplash.com/photo-1543353071-087092ec393f?w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1584931423298-c576fda54bd1?w=800",
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
];

const RestaurantCard = ({ data }) => {
  const { id, name, rating, cuisine, address, image_url } = data || {};
  const [image, setImage] = useState(image_url);

  function handleError() {
    const idx = Math.floor(Math.random() * (dummyImage.length - 1));
    setImage(dummyImage[idx]);
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200">
      {/* Restaurant Image */}
      <div className="relative h-48 w-full">
        <img
          onError={handleError}
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full">
          {cuisine}
        </span>
        <span className="absolute bottom-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          ⭐ {rating}
        </span>
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
        <p className="text-sm text-gray-600 leading-tight line-clamp-2">
          {address}
        </p>
        <Link to={`/restaurant/${id}`}>
          <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-lg transition-all duration-300">
            View Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
