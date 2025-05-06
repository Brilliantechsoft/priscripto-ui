import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


interface Specialization {
  specializationId: number;
  specializationName: string;
  services: string;
  fees: number;
}

export interface Degree {
  degreeId: number;
  degreeName: string;
  startDate: number[];
  endDate: number[];
  instituteName: string;
}
interface Doctor {
  id: number;
  firstName: string;
  lastName:string;
  email: string;
  degrees:  Degree[];
  age: string;
  phoneNumber: string;
  specialization: Specialization[];
  city: string;
  clinicAddress: string | null;
}

interface DoctorsState {
  doctors: Doctor[];
  searchDoctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorsState = {
  doctors: [],
  searchDoctors: [],
  loading: false,
  error: null,
};

export const fetchDoctors = createAsyncThunk("doctors", async () => {
  const response = await axios.get<Doctor[]>("http://localhost:5002/doctors") 
    
  return response.data;
});

export const addDoctor = createAsyncThunk(
  "doctors/add",
  async (doctor: Omit<Doctor, "id">) => {
    const response = await axios.post<Doctor>(
      "http://localhost:5002/doctors",
      doctor
    );
    return response.data;
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/delete",
  async (id: number) => {
    await axios.delete<Doctor>(`http://localhost:5002/doctors/${id}`);
    return id;
  }
);

const doctorsListSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    handleSearchDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.searchDoctors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(
        addDoctor.fulfilled,
        (state: any, action: PayloadAction<Doctor>) => {
          state.doctors.push(action.payload);
        }
      )
      .addCase(deleteDoctor.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state: any, action: any) => {
        const id = action.payload;

        state.doctors = state.doctors.filter((doctor: any) => doctor.id !== id);
      })
      .addCase(deleteDoctor.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { handleSearchDoctors } = doctorsListSlice.actions;
export default doctorsListSlice.reducer;
