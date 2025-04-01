import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoctorProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialization?: string;
  degree?: string;
  bio?: string;
}

interface DoctorProfileState {
  doctor: DoctorProfile | null;
  isProfileComplete: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DoctorProfileState = {
  doctor: null,
  isProfileComplete: false,
  status: "idle",
  error: null,
};

const doctorProfileSlice = createSlice({
  name: "doctorProfile",
  initialState,
  reducers: {
    setDoctorProfile: (state, action: PayloadAction<DoctorProfile>) => {
      state.doctor = action.payload;
      // Check if required fields are filled to consider profile complete
      state.isProfileComplete = !!(
        action.payload.firstName &&
        action.payload.lastName &&
        action.payload.email &&
        action.payload.specialization &&
        action.payload.degree
      );
    },
    updateDoctorProfile: (
      state,
      action: PayloadAction<Partial<DoctorProfile>>
    ) => {
      if (state.doctor) {
        state.doctor = { ...state.doctor, ...action.payload };
        // Re-check profile completion status
        state.isProfileComplete = !!(
          state.doctor.firstName &&
          state.doctor.lastName &&
          state.doctor.email &&
          state.doctor.specialization &&
          state.doctor.degree
        );
      }
    },
    clearDoctorProfile: (state) => {
      state.doctor = null;
      state.isProfileComplete = false;
      state.status = "idle";
      state.error = null;
    },
    setProfileComplete: (state, action: PayloadAction<boolean>) => {
      state.isProfileComplete = action.payload;
    },
  },
});

export const {
  setDoctorProfile,
  updateDoctorProfile,
  clearDoctorProfile,
  setProfileComplete,
} = doctorProfileSlice.actions;

export default doctorProfileSlice.reducer;
