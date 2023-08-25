import {
  StatusBar,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import Svg from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import normalize from 'react-native-normalize';
import Wrapper from '../../shared/components/core/Wrapper';
import {useDispatch, useSelector} from 'react-redux';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import { ResourceId } from '../../shared/config/resourceId';
import MeetingWelcomeScreen from '../meetinghomescreen/MeetingHomeScreen';
import {selectAdministrator} from '../../shared/redux/slices/isadminSlice';
import {GetTeam} from '../../shared/redux/action/GetTeam';
import {GetPendingPlan} from '../../shared/redux/action/GetPendingPlan';
import {PendingStatus} from '../../shared/redux/action/PendingStatus';
import {setResourceData} from '../../shared/redux/slices/planResourceDataSlice';
import {ResourcePlan} from '../../shared/redux/action/ResourcePlan';
import styles from './HomeScreen.style';
import {AppTheme} from '../../shared/theme';
import TeamLeadHomeCard from '../../shared/components/teamLeadhomeCard/TeamLeadHomeCard';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import {useNavigation} from '@react-navigation/native';
import Strings from './../../shared/constants/Strings';
import FintechLogo from '../../assets/images/fintechHomeScreenLogo.svg';
import MenuIcon from '../../assets/images/menuIcon.svg';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import Pending from '../../assets/images/Pending.js';
import {useState} from 'react';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';

const HomeScreen = () => {
  const administrator = useSelector(selectAdministrator);
  // const {administrator}=route.params;
  console.log('admin781921-----', administrator);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const loginData = useSelector(state => state.auth?.data);
  const token = loginData?.access_token;

  // const {teamId}=route.params;
  // console.log('teamId 55----',teamId);

  const teamMembers = useSelector(state => state?.getTeam);
  //   console.log('teamMembers 93893893---', teamMembers);
  const teamMembersPending = teamMembers?.loading;
  console.log('teamMembersPending----', teamMembersPending);
  // const teammembersdata = teamMembers?.data;

  // const allTeamMembers=teammembersdata?.find((item)=>{ return item;});
  // console.log('All members 22---', allTeamMembers);
  // const teamId=allTeamMembers?.Team?.Id;
  // console.log('team Id----',teamId);
  // const [approve,setApprove]=useState(false);
  // const pending = useSelector(state => state?.pendingStatus);
  // const pendingData = pending?.data;
  const pendinsLoading = useSelector(state => state?.pendingStatus?.loading);
  // console.log('pending --data---', pendingData);

  const resourcePlan = useSelector(state => state?.resourcePlan);
  // const resourcePlanData = useSelector((state) => state?.resourcePlan?.data)
  const resourcePlanPending = resourcePlan?.loading;
  const [resourcePlanData, setResourcePlanData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingStatus, setPendingStatus] = useState();
  const [pendingError, setPendingError] = useState();
  //Dark MODE
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  const [teamId, setTeamId] = useState(null);
  console.log('teamId 22---', teamId);
  // const [pendingError,setPendingError]=useState();

  //In this function we getting Id of every  resource
  const handleResourcesGetData = item => {
    console.log('DD id 43434a---------', item);
    if (item?.isMultiple === false && item?.Id === ResourceId.dedicatedDesk) {
      navigation.navigate(ScreensName.dedicatedDeskScreenOne, {
        dedicatedDesk: item,
      });
      dispatch(setResourceData(item));
    } else if (item?.isMultiple === false && item?.Id === ResourceId.privateOffice) {
      navigation.navigate(ScreensName.privateOfficeScreenOne, {
        privateOffice: item,
      });
      dispatch(setResourceData(item));
    } else {
      navigation.navigate(ScreensName.hybridScreenOne, {
        hybrid: item,
      });
      dispatch(setResourceData(item));
    }
  };
  useEffect(() => {
    dispatch(ResourcePlan())
      .unwrap()
      .then(result => {
        // check result
        console.log(' resource plans data --', JSON.stringify(result));
        setResourcePlanData(result);
      }).catch(err=>{
        console.log(" resource plans err--",err)
      });
  }, []);

  useEffect(() => {
    dispatch(GetTeam(token))
      .unwrap()
      .then(result => {
        // check result
        const allTeamMembers = result?.find(item => {
          return item;
        });
        var teamid = allTeamMembers?.Team?.Id;
        console.log('----login ID---', teamid);
        setTeamId(teamid);
        console.log('----login ID 2222---', teamId);
        // console.log('----login 909090---', result[0]?.AllTeamMembers);
      }).catch(err=>{
        console.log('err get team --',err);
      });
  }, [dispatch]);

  //API TO CALL PENDING STATUS
  useEffect(() => {
    dispatch(PendingStatus(teamId))
      .unwrap()
      .then(result => {
        console.log('result111--', result);
        setPendingStatus(result?.requestStatus);
      })
      .catch(error => {
        console.log('error111 pending status--', error?.error?.statusCode);

        setPendingStatus('deny');
      });

    dispatch(GetPendingPlan(teamId));
    console.log('pendingError--', pendingError);
  }, [teamId, isFocused, dispatch]);
  console.log('pendig 222--', pendingStatus);
  {
    /* PENDING STATUS 200 MEANS THAT STATUS IS PENDING AND 500 MEANS THAT REQUEST IS DENIED */
  }

  const onRefresh = () => {
    console.log('pendingstatus----', pendingStatus);
    setIsRefreshing(true);

    dispatch(PendingStatus(teamId))
      .unwrap()
      .then(result => {
        console.log('result111--', result);
        setPendingStatus(result?.requestStatus);
        dispatch(GetPendingPlan(teamId));
      });
    if (administrator === true) {
      if (pendingStatus === 'deny' || pendingError === 404) {
        dispatch(ResourcePlan())
          .unwrap()
          .then(result => {
            // check result
            console.log('----res plan result on refresh 667788a---', result);
            setResourcePlanData(result);
            
          })
          .finally(()=>{
            setIsRefreshing(false);
          });
      } else if (pendingStatus === 'approved') {
        navigation.reset({
          index: 2,
          routes: [{name: ScreensName.MeetingHomeScreen}],
        });
      }
    } else {
      if (pendingStatus === 'approved') {
        navigation.reset({
          index: 2,
          routes: [{name: ScreensName.MeetingHomeScreen}],
        });
      }
    }

    setIsRefreshing(false);
  };

  //NO PENDING STATUS
  if (pendingStatus === null) {
    return (
      <>
        <SafeAreaView style={styles.statusBar} />
        <SafeAreaView style={styles.safeAreaContainer}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={AppTheme.COLORS.black}
          />

          {/* <Loader loading={isLoading} /> */}

          <View style={styles.mainContainer}>
            {/* HEADER */}
            <View style={styles.headerContainer}>
              <View>
                <Svg width={'100%'}>
                  <FintechLogo />
                </Svg>
              </View>

              <View style={styles.allignInRow}>
                <Feather
                  size={25}
                  color={AppTheme.COLORS.white}
                  name="bell"
                  style={{marginRight: normalize(23.6)}}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ScreensName.mainMenuScreen);
                  }}>
                  <MenuIcon />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={styles.ScrollView}
              showsVerticalScrollIndicator={false}>
              <View>
                <ShimmerPlaceHolder
                  visible={
                    resourcePlanPending === false && pendinsLoading === false
                  }
                  shimmerStyle={[
                    styles.resourceType,
                    {width: '90%', borderRadius: normalize(10)},
                  ]}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  visible={
                    resourcePlanPending === false && pendinsLoading === false
                  }
                  shimmerStyle={[
                    styles.resourceType,
                    {width: '90%', borderRadius: normalize(10)},
                  ]}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  visible={
                    resourcePlanPending === false && pendinsLoading === false
                  }
                  shimmerStyle={[
                    styles.resourceType,
                    {width: '90%', borderRadius: normalize(10)},
                  ]}></ShimmerPlaceHolder>
              </View>

              <View style={styles.fintechBottomLogo}>
                <View>
                  <Svg width={'100%'}>
                    <FintechBottomLogo />
                  </Svg>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </>
    );
  }
  //IF TEAM MEMEBRS LOGIN AND THERE IS NO PLAN REQUEST
  else if (
    administrator === false &&
    (pendingStatus === 'deny' || pendingError === 404)
  ) {
    return (
      <Frame headerVariant="v3"
        mode={'View'}>
        <View style={styles.safeAreaContainer}>
          <View style={styles.mainContainer}>
            <ScrollView
              contentContainerStyle={styles.ScrollView}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }>
              <Wrapper
                style={[
                  styles.pendingstate,
                  {
                    backgroundColor: isDarkMode
                      ? AppTheme.COLORS.wrapperDarkModeBg
                      : 'rgba(230, 234, 255, 1)',
                  },
                ]}>
                <View style={styles.allignInRow}>
                  <View>
                    {/* <Svg width={'100%'}> */}
                    <Pending
                      stroke={isDarkMode ? AppTheme.COLORS.white : null}   />
                    {/* </Svg> */}
                  </View>
                  <View style={styles.marginLeft}>
                    <Txt style={styles.approvalPending}>
                      Membership Inactive
                    </Txt>
                    <Txt style={styles.approvalPendingDesc}>
                      Please wait, your team membership request is not yet
                      submitted by your team lead
                    </Txt>
                  </View>
                </View>
              </Wrapper>

              <View style={styles.fintechBottomLogo}>
                <View>
                  <Svg width={'100%'}>
                    <FintechBottomLogo />
                  </Svg>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Frame>
    );
    //IF USER LOGIN AND PLAN REQUEST IS APPROVED
  } else if (pendingStatus === 'approved') {
    return <MeetingWelcomeScreen />;
  }
  //IF USERS LOGIN AND PLAN REQUEST IS IN PENDING
  else if (pendingStatus === 'pending') {
    return (
      <Frame
        headerVariant="v3"
        mode={'View'}
        // bottomLogo={true}
      >
        <View style={styles.safeAreaContainer}>
          {/* <Loader loading={isLoading} /> */}

          <View style={styles.mainContainer}>
            <ScrollView
              contentContainerStyle={styles.ScrollView}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }>
              <Pressable
                accessibilityLabel="pendingReqMember"
                onPress={() => {
                  navigation.navigate(ScreensName.requestPending);
                }}>
                <View
                  style={[
                    styles.pendingstate,
                    {
                      backgroundColor: isDarkMode
                        ? AppTheme.COLORS.wrapperDarkModeBg
                        : 'rgba(230, 234, 255, 1)',
                    },
                  ]}>
                  <View style={styles.allignInRow}>
                    <View>
                     
                      <Pending 
                        stroke={isDarkMode ? AppTheme.COLORS.white : null}/>
                 
                    </View>
                    <View style={styles.marginLeft}>
                      <Txt style={styles.approvalPending}>Approval Pending</Txt>
                      <Txt style={styles.approvalPendingDesc}>
                        Please wait, your team membership request is in
                        processing.
                      </Txt>
                    </View>
                  </View>
                </View>
              </Pressable>

              <View style={styles.fintechBottomLogo}>
                <View>
                  <Svg width={'100%'}>
                    <FintechBottomLogo />
                  </Svg>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Frame>
    );
  }
  //IF ADMIN LOGINS AND THERE IS NO PLAN REQUEST
  else if (
    administrator === true &&
    (pendingStatus === 'deny' || pendingError === 404)
  ) {
    return (
      <>
        {console.log('i am resource type screen')}
        <Frame
          headerVariant="v3"
          mode={'View'}
          // bottomLogo={true}
        >
          <ScrollView
            contentContainerStyle={styles.ScrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }>
            <View style={styles.subContainer}>
              <View style={styles.txtContainer}>
                <Txt style={styles.title}>{Strings.welcomeToFintech}</Txt>
                <Txt style={styles.desc}>{Strings.SelectAProduct}</Txt>
                {console.log('show me last if')}
              </View>

              <View>
                <ShimmerPlaceHolder
                  visible={
                    resourcePlanPending === false && pendinsLoading === false
                  }
                  shimmerStyle={[
                    styles.resourceType,
                    {width: '90%', borderRadius: normalize(10)},
                  ]}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  visible={
                    resourcePlanPending === false && pendinsLoading === false
                  }
                  shimmerStyle={[
                    styles.resourceType,
                    {width: '90%', borderRadius: normalize(10)},
                  ]}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  visible={
                    resourcePlanPending === false && pendinsLoading === false
                  }
                  shimmerStyle={[
                    styles.resourceType,
                    {width: '90%', borderRadius: normalize(10)},
                  ]}></ShimmerPlaceHolder>
              </View>

              {/* LIST OF ALL RESOURCE PLAN */}

              {resourcePlanData?.map(item => {
                // eslint-disable-next-line react/jsx-key
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Pressable
                    onPress={() => {
                      handleResourcesGetData({
                        Id:
                          item?.isMultiple === true
                            ? item?.PrivateOfficeResourceId
                            : item?.ResourceId,
                        deskIdHybrid:
                          item?.isMultiple === true ? item?.DDResourceId : 0,
                        ResourceName: item?.ResourceName,
                        minmonth: item?.minmonth ? item?.minmonth : 0,
                        minyear: item?.minyear ? item?.minyear : 0,
                        isMultiple: item?.isMultiple,
                        isMonthAllow: item?.isMonthAllow,
                        isYearAllow: item?.isYearAllow,
                        startMonth: item?.startMonth,
                        monthRange: item?.monthRange,
                      });
                    }}>
                    {/* card for every resource */}
                    <TeamLeadHomeCard
                      homeResource={true}
                      title={item?.ResourceName}
                      id={item?.ResourceId}
                      description={
                        item?.ResourceId == ResourceId.dedicatedDesk
                          ? 'Set of dedicated desks for your team in an open space'
                          : item?.ResourceId == ResourceId.privateOffice
                            ? 'A Private room for your team'
                            : 'A combination of an office and dedicated desks'
                      }
                      image={item?.ResourceImage}
                      // image={
                      //   item?.ResourceId == ResourceId.dedicatedDesk
                      //     ? Images.dedicatedDesk
                      //     : item?.ResourceId == ResourceId.privateOffice
                      //       ? Images.privateOffice
                      //       : Images.hybrid
                      // }
                    />
                  </Pressable>
                );
              })}
            </View>
            {/* )} */}
            <View style={styles.fintechBottomLogo}>
              <View>
                <Svg width={'100%'}>
                  <FintechBottomLogo />
                </Svg>
              </View>
            </View>
          </ScrollView>
        </Frame>
      </>
    );
  }
};

export default HomeScreen;
