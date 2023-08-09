import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const GetSinglePlan = createAsyncThunk('getSinglePlan/GetSinglePlan', async (data, token, thunkAPI) => {
  try {
  
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/plans/${data}`,
      {
        headers: {
          // 'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${data}`
        }
      }

    );


    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});