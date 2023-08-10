import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import InternetConnectivity from '../InternetConnectivity/InternetConnectivity';
import { ScreensName } from '../../constants/ScreensStrings';
import styles from './AppWrapper.style';

const AppWrapper = ({ children }) => {
  const route = useRoute();

  // Don't show the OfflineNotice component on the first screen
  const shouldShowOfflineNotice = route.name !== ScreensName.SplashScreen;

  return (
    <View style={styles.mainContainer}>
      {shouldShowOfflineNotice && <InternetConnectivity />}
      {children}
    </View>
  );
};

export default AppWrapper;