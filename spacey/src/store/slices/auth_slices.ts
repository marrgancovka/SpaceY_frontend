import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    is_authenticated: false,
    role: '',
    
  },
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.is_authenticated = true;
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.token = '';
      state.is_authenticated = false;
      state.role = '';
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;