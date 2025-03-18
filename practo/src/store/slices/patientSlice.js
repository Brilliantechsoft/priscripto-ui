
import { createSlice } from '@reduxjs/toolkit'

const patientSlice = createSlice({
    name: 'patient',
    initialState: [],
    reducers: {
        addPatients: (state, action) => {
            return action.payload
        },
        getAllPatients: (state, action) => {
            state.data = [...state.data,...action.payload]
            return state.data;
        }

    },
})

export const { addPatients, getAllPatients } = patientSlice.actions;

export default patientSlice.reducer;