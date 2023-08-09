import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';

export const UploadFileToNexudus = createAsyncThunk(
  'uploadFileToNexudus/UploadFileToNexudus',
  async ({files}) => {
    const endpointName = '(Upload Files)';

    if (!files || files.length === 0) {
      throw new Error(
        `Please provide at least one file to upload ${endpointName}.`,
      );
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
    });

    const config = {
      headers: {'content-type': 'multipart/form-data'},
    };

    try {
      const response = await axios.post(
        'https://storage.nexudus.com/api/content/uploads/tempfile',
        formData,
        config,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(
          `Error while uploading ${endpointName}`,
          error.response.status,
          error.response.data,
        );
        throw new Error(error.response.data);
      } else if (error.request) {
        console.log(`Error while uploading ${endpointName}`, error.request);
        throw new Error('No response received from server.');
      } else {
        console.log(`Error while uploading ${endpointName}`, error.message);
        throw new Error('Something went wrong while processing the request.');
      }
    }
  },
);