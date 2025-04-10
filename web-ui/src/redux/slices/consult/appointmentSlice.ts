import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Slot } from "../../../types/appointmentTypes";

export interface DoctorState {
  slots: Slot[][];
  status: "idle" | "loading" | "suceeded" | "failed";
  error?: string | null;
  bookingStatus: "idle" | "loading" | "suceeded" | "failed";
  bookingError: string | null;
}

const initialState: DoctorState = {
  slots: [],
  status: "idle",
  bookingStatus: "idle",
  bookingError: null,
};

export const fetchDoctorSlots = createAsyncThunk(
  "doctor/fetchSlots",
  async (docId: string) => {
    const response = await axios.get(`http://localhost:5004/time_slots`);
    return response.data;
  }
);

export const bookAppointment = createAsyncThunk(
  "appointment/bookAppointment",
  async (
    appointmentData: {
      doctor_id: string;
      patient_id: string;
      appointment_time: string;
      reason: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5008/appointment_details",
        appointmentData
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Booking failed");
    }
  }
);

const appointmentSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorSlots.fulfilled, (state, action) => {
        state.slots = action.payload;
      })
      .addCase(bookAppointment.pending, (state) => {
        state.bookingStatus = "loading";
        state.bookingError = null;
      })
      .addCase(bookAppointment.fulfilled, (state) => {
        state.bookingStatus = "suceeded";
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.bookingStatus = "failed";
        state.bookingError = action.payload as string;
      });
  },
});

export default appointmentSlice.reducer;
