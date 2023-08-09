import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const PublicResources = createAsyncThunk('publicResources/PublicResources', async (data, thunkAPI) => {
  try {
  
    const response = await instance.get(`${API_ENDPOINTS.nexudus_url}/en/publicresources?_depth=3`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});