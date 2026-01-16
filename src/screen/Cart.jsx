import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemsInCart, deleteItemsInCart } from "../Store/app";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.app.cartData);

  const totalAmount =
   cartData?.reduce((acc, rest) => {
    const resTotal = rest.menuItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return acc + resTotal;
  }, 0);

  function handleAddItem(resId, itemId) {
    dispatch(addItemsInCart({ resId: resId, item_id: itemId }));
  }
  function handleDeleteItem(resId, itemId) {
    console.log("handleDeleteItem")
    dispatch(deleteItemsInCart({ resId: resId, item_id: itemId }));
  }
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

          <p className="text-gray-700 font-medium">
            Cart ({cartData?.length || 0})
          </p>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {!cartData || cartData.length === 0 ? (
            <div className="bg-white shadow rounded-xl p-10 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                className="w-32 mx-auto mb-4 opacity-80"
                alt=""
              />
              <h2 className="text-xl font-bold text-gray-700">
                Your Cart is Empty
              </h2>
              <p className="text-gray-500 mt-1">
                Add some delicious food to your cart 😋
              </p>

              <Link
                to="/"
                className="inline-block mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition-all"
              >
                Explore Restaurants
              </Link>
            </div>
          ) : (
            cartData.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white shadow-md rounded-xl overflow-hidden border"
              >
                {/* Restaurant Header */}
                <div className="flex gap-3 p-4 border-b">
                  <img
                    src={restaurant.restaurantDetails.image_url}
                    className="w-20 h-20 object-cover rounded-lg"
                    alt=""
                  />
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {restaurant.restaurantDetails.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {restaurant.restaurantDetails.cuisine}
                    </p>
                    <p className="text-xs text-gray-400">
                      {restaurant.restaurantDetails.address}
                    </p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-4 space-y-4">
                  {restaurant.menuItems.map((item) => (
                    <div
                      key={item.item_id}
                      className="flex justify-between items-center border p-3 rounded-xl"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          className="w-16 h-16 rounded-lg object-cover"
                          alt=""
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {item.description}
                          </p>
                          <p className="font-semibold mt-1">
                            ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity UI - static (design only) */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() => {
                              handleDeleteItem(restaurant.id, item.item_id);
                            }}
                            className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="px-4 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              handleAddItem(restaurant.id, item.item_id);
                            }}
                            className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-bold text-gray-800">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SECTION — SUMMARY */}
        {cartData && cartData.length > 0 && (
          <div className="bg-white shadow-md rounded-xl p-5 h-fit sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
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
              onClick={() => navigate('/payment')}
              className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
