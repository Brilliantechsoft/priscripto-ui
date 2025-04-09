import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/auth/authSlice';
import registerDoctorReducer from "../redux/slices/doctor/registerDoctorSlice"
import signInDoctorReducer from "../redux/slices/doctor/loginDoctorSlice"
import doctorProfileReducer from "../redux/slices/doctor/doctorProfileSlice"
import specialityReducer from "../redux/slices/consult/specialityMenuSlice";
import doctorReducer from "../redux/slices/consult/doctorSlice";
import appointmentReducer from "../redux/slices/consult/appointmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registerDoctor: registerDoctorReducer,
    signInDoctor: signInDoctorReducer,
    doctorProfile : doctorProfileReducer, 
    specialities:specialityReducer,
    doctors: doctorReducer,
    doctor: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;