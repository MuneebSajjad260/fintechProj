import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';
import instance from '../../utils/interceptor';

export const GetFaqs = createAsyncThunk(
  'getFaqs/GetFaqs',
  async (thunkAPI) => {
    const endpointName = '(Get Faqs List)';
    try {
      const response = await instance.get(
        `${API_ENDPOINTS.fintech_backend_url}/faqs`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
