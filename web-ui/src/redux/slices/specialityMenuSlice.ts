import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Speciality {
  speciality: string;
  image: string;
  price:number;
}


interface SpecialityState {
  data: Speciality[];
  loading: boolean;
  error: string | null;
}


const initialState: SpecialityState = {
  data: [],
  loading: false,
  error: null,
};


export const fetchSpecialities = createAsyncThunk<Speciality[], void, { rejectValue: string }>(
  "specialities/fetchSpecialities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/specialityData"); 
      return response.data;
    } catch (error: any) { 
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
    }
  }
);

const specialitySlice = createSlice({
  name: "specialities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialities.fulfilled, (state, action: PayloadAction<Speciality[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "An unknown error occurred";
      });
  },
});

export default specialitySlice.reducer;
