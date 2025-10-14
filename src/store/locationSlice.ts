import { createSlice } from "@reduxjs/toolkit";





const locationSlice =createSlice({
    name:"location",
    initialState:{
        lat:null,
        lon:null
    },
    reducers:{
        setLocation:(state,action) =>{
            state.lat = action.payload.lat
            state.lon = action.payload.lon
        }
    }
})





export const {setLocation} = locationSlice.actions
export default locationSlice.reducer