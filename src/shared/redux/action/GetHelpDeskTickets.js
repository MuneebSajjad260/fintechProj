import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const GetHelpDeskTickets = createAsyncThunk(
  'getHelpDeskTickets/GetHelpDeskTickets',
  async ({id, path}, thunkAPI) => {

    const endpointName = '(Get Helpdesk Tickets Details)';

    try {
      if (!Number.isInteger(id)) {
        throw new Error('Please provide a valid integer Co-Worker ID.');
      }

      if (!id) {
        throw new Error(`Please provide an ID to get ${endpointName}.`);
      }

      const response = await instance.get(
        `${API_ENDPOINTS.fintech_backend_url}/customer-supports-${path}/${id}`,
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
