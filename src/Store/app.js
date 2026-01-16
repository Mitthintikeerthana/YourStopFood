import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantData: [],
  cartData: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRestaurantData: (state, action) => {
      state.restaurantData = action.payload;
    },
    addItemsInCart: (state, action) => {
      const { resId, item_id } = action.payload;

      const resInCart = state.cartData.find((obj) => obj.id == resId);

      if (!resInCart) {
        // then we have to add the resaturant as well ass the item
        const restaurantData = state.restaurantData.find(
          (data) => data.id === resId
        );
        const itemData = restaurantData.menu.find(
          (data) => data.item_id === item_id
        );
        state.cartData.push({
          id: resId,
          restaurantDetails: {
            name: restaurantData.name,
            cuisine: restaurantData.cuisine,
            address: restaurantData.address,
            image_url: restaurantData.image_url,
          },
          menuItems: [{ ...itemData, quantity: 1 }],
        });
      } else {
        const itemExist = resInCart.menuItems.find(
          (data) => data.item_id === item_id
        );

        if (itemExist) {
          itemExist.quantity += 1;
        } else {
          const restaurantData = state.restaurantData.find(
            (data) => data.id === resId
          );
          const itemData = restaurantData.menu.find(
            (data) => data.item_id === item_id
          );
          resInCart.menuItems.push({ ...itemData, quantity: 1 });
        }
      }
    },
    deleteItemsInCart: (state, action) => {
      console.log("handleDeleteItem");
      const { resId, item_id } = action.payload;
      const resDataIncartIndex = state.cartData.findIndex(
        (obj) => obj.id === resId
      );
      const resDataIncart = state.cartData[resDataIncartIndex];
      const itemIndex = resDataIncart.menuItems.findIndex(
        (obj) => obj.item_id === item_id
      );

      if (resDataIncart.menuItems[itemIndex].quantity == 1) {
        state.cartData[resDataIncartIndex].menuItems.splice(itemIndex, 1);
      } else {
        state.cartData[resDataIncartIndex].menuItems[itemIndex].quantity -= 1;
      }
    },
  },
});

export const { setRestaurantData, addItemsInCart, deleteItemsInCart } =
  appSlice.actions;

export default appSlice.reducer;
// [
//     {
//       id: "",
//       restaurantDetails: {
//         name: "",
//         cuisine: "",
//         address: "669 Main St, Food District",
//         image_url:
//           "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
//       },
//       menuItems: [
//         {
//          quantity : 1,
//           item_id: "res_001_m01",
//           name: "Italian Signature Plate",
//           price: 35.18,
//           description:
//             "A delicious Italian Signature Plate made with fresh, locally sourced ingredients.",
//           image: "https://picsum.photos/seed/res_001_m01/400/300",
//         },
//       ],
//     },
//   ]
