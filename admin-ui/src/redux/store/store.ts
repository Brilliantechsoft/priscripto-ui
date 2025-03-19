import { configureStore } from '@reduxjs/toolkit'
import  doctorsListReducer   from '../../redux/slices/doctorListSlice';

export const store = configureStore({
  reducer: {   

     doctors: doctorsListReducer, 
    
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch