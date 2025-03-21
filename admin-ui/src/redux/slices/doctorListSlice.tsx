import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Doctor {
  id: number;
  name: string;
  email: string;
  qualification: string;
  experience: string;
  age: string;
  phone: string;
  specialization: string;
  city: string;
  address: string;
}

interface DoctorsState {
  doctors: Doctor[];
  searchDoctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorsState = {
  doctors: [],
  searchDoctors: [],
  loading: false,
  error: null,
};

export const fetchDoctors = createAsyncThunk("doctors", async () => {
  const response = await axios.get<Doctor[]>("http://localhost:5000/doctors");
  return response.data;
});

export const addDoctor = createAsyncThunk(
  "doctors/add",
  async (doctor: Omit<Doctor, "id">) => {
    const response = await axios.post<Doctor>(
      "http://localhost:5000/doctors",
      doctor
    );
    return response.data;
  }
);

const doctorsListSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    handleSearchDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.searchDoctors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(
        addDoctor.fulfilled,
        (state: any, action: PayloadAction<Doctor>) => {
          state.doctors.push(action.payload);
        }
      );
  },
});

export const { handleSearchDoctors } = doctorsListSlice.actions;
export default doctorsListSlice.reducer;
