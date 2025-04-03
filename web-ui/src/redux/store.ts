import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registerDoctorReducer from "./doctor/registerDoctorSlice";
import signInDoctorReducer from "./doctor/loginDoctorSlice";
import doctorProfileReducer from "../redux/doctor/doctorProfileSlice";
 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signInDoctor', 'doctorProfile']
};

const rootReducer = combineReducers({
  registerDoctor: registerDoctorReducer,
  signInDoctor: persistReducer(persistConfig, signInDoctorReducer),
  doctorProfile: persistReducer(persistConfig, doctorProfileReducer)
})

const store = configureStore({
  // reducer: {
  //   registerDoctor: registerDoctorReducer,
  //   signInDoctor: signInDoctorReducer,
  //   doctorProfile: doctorProfileReducer,
  // },
  reducer: rootReducer,
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
