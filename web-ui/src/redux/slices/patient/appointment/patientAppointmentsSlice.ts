import { createSlice } from "@reduxjs/toolkit";

export interface AppointmentPatient {
    appointmentId: number;
    doctorFirstName: string;
    doctorLastName: string;
    doctorEmail: string;
    doctorPhoneNumber: string;
    status: 'UPCOMING' | 'CANCELLED' | 'COMPLETED';
    scheduleDate: string;
    startTime: number;
    appointmentType:string
    purpose:string
  }

const patientAppointmentsSlice = createSlice({
    name: "patientAppointments",
    initialState:[] as AppointmentPatient[],
    reducers: {
        storeAppointments: (state, action) =>{
            return action.payload
        }
    }
})

export const { storeAppointments } = patientAppointmentsSlice.actions;
export default patientAppointmentsSlice.reducer;