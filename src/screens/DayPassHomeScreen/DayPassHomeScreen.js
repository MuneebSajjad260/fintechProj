import {
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  RefreshControl,
  Platform,
  ToastAndroid
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
// import { useEffect,useState } from 'react';
import Svg from 'react-native-svg';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';

import Toast from 'react-native-root-toast';
import Txt from '../../shared/components/core/Txt';
import {CancelMeetingRoom} from '../../shared/redux/action/CancelMeetingRoom';
import {selectMeetingRoomid} from '../../shared/redux/slices/bookingResourceSlice';
import {GetDayPassBookings} from '../../shared/redux/action/GetDayPassBookings';
import {
  selectLoginUserId,
  selectQRDirectionStore,
  setQRDirection,
} from '../../shared/redux/slices/isadminSlice';
import {GetMeetingRoom} from '../../shared/redux/action/GetMeetingRoom';
import {NexudusTiming} from '../../shared/redux/action/NexudusTiming';
import {setdayPassProductData} from '../../shared/redux/slices/dayPassProductData';
import {DayPassProduct} from '../../shared/redux/action/DayPassProduct';
import styles from './DayPassHomeScreen.style';
import {AppTheme} from '../../shared/theme';
import TeamLeadHomeCard from '../../shared/components/teamLeadhomeCard/TeamLeadHomeCard';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import {useNavigation} from '@react-navigation/native';
import MeetingRoomCard from '../../shared/components/meetingRoomCard/meetingRoomCard';
import FintechBottomLogo from '../../assets/images/PolygonHomeScreen.svg';
import Strings from '../../shared/constants/Strings';
import NothingSchedule from '../../assets/images/NothingSchedule.js';
import SceduledMeetingCardHome from '../../shared/components/ScheduledMeetingCardHome/ScheduledMeetingCardHome';
import Frame from '../../shared/components/core/Frame';
import {scale} from '../../shared/utils/scale';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {CheckVisitor} from '../../shared/redux/action/CheckVisitor';
import {result} from 'lodash';
import { Tax } from '../../shared/redux/action/Tax';
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

const DayPassHomeScreen = ({navigation,route}) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const isFocused = useIsFocused();
  const coworkerId = useSelector(selectLoginUserId);
  const userData = useSelector(selectUserData);
  const meetingRoomId = useSelector(selectMeetingRoomid);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  // console.log('coworkerId--', coworkerId);
  const dayPass = useSelector(state => state?.dayPassProduct);
  const dayPassPending = dayPass?.loading;
  const meetingRoomLoading = useSelector(
    state => state?.getMeetingRoom?.loading,
  );
  const GetDayPassBookingsLoading = useSelector(
    state => state?.getDayPassBookings.loading,
  );
  const CheckVisitorLoading=useSelector(
    state => state?.checkVisitor.loading,
  );
  const dayPassdata = dayPass?.data;
  const [meetingRoomNo, setMeetingRoomNo] = useState([]);
  const [dayPassBooking, setDayPassBooking] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notVisitor, setNotVisitor] = useState(false);
  const [meetingInvitee ,setMeetingInvitee]=useState(false);
  const [dayPassQR ,setDayPassQR]=useState(false);
  const[hubTime,setHubTime]=useState();
  // const name = teammembersdata[0]?.AllTeamMembers
  // console.log('All products 11---', dayPassdata);

  const [dayPassProducts, setDayPassProducts] = useState();
  // console.log('dayPassProducts---', dayPassProducts);
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  //EXTRACTING TEXT FROM HTML FORMAT
  const TextExtractor = description => {
    if (dayPassProducts?.Description && meetingRoomNo?.Description) {
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

  //////CHECK VISITOR //////////////
  useEffect(() => {
    console.log('id userdata--', userData?.Id);
    dispatch(CheckVisitor(userData?.Id))
      .unwrap()
      .then(result => {
        console.log('result checking visitor--', result);
        // TODO Revert me
        // setNotVisitor(result?.userExits);
        //! Test
        setNotVisitor(result?.userExits);
      })
      .catch(err => {
        console.log('check visiotr error---', err);
      });
  }, [dispatch, userData?.Id]);
  ///////CheckVisitor/////////////

  useEffect(() => {
    dispatch(DayPassProduct())
      .unwrap()
      .then(result => {
        // check result

        console.log('----res plan result 667788a---', result?.dayPass);

        setDayPassProducts(result?.dayPass);
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
    dispatch(GetDayPassBookings(coworkerId))
      .unwrap()
      .then(result => {
        console.log('result of day pass booking---', result);
        setDayPassBooking(result);
      })
      .catch(error => {
        console.log('error of day pass booking---', error);
      });
  }, [dispatch, isFocused]);

  //CANCEL MEETING ROOM WHEN USER KILLS APP AFTER BOOKING IT
  // useEffect(()=>{
  //   if(meetingRoomId){
  //     console.log('cancel meeting room when user kills app--',meetingRoomId);
  //     dispatch(CancelMeetingRoom(meetingRoomId));}
  //   else
  //   {
  //     console.log('nothing happende--');
  //   }
  // },[dispatch]);

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
    //  timeZone: 'UTC',
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
    const formattednewDate = moment(newdate).format('DD, MMM YYYY');
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

  ///// REFRESH PULLER LOGIC//////

  const onRefresh = () => {
    setIsRefreshing(true);

    // Dispatch the actions to refresh the data
    // dispatch(DayPassProduct())
    //   .unwrap()
    //   .then(result => {
    //     console.log('----res plan result 667788a---', result?.dayPass);
    //     setDayPassProducts(result?.dayPass);
    //   })
    //   .finally(() => setIsRefreshing(false));

    // dispatch(GetMeetingRoom())
    //   .unwrap()
    //   .then(result => {
    //     console.log('resultt---', result?.meetingRooms[0]);
    //     setMeetingRoomNo(result ? result?.meetingRooms[0] : []);
    //   })
    //   .finally(() => setIsRefreshing(false));

    dispatch(GetDayPassBookings(coworkerId))
      .unwrap()
      .then(result => {
        // console.log('result of day pass booking---', result);
        setDayPassBooking(result);
      })
      .catch(error => {
        console.log('error of day pass booking---', error);
      })
      .finally(() => setIsRefreshing(false));
  };

  //! Test
  // const dispatch = useDispatch()
  // dispatch(setQrDirection('right'))
  
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

  //disabling qr code function 
  const disableQrCode=()=>{
    // const data = [
    //   {'FromTime': '2023-07-04T12:00:00.000Z','ToTime': '2023-07-04T13:30:00.000Z','isMeetingRoom': true},
    //   {'FromTime': '2023-07-06T08:00:00.000Z','ToTime': '2023-07-06T22:00:00.000Z','isDaypass': true},
    //   {'FromTime': '2023-07-09T08:00:00.000Z','ToTime': '2023-07-09T22:00:00.000Z','isDaypass': true},
    // ];
    console.log("jsj9s3s")
    if (dayPassBooking && dayPassBooking?.data && dayPassBooking?.data.length > 0) {
      // console.log('dayPassBooking?.data?---',dayPassBooking?.data);
      const meetingRooms = dayPassBooking?.data?.filter(item => item.isMeetingRoom === true);
      const others = dayPassBooking?.data?.filter(item => item.isMeetingRoom !== true);
    
      console.log('Meeting Rooms:', meetingRooms);
      console.log('Others:', others);
      if(meetingRooms.length>=1){
        console.log('yes meeting');
    
        //const currentTime = moment.utc().local().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');//5 hours  adjust for the time zone difference;
        const currentTime= new Date()
        console.log('currentTime-',currentTime);
        const fromTime = moment(meetingRooms[0].FromTime);
        const toTime = moment(meetingRooms[0].ToTime);

        console.log('fromTime',fromTime,'--',toTime);

        const rangeStartTime = fromTime.clone().subtract(30, 'minutes');
        const rangeEndTime = toTime.clone().add(30, 'minutes');

        // const rangeStartTime = fromTime.clone().add(80, 'minutes');
        // const rangeEndTime = toTime.clone().subtract(200, 'minutes');

        console.log('rangeStartTime',rangeStartTime,'--',rangeEndTime);

        const isInRange =
      moment(currentTime).isBetween(rangeStartTime, rangeEndTime, null, '[]');
  
  
        setMeetingInvitee(isInRange);
 
        // console.log('currentTime--',currentTime);
        // console.log('fromTime-',fromTime);
        // console.log('rangeStartTime-',rangeStartTime);
        // console.log('rangeEndTime--',rangeEndTime);
        console.log('checking response--',isInRange);

      }
      else{
        console.log('No meeting');
    
      }
      if (others.length>=1){
        console.log('yes daypass',hubTime);

  
       // const currentDate = moment.utc().local().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
       const currentDate= new Date()
        const currentHour = moment(currentDate).hours();
    

        // console.log("others---",others)
      


       // Convert todaydate string to a Date object
       
const todayDateObject = new Date(currentDate);

// Filter the objects whose fromtime matches todaydate
const filteredDates =others.filter(item => {
  // Convert the fromtime string to a Date object
  const fromtimeDateObject = new Date(item.FromTime);

  // Compare the dates (ignoring the time)
  return (
    fromtimeDateObject.getFullYear() === todayDateObject.getFullYear() &&
    fromtimeDateObject.getMonth() === todayDateObject.getMonth() &&
    fromtimeDateObject.getDate() === todayDateObject.getDate()
  );
});
        
        console.log("filteredDates---",filteredDates);
        const fromTime = moment(filteredDates[0].FromTime);


        const isCurrentDate = fromTime.isSame(currentDate, 'day');
        const isHourInRange = currentHour >= 8 && currentHour <= 22;
    
        console.log('daypass date--',currentDate);
        console.log('currentHour-',currentHour);
        console.log('fromTime-',fromTime);
        console.log('isCurrentDate-',isCurrentDate);
        console.log('isHourInRange-',isHourInRange);


        if (isCurrentDate && isHourInRange) {
          console.log('true');
          setDayPassQR(true);
        } else {
          console.log('false');
          setDayPassQR(false);
        }
  
      }
      else{
        console.log('no daypass');
      }
    }
  };


  //!--------

  useEffect(()=>{
   
    dispatch(NexudusTiming())
      .unwrap()
      .then(result => {
        console.log('NexudusTiming---', result);
        disableQrCode();
        setHubTime(result);
      })
      .catch(error => {
        console.log('error NexudusTiming---', error);
      });
  },[dispatch,dayPassBooking && dayPassBooking?.data && dayPassBooking?.data.length > 0,isFocused]);

  //when drag is unaccesible, toaster appears 
  useEffect(() => {
    const data = route.params?.dragBlocked || false;
    console.log('Received data:', data);
    if (data === true){
      if(Platform.OS === 'android'){
        ToastAndroid.showWithGravity(
          'Access unavailable at this time',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      else{
        Toast.show('Access unavailable at this time', {
          duration: 5000,
          position: scale(-70),
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black,
          textColor: isDarkMode ? AppTheme.COLORS.black : AppTheme.COLORS.white,
          opacity: 1,
        });
      }
    }
  }, [route]);
  return (
    <Frame headerVariant="v3" mode={'View'}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.subContainer}>
          {dayPassBooking?.data?.length < 1 &&
          GetDayPassBookingsLoading === false && CheckVisitorLoading === false ? (
              <TouchableOpacity
                style={styles.nothinschedule}
                onPress={() => {
                  navigation.navigate(ScreensName.yourPurchases, {past: true,visitor:!notVisitor});
                }}>
                {/* <View style={{position: 'relative', right: scale(10, true)}}> */}
                <View style={{alignSelf: 'center'}}>
                  <NothingSchedule
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}
                  />
                </View>
              </TouchableOpacity>
            ) : null}

          {dayPassBooking?.data?.length >= 1 && CheckVisitorLoading === false ? (
            <TouchableOpacity
              accessibilityLabel="viewall"
              onPress={() => {
                navigation.navigate(ScreensName.yourPurchases, {past: false,visitor:!notVisitor});
              }}>
              <View style={styles.viewMeeting}>
                <Txt style={styles.meetings}>Purchases</Txt>
                <Txt
                  style={[
                    styles.viewAll,
                    {
                      color: isDarkMode
                        ? AppTheme.COLORS.lightDarkModeTxt
                        : AppTheme.COLORS.lightLightModeTxr,
                    },
                  ]}>
                  {Strings.ViewAll}
                </Txt>
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.shimmerFlex}>
            <ShimmerPlaceHolder
              visible={GetDayPassBookingsLoading === false}
              shimmerStyle={styles.resourceTypeSchedule}></ShimmerPlaceHolder>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.Schedule}
            showsHorizontalScrollIndicator={false}>
            {dayPassBooking?.data?.length >= 1
              ? dayPassBooking?.data?.slice(0, 3)?.map(item => (
                <View key={item?.id}>
                  {GetDayPassBookingsLoading === false ? (
                    <Pressable
                      style={{marginBottom: AppTheme.SPACINGS.MARGINS.M1}}
                      onPress={() => {
                        console.log("let's go to all meeting screen", item);
                        if (item?.BookingVisitors) {
                          navigation.navigate(
                            ScreensName.rescheduleDayPassMeeting,
                            {
                              meetingScedule: item,
                              startTime: TimeCalculate(item?.FromTime),
                              endTime: TimeCalculate(item?.ToTime),
                              date: dateCalculate(item?.FromTime),
                              durationTime: calculateDuration(
                                item?.FromTime,
                                item?.ToTime,
                              ),
                              CoworkerInvoiceNumber:
                                  item?.CoworkerInvoiceNumber,
                            },
                          );
                        } else {
                          navigation.navigate(ScreensName.rescheduleDayPass, {
                            meetingScedule: item,
                            startTime: TimeCalculate(item?.FromTime),
                            endTime: TimeCalculate(item?.ToTime),
                            date: dateCalculate(item?.FromTime),
                            durationTime: calculateDuration(
                              item?.FromTime,
                              item?.ToTime,
                            ),
                            CoworkerInvoiceNumber:
                                item?.CoworkerInvoiceNumber,
                          });
                        }
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
                        // dayPass={item}
                        disabled
                      />
                    </Pressable>
                  ) : null}
                </View>
              ))
              : null}
          </ScrollView>
          {!notVisitor && CheckVisitorLoading === false && GetDayPassBookingsLoading  === false ?
            <View style={[styles.paddingHorizontal,{paddingBottom:scale(10)}]}>
              <Txt style={styles.product}>Product</Txt>
              <View style={styles.flexDirection}>
                <Txt style={styles.cantBook}>You cannot book a product yet, please apply </Txt>
                <TouchableOpacity
                  onPress={()=>{
                    navigation.navigate(ScreensName.exporeFintechScreen);
                  }}>
                  <Txt style={[styles.cantBook,{textDecorationLine: 'underline'}]}>here.</Txt>
                </TouchableOpacity>
              </View>
            </View>
            :
            null
      
          }
          <View>
            <ShimmerPlaceHolder
              visible={
                dayPassPending === false && meetingRoomLoading === false
                // &&
                // GetDayPassBookingsLoading === false
              }
              shimmerStyle={styles.resourceType}></ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              visible={
                dayPassPending === false && meetingRoomLoading === false
                // &&
                // GetDayPassBookingsLoading === false
              }
              shimmerStyle={[
                styles.resourceType,
                {marginTop: scale(20)},
              ]}></ShimmerPlaceHolder>
          </View>
          <View style={styles.paddingHorizontal}>
            {!dayPassPending && !meetingRoomLoading ? (
              <View
              //  style={{marginTop: normalize(10)}}
              >
                {dayPassPending === false && meetingRoomLoading === false ? (
                  // &&
                  // GetDayPassBookingsLoading === false
                  <View style={{}}>
                    <Pressable
                      onPress={() => {
                        navigation.navigate(ScreensName.dayPass, {
                          ResourceId: dayPassProducts?.Id,
                          dayPassProducts: dayPassProducts,
                        });
                        dispatch(setdayPassProductData(dayPassProducts));
                      }}
                      //if not visitor is true then make it pressable else not pressable
                      disabled={notVisitor ? false : true}>
                      {/* card for day pass resource */}
                      <TeamLeadHomeCard
                        visitor={!notVisitor}//if visitor is true then change card opacity
                        title={'Day Pass'}
                        id={dayPassProducts?.Id}
                        description={TextExtractor(
                          dayPassProducts?.Description,
                        )}
                        // buttonTxt={'Buy Now'}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        console.log("let's go to book meeting room screen");
                        navigation.navigate(ScreensName.bookMeetingRoom, {
                          meetingRoomOne: meetingRoomNo,
                          dayPass: true,
                          isRescheduleRequest: false
                        });
                      }}
                      //if not visitor is true then make it pressable else not pressable
                      disabled={notVisitor ? false : true}>
                      {console.log('101010---', meetingRoomNo?.Description)}
                      <MeetingRoomCard
                        visitor={!notVisitor}//if visitor is true then change card opacity
                        item={meetingRoomNo}
                        disabled
                        btnLabel="Monthly Plan"
                        description={TextExtractor(meetingRoomNo?.Description)}
                      />
                    </Pressable>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      
      </ScrollView>

      <Animated.View>
        {QRTriggerType === 'Drag' ? (
          <PanGestureHandler onGestureEvent={PanGestureEvents}>
            <Animated.View style={rStyle}>
              <QRButton
                ref={qrButtonRef}
                navigation={navigation}
                scaleValue={scaleValue}
                block={ (meetingInvitee  || dayPassQR ) ? false : true}
                dayPass={true}
              />
            </Animated.View>
          </PanGestureHandler>
        ) : (
          <QRButton
            ref={qrButtonRef}
            navigation={navigation}
            scaleValue={scaleValue}
            isDragAble={false}
            block={ (meetingInvitee  || dayPassQR ) ? false : true}
            onPress={() => {
              (meetingInvitee || dayPassQR ) ?
                navigation.navigate('QRStack', {screen: ScreensName.QRCodeScreen})
                :
                null;
            }}
          />
        )}
      </Animated.View>
    </Frame>
  );
};

export default DayPassHomeScreen;
