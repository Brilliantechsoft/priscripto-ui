import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL,PUT_SPECIALIZATION_ENDPOINT} from "../../pages/apiEndPoint";

interface SpecializationState {
  specializations: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SpecializationState = {
  specializations: [],
  loading: false,
  error: null,
};

export const addSpecialization = createAsyncThunk(
  "specialization/addSpecialization",
  async (specialization: string, { rejectWithValue }) => {
    const apiurl = BASE_URL + PUT_SPECIALIZATION_ENDPOINT;
    try {
      const requestBody = { specializationName: specialization }; // Ensure correct key
      const response = await axios.post(
        apiurl,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      return response.data.specializationName;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add specialization"
      );
    }
  }
);

const specializationSlice = createSlice({
  name: "specialization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSpecialization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSpecialization.fulfilled, (state, action) => {
        state.loading = false;
        state.specializations.push(action.payload);
      })
      .addCase(addSpecialization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default specializationSlice.reducer;
