import { configureStore } from "@reduxjs/toolkit";
import registerDoctorReducer from "./doctor/registerDoctorSlice";
import signInDoctorReducer from "./doctor/loginDoctorSlice";
import doctorProfileReducer from "../redux/doctor/doctorProfileSlice";

const store = configureStore({
  reducer: {
    registerDoctor: registerDoctorReducer,
    signInDoctor: signInDoctorReducer,
    doctorProfile: doctorProfileReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //         serializableCheck:false,
  //     })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
