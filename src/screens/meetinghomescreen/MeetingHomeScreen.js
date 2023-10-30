import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Pressable,
  RefreshControl,
  ToastAndroid,
  Platform,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Feather from 'react-native-vector-icons/Feather';
import normalize from 'react-native-normalize';
import {Svg} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {GetMembershipDetail} from '../../shared/redux/action/GetMembershipDetail';

import FintechBottomLogo from '../../assets/images/PolygonHomeScreen.svg';
import Txt from '../../shared/components/core/Txt';
import {GetMyCredit} from '../../shared/redux/action/GetMyCredit';
import {selectLoginUserId} from '../../shared/redux/slices/isadminSlice';
import {GetCustomerMeetingRooms} from '../../shared/redux/action/GetCustomerMeetingRooms';
import {GetMeetingRoom} from '../../shared/redux/action/GetMeetingRoom';
import {Feeds} from '../../shared/redux/action/Feeds';
import {selectConfirmBooking} from '../../shared/redux/slices/meetingHomeScreenBookingSlice';
import {AppTheme} from '../../shared/theme';
import MeetingRoomCard from '../../shared/components/meetingRoomCard/meetingRoomCard';
import SceduledMeetingCardHome from '../../shared/components/ScheduledMeetingCardHome/ScheduledMeetingCardHome';
import PrintingCreditCard from '@components/printingCreditCard/PrintingCreditCard';
import Strings from '../../shared/constants/Strings';
import FintechLogo from '@assets/images/fintechHomeScreenLogo.svg';
import NothingSchedule from '../../assets/images/NothingSchedule.js';
import MenuIcon from '@assets/images/menuIcon.svg';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import style from './MeetingHomeScreen.Style';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import AnnouncementCard from '../../shared/components/AnnouncementCard/AnnouncementCard';
import uuid from 'react-native-uuid';
import {GetTeam} from '../../shared/redux/action/GetTeam';
import {GetTeamMemberCredit} from '../../shared/redux/action/GetTeamMemberCredit';
import PrintingCreditListItem from '../../shared/components/PrintingCreditsListItem/PrintingCreditListItem';
import Frame from '../../shared/components/core/Frame';
import {scale} from '../../shared/utils/scale';
//? QR Animation Dep
import QRButton from '../../shared/components/QRButton/QRButton';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  setQrDirection,
  setQrTrigger,
} from '../../shared/redux/slices/qrDirectionSlice';
import { Tax } from '../../shared/redux/action/Tax';

const MeetingWelcomeScreen = ({route}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.auth?.data?.access_token);
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);
  const coworkerId = useSelector(selectLoginUserId);
  const [membershipDetails, setMembershipDetails] = useState(null);
  const [memeDetailRes, setMemeDetailRes] = useState(null);
  const [meetingInvitee, setMeetingInvitee] = useState(false);
  // console.log('coworkerId----', coworkerId);
  const booking = useSelector(selectConfirmBooking);
  const meetingRoomLoading = useSelector(
    state => state?.getMeetingRoom?.loading,
  );
  const GetCustomerMeetingRoomsLoading = useSelector(
    state => state?.getCustomerMeetingRooms?.loading,
  );
  const feedData = useSelector(state => state?.feeds?.data);
  // console.log('feedData--', feedData?.feeds?.Records);
  // eslint-disable-next-line no-unused-vars
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [feedRecord, setFeedRecord] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [meetingRoomNo, setMeetingRoomNo] = useState([]);
  const [customerMeetingRooms, setCustomerMeetingRooms] = useState([]);
  const [printingCredits, setPrintingCredits] = useState(null);
  const [printingCreditLoading, setPrintingCreditLoading] = useState(false);
  const {Id, TeamIds} = useSelector(selectUserData);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  //const {data} = route.params || false;
  const data = route?.params?.dragBlocked !== undefined
  ? route?.params.dragBlocked
  : false;

  console.log("data----",data)
  const printingCredit = {
    id: 1,
    officeNo: 'Meeting Room',
    amount: 35.44,
    currency: 'SAR',
  };

  const TextExtractor = description => {
    if (meetingRoomNo?.Description) {
      const match = description.match(/<span[^>]*>([^<]*)<\/span>/);
      const text = match && match[1];
      // console.log('text---', text);
      return text;
    }
  };

  //TAX calculate

  useEffect(()=>{
    dispatch(Tax()).unwrap().then(result=>{
      console.log(" result tax --", result)
    }).catch(err=>{
      console.log("err tax--",err)
    })
    
      },[dispatch])
      
  const handleSeeMorePress = () => {
    setSeeMore(true);
  };

  useEffect(() => {
    console.log('Confirm booking ---', booking);
  }, []);

  //GETTING FEEDS FROM API
  useEffect(() => {
    dispatch(Feeds())
      .unwrap()
      .then(result => {
        console.log('result---', result?.feeds?.Records);
        setFeedRecord(result ? result?.feeds?.Records : []);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetMeetingRoom())
      .unwrap()
      .then(result => {
        console.log('resultt---', result?.meetingRooms[0]);
        setMeetingRoomNo(result ? result?.meetingRooms[0] : []);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetCustomerMeetingRooms(coworkerId))
      .unwrap()
      .then(result => {
        console.log('result of customer meeting rooms----', result);
        setCustomerMeetingRooms(result);
      })
      .catch(error => {
        console.log('error of customer meeting room ---', error);
      });
  }, [dispatch, isFocused]);

  //TIME CALCULATION
  const TimeCalculate = date => {
    const d = new Date(date);
    // console.log('date---22222---',d);
    // // const date='2023-04-05T14:45:00.000';
    // const getDate=moment(d).format('hh:mm a');
    // console.log('getdate--',getDate);
    // return getDate;

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
     // timeZone: 'UTC',
    };
    const timeFormatter = new Intl.DateTimeFormat(undefined, options);

    // Format the Date object to the desired time format
    const formattedTime = timeFormatter.format(d);

    console.log('formattedTime----', formattedTime);
    return formattedTime;
  };

  //DATE CALCULATION
  const dateCalculate = date => {
    console.log('date calculated---22222---', date);
    const newdate = new Date();
    const formattednewDate = moment.utc(newdate).format('DD, MMM YYYY');
    // Convert the month abbreviation to title case
    const formattednewMonth = formattednewDate
      .split(' ')[1]
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
    const formattednewDateString = formattednewDate.replace(
      formattednewDate.split(' ')[1],
      formattednewMonth,
    );
    console.log('00000-----date---', formattednewDateString);

    const formattedDate = moment.utc(date).format('DD, MMM YYYY');
    // Convert the month abbreviation to title case
    const formattedMonth = formattedDate
      .split(' ')[1]
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
    const formattedDateString = formattedDate.replace(
      formattedDate.split(' ')[1],
      formattedMonth,
    );

    console.log(formattedDateString);
    // if (formattednewDateString === formattedDateString )
    // { return 'Today';}
    // else{
    return formattedDateString;
    // }
  };

  //CALCULATING DIFFERENCE BETWEEN START AND  END TIME (DURATION)
  const calculateDuration = (startTime, endTime) => {
    const start = moment(startTime);
    const end = moment(endTime);
    console.log('startTime---', start), console.log('endTime----', end);
    const duration = moment.duration(end.diff(start));
    console.log('duration---', duration);
    const hours = duration.hours();
    const minutes = duration.minutes();
    if (hours < 1) {
      return `${minutes}m`;
    } else if (minutes < 1) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };

  // ?API'S Logic

  // *API Modules (Own Credits)
  const GetSelectTeamMemberCredit = useCallback(
    async id => {
      if (id) {
        try {
          setPrintingCreditLoading(true);
          const {credits, currenyCode} = await dispatch(
            GetTeamMemberCredit(id),
          ).unwrap();
          console.log(
            'API Response Is Here:----------->',
            credits,
            currenyCode,
          );
          setPrintingCredits({currency: currenyCode, credit: credits});
          setPrintingCreditLoading(false);
        } catch (error) {
          setPrintingCreditLoading(false);
          setPrintingCredits(null);
          console.error('Error while getting membership details: ', error);
          setError({Error: error});
        }
      } else {
        setPrintingCredits(null);
        setPrintingCreditLoading(false);
        console.log('Please Provide ID to Continue or Check your ID!');
      }
    },
    [dispatch],
  );

  useEffect(() => {
    // *Get Printing Credits
    GetSelectTeamMemberCredit(Id);
  }, [dispatch]);

  ///// REFRESH PULLER LOGIC//////
  const onRefresh = () => {
    setIsRefreshing(true);

    GetSelectTeamMemberCredit(Id);

    dispatch(GetCustomerMeetingRooms(coworkerId))
      .unwrap()
      .then(result => {
        console.log('result of BOOKINGS', result);
        setCustomerMeetingRooms(result);
      })
      .catch(error => {
        console.log('error of  booking---', error);
      })
      .finally(() => setIsRefreshing(false));

    dispatch(Feeds())
      .unwrap()
      .then(result => {
        console.log('result of feeds---', result?.feeds?.Records);
        setFeedRecord(result ? result?.feeds?.Records : []);
      })
      .catch(error => {
        console.log('error of  feeds---', error);
      })
      .finally(() => setIsRefreshing(false));
  };

  //* QR Animation Logic
  const QRTriggerType = useSelector(state => state.qrAsset.qrTrigger);
  const SIZE = 100.0;
  const CIRCLE_RADIUS = SIZE * 2;
  const qrButtonRef = useRef(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleValue = useDerivedValue(() => {
    const RoundAboutValue = Math.floor(
      Math.min(
        (Math.sqrt(translateX.value ** 2 + translateY.value ** 2) /
          (CIRCLE_RADIUS + SIZE / 2)) *
          100,
        100,
      ),
    );
    return RoundAboutValue;
  });

  const handleQRButtonPress = () => {
    qrButtonRef.current?.startAnimation();
  };

  const PanGestureEvents = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance > CIRCLE_RADIUS + SIZE / 2) {
        runOnJS(handleQRButtonPress)();
      }
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const handleNavigationBack = () => {
    translateX.value = 0;
    translateY.value = 0;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', handleNavigationBack);
    return unsubscribe;
  }, [navigation]);

  const getMembershipDetails = useCallback(
    async id => {
      try {
        const {statusCode, data, message} = await dispatch(
          GetMembershipDetail(id),
        ).unwrap();
        setMemeDetailRes({statusCode});
        if (statusCode === 200) {
          setMembershipDetails(data);
          console.warn("Data of Memner:--------------------------",data)

          console.log("------->>>2233",moment(data?.startDate).format('MMM DD, YYYY hh mm'))
          console.log("------->>>2244",moment.utc(data?.startDate).format('MMM DD, YYYY hh mm '))
        } else {
          setMembershipDetails(null);
        }
        ////Muneeb--calculating dates for checking status/////
        console.log('team ids----', data);
        const startDate = moment(data?.startDate);
        // const endDate = startDate.clone().add(data?.contractLength, 'months');
        const endDate = moment(data?.RenewalMonth);
        const currentDate = moment();
        if (
          currentDate.isSame(startDate) ||
          currentDate.isSame(endDate) ||
          currentDate.isBetween(startDate, endDate)
        ) {
          setStatus('active');
          console.log('active');
        } else if (currentDate.isAfter(endDate)) {
          setStatus('expire');
          console.log('expire');
        } else if (currentDate.isBefore(startDate)) {
          setStatus('pending');
          console.log('pending');
        }

        ////Muneeb--calculating dates for checking status/////
      } catch (error) {
        setMemeDetailRes(null);
        setMembershipDetails(null);
        console.error('Error while getting membership details: ', error);
        setError('Error while getting membership details.');
      }
    },
    [dispatch, TeamIds],
  );

  useEffect(() => {
    if (TeamIds) {
      getMembershipDetails(Number(TeamIds));
    } else {
      setMembershipDetails(null);
      setError('Error while getting team ID.');
      console.error('Error while getting team ID.');
    }
  }, [TeamIds, Id, getMembershipDetails ,isFocused]);

  //when drag is unaccesible, toaster appears
  useEffect(() => {
    if (data) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Access unavailable at this time',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        Toast.show('Access unavailable at this time', {
          duration: Toast.durations.SHORT,
          position: scale(-70),
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.white
            : AppTheme.COLORS.black,
          textColor: isDarkMode ? AppTheme.COLORS.black : AppTheme.COLORS.white,
          opacity: 1,
        });
      }
    }
  }, [route]);

  useEffect(() => {
    // Function to check if current time is 30 minutes less than the earliest "fromTime"
    const checkCurrentTime = () => {
      // const data = [
      //   { fromTime: '2023-07-03T15:30:00.000Z', toTime: '2023-07-03T16:30:00.000Z' },
      //   { fromTime: '2023-07-04T15:30:00.000Z', toTime: '2023-07-04T16:30:00.000Z' },
      //   { fromTime: '2023-07-05T15:30:00.000Z', toTime: '2023-07-05T16:30:00.000Z' }
      // ];

      if (
        customerMeetingRooms &&
        customerMeetingRooms.data &&
        customerMeetingRooms.data.length > 0
      ) {
        console.log('customerMeetingRooms?.data?-', customerMeetingRooms?.data);
        // const currentTime = moment
        //   .utc()
        //   .local()
        //   .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'); //5 hours  adjust for the time zone difference;

        const currentTime= new Date()

        const fromTime = moment(customerMeetingRooms?.data[0].FromTime)
         
        const toTime = moment(customerMeetingRooms?.data[0].ToTime)
        const rangeStartTime = fromTime.clone().subtract(30, 'minutes');
        const rangeEndTime = toTime.clone().add(30, 'minutes');
        const isInRange = moment(currentTime).isBetween(
          rangeStartTime,
          rangeEndTime,
          null,
          '[]',
        );

        setMeetingInvitee(isInRange);
        console.log('currentTime--', currentTime);
        console.log('fromTime-', fromTime);
        console.log('rangeStartTime-', rangeStartTime);
        console.log('rangeEndTime--', rangeEndTime);
        console.log('checking response--', isInRange);
      }
    };
    // Call the function
    checkCurrentTime();
  }, [
    customerMeetingRooms &&
      customerMeetingRooms.data &&
      customerMeetingRooms.data.length > 0,
    isFocused,
  ]);

  return (
    <Frame headerVariant="v3" mode={'View'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        {status === 'pending' ? (
          <View
            style={[
              style.testingCont,
              {
                borderColor: 'rgba(247, 183, 24, 0.6)',
                backgroundColor: 'rgba(247, 183, 24, 0.05)',
              },
            ]}>
            <View>
              <View style={style.companyContainer}>
                <Feather
                  name={'clock'}
                  size={24}
                  color={AppTheme.COLORS.pending}
                />
                <Txt style={[style.companyTag, {}]}>
                  {' '}
                  {moment(membershipDetails?.startDate)
                    .format('MMM DD, YYYY')}
                </Txt>
               
              </View>
              <Txt style={[style.companyName, {marginLeft: normalize(42)}]}>
                Your membership will start soon.
              </Txt>
            </View>
          </View>
        ) : status === 'expire' ? (
          <View
            style={[
              style.testingCont,
              {
                borderColor: 'rgba(239, 64, 80, 0.6)',
                backgroundColor: 'rgba(239, 64, 80, 0.05)',
              },
            ]}>
            <View>
              <View style={style.companyContainer}>
                <Feather
                  name={'clock'}
                  size={24}
                  color={AppTheme.COLORS.error}
                />
                <Txt style={[style.companyTag, {}]}>
                  {' '}
                  {moment(membershipDetails?.startDate).add(membershipDetails?.contractLength, 'months')
                    .format('MMM DD, YYYY')}
                </Txt>
              </View>
              <Txt style={[style.companyName, {marginLeft: normalize(42)}]}>
                Your membership is expired.
              </Txt>
            </View>
          </View>
        ) : null}

        {customerMeetingRooms?.data?.length < 1 &&
        GetCustomerMeetingRoomsLoading === false ? (
          <TouchableOpacity
            style={style.nothinschedule}
            onPress={() => {
              navigation.navigate(ScreensName.scheduledMeetingScreen, {
                past: true,
              });
            }}>
            {/* <View style={{position: 'relative', left: scale(10, true)}}> */}
            <View style={{alignSelf: 'center'}}>
              <NothingSchedule
                stroke={isDarkMode ? AppTheme.COLORS.white : null}
              />
            </View>
          </TouchableOpacity>
        ) : null}
        <View style={style.innerContainer}>
          <View style={style.allignInRow}>
            {customerMeetingRooms?.data?.length >= 1 ? (
              <TouchableOpacity
                onPress={() => {
                  console.log('lets go to scheduled meeting screen');
                  navigation.navigate(ScreensName.scheduledMeetingScreen, {
                    past: false,
                  });
                }}>
                <View style={style.viewMeeting}>
                  <Txt style={style.meetings}>{Strings.meetings}</Txt>
                  <Txt accessibilityLabel="viewAll" style={style.viewAll}>
                    {Strings.ViewAll}
                  </Txt>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <View>
            <View style={style.shimmerFlex}>
              <ShimmerPlaceHolder
                visible={GetCustomerMeetingRoomsLoading === false}
                shimmerStyle={style.resourceTypeSchedule}></ShimmerPlaceHolder>
            </View>
          </View>
          {customerMeetingRooms?.data?.length >= 1 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                style.officeCard,
                {marginBottom: AppTheme.SPACINGS.MARGINS.M1},
              ]}>
              {customerMeetingRooms?.data?.slice(0, 3)?.map(item => (
                <View key={item?.id}>
                  {GetCustomerMeetingRoomsLoading === false ? (
                    <Pressable
                      onPress={() => {
                        console.log("let's go to all meeting screen");
                        navigation.navigate(ScreensName.rescheduleMeeting, {
                          meetingScedule: item,
                          startTime: TimeCalculate(item?.FromTime),
                          endTime: TimeCalculate(item?.ToTime),
                          date: dateCalculate(item?.FromTime),
                          durationTime: calculateDuration(
                            item?.FromTime,
                            item?.ToTime,
                          ),
                        });
                      }}>
                      <SceduledMeetingCardHome
                        item={item}
                        startTime={TimeCalculate(item?.FromTime)}
                        endTime={TimeCalculate(item?.ToTime)}
                        date={dateCalculate(item?.FromTime)}
                        durationTime={calculateDuration(
                          item?.FromTime,
                          item?.ToTime,
                        )}
                        disabled
                      />
                    </Pressable>
                  ) : null}
                </View>
              ))}
            </ScrollView>
          ) : null}

          <ShimmerPlaceHolder
            visible={meetingRoomLoading === false}
            shimmerStyle={style.resourceType}></ShimmerPlaceHolder>
          <View style={style.paddingHorizontal}>
            {!meetingRoomLoading ? (
              <Pressable
                accessibilityLabel="meetingroomBook"
                onPress={() => {
                    if (status === 'pending' || status === 'expire') {
                   //  if (!(status === 'pending' || status === 'expire')) {
                    if (Platform.OS === 'android') {
                      ToastAndroid.showWithGravity(
                        'Inactive Membership',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                      );
                    } else {
                      Toast.show('Inactive Membership', {
                        duration: Toast.durations.SHORT,
                        position: scale(-70),
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        backgroundColor: isDarkMode
                          ? AppTheme.COLORS.white
                          : AppTheme.COLORS.black,
                        textColor: isDarkMode
                          ? AppTheme.COLORS.black
                          : AppTheme.COLORS.white,
                        opacity: 1,
                      });
                    }
                  } else {
                    console.log("let's go to book meeting room screen");
                    navigation.navigate(ScreensName.bookMeetingRoom, {
                      meetingRoomOne: meetingRoomNo,
                      dayPass: false,
                      isRescheduleRequest: false
                    });
                  }
                }}>
                <MeetingRoomCard
                  item={meetingRoomNo}
                  disabled
                  btnLabel="Monthly Plan"
                  description={TextExtractor(meetingRoomNo?.Description)}
                />
              </Pressable>
            ) : null}

            <Pressable
              onPress={() => {
                if (status === 'pending' || status === 'expire') {
                  if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravity(
                      'Inactive Membership',
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM,
                    );
                  } else {
                    Toast.show('Inactive Membership', {
                      duration: 5000,
                      position: scale(-70),
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                      delay: 0,
                      backgroundColor: isDarkMode
                        ? AppTheme.COLORS.white
                        : AppTheme.COLORS.black,
                      textColor: isDarkMode
                        ? AppTheme.COLORS.black
                        : AppTheme.COLORS.white,
                      opacity: 1,
                    });
                  }
                } else {
                  console.log("let's go to team credits screen");
                  navigation.navigate(ScreensName.TeamCreditsScreen);
                }
              }}
              style={[
                style.officeCard,
                {marginTop: AppTheme.SPACINGS.MARGINS.M1},
              ]}
              // disabled={
              //   status === 'pending' || status === 'expire' ? true : false
              // }
            >
              {/* Printing Credit List Item */}
              <PrintingCreditListItem
                isLoading={printingCreditLoading}
                printingCredits={printingCredits}
              />
            </Pressable>

          {false ? <Txt style={style.whatshappeningtext}>{Strings.WhatHappening}</Txt>:null}
        
            {/* EXTRACTING FIRST 2 ELEMENTS OF ARRAY FEED */}
            <FlatList
              data={seeMore ? feedRecord.slice(2) : feedRecord.slice(0, 2)}
              keyExtractor={() => uuid.v4()}
              renderItem={({item}) => (
                <Pressable
                  accessibilityLabel="Announcement Card"
                  onPress={() =>
                    navigation.navigate(ScreensName.AnnouncementScreen, {item})
                  
                  }>
                  <AnnouncementCard
                    key={item?.Id}
                    item={{
                      id: item?.Id,
                      title: item?.Title,
                      info: item?.SummaryText,
                      date: item?.PublishDate,
                      fullText: item?.FullText,
                      image: `https://nexudus.spaces.nexudus.com/en/blog/GetImage/?id=${item?.Id}`,
                    }}
                    isDataLoaded={true}
                  />
                </Pressable>
              )}
              ListEmptyComponent={() => {
                return (
                  <>
                  {
                    false?<AnnouncementCard
                    item={{
                      id: '',
                      title: '',
                      info: '',
                      date: '',
                      fullText: '',
                      image: '',
                    }}
                    isDataLoaded={false}
                  />:null
                  }
                  </>
                )
              }}
            />

            {/* IF FEEDS ARE LESS THAN 2 , HIDE SEE MORE BUTTON */}
            {feedRecord.length > 2 && !seeMore ? (
              <TouchableOpacity
                onPress={() => {
                  console.log('I am see more');
                  navigation.navigate(ScreensName.meetingWhatsHappeningScreen, {
                    feeds: feedRecord.slice(2),
                  });
                }}>
                <Txt style={style.seeMore}>{Strings.seeMore}</Txt>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
      {QRTriggerType === 'Drag' ? (
        <PanGestureHandler onGestureEvent={PanGestureEvents}>
          <Animated.View style={rStyle}>
            <QRButton
              ref={qrButtonRef}
              navigation={navigation}
              scaleValue={scaleValue}
              block={
                !(status == 'pending' || status == 'expire') || meetingInvitee
                  ? false
                  : true
              }
              dayPass={false}
            />
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <QRButton
          ref={qrButtonRef}
          navigation={navigation}
          scaleValue={scaleValue}
          isDragAble={false}
          block={
            !(status == 'pending' || status == 'expire') || meetingInvitee
              ? false
              : true
          }
          onPress={() => {
            console.log("status iss-=",status)
            !(status == 'pending' || status == 'expire') || meetingInvitee
              ? navigation.navigate('QRStack', {
                  screen: ScreensName.QRCodeScreen,
                })
              : null;
          }}
        />
      )}
    </Frame>
  );
};

export default MeetingWelcomeScreen;