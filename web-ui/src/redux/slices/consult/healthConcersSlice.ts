import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface HealthConcern{
  HealthConcernId: number;
  HealthConcernName: string;
  Fees:number;
}

interface HealthConcernState {
  data:HealthConcern[];
  loading: boolean;
  error: string | null;
}

const initialState: HealthConcernState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchHealthConcerns = createAsyncThunk<
HealthConcern[],
  void,
  { rejectValue: string }
>("HealthConcerns/fetchHealthConcerns", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      "http://localhost:5008/HealthConcern"
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch data"
    );
  }
});

const HealthConcernSlice = createSlice({
  name: "HealthConcern",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealthConcerns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHealthConcerns.fulfilled,
        (state, action: PayloadAction<HealthConcern[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchHealthConcerns.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An unknown error occurred";
      });
  },
});

export default HealthConcernSlice.reducer;
