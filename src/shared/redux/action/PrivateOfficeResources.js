import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const PrivateOfficeResources = createAsyncThunk('privateOfficeResources/PrivateOfficeResources', async (data, thunkAPI) => {
  try {
    
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/resource/${data.Id}/${data.capacity}`,
      {
        headers: {
          // 'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});