// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Service from '../services/Service';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const { setUser, setToken, setError, logout } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await Service.post('/login', { email, password });
    console.log('response', response);
    dispatch(setUser(response?.data?.data?.user));
    dispatch(setToken(response?.data?.data?.token));
    Service.setAuthorizationHeader(response?.data?.data?.token);
  } catch (error) {
    dispatch(setError('Invalid credentials'));
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    const response = await Service.post('/register', { name, email, password });
    dispatch(setUser(response?.data?.data.user));
    dispatch(setToken(response?.data?.data.token));
    Service.setAuthorizationHeader(response?.data?.data.token);
  } catch (error) {
    dispatch(setError('Registration failed'));
  }
};

export const logoutUser = (token) => async (dispatch) => {
  try {
    await Service.post('/logout',{},token);
    dispatch(logout());
    Service.setAuthorizationHeader(null);
  } catch (error) {
    console.log(error);
  }
};

export default authSlice.reducer;
