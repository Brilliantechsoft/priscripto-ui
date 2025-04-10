import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Doctor, Specialization, Degree } from "../../../types//doctor/doctor";
import { RootState } from "../../../redux/store";

interface DoctorProfileState {
  doctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorProfileState = {
  doctor: null,
  loading: false,
  error: null,
};

// export const fetchSpecializations = createAsyncThunk(
//   "doctorProfile/fetchSpecializations",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<Specialization[]>(
//         "http://192.168.1.52:8080/api/v1/doctors/specializations"
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch specializations"
//       );
//     }
//   }
// );

// export const fetchDegrees = createAsyncThunk(
//   "doctorProfile/fetchDegrees",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<Degree[]>(
//         "http://192.168.1.52:8080/api/v1/doctors/degrees"
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch degrees"
//       );
//     }
//   }
// );

export const updateDoctorProfile = createAsyncThunk(
  "doctorProfile/updateDoctorProfile",
  async (
    profileData: Partial<Doctor>,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState() as { signInDoctor: { user: Doctor } };
      // const state = getState() as RootState;
      const doctorId = state.signInDoctor.user?.id;

      if (!doctorId) {
        throw new Error("Doctor ID not found");
      }

      // console.log("Final update payload:", updatePayload);

      const response = await axios.put<Doctor>(
        `https://3a18-203-192-220-137.ngrok-free.app/api/v1/doctor/update/${doctorId}`,
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      console.log("Update response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Update error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const fetchDoctorProfile = createAsyncThunk(
  "doctorProfile/fetchDoctorProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { signInDoctor: { user: Doctor } };
      const doctorId = state.signInDoctor.user?.id;
      if (!doctorId) {
        throw new Error("Doctor ID not found");
      }

      const response = await axios.get<Doctor>(
        `https://3a18-203-192-220-137.ngrok-free.app/api/v1/doctor/${doctorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
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

      // Update Profile
      .addCase(updateDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        console.error("Update failed:", action);
        state.error = action.payload as string;
      })

      // fetch doctor by ID
      .addCase(fetchDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setDoctorProfile } = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;
