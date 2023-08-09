export const handleErrors = (error, endpointName) => {
  if (error.response) {
    console.log(
      `Error while getting ${endpointName}`,
      error.response.status,
      error.response.data,
    );
    return error.response.data;
  } else if (error.request) {
    console.log(`Error while getting ${endpointName}`, error.request);
    return { message: 'No response received from server.' };
  } else {
    console.log(`Error while getting ${endpointName}`, error.message);
    return { message: 'Something went wrong while processing the request.' };
  }
};