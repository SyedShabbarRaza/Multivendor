import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  // user:null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isSeller = true;
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      // state.user=action.payload;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })

    .addCase("getAllSellersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.isLoading = false;
      // state.user=action.payload;
      state.sellers = action.payload;
    })
    .addCase("getAllSellerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});


                //More Understandable

// import {createReducer} from '@reduxjs/toolkit';

// const initialState={
//   isAuthenticated:false,
//   currentUser:null,
//   error:null,
//   loading:null
// }
// export const userReducer=createReducer(initialState,(builder)=>{
//   builder.addCase("loadUser",async(state)=>{
//     state.loading=true;
//   }).builder.addCase("loadUserSuccess",(state,action)=>{
//     state.loading=false;
//     currentUser=action.payload;
//   }).builder.addCase("loadUserFailure",(state,action)=>{
//     state.loading=false;
//     state.error=action.payload
//   }).builder.addCase("clearError",(state)=>{
//     state.error=null;
//   })
// })


