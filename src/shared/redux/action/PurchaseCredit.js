import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const PurchaseCredit = createAsyncThunk(
  'purchaseCredit/PurchaseCredit',
  async (data, thunkAPI) => {
    const endpointName = '(Purchase Credit)';
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      return thunkAPI.rejectWithValue(
        `Please provide valid data to ${endpointName}.`,
      );
    }
    try {
      const response = await instance.post(
        `${API_ENDPOINTS.fintech_backend_url}/credits`,
        data,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(
          `Error while getting ${endpointName}`,
          error.response.status,
          error.response.data,
        );
        return thunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(`Error while getting ${endpointName}`, error.request);
        return thunkAPI.rejectWithValue({
          message: 'No response received from server.',
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(`Error while getting ${endpointName}`, error.message);
        return thunkAPI.rejectWithValue({
          message: 'Something went wrong while processing the request.',
        });
      }
    }
  },
);
