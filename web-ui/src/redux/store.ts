import { configureStore } from "@reduxjs/toolkit";
{/*Auth slices*/}
import registerDoctorReducer from "../redux/slices/doctor/registerDoctorSlice";
import signInDoctorReducer from "../redux/slices/doctor/loginDoctorSlice";
import registerPatientReducer from "../redux/slices/patient/registerPatientSlice"
import signInPatientReducer from "../redux/slices/patient/loginPatientSlice"

import doctorEducationReducer from "./slices/doctor/doctorEducationSlice";
import doctorProfileReducer from "./slices/doctor/doctorProfileSlice";
import doctorAppointmentReducer from '../redux/slices/appointment/doctorAppointmentSlice';
import doctorAppointmentRequestReducer from '../redux/slices/appointment/drAppointmentRequestSlice';
import specialityReducer from "../redux/slices/consult/specialityMenuSlice";
import doctorReducer from "../redux/slices/consult/doctorSlice";
import appointmentReducer from "../redux/slices/consult/appointmentSlice";

export const store = configureStore({
  reducer: {
    registerDoctor: registerDoctorReducer,
    signInDoctor: signInDoctorReducer,
    registerPatient: registerPatientReducer,
    signInPatient: signInPatientReducer,
    
    doctorProfile: doctorProfileReducer,
    doctorEducation: doctorEducationReducer,
    doctorAppointment: doctorAppointmentReducer,
    doctorAppointmentRequest: doctorAppointmentRequestReducer,
    specialities:specialityReducer,
    doctors: doctorReducer,
    doctor: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
