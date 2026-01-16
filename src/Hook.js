import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurantData } from "./Store/app";

export function useGetResaturantData() {
  const dispatch = useDispatch();
  const restaurantData = useSelector((state) => state.app.restaurantData);
  async function getData() {
    console.log("api called");
    let apiData = await fetch(
      "https://mocki.io/v1/b0ed27cf-5681-4804-beaa-f5bb7044a3e6"
    );
    let jsonData = await apiData.json();
    dispatch(setRestaurantData(jsonData.restaurants));
  }

  useEffect(() => {
    if (restaurantData.length !== 0) return;
    getData();
  }, [restaurantData]);
}
