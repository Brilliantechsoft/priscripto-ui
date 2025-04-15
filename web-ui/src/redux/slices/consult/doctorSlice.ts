import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  profileImage: string;
  clinicAddress: string;
  fees: number;
  degree: string;
  experience: string;
  about: string;
}

interface DoctorState {
  allDoctors: Doctor[];
  filteredDoctors: Doctor[];
  availabilityMap: Record<number, boolean>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DoctorState = {
  allDoctors: [],
  filteredDoctors: [],
  availabilityMap: {},
  status: "idle",
  error: null,
};

// Async thunk to fetch doctors
export const fetchDoctors = createAsyncThunk<Doctor[], string | undefined>(
  "doctors/fetchDoctors",
  async (speciality, { dispatch }) => {
    const response = await axios.get("http://localhost:5002/Doctors_spl");
    const allDoctors = response.data;

    if (speciality) {
      const filtered = allDoctors.filter(
        (doc: Doctor) =>
          doc.specialization.toLowerCase() === speciality.toLowerCase()
      );
      return filtered;
    }
    return allDoctors;
  }
);

export const fetchDoctorAvailability = createAsyncThunk<
  { doctorId: number; available: boolean }[]
>("doctors/fetchDoctorAvailability", async () => {
  const response = await axios.get("http://localhost:5006/availability");
  return response.data;
});

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    filterDoctors: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        const specialization = action.payload.toLowerCase();
        state.filteredDoctors = state.allDoctors.filter(
          (doc) => doc.specialization.toLowerCase() === specialization
        );
      } else {
        state.filteredDoctors = state.allDoctors;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDoctors = action.payload;
        state.filteredDoctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchDoctorAvailability.fulfilled, (state, action) => {
        const availability = action.payload;
        state.availabilityMap = {};
        availability.forEach(({ doctorId, available }) => {
          state.availabilityMap[doctorId] = available;
        });
      });
  },
});

export const { filterDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
