import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../routes/NavigationService';
import {ScreensName} from '../constants/ScreensStrings';
import notifee, {AndroidImportance} from '@notifee/react-native';
import { Platform } from 'react-native';

/**
 * Requests user permission for receiving push notifications.
 * This function asks the user for permission to receive push notifications on their device.
 * It returns a Promise that resolves once the permission request is completed.
 */
export async function requestUserPermission() {
  // Request permission from the user
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    // Retrieve and store the FCM token
    return getFcmToken();
  } else {
    return null;
  }
}

/**
 * Retrieves the FCM token and stores it in AsyncStorage.
 * This function retrieves the Firebase Cloud Messaging (FCM) token from the device,
 * which is used to send push notifications.
 * It checks if the token is already stored in AsyncStorage and retrieves it if available.
 * If the token is not available, it generates a new token and stores it in AsyncStorage for future use.
 * The function returns a Promise that resolves once the FCM token is retrieved and stored.
 */
const getFcmToken = async () => {
  // Check if the FCM token is already stored in AsyncStorage
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('FCM OLD Token:--------->', fcmToken);
  if (!fcmToken) {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the FCM token from Firebase Messaging
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('New Gen Token FCM:----------->', fcmToken);
        // Store the FCM token in AsyncStorage for future use
        await AsyncStorage.setItem('fcmToken', fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.log(
        'Error While Getting or Generating FCM Token:------->',
        error,
      );
      return null;
    }
  }

  return fcmToken;
};

/**
 * Initializes the notification listener for handling foreground and background notifications.
 * This function sets up a listener for incoming push notifications.
 * It handles notifications that are received while the app is in the foreground
 * and notifications that caused the app to open from the background or quit state.
 * The function returns a Promise that resolves once the notification listener is set up.
 */
export const notificationListener = async () => {
  //* Handle notification when the app is opened from the background state
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    if (
      remoteMessage?.data &&
      Object.values(ScreensName).includes(remoteMessage.data.redirect_to)
    ) {
      setTimeout(() => {
        NavigationService.navigate(remoteMessage.data.redirect_to);
      }, 200);
    } else {
      console.log('Something Went Wrong While Navigating!');
      NavigationService.navigate(ScreensName.NotificationListScreen);
    }
  });

  //* Handle notification received while the app is in the foreground
  messaging().onMessage(async remoteMessage => {
    console.log('Receiving Foreground Message:--------->', remoteMessage);
    const {data, notification} = remoteMessage;
    onDisplayNotification(data, notification);
  });

  //* Handle notification when the app is opened from the quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        if (
          remoteMessage?.data &&
      Object.values(ScreensName).includes(remoteMessage.data.redirect_to)
        ) {
          setTimeout(() => {
            NavigationService.navigate(remoteMessage.data.redirect_to);
          }, 1000);
        } else {
          console.log('Something Went Wrong While Navigating!');
          setTimeout(() => {
            NavigationService.navigate(ScreensName.NotificationListScreen);
          }, 1000);
        }
      }
    });
};

//* Foreground Notification Module (Notifee) {Use to display notification in foreground}
async function onDisplayNotification(data, notification) {

  //* Request permissions (required for iOS)
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  //* Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'fintech455',
    name: 'Fintech Notification5454',
    sound: 'default',
    importance: AndroidImportance.HIGH
  });

  //* Display a notification
  await notifee.displayNotification({
    title: notification.title,
    body: notification.body,
    data: data,
    android: {
      channelId,
      smallIcon: 'ic_launcher_new',
      pressAction: {
        id: 'default',
      },
    },
  });

}