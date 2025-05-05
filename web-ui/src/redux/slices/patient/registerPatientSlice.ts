import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const REGISTER_PATIENT_URL = "https://c4b9-203-192-220-137.ngrok-free.app/api/v1/patient/register";


interface PatientRegistrationState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface PatientRegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface PatientRegistrationResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const initialState: PatientRegistrationState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  // token: null,
  status: "idle",
  error: null,
};

export const registerPatient = createAsyncThunk(
  "registerPatient/registerPatient",
  async (patientData: PatientRegistrationPayload, { rejectWithValue }) => {
    try {
      const payload = {
        ...patientData,
        role: "PATIENT",
      };

      const response = await axios.post<PatientRegistrationResponse>(
        REGISTER_PATIENT_URL,
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

const registerPatientSlice = createSlice({
  name: "registerPatient",
  initialState,
  reducers: {
    setPatientData: (state, action: PayloadAction<PatientRegistrationState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },

    clearPatientData: (state) => {
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
      .addCase(registerPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setPatientData, clearPatientData } = registerPatientSlice.actions;
export default registerPatientSlice.reducer;
