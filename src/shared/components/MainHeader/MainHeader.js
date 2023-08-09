import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Svg} from 'react-native-svg';
import {AppTheme} from '../../theme';
import styles from './MainHeader.Style';
import FintechLogo from '../../../assets/images/fintechHomeScreenLogo.svg';
import MenuIcon from '../../../assets/images/menuIcon.svg';
import Feather from 'react-native-vector-icons/Feather';
import normalize from 'react-native-normalize';
import {ScreensName} from '../../constants/ScreensStrings';
import {useNavigation} from '@react-navigation/native';

export default function MainHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View>
        <Svg width={'100%'}>
          <FintechLogo />
        </Svg>
      </View>

      <View style={styles.allignInRow}>
        <Feather
          size={25}
          color={AppTheme.COLORS.white}
          name="bell"
          style={{marginRight: normalize(23.6)}}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreensName.mainMenuScreen);
            // console.log("Under Construction!")
          }}>
          <MenuIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
