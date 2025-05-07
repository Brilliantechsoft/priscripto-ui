import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ChartData {
  name: string;
  count: number;
  data:any[]
}

interface DoctorsState {
  doctorsChartData: ChartData[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorsState = {
  doctorsChartData: [],
  loading: false,
  error: null,
};

export const fetchDoctorsChartData = createAsyncThunk("doctors/fetchChartData", async () => {
  const response = await axios.get<ChartData[]>("https://80f7-203-192-220-137.ngrok-free.app/api/v1/doctors/doctor-register-stats",
    {
      withCredentials: true
    }
  );
  // console.log(response.data);
  return response.data;
});

const doctorsChartSlice = createSlice({
  name: "doctorsChartData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     builder
          .addCase(fetchDoctorsChartData.pending, (state: any) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchDoctorsChartData.fulfilled, (state: any, action: any) => {
            state.loading = false;
            state.doctorsChartData = action.payload;
          })
          .addCase(fetchDoctorsChartData.rejected, (state: any, action: any) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
          })
  }
});

export default doctorsChartSlice.reducer;
