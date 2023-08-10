/* eslint-disable no-unused-vars */
import { View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import ExploreScreenLogo from '../../assets/images/ExploreScreenLogo.js';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import styles from './ExplorefintechScreen.style';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import { PrimaryView, Touchable } from '../../shared/components';
import fintechApplyData from '../../shared/datasets/exploreFintechData.js';
import { AppTheme } from '../../shared/theme';
import { useState } from 'react';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import Wrapper from '../../shared/components/core/Wrapper';
import FintechBottomLogoDark from '../../assets/images/FintechBottomLogoDark.svg';


const ExploreFintechScreen = () => {
  const navigation = useNavigation();
  const [shouldOpenWebview, setShouldOpenWebview] = useState(false);
  const isDarkMode = useSelector(state=>state?.mode?.colorScheme);
  const tourView = () => {
    return (
      <WebView source={{ uri: 'https://blog.jscrambler.com' }} />
    );
   
  };

  return (

    <Frame
      headerVariant={'v2'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.innerContainer}>

          <View style={styles.loginImg}>
            <View>
              {/* <Svg width={'100%'} > */}
              <ExploreScreenLogo
                stroke={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black} />
              {/* </Svg> */}
            </View>
          </View>
          <View style={styles.subContainer}>

            {
              fintechApplyData.map(item => (
                // eslint-disable-next-line react/jsx-key
                <Touchable
                  onPress={() => {
                    console.log('im membership');
                    navigation.navigate(ScreensName.webview, {
                      item: item.id
                    });
                  }}

                >
                  <Wrapper style={styles.cardContainer}>

                    <Txt style={styles.title}>{item?.title}</Txt>
                    <View style={item.id === 1 ? styles.indicator : item.id === 2 ? [styles.indicator, { backgroundColor: AppTheme.COLORS.purple, }] : [styles.indicator, { backgroundColor: AppTheme.COLORS.officialBlack, }]}></View>
                    <Txt style={styles.desc}>{item?.description}</Txt>

                  </Wrapper>
                </Touchable>

              ))

            }
            {shouldOpenWebview && (
              tourView()
            )}
          </View>

        </View>
        <View style={styles.fintechBottomLogo}>

          <Svg width={'100%'}  >

            {isDarkMode ? <FintechBottomLogoDark/> : 
              <FintechBottomLogo />
            }
          </Svg>

        </View>

      </ScrollView>
      {/* </SafeAreaView> */}
    </Frame>
  );
};

export default ExploreFintechScreen;