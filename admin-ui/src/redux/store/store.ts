import { configureStore } from "@reduxjs/toolkit";
import doctorsListReducer from "../slices/doctorListSlice";
import patientReducer from "../slices/patientSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsListReducer,
    patients : patientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
