/* eslint-disable no-unused-vars */
import { StatusBar, Text, View } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import normalize from 'react-native-normalize';
import Svg from 'react-native-svg';

import { AppTheme } from '../../shared/theme';
import styles from './ExperimentalSummaryScreen.style';
import { PrimaryButton } from '../../shared/components';
import Duration from '../../assets/images/duration.svg';
import Team from '../../assets/images/teamandresource.svg';
import Paymentsummary from '../../assets/images/payment.svg';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import User from '../../assets/images/user.svg';

const ExperimentalSummaryScreen = ({ navigation }) => {
  const item = { id: 1, officeNo: 'Private Office 1', btnLabel: 'Monthly Plan', noOfPersons: 5 };
  return (
    <>
      <StatusBar backgroundColor={AppTheme.COLORS.white} barStyle={'dark-content'} />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          <View style={[styles.view, { marginTop: normalize(16) }]}>
            <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
              <View>
                <Svg width={'100%'} >
                  <Team />
                </Svg>
              </View>
              <View>
                <Text style={styles.maintitle}>TEAM AND RESOURCE</Text>
              </View>
            </View>

            <View style={{
              backgroundColor: 'rgba(202, 202, 202, 0.1)', width: '100%',
              height: normalize(264),
              marginTop: normalize(27),
              padding: normalize(18),
              borderRadius: normalize(10)
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Text style={[styles.durationSubTitle, { fontSize: normalize(14), marginTop: 0 }]}>
                                    Private Office 1
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'

                }}>
                  <Text style={[styles.adminandpaymingmembertext, { marginRight: normalize(7) }]}>Max</Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(202, 202, 202, 0.3)',
                    paddingHorizontal: normalize(6),

                    paddingVertical: normalize(4),
                    borderRadius: normalize(10),
                    //marginRight: normalize(10)
                  }}>
                    <Feather
                      name="users"
                      size={20}
                      solid
                      color={AppTheme.COLORS.black}
                    />
                    <Text style={{
                      fontSize: normalize(20),
                      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
                      fontWeight: '500',
                      marginLeft: normalize(5),
                      color: AppTheme.COLORS.black
                    }}>5</Text>
                  </View>
                </View>
              </View>




              <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
                <View>
                  <Svg width={'100%'} marginTop={normalize(10)}>
                    <User />
                  </Svg>
                </View>
                <View>
                  <Text style={[styles.innertext, { marginLeft: normalize(20), }]}>Saqib Ali</Text>
                  <Text style={[styles.adminandpaymingmembertext, { marginLeft: normalize(22), }]}>Admin & Paying Member</Text>
                </View>
              </View>
              <Divider style={styles.teamviewdivider} />
              <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
                <View>
                  <Svg width={'100%'} marginTop={normalize(10)}>
                    <User />
                  </Svg>
                </View>
                <View>
                  <Text style={[styles.innertext, { marginLeft: normalize(20) }]}>Taha Hussain</Text>
                </View>
              </View>
              <Divider style={styles.teamviewdivider} />
              <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
                <View>
                  <Svg width={'100%'} marginTop={normalize(10)}>
                    <User />
                  </Svg>
                </View>
                <View>
                  <Text style={[styles.innertext, { marginLeft: normalize(20) }]}>Amir Rashid</Text>
                </View>
              </View>
              <Divider style={styles.teamviewdivider} />
              <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
                <View>
                  <Svg width={'100%'} marginTop={normalize(10)}>
                    <User />
                  </Svg>
                </View>
                <View>
                  <Text style={[styles.innertext, { marginLeft: normalize(20) }]}>Mohammad Sadiq Alali</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={styles.officeCard}>
                        <PrivateOfficeCard item={item} disabled={true} btnLabel={"Monthly Plan"} />
                    </View> */}
          <Divider style={styles.divider} />
          <View style={styles.view}>
            <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
              <View>
                <Svg width={'100%'} >
                  <Duration />
                </Svg>
              </View>
              <View>
                <Text style={styles.maintitle}>DURATION</Text>
              </View>
            </View>
            <Text style={styles.durationSubTitle}>
                            Expected Dates
            </Text>
            <Text style={styles.innertext}>06 May,2022 - 06 September,2022</Text>
          </View>


          <Divider style={styles.divider} />
          <View style={styles.view}>
            <View style={styles.flexDirectionRow}>
              <View>
                <Svg width={'100%'}  >
                  <Paymentsummary />
                </Svg>
              </View>
              <Text style={styles.maintitle}>PAYMENT</Text>
            </View>
            <View style={[styles.flexDirectionRow,
              {
                justifyContent: 'space-between',
                marginTop: normalize(10)
              }]}>
              <Text style={styles.innertext}>Plan</Text>
              <Text style={styles.innertext}>Monthly</Text>
            </View>
            <Divider style={styles.teamviewdivider} />
            <View style={[styles.flexDirectionRow,
              {
                justifyContent: 'space-between',
                //  marginTop: normalize(10)
              }]}>
              <Text style={styles.innertext}>Private Office</Text>
              <Text style={styles.innertext}>24000</Text>
            </View>
            <View style={[styles.flexDirectionRow,
              {
                justifyContent: 'space-between',
                // marginTop: normalize(10)
              }]}>
              <Text style={styles.innertext}>VAT(15%)</Text>
              <Text style={styles.innertext}>360</Text>
            </View>
            <View style={[styles.flexDirectionRow,
              {
                justifyContent: 'space-between',
                // marginTop: normalize(10),
                //marginBottom: normalize(7)
              }]}>
              <Text style={styles.innertext}>Plan Fees</Text>
              <Text style={styles.innertext}>250</Text>
            </View>
            <Divider style={styles.teamviewdivider} />
            <View style={[styles.flexDirectionRow, { justifyContent: 'space-between', }]}>
              <Text style={styles.paymentsummarytext}>TOTAL PAYABLE</Text>
              <Text style={styles.paymentsummarytext}>SAR 24360</Text>
            </View>

            <PrimaryButton
              loading={false}
              title={'Confirm'}
              disabled={false}
              small={false}
              stylesContainer={styles.btnStyle}
              onPress={() => navigation.navigate(ScreensName.requestSentScreen)}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ExperimentalSummaryScreen;