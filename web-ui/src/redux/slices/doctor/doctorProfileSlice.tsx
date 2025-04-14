import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Doctor, Specialization, Degree } from "../../../types//doctor/doctor";
import { RootState } from "../../../redux/store";

interface Country {
  name: string;
  isoCode: string;
  states: State[];
}

interface State {
  name: string;
  stateCode: string;
  isoCode: string;
  cities: string[];
}

interface DoctorProfileState {
  doctor: Doctor | null;
  countries: Country[];
  states: State[];
  cities: string[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorProfileState = {
  doctor: null,
  countries: [],
  states: [],
  cities: [],
  loading: false,
  error: null,
};

// export const fetchSpecializations = createAsyncThunk(
//   "doctorProfile/fetchSpecializations",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<Specialization[]>(
//         "http://192.168.1.52:8080/api/v1/doctors/specializations"
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch specializations"
//       );
//     }
//   }
// );

// Fetch Countries, States, and Cities
export const fetchCountries = createAsyncThunk(
  "doctorProfile/fetchCountries",
  async (_, { rejectWithValue }) => {
    const options = {
      method: "GET",
      url: "https://country-state-city-search-rest-api.p.rapidapi.com/allcountries",
      headers: {
        "x-rapidapi-key": "32da67e391msheb76d20321f8261p1be1afjsn67bb1fc09c04",
        "x-rapidapi-host": "country-state-city-search-rest-api.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("Countries response:", response.data);

      const formattedCountries = response.data.map((country: any) => ({
        name: country.name,
        isoCode: country.isoCode,
        states: [],
      }));
      // console.log(formattedCountries);

      return formattedCountries;
    } catch (error) {
      console.error("Error fetching countries:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch countries"
      );
    }
  }
);

// Fetch States by Country Code
export const fetchStatesByCountryCode = createAsyncThunk(
  "doctorProfile/fetchStatesByCountryCode",
  async (countryCode: string, { rejectWithValue }) => {
    // console.log("Fetching states for countryCode:", countryCode);
    const options = {
      method: "GET",
      url: "https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode",
      params: { countrycode: countryCode },
      headers: {
        "x-rapidapi-key": "32da67e391msheb76d20321f8261p1be1afjsn67bb1fc09c04",
        "x-rapidapi-host": "country-state-city-search-rest-api.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const formattedStates = response.data.map((state: any) => {
        return {
          name: state.name,
          stCode: state?.isoCode,
          stateCode:
            state.stateCode || state.code || state.state_code || state.id || "",
          cities: [],
        };
      });
      // console.log(formattedStates[0]);

      //console.log(response.data[0]);

      return formattedStates;
    } catch (error) {
      // console.error("Error fetching states:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch states"
      );
    }
  }
);

export const fetchCitiesByCountryCodeAndStateCode = createAsyncThunk(
  "doctorProfile/fetchCitiesByCountryCodeAndStateCode",
  async (
    { countryCode, stateCode }: { countryCode: string; stateCode: string },
    { rejectWithValue }
  ) => {
    console.log(
      "Fetching cities for countryCode:",
      countryCode,
      "stateCode:",
      stateCode
    );
    const options = {
      method: "GET",
      url: "https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode",
      params: {
        countrycode: countryCode,
        statecode: stateCode,
      },
      headers: {
        "x-rapidapi-key": "32da67e391msheb76d20321f8261p1be1afjsn67bb1fc09c04",
        "x-rapidapi-host": "country-state-city-search-rest-api.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("Cities response:", response.data);
      const formattedCities = response.data.map((city: any) => city.name);
      return formattedCities;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cities"
      );
    }
  }
);

export const updateDoctorProfile = createAsyncThunk(
  "doctorProfile/updateDoctorProfile",
  async (data: Partial<Doctor>, { rejectWithValue }) => {
    try {
      // const state = getState() as { signInDoctor: { user: Doctor } };
      // const state = getState() as RootState;
      // const doctorId = state.signInDoctor.user?.id;

      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("Token not found");
      }

      // console.log("Final update payload:", updatePayload);

      const response = await axios.put<Doctor>(
        `https://3a18-203-192-220-137.ngrok-free.app/api/v1/doctor/update`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Update response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Update error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const fetchDoctorProfile = createAsyncThunk(
  "doctorProfile/fetchDoctorProfile",
  async (_, { rejectWithValue }) => {
    try {
      // const state = getState() as { signInDoctor: { user: Doctor } };
      // const doctorId = state.signInDoctor.user?.id;

      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get<Doctor>(
        `https://3a18-203-192-220-137.ngrok-free.app/api/v1/doctor`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          // withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const doctorProfileSlice = createSlice({
  name: "doctorProfile",
  initialState,
  reducers: {
    setDoctorProfile: (state, action: PayloadAction<Doctor>) => {
      state.doctor = action.payload;
    },
    setStates: (state, action: PayloadAction<State[]>) => {
      state.states = action.payload;
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching countries started...");
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        console.log("Countries fetched successfully:", action.payload);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("Countries fetch failed:", action.payload);
      })

      // Fetch States by Country Code
      .addCase(fetchStatesByCountryCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching states started...");
      })
      .addCase(fetchStatesByCountryCode.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
        console.log("States fetched successfully:", action.payload);
      })
      .addCase(fetchStatesByCountryCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("States fetch failed:", action.payload);
      })

      // Fetch Cities by Country Code and State Code
      .addCase(fetchCitiesByCountryCodeAndStateCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching cities started...");
      })
      .addCase(
        fetchCitiesByCountryCodeAndStateCode.fulfilled,
        (state, action) => {
          state.loading = false;
          state.cities = action.payload;
          console.log("Cities fetched successfully:", action.payload);
        }
      )
      .addCase(
        fetchCitiesByCountryCodeAndStateCode.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("Cities fetch failed:", action.payload);
        }
      )

      // Update Profile
      .addCase(updateDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        console.error("Update failed:", action);
        state.error = action.payload as string;
      })

      // fetch doctor by ID
      .addCase(fetchDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setDoctorProfile, setStates, setCities } =
  doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;
