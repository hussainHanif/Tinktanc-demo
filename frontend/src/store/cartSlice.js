import { createSlice } from '@reduxjs/toolkit';
import Service from '../services/Service';
import { setSuccessMessage, setErrorMessage } from './alertSlice'; // Import actions

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearCart(state) {
      state.items = []; // Clear cart after successful order placement
    },
  },
});

export const { setCartItems, setError, clearCart } = cartSlice.actions;

export const fetchCartItems = (token) => async (dispatch) => {
  try {
    const response = await Service.get('/carts', {}, token);
    dispatch(setCartItems(response?.data?.data));
  } catch (error) {
    dispatch(setError('Failed to fetch cart items'));
    dispatch(setErrorMessage('Failed to fetch cart items'));
  }
};

export const addToCart = (productId, quantity, token) => async (dispatch) => {
  try {
    await Service.post('/carts', { product_id: productId, quantity }, token);
    dispatch(fetchCartItems(token));
    dispatch(setSuccessMessage('Item added to cart!'));
  } catch (error) {
    dispatch(setError('Failed to add item to cart'));
    dispatch(setErrorMessage('Failed to add item to cart'));
  }
};

export const updateCartItem = (id, quantity, token) => async (dispatch) => {
  try {
    await Service.put(`/carts/${id}`, { quantity }, token);
    dispatch(fetchCartItems(token));
  } catch (error) {
    dispatch(setError('Failed to update cart item'));
  }
};

export const deleteCartItem = (id, token) => async (dispatch) => {
  try {
    await Service.delete(`/carts/${id}`, token);
    dispatch(fetchCartItems(token));
  } catch (error) {
    dispatch(setError('Failed to delete cart item'));
  }
};
// Place an order
export const placeOrder = (token) => async (dispatch) => {
  try {
    await Service.post('/orders', {}, token); // Call the place order endpoint
    dispatch(clearCart()); // Clear the cart after placing the order
    dispatch(setSuccessMessage('Order palaced successfully!'));
  } catch (error) {
    dispatch(setError('Failed to place order'));
  }
};
export default cartSlice.reducer;
