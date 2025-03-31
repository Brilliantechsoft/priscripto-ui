
import { createSlice } from "@reduxjs/toolkit";

import { patientTableData } from "../../types/patientTableData";

const PatientSlice = createSlice({
    name: 'patient',
    initialState: {
        patientData: [] as patientTableData[],
    },
    reducers: {
        setPatientData: (state, action) => {
            state.patientData = action.payload;
        },
        deletePatient: (state, action) => {
            state.patientData = state.patientData.filter(
                (patient) => patient.id !== action.payload
            );
        }
    },
})

export const { setPatientData } = PatientSlice.actions;

export default PatientSlice.reducer;