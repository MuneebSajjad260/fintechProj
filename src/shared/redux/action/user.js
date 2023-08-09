
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    // console.log('hellouu=>>>>', data);
    const response = await axios.post(`${API_ENDPOINTS.nexudus_url}/api/token`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    // console.log('--333--', response);

    return response.data;
  } catch (error) {
    console.log('error--show', error);
    //NETWORK ERROR
    if (!error?.response){
      console.log('error--show network---', error);
      return thunkAPI.rejectWithValue({message:'Network error occured, Server error occured'});
    }
    //HTTP error
    return thunkAPI.rejectWithValue(error?.response?.data);

  }
});
export const logout =createAsyncThunk('auth/logout',async()=>{
//dispatch an action to reset user state to null or empty
});

export const clearError =createAsyncThunk('auth/clearError',async()=>{
  //dispatch an action to reset error state to null or empty
});
  
export const clearSetPassword =createAsyncThunk('auth/clearSetPassword',async()=>{
  //dispatch an action to reset password state to null or empty
});
  