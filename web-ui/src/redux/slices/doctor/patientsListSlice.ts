import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
import { RootState } from "../../store";

// const PATIENTS_LIST_URL = API_BASE_URL + `"/v1/doctors/${doctorId}/appointments"`;

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  appointmentDate: string;
  location: string;
  lastBooking: string;
  image: string;
}

interface PatientsState {
  list: Patient[];
  loading: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk(
  "patients/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const state = getState() as RootState;

      const doctorId = state.signInPatient.user?.id;
      console.log("Doctor ID from state:", doctorId); 
       console.log("JWT token exists:", !!token);

      if (!doctorId) {
        throw new Error("Doctor ID not found");
      }

      const response = await axios.get<Patient[]>(
        `${API_BASE_URL}/v1/doctors/${doctorId}/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      console.log("Full API response:", response);
      
      const patientsData = Array.isArray(response.data) ? response.data : [];
      console.log("Patients data:", patientsData);
      return patientsData;
    } catch (error: any) {
      console.error("Error fetching patients:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch patients"
      );
    }
  }
);

const patientsListSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
         state.list = []; // reseting list when an error occures
      });
  },
});

export default patientsListSlice.reducer;
