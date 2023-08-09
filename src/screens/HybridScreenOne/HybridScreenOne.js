import {
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import Svg from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { selectResourceData } from '../../shared/redux/slices/planResourceDataSlice';
import { AppTheme } from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import styles from './HybridScreenOne.style';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import StepComponent from '../../shared/components/stepComponent/StepComponent';
import {AppText} from '../../shared/components';
import {servicesData} from '../../shared/datasets/privateOfficeScreen1Data';

import NotificationIcon from '../../assets/images/notificationIcon.js';
import Note from '../../assets/images/Note.js';

import Wrapper from '../../shared/components/core/Wrapper';


const HybridScreenOne = ({ route }) => {
  const navigation = useNavigation();
  //GETTING DETAILS OF RESOURCE TYPE HYBRID
  const {hybrid} = route.params;
  console.log('hybridItem------', hybrid);
  const resourceData = useSelector(selectResourceData);
  console.log('Resource data--', resourceData);
  // *Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.hybridScreen,
    });
  }, []);

  return (
    <Frame
      mode="View"
      screenTitle={'Hybrid'}>
      <View style={styles.mainContainer}>
        {/* STEPPER Component */}

        <View style={styles.headerContainer}>
          <StepComponent
            stepOne={'isActive'}
            stepTwo={false}
            stepThree={false}
            stepFour={false}
            hybrid={true}
          />
        </View>

        <View style={styles.subContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <Txt style={styles.title}>{Strings.SelectPaymentplan}</Txt>
            {/* MONTHLY PLAN */}
            {resourceData?.isMonthAllow ?  
             
              <Wrapper style={[styles.monthleOrYearlyCard,{
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.wrapperDarkModeBg
                  : AppTheme.COLORS.black,
              },]}
              isPressable={true}
              onPress={() => {
                navigation.navigate(ScreensName.hybridScreenTwo, {
                  planId: 'Monthly',
                  startMonth:resourceData?.startMonth,
                  monthRange:resourceData?.monthRange
                });
              }}

              >
                <View style={styles.allignInRow}>
                  <Txt style={styles.monthlyTxt}>{Strings.Monthly}</Txt>
                  <View style={styles.allignInCol}>
                    <View style={styles.allignInRow}>
                      <Txt style={styles.SARtext}>{Strings.SAR}</Txt>
                      <Txt style={styles.price}>{resourceData?.minmonth}</Txt>
                    </View>
                    <Txt style={styles.deskTxt}>{Strings.perDesk}</Txt>
                  </View>
                </View>
                <View style={styles.servicesContainer}>
                  {servicesData.map((item, index) =>
                    <View style={styles.services} key={index}>
                      <Feather name="check" size={16} color={AppTheme.COLORS.yellow} />
                      <Txt style={styles.servicesTxt}>{item?.title}</Txt>
                    </View>
                  )}
                </View>
                <View style={styles.allignInRow}>
                  <View style={styles.marginTop}>
                    {/* <Svg width={'100%'}  > */}
                    <NotificationIcon
                      stroke={ isDarkMode ?  AppTheme.COLORS.white : null}
                    />
                    {/* </Svg> */}
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Txt style={styles.priceTxt}>
                      {Strings.minimumComitmentMonthly}
                    </Txt>

                    <Txt style={styles.priceTxt}>
                      {Strings.cancellationRequestedMonthly}
                    </Txt>
                  </View>
                </View>
              </Wrapper>
             
              : null}
            {/* YEARLY PLAN */}
            {resourceData?.isYearAllow ? 
             
              <Wrapper style={[styles.monthleOrYearlyCard,{
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.wrapperDarkModeBg
                  : AppTheme.COLORS.black,
              }]}
              isPressable={true}
              onPress={() => {
                navigation.navigate(ScreensName.hybridScreenTwo, {
                  planId: 'Yearly',
                  startMonth:resourceData?.startMonth,
                  monthRange:resourceData?.monthRange
                });
              }}

              >
                <View style={styles.allignInRow}>
                  <Txt style={styles.monthlyTxt}>{Strings.Yearly}</Txt>
                  <View style={styles.allignInCol}>
                    <View style={styles.allignInRow}>
                      <Txt style={styles.SARtext}>{Strings.SAR}</Txt>
                      <Txt style={styles.price}>{resourceData?.minyear}</Txt>
                    </View>
                    <Txt style={styles.deskTxt}>{Strings.perDesk}</Txt>
                  </View>
                </View>
                <View style={styles.servicesContainer}>
                  {servicesData.map((item, index) =>
                    <View style={styles.services} key={index}>
                      <Feather name="check" size={16} color={AppTheme.COLORS.yellow} />
                      <Txt style={styles.servicesTxt}>{item?.title}</Txt>
                    </View>
                  )}
                </View>
                <View style={styles.allignInRow}>
                  <View style={styles.marginTop}>
                    {/* <Svg width={'100%'}  > */}
                    <NotificationIcon 
                      stroke={ isDarkMode ?  AppTheme.COLORS.white : null}/>
                    {/* </Svg> */}
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Txt style={styles.priceTxt}>
                      {Strings.minimumComitmentYearly}
                    </Txt>

                    <Txt style={styles.priceTxt}>
                      {Strings.cancellationRequestedYearly}
                    </Txt>
                  </View>
                </View>

              </Wrapper>
              : null}
            {/* BOTTOM NOTE */}

            <View style={styles.bottom}>
              <View style={styles.noteContainer}>
                <View style={[styles.allignInRow, {justifyContent: undefined}]}>
                  <View>
                    {/* <Svg width={'100%'}> */}
                    <Note
                      strokeColor={AppTheme.COLORS.white} />
                    {/* </Svg> */}
                  </View>
                  <Txt style={styles.Note}>{Strings.Note}</Txt>

                </View>
                <Txt style={styles.noteDescription}>{Strings.finalPriceCalculated}</Txt>
                <Txt style={[styles.noteDescription, { marginTop: normalize(10) }]}>{Strings.chargeForEntireOffice}</Txt>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Frame>

  );
};
export default HybridScreenOne;
