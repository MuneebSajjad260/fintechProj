// import React, { Component } from "react";
// import PushNotification from "react-native-push-notification";


// PushNotification.configure({
//     onNotification: function (notification) {

//         console.log('Local Notification', notification)
//     },
//     popInitialNotification: true,
//     requestPermissions: true,

// });

// PushNotification.createChannel(
//     {
//         channelId: 'channel-id',
//         channelName: 'my channel',
//         channelDescription: 'A channel for notification',
//         playSound: true,
//         soundName: 'default',
//         importance: 10,
//         vibrate: true,
//         vibration: 1000,

//     },
//     created => console.log(`channel created ${created}`)
// );

// export const LocalNotification = () => {

//     PushNotification.localNotification({

//         channelId: 'channel-id',
//         channelName: 'my channel',
//         autoCancel: true,
//         bigText:
//             'This is local notification demo from react native, it will show when expanded',
//         subText: 'Local notification demo',
//         title: 'local notification title',
//         message: "Hey,expand me !!!",
//         playSound: true,
//         soundName: "default",
//         importance: 10,
//         vibrate: true,
//         vibration: 1000,
//         actions: '["Yes", "No"]'
//     })
// };

// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-community/async-storage';
// import PushNotification from 'react-native-push-notification';
// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// }

// const getFcmToken = async () => {

//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   console.log(fcmToken, 'the old token');
//   if (!fcmToken) {
//     try {

//       const fcmToken = await messaging().getToken();
//       //  console.log("hello")
//       if (fcmToken) {
//         console.log(fcmToken, 'the new generated token');
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     } catch (error) {

//       console.log(error, 'error raised in fcm token');
//     }

//   }
// };

// export const notificationListner = async () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
        
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });


//   // messaging().onMessage(async remoteMessage => {


//   //     console.log("received in foreground", remoteMessage)
//   // })

//   messaging().onMessage(async (remoteMessage) => {
//     PushNotification.localNotification({
//       channelId: 'channel-id',
//       channelName: 'my channel',
//       //   message: remoteMessage.notification.body,
//       message: remoteMessage.data.name,
//       title: remoteMessage.notification.title,
//       bigPictureUrl: remoteMessage.notification.android.imageUrl,
//       smallIcon: remoteMessage.notification.android.imageUrl,
//     });
//     console.log('foreground notification ==>>',remoteMessage);
//   });
    


//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );



//       }
//     });
// };

// export const NotificationController = (props) => {
   
       
    
//     return null;
// };