/* eslint-disable no-unused-vars */
import {
  StatusBar,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import Svg from 'react-native-svg';

import {Images} from '@themes';
import styles from './DedicatedDeskRequestSentScreen.style';
import {PrimaryButton} from '../../shared/components';
import {AppTheme} from '../../shared/theme';
//import OfficeBottomImage from '../../assets/images/office2.svg'
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Strings from '../../shared/constants/Strings';

import RequestSent from '../../assets/images/RequestSent.js';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Botton from '../../shared/components/core/Botton';
import {useSelector} from 'react-redux';
const DedicatedDeskRequestSentScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.requestSentScreen,
    });
  }, []);

  const isDarkMode = useSelector(state => state.mode.colorScheme);

  //preventing going back
  useEffect(() => {
    const backAction = () => {
      return true; // Return true to prevent going back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Frame mode={'View'}
      hideBack
      restrictBack
      screenTitle={'Request Sent'}
      //bottomLogo={true}
    >
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.subContainer}>
            <View style={styles.requestSentImg}>
              <RequestSent stroke={isDarkMode ? AppTheme.COLORS.white : null} />
            </View>
            <Txt style={styles.title}>{Strings.thatAll}</Txt>
            <Txt style={styles.desc}>{Strings.dedicatedDeskRequestHasSent}</Txt>
            <Txt style={styles.desc}>{Strings.hearFromUsSoon}</Txt>
            <View style={styles.btnContainer}></View>
            <Botton
              title="Go to homepage"
              onPress={() => {
                navigation.navigate(ScreensName.HomeScreen);
              }}
              singleButtonStyle={styles.btnContainer}
            />
          </View>
          <View style={styles.bottomImageContainer}>
            <View>
              <Svg width={'100%'}>
                <FintechBottomLogo />
              </Svg>
            </View>
          </View>
        </ScrollView>
      </View>
    </Frame>
  );
};

export default DedicatedDeskRequestSentScreen;
