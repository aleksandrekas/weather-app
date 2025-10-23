import { configureStore } from "@reduxjs/toolkit"
import locationReducer from "./locationSlice"
import unitReducer from "./unitSlice" 

export const store = configureStore({
  reducer: {
    location: locationReducer,
    unit: unitReducer, 
  },
})