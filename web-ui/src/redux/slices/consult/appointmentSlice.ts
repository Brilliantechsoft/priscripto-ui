import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Slot } from "../../../types/appointmentTypes";

export interface DoctorState {
  slots: Slot[][];
  status: "idle" | "loading" | "suceeded" | "failed";
  error?: string | null;
  bookingError: string | null;
}

const initialState: DoctorState = {
  slots: [],
  status: "idle",
  bookingError: null,
};

export const fetchDoctorSlots = createAsyncThunk(
  "doctor/fetchSlots",
  async (docId: string) => {
    const response = await axios.get(
      `https://aec2-203-192-220-137.ngrok-free.app/api/v1/doctors/${docId}/available-schedules`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  }
);

const appointmentSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorSlots.fulfilled, (state, action) => {
        const groupedSlots = action.payload.map((item: any) =>
          item.timeSlots.map((slot: any) => ({
            ...slot,
            scheduleDate: new Date(
              item.scheduleDate[0],
              item.scheduleDate[1] - 1,
              item.scheduleDate[2]
            ).toISOString(),
          }))
        );

        state.slots = groupedSlots;
      })
      .addCase(fetchDoctorSlots.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctorSlots.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch slots";
      });
  },
});

export default appointmentSlice.reducer;
