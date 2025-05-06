import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const REGISTER_DOCTOR_URL =
  "https://ad53-203-192-220-137.ngrok-free.app/api/v1/doctor/register";

interface DoctorRegistrationState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface DoctorRegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface DoctorRegistrationResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const initialState: DoctorRegistrationState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  // token: null,
  status: "idle",
  error: null,
};

// export const registerDoctor = createAsyncThunk(
//   "registerDoctor/registerDoctor",
//   async (doctorData: DoctorRegistrationPayload, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(REGISTER_DOCTOR_URL, doctorData);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       return rejectWithValue(axiosError.response?.data || "An error occured");
//     }
//   }
// );

export const registerDoctor = createAsyncThunk(
  "registerDoctor/registerDoctor",
  async (doctorData: DoctorRegistrationPayload, { rejectWithValue }) => {
    try {
      const payload = {
        ...doctorData,
        role: "DOCTOR", // Hidden role added here
      };

      const response = await axios.post<DoctorRegistrationResponse>(
        REGISTER_DOCTOR_URL,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert(response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // error response coming from the backend
        console.error("Backend Error Response:", axiosError.response.data);
        return rejectWithValue(
          axiosError.response.data || "Registration failed"
        );
      }
      console.error("Network Error:", error);
      return rejectWithValue("Network error occurred");
    }
  }
);

const registerDoctorSlice = createSlice({
  name: "registerDoctor",
  initialState,
  reducers: {
    setDoctorData: (state, action: PayloadAction<DoctorRegistrationState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },

    clearDoctorData: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.password = "";
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        // Store registration data and token if available
        // state.token = action.payload.token || null;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setDoctorData, clearDoctorData } = registerDoctorSlice.actions;
export default registerDoctorSlice.reducer;
