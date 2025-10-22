import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice"
import unitSlice from "../components/Units";




export const store = configureStore({
    reducer:{
        location:locationSlice,
        units:unitSlice
    }
})