import React from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import normalize from 'react-native-normalize';
import { Svg } from 'react-native-svg';

import style from './waitingScreen.Style';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import { AppTheme } from '../../shared/theme';
import styles from '../privateOfficeSummaryScreen/privateOfficeSummaryScreen.style';
import Strings from '../../shared/constants/Strings';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import { useNavigation } from '@react-navigation/native';
import Waiting from '../../assets/images/waiting.svg';
import FintechHomeLogo from '../../assets/images/fintechHomeLogo.svg';
import MenuIcon from '../../assets/images/menuIcon.svg';
import Schedule from '../../assets/images/schedule.svg';

const EVENTS_DATA = [
  {
    heading: 'Event',
    title: 'Start up pitch event'
  },
  {
    heading: 'Event',
    title: 'Start up pitch event'
  },
  {
    heading: 'Event',
    title: 'Start up pitch event'
  },
  {
    heading: 'Event',
    title: 'Start up pitch event'
  },

];

const PendingScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={style.statusbar} />
      <StatusBar barStyle="light-content" backgroundColor={AppTheme.COLORS.black} />

      <SafeAreaView style={style.mainContainer}>
        <View style={style.headerContainer}>
          <View>
            <Svg width={'100%'} >
              <FintechHomeLogo />
            </Svg>
          </View>
          <View style={styles.headerIcons}>
            <Feather
              size={25}
              color={AppTheme.COLORS.white}
              name="bell"
              style={{ marginRight: normalize(25) }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreensName.mainMenuScreen);
                console.log('im menu icon');
              }

              }
            >

              <MenuIcon />

            </TouchableOpacity>
          </View>

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardContainer} >
            <CardContainer style={style.card}>
              <Text style={style.userNameTxt}>{Strings.Hi} {'Ahmed!'}</Text>
              <Text style={style.welcometitle}>{Strings.welcomeToFintech}</Text>
              <View style={styles.waitingImageContainer}>
                <View>
                  <Svg width={'100%'}>
                    <Waiting />
                  </Svg>
                </View>
              </View>
              <Text style={style.waitToAssignResource}>{Strings.waitToAssignResource}</Text>
            </CardContainer>
            <View style={style.WhatHappeningContainer}>
              <Text style={style.whatshappeningtext}>{Strings.WhatHappening}</Text>
              <Text style={style.viewAllTxt}>{Strings.ViewAll}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={EVENTS_DATA}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 10 }}
              renderItem={({ item }) => {
                return (
                  <View >
                    <CardContainer style={style.smallcard}>
                      <Text style={[style.smallcardheading, { marginBottom: normalize(8) }]}>{item.heading}</Text>
                      <Text style={[style.smallcardtitle, { marginBottom: normalize(24) }]}>{item.title}</Text>
                      <View style={[style.flexDirectionRow, { alignItems: 'center', marginBottom: normalize(10) }]}>
                        <MaterialIcons name="calendar-today" />
                        <Text style={style.smallcardtext}>June 26, 2022 - Sunday</Text>
                      </View>
                      <View style={[style.flexDirectionRow, { justifyContent: 'space-between' }]}>
                        <View style={[style.flexDirectionRow, { justifyContent: 'center' }]}>
                          <View>
                            <Svg width={'100%'}>
                              <Schedule />
                            </Svg>
                          </View>
                          <View>
                            <Text style={style.smallcardtext}>5 pm - 6 pm</Text>
                          </View>
                        </View>
                        <View style={[style.flexDirectionRow, { alignItems: 'center', }]}>
                          <Text style={style.smallcardtitle}>SAR 80</Text>
                          <Text style={style.smallcardsubscript}>/each</Text>
                        </View>
                      </View>
                    </CardContainer>
                  </View>
                );
              }}

            />
          </View>
        </ScrollView>
        <View style={style.scanContainer}>
          <MaterialIcons name="qr-code-scanner"
            size={22}
            color="white" />
          <Text style={style.scantext}>SCAN</Text>
        </View>
      </SafeAreaView >
    </>


  );
};


export default PendingScreen;