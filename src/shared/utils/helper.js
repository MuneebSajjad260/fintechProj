const moment = require('moment');

export const reverseString = str => {
  var newString = '';
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
};

export const removeHtmlTags = text => {
  return text.replace(/(<([^>]+)>|&nbsp;|&amp;)/gi, '');
};

export function convertMinToHrAndMin(minutes) {
  if (minutes < 30) {
    return `${minutes} m`;
  } else if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;

    if (minutesRemainder === 0) {
      return `${hours} h`;
    }

    const formattedHours = (hours + minutesRemainder / 60).toFixed(1);
    return `${formattedHours} h`;
  } else {
    return `${minutes} m`;
  }
}

export function getRandomInt(min, max) {
  //* Check if the input parameters are valid
  if (typeof min !== 'number' || typeof max !== 'number' || min >= max) {
    throw new Error('Invalid input parameters');
  }

  //* Calculate the random integer
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//* Timeline Frame Width Calculator Function
export const calculateWidth = (selected_duration, duration) => {
  const scaleFactor = selected_duration / duration[0]; //* Scale factor based on the selected item and the reference item
  // console.log(duration, selected_duration);
  if ([90, 120].includes(selected_duration)) {
    const maxWidth = 50;
    //* Calculate the scaled width
    const scaledWidth = maxWidth * scaleFactor;
    return scaledWidth;
  } else {
    const maxWidth = 60;
    //* Calculate the scaled width
    const scaledWidth = maxWidth * scaleFactor;
    return scaledWidth;
  }
};

//* TimeLine Logic start
export const getDefaultTimeRange = (currentTime, selectedDuration) => {
  const currentMinute = moment(currentTime).minutes();
  let selectedTime;

  //* Check if the current minute is exactly "30" or "0"
  if (currentMinute === 30 || currentMinute === 0) {
    selectedTime = moment(currentTime).seconds(0);
  } else {
    const isCurrentMinuteLessThan30 = currentMinute < 30;
    if (isCurrentMinuteLessThan30) {
      selectedTime = moment(currentTime).minutes(30).seconds(0);
    } else {
      selectedTime = moment(currentTime).add(1, 'hour').minutes(0).seconds(0);
    }
  }

  const startTime = moment(selectedTime).format('h:mm');
  const endTime = moment(selectedTime)
    .clone()
    .add(selectedDuration, 'minutes')
    .format('h:mm A');

  return `${startTime} - ${endTime}`;
};

export function convertTimeTo24HourFormat(time) {
  const formattedTime = moment(time, 'h:mm')
    .add(time.includes('PM') ? 12 : 0, 'hours')
    .format('H.mm');  
  let correctedTime = formattedTime.replace('.30', '.5').replace('.00', '');
  if (correctedTime.startsWith('0.')) {
    correctedTime = '12' + correctedTime.slice(1);
  }
  
  return correctedTime;
}

export function getTimeRangeIn24HourFormat(currentDate, selectedDurationBtn) {
  const timeRange = getDefaultTimeRange(currentDate, selectedDurationBtn);
  const time = timeRange.split(' ');
  const startTimeIn24HourFormat = convertTimeTo24HourFormat(
    `${time[0] + time[3]}`,
    );
    const endTimeIn24HourFormat = convertTimeTo24HourFormat(
      `${time[2] + time[3]}`,
      );
  // console.log("Formatted Time is Ready to Pass :--------------", `${time[0]+ time[3]} - ${time[2]+ time[3]}`, startTimeIn24HourFormat, endTimeIn24HourFormat)
  return [startTimeIn24HourFormat, endTimeIn24HourFormat];
}

//* Data
export const duration = [30, 60, 90, 120];
export const recurring = [
  {id: 0, recurringDay: 'Everyday', isSelected: false},
  {id: 1, recurringDay: 'Every Week', isSelected: false},
  {id: 2, recurringDay: 'Every 2 Weeks', isSelected: false},
  {id: 3, recurringDay: 'Every Month', isSelected: false},
];
//* TimeLine Logic end
