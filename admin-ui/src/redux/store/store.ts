import { configureStore } from "@reduxjs/toolkit";
import doctorsListReducer from "../slices/doctorListSlice";
import specializationReducer from "../slices/specializationSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsListReducer,
    specialization: specializationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
