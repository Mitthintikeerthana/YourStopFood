import React from "react";
import Home from "./screen/Home";
import RestaurantDetailas from "./screen/RestaurantDetailas";
import Cart from "./screen/Cart";
import Payment from "./screen/Payment";
import Tracking from "./screen/Tracking";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantDetailas />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
  );
};

export default App;
