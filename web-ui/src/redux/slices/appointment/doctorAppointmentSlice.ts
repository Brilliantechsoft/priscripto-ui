import { createSlice } from "@reduxjs/toolkit";
import { Appointment } from "../../../types/appointment/appointment";
const appointmentSlice = createSlice({
    name: "doctorAppointment",
    initialState: [] as Appointment[],
    reducers: {
        setAppointment: (state, action) => {
        return action.payload;
        },
    },
})


export const { setAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;