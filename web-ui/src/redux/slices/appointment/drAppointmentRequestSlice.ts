import { createSlice } from "@reduxjs/toolkit";
import { AppointmentRequest } from "../../../types/appointment/appointmentRequest";

const appointmentRequestSlice = createSlice({
    name: "doctorAppointmentRequest",
    initialState: [] as AppointmentRequest[],
    reducers: {
        setAppointmentRequest: (state, action) => {
            return action.payload;
        },
    },
})


export const { setAppointmentRequest } = appointmentRequestSlice.actions;
export default appointmentRequestSlice.reducer;