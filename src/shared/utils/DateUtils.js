import moment from 'moment';

/**
 * Compares the current date with a specified date and returns a boolean.
 * @param {string} date - The specified date in the format 'DD, MMM YYYY'.
 * @returns {boolean} - True if the specified date is in the future; false if it's today or in the past.
 * @throws {Error} - Throws an error if the date parameter is missing or if the date format is invalid.
 */

// Function to format a given date to 'DD, MMM YYYY'
const formatDateToDDMMMYYYY = date => {
  return moment(date).format('DD, MMM YYYY');
};

// Function to check if two dates are the same
const areDatesSame = (date1, date2) => {
  const parsedDate1 = moment(date1, 'DD, MMM YYYY').startOf('day');
  const parsedDate2 = moment(date2, 'DD, MMM YYYY').startOf('day');

  return moment(parsedDate1).isSame(parsedDate2, 'day'); 
};

export const compareDates = date => {
  // Check if the date parameter is provided
  if (!date) {
    throw new Error('Missing date parameter');
  }
  
  const date_ = formatDateToDDMMMYYYY(date);

  // Get the current date
  const currentDate = formatDateToDDMMMYYYY(moment());

  return areDatesSame(date_,currentDate)
};
