import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
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

    .addCase("UpdateUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("UpdateUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      // state.user=action.payload;
      state.user = action.payload;
    })
    .addCase("UpdateUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })


    .addCase("updateUserAddressRequest", (state) => {
      state.updating = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.updating = false;
      state.successMessage=action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFailed", (state, action) => {
      state.updating = false;
      state.error = action.payload;
    })


    .addCase("deleteUserAddressRequest", (state) => {
      state.updating = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.updating = false;
      state.successMessage=action.payload;
    })
    .addCase("deleteUserAddressFailed", (state, action) => {
      state.updating = false;
      state.error = action.payload;
    })
    

    .addCase("getAllUsersRequest", (state) => {
      state.updating = true;
    })
    .addCase("getAllUsersSuccess", (state, action) => {
      state.updating = false;
      state.users=action.payload;
    })
    .addCase("getAllUsersFailed", (state, action) => {
      state.updating = false;
      state.error = action.payload;
    })

    
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
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
