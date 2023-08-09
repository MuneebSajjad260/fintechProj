import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import RootContainer from './src/main/RootContainer';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/shared/redux/store/Store';
//* Notifications
import {notificationListener} from './src/shared/utils/notificationService';
import notifee, {EventType} from '@notifee/react-native';
import NavigationService from './src/routes/NavigationService';
import {ScreensName} from './src/shared/constants/ScreensStrings';
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  useEffect(() => {
    notificationListener();
  }, []);

  //* Foreground Notification Listener (Notifee)
  //* Navigate on Screen if Notification is Pressed in Foreground
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          // console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          if (
            detail.notification.data &&
            Object.values(ScreensName).includes(
              detail.notification.data.redirect_to,
            )
          ) {
            setTimeout(() => {
              NavigationService.navigate(detail.notification.data.redirect_to);
            }, 200);
          } else {
            // console.log('Something Went Wrong While Navigating!');
            NavigationService.navigate(ScreensName.NotificationListScreen);
          }
          // console.log('User pressed notification', detail.notification);
          break;
      }
    });


  }, []);
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootSiblingParent> 
          <RootContainer />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
