import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,  
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.success = true;
      state.isLoading = false;
      state.products = action.payload;
      // state.user=action.payload;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    
    //Reducers for Getting all products
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      // state.user=action.payload;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    
    


    //Reducers for Getting all products
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      // state.user=action.payload;
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


    //Reducers for Getting all products
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      // state.user=action.payload;
    })
    .addCase("getAllProductsFailed", (state, action) => {
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


