import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ChartData {
  name: string;
  count: number;
  data:any[]
}

interface PatientState {
  patientsChartData: ChartData[];
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  patientsChartData: [],
  loading: false,
  error: null,
};

export const fetchPatientsChartData = createAsyncThunk("patients/fetchChartData", async () => {
  const response = await axios.get<ChartData[]>("https://7ca3-203-192-220-137.ngrok-free.app/api/v1/patient/patient-register-stats",
    {
      withCredentials: true
    }
  );
  // console.log(response.data);
  return response.data;
});

const patientsChartSlice = createSlice({
  name: "patientsChartData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     builder
          .addCase(fetchPatientsChartData.pending, (state: any) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchPatientsChartData.fulfilled, (state: any, action: any) => {
            state.loading = false;
            state.patientsChartData = action.payload;
          })
          .addCase(fetchPatientsChartData.rejected, (state: any, action: any) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
          })
  }
});

export default patientsChartSlice.reducer;
