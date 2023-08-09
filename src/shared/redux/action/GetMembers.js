import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const GetMembers = createAsyncThunk('getMembers/GetMembers', async (data, thunkAPI) => {
  try {
    // console.log('hellouu=>>>>', data);
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/teams-members/${data}`,{
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