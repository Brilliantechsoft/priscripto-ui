import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AppointmentPayload {
  appointmentStatus: string;
  appointmentType: string;
  doctorId: number;
  patientId: number;
  timeSlotId: number;
  prescriptions: string;
  purpose: string;
  appointmentDate: string;
}

interface AppointmentState {
  loading: boolean;
  error: string | null;
  success: boolean;
  appointment: any | null; 
}

const initialState:AppointmentState = {
  loading: false,
  error: null,
  success: false,
  appointment: null,
};

export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (appointmentData: AppointmentPayload ) => {
    const response = await axios.post(
      "https://b3c8-203-192-220-137.ngrok-free.app/api/v1/patient/appointments/new-appointment",
      appointmentData
    );
    
    return response.data;
  }
);

const appointmentFormSlice = createSlice({
  name: "appointments",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
        state.success = true;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create appointment";
        state.success = false;
      });
  },
});

export default appointmentFormSlice.reducer;