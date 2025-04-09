import { configureStore } from "@reduxjs/toolkit";
import specialityReducer from "../slices/specialityMenuSlice";
import doctorReducer from "../slices/doctorSlice";
import appointmentReducer from "../slices/appointmentSlice";


export const store = configureStore({
  reducer: {
   specialities:specialityReducer,
   doctors: doctorReducer,
   doctor: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
