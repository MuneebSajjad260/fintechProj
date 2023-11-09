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
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import normalize from 'react-native-normalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import {ResourceId} from '../../shared/config/resourceId';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Botton from '../../shared/components/core/Botton';
import {PlanRequest} from '../../shared/redux/action/PlanRequest';
import {GetSinglePlan} from '../../shared/redux/action/GetSinglePlan';
import {GetSinglePlanMember} from '../../shared/redux/action/GetSinglePlanMember';
import {GetPricingDesk} from '../../shared/redux/action/GetPricingDesk';
import {GetPricingMemberDesk} from '../../shared/redux/action/GetPricingMemberDesk';
import {selectResourceData} from '../../shared/redux/slices/planResourceDataSlice';
// eslint-disable-next-line no-unused-vars
import {
  selectStartDateSelectionHybrid,
  selectEndDateSelectionHybrid,
  selectNoOfMonths,
} from '../../shared/redux/slices/DateSlice';
import {
  selectSelectedPrivateOfficeMembersHybrid,
  selectSelectedDedicatedDeskMembersHybrid,
} from '../../shared/redux/slices/memberSelectionSlice';
import {AppTheme} from '../../shared/theme';
import HybridCard from '../../shared/components/HybridCard/HybridCard';
import styles from './HybridSummaryScreen.style';
import {PrimaryButton, SecondaryButton} from '../../shared/components';
import Duration from '../../assets/images/duration.js';
import Team from '../../assets/images/team.js';
import Paymentsummary from '../../assets/images/paymentSummary.js';

import {ScreensName} from '../../shared/constants/ScreensStrings';
import Strings from '../../shared/constants/Strings';
const HybridSummaryScreen = ({navigation, route}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  // const { planId } = route.params;
  // console.log("planId----", planId)

  const {Allocation, expectedDate, selectedDate, privateOffice, resId} =
    route.params;
  console.log('Allocation----', Allocation);
  const months = useSelector(selectNoOfMonths);
  console.log('months---', months);


  const tax = useSelector(state=> state?.tax?.data)
console.log("tax---",tax,'-',tax?.setting?.isTaxEnable)
  const singlePlanLead = useSelector(state => state?.getSinglePlan?.data?.data);
  const singlePlanMember = useSelector(
    state => state?.getSinglePlanMember?.data?.data,
  );

  const singlePlanLeadDesk = useSelector(
    state => state?.getPricingDesk?.data?.data,
  );
  const singlePlanMemberDesk = useSelector(
    state => state?.getPricingMemberDesk?.data?.data,
  );

  const singlePlanLeadPending = useSelector(
    state => state?.getSinglePlan?.loading,
  );
  const singlePlanMemberPending = useSelector(
    state => state?.getSinglePlanMember?.loading,
  );

  const singlePlanLeadDeskPending = useSelector(
    state => state?.getPricingDesk?.loading,
  );
  const singlePlanMemberDeskPending = useSelector(
    state => state?.getPricingMemberDesk?.loading,
  );

  console.log('GET SINGLE PLAN LEAD----', singlePlanLead);
  console.log('GET SINGLE PLAN MEMBER----', singlePlanMember);

  console.log('GET SINGLE PLAN Desk LEAD----', singlePlanLeadDesk);
  console.log('GET SINGLE PLAN DESK MEMBER----', singlePlanMemberDesk);

  // eslint-disable-next-line no-unused-vars
  const resourcePlan = useSelector(state => state?.resourcePlan);
  const resourcePlanData = useSelector(state => state?.resourcePlan?.data);
  console.log('---all--Resources---,', resourcePlanData);

  const resourceData = useSelector(selectResourceData);
  console.log('Resource Data DD--', resourceData);

  const {privateOfficeId} = route.params;
  console.log('id--11--', privateOfficeId);

  const {planId} = route.params;
  console.log('plan ID 22--', planId);

  // const startDate = useSelector(selectStartDateSelectionPO);
  const startDate = selectedDate;
  const endDate = useSelector(selectEndDateSelectionHybrid);
  console.log('endDate---', endDate);
  console.log('startDate--->', startDate);
  const enddate = new Date(`${startDate} 23:59 UTC`).toISOString();
  console.log('Iso format start date----->', enddate);

  let resPlan = resourcePlanData?.find(
    planName => planName.ResourceId === ResourceId.privateOffice,
  );
  let temp = resPlan?.ResourcePlan;
  let memberTerrif = temp?.resources?.find(
    item => item?.resourceId === privateOfficeId,
  );
  console.log('ress plann ------->', resPlan);
  console.log('plann------->', memberTerrif);

  let resPlanDD = resourcePlanData?.find(
    planName => planName.ResourceId === ResourceId.dedicatedDesk,
  );
  let memberTerrifDD = resPlanDD?.ResourcePlan;
  console.log('ress plann DD------->', resPlanDD);
  console.log('plann DD------->', memberTerrifDD);

  const [teamLead, setTeamLead] = useState([]);
  const selectedMembers = useSelector(selectSelectedPrivateOfficeMembersHybrid);
  const unselectedMembers = useSelector(
    selectSelectedDedicatedDeskMembersHybrid,
  );

  const members = selectedMembers.concat(unselectedMembers);

  console.log('selectedMembers------->', selectedMembers);
  console.log('unselectedMembers------->', unselectedMembers);
  console.log('members------->', members);

  const teamMembers = useSelector(state => state?.getTeam);
  const teammembersdata = teamMembers?.data;
  const teamMemberTeams = teammembersdata[0]?.Team;
  console.log('All members 11---', teamMemberTeams);

  const item = {
    id: 1,
    officeNo: `${privateOffice?.ResourceName} - Hybrid`,
    Capacity: privateOffice?.Capacity,
  };
  const bottomSheetrequestSubmit = useRef(null);

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

  const [dedicatedDeskPrice, setDedicatedDeskPrice] = useState(0);
  const [privateOfficePrice, setPrivateOfficePrice] = useState(0);
  const [memberPlanFee, setMemberPlanFee] = useState(0);
  const [leadPlanFee, setLeadPlanFee] = useState(0);
  const [totalPlanFee, setTotalPlanFee] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  //hadling desk price and private office price, plan fee and total payable
  const handlePrice = () => {
    console.log('selected members for price------', selectedMembers);
    console.log(
      'selected members for price Length------',
      selectedMembers.length,
    );
    console.log('Lead office price----', singlePlanLead?.Price);
    console.log('Member office price----', singlePlanMember?.Price);

    console.log('Lead Desk price----', singlePlanLeadDesk?.Price);
    console.log('Member Desk price----', singlePlanMemberDesk?.Price);

    const membersOfficePrice =
      singlePlanMember?.Price * (selectedMembers.length - 1);
    // const totalPrice = membersOfficePrice + singlePlanLead?.Price;
    // console.log('total price-------', totalPrice);
    // setPrivateOfficePrice(totalPrice);

    let totalPrice;
    if (planId === 'Monthly') {
      totalPrice = membersOfficePrice * months + singlePlanLead?.Price * months;
      console.log('total price-------', totalPrice);
      setPrivateOfficePrice(totalPrice);
    } else {
      totalPrice = membersOfficePrice + singlePlanLead?.Price;
      console.log('total price-------', totalPrice);
      setPrivateOfficePrice(totalPrice);
    }

    const membersDeskPrice =
      singlePlanMemberDesk?.Price * (unselectedMembers.length - 1);
    // const totalPriceDesk = membersDeskPrice + singlePlanLeadDesk?.Price;
    // console.log('total price-------', totalPriceDesk);
    // setDedicatedDeskPrice(totalPriceDesk);

    let totalPriceDesk;
    if (planId === 'Monthly') {
      totalPriceDesk =
        membersDeskPrice * months + singlePlanLeadDesk?.Price * months;
      console.log('total price-------', totalPriceDesk);
      setDedicatedDeskPrice(totalPriceDesk);
    } else {
      totalPriceDesk = membersDeskPrice + singlePlanLeadDesk?.Price;
      console.log('total price-------', totalPriceDesk);
      setDedicatedDeskPrice(totalPriceDesk);
    }

    if (
      singlePlanMember?.SignUpFee == null &&
      singlePlanMemberDesk?.SignUpFee == null
    ) {
      const planFeeMember = 0;
      const planFeeMemberDesk = 0;
      const totalPlanFee = planFeeMember + planFeeMemberDesk;
      console.log('Plan fee member----', totalPlanFee);
      setMemberPlanFee(totalPlanFee);
    } else if (
      singlePlanMember?.SignUpFee == null &&
      singlePlanMemberDesk?.SignUpFee != null
    ) {
      const planFeeMember = 0;
      const planFeeMemberDesk = singlePlanMemberDesk?.SignUpFee;
      const totalPlanFee = planFeeMember + planFeeMemberDesk;
      console.log('Plan fee member----', totalPlanFee);
      setMemberPlanFee(totalPlanFee);
    } else if (
      singlePlanMember?.SignUpFee != null &&
      singlePlanMemberDesk?.SignUpFee == null
    ) {
      const planFeeMember = singlePlanMember?.SignUpFee;
      const planFeeMemberDesk = 0;
      const totalPlanFee = planFeeMember + planFeeMemberDesk;
      console.log('Plan fee member----', totalPlanFee);
      setMemberPlanFee(totalPlanFee);
    } else {
      const planFeeMember = singlePlanMember?.SignUpFee;
      const planFeeMemberDesk = singlePlanMemberDesk?.SignUpFee;
      const totalPlanFee = planFeeMember + planFeeMemberDesk;
      console.log('Plan fee member----', totalPlanFee);
      setMemberPlanFee(totalPlanFee);
    }

    if (
      singlePlanLead?.SignUpFee == null &&
      singlePlanLeadDesk?.SignUpFee == null
    ) {
      const planFeeLead = 0;
      const planFeeLeadDesk = 0;
      const totalPlanFee = planFeeLead + planFeeLeadDesk;

      console.log('Plan fee lead----', totalPlanFee);
      setLeadPlanFee(totalPlanFee);
    } else if (
      singlePlanLead?.SignUpFee == null &&
      singlePlanLeadDesk?.SignUpFee != null
    ) {
      const planFeeLead = 0;
      const planFeeLeadDesk = singlePlanLeadDesk?.SignUpFee;
      const totalPlanFee = planFeeLead + planFeeLeadDesk;

      console.log('Plan fee lead----', totalPlanFee);
      setLeadPlanFee(totalPlanFee);
    } else if (
      singlePlanLead?.SignUpFee != null &&
      singlePlanLeadDesk?.SignUpFee == null
    ) {
      const planFeeLead = singlePlanLead?.SignUpFee;
      const planFeeLeadDesk = 0;
      const totalPlanFee = planFeeLead + planFeeLeadDesk;

      console.log('Plan fee lead----', totalPlanFee);
      setLeadPlanFee(totalPlanFee);
    } else {
      const planFeeLead = singlePlanLead?.SignUpFee;
      const planFeeLeadDesk = singlePlanLeadDesk?.SignUpFee;
      const totalPlanFee = planFeeLead + planFeeLeadDesk;
      console.log('Plan fee member----', totalPlanFee);
      setLeadPlanFee(totalPlanFee);
    }

    // const PlanFee = memberPlanFee + leadPlanFee;
    // setTotalPlanFee(PlanFee);
    // console.log('total plan fee------', totalPlanFee);

    if (planId === 'Monthly') {
      const PlanFee = memberPlanFee * months + leadPlanFee * months;
      setTotalPlanFee(PlanFee);
      console.log('total plan fee------', totalPlanFee);
    } else {
      const PlanFee = memberPlanFee + leadPlanFee;
      setTotalPlanFee(PlanFee);
      console.log('total plan fee------', totalPlanFee);
    }

    console.log('office price------', totalPrice);
    console.log('desk price------', totalPriceDesk);
    const tPayable = totalPlanFee + totalPrice + totalPriceDesk;
    console.log('t payable------', tPayable);
    setTotalPayable(tPayable);
    console.log('total payable----', totalPayable);
  };

  //getting team administrator

  const selectTeamLead = () => {
    if (selectedMembers.some(item => item.isAdministrator === true)) {
      let lead = selectedMembers.filter(item => item.isAdministrator === true);
      setTeamLead(lead);
    } else if (unselectedMembers.some(item => item.isAdministrator === true)) {
      let lead = unselectedMembers.filter(
        item => item.isAdministrator === true,
      );
      setTeamLead(lead);
    } else {
      /* empty */
    }
  };
  // posting plan request api on submit request button
  const onSubmit = data => {
    console.log('testing data-----', data);
    dispatch(PlanRequest(data))
      .unwrap()
      .then(result => {
        console.log('result hybris req---', result);
        navigation.navigate(ScreensName.hybridRequestSentScreen);
      })
      .catch(error => {
        console.log('hybrid plan error--', error);
      });
    bottomSheetrequestSubmit.current?.close();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.summaryScreen,
    });
  }, []);

  useEffect(() => {
    console.log('Selected-', selectedMembers);
    console.log('Un-Selected-', unselectedMembers);
    selectTeamLead();
    // console.log("LEADER-", teamLead)
  }, []);

  useEffect(() => {
    // handleRequestData()
    handlePrice();
  }, [
    singlePlanLead,
    singlePlanMember,
    singlePlanLeadDesk,
    singlePlanMemberDesk,
  ]);

  //getting team lead and team member plan data of dedicated desk and private office on basis of terrif id
  useEffect(() => {
    dispatch(
      GetSinglePlan(
        planId === 'Monthly'
          ? memberTerrif?.TeamLeadMonthlyPlan?.id
          : memberTerrif?.TeamLeadYearlyPlan?.id,
      ),
    );
    dispatch(
      GetSinglePlanMember(
        planId === 'Monthly'
          ? memberTerrif?.TeamMemberMonthlyPlan?.id
          : memberTerrif?.TeamMemberYearlyPlan?.id,
      ),
    );

    dispatch(
      GetPricingDesk(
        planId === 'Monthly'
          ? memberTerrifDD?.TeamLeadMonthlyPlan?.id
          : memberTerrifDD?.TeamLeadYearlyPlan?.id,
      ),
    );
    dispatch(
      GetPricingMemberDesk(
        planId === 'Monthly'
          ? memberTerrifDD?.TeamMemberMonthlyPlan?.id
          : memberTerrifDD?.TeamMemberYearlyPlan?.id,
      ),
    );
  }, []);
  return (
    <Frame screenTitle={'Summary'}>
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}>
          {/* hybrid card */}
          <View style={styles.officeCard}>
            <HybridCard item={item} />
          </View>

          <View style={styles.subContainer}>
            <View style={[styles.flexDirectionRow, {}]}>
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
          {/* LIST OF SELECTED MEMBERS OF PRIVATE OFFICE AND DESK INCLUDING TEAM LEAD */}
          {teamLead.map(item => (
            <View key={item.Id} style={styles.subContainer}>
              <View
                style={[
                  styles.selectedTeamContainer,
                  {paddingRight: normalize(0)},
                ]}>
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
                        {marginTop: normalize(14), alignItems: 'center'},
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

                <View
                  style={[
                    styles.privateOfficeContainer,
                    {alignSelf: 'flex-end'},
                  ]}>
                  <Txt style={styles.privateOffice}>
                    {Strings.privateOffice}
                  </Txt>
                </View>
              </View>
            </View>
          ))}

          <Divider style={styles.innerDivider} />
          {/* PRIVATE OFFICE MEMBERS */}
          {selectedMembers?.map(item => (
            <View key={item.Id} style={styles.selectedTeamContainer}>
              {item.isAdministrator === false ? (
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
                    <View style={[styles.payingMemberContainer, {}]}>
                      <Txt style={styles.payingMemberTxt}>Paying member</Txt>
                    </View>
                  )}
                </View>
              ) : null}
              {item.isAdministrator === false ? (
                <View style={styles.privateOfficeContainer}>
                  <Txt style={styles.privateOffice}>
                    {Strings.privateOffice}
                  </Txt>
                </View>
              ) : null}
            </View>
          ))}
          {/* DEDICATED DESK MEMBERS */}
          {unselectedMembers?.map(item => (
            <View key={item.Id} style={styles.selectedTeamContainer}>
              {item.isAdministrator === false ? (
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
                          : AppTheme.COLORS.orange
                      }
                    />
                    <Txt style={styles.teamMember}>{item.fullName}</Txt>
                  </View>
                  {item?.isPayingMember === true && (
                    <View style={[styles.payingMemberContainer, {}]}>
                      <Txt style={styles.payingMemberTxt}>Paying member</Txt>
                    </View>
                  )}
                </View>
              ) : null}
              {item.isAdministrator === false ? (
                <View style={styles.dedicatedDeskContainer}>
                  <Txt style={styles.dedicatedDesk}>
                    {Strings.dedicatedDesk}
                  </Txt>
                </View>
              ) : null}
            </View>
          ))}
          <Divider style={styles.divider} />
          {/* ALL PAYMENTS CONTAINER */}
          <View style={styles.subContainer}>
            <View style={styles.flexDirectionRow}>
              <View>
                {/* <Svg width={'100%'}  > */}
                <Paymentsummary
                  stroke={isDarkMode ? AppTheme.COLORS.white : null}
                />
                {/* </Svg> */}
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
                  Private office
                </Txt>

                <ShimmerPlaceHolder
                  visible={
                    singlePlanLeadPending === false &&
                    singlePlanMemberPending === false &&
                    singlePlanLeadDeskPending === false &&
                    singlePlanMemberDeskPending === false
                  }
                  shimmerStyle={
                    styles.shimmerPrivateOffice
                  }></ShimmerPlaceHolder>

                <Txt
                  accessibilityLabel="officeprice"
                  style={styles.paymentContainerValues}>
                  {singlePlanLeadPending === false &&
                  singlePlanMemberPending === false &&
                  singlePlanLeadDeskPending === false &&
                  singlePlanMemberDeskPending === false
                    ? `SAR ${privateOfficePrice}`
                    : null}
                </Txt>
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
                  {Strings.dedicatedDesk}
                </Txt>

                <ShimmerPlaceHolder
                  visible={
                    singlePlanLeadPending === false &&
                    singlePlanMemberPending === false &&
                    singlePlanLeadDeskPending === false &&
                    singlePlanMemberDeskPending === false
                  }
                  shimmerStyle={styles.shimmerDesk}></ShimmerPlaceHolder>

                <Txt
                  accessibilityLabel="deskprice"
                  style={styles.paymentContainerValues}>
                  {singlePlanLeadPending === false &&
                  singlePlanMemberPending === false &&
                  singlePlanLeadDeskPending === false &&
                  singlePlanMemberDeskPending === false
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
                  VAT {tax?.setting?.taxRate}%
                </Txt>

                <ShimmerPlaceHolder
                  visible={
                    singlePlanLeadPending === false &&
                    singlePlanMemberPending === false &&
                    singlePlanLeadDeskPending === false &&
                    singlePlanMemberDeskPending === false
                  }
                  shimmerStyle={styles.shimmerPlanFee}></ShimmerPlaceHolder>

                <Txt
                  accessibilityLabel="vat"
                  style={styles.paymentContainerValues}>
                 {  singlePlanLeadPending === false &&
                    singlePlanMemberPending === false &&
                    singlePlanLeadDeskPending === false &&
                    singlePlanMemberDeskPending === false ?
                   tax?.setting?.isTaxEnable   ? (tax?.setting?.taxRate / 100) * (dedicatedDeskPrice + privateOfficePrice) : 0 :
                    null
                 }
                </Txt>
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
                    singlePlanMemberPending === false &&
                    singlePlanLeadDeskPending === false &&
                    singlePlanMemberDeskPending === false
                  }
                  shimmerStyle={styles.shimmerPlanFee}></ShimmerPlaceHolder>

                <Txt
                  accessibilityLabel="planfee"
                  style={styles.paymentContainerValues}>
                  {singlePlanLeadPending === false &&
                  singlePlanMemberPending === false &&
                  singlePlanLeadDeskPending === false &&
                  singlePlanMemberDeskPending === false
                    ? `SAR ${totalPlanFee}`
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
                    singlePlanMemberPending === false &&
                    singlePlanLeadDeskPending === false &&
                    singlePlanMemberDeskPending === false
                  }
                  shimmerStyle={
                    styles.shimmerTotalPayable
                  }></ShimmerPlaceHolder>

                <Txt
                  accessibilityLabel="totalpayable"
                  style={[
                    styles.totalPayableValue,
                    {
                      color: isDarkMode
                        ? AppTheme.COLORS.white
                        : AppTheme.COLORS.purple,
                    },
                  ]}>
                  {singlePlanLeadPending === false &&
                  singlePlanMemberPending === false &&
                  singlePlanLeadDeskPending === false &&
                  singlePlanMemberDeskPending === false
                  ?  tax?.setting?.isTaxEnable  ? `SAR ${totalPayable + ((tax?.setting?.taxRate / 100) * (dedicatedDeskPrice + privateOfficePrice)) }`
                  : `SAR ${totalPayable}`
                    : null}
                </Txt>
              </View>
            </View>

            <Botton
              loading={false}
              title={'Submit Request'}
              disabled={false}
              small={false}
              singleButtonStyle={styles.btnStyle}
              // onPress={() => navigation.navigate(ScreensName.requestSentScreen)}
              onPress={() => {
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
            <Botton
              continueBtnAccessibilityLabel="Yes"
              cancelBtnAccessibilityLabel="No"
              variant={'v2'}
              loading={false}
              continueTitle={'Yes'}
              cancelTitle={'No'}
              disabled={false}
              button1Style={styles.btn1}
              onCancel={() => {
                bottomSheetrequestSubmit.current?.close();
              }}
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
                    deskCapacity: Allocation,
                    RenewalMonths: planId === 'Monthly' ? parseInt(months) : 1,
                    startDate: enddate,
                    Desk: memberTerrif?.resourceId,
                    resourceId: resId,
                    privateResourceTypeId: resourceData?.Id,
                    dedicatedResourceTypeId: resourceData?.deskIdHybrid,

                    DedicatedMemberTarrifId:
                      planId === 'Monthly'
                        ? memberTerrifDD?.TeamMemberMonthlyPlan?.id
                        : memberTerrifDD?.TeamMemberYearlyPlan?.id,

                        DedicatedLeadTarrifId:
                      planId === 'Monthly'
                        ? memberTerrifDD?.TeamLeadMonthlyPlan?.id
                        : memberTerrifDD?.TeamLeadYearlyPlan?.id,


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
                    teamMembers: members,
                    isMultiple: resourceData?.isMultiple,
                    dedicatedMembers: unselectedMembers,
                    privateMembers: selectedMembers,
                    price: totalPayable,
                    deskPrice: dedicatedDeskPrice,
                    privateOfficePrice: privateOfficePrice,
                    planFee: totalPlanFee,
                  });
                });
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Frame>
  );
};

export default HybridSummaryScreen;
