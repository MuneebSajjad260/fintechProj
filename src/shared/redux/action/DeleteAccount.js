import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';
import instance from '../../utils/interceptor';

export const DeleteAccount = createAsyncThunk(
  'deleteAccount/DeleteAccount',
  async ({token, TeamIds, id}, thunkAPI) => {
    const endpointName = '(Delete Account)';
    // console.log("IN API Fun:--------------------->", token, TeamIds, id)

    try {
      // TODO tell Haider to add it "Authorization" its important
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await instance.patch(
        `${API_ENDPOINTS.fintech_backend_url}/delete-account/${TeamIds}/${id}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
