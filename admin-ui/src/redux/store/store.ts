import { configureStore } from "@reduxjs/toolkit";
import doctorsListReducer from "../slices/doctorListSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsListReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
