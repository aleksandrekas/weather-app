import { createSlice } from "@reduxjs/toolkit";





const locationSlice =createSlice({
    name:"location",
    initialState:{
        lat:null,
        lon:null,
        name:""
    },
    reducers:{
        setLocation:(state,action) =>{
            state.lat = action.payload.lat
            state.lon = action.payload.lon
            state.name = action.payload.name
        }
    }
})





export const {setLocation} = locationSlice.actions
export default locationSlice.reducer