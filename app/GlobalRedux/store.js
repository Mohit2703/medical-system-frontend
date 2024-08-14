"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Features/auth/authSlice";
import navSlice from "./Features/navigation/navSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    nav: navSlice
})

export const store = configureStore({
    reducer: rootReducer
})