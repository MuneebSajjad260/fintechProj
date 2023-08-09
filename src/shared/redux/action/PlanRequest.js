
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const PlanRequest = createAsyncThunk('planRequest/PlanRequest', async (data, thunkAPI) => {
  try {
    const response = await instance.post(`${API_ENDPOINTS.fintech_backend_url}/plan-requests`, data, {
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
   
    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});