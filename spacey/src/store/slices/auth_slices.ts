import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    is_authenticated: false,
    role: '',
    username: '',
    
  },
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.is_authenticated = true;
      state.role = action.payload.role;
      state.username = action.payload.username
    },
    logoutUser: (state) => {
      state.token = '';
      state.is_authenticated = false;
      state.role = '';
      state.username = '';
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;