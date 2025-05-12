import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// import { fetchDoctorProfile } from "./doctorProfileSlice";

const LOGIN_PATIENT_URL = "https://32c5-203-192-220-137.ngrok-free.app/api/auth/login";

interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface PatientSignInResponse {
  success: boolean;
  jwt: string;
  message: string;
  user: User;
}

interface ApiError {
  status?: number;
  message: string;
}

interface PatientSignInState {
  email: string;
  password: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  token: string | null;
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: PatientSignInState = {
  email: "",
  password: "",
  status: "idle",
  error: null,
  token: localStorage.getItem("jwt") || null, // Load token from localStorage
  isLoggedIn: !!localStorage.getItem("jwt"),
  // user: null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

export const signInPatient = createAsyncThunk(
  "signInPatient/signInPatient",
  async (
    patientData: { email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const payload = {
        ...patientData,
        role: "PATIENT",
      };

      const response = await axios.post<PatientSignInResponse>(
        LOGIN_PATIENT_URL,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // alert(response.data);
      // Storing token in localStorage
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("Login Response", response.data);

    //   await dispatch(fetchDoctorProfile());
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

const signInPatientSlice = createSlice({
  name: "signInPatient",
  initialState,
  reducers: {
    setPatientSignInData: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearPatientSignInData: (state) => {
      state.email = "";
      state.password = "";
      state.status = "idle";
      state.error = null;
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;

      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInPatient.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInPatient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.jwt;
        state.user = action.payload.user;
        console.log("Login response payload:", action.payload);
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signInPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.token = null;
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { setPatientSignInData, clearPatientSignInData } =
signInPatientSlice.actions;

export default signInPatientSlice.reducer;
