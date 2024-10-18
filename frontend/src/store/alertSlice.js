// store/alertSlice.js
import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    successMessage: null,
    errorMessage: null,
  },
  reducers: {
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    clearMessages(state) {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
});

export const { setSuccessMessage, setErrorMessage, clearMessages } = alertSlice.actions;

export default alertSlice.reducer;
