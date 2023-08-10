import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';
import instance from '../../utils/interceptor';

export const GetChatList = createAsyncThunk(
  'getChatList/GetChatList',
  async (Id, thunkAPI) => {
    const endpointName = '(Get Chat List)';
    try {
      const response = await instance.get(
        `${API_ENDPOINTS.fintech_backend_url}/helpdesks-chats/${Id}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
