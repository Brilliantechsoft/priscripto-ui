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
    const response = await axios.get((
      `https://aec2-203-192-220-137.ngrok-free.app/api/v1/doctors/${docId}/available-schedules`
    ),{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  
    return response.data;
  }
);

// export const bookAppointment = createAsyncThunk(
//   "appointment/bookAppointment",
//   async (
//     appointmentData: {
//       doctor_id: string;
//       patient_id: string;
//       appointment_time: string;
//       reason: string;
//     },
//     thunkAPI
//   ) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5008/appointment_details",
//         appointmentData
//       );
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data || "Booking failed");
//     }
//   }
// );

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
      })

      // .addCase(bookAppointment.pending, (state) => {
      //   state.bookingStatus = "loading";
      //   state.bookingError = null;
      // })
      // .addCase(bookAppointment.fulfilled, (state) => {
      //   state.bookingStatus = "suceeded";
      // })
      // .addCase(bookAppointment.rejected, (state, action) => {
      //   state.bookingStatus = "failed";
      //   state.bookingError = action.payload as string;
      // });
  },
});

export default appointmentSlice.reducer;
