import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../lib/axios';
import axiosInstance from '../../../lib/axios';
import { toast } from 'react-hot-toast';

interface AuthState {
  user: {
    email: string;
    firstName?: string;
    lastName?: string;
    role?: 'PATIENT';
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
    '/auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
      try {
        await axiosInstance.post('/auth/login', { ...credentials, role: 'PATIENT' }, {
          withCredentials: true,
        });
        toast.success('Login successful!');
        return { email: credentials.email, role: 'PATIENT' as const };
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );
  
  export const register = createAsyncThunk(
    'v1/patient/register',
    async (
      userData: { firstName: string; lastName: string; email: string; password: string },
      { rejectWithValue }
    ) => {
      try {
        await axiosInstance.post('v1/patient/register', { ...userData, role: 'PATIENT' }, {
          withCredentials: true,
        });
        toast.success('Registration successful!');
        return {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: 'PATIENT' as const,
        };
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Registration failed';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );
  
  export const forgotPassword = createAsyncThunk(
    '/auth/forgot-password',
    async (email: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/auth/forgot-password', { email }); // ✅ Updated path
        toast.success(response.data.message || 'Password reset link sent to your email!');
        return null;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to send reset link';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );
  
  export const resetPassword = createAsyncThunk(
    '/auth/reset-password',
    async ({ token, password }: { token: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/auth/reset-password/update', { token, password }); // ✅ Updated path
        toast.success(response.data.message || 'Password successfully reset!');
        return null;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to reset password';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );
  
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;