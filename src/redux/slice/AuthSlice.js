import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,  
  isSignedIn:   false,  
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.isSignedIn = true;
          },
    signOut: (state) => {
      state.user = null;
      state.isSignedIn = false;
    },
    loadUserFromStorage: (state, action) => {
      state.user = action.payload;
      state.isSignedIn = !!action.payload;
    }
  },
});

export const { signIn, signOut, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
