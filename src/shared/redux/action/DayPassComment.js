import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';


export const DayPassComment = createAsyncThunk('dayPassComment/DayPassComment', async (data, thunkAPI) => {
  try {
    // // console.log('hellouu=>>>>', data);
    const response = await instance.patch(`${API_ENDPOINTS.fintech_backend_url}/daypass-payments/${data?.id}`, data.body, {
      headers: {
        //  'Content-Type': 'multipart/form-data'
      }
    });
    // console.log('--333--', response.data);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});