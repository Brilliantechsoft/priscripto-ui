import { createSlice } from "@reduxjs/toolkit";
import { AppointmentRequest } from "../../../types/appointment/appointmentRequest";

const appointmentRequestSlice = createSlice({
    name: "doctorAppointmentRequest",
    initialState: [] as AppointmentRequest[],
    reducers: {
        setAppointmentRequest: (state, action) => {
            return action.payload;
        },
        deleteAppointmentRequest: (state, action) => {
            return state.filter((request) => request.appointmentId !== action.payload);
        }
    },
})


export const { setAppointmentRequest , deleteAppointmentRequest } = appointmentRequestSlice.actions;
export default appointmentRequestSlice.reducer;