import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import categoryReducer from './categorySlice';
import alertReducer from './alertSlice';
import { saveState, loadState } from './localStorage';

// Load initial state from localStorage
const preloadedAuthState = loadState(); // Load persisted state (auth)

const preloadedState = {
  auth: preloadedAuthState || {
    user: null,
    token: null,
    error: null,
  }, // Fallback to default state if undefined
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    category: categoryReducer,
    alert: alertReducer,
  },
  preloadedState, // Preload the store with state from localStorage
});

// Subscribe to store changes and persist auth state
store.subscribe(() => {
  const state = store.getState();
  
  // Only save the auth state
  saveState({
    user: state.auth.user,
    token: state.auth.token,
  });
});

export default store;
