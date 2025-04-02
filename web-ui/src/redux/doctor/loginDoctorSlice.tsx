import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const LOGIN_DOCTOR_URL =
  "https://30ed-203-192-220-137.ngrok-free.app/api/auth/login";

interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface DoctorSignInResponse {
  token: string;
  user: User;
}

interface ApiError {
  status?: number;
  message: string;
}

interface DoctorSignInState {
  email: string;
  password: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  token: string | null;
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: DoctorSignInState = {
  email: "",
  password: "",
  status: "idle",
  error: null,
  token: localStorage.getItem("token") || null, // Load token from localStorage
  isLoggedIn: !!localStorage.getItem("token"),
  user: null,
};

export const signInDoctor = createAsyncThunk(
  "signInDoctor/signInDoctor",
  async (
    doctorData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        ...doctorData,
        role: "DOCTOR", // Hidden role added here
      };

      const response = await axios.post<DoctorSignInResponse>(
        LOGIN_DOCTOR_URL,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // alert(response.data);
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ApiError;
        if (axiosError.response.status === 401) {
          return rejectWithValue("Invalid email or password");
        } else if (axiosError.response.status === 404) {
          return rejectWithValue("Doctor not found");
        }
        return rejectWithValue(errorData.message || "Authentication failed");
      }

      console.error("Network Error:", error);
      return rejectWithValue("Network error occurred");
    }
  }
);

const signInDoctorSlice = createSlice({
  name: "signInDoctor",
  initialState,
  reducers: {
    setDoctorSignInData: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearDoctorSignInData: (state) => {
      state.email = "";
      state.password = "";
      state.status = "idle";
      state.error = null;
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;

      // Remove the token from localStorage
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInDoctor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        console.log("Login response payload:", action.payload);
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signInDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const { setDoctorSignInData, clearDoctorSignInData } =
  signInDoctorSlice.actions;

export default signInDoctorSlice.reducer;
