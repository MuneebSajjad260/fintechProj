import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';
import instance from '../../utils/interceptor';

export const UpdatePassword = createAsyncThunk(
  'updatePassword/UpdatePassword',
  async ({token, data, id}, thunkAPI) => {
    const endpointName = '(Update Password)';

    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {
      return thunkAPI.rejectWithValue(
        `Please provide a valid ID to ${endpointName}.`,
      );
    }

    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      return thunkAPI.rejectWithValue(
        `Please provide valid data to ${endpointName}.`,
      );
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await instance.patch(
        `${API_ENDPOINTS.fintech_backend_url}/update-password/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
