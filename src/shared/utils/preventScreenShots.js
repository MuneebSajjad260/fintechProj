import { NativeModules, NativeEventEmitter,Platform } from 'react-native';
const { RNScreenshotPrevent } = NativeModules;

var eventEmitter ;

if(Platform.OS === 'android'){
  eventEmitter = new NativeEventEmitter(RNScreenshotPrevent);
} else if (Platform.OS === 'ios') {
  eventEmitter = new NativeEventEmitter(RNScreenshotPrevent);
}
export const preventScreenshots = (prevent) => {
  RNScreenshotPrevent.enabled(prevent);
};

export const addScreenshotListener = (callback) => {
  const subscription = eventEmitter.addListener('screenshotTaken', callback);
  return () => subscription.remove();
};

export const useEnableSecureView = () => {
    RNScreenshotPrevent.enableSecureView();
}

export const useDisableSecureView = () => {
  RNScreenshotPrevent.disableSecureView();
}