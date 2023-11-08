import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const BookedSlots = createAsyncThunk('bookedSlots/BookedSlots', async (data, thunkAPI) => {
  try {
    // // console.log('hellouu=>>>>', data);
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/booked-daypass-slots`,{
      headers: {
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${data}`
      }
    });
    console.log('--333--', JSON.stringify(response.data,null,2));

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});