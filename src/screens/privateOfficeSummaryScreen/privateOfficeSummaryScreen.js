import {StatusBar, Text, View, ScrollView} from 'react-native';
import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
import {Divider} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Svg from 'react-native-svg';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import normalize from 'react-native-normalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { ResourceId } from '../../shared/config/resourceId';

import {PlanRequest} from '../../shared/redux/action/PlanRequest';
import {GetSinglePlan} from '../../shared/redux/action/GetSinglePlan';
import {GetSinglePlanMember} from '../../shared/redux/action/GetSinglePlanMember';
import {selectResourceData} from '../../shared/redux/slices/planResourceDataSlice';
// eslint-disable-next-line no-unused-vars
import {
  selectStartDateSelectionPO,
  selectEndDateSelectionPO,
  selectNoOfMonths,
} from '../../shared/redux/slices/DateSlice';
import {selectSelectedPrivateOfficeMembers} from '../../shared/redux/slices/memberSelectionSlice';
import {AppTheme} from '../../shared/theme';
import PrivateOfficeCard from '../../shared/components/privateOfficeCard/PrivateOfficeCard';
import styles from './privateOfficeSummaryScreen.style';
import { PrimaryButton, SecondaryButton } from '../../shared/components';
import Duration from '../../assets/images/duration.js';
import Team from '../../assets/images/team.js';
import Paymentsummary from '../../assets/images/paymentSummary.js';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import Strings from '../../shared/constants/Strings';
import Frame from '../../shared/components/core/Frame';
import Botton from '../../shared/components/core/Botton';
import Txt from '../../shared/components/core/Txt';

const SummaryScreen = ({navigation, route}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const dispatch = useDispatch();
  const { Allocation , expectedDate ,selectedDate } = route.params;
  console.log('Allocation----', Allocation);

  const {planId} = route.params;
  const {privateOffice} = route.params;
  const {privateOfficeId, resId} = route.params;

const tax = useSelector(state=> state?.tax?.data)
console.log("tax---",tax,'-',tax?.setting?.isTaxEnable)
  const singlePlanLead = useSelector(state => state?.getSinglePlan?.data?.data);
  const singlePlanMember = useSelector(
    state => state?.getSinglePlanMember?.data?.data,
  );
  console.log(' singlePlanLead--', singlePlanLead);
  console.log('singlePlanMember--', singlePlanMember);
  const singlePlanLeadPending = useSelector(
    state => state?.getSinglePlan?.loading,
  );
  const singlePlanMemberPending = useSelector(
    state => state?.getSinglePlanMember?.loading,
  );

  const resourcePlan = useSelector(state => state?.resourcePlan);
  const resourcePlanData = useSelector(state => state?.resourcePlan?.data);
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  const teamMembers = useSelector(state => state?.getTeam);
  const teammembersdata = teamMembers?.data;
  const teamMemberTeams = teammembersdata[0]?.Team;

  const privateOfficeSelectedMembers = useSelector(
    selectSelectedPrivateOfficeMembers,
  );

  const resourceData = useSelector(selectResourceData);

  const months = useSelector(selectNoOfMonths);

  // const startDate = useSelector(selectStartDateSelectionPO);
  const startDate = selectedDate;
  const endDate = useSelector(selectEndDateSelectionPO);
  const enddate = new Date(`${startDate} 23:59 UTC`).toISOString();

  let resPlan = resourcePlanData?.find(
    planName => planName.ResourceId === ResourceId.privateOffice,
  );
  let temp = resPlan?.ResourcePlan;
  let memberTerrif = temp?.resources?.find(
    item => item?.resourceId === privateOfficeId,
  );
  console.log('resPlan-',resPlan);
  console.log('temp--',temp);
  console.log('memberTerrif-',memberTerrif, privateOfficeId);

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

  // const item = { id: 1, officeNo: 'Private Office 1', btnLabel: "Monthly Plan", noOfPersons: 5 }

  //selecting team administrator
  const selectTeamLead = () => {
    if (
      privateOfficeSelectedMembers.some(item => item.isAdministrator === true)
    ) {
      let lead = privateOfficeSelectedMembers.filter(
        item => item.isAdministrator === true,
      );
      setTeamLead(lead);
      console.log(teamLead);
    }
  };

  const [privateOfficePrice, setPrivateOfficePrice] = useState(0);
  const [memberPlanFee, setMemberPlanFee] = useState(0);
  const [leadPlanFee, setLeadPlanFee] = useState(0);
  const [totalPlanFee, setTotalPlanFee] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  //hadling desk price , plan fee and total payable
  const handlePrice = () => {
    const membersDeskPrice =
      singlePlanMember?.Price * (privateOfficeSelectedMembers.length - 1);
   
    let totalPrice;
    if (planId === 'Monthly') {
      
      totalPrice = membersDeskPrice * months + singlePlanLead?.Price * months;
     
      setPrivateOfficePrice(totalPrice);
    } else {
      totalPrice = membersDeskPrice + singlePlanLead?.Price;

      setPrivateOfficePrice(totalPrice);
    }

    if (singlePlanMember?.SignUpFee == null) {
      const planFeeMember = 0;
      setMemberPlanFee(planFeeMember);
    } else {
      const planFeeMember = singlePlanMember?.SignUpFee;
      setMemberPlanFee(planFeeMember);
    }

    if (singlePlanLead?.SignUpFee == null) {
      const planFeeLead = 0;
      setLeadPlanFee(planFeeLead);
    } else {
      const planFeeLead = singlePlanLead?.SignUpFee;
      setLeadPlanFee(planFeeLead);
    }

    if (planId === 'Monthly') {
      const PlanFee = memberPlanFee * months + leadPlanFee * months;
      setTotalPlanFee(PlanFee);
    } else {
      const PlanFee = memberPlanFee + leadPlanFee;
      setTotalPlanFee(PlanFee);
    }
    const tPayable = totalPlanFee + totalPrice;
    setTotalPayable(tPayable);
  };

  // posting plan request api on submit request button
  const onSubmit = data => {
    dispatch(PlanRequest(data))
      .unwrap()
      .then(result => {
        navigation.navigate(ScreensName.requestSentScreen);
      })
      .catch(error => {
        console.log('error plan req--', error);
      });

    bottomSheetrequestSubmit.current?.close();
  };
  useEffect(() => {
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
    );
    dispatch(
      GetSinglePlanMember(
        planId === 'Monthly'
          ? memberTerrif?.TeamMemberMonthlyPlan?.id
          : memberTerrif?.TeamMemberYearlyPlan?.id,
      ),
    );
  }, []);
  return (
    <Frame>
      {/* <GestureHandlerRootView style={styles.gestureContainer}> */}
      <View style={styles.mainContainer}>
        {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}> */}
        {/* SELECTED PRIVATE OFFICE CARD */}
        <View style={styles.officeCard}>
          <PrivateOfficeCard
            item={privateOffice}
            disabled={true}
            btnLabel={'Monthly Plan'}
          />
        </View>

        <View style={styles.subContainer}>
          <View style={[styles.flexDirectionRow, {}]}>
            <View>
              {/* <Svg width={'100%'}> */}
              <Duration
                stroke={isDarkMode ? AppTheme.COLORS.white : null} />
              {/* </Svg> */}
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
                    {fontFamily: AppTheme.FONTS.TYPE.BOLD},
                  ]}>
                  To
                </Txt>
                <Txt style={styles.dateRangetext}>{expectedDate}</Txt>
              </View>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        {/* LIST OF SELECTED MEMBERS */}
        {teamLead.map(item => (
          <View key={item?.Id} style={styles.subContainer}>
            <View style={styles.flexDirectionRow}>
              <View>
                {/* <Svg width={'100%'}> */}
                <Team 
                  stroke={isDarkMode ? AppTheme.COLORS.white : null} />
                {/* </Svg> */}
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
                    color={isDarkMode ? AppTheme.COLORS.lightGrey : AppTheme.COLORS.purple}
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
        {privateOfficeSelectedMembers?.map(item => (
          <View key={item?.Id}>
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
                    color={isDarkMode ? AppTheme.COLORS.lightGrey : AppTheme.COLORS.purple}
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
          </View>
        ))}

        <Divider style={styles.divider} />
        <View style={styles.subContainer}>
          <View style={styles.flexDirectionRow}>
            <View>
              {/* <Svg width={'100%'}> */}
              <Paymentsummary
                stroke={isDarkMode ? AppTheme.COLORS.white : null} />
              {/* </Svg> */}
            </View>
            <View>
              <Txt style={styles.maintitle}>{Strings.payment}</Txt>
              <Txt style={styles.finalPaymentText}>{Strings.finalPayment}</Txt>
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
              <Txt style={styles.paymentContainerHeadings}>Plan</Txt>
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
              <Txt style={styles.paymentContainerHeadings}>Private office</Txt>

              <ShimmerPlaceHolder
                visible={
                  singlePlanLeadPending === false &&
                  singlePlanMemberPending === false
                }
                shimmerStyle={styles.shimmerPrivateOffice}></ShimmerPlaceHolder>

              <Txt
                accessibilityLabel="officePrice"
                style={styles.paymentContainerValues}>
                {singlePlanLeadPending === false &&
                singlePlanMemberPending === false
                  ? `SAR ${privateOfficePrice}`
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
              <Txt style={styles.paymentContainerHeadings}>VAT {tax?.setting?.taxRate}%</Txt>
              <ShimmerPlaceHolder
                  visible={
                    singlePlanLeadPending === false &&
                    singlePlanMemberPending === false
                  }
                  shimmerStyle={styles.shimmerPlanFee}></ShimmerPlaceHolder>
              <Txt
                accessibilityLabel="vat"
                style={styles.paymentContainerValues}>
               { singlePlanLeadPending === false &&
                  singlePlanMemberPending === false ?
                  tax?.setting?.isTaxEnable   ? (tax?.setting?.taxRate / 100) * privateOfficePrice : 0 :
                null}
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
              <Txt style={styles.paymentContainerHeadings}>Plan fee</Txt>

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
                shimmerStyle={styles.shimmerTotalPayable}></ShimmerPlaceHolder>

              <Text
                accessibilityLabel="totalPayable"
                style={[styles.totalPayableValue,{ color:isDarkMode ? AppTheme.COLORS.white  : AppTheme.COLORS.purple}]}>
                {singlePlanLeadPending === false &&
                singlePlanMemberPending === false
                  ?  tax?.setting?.isTaxEnable  ? `SAR ${totalPayable + ((tax?.setting?.taxRate / 100) * privateOfficePrice) }`
                  : `SAR ${totalPayable}`
                  : null}
              </Text>
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
        {/* </ScrollView> */}
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
              loading={false}
              variant={'v2'}
              small={false}
              continueTitle={'Yes'}
              cancelTitle={'No'}
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
                      singlePlanMember?.CancellationLimitDays === null ? 0 : singlePlanMember?.CancellationLimitDays ,
                    LeadCancellationLimitDays:
                      singlePlanLead?.CancellationLimitDays === null ? 0 : singlePlanLead?.CancellationLimitDays,
                    teamMembers: privateOfficeSelectedMembers,
                    price: totalPayable,
                    isMultiple: resourceData?.isMultiple,
                    privateOfficePrice: privateOfficePrice,
                    planFee: totalPlanFee,
                  });
                });
              }}
              onCancel={() => {
                bottomSheetrequestSubmit.current?.close();
              }}
              singleButtonStyle={styles.BtnStyle}
            />

          
          </View>
        </BottomSheetView>
      </BottomSheet>

      {/* </GestureHandlerRootView> */}
    </Frame>
  );
};

export default SummaryScreen;
