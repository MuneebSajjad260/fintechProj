import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';

export const GetMeetingRoom = createAsyncThunk(
  'getMeetingRoom/GetMeetingRoom',
  async thunkAPI => {
    const endpointName = 'Meeting Rooms';
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.fintech_backend_url}/meeting-rooms`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
