import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const GetNexudusResources = createAsyncThunk(
  'getNexudusResources/GetNexudusResources',
  async ({ path, token }, thunkAPI) => {
    const endpointName = `(Nexudus Resource: (${path}) Details)`;
    const url = `https://fintechhub.spaces.nexudus.com/en/profile?_resource=${path}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error while getting ${endpointName}`, error.message);
      return thunkAPI.rejectWithValue('Something went wrong while processing the request.');
    }
  },
);
