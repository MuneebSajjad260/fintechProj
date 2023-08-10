
import { createSlice } from '@reduxjs/toolkit';
import { login } from '../action/user';
import { logout } from '../action/user';
import { clearError } from '../action/user';
import { clearSetPassword } from '../action/user';
// const initialState = {
//   loading: false,
//   data: null,
//   error: null,
//   isAuth:false
// };

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetUser:(state)=>{
      state.data = null;
    },
    resetError:(state)=>{
      state.error = null;
    },
    resetPassword:(state)=>{
      state.error = null
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        
        console.log('action fulfilled', action.payload);

        state.data = action.payload;
        state.loading = false;
        state.error=null;
      })
      .addCase(login.pending, (state) => {
        console.log('pending', state);
        state.loading = true;
        state.error = null;

      })
      
      .addCase(login.rejected, (state, action) => {
        console.log('action rejected', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        
        state.loading = true;
        state.error = null;

      })
      .addCase(logout.fulfilled, (state) => {
       
        state.loading = false;
        authSlice.caseReducers.resetUser(state);
      })
      
      .addCase(logout.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearError.pending, (state) => {
        
        state.loading = true;
        state.error = null;

      })
      .addCase(clearError.fulfilled, (state) => {
       
        state.loading = false;
        authSlice.caseReducers.resetError(state);
      })
      
      .addCase(clearError.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearSetPassword.pending, (state) => {
        
        state.loading = true;
        state.error = null;

      })
      .addCase(clearSetPassword.fulfilled, (state) => {
       
        state.loading = false;
        authSlice.caseReducers.resetPassword(state);
      })
      
      .addCase(clearSetPassword.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export const {resetUser, resetError,resetPassword}=authSlice.actions;

export default authSlice.reducer;