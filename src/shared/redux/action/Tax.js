import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';

export const Tax = createAsyncThunk(
  'tax/Tax',
  async thunkAPI => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.fintech_backend_url}/booking-taxes`,
      );
      return response.data;
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error.response.data);
    
      }
  },
);
