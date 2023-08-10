import {Dimensions} from 'react-native';
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

export const scale = (number, isWith) => {
  // Get the device's screen dimensions
  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;

  // Determine the width and height based on the device orientation
  const width = Math.min(deviceWidth, deviceHeight);
  const height = Math.max(deviceWidth, deviceHeight);

  // Scale the number based on the provided dimension
  if (isWith) {
    return number * (width / DESIGN_WIDTH);
  } else {
    return number * (height / DESIGN_HEIGHT);
  }
};

/**
 * Helper function to scale a given number based on the device's screen dimensions.
 * This function is useful for responsive design, where you want to scale UI elements
 * proportionally across different devices.
 *
 * @param {number} number - The number to be scaled.
 * @param {boolean} isWith - Determines whether to scale based on width (true) or height (false).
 * @returns {number} The scaled number.
 */