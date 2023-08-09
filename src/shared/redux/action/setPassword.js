import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';

export const newPassword = createAsyncThunk('newPassword/newPassword', async (data, thunkAPI) => {
  try {
  
    const response = await axios.put(`${API_ENDPOINTS.nexudus_url}/api/sys/users/setPassword`, data,
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
