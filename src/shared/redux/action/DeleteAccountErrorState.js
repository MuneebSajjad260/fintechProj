import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';
import instance from '../../utils/interceptor';

export const DeleteAccountErrorState = createAsyncThunk(
  'deleteAccountErrorState/DeleteAccountErrorState',
  async ({TeamIds}, thunkAPI) => {
    const endpointName = '(Delete Account Error State)';
    // console.log('IN API Fun:--------------------->', typeof TeamIds);

    try {
      const response = await instance.get(
        `${API_ENDPOINTS.fintech_backend_url}/teams-contracts/${TeamIds}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
