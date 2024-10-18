// store/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import Service from '../services/Service';
import { setSuccessMessage, setErrorMessage } from './alertSlice'; // Import actions

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    error: null,
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setError } = categorySlice.actions;

export const fetchCategories = (token) => async (dispatch) => {
  try {
    const response = await Service.get('/categories', {}, token);
    dispatch(setCategories(response?.data?.data));
  } catch (error) {
    dispatch(setError('Failed to fetch categories'));
    dispatch(setErrorMessage('Failed to fetch categories'));
  }
};

export default categorySlice.reducer;
