import { createSlice } from "@reduxjs/toolkit";


const doctorAvailabilitySlice = createSlice({
    name: "doctorAvailability",
    initialState : false , 
    reducers  : {
        setDoctorAvailability: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
    }
})

export const { setDoctorAvailability } = doctorAvailabilitySlice.actions;
export default doctorAvailabilitySlice.reducer;