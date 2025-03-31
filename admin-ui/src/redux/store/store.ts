import { configureStore } from "@reduxjs/toolkit";
import doctorsListReducer from "../slices/doctorListSlice";
import patientReducer from "../slices/patientSlice";
import specializationReducer from "../slices/specializationSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsListReducer,
    patients : patientReducer,
    specialization: specializationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
