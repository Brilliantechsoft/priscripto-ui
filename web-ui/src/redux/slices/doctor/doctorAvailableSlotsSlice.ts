import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface TimeSlot {
  startTime: string;
  endTime: string;
}
interface AvailabilityPayload {
  days: string;
  timeSlots: TimeSlot[];
  appoinmentFees: number;
}

interface AvailabilityState {
  days: Day[];
  availability: Record<Day, TimeSlot[]>;
  appointmentFee: number;
  loading: boolean;
  error: string | null;
}

const initialState: AvailabilityState = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  availability: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
  appointmentFee: 254,
  loading: false,
  error: null,
};

// Async thunk to save availability to backend
export const saveAvailableSlots = createAsyncThunk(
  "doctorAvailableSlots/saveAvailableSlots",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { doctorAvailableSlots: AvailabilityState };
      const { availability, appointmentFee } = state.doctorAvailableSlots;
      const token = localStorage.getItem("jwt");
      // console.log("Token being sent:", token);

      if (!token) {
        throw new Error("No authentication token found");
      }

      // 1.
      const scheduleRequests = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => ({
        days: day.toUpperCase(),
        timeSlots: availability[day as Day].map((slot) => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      }));

      // 2.
      const payload = {
        appointmentFees: appointmentFee,
        scheduleRequests,
      };

      console.log("Final payload:", JSON.stringify(payload, null, 2));

      // const availabilityPayload: DayAvailability[] = days.map((day) => ({
      //     day,
      //     slots: slots[day].map((slot) => slot.time),
      // }));

      console.log("Request payload:", payload);
      console.log("Request URL:", `${API_BASE_URL}/v1/doctors/schedule/create`);

      const response = await axios.post(
        `${API_BASE_URL}/v1/doctors/schedule/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          message: error.message,
          response: error.response,
          request: error.request,
        });
        return rejectWithValue(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to save availability"
        );
      }
      console.error("Unknown error:", error);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const doctorAvailableSlotsSlice = createSlice({
  name: "doctorAvailableSlots",
  initialState,
  reducers: {
    addTimeSlot: (
      state,
      action: PayloadAction<{ day: Day; timeSlot: TimeSlot }>
    ) => {
      const { day, timeSlot } = action.payload;
      state.availability[day].push(timeSlot);
    },
    clearTimeSlots: (state, action: PayloadAction<Day>) => {
      state.availability[action.payload] = [];
    },
    setAppointmentFee: (state, action: PayloadAction<number>) => {
      state.appointmentFee = action.payload;
    },
    resetAvailability: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveAvailableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveAvailableSlots.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addTimeSlot,
  clearTimeSlots,
  setAppointmentFee,
  resetAvailability,
} = doctorAvailableSlotsSlice.actions;

export default doctorAvailableSlotsSlice.reducer;
