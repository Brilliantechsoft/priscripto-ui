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
    console.log("Fetching slots for docId:", docId);
    const response = await axios.get(
      "https://c4b9-203-192-220-137.ngrok-free.app/api/v1/doctors/" + docId  +"/available-schedules",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Raw API response:", response.data);
    return response.data;
  }
);

const appointmentSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorSlots.pending, (state) => {
        console.log("Fetching slots: pending...");
        state.status = "loading";
      })
      .addCase(fetchDoctorSlots.fulfilled, (state, action) => {
        console.log("Fetched slots:", action.payload);

        const groupedSlots = action.payload.map((item:any) =>
          item.timeSlots.map((slot:any) => ({
            ...slot,
            scheduleDate: new Date(
              item.scheduleDate[0],
              item.scheduleDate[1] - 1,
              item.scheduleDate[2]
            ).toISOString(),
          }))
        );

        console.log("Parsed & grouped slots:", groupedSlots);
        state.slots = groupedSlots;
        state.status = "suceeded";
      })
      .addCase(fetchDoctorSlots.rejected, (state, action) => {
        console.error("Failed to fetch slots:", action.error.message);
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch slots";
      });
  },
});

export default appointmentSlice.reducer;
