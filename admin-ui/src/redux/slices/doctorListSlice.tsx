import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Doctor {
  id: number;
  name: string;
  email: string;
  qualification: string;
  experience: string;
  age: number;
  phone: string;
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

const doctorsListSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    handleSearchDoctors: (state, action) => {
      state.searchDoctors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { handleSearchDoctors } = doctorsListSlice.actions;
export default doctorsListSlice.reducer;
