/* eslint-disable no-unused-vars */
import {StatusBar, Text, View, ScrollView} from 'react-native';
import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import {Divider} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Svg from 'react-native-svg';
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import normalize from 'react-native-normalize';
import {ResourceId} from '../../shared/config/resourceId';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import {PlanRequest} from '../../shared/redux/action/PlanRequest';
import {GetSinglePlan} from '../../shared/redux/action/GetSinglePlan';
import {GetSinglePlanMember} from '../../shared/redux/action/GetSinglePlanMember';
import {selectResourceData} from '../../shared/redux/slices/planResourceDataSlice';
import {
  selectStartDateSelectionDD,
  selectEndDateSelectionDD,
  selectNoOfMonths,
} from '../../shared/redux/slices/DateSlice';
import {selectSelectedDedicatedDeskMembers} from '../../shared/redux/slices/memberSelectionSlice';
import {AppTheme} from '../../shared/theme';
import DedicatedDeskCard from '../../shared/components/DedicatedDeskCard/DedicatedDeskCard';
import styles from './DedicatedDeskSummaryScreen.style';
import {PrimaryButton, SecondaryButton} from '../../shared/components';
import Duration from '../../assets/images/duration.js';
import Team from '../../assets/images/team.js';
import Paymentsummary from '../../assets/images/paymentSummary.js';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Strings from '../../shared/constants/Strings';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Botton from '../../shared/components/core/Botton';

const DedicatedDeskSummaryScreen = ({navigation, route}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const dispatch = useDispatch();

  const singlePlanLead = useSelector(state => state?.getSinglePlan?.data?.data);
  const singlePlanMember = useSelector(
    state => state?.getSinglePlanMember?.data?.data,
  );
  console.log('GET SINGLE PLAN LEAD----', singlePlanLead);
  console.log('GET SINGLE PLAN MEMBER----', singlePlanMember);

  const singlePlanLeadPending = useSelector(
    state => state?.getSinglePlan?.loading,
  );
  const singlePlanMemberPending = useSelector(
    state => state?.getSinglePlanMember?.loading,
  );
  const PlanRequestPending = useSelector(state => state?.planRequest?.loading);
  const resourcePlan = useSelector(state => state?.resourcePlan);
  const resourcePlanData = useSelector(state => state?.resourcePlan?.data);
  console.log('allResources', resourcePlan);
  console.log('---all--Resources---,', resourcePlanData);

  const teamMembers = useSelector(state => state?.getTeam);
  const teammembersdata = teamMembers?.data;
  const teamMemberTeams = teammembersdata[0]?.Team;
  console.log('All members 11---', teamMemberTeams);

  const dedicatedDeskSelectedMembers = useSelector(
    selectSelectedDedicatedDeskMembers,
  );
  console.log('SelectedMembers 22---', dedicatedDeskSelectedMembers);

  const {planId, expectedDate, selectedDate} = route.params;
  console.log('planID-999---', planId, '---', expectedDate);

  const resourceData = useSelector(selectResourceData);
  console.log('Resource Data DD--', resourceData);

  const months = useSelector(selectNoOfMonths);
  console.log('months---', months);

  // const startDate = useSelector(selectStartDateSelectionDD);
  const startDate = selectedDate;
  const endDate = useSelector(selectEndDateSelectionDD);
  console.log('startDate--->', startDate);
  console.log('END DATE----->', endDate);
  const enddate = new Date(`${startDate} 23:59 UTC`).toISOString();
  console.log('Iso format start date----->', enddate);

  let resPlan = resourcePlanData?.find(
    planName => planName.ResourceId === ResourceId.dedicatedDesk,
  );
  let memberTerrif = resPlan?.ResourcePlan;
  console.log('plann------->', memberTerrif);

  const [dedicatedDeskPrice, setDedicatedDeskPrice] = useState(0);
  const [memberPlanFee, setMemberPlanFee] = useState(0);
  const [leadPlanFee, setLeadPlanFee] = useState(0);
  const [totalPlanFee, setTotalPlanFee] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  //hadling desk price , plan fee and total payable
  const handlePrice = () => {
    console.log(
      'selected members for price------',
      dedicatedDeskSelectedMembers,
    );
    console.log(
      'selected members for price Length------',
      dedicatedDeskSelectedMembers.length,
    );
    console.log('Lead desk price----', singlePlanLead?.Price);
    console.log('Member desk price----', singlePlanMember?.Price);

    const membersDeskPrice =
      singlePlanMember?.Price * (dedicatedDeskSelectedMembers.length - 1);
    let totalPrice;
    if (planId === 'Monthly') {
      totalPrice = membersDeskPrice * months + singlePlanLead?.Price * months;
      console.log('total price-------', totalPrice);
      setDedicatedDeskPrice(totalPrice);
    } else {
      totalPrice = membersDeskPrice + singlePlanLead?.Price;
      console.log('total price-------', totalPrice);
      setDedicatedDeskPrice(totalPrice);
    }

    if (singlePlanMember?.SignUpFee == null) {
      const planFeeMember = 0;
      console.log('Plan fee member----', planFeeMember);
      setMemberPlanFee(planFeeMember);
    } else {
      const planFeeMember = singlePlanMember?.SignUpFee;
      console.log('Plan fee member----', planFeeMember);
      setMemberPlanFee(planFeeMember);
    }

    if (singlePlanLead?.SignUpFee == null) {
      const planFeeLead = 0;
      console.log('Plan fee lead----', planFeeLead);
      setLeadPlanFee(planFeeLead);
    } else {
      const planFeeLead = singlePlanLead?.SignUpFee;
      console.log('Plan fee lead----', planFeeLead);
      setLeadPlanFee(planFeeLead);
    }
    if (planId === 'Monthly') {
      const PlanFee = memberPlanFee * months + leadPlanFee * months;
      setTotalPlanFee(PlanFee);
      console.log('total plan fee------', totalPlanFee);
    } else {
      const PlanFee = memberPlanFee + leadPlanFee;
      setTotalPlanFee(PlanFee);
      console.log('total plan fee------', totalPlanFee);
    }

    console.log('desk price------', totalPrice);
    const tPayable = totalPlanFee + totalPrice;
    console.log('t payable------', tPayable);
    setTotalPayable(tPayable);
    console.log('total payable----', totalPayable);
  };

  const bottomSheetrequestSubmit = useRef(null);
  const [teamLead, setTeamLead] = useState([]);

  const snapPoints = useMemo(() => ['20%'], []);
  const renderBackdropBottomSheet = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        BackdropPressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    // eslint-disable-next-line no-unused-vars
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const item = {id: 1, officeNo: 'Dedicated Desk', Capacity: 1};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.summaryScreen,
    });
  }, []);

  //getting team administrator
  const selectTeamLead = () => {
    if (
      dedicatedDeskSelectedMembers.some(item => item?.isAdministrator === true)
    ) {
      let lead = dedicatedDeskSelectedMembers.filter(
        item => item?.isAdministrator === true,
      );
      setTeamLead(lead);
      console.log('teamLeadName----->>>>', teamLead);
    }
  };

  // posting plan request api on submit request button
  const onSubmit = data => {
    console.warn('Outside finding Desk:----------------', data);
    dispatch(PlanRequest(data))
      .unwrap()
      .then(result => {
        console.log('result--desk summar plan--', result);
        navigation.navigate(ScreensName.dedicatedDeskRequestSentScreen);
      })
      .catch(error => {
        console.log('desk plan error--', error);
      });

    bottomSheetrequestSubmit.current?.close();
  };

  useEffect(() => {
    console.log('--SELECTED MEMBERS 44--', dedicatedDeskSelectedMembers);
    selectTeamLead();
  }, []);
  useEffect(() => {
    // handleRequestData()
    handlePrice();
  }, [singlePlanLead, singlePlanMember]);

  //getting team lead and team member plan data on basis of terrif id
  useEffect(() => {
    dispatch(
      GetSinglePlan(
        planId === 'Monthly'
          ? memberTerrif?.TeamLeadMonthlyPlan?.id
          : memberTerrif?.TeamLeadYearlyPlan?.id,
      ),
    )
      .then(result => {
        console.log('GetSinglePlan  result---', result);
      })
      .catch(err => {
        console.log('GetSinglePlan error---', err);
      });
    dispatch(
      GetSinglePlanMember(
        planId === 'Monthly'
          ? memberTerrif?.TeamMemberMonthlyPlan?.id
          : memberTerrif?.TeamMemberYearlyPlan?.id,
      ),
    )
      .then(result => {
        console.log('GetSinglePlanMember---', result);
      })
      .catch(err => {
        console.log('GetSinglePlanMember---', err);
      });
  }, []);
  return (
    <Frame screenTitle={'Summary'}>
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}>
          {/* Dedicated desk card */}
          <View style={styles.officeCard}>
            <DedicatedDeskCard item={item} />
          </View>

          <View style={styles.subContainer}>
            <View style={styles.flexDirectionRow}>
              <View>
                <Duration stroke={isDarkMode ? AppTheme.COLORS.white : null} />
              </View>
              <View>
                <Txt style={styles.maintitle}>{Strings.duration}</Txt>

                <Txt style={styles.expectedDates}>{Strings.expectedDates}</Txt>

                <View style={styles.dateRangetextContainer}>
                  <Txt
                    style={[styles.dateRangetext, {paddingLeft: normalize(8)}]}>
                    {startDate}
                  </Txt>
                  <Txt
                    style={[
                      styles.dateRangetext,
                      {
                        fontFamily: AppTheme.FONTS.TYPE.BOLD,
                        color: AppTheme.COLORS.black,
                      },
                    ]}>
                    To
                  </Txt>
                  <Txt style={styles.dateRangetext}>{expectedDate}</Txt>
                </View>
              </View>
            </View>
          </View>
          <Divider style={styles.divider} />
          {teamLead.map(item => (
            // eslint-disable-next-line react/jsx-key
            <View style={styles.subContainer}>
              {console.log('show888---', item)}
              <View style={styles.flexDirectionRow}>
                <View>
                  <Team stroke={isDarkMode ? AppTheme.COLORS.white : null} />
                </View>

                <View style={styles.teamContainer}>
                  <Txt style={[styles.maintitle, {marginLeft: normalize(0)}]}>
                    {Strings.team}
                  </Txt>
                  <Txt style={styles.selectedTeamMember}>
                    {Strings.selectedTeamMember}
                  </Txt>

                  <View
                    style={[
                      styles.flexDirectionRow,
                      {marginTop: normalize(8), alignItems: 'center'},
                    ]}>
                    <Feather
                      name="user"
                      size={15}
                      color={
                        isDarkMode
                          ? AppTheme.COLORS.lightGrey
                          : AppTheme.COLORS.purple
                      }
                    />
                    <Txt style={styles.teamName}>{item.fullName}</Txt>
                  </View>
                  <View
                    style={[
                      styles.flexDirectionRow,
                      {marginTop: normalize(2), marginLeft: normalize(35)},
                    ]}>
                    <View style={styles.teamRoleContainer}>
                      <Txt style={styles.teamRole}>Administrator</Txt>
                    </View>
                    {item?.isPayingMember === true ? (
                      <View
                        style={[
                          styles.teamRoleContainer,
                          {
                            marginLeft: normalize(8),
                            backgroundColor: AppTheme.COLORS.purple,
                          },
                        ]}>
                        <Txt style={styles.teamRole}>Paying member</Txt>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          ))}

          <Divider style={styles.innerDivider} />
          {dedicatedDeskSelectedMembers?.map(item => (
            // eslint-disable-next-line react/jsx-key
            <View>
              {console.log('show9999---', item)}
              {item?.isAdministrator === false ? (
                <View>
                  <View
                    style={[
                      styles.flexDirectionRow,
                      {marginTop: normalize(14), marginLeft: normalize(55)},
                    ]}>
                    <Feather
                      name="user"
                      size={15}
                      color={
                        isDarkMode
                          ? AppTheme.COLORS.lightGrey
                          : AppTheme.COLORS.purple
                      }
                    />
                    <Txt style={styles.teamMember}>{item.fullName}</Txt>
                  </View>
                  {item?.isPayingMember === true && (
                    <View style={styles.payingMemberContainer}>
                      <Txt style={styles.payingMemberTxt}>Paying member</Txt>
                    </View>
                  )}
                </View>
              ) : null}
            </View>
          ))}

          <Divider style={styles.divider} />
          <View style={styles.subContainer}>
            <View style={styles.flexDirectionRow}>
              <View>
                <Svg width={'100%'}>
                  <Paymentsummary
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}
                  />
                </Svg>
              </View>
              <View>
                <Txt style={styles.maintitle}>{Strings.payment}</Txt>
                <Txt style={styles.finalPaymentText}>
                  {Strings.finalPayment}
                </Txt>
              </View>
            </View>

            <View
              style={[
                styles.paymentContainer,
                {
                  backgroundColor: isDarkMode
                    ? AppTheme.COLORS.wrapperDarkModeBg
                    : 'rgba(0, 0, 0, 0.04)',
                },
              ]}>
              <View
                style={[
                  styles.flexDirectionRow,
                  {
                    justifyContent: 'space-between',
                  },
                ]}>
                <Txt
                  style={[
                    styles.paymentContainerHeadings,
                    {
                      color: isDarkMode
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(0, 0, 0, 0.5)',
                    },
                  ]}>
                  Plan
                </Txt>
                <Txt style={styles.paymentContainerValues}>{planId}</Txt>
              </View>

              <View
                style={[
                  styles.flexDirectionRow,
                  {
                    justifyContent: 'space-between',
                    marginTop: normalize(8),
                  },
                ]}>
                <Txt
                  style={[
                    styles.paymentContainerHeadings,
                    {
                      color: isDarkMode
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(0, 0, 0, 0.5)',
                    },
                  ]}>
                  Dedicated Desk
                </Txt>

                <ShimmerPlaceHolder
                  visible={
                    singlePlanLeadPending === false &&
                    singlePlanMemberPending === false
                  }
                  shimmerStyle={styles.shimmerDesk}></ShimmerPlaceHolder>

                <Txt
                  accessibilityLabel="deskPrice"
                  style={styles.paymentContainerValues}>
                  {singlePlanLeadPending === false &&
                  singlePlanMemberPending === false
                    ? `SAR ${dedicatedDeskPrice}`
                    : null}
                </Txt>
              </View>
            </View>

            <View
              style={[
                styles.paymentContainer,
                {
                  marginTop: normalize(8),
                  backgroundColor: isDarkMode
                    ? AppTheme.COLORS.wrapperDarkModeBg
                    : 'rgba(0, 0, 0, 0.04)',
                },
              ]}>
              <View
                style={[
                  styles.flexDirectionRow,
                  {
                    justifyContent: 'space-between',
                  },
                ]}>
                <Txt
                  style={[
                    styles.paymentContainerHeadings,
                    {
                      color: isDarkMode
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(0, 0, 0, 0.5)',
                    },
                  ]}>
                  VAT 15%
                </Txt>
                <Txt style={styles.paymentContainerValues}>0</Txt>
              </View>

              <View
                style={[
                  styles.flexDirectionRow,
                  {
                    justifyContent: 'space-between',
                    marginTop: normalize(8),
                  },
                ]}>
                <Txt
                  style={[
                    styles.paymentContainerHeadings,
                    {
                      color: isDarkMode
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(0, 0, 0, 0.5)',
                    },
                  ]}>
                  Plan fee
                </Txt>
                <ShimmerPlaceHolder
                  visible={
                    singlePlanLeadPending === false &&
                    singlePlanMemberPending === false
                  }
                  shimmerStyle={styles.shimmerPlanFee}></ShimmerPlaceHolder>
                <Txt
                  accessibilityLabel="planFee"
                  style={styles.paymentContainerValues}>
                  {singlePlanLeadPending === false &&
                  singlePlanMemberPending === false
                    ? totalPlanFee
                    : null}
                </Txt>
              </View>
              <Divider
                style={[
                  styles.innerDivider,
                  {marginLeft: normalize(0), marginRight: normalize(0)},
                ]}
              />

              <View
                style={[
                  styles.flexDirectionRow,
                  {
                    justifyContent: 'space-between',
                    marginTop: normalize(14),
                  },
                ]}>
                <Txt style={styles.totalPayableText}>Total payable</Txt>
                <ShimmerPlaceHolder
                  visible={
                    singlePlanLeadPending === false &&
                    singlePlanMemberPending === false
                  }
                  shimmerStyle={
                    styles.shimmerTotalPayable
                  }></ShimmerPlaceHolder>
                <Txt
                  accessibilityLabel="totalPayable"
                  style={[
                    styles.totalPayableValue,
                    {
                      color: isDarkMode
                        ? AppTheme.COLORS.white
                        : AppTheme.COLORS.purple,
                    },
                  ]}>
                  {singlePlanLeadPending === false &&
                  singlePlanMemberPending === false
                    ? `SAR ${totalPayable}`
                    : null}
                </Txt>
              </View>
            </View>

            <Botton
              loading={false}
              title={'Submit Request'}
              disabled={false}
              singleButtonStyle={styles.btnStyle}
              onPress={i => {
                bottomSheetrequestSubmit.current?.snapToIndex(0);
              }}
            />
          </View>
        </ScrollView>
      </View>
      <BottomSheet
        ref={bottomSheetrequestSubmit}
        snapPoints={snapPoints}
        backdropComponent={renderBackdropBottomSheet}
        index={-1}
        enablePanDownToClose={true}
        enabledInnerScrolling={true}
        backgroundStyle={{
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : AppTheme.COLORS.white,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#D9D9D966',
        }}>
        <BottomSheetView style={styles.bottomSheetTitle}>
          <Txt style={styles.reqPlan}>{Strings.requestPLan}</Txt>
          <View style={styles.allignInRow}>
            <View style={{width: '100%'}}>
              <Botton
                continueBtnAccessibilityLabel="Yes"
                cancelBtnAccessibilityLabel="No"
                variant={'v2'}
                continueTitle={'Yes'}
                cancelTitle={'No'}
                loading={PlanRequestPending ? true : false}
                onContinue={() => {
                  teamLead?.map(item => {
                    console.log('teamLead items iseeus-----', teamLead);
                    onSubmit({
                      name: item?.fullName,
                      teamId: teamMemberTeams?.Id,
                      planDuration: planId,
                      planType: resourceData?.ResourceName,
                      date: enddate,
                      companyName: teamMemberTeams?.Name,
                      RenewalMonths:
                        planId === 'Monthly' ? parseInt(months) : 1,
                      startDate: enddate,
                      Desk: 0,
                      ResourceTypeId: resourceData?.Id,
                      MemberTarrifId:
                        planId === 'Monthly'
                          ? memberTerrif?.TeamMemberMonthlyPlan?.id
                          : memberTerrif?.TeamMemberYearlyPlan?.id,
                      LeadTarrifId:
                        planId === 'Monthly'
                          ? memberTerrif?.TeamLeadMonthlyPlan?.id
                          : memberTerrif?.TeamLeadYearlyPlan?.id,
                      MemberCancellationLimitDays:
                        singlePlanMember?.CancellationLimitDays === null
                          ? 0
                          : singlePlanMember?.CancellationLimitDays,
                      LeadCancellationLimitDays:
                        singlePlanLead?.CancellationLimitDays === null
                          ? 0
                          : singlePlanLead?.CancellationLimitDays,
                      teamMembers: dedicatedDeskSelectedMembers,
                      price: totalPayable,
                      isMultiple: resourceData?.isMultiple,
                      deskPrice: dedicatedDeskPrice,
                      planFee: totalPlanFee,
                    });
                  });
                }}
                onCancel={() => {
                  bottomSheetrequestSubmit.current?.close();
                }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Frame>
  );
};

export default DedicatedDeskSummaryScreen;
