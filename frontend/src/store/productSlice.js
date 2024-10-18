// store/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Service from '../services/Service';
import { setErrorMessage, setSuccessMessage } from './alertSlice';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setError } = productSlice.actions;

export const fetchProducts = (token) => async (dispatch) => {
  try {
    const response = await Service.get('/products', {}, token);
    dispatch(setProducts(response?.data?.data));
  } catch (error) {
    dispatch(setErrorMessage('Failed to fetch products'));
  }
};

export const addProduct = (product, token) => async (dispatch) => {
  try {
    await Service.post('/products', product, token);
    dispatch(fetchProducts(token));
    dispatch(setSuccessMessage('Product added successfully!'));
  } catch (error) {
    dispatch(setErrorMessage('Failed to add product'));
  }
};

export const updateProduct = (product, token) => async (dispatch) => {
  try {
    const {id} = product || {};
    await Service.put(`/products/${id}`, product, token);
    dispatch(fetchProducts(token));
    dispatch(setSuccessMessage('Product updated successfully!'));
  } catch (error) {
    dispatch(setErrorMessage('Failed to update product'));
  }
};

export const deleteProduct = (id, token) => async (dispatch) => {
  try {
    await Service.delete(`/products/${id}`, token);
    dispatch(fetchProducts(token));
    dispatch(setSuccessMessage('Product deleted successfully!'));
  } catch (error) {
    dispatch(setErrorMessage('Failed to delete product'));
  }
};

export default productSlice.reducer;
