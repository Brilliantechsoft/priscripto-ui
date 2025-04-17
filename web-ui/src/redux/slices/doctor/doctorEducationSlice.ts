import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Education, Degree, Doctor } from "../../../types/doctor/doctor";

// initial state
interface EducationState {
  degrees: { id: number; name: string }[];
  educationData: {
    id?: number;
    degreeName: string | null;
    instituteName: string | null;
    startDate: string | null;
    endDate: string | null;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: EducationState = {
  degrees: [],
  educationData: null,
  loading: false,
  error: null,
};

// Fetching degrees from backend
export const fetchDegrees = createAsyncThunk(
  "doctorEducation/fetchDegrees",
  async (_, {rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // const state = getState() as { signInDoctor: { user: Doctor } };
      // const doctorId = state.signInDoctor.user.id;
      // if (!doctorId) {
      //   throw new Error("Doctor ID not found");
      // }

      const response = await axios.get(
        "http://192.168.1.49:8080/api/v1/doctors/degrees",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Degrees response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetch degrees error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch degrees"
      );
    }
  }
);

// update education data to backend
export const updateEducation = createAsyncThunk(
  "doctorEducation/updateEducation",
  async (
    data: {
      degreeName: string;
      instituteName: string;
      startDate: string;
      endDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.put(
        "http://192.168.1.49:8080/api/v1/doctors/update-degrees",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Update education error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to update education"
      );
    }
  }
);

// Delete education data
export const deleteEducation = createAsyncThunk(
  "doctorEducation/deleteEducation",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        `https://9702-203-192-220-137.ngrok-free.app/api/v1/doctors/education/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return id;
    } catch (error) {
      console.error(
        "Delete education error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete education"
      );
    }
  }
);

const doctorEducationSlice = createSlice({
  name: "doctorEducation",
  initialState,
  reducers: {
    resetEducation: (state) => {
      state.educationData = {
        degreeName: null,
        instituteName: null,
        startDate: null,
        endDate: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDegrees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDegrees.fulfilled, (state, action) => {
        state.loading = false;
        state.degrees = action.payload.map((degree: any) => ({
          id: degree.degreeId,
          name: degree.degreeName,
        }));
      })
      .addCase(fetchDegrees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educationData = action.payload;
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEducation.fulfilled, (state) => {
        state.loading = false;
        state.educationData = null;
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetEducation } = doctorEducationSlice.actions;
export default doctorEducationSlice.reducer;
