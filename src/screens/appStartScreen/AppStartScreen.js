import { View, StatusBar } from 'react-native';
import React from 'react';
import { Svg } from 'react-native-svg';

import { AppTheme } from '@themes';
import { PrimaryButton, SecondaryButton } from '@components'; //absolute paths // aliases
import styles from './AppStartScreen.style';
import { useNavigation } from '@react-navigation/native';
import { ScreensName } from '../../shared/constants/ScreensStrings';

import BottomImage from '../../assets/images/bottomImage.svg';
import Logofint from '../../assets/images/Logofint.svg';

const AppStartScreen = () => {
  const navigation = useNavigation();

  return (<>

    <StatusBar
      backgroundColor={AppTheme.COLORS.primaryBlueBg} barStyle={'light-content'} />
    <View style={styles.container}>
      <View style={{ flex: 1.8 }}>
        <View style={styles.logo}>
          <View>
            <Svg width={'100%'} >
              <Logofint />
            </Svg>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <PrimaryButton
            loading={false}
            title={'Login'}
            disabled={false}
            small={false}
            onPress={() => navigation.navigate('Login')}
          />
          <View style={styles.separator} />
          <SecondaryButton
            loading={false}
            title={'Explore'}
            disabled={false}
            small={false}
            onPress={() => navigation.navigate(ScreensName.exporeFintechScreen)}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.bottomImage}>
          <Svg height={'100%'} width={'100%'} viewBox="65 20 420 100">
            <BottomImage />
          </Svg>
        </View>
      </View>
    </View>
  </>
  );
};

export default AppStartScreen;
