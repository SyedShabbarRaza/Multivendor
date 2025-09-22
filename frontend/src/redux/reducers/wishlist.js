import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
    //Parse = Parho
    //stringify = Likho
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder.addCase("addTowishlist", (state,action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find((i) => i._id === item._id);//Kya wo product pehly sy wishlist mein mojood hai?

    if (isItemExist) {
      return {
        ...state,//state ki 1 copy bnao or us mein , ky baad wali cheez change kr do
        wishlist: state.wishlist.map((i) => (i._id === isItemExist._id ? item : i)),//Aggar isi _id wali pehly sy mojood hai phir update kr do (May be quantity barh jaye)
      };
    } else {//Or aggar pehly sy wishlist mein nahi hai to zahir hai add krni hi krni hai
      return {
        ...state,//state ki 1 copy bnai or commy ky baad (wishlist) mein chage kr ky is mein add kr diya
        wishlist: [...state.wishlist, item],//Ab wishlist ko bhi directly change nahi kr sakty pehly copy bnayein gy 
      };
    }
  });


  builder.addCase("removeFromwishlist",(state,action)=>{
    return {
      ...state,
      wishlist: state.wishlist.filter((i) => i._id !== action.payload), //Jo Jo us id ky equal nahi sab wapis add kr do bas jo match kr gaye usy ab wishlist mein add nahi krna (automatically deleted)
    };
})
});