import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const CreditHistory = createAsyncThunk('creditHistory/CreditHistory', async (data, thunkAPI) => {
  try {
    console.log('user id', data);
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/credit-histories/${data}`,{
      headers: {
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${data}`
      }
    });
    // console.log('--333--', response.data);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});