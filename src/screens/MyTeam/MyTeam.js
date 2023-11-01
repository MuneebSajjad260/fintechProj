import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useSelector, useDispatch} from 'react-redux';
import Svg from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from 'react-native-paper';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { ResourceId } from '../../shared/config/resourceId';
import {RemoveMember} from '../../shared/redux/action/RemoveMember';
import {logout} from '../../shared/redux/action/user';
import {resetUser} from '../../shared/redux/slices/authSlice';
import {ChangeRole} from '../../shared/redux/action/ChangeRole';
import {OtpGenerate} from '../../shared/redux/action/OtpGenerate';
import {CreditPurchase} from '../../shared/redux/action/CreditPurchase';
import {PoolTeamCredit} from '../../shared/redux/action/PoolTeamCredit';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {TeamSettings} from '../../shared/redux/action/TeamSettings';
import TextInput from '../../shared/components/text-input/Textinput';
import {MemberTeamManagement} from '../../shared/redux/action/MemberTeamManagement';
import {LeadTeamManagement} from '../../shared/redux/action/LeadTeamManagement';
import {PrimaryButton, SecondaryButton} from '../../shared/components';
import styles from './MyTeam.style';
import TeamManagment from '../../assets/images/TeamManagment.js';
import Strings from '../../shared/constants/Strings';
import MyTeamMembers from '../../assets/images/MyTeamMembers.js';
import TeamCredits from '../../assets/images/TeamCreditsIconActive.js';
import CodeResend from '../../assets/images/CodeResend.svg';
import {AppTheme} from '../../shared/theme';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Wrapper from '../../shared/components/core/Wrapper';
import Botton from '../../shared/components/core/Botton';
import {scale} from '../../shared/utils/scale';


const MyTeam = ({navigation}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const dispatch = useDispatch();
  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const LeadTeamManagementPending = useSelector(
    state => state?.leadTeamManagement?.loading,
  );
  const otpGeneratePending = useSelector(state => state?.otpGenerate?.loading);
  const userData = useSelector(selectUserData);
  console.log('admin---',userData?.IsTeamAdministrator,'team Id---',userData?.TeamIds,'--',userData?.CompanyName);
  const ChangeRolePending = useSelector(state => state?.changeRole?.loading);
  const RemoveMemberPending = useSelector(
    state => state?.removeMember?.loading,
  );

  const bottomSheetRemoveMember = useRef(null);
  const snapPointsRemoveMember = useMemo(() => ['36%'], []);

  const bottomSheetRemoveMemberDone = useRef(null);
  const snapPointsRemoveMemberDone = useMemo(() => ['32%'], []);

  const bottomSheetChangePayingMember = useRef(null);
  const snapPointsChangePayingMember = useMemo(() => ['50%'], []);

  const bottomSheetChangeAdmin = useRef(null);
  const snapPointsChangeAdmin = useMemo(() => ['50%'], []);

  const bottomSheetUpdate = useRef(null);
  const snapPointsUpdate = useMemo(() => ['55%'], []);

  const bottomSheetSubmitCode = useRef(null);
  const snapPointsSubmitCode = useMemo(() => ['26%'], []);
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

  const [code, setCode] = useState({value: '', error: ''});
  const [changePM, setChangePM] = useState();
  const [changeAdmin, setChangeAdmin] = useState();
  const [creditToggle, setCreditToggle] = useState();
  const [creditPurchaseToggle, setCreditPurchaseToggle] = useState();
  const [teamLead, setTeamLead] = useState([]);
  const [payingMember, setPayingMember] = useState([]);
  const [editMembersToggle, setEditMembersToggle] = useState(false);
  const [editAdminToggle, setEditAdminToggle] = useState(false);
  const [memberType, setMemberType] = useState();
  //STATES FOR COUNTER HANDLING
  const [counter, setCounter] = useState(60);
  const decrementCounterRef = useRef();
  decrementCounterRef.current = () => {
    setCounter(prevCounter =>
      prevCounter > 0 ? prevCounter - 1 : prevCounter,
    );
  };
  const intervalRef = useRef();

  const [memberBS, setMemberBS] = useState(false);
  const [resourceBs, setResourceBs] = useState(false);
  const [privateOfficeMembers, setPrivateOfficeMembers] = useState([]);
  const [allMembersSelected, setAllMembersSelected] = useState();
  const [deskMembers, setDeskMembers] = useState([]);
  const [removeMembers, setRemoveMembers] = useState([]);
  const [inactiveMembers, setInactiveMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState();

  // FILTERING ADMINISTRATOR FROM ALL MEMBERS ARRAY
  const selectTeamLead = () => {
    if (allMembersSelected) {
      if (
        allMembersSelected?.allActiveMembers.some(
          item => item?.isAdministrator === true,
        )
      ) {
        console.log('edededed');
        let lead = allMembersSelected?.allActiveMembers.filter(
          item => item?.isAdministrator === true,
        );
        setTeamLead(lead);
        console.log('teamLeadName----->>>>', lead);
      }
    }
  };

  // FILTERING PAYING MEMBER FROM ALL MEMBERS ARRAY
  const selectPayingMember = () => {
    if (allMembersSelected) {
      if (
        allMembersSelected?.allActiveMembers.some(
          item =>
            item?.isPayingMember === true && item?.isAdministrator === false,
        )
      ) {
        let PM = allMembersSelected?.allActiveMembers.filter(
          item =>
            item?.isPayingMember === true && item?.isAdministrator === false,
        );
        setPayingMember(PM);
        console.log('teamPayingMemberName----->>>>', PM);
      }
    }
  };

  //habdling close button which opens bottom sheet to remove member
  const handleCloseBtnMember = item => {
    console.log('name---', item);
    // console.log('resource type ---',resourceType);
    setMemberBS(item?.name);
    setResourceBs(item?.resourceType);
    bottomSheetRemoveMember.current?.snapToIndex(0);
  };

  const handleRemoveMember = item => {
    console.log('item----33-', item);
    const body = {userId: item?.Id, teamId: userData?.TeamIds};
    console.log('body--22--', body);
    dispatch(RemoveMember(body))
      .unwrap()
      .then(result => {
        console.log('remove member result ---', result);
        // member is removing here from the list  in hybrid case
        if (allMembersSelected?.isMultiple === true) {
          if (resourceBs === 'office') {
            const i = privateOfficeMembers?.findIndex(
              index => index.Id === item.Id,
            );
            console.log('-44', i);
            if (i !== -1) {
              let temp = [...privateOfficeMembers];
              temp.splice(i, 1);
              setPrivateOfficeMembers(temp);
            } else {
              setPrivateOfficeMembers([...privateOfficeMembers, item]);
            }
          } else if (resourceBs === 'desk') {
            const i = deskMembers?.findIndex(index => index.Id === item.Id);
            console.log('-44', i);
            if (i !== -1) {
              let temp = [...deskMembers];
              temp.splice(i, 1);
              setDeskMembers(temp);
            } else {
              setDeskMembers([...deskMembers, item]);
            }
          } else {
            const i = inactiveMembers?.findIndex(index => index.Id === item.Id);
            console.log('-44', i);
            if (i !== -1) {
              let temp = [...inactiveMembers];
              temp.splice(i, 1);
              setInactiveMembers(temp);
            } else {
              setInactiveMembers([...inactiveMembers, item]);
            }
          }
        }
        //in case of dedicated plan or private plan
        else {
          if (resourceBs === 'inactive') {
            const i = inactiveMembers?.findIndex(index => index.Id === item.Id);
            console.log('-44', i);
            if (i !== -1) {
              let temp = [...inactiveMembers];
              temp.splice(i, 1);
              setInactiveMembers(temp);
            } else {
              setInactiveMembers([...inactiveMembers, item]);
            }
          } else {
            const i = removeMembers?.findIndex(index => index.Id === item.Id);
            console.log('-44', i);
            if (i !== -1) {
              let temp = [...removeMembers];
              temp.splice(i, 1);
              setRemoveMembers(temp);
            } else {
              setRemoveMembers([...removeMembers, item]);
            }
          }
        }
        bottomSheetRemoveMember.current?.close();
      })
      .catch(err => {
        console.log('remove member error--', err);
      });
  };


  useEffect(() => {
    selectTeamLead();
    selectPayingMember();
  }, [allMembersSelected]);

  const onUpdateBtn = () => {
    //API for otp generate

    dispatch(OtpGenerate({teamId: userData?.TeamIds, email: userData?.Email}))
      .unwrap()
      .then(result => {
        console.log('otp generate resilt---', result);
        setCode({value: '', error: ''});
        bottomSheetUpdate.current?.snapToIndex(0);
        bottomSheetChangePayingMember.current?.close();
        bottomSheetChangeAdmin.current?.close();
      })
      .catch(err => {
        console.log('otp genrate error ---', err);
      });

    setCounter(60);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => decrementCounterRef.current(),
      1000,
    );
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  //API FOR CHANGE PAYING MEMBER OR ADMIN
  const onSubmitCode = () => {
    console.log(
      'admin pr pm --',
      memberType?.memberType,
      'Id--',
      memberType?.Id,
      'code--',
      code.value,
      'teamId--',
      userData?.TeamIds,
    );
    const body = {
      teamId: userData?.TeamIds,
      userId: memberType?.Id,
      memberRequest: memberType?.memberType,
      otp: Number(code.value),
    };
    dispatch(ChangeRole(body))
      .unwrap()
      .then(result => {
        setCounter(0);
        bottomSheetSubmitCode.current?.snapToIndex(0);
        bottomSheetUpdate.current?.close();
        console.log('change role result--', result);
      })
      .catch(error => {
        console.log('change role errorr--', error);
        console.log('change role errorr--', error?.error?.statusCode);
        if (
          error?.error?.statusCode === 400 ||
          error?.error?.statusCode === 422
        ) {
          setCode({
            value: '',
            error: 'Sorry! Incorrect code. Please try again.',
          });
        }
      });
  };
  //By clicking on Done logout user
  const onSubmitDone = async () => {
    dispatch(logout());
    dispatch(resetUser());
    navigation.reset({
      index: 3,
      routes: [{name: ScreensName.Login}],
    });
  };
  //API  FOR TEAM MEMBER
  useEffect(() => {
    if (userData?.IsTeamAdministrator) {
      dispatch(LeadTeamManagement(userData?.TeamIds))
        .unwrap()
        .then(result => {
          console.log('result for LeadTeamManagement---', result);
          setAllMembersSelected(result);
          setPrivateOfficeMembers(result?.privateMembers);
          setDeskMembers(result?.dedicatedMembers);
          setRemoveMembers(result?.allActiveMembers);
          setInactiveMembers(result?.inactive);
        })
        .catch(err => {
          console.log('error for LeadTeamManagement---', err);
        });
    } else {
      dispatch(MemberTeamManagement(userData?.TeamIds))
        .unwrap()
        .then(result => {
          console.log('result for team member---', result);
          setAllMembersSelected(result);
        })
        .catch(err => {
          console.log('error for team member---', err);
        });
    }
  }, [dispatch, userData?.TeamIds]);

  //API FOR TEAM SETTINGS
  useEffect(() => {
    dispatch(TeamSettings(userData?.TeamIds))
      .unwrap()
      .then(result => {
        console.log('result team settings---', result);
        setCreditToggle(result?.poolCredits);
        setCreditPurchaseToggle(result?.creditPermission);
      })
      .catch(err => {
        console.log('error team settings---', err);
      });
  }, [dispatch, userData?.TeamIds]);

  //pool team credit api
  const onPoolCreditToggle = data => {
    setCreditToggle(!creditToggle);
    const data1 = {teamId: userData?.TeamIds, poolCredit: data};
    dispatch(PoolTeamCredit(data1))
      .unwrap()
      .then(result => {
        console.log('result pool team credit--', result);
      })
      .catch(err => {
        console.log('poolcredit error', err);
      });
  };

  //CREDIT PURCHASE PERMISSION API
  const onCreditPurchaseToggle = data => {
    setCreditPurchaseToggle(!creditPurchaseToggle);
    const data1 = {teamId: userData?.TeamIds, creditPermission: data};
    dispatch(CreditPurchase(data1))
      .unwrap()
      .then(result => {
        console.log('result CREDIT PURCHASE PERMISSION--', result);
      })
      .catch(err => {
        console.log('CREDIT PURCHASE PERMISSION error', err);
      });
  };

  //console.log('allMembersSelected---',allMembersSelected);

  //WHEN SELECTING NEW ADMIN
  const selectAdmin = (userType, item) => {
    setChangeAdmin(userType);
    setMemberType({memberType: 'isAdministrator', Id: userType});
    if (changeAdmin === userType) {
      setChangeAdmin(!userType);
    }
  };
  //WHEN SELECTING NEW  PAYING MEMBER
  const selectPM = (userType, item) => {
    setMemberType({memberType: 'isPayingMember', Id: userType});
    setChangePM(userType);
    if (changePM === userType) {
      setChangePM(!userType);
    }
  };
  // WHEN TEAM MEMBER LOGIN
  if (userData?.IsTeamAdministrator === false) {
    return (
      <>
        <Frame style={styles.safeAreaContainer}>
        
          <ScrollView
            contentContainerStyle={styles.ScrollView}
            showsVerticalScrollIndicator={false}>
            <View>
              <Txt style={styles.title}>{`Team ${userData?.TeamNames}`}</Txt>
              <View style={[styles.allignInRow, {marginTop: normalize(21)}]}>
                <View style={styles.imgTxtContainer}>
                  <View>
                    {/* <Svg width={'100%'}> */}
                    <TeamManagment
                      stroke={isDarkMode ? AppTheme.COLORS.white : null}
                    />
                    {/* </Svg> */}
                  </View>
                  <Txt style={styles.teamManagment}>Management</Txt>
                </View>
              </View>

              <ShimmerPlaceHolder
                visible={LeadTeamManagementPending === false}
                shimmerStyle={styles.shimmerView}></ShimmerPlaceHolder>
              {teamLead?.map(item => (
                <Wrapper key={item?.Id} style={styles.card}>
                  <View style={styles.allignInRow}>
                    <View
                      style={[
                        styles.flexDirectionRow,
                        {alignItems: 'center'},
                      ]}>
                      <Feather
                        name="user"
                        size={15}
                        color={
                          allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk
                            ? AppTheme.COLORS.orange
                            : AppTheme.COLORS.purple
                        }
                      />
                      <View>
                        <Txt style={styles.teamName}>{item.fullName}</Txt>
                        <View
                          style={[
                            styles.flexDirectionRow,
                            {
                              marginTop: normalize(6),
                              marginLeft: normalize(20),
                            },
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

                    {allMembersSelected?.isMultiple === false ? 
                    allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk ? (
                      <View style={[styles.dedicatedDeskContainer]}>
                        <Txt style={styles.dedicatedDesk}>
                          {item?.deskName}
                        </Txt>
                      </View>
                    ) : (
                      <View style={[styles.privateOfficeContainer]}>
                        <Txt style={styles.privateOffice}>
                          {Strings.privateOffice}
                        </Txt>
                      </View>
                    )
                  :
                  <View style={[styles.privateOfficeContainer]}>
                  <Txt style={styles.privateOffice}>
                    {Strings.privateOffice}
                  </Txt>
                </View>
                
                  }


                  </View>
                </Wrapper>
              ))}
              <ShimmerPlaceHolder
                visible={LeadTeamManagementPending === false}
                shimmerStyle={styles.shimmerView}></ShimmerPlaceHolder>

              {/* PAYING MEMBER UI AND FUNCTIONALITY */}
              {payingMember?.map(item => (
                <Wrapper key={item?.Id} style={styles.card}>
                  <View style={styles.allignInRow}>
                    <View
                      style={[
                        styles.flexDirectionRow,
                        {alignItems: 'center'},
                      ]}>
                      <Feather
                        name="user"
                        size={15}
                        color={
                          allMembersSelected?.isMultiple === false
                            ? allMembersSelected?.ResourceTypeId ===
                            ResourceId.dedicatedDesk 
                              ? AppTheme.COLORS.orange
                              : AppTheme.COLORS.purple
                            : privateOfficeMembers.some(
                              member =>
                                member.Id === item?.Id &&
                                    member.isPayingMember,
                            )
                              ? AppTheme.COLORS.purple
                              : AppTheme.COLORS.orange
                        }
                      />
                      <View>
                        <Txt style={styles.teamName}>{item.fullName}</Txt>
                        <View
                          style={[
                            styles.flexDirectionRow,
                            {
                              marginTop: normalize(6),
                              marginLeft: normalize(20),
                            },
                          ]}>
                          <View
                            style={[
                              styles.teamRoleContainer,
                              {backgroundColor: AppTheme.COLORS.purple},
                            ]}>
                            <Txt style={styles.teamRole}>Paying member</Txt>
                          </View>
                        </View>
                      </View>
                    </View>

                    {allMembersSelected?.isMultiple === false ? (
                      allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk ? (
                        <View style={[styles.dedicatedDeskContainer]}>
                          <Txt style={styles.dedicatedDesk}>
                            {item?.deskName}
                          </Txt>
                        </View>
                      ) : (
                        <View style={[styles.privateOfficeContainer]}>
                          <Txt style={styles.privateOffice}>
                            {Strings.privateOffice}
                          </Txt>
                        </View>
                      )
                    ) : privateOfficeMembers.some(
                      member =>
                        member.Id === item?.Id && member.isPayingMember,
                    ) ? (
                        <View style={[styles.privateOfficeContainer]}>
                          <Txt style={styles.privateOffice}>
                            {Strings.privateOffice}
                          </Txt>
                        </View>
                      ) : (
                        <View style={[styles.dedicatedDeskContainer]}>
                          <Txt style={styles.dedicatedDesk}>
                            {item?.deskName}
                          </Txt>
                        </View>
                      )}
                  </View>
                </Wrapper>
              ))}

              <Divider style={styles.divider} />

              <View style={styles.allignInRow}>
                <View style={styles.imgTxtContainer}>
                  <View>
                    <Svg width={'100%'}>
                      <MyTeamMembers />
                    </Svg>
                  </View>
                  <Txt style={styles.teamManagment}>Member(s)</Txt>
                </View>
              </View>
              <ShimmerPlaceHolder
                visible={LeadTeamManagementPending === false}
                shimmerStyle={styles.shimmerView}></ShimmerPlaceHolder>
              {allMembersSelected?.isMultiple === false ? (
                allMembersSelected?.allActiveMembers?.map(item =>
                  !item?.isAdministrator && !item?.isPayingMember ? (
                    <Wrapper key={item?.Id} style={styles.card}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(ScreensName.teamMemberDetail, {
                            name: item?.fullName,
                          });
                        }}>
                        <View style={styles.selectedTeamContainer}>
                          <View style={styles.flexDirectionRow}>
                            <Feather
                              name="user"
                              size={15}
                              color={
                                allMembersSelected?.ResourceTypeId ===
                                ResourceId.dedicatedDesk
                                  ? AppTheme.COLORS.orange
                                  : AppTheme.COLORS.purple
                              }
                            />

                            <Txt style={styles.teamMember}>
                              {item.fullName}
                            </Txt>
                          </View>

                          {allMembersSelected?.ResourceTypeId ===
                            ResourceId.dedicatedDesk ? (
                              <View
                                style={[
                                  styles.dedicatedDeskContainer,
                                  {alignSelf: 'flex-end'},
                                ]}>
                                <Txt style={styles.dedicatedDesk}>
                                  {item?.deskName}
                                </Txt>
                              </View>
                            ) : (
                              <View style={[styles.privateOfficeContainer]}>
                                <Txt style={styles.privateOffice}>
                                  {Strings.privateOffice}
                                </Txt>
                              </View>
                            )}
                        </View>
                      </TouchableOpacity>
                    </Wrapper>
                  ) : null,
                )
              ) : (
                <View>
                  <View>
                    {allMembersSelected?.privateMembers?.map(item =>
                      !item?.isAdministrator && !item?.isPayingMember ? (
                        <Wrapper key={item?.Id} style={styles.card}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate(
                                ScreensName.teamMemberDetail,
                                {name: item?.fullName},
                              );
                            }}>
                            <View style={styles.selectedTeamContainer}>
                              <View style={styles.flexDirectionRow}>
                                <Feather
                                  name="user"
                                  size={15}
                                  color={AppTheme.COLORS.purple}
                                />

                                <Txt style={styles.teamMember}>
                                  {item.fullName}
                                </Txt>
                              </View>

                              <View style={[styles.privateOfficeContainer]}>
                                <Txt style={styles.privateOffice}>
                                  {Strings.privateOffice}
                                </Txt>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </Wrapper>
                      ) : null,
                    )}
                  </View>
                  <View>
                    {allMembersSelected?.dedicatedMembers?.map(item =>
                      !item?.isAdministrator && !item?.isPayingMember ? (
                        <Wrapper key={item?.Id} style={styles.card}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate(
                                ScreensName.teamMemberDetail,
                                {name: item?.fullName},
                              );
                            }}>
                            <View style={styles.selectedTeamContainer}>
                              <View style={styles.flexDirectionRow}>
                                <Feather
                                  name="user"
                                  size={15}
                                  color={AppTheme.COLORS.orange}
                                />

                                <Txt style={styles.teamMember}>
                                  {item.fullName}
                                </Txt>
                              </View>

                              <View
                                style={[
                                  styles.dedicatedDeskContainer,
                                  {alignSelf: 'flex-end'},
                                ]}>
                                <Txt style={styles.dedicatedDesk}>
                                  {item?.deskName}
                                </Txt>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </Wrapper>
                      ) : null,
                    )}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        
        </Frame>
      </>
    );
  }

  //WHEN ADMIN LOGIN
  else {
    return (
      <Frame
      >
        <View style={styles.mainContainer}>
          <View style={{marginHorizontal: scale(16)}}>
            <Txt style={styles.title}>{`Team ${userData?.TeamNames}`}</Txt>
            <View style={[styles.allignInRow, {marginTop: normalize(21)}]}>
              <View style={styles.imgTxtContainer}>
                <View>
                  {/* <Svg width={'100%'}> */}
                  <TeamManagment
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}
                  />
                  {/* </Svg> */}
                </View>
                <Txt style={styles.teamManagment}>Management</Txt>
              </View>

              {editMembersToggle ? null : (
                <TouchableOpacity
                  accessibilityLabel="editAdmin"
                  onPress={() => {
                    setEditAdminToggle(!editAdminToggle);
                  }}>
                  <View
                    style={[
                      styles.editContainer,
                      {
                        backgroundColor: isDarkMode
                          ? AppTheme.COLORS.btnActiveDarkMode
                          : AppTheme.COLORS.purple,
                        borderWidth:isDarkMode ? 1 : 0
                      },
                    ]}>
                    <Txt style={styles.edit}>
                      {editAdminToggle ? 'Save' : 'Edit'}
                    </Txt>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <ShimmerPlaceHolder
              visible={LeadTeamManagementPending === false}
              shimmerStyle={styles.shimmerView}></ShimmerPlaceHolder>
            {/* ADMINISTRATOR UI AND FUNCTIONALITY */}

            {teamLead?.map(item => (
              <Wrapper key={item?.Id} style={styles.card}>
                <View style={styles.allignInRow}>
                  <View style={[styles.flexDirectionRow, {alignItems: 'center'}]}>
                    <Feather
                      name="user"
                      size={15}
                      color={
                        allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk
                          ? AppTheme.COLORS.orange
                          : AppTheme.COLORS.purple
                      }
                    />
                    <View>
                      <Txt style={styles.teamName}>{item.fullName}</Txt>
                      <View
                        style={[
                          styles.flexDirectionRow,
                          {
                            marginTop: normalize(6),
                            marginLeft: normalize(20),
                          },
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

                  {allMembersSelected?.isMultiple === false ? 
                  allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk ? (
                    <View style={[styles.dedicatedDeskContainer]}>
                      <Txt style={styles.dedicatedDesk}>
                      {item?.deskName}
                      </Txt>
                    </View>
                  ) : (
                    <View style={[styles.privateOfficeContainer]}>
                      <Txt style={styles.privateOffice}>
                        {Strings.privateOffice}
                      </Txt>
                    </View>
                  )
                :
                <View style={[styles.privateOfficeContainer]}>
                      <Txt style={styles.privateOffice}>
                        {Strings.privateOffice}
                      </Txt>
                    </View>
                }

                  
                </View>
              </Wrapper>
            ))}
            <ShimmerPlaceHolder
              visible={LeadTeamManagementPending === false}
              shimmerStyle={styles.shimmerView}></ShimmerPlaceHolder>

            {/* PAYING MEMBER UI AND FUNCTIONALITY */}
            {payingMember?.map(item => (
              <Wrapper key={item?.Id} style={styles.card}>
                <View style={styles.allignInRow}>
                  <View style={[styles.flexDirectionRow, {alignItems: 'center'}]}>
                    <Feather
                      name="user"
                      size={15}
                      color={
                        allMembersSelected?.isMultiple === false
                          ? allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk
                            ? AppTheme.COLORS.orange
                            : AppTheme.COLORS.purple
                          : privateOfficeMembers?.some(
                            member =>
                              member.Id === item?.Id && member.isPayingMember,
                          )
                            ? AppTheme.COLORS.purple
                            : AppTheme.COLORS.orange
                      }
                    />
                    <View>
                      <Txt style={styles.teamName}>{item.fullName}</Txt>
                      <View
                        style={[
                          styles.flexDirectionRow,
                          {
                            marginTop: normalize(6),
                            marginLeft: normalize(20),
                          },
                        ]}>
                        <View
                          style={[
                            styles.teamRoleContainer,
                            {backgroundColor: AppTheme.COLORS.purple},
                          ]}>
                          <Txt style={styles.teamRole}>Paying member</Txt>
                        </View>
                      </View>
                    </View>
                  </View>

                  {allMembersSelected?.isMultiple === false ? (
                    allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk ? (
                      <View style={[styles.dedicatedDeskContainer]}>
                        <Txt style={styles.dedicatedDesk}>
                          {item?.deskName}
                        </Txt>
                      </View>
                    ) : (
                      <View style={[styles.privateOfficeContainer]}>
                        <Txt style={styles.privateOffice}>
                          {Strings.privateOffice}
                        </Txt>
                      </View>
                    )
                  ) : privateOfficeMembers.some(
                    member => member.Id === item?.Id && member.isPayingMember,
                  ) ? (
                      <View style={[styles.privateOfficeContainer]}>
                        <Txt style={styles.privateOffice}>
                          {Strings.privateOffice}
                        </Txt>
                      </View>
                    ) : (
                      <View style={[styles.dedicatedDeskContainer]}>
                        <Txt style={styles.dedicatedDesk}>
                          {item?.deskName}
                        </Txt>
                      </View>
                    )}
                </View>
              </Wrapper>
            ))}

            <Divider style={styles.divider} />

            <View style={styles.allignInRow}>
              <View style={styles.imgTxtContainer}>
                <View>
                  {/* <Svg width={'100%'}> */}
                  <MyTeamMembers
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}
                  />
                  {/* </Svg> */}
                </View>
                <Txt style={styles.teamManagment}>Member(s)</Txt>
              </View>
              {editAdminToggle ? null : (
                <TouchableOpacity
                  accessibilityLabel="editMember"
                  onPress={() => {
                    setEditMembersToggle(!editMembersToggle);
                  }}>
                  <View
                    style={[
                      styles.editContainer,
                      {
                        backgroundColor: isDarkMode
                          ? AppTheme.COLORS.btnActiveDarkMode
                          : AppTheme.COLORS.purple,
                        borderWidth:isDarkMode ? 1 : 0
                      },
                    ]}>
                    <Txt style={styles.edit}>
                      {editMembersToggle ? 'Save' : 'Edit'}
                    </Txt>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <ShimmerPlaceHolder
              visible={LeadTeamManagementPending === false}
              shimmerStyle={styles.shimmerView}></ShimmerPlaceHolder>
            {/* TEAM MEMBER UI AND FUNCTIONALITY IN CASE OF PRIVATE OFFICE OR DEDICATED DESK PLAN */}
            {allMembersSelected?.isMultiple === false ? (
              <View>
                <ShimmerPlaceHolder
                  visible={LeadTeamManagementPending === false}
                  shimmerStyle={styles.shimmerViewInactive}></ShimmerPlaceHolder>
                {removeMembers?.map(item => {
                  item &&
                !item?.isAdministrator &&
                !item?.isPayingMember &&
                LeadTeamManagementPending === false ? (
                      <Txt style={styles.memberStatus}>Active</Txt>
                    ) : null;
                })}
                {removeMembers?.map(item =>
                  !item?.isAdministrator && !item?.isPayingMember ? (
                    <Wrapper key={item?.Id} style={styles.card}>
                      <TouchableOpacity
                        accessibilityLabel="detailMember"
                        onPress={() => {
                          if (!editMembersToggle) {
                            navigation.navigate(ScreensName.teamMemberDetail, {
                              name: item?.fullName,
                              companyName: userData?.CompanyName,
                              joiningDate: allMembersSelected?.startDate,
                              resourceType:
                              allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk
                                ? 'Dedicated Desk'
                                : 'Private Office',
                            });
                          } else {
                          /* empty */
                          }
                        }}>
                        <View style={styles.selectedTeamContainer}>
                          <View style={styles.flexDirectionRow}>
                            <Feather
                              name="user"
                              size={15}
                              color={
                                allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk
                                  ? AppTheme.COLORS.orange
                                  : AppTheme.COLORS.purple
                              }
                            />

                            <Txt style={styles.teamMember}>{item.fullName}</Txt>
                          </View>

                          <View style={styles.closeContainer}>
                            {allMembersSelected?.ResourceTypeId === ResourceId.dedicatedDesk ? (
                              <View
                                style={[
                                  styles.dedicatedDeskContainer,
                                  {alignSelf: 'flex-end'},
                                ]}>
                                <Txt style={styles.dedicatedDesk}>
                                {item?.deskName}
                                </Txt>
                              </View>
                            ) : (
                              <View style={[styles.privateOfficeContainer]}>
                                <Txt style={styles.privateOffice}>
                                  {Strings.privateOffice}
                                </Txt>
                              </View>
                            )}
                            {editMembersToggle ? (
                              <TouchableOpacity
                                accessibilityLabel="removeMember"
                                onPress={() => {
                                  handleCloseBtnMember({
                                    name: item?.fullName,
                                    resourceType:
                                    allMembersSelected?.ResourceTypeId ===
                                    ResourceId.dedicatedDesk
                                      ? 'desk'
                                      : 'office',
                                  });
                                  setSelectedMember(item);
                                }}>
                                <View style={styles.closeBtn}>
                                  <MaterialCommunityIcons
                                    name="close"
                                    size={20}
                                    color={AppTheme.COLORS.red}
                                  />
                                </View>
                              </TouchableOpacity>
                            ) : null}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Wrapper>
                  ) : null,
                )}
              </View>
            ) : (
              <View>
                <ShimmerPlaceHolder
                  visible={LeadTeamManagementPending === false}
                  shimmerStyle={styles.shimmerViewInactive}></ShimmerPlaceHolder>
                {privateOfficeMembers?.map(item => {
                  deskMembers?.map(i => {
                    ((item && !item?.isAdministrator && !item?.isPayingMember) ||
                    (i && !i?.isAdministrator && !i?.isPayingMember)) &&
                  LeadTeamManagementPending === false ? (
                        <Txt style={styles.memberStatus}>Active</Txt>
                      ) : null;
                  });
                })}

                <View>
                  {/* TEAM MEMBER UI AND FUNCTIONALITY IN CASE OF PRIVATE OFFICE  PLAN */}
                  {privateOfficeMembers?.map(item =>
                    !item?.isAdministrator && !item?.isPayingMember ? (
                      <Wrapper key={item?.Id} style={styles.card}>
                        <TouchableOpacity
                          accessibilityLabel="detailOffice"
                          onPress={() => {
                            if (!editMembersToggle) {
                              navigation.navigate(ScreensName.teamMemberDetail, {
                                name: item?.fullName,
                                companyName: userData?.CompanyName,
                                joiningDate: allMembersSelected?.startDate,
                                resourceType: 'Private Office',
                              });
                            } else {
                            /* empty */
                            }
                          }}>
                          <View style={styles.selectedTeamContainer}>
                            <View style={styles.flexDirectionRow}>
                              <Feather
                                name="user"
                                size={15}
                                color={AppTheme.COLORS.purple}
                              />

                              <Txt style={styles.teamMember}>
                                {item.fullName}
                              </Txt>
                            </View>

                            <View style={styles.closeContainer}>
                              <View style={[styles.privateOfficeContainer]}>
                                <Txt style={styles.privateOffice}>
                                  {Strings.privateOffice}
                                </Txt>
                              </View>

                              {editMembersToggle ? (
                                <TouchableOpacity
                                  accessibilityLabel="removeOffice"
                                  onPress={() => {
                                    handleCloseBtnMember({
                                      name: item?.fullName,
                                      resourceType: 'office',
                                    });
                                    setSelectedMember(item);
                                  }}>
                                  <View style={styles.closeBtn}>
                                    <MaterialCommunityIcons
                                      name="close"
                                      size={20}
                                      color={AppTheme.COLORS.red}
                                    />
                                  </View>
                                </TouchableOpacity>
                              ) : null}
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Wrapper>
                    ) : null,
                  )}
                </View>
                <View>
                  {/* TEAM MEMBER UI AND FUNCTIONALITY IN CASE OF DEDICATED DESK PLAN */}
                  {deskMembers?.map(item =>
                    !item?.isAdministrator && !item?.isPayingMember ? (
                      <Wrapper key={item?.Id} style={styles.card}>
                        <TouchableOpacity
                          accessibilityLabel="detailDesk"
                          onPress={() => {
                            if (!editMembersToggle) {
                              navigation.navigate(ScreensName.teamMemberDetail, {
                                name: item?.fullName,
                                companyName: userData?.CompanyName,
                                joiningDate: allMembersSelected?.startDate,
                                resourceType: 'Dedicated Desk',
                              });
                            } else {
                            /* empty */
                            }
                          }}>
                          <View style={styles.selectedTeamContainer}>
                            <View style={styles.flexDirectionRow}>
                              <Feather
                                name="user"
                                size={15}
                                color={AppTheme.COLORS.orange}
                              />

                              <Txt style={styles.teamMember}>
                                {item.fullName}
                              </Txt>
                            </View>

                            <View style={styles.closeContainer}>
                              <View
                                style={[
                                  styles.dedicatedDeskContainer,
                                  {alignSelf: 'flex-end'},
                                ]}>
                                <Txt style={styles.dedicatedDesk}>
                                  {item?.deskName}
                                </Txt>
                              </View>
                              {editMembersToggle ? (
                                <TouchableOpacity
                                  accessibilityLabel="removeDesk"
                                  onPress={() => {
                                    handleCloseBtnMember({
                                      name: item?.fullName,
                                      resourceType: 'desk',
                                    });
                                    setSelectedMember(item);
                                  }}>
                                  <View style={styles.closeBtn}>
                                    <MaterialCommunityIcons
                                      name="close"
                                      size={20}
                                      color={AppTheme.COLORS.red}
                                    />
                                  </View>
                                </TouchableOpacity>
                              ) : null}
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Wrapper>
                    ) : null,
                  )}
                </View>
              </View>
            )}
            <ShimmerPlaceHolder
              visible={LeadTeamManagementPending === false}
              shimmerStyle={styles.shimmerViewInactive}></ShimmerPlaceHolder>
            {inactiveMembers.length > 0 && LeadTeamManagementPending === false ? (
              <Txt style={styles.memberStatus}>Inactive</Txt>
            ) : null}
            <ShimmerPlaceHolder
              visible={LeadTeamManagementPending === false}
              shimmerStyle={styles.shimmerView}></ShimmerPlaceHolder>
            {/* INACTIVE MEMBERS UI AND FUNCTIONALITY */}
            {inactiveMembers?.map(item =>
              !item?.isAdministrator && !item?.isPayingMember ? (
                <Wrapper key={item?.Id} style={styles.card}>
                  <TouchableOpacity
                    accessibilityLabel="detailInactive"
                    onPress={() => {
                      if (!editMembersToggle) {
                        navigation.navigate(ScreensName.teamMemberDetail, {
                          name: item?.fullName,
                          companyName: userData?.CompanyName,
                          joiningDate: allMembersSelected?.startDate,
                          resourceType: '-',
                        });
                      } else {
                        navigation.navigate(
                          ScreensName.addMembers,

                          {
                            data: {
                              isMultiple: allMembersSelected?.isMultiple,
                              deskResourceTypeId:
                              allMembersSelected?.isMultiple === true
                                ? allMembersSelected?.dedicatedResourceTypeId
                                : allMembersSelected?.ResourceTypeId,
                              officeResourceTypeId:
                              allMembersSelected?.isMultiple === true
                                ? allMembersSelected?.privateResourceTypeId
                                : allMembersSelected?.ResourceTypeId,
                              nexudusTeamId: userData?.TeamIds,
                              capacity: allMembersSelected?.deskCapacity,
                              companyName: userData?.CompanyName,
                              activeMembers:
                              allMembersSelected?.isMultiple === true
                                ? {
                                  privateOfficeMembers: privateOfficeMembers,
                                  deskMembers: deskMembers,
                                }
                                : removeMembers,

                              inactiveMembers: inactiveMembers,
                              email: item?.email,
                              name: item?.fullName,
                              phone: item?.phoneNumber,
                              workTitle: item?.workTitle,
                            },
                          },
                        );
                      }
                    }}>
                    <View style={styles.selectedTeamContainer}>
                      <View style={styles.flexDirectionRow}>
                        <Feather
                          name="user"
                          size={15}
                          color={AppTheme.COLORS.yellow}
                        />

                        <Txt style={styles.teamMember}>{item.fullName}</Txt>
                      </View>
                      {editMembersToggle ? (
                        <TouchableOpacity
                          accessibilityLabel="removeInactive"
                          onPress={() => {
                            handleCloseBtnMember({
                              name: item?.fullName,
                              resourceType: 'inactive',
                            });
                            setSelectedMember(item);
                          }}>
                          <View style={styles.closeBtn}>
                            <MaterialCommunityIcons
                              name="close"
                              size={20}
                              color={AppTheme.COLORS.red}
                            />
                          </View>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </Wrapper>
              ) : null,
            )}

            {/* CREDITS TOGGLE */}
            {editAdminToggle || editMembersToggle ? null : (
              <View>
                <View style={styles.creditUsageContainer}>
                  <View>
                    <TeamCredits
                      stroke={isDarkMode ? AppTheme.COLORS.white : null}
                    />
                  </View>
                  <Txt style={styles.creditUsage}>Credit Usage</Txt>
                </View>
                <View style={styles.toggleContainer}>
                  <View style={styles.allignInRow}>
                    <Txt style={styles.poolText}>Pool team credits</Txt>
                    <View>
                      <ToggleSwitch
                        isOn={creditToggle}
                        onColor={AppTheme.COLORS.primaryGreenBg}
                        offColor={AppTheme.COLORS.white}
                        thumbOffStyle={styles.thumbOffStyle}
                        trackOffStyle={styles.trackOff}
                        onToggle={isOn => {
                          console.log('changed to : ', creditToggle);
                          onPoolCreditToggle(!creditToggle);
                        }}
                      />
                    </View>
                  </View>
                  <Txt style={styles.poolDescText}>
                  All team members credits will be pooled and can be used by
                  anyone in the team.
                  </Txt>
                </View>
                <View
                  style={[styles.toggleContainer, {marginTop: normalize(20)}]}>
                  <View style={styles.allignInRow}>
                    <Txt style={styles.poolText}>Credits purchase permission</Txt>

                    <View>
                      <ToggleSwitch
                        isOn={creditPurchaseToggle}
                        onColor={AppTheme.COLORS.primaryGreenBg}
                        offColor={AppTheme.COLORS.white}
                        thumbOffStyle={styles.thumbOffStyle}
                        trackOffStyle={styles.trackOff}
                        onToggle={isOn => {
                          console.log('changed to : ', creditPurchaseToggle);
                          onCreditPurchaseToggle(!creditPurchaseToggle);
                        }}
                      />
                    </View>
                  </View>
                  <Txt style={styles.poolDescText}>
                  Allow members to purchase credit packages. Amount will be
                  charged in team memo.
                  </Txt>
                </View>
              </View>
            )}
          </View>
          {editMembersToggle ? (
            <View style={[styles.btnStyle, {marginHorizontal: scale(16)}]}>
              <Botton
                accessibilityLabel="addMemberBtn"
                title={'Add New Member'}
                loading={false}
                onPress={() => {
                  navigation.navigate(ScreensName.addMembers, {
                    data: {
                      isMultiple: allMembersSelected?.isMultiple,
                      deskResourceTypeId:
                      allMembersSelected?.isMultiple === true
                        ? allMembersSelected?.dedicatedResourceTypeId
                        : null,
                      officeResourceTypeId:
                      allMembersSelected?.isMultiple === true
                        ? allMembersSelected?.privateResourceTypeId
                        : allMembersSelected?.ResourceTypeId,
                      nexudusTeamId: userData?.TeamIds,
                      capacity: allMembersSelected?.deskCapacity,
                      companyName: userData?.CompanyName,
                      activeMembers:
                      allMembersSelected?.isMultiple === true
                        ? {
                          privateOfficeMembers: privateOfficeMembers,
                          deskMembers: deskMembers,
                        }
                        : removeMembers,
                    },
                  });
                }}
              />
        
            </View>
          ) : null}
          {editAdminToggle ? (
            <View style={{marginHorizontal: scale(16)}}>
              {/* change Pay Member Button */}
              <Botton
                accessibilityLabel="changePayingMemberBtn"
                title={'Change Paying Member'}
                loading={false}
                onPress={() => {
                  bottomSheetChangePayingMember.current?.snapToIndex(0);
                }}
              />

           

              {/* change Pay Member Button */}
              <Botton
                accessibilityLabel="changeAdminBtn"
                title={'Change Administrator'}
                loading={false}
                onPress={() => {
                  bottomSheetChangeAdmin.current?.snapToIndex(0);
                }}
                singleButtonStyle={styles.btnMargin}
              />

            </View>
          ) : null}
        </View>
        {/* BOTTOM SHEET WHEN USER REMOVES TEAM MEMBER */}
        <BottomSheet
          ref={bottomSheetRemoveMember}
          snapPoints={snapPointsRemoveMember}
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
            <Txt style={styles.removeMember}>Remove team member</Txt>
            <Txt style={styles.removeMemberDesc}>
              Are you sure want you want to remove this member?
            </Txt>
            <View style={styles.paddingHorizontal}>
              <Wrapper
                style={[
                  styles.card,{flexDirection: 'row',
                    justifyContent: 'space-between',backgroundColor : isDarkMode ?  'rgba(134, 134, 134, 0.06)' : AppTheme.COLORS.white}
                ]}
               
              >
                {/* <View style={styles.selectedTeamContainer}> */}
                <View style={styles.flexDirectionRow}>
                  <Feather
                    name="user"
                    size={15}
                    color={
                      resourceBs === 'office'
                        ? AppTheme.COLORS.purple
                        : resourceBs === 'desk'
                          ? AppTheme.COLORS.orange
                          : AppTheme.COLORS.yellow
                    }
                  />
                  <Txt style={styles.teamMember}>{memberBS}</Txt>
                </View>

                {resourceBs === 'office' ? (
                  <View
                    style={[
                      styles.privateOfficeContainer,
                      {alignSelf: 'flex-end'},
                    ]}>
                    <Txt style={styles.privateOffice}>
                      {Strings.privateOffice}
                    </Txt>
                  </View>
                ) : resourceBs === 'desk' ? (
                  <View
                    style={[
                      styles.dedicatedDeskContainer,
                      {alignSelf: 'flex-end'},
                    ]}>
                    <Txt style={styles.dedicatedDesk}>
                      {item?.deskName}
                    </Txt>
                  </View>
                ) : null}
                {/* </View> */}
              </Wrapper>
            </View>
            <View style={styles.btnAllign}>
              {/* both Yes and No Buttons */}
              <Botton
                variant={'v2'}
                continueBtnAccessibilityLabel={'removeNoBtn'}
                continueTitle={'Yes'}
                loading={RemoveMemberPending === true ? true : false}
                onContinue={() => {
                  bottomSheetRemoveMemberDone.current?.snapToIndex(0);
                  bottomSheetRemoveMember.current?.close();
                  if (allMembersSelected?.isMultiple === true) {
                    if (resourceBs === 'office') {
                      privateOfficeMembers?.map((item, index) => {
                        handleRemoveMember(selectedMember, index);
                      });
                    } else if (resourceBs === 'desk') {
                      deskMembers?.map((item, index) => {
                        handleRemoveMember(selectedMember, index);
                      });
                    } else {
                      inactiveMembers?.map((item, index) => {
                        handleRemoveMember(selectedMember, index);
                      });
                    }
                  } else {
                    removeMembers?.map((item, index) => {
                      handleRemoveMember(selectedMember, index);
                    });

                    if (resourceBs === 'inactive') {
                      inactiveMembers?.map((item, index) => {
                        handleRemoveMember(selectedMember, index);
                      });
                    }
                  }
                }}
                cancelBtnAccessibilityLabel={'removeYesBtn'}
                onCancel={() => {
                  bottomSheetRemoveMember.current?.close();
                }}
                cancelTitle={'No'}
              />

             
            </View>
          </BottomSheetView>
        </BottomSheet>

        {/* BOTTOM SHEET WHEN USER REMOVED TEAM MEMBER */}
        <BottomSheet
          ref={bottomSheetRemoveMemberDone}
          snapPoints={snapPointsRemoveMemberDone}
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
          <BottomSheetView
            style={[
              styles.bottomSheetTitle,
              {paddingHorizontal: normalize(20)},
            ]}>
            <Txt style={styles.removeMember}>Member Removed</Txt>
            <Txt style={styles.removeMemberDone}>
              You have successfully removed this member.You will not be charged
              for this member in next billing cycle.
            </Txt>
            <View style={styles.paddingHorizontal}></View>

            <Botton
              accessibilityLabel="removeDoneBtn"
              loading={false}
              title={'Done'}
              disabled={false}
              small={false}
              onPress={() => {
                bottomSheetRemoveMemberDone.current?.close();
              }}
              stylesContainer={styles.DoneBtnStyle}
            />
          </BottomSheetView>
        </BottomSheet>

        {/* BOTTOM SHEET WHEN USER CHANGES PAYING MEMBER */}
        <BottomSheet
          ref={bottomSheetChangePayingMember}
          snapPoints={snapPointsChangePayingMember}
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
          <BottomSheetScrollView
            contentContainerStyle={styles.bottomSheetScroll}
            showsVerticalScrollIndicator={false}>
            <BottomSheetView
              style={[
                styles.bottomSheetTitle,
                {paddingHorizontal: normalize(20)},
              ]}>
              <View>
                <Txt style={styles.payingMember}>Paying Members</Txt>
                <Txt style={styles.payingMemberChange}>
                  Please select the new payee, your app may restart in order to
                  reflect the changes.
                </Txt>
                {allMembersSelected?.allActiveMembers?.map(item =>
                  !item?.isPayingMember ? (
                    // eslint-disable-next-line react/jsx-key
                    <TouchableOpacity
                      onPress={() => {
                        selectPM(item?.Id, item);
                        console.log('selected paying memebr', item?.Id);
                      }}
                      style={[
                        styles.memberContainer,
                        {borderWidth: changePM == item?.Id ? 1 : 0},
                      ]}>
                      <Txt style={styles.nameText}>{item?.fullName}</Txt>
                      {changePM == item?.Id && (
                        <View style={styles.checkedContainer}>
                          <MaterialCommunityIcons
                            name="check"
                            size={20}
                            color={AppTheme.COLORS.white}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  ) : null,
                )}
              </View>
              <View style={[styles.btnAllign, {paddingHorizontal: 0}]}>
                <Botton
                  variant={'v2'}
                  continueBtnAccessibilityLabel={'removeNoBtn'}
                  continueTitle={'Update'}
                  onContinue={() => {
                    setChangeAdmin('');
                    setChangePM('');
                    onUpdateBtn();
                  }}
                  disabled={changePM ? false : true}
                  loading={otpGeneratePending ? true : false}
                  cancelBtnAccessibilityLabel={'cancelBtn'}
                  onCancel={() => {
                    bottomSheetChangePayingMember.current?.close();
                  }}
                  cancelTitle={'Cancel'}
                />

                
              </View>
            </BottomSheetView>
          </BottomSheetScrollView>
        </BottomSheet>

        {/* BOTTOM SHEET WHEN USER CHANGES ADMIN */}
        <BottomSheet
          ref={bottomSheetChangeAdmin}
          snapPoints={snapPointsChangeAdmin}
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
          <BottomSheetScrollView
            contentContainerStyle={styles.bottomSheetScroll}
            showsVerticalScrollIndicator={false}>
            <BottomSheetView
              style={[
                styles.bottomSheetTitle,
                {paddingHorizontal: normalize(20)},
              ]}>
              <View>
                <Txt style={styles.payingMember}>Administrator</Txt>
                <Txt style={styles.payingMemberChange}>
                Please select the new administrator, your app may restart in
                order to reflect the changes.
                </Txt>
                {allMembersSelected?.allActiveMembers?.map(item =>
                  !item?.isAdministrator ? (
                  // eslint-disable-next-line react/jsx-key
                    <TouchableOpacity
                      onPress={() => {
                        selectAdmin(item?.Id, item);
                        console.log('selected day', item?.Id);
                      }}
                      style={[
                        styles.memberContainer,
                        {borderWidth: changeAdmin == item?.Id ? 1 : 0},
                      ]}>
                      <Txt style={styles.nameText}>{item?.fullName}</Txt>
                      {changeAdmin == item?.Id && (
                        <View style={styles.checkedContainer}>
                          <MaterialCommunityIcons
                            name="check"
                            size={20}
                            color={AppTheme.COLORS.white}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  ) : null,
                )}
              </View>
              <View style={[styles.btnAllign, {paddingHorizontal: 0}]}>
                {/* Cancel and Update btns */}
                <Botton
                  variant={'v2'}
                  continueBtnAccessibilityLabel={'cancelAdminBtn'}
                  continueTitle={'Update'}
                  onContinue={() => {
                    setChangeAdmin('');
                    setChangePM('');
                    onUpdateBtn();
                  }}
                  disabled={changeAdmin ? false : true}
                  loading={otpGeneratePending ? true : false}
                  // cancel btn
                  cancelBtnAccessibilityLabel={'cancelAdminBtn'}
                  onCancel={() => {
                    bottomSheetChangeAdmin.current?.close();
                  }}
                  cancelTitle={'Cancel'}
                />

              
              </View>
            </BottomSheetView>
          </BottomSheetScrollView>
        </BottomSheet>

        {/* BOTTOM SHEET WHEN USER RECEIVES CODE AND EITHER SUBMITING IT OR ASKING FOR ANOTHER CODE */}
        <BottomSheet
          ref={bottomSheetUpdate}
          snapPoints={snapPointsUpdate}
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
          <BottomSheetScrollView
            contentContainerStyle={styles.bottomSheetScroll}
            showsVerticalScrollIndicator={false}>
            <BottomSheetView
              style={[
                styles.bottomSheetTitle,
                {paddingHorizontal: normalize(20)},
              ]}>
              <View style={styles.img}>
                <View>
                  <Svg width={'100%'}>
                    <CodeResend />
                  </Svg>
                </View>
                {/* {console.log('counter-111--',counter)} */}
                <Txt style={styles.timer}>{counter}</Txt>
              </View>
              <Txt style={styles.codeResent}>Code Resent</Txt>
              <Txt style={styles.codeResentDone}>
                We have sent you another code on your email address, please that
                code below to verify change
              </Txt>

              <TextInput
                accessibilityLabel="code"
                // label="Name"
                value={code?.value}
                error={code?.error}
                hideErrorContainer={true}
                onChangeText={text => {
                  setCode({value: text, error: ''});
                  console.log('code is:', code);
                }}
                returnKeyType="done"
                // onSubmitEditing={onSubmit}
                styleLabel={styles.textInputLabel}
                styleInputContainer={
                  code?.error
                    ? [
                      styles.textInputContainer,
                      {borderWidth: 1, borderColor: AppTheme.COLORS.error},
                    ]
                    : styles.textInputContainer
                }
                styleInputText={styles.textInput}
              />

              <View
                style={[
                  styles.btnAllign,
                  {
                    paddingHorizontal: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}>
                {/* Resend Code Btn */}
                <Botton
                  accessibilityLabel="resendCode"
                  loading={false}
                  title={'Resend Code'}
                  disabled={counter == 0 ? false : true}
                  onPress={() => {
                    onUpdateBtn();
                  }}
                  singleButtonStyle={[
                    styles.resendCodeBtn,
                    {
                      backgroundColor:
                        counter == 0
                          ? AppTheme.COLORS.white
                          : AppTheme.COLORS.greyLight,
                      borderWidth: counter == 0 ? 1 : 0,
                    },
                  ]}
                  titleStyle={{
                    color:
                      counter == 0
                        ? AppTheme.COLORS.black
                        : AppTheme.COLORS.white,
                  }}
                />

                {/* Submit Code Btn*/}
                <Botton
                  accessibilityLabel="submitCode"
                  loading={ChangeRolePending === true ? true : false}
                  title={'Submit Code'}
                  disabled={code.value === '' ? true : false}
                  onPress={() => {
                    onSubmitCode();
                  }}
                  singleButtonStyle={styles.BtnStyle}
                />

                
              </View>
            </BottomSheetView>
          </BottomSheetScrollView>
        </BottomSheet>

        {/* BOTTOM SHEET WHEN USER HAS SUBMITTED CODE */}
        <BottomSheet
          ref={bottomSheetSubmitCode}
          snapPoints={snapPointsSubmitCode}
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
          }}
        >
          <BottomSheetView
            style={[
              styles.bottomSheetTitle,
              {paddingHorizontal: normalize(20)},
            ]}>
            <Txt style={styles.removeMember}>Request sent</Txt>
            <Txt style={[styles.removeMemberDone, {marginTop: normalize(20)}]}>
              To see the changes, please logout then login again
            </Txt>
            <View style={styles.paddingHorizontal}></View>
            {/* <PrimaryButton
              accessibilityLabel="submittedDone"
              loading={false}
              title={'Done'}
              disabled={false}
              small={false}
              onPress={() => {
                onSubmitDone();
                bottomSheetSubmitCode.current?.close();
              }}
              stylesContainer={styles.DoneBtnStyle}
            /> */}
            <Botton
              accessibilityLabel="submittedDone"
              loading={false}
              title={'Done'}
              disabled={false}
              onPress={() => {
                onSubmitDone();
                bottomSheetSubmitCode.current?.close();
              }}
              singleButtonStyle={styles.DoneBtnStyle}
            />
          </BottomSheetView>
        </BottomSheet>
      </Frame>
    );
  }
};
export default MyTeam;
