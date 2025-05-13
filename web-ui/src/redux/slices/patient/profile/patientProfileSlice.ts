import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UpdateProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  age: number;
  gender: string;
  bloodGroup: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
  address: string;
}

interface ProfileState {
  loading: boolean;
  error: string | null;
  success: boolean;
  profileData: any;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  success: false,
  profileData: null
};

// export const updatePatientProfile = createAsyncThunk(
//   'profile/updateProfile',
//   async ({ patientId, formData }: { patientId: number; formData: FormData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/${patientId}/update-profile`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
//     }
//   }
// );

export const updatePatientProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ patientId, formData }: { patientId: number; formData: FormData }, { rejectWithValue }) => {
    try {
      // Convert FormData to the expected format
      const data: Partial<UpdateProfileData> = {};
      
      formData.forEach((value, key) => {
        switch(key) {
          case 'phone':
            data.phoneNo = Number(value);
            break;
          case 'age':
          case 'pincode':
            data[key] = Number(value);
            break;
          case 'gender':
            data.gender = value.toString().toUpperCase();
            break;
          case 'country':
          case 'state':
          case 'city':
            data[key] = value.toString();
            break;
          default:
            break;
        }
      });

      console.log('Sending data:', data); // Debug log

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/${patientId}/update-profile`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

const patientProfileUpdateSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileData = action.payload;
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetProfileState } = patientProfileUpdateSlice.actions;
export default patientProfileUpdateSlice.reducer;