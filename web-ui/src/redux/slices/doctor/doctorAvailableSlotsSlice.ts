import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

interface Slot {
  time: string;
}

interface DayAvailability {
  day: Day;
  slots: string[];
}


interface AvailabilityState {
  days: Day[];
  slots: Record<Day, Slot[]>;
  appointmentFee: number;
  loading: boolean;
  error: string | null;
}

const initialState: AvailabilityState = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  slots: {
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
      const { slots, appointmentFee, days } = state.doctorAvailableSlots;

    const availabilityPayload: DayAvailability[] = days.map((day) => ({
        day,
        slots: slots[day].map((slot) => slot.time),
    }));
      
      const response = await axios.post(
        "your-api-endpoint/availability",
        {
           availability: availabilityPayload,
          appointmentFee,
        },
        {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Failed to save availability");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const doctorAvailableSlotsSlice = createSlice({
  name: "doctorAvailableSlots",
  initialState,
  reducers: {
    addSlots: (state, action: PayloadAction<{ day: Day; slots: Slot[] }>) => {
      const { day, slots } = action.payload;
      state.slots[day] = [...state.slots[day], ...slots];
    },
    clearSlots: (state, action: PayloadAction<Day>) => {
      state.slots[action.payload] = [];
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

export const { addSlots, clearSlots, setAppointmentFee, resetAvailability } = doctorAvailableSlotsSlice.actions;
export default doctorAvailableSlotsSlice.reducer;