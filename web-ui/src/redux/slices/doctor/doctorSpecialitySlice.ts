import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Specialization, Service, SpecialityService } from "../../../types/doctor/doctor";

// export interface SpecialityService {
//   id?: number;
//   specializationId: number | null;
//   serviceId: number | null;
//   price: number | null;
// }

interface DoctorSpecialityState {
  specialities: Specialization[];
  services: Service[];
  specialityServiceData: SpecialityService | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorSpecialityState = {
  specialities: [],
  services: [],
  specialityServiceData: null,
  loading: false,
  error: null,
};

export const fetchSpecialities = createAsyncThunk(
  "doctorSpeciality/fetchSpecialities",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        "http://192.168.1.49:8080/v1/doctors/getSpecNameService",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const specialities: Specialization[] = response.data.map((item: any) => ({
        specializationId: item.specializationId,
        specializationName: item.specializationName,
      }));

      return specialities;
      // console.log("Speciality response:", response.data);
      // return response.data;
    } catch (error) {
      console.error(
        "Fetch specializations error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch specialization"
      );
    }
  }
);

export const fetchServices = createAsyncThunk(
  "doctorSpeciality/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        "http://192.168.1.49:8080/v1/doctors/getSpecNameService",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const servicesSet = new Set<string>();
      response.data.forEach((item: any) => {
        servicesSet.add(item.services);
      });

      const services: Service[] = Array.from(servicesSet).map((serviceName, index) => ({
        serviceId: index + 1, // Temporary ID; 
        serviceName,
      }));

      return services;

      // console.log("Service response:", response.data);
      // return response.data;
    }  catch (error) {
      console.error(
        "Fetch degrees error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch specialization"
      );
    }
  }
);

export const updateSpecialityService = createAsyncThunk(
  "doctorSpeciality/updateSpecialityService",
  async (
    data: {
      specializationName: string;
      serviceName: string;
      price: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.put(
        "http://192.168.1.49:8080/api/v1/doctors/update-specializations",
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
      return rejectWithValue(
        error.response?.data?.message || "Failed to update speciality-service"
      );
    }
  }
);

export const deleteSpecialityService = createAsyncThunk(
  "doctorSpeciality/deleteSpecialityService",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        `https://3a18-203-192-220-137.ngrok-free.app/api/v1/doctor/speciality-service/${id}`,
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
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete speciality-service"
      );
    }
  }
);

const doctorSpecialitySlice = createSlice({
  name: "doctorSpeciality",
  initialState,
  reducers: {
    resetSpecialityService: (state) => {
      state.specialityServiceData = {
        specializationId: null,
        serviceId: null,
        price: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecialities.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities = action.payload;
      })
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSpecialityService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSpecialityService.fulfilled, (state, action) => {
        state.loading = false;
        state.specialityServiceData = action.payload;
      })
      .addCase(updateSpecialityService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSpecialityService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSpecialityService.fulfilled, (state) => {
        state.loading = false;
        state.specialityServiceData = null;
      })
      .addCase(deleteSpecialityService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSpecialityService } = doctorSpecialitySlice.actions;
export default doctorSpecialitySlice.reducer;