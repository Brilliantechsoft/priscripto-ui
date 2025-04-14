import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/auth/authSlice';
import registerDoctorReducer from "../redux/slices/doctor/registerDoctorSlice"
import signInDoctorReducer from "../redux/slices/doctor/loginDoctorSlice"
import doctorProfileReducer from "../redux/slices/doctor/doctorProfileSlice"
import doctorAppointmentReducer from '../redux/slices/appointment/doctorAppointmentSlice';
import doctorAppointmentRequestReducer from '../redux/slices/appointment/drAppointmentRequestSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registerDoctor: registerDoctorReducer,
    signInDoctor: signInDoctorReducer,
    doctorProfile : doctorProfileReducer,
    doctorAppointment: doctorAppointmentReducer,
    doctorAppointmentRequest: doctorAppointmentRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;