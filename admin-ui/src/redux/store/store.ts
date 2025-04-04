import { configureStore } from "@reduxjs/toolkit";
import doctorsListReducer from "../slices/doctorListSlice";
import patientReducer from "../slices/patientSlice";
import specializationReducer from "../slices/specializationSlice";
import chartDataReducer from "../slices/dashboardSlice"

export const store = configureStore({
  reducer: {
    doctors: doctorsListReducer,
    patients : patientReducer,
    specialization: specializationReducer,
    doctorsChartData:chartDataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
