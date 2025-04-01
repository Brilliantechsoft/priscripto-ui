import { configureStore } from "@reduxjs/toolkit";
import registerDoctorReducer from './doctor/registerDoctorSlice';
import signInDoctorReducer from './doctor/loginDoctorSlice'


const store = configureStore({
    reducer: {
        registerDoctor: registerDoctorReducer,
        signInDoctor : signInDoctorReducer,
    },
    // middleware: (getDefaultMiddleware) => 
    //     getDefaultMiddleware({
    //         serializableCheck:false,
    //     })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;