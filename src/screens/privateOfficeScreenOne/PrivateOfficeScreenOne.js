import {
  StatusBar,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import Svg from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

import {selectResourceData} from '../../shared/redux/slices/planResourceDataSlice';
import {AppTheme} from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import styles from './PrivateOfficeScreen.Style';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import StepComponent from '../../shared/components/stepComponent/StepComponent';
import {AppText} from '../../shared/components';
import {servicesData} from '../../shared/datasets/privateOfficeScreen1Data';

import NotificationIcon from '../../assets/images/notificationIcon.js';
import Note from '../../assets/images/Note';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Wrapper from '../../shared/components/core/Wrapper';

const PrivateOfficeScreenOne = ({route}) => {
  const navigation = useNavigation();
  const {privateOffice} = route.params;
  console.log('office -Id--', privateOffice);
  // *Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const resourceData = useSelector(selectResourceData);
  console.log('Resource data--', resourceData);
  return (
    <Frame
      mode="View">
 

      {/* stepper Component */}
      <View style={styles.headerContainer}>
        <StepComponent
          stepOne={'isActive'}
          stepTwo={false}
          stepThree={false}
          privateOffice={true}
        />
      </View>

      <View style={styles.subContainer}>
      
        <View>
          <Txt style={styles.title}>{Strings.SelectPaymentplan}</Txt>
          {/* MONTHLY CARD */}
          {resourceData?.isMonthAllow ? (
            <Wrapper
              isPressable
              onPress={() => {
                navigation.navigate(ScreensName.privateOfficeScreenTwo, {
                  planId: 'Monthly',
                  startMonth: resourceData?.startMonth,
                  monthRange: resourceData?.monthRange,
                });
              }}
              style={[
                styles.monthleOrYearlyCard,
                {
                  backgroundColor: isDarkMode
                    ? AppTheme.COLORS.wrapperDarkModeBg
                    : 'rgba(0, 0, 0, 0.9)',
                },
              ]}>
              {/* <CardContainer style={styles.monthleOrYearlyCard}> */}
              <View style={styles.allignInRow}>
                <AppText style={styles.monthlyTxt}>{Strings.Monthly}</AppText>
                <View style={styles.allignInCol}>
                  <View style={styles.allignInRow}>
                    <AppText style={styles.SARtext}>{Strings.SAR}</AppText>
                    <AppText style={styles.price}>
                      {resourceData?.minmonth}
                    </AppText>
                  </View>
                  <AppText style={styles.deskTxt}>{Strings.perDesk}</AppText>
                </View>
              </View>
              <View style={styles.servicesContainer}>
                {servicesData.map((item, index) => (
                  <View style={styles.services} key={index}>
                    <Feather
                      name="check"
                      size={16}
                      color={AppTheme.COLORS.yellow}
                    />
                    <AppText style={styles.servicesTxt}>{item?.title}</AppText>
                  </View>
                ))}
              </View>
              <View style={styles.allignInRow}>
                <View style={styles.marginTop}>
                  {/* <Svg width={'100%'}  > */}
                  <NotificationIcon  stroke={ isDarkMode ?  AppTheme.COLORS.white : null} />
                  {/* </Svg> */}
                </View>
                <View style={styles.descriptionContainer}>
                  <AppText style={styles.priceTxt}>
                    {Strings.minimumComitmentMonthly}
                  </AppText>

                  <AppText style={styles.priceTxt}>
                    {Strings.cancellationRequestedMonthly}
                  </AppText>
                </View>
              </View>
              {/* </CardContainer> */}
            </Wrapper>
          ) : null}
          {/* YEARLY CARD */}
          {resourceData?.isYearAllow ? (
            <Wrapper
              isPressable
              onPress={() => {
                navigation.navigate(ScreensName.privateOfficeScreenTwo, {
                  planId: 'Yearly',
                  startMonth: resourceData?.startMonth,
                  monthRange: resourceData?.monthRange,
                });
              }}
              style={[
                styles.monthleOrYearlyCard,
                {
                  backgroundColor: isDarkMode
                    ? AppTheme.COLORS.wrapperDarkModeBg
                    : 'rgba(0, 0, 0, 0.9)',
                },
              ]}>
              {/* <CardContainer style={styles.monthleOrYearlyCard}> */}
              <View style={styles.allignInRow}>
                <AppText style={styles.monthlyTxt}>{Strings.Yearly}</AppText>
                <View style={styles.allignInCol}>
                  <View style={styles.allignInRow}>
                    <AppText style={styles.SARtext}>{Strings.SAR}</AppText>
                    <AppText style={styles.price}>
                      {resourceData?.minyear}
                    </AppText>
                  </View>
                  <AppText style={styles.deskTxt}>{Strings.perDesk}</AppText>
                </View>
              </View>
              <View style={styles.servicesContainer}>
                {servicesData.map((item, index) => (
                  <View style={styles.services} key={index}>
                    <Feather
                      name="check"
                      size={16}
                      color={AppTheme.COLORS.yellow}
                    />
                    <AppText style={styles.servicesTxt}>{item?.title}</AppText>
                  </View>
                ))}
              </View>
              <View style={styles.allignInRow}>
                <View style={styles.marginTop}>
                  {/* <Svg width={'100%'}> */}
                  <NotificationIcon 
                    stroke={ isDarkMode ?  AppTheme.COLORS.white : null}/>
                  {/* </Svg> */}
                </View>
                <View style={styles.descriptionContainer}>
                  <AppText style={styles.priceTxt}>
                    {Strings.minimumComitmentYearly}
                  </AppText>

                  <AppText style={styles.priceTxt}>
                    {Strings.cancellationRequestedYearly}
                  </AppText>
                </View>
              </View>
              {/* </CardContainer> */}
            </Wrapper>
          ) : null}
        </View>
        {/* BOTTOM NOTE */}
        <View style={styles.bottom}>
          <View style={styles.noteContainer}>
            <View style={[styles.allignInRow, {justifyContent: undefined}]}>
              <View>
                {/* <Svg width={'100%'}  > */}
                <Note strokeColor={AppTheme.COLORS.white} />
                {/* </Svg> */}
              </View>
              <Txt style={styles.Note}>{Strings.Note}</Txt>
            </View>
            <Txt style={styles.noteDescription}>
              {Strings.finalPriceCalculated}
            </Txt>
            <Txt style={[styles.noteDescription, {marginTop: normalize(10)}]}>
              {Strings.chargeForEntireOffice}
            </Txt>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
      {/* </View> */}
    </Frame>
  );
};
export default PrivateOfficeScreenOne;
