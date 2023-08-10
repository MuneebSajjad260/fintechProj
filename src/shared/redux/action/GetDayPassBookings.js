import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../utils/interceptor';

export const GetDayPassBookings = createAsyncThunk('getDayPassBookings/GetDayPassBookings', async (data, thunkAPI) => {
  try {
    console.log('instance-->', instance());
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/coworker-all-upcoming-bookings/${data}`);
    // console.log('--333--', response.data);
    
    return response.data;
  } catch (error) {
    console.log('error day pass booking reducer', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});