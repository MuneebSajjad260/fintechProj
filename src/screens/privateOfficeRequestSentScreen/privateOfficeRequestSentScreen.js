import {
  StatusBar,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from 'react-native';

import React, {useLayoutEffect, useEffect} from 'react';
import Svg from 'react-native-svg';

import styles from './privateOfficeRequestSentScreen.style';
import {PrimaryButton} from '../../shared/components';
import {AppTheme} from '../../shared/theme';
import Txt from '../../shared/components/core/Txt';
//import OfficeBottomImage from '../../assets/images/office2.svg'
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Strings from '../../shared/constants/Strings';

import RequestSent from '../../assets/images/RequestSent.js';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import {useSelector} from 'react-redux';
import Frame from '../../shared/components/core/Frame';
import Botton from '../../shared/components/core/Botton';

const RequestSentScreen = ({navigation}) => {
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
    <Frame hideBack={true} restrictBack={true}
      screenTitle={'Request Sent'}>
      {/* <SafeAreaView style={styles.safeAreaContainer}> */}
      {/* <StatusBar backgroundColor={AppTheme.COLORS.black} /> */}
      <View style={styles.mainContainer}>
        {/* <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}> */}
        <View style={styles.subContainer}>
          <View style={styles.requestSentImg}>
            {/* <Svg width={'100%'} > */}
            <RequestSent stroke={isDarkMode ? AppTheme.COLORS.white : null} />
            {/* </Svg> */}
          </View>
          <Txt style={styles.title}>{Strings.thatAll}</Txt>
          <Txt style={styles.desc}>{Strings.privateOfficeRequestHasSent}</Txt>
          <Txt style={styles.desc}>{Strings.hearFromUsSoon}</Txt>
          <View style={styles.btnContainer}>
            <Botton
              title="Go to homepage"
              onPress={() => {
                navigation.navigate(ScreensName.HomeScreen);
              }}
            />
          </View>
        </View>
        <View style={styles.bottomImageContainer}>
          <Svg width={'100%'}>
            <FintechBottomLogo />
          </Svg>
        </View>
        {/* </ScrollView> */}
      </View>
      {/* </SafeAreaView> */}
    </Frame>
  );
};

export default RequestSentScreen;
