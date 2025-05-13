
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Doctor {
  name: string;
  image: string;
}

export interface Prescription {
  id: string;
  date: string;
  doctor: Doctor;
}

interface PrescriptionState {
  items: Prescription[];
  loading: boolean;
  error: string | null;
}

const initialState: PrescriptionState = {
  items: [],
  loading: false,
  error: null,
};

//Async thunk using Axios
export const fetchPrescriptions = createAsyncThunk<Prescription[]>(
  'prescriptions/fetchPrescriptions',
  async () => {
    const response = await axios.get<Prescription[]>('http://localhost:5002/prescription'); 
    return response.data;
  }
);


const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState,
  reducers: {
    removePrescription: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrescriptions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load prescriptions';
      });
  },
});

export const { removePrescription } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
