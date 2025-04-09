import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  Slot } from '../../../types/appointmentTypes'


interface DoctorState {

    slots:Slot[][],
    status:'idle' | 'loading' | 'suceeded' | 'failed',
    error?:string | null
}

const initialState : DoctorState = {
 
    slots:[],
    status:'idle',
}



export const fetchDoctorSlots = createAsyncThunk(
    'doctor/fetchSlots',
    async (docId: string) => {
      const response = await axios.get(`http://localhost:5004/time_slots`)
      return response.data
    }
  )
  
  const appointmentSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
     
      
        .addCase(fetchDoctorSlots.fulfilled, (state, action) => {
          state.slots = action.payload
        })
    },
  })
  
  export default appointmentSlice.reducer