import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const Feeds= createAsyncThunk('feeds/Feeds', async (data, thunkAPI) => {
  try {
    // console.log('hellouu=>>>>', data);
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/feeds`,{
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log('--333--', response.data);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});