/* eslint-disable no-unused-vars */
import {
  StatusBar,
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

import Wrapper from '../../shared/components/core/Wrapper';
import {selectResourceData} from '../../shared/redux/slices/planResourceDataSlice';
import {AppTheme} from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import styles from './DedicatedDeskScreenOne.style';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import StepComponent from '../../shared/components/stepComponent/StepComponent';
import {AppText} from '../../shared/components';
import {servicesData} from '../../shared/datasets/privateOfficeScreen1Data';
import NotificationIcon from '../../assets/images/notificationIcon.js';
import Note from '../../assets/images/Note.js';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';

const DedicatedDeskScreenOne = ({route}) => {
  const navigation = useNavigation();
  const {dedicatedDesk} = route.params;
  const resourceData = useSelector(selectResourceData);
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  console.log('Resource Data DD--', resourceData);

  return (
    <Frame mode="View">
      <View style={styles.mainContainer}>
        {/* STEPPER */}
        <View style={styles.headerContainer}>
          <StepComponent
            stepOne={'isActive'}
            stepTwo={false}
            stepThree={false}
            dedicatedDesk={true}
          />
        </View>

        <View style={styles.subContainer}>
          <View
            // showsVerticalScrollIndicator={false}
            style={styles.scrollViewContainer}>
            <Txt style={styles.title}>{Strings.SelectPaymentplan}</Txt>
            {resourceData?.isMonthAllow ? (
              <Wrapper
                isPressable={true}
                style={[
                  styles.wrapperStyle,
                  {
                    backgroundColor: isDarkMode
                      ? AppTheme.COLORS.wrapperDarkModeBg
                      : AppTheme.COLORS.black,
                  },
                ]}
                onPress={() => {
                  navigation.navigate(ScreensName.dedicatedDeskScreenTwo, {
                    planId: 'Monthly',
                    startMonth: resourceData?.startMonth,
                    monthRange: resourceData?.monthRange,
                  });
                }}>
                <View style={styles.monthleOrYearlyCard}>
                  <View style={styles.allignInRow}>
                    <Txt style={styles.monthlyTxt}>{Strings.Monthly}</Txt>
                    <View style={styles.allignInCol}>
                      <View style={styles.allignInRow}>
                        <Txt style={styles.SARtext}>{Strings.SAR}</Txt>
                        <Txt style={styles.price}>
                          {resourceData?.minmonth}
                        </Txt>
                      </View>
                      <Txt style={styles.deskTxt}>
                        {Strings.perDesk}
                      </Txt>
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
                        <Txt style={styles.servicesTxt}>
                          {item?.title}
                        </Txt>
                      </View>
                    ))}
                  </View>
                  <View style={styles.allignInRow}>
                    <View style={styles.marginTop}>
                      <NotificationIcon
                        stroke={isDarkMode ? AppTheme.COLORS.white : null}
                      />
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
                </View>
              </Wrapper>
            ) : null}

            {resourceData?.isYearAllow ? (
              <Wrapper
                style={[
                  styles.wrapperStyle,
                  {
                    backgroundColor: isDarkMode
                      ? AppTheme.COLORS.wrapperDarkModeBg
                      : AppTheme.COLORS.black,
                  },
                ]}
                isPressable={true}
                onPress={() => {
                  navigation.navigate(ScreensName.dedicatedDeskScreenTwo, {
                    planId: 'Yearly',
                    startMonth: resourceData?.startMonth,
                    monthRange: resourceData?.monthRange,
                  });
                }}>
                <View style={styles.monthleOrYearlyCard}>
                  <View style={styles.allignInRow}>
                    <Txt style={styles.monthlyTxt}>
                      {Strings.Yearly}
                    </Txt>
                    <View style={styles.allignInCol}>
                      <View style={styles.allignInRow}>
                        <Txt style={styles.SARtext}>{Strings.SAR}</Txt>
                        <Txt style={styles.price}>
                          {resourceData?.minyear}
                        </Txt>
                      </View>
                      <Txt style={styles.deskTxt}>
                        {Strings.perDesk}
                      </Txt>
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
                        <Txt style={styles.servicesTxt}>
                          {item?.title}
                        </Txt>
                      </View>
                    ))}
                  </View>
                  <View style={styles.allignInRow}>
                    <View style={styles.marginTop}>
                      <NotificationIcon
                        stroke={isDarkMode ? AppTheme.COLORS.white : null}
                      />
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
                </View>
              </Wrapper>
            ) : null}

            <View style={styles.bottom}>
              <View style={styles.noteContainer}>
                <View style={[styles.allignInRow, {justifyContent: undefined}]}>
                  <View>
                    {/* <Svg width={'100%'}> */}
                    <Note
                      strokeColor={isDarkMode ? AppTheme.COLORS.white : null} />
                    {/* </Svg> */}
                  </View>
                  <Txt style={styles.Note}>{Strings.Note}</Txt>
                </View>
                <Txt style={styles.noteDescription}>
                  {Strings.finalPriceCalculated}
                </Txt>
                <Txt
                  style={[styles.noteDescription, {marginTop: normalize(10)}]}>
                  {Strings.chargeForEntireOffice}
                </Txt>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Frame>
  );
};
export default DedicatedDeskScreenOne;
