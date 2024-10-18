import { createSlice } from '@reduxjs/toolkit';
import Service from '../services/Service';
import { setErrorMessage, setSuccessMessage } from './alertSlice';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    error: null,
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    updateOrderInState(state, action) {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(order => order.id === updatedOrder.id);
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    },
  },
});

export const { setOrders, setError,updateOrderInState } = orderSlice.actions;

// Fetch orders for customers (from the /orders endpoint)
export const fetchOrders = (token) => async (dispatch) => {
  try {
    const response = await Service.get('/orders', {}, token);
    dispatch(setOrders(response?.data?.data));
  } catch (error) {
    dispatch(setErrorMessage('Failed to fetch orders'));
  }
};

// Fetch all customer orders for admin (from /admin/getAllCustomersOrder endpoint)
export const fetchAllCustomersOrder = (token) => async (dispatch) => {
  try {
    const response = await Service.get('/getAllCustomersOrder', {}, token);
    dispatch(setOrders(response?.data?.data));
  } catch (error) {
    dispatch(setErrorMessage('Failed to fetch customer orders'));
  }
};

// Update order status
export const updateOrderStatus = (orderId, status, token) => async (dispatch) => {
  try {
    const response = await Service.put(`/orders/${orderId}`, { status }, token);
    dispatch(updateOrderInState(response?.data?.data)); // Update order in state after successful response
    dispatch(setSuccessMessage(response?.data?.data?.message));
  } catch (error) {
    dispatch(setErrorMessage('Failed to fetch customer orders'));
  }
};

export default orderSlice.reducer;
