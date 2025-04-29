import { createSlice } from "@reduxjs/toolkit";

export interface Appointment {
    appointmentId: number;
    doctorFirstName: string;
    doctorLastName: string;
    doctorEmail: string;
    doctorPhoneNumber: string;
    appointmentStatus: 'UPCOMING' | 'CANCELLED' | 'COMPLETED';
    formattedScheduleDate: string;
    formattedStartTime: number;
  }

const patientAppointmentsSlice = createSlice({
    name: "patientAppointments",
    initialState:[] as Appointment[],
    reducers: {
        storeAppointments: (state, action) =>{
            console.log(state);
            return action.payload
        }
    }
})

export const { storeAppointments } = patientAppointmentsSlice.actions;
export default patientAppointmentsSlice.reducer;