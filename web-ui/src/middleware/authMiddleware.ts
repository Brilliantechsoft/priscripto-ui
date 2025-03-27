import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { signOutDoctor } from "../redux/doctor/loginDoctorSlice";
import { RootState, AppDispatch } from "../redux/store";

// Define middleware with proper types
export const authMiddleware: Middleware<
  object,  // Use 'object' instead of {} for extra arguments
  RootState,
  AppDispatch
> = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // Type-safe payload access
    if (typeof action.payload === 'object' && 
        action.payload !== null && 
        'status' in action.payload) {
      if (action.payload.status === 401) {
        api.dispatch(signOutDoctor());
      }
    }
  }
  return next(action);
};