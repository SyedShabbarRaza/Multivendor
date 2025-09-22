import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,  
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.success = true;
      state.isLoading = false;
      state.events = action.payload;
      // state.user=action.payload;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    
    //Reducers for Getting all events of a shop
    .addCase("getAllEventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsShopSuccess", (state, action) => {
      state.success = true;
      state.isLoading = false;
      state.events = action.payload;
      // state.user=action.payload;
    })
    .addCase("getAllEventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    
    
        //Reducers for deleting all events
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.success = true;
      state.isLoading = false;
      state.message = action.payload;
      // state.user=action.payload;
    })
    .addCase("deleteEventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })


    //Reducers for Getting all events
    .addCase("getAllEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
      // state.user=action.payload;
    })
    .addCase("getAllEventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // //Reducers for Getting all events
    // .addCase("deleteeventRequest", (state) => {
    //   state.isLoading = true;
    // })
    // .addCase("deleteeventSuccess", (state, action) => {
    //   state.success = true;
    //   state.isLoading = false;
    //   state.message = action.payload;
    //   // state.user=action.payload;
    // })
    // .addCase("deleteeventFailed", (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    //   state.success = false;
    // })
    


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


