import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading:true,
  // user:null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      // state.user=action.payload;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
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


