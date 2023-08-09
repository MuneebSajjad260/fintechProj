/* eslint-disable no-unused-vars */
import { StatusBar, Text, View, Image, ScrollView, SafeAreaView ,BackHandler} from 'react-native';
import React, { useState, useCallback, useLayoutEffect, useRef, useMemo,useEffect } from 'react';
import Svg from 'react-native-svg';

import { useSelector } from 'react-redux';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { Images } from '@themes';
import styles from './DayPassRequestSent.style';
import { PrimaryButton } from '../../shared/components';
import { AppTheme } from '../../shared/theme';
//import OfficeBottomImage from '../../assets/images/office2.svg'
import { ScreensName } from '../../shared/constants/ScreensStrings';
import Strings from '../../shared/constants/Strings';

import RequestSent from '../../assets/images/DayPassRequestSent.js';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import Botton from '../../shared/components/core/Botton';
const DayPassRequestSent = ({ navigation,route }) => {
  const {dayPass,tentative}=route.params;
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  console.log('d-----',dayPass,tentative);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.requestSentScreen
    });
  }, []);

  //preventing going back
  useEffect(() => {
    const backAction = () => {
      return true; // Return true to prevent going back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Frame
      hideBack
      restrictBack
      screenTitle='Request Sent'
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.subContainer}>
          <View style={styles.requestSentImg}>
          
            <RequestSent
              stroke={isDarkMode ? AppTheme.COLORS.white : null} />
           
          </View>
          <Txt style={styles.title}>Your approval is pending!</Txt>
          <Txt style={styles.desc}>Your receipt has been uploaded, and it is review, you will be notified via notification.</Txt>
          <Txt style={styles.desc}>After your payment is confirmed, your booking will be confirmed.</Txt>
          <View style={styles.btnContainer}>
            <Botton
              accessibilityLabel='Home'
              title='Home'
              onPress={() => {
                if(dayPass){
                  navigation.navigate(ScreensName.dayPassHomeScreen);
                }
                else{
                  navigation.navigate(ScreensName.MeetingHomeScreen);
                }
              }}
            />
          </View>
        </View>
        <View style={styles.bottomImageContainer}>
          <Svg width={'100%'} >
            <FintechBottomLogo />
          </Svg>

        </View>
      </ScrollView>
  
    </Frame>
  );
};

export default DayPassRequestSent;
