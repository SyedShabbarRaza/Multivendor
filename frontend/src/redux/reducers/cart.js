import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  //Parse = Parho
  //stringify = Likho
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase("addTocart", (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => i._id === item._id); //Kya wo product pehly sy cart mein mojood hai?

    if (isItemExist) {
      return {
        ...state, //state ki 1 copy bnao or us mein , ky baad wali cheez change kr do
        cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)), //Aggar isi _id wali pehly sy mojood hai phir update kr do (May be quantity barh jaye)
      };
    } else {
      //Or aggar pehly sy cart mein nahi hai to zahir hai add krni hi krni hai
      return {
        ...state, //state ki 1 copy bnai or commy ky baad (cart) mein chage kr ky is mein add kr diya
        cart: [...state.cart, item], //Ab cart ko bhi directly change nahi kr sakty pehly copy bnayein gy
      };
    }
  });

  builder.addCase("removeFromcart", (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i) => i._id !== action.payload), //Jo Jo us id ky equal nahi sab wapis add kr do bas jo match kr gaye usy ab cart mein add nahi krna (automatically deleted)
    };
  });
});
