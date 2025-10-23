import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UnitKey = "temperature" | "speed" | "precipitation"

const unitSlice = createSlice({
    name:"unit",
    initialState:{
        temperature:"celcius",
        speed:"kmh",
        precipitation:"mm"
    },
    reducers:{
        changeunit:(state,action:PayloadAction<{unit:UnitKey;value:string}>)=>{
            state[action.payload.unit] = action.payload.value
        }
    }
})



export const {changeunit} = unitSlice.actions
export default unitSlice.reducer