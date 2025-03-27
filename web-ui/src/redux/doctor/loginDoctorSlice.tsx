import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const LOGIN_DOCTOR_URL =
  "https://f6be-203-192-220-137.ngrok-free.app/api/auth/login";

interface DoctorSignInState {
  email: string;
  password: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  token: string | null;
}

interface DoctorSignInPayload {
  email: string;
  password: string;
}

interface DoctorSignInResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // firstName: string;
    // lastName: string;
    role: string;
  };
}

interface ApiError {
  status?: number;
  message: string;
}

const initialState: DoctorSignInState = {
  email: "",
  password: "",
  status: "idle",
  error: null,
  token: null,
};

export const signInDoctor = createAsyncThunk(
  "signInDoctor/signInDoctor",
  async (doctorData: DoctorSignInPayload, { rejectWithValue }) => {
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
      alert(response.data);
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
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    signOutDoctor: (state) => {
      state.token = null;
      state.status = "idle";
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
        state.error = null;
      })
      .addCase(signInDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.token = null;
      });
  },
});

export const {
  setDoctorSignInData,
  clearDoctorSignInData,
  setToken,
  signOutDoctor,
} = signInDoctorSlice.actions;

export default signInDoctorSlice.reducer;
