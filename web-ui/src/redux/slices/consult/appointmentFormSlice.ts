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
}

export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (appointmentData: AppointmentPayload ) => {
    const response = await axios.post(
      "https://90ee-203-192-220-137.ngrok-free.app/api/v1/patient/appointments/new-appointment",
      appointmentData
    );
    
    return response.data;
  }
);

const appointmentFormSlice = createSlice({
  name: "appointments",
  initialState: {
    loading: false,
    error: null as string | null,
    appointment: null ,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create appointment";
      });
  },
});

export default appointmentFormSlice.reducer;
