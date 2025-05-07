import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Degree {
  degreeId: number;
  degreeName: string;
  startDate: number[];
  endDate: number[];
  instituteName: string;
}

export interface Specialization {
  specializationId: number;
  specializationName: string;
  services: string;
  fees: number;
}

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization?: Specialization[];
  profileImage: string;
  clinicAddress: string;
  fees: number;
  degree?: Degree[];
  experience: string;
  about: string;
  status: boolean;
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

export const fetchDoctors = createAsyncThunk<Doctor[]>(
  "doctors/fetchDoctors",
  async () => {
    const response = await axios.get(
      "https://e232-203-192-220-137.ngrok-free.app/api/v1/doctors",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const rawData = Array.isArray(response.data)
      ? response.data
      : response.data?.data ?? [];

    return rawData;
  }
);

export const fetchDoctorAvailability = createAsyncThunk<
  Record<number, boolean>
>("doctors/fetchDoctorAvailability", async () => {
  const response = await axios.get(
    "https://e232-203-192-220-137.ngrok-free.app/api/v1/doctors",
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  const rawData = Array.isArray(response.data)
    ? response.data
    : response.data?.data ?? [];

  const availabilityMap: Record<number, boolean> = {};
  rawData.forEach((doc: any) => {
    availabilityMap[doc.id] = doc.status;
  });

  return availabilityMap;
});

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    filterDoctors: (state, action: PayloadAction<string | undefined>) => {
      if (!Array.isArray(state.allDoctors)) return;

      if (action.payload) {
        const specialization = action.payload.toLowerCase();
        state.filteredDoctors = state.allDoctors.filter((doc) =>
          doc.specialization?.some(
            (spec) => spec.specializationName.toLowerCase() === specialization
          )
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
        state.availabilityMap = action.payload;
      });
  },
});

export const { filterDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
