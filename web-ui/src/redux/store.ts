import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/auth/authSlice";
import registerDoctorReducer from "../redux/slices/doctor/registerDoctorSlice";
import signInDoctorReducer from "../redux/slices/doctor/loginDoctorSlice";
import doctorEducationReducer from "./slices/doctor/doctorEducationSlice";
import doctorProfileReducer from "./slices/doctor/doctorProfileSlice";
import doctorAppointmentReducer from '../redux/slices/appointment/doctorAppointmentSlice';
import doctorAppointmentRequestReducer from '../redux/slices/appointment/drAppointmentRequestSlice';
import specialityReducer from "../redux/slices/consult/specialityMenuSlice";
import doctorReducer from "../redux/slices/consult/doctorSlice";
import appointmentReducer from "../redux/slices/consult/appointmentSlice";
import appointmentFormReducer from "../redux/slices/consult/appointmentFormSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registerDoctor: registerDoctorReducer,
    signInDoctor: signInDoctorReducer,
    doctorProfile: doctorProfileReducer,
    doctorEducation: doctorEducationReducer,
    doctorAppointment: doctorAppointmentReducer,
    doctorAppointmentRequest: doctorAppointmentRequestReducer,
    specialities:specialityReducer,
    doctors: doctorReducer,
    doctor: appointmentReducer,
    appointmentForm: appointmentFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
