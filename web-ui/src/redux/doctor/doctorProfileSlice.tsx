import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Doctor, Specialization, Degree } from "../../types/doctor/doctor";

interface DoctorProfileState {
  doctor: Doctor | null;
  specializations: Specialization[];
  degrees: Degree[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorProfileState = {
  doctor: null,
  specializations: [],
  degrees: [],
  loading: false,
  error: null,
};

export const fetchSpecializations = createAsyncThunk(
  "doctorProfile/fetchSpecializations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Specialization[]>(
        "/api/specializations"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch specializations"
      );
    }
  }
);

export const fetchDegrees = createAsyncThunk(
  "doctorProfile/fetchDegrees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Degree[]>("/api/degrees");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch degrees"
      );
    }
  }
);

export const updateDoctorProfile = createAsyncThunk(
  "doctorProfile/updateDoctorProfile",
  async (profileData: Partial<Doctor>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { signInDoctor: { user: Doctor } };
      const doctorId = state.signInDoctor.user?.id;
      if (!doctorId) {
        throw new Error("Doctor ID not found");
      }
      const response = await axios.put<Doctor>(
        `/api/doctors/${doctorId}`,
        profileData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

const doctorProfileSlice = createSlice({
  name: "doctorProfile",
  initialState,
  reducers: {
    setDoctorProfile: (state, action: PayloadAction<Doctor>) => {
      state.doctor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Specializations
      .addCase(fetchSpecializations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.loading = false;
        state.specializations = action.payload;
      })
      .addCase(fetchSpecializations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Degrees
      .addCase(fetchDegrees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDegrees.fulfilled, (state, action) => {
        state.loading = false;
        state.degrees = action.payload;
      })
      .addCase(fetchDegrees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Profile
      .addCase(updateDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.doctor) {
          state.doctor = { ...state.doctor, ...action.payload };
        }
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setDoctorProfile } = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;
