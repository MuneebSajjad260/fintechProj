import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const TeamSettings = createAsyncThunk('teamSettings/TeamSettings', async (data, thunkAPI) => {
  try {
    // console.log('hellouu=>>>>', data);
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/teams-settings/${data}`,
      {
        headers: {
          // 'Content-Type': 'application/json'
        }
      }
    );
   

    return response.data;
  } catch (error) {
   
    return thunkAPI.rejectWithValue(error.response.data);

  }
});