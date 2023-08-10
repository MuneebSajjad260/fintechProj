// Dummy Screen Code 27/6/23

import React, {useRef, useEffect} from 'react';
import {View, Button} from 'react-native';
import Frame from '../../shared/components/core/Frame';
import styles from './DummyScreen.style';
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
import crashlytics from '@react-native-firebase/crashlytics';
import {useSelector} from 'react-redux';
import {selectQRDirection} from '../../shared/redux/slices/isadminSlice';
import  {preventScreenshots, addScreenshotListener} from "../../shared/utils/preventScreenShots"

export default function DummyScreen({navigation}) {
  // const direction = useSelector(selectQRDirection);
  // console.log('Direction:-------------', direction);

  // ANimations Things
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

  //! Test
  /** example using the listener */
  useEffect(() => {
    preventScreenshots(false);

    const handleScreenshotTaken = () => {
      // Handle screenshot taken event
      console.log('Screenshot taken!');
    };

    const screenshotListener = addScreenshotListener(handleScreenshotTaken);

    return () => {
      preventScreenshots(false);
      screenshotListener();
    };
  }, []);
  //! Test

  return (
    <Frame headerVariant={'v1'} mode={'View'} style={{flex: 1}}>
      <View style={{flex: 1}}></View>
      <PanGestureHandler onGestureEvent={PanGestureEvents}>
        <Animated.View style={rStyle}>
          <QRButton
            ref={qrButtonRef}
            navigation={navigation}
            scaleValue={scaleValue}
          />
        </Animated.View>
      </PanGestureHandler>
    </Frame>
  );
}

import {StyleSheet, Dimensions} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';

// Get the Actual Width, Height of Device
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  imageContainer: {
    // width: 800,
    width: 350,
    height: 350,
    // height: 800,
  },
  image: {
    borderRadius: 10,
  },
});

export default styles;

// Dummy SCreen Timeline 12 july 23
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import Frame from '../../shared/components/core/Frame';
import styles from './DummyScreen.style';
import {GetMeetingRoom} from '../../shared/redux/action/GetMeetingRoom';
import {useDispatch, useSelector} from 'react-redux';
import ImageItem from '../../shared/components/core/ImageItem';
import Txt from '../../shared/components/core/Txt';
import PersonsIcon from '../../assets/images/Persons.svg';
import {convertMinToHrAndMin, removeHtmlTags} from '../../shared/utils/helper';
import ImageView from 'react-native-image-viewing';
import uuid from 'react-native-uuid';
import {AppTheme} from '../../shared/theme';
const moment = require('moment');
import {Svg, Circle} from 'react-native-svg';
// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../shared/utils/scale';
import { GetMeetingBooking } from '../../shared/redux/action/GetMeetingBooking';

//! Test start
const duration = [30, 60, 90, 120];
//! Test end

export default function DummyScreen({navigation}) {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [selectedDurationBtnIndex, setSelectedDurationBtnIndex] = useState(0);
  const [selectedDurationBtn, setSelectedDurationBtn] = useState(duration[1]);
  const [viewImage, setViewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTimeLine, setIsLoadingTimeline] = useState(true);
  const [selectedTimelineId, setSelectedTimelineId] = useState(null);

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  // Module to Get Random Number Between Provided Min - Max
  // *Used to Get The Random Width in Skeleton
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getMeetingRoomsApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const {statusCode, meetingRooms: data} = await dispatch(
        GetMeetingRoom(),
      ).unwrap();
      if (statusCode === 200) {
        setMeetingRooms(data);
        // console.log("Data API;---------------", data[0].Id)
        getBookingsApi(data[0].Id)
        setSelectedImage({
          uri: String(
            `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${data[0]?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
          ),
          id: uuid.v4(),
        });
        setIsLoading(false);
      } else {
        setMeetingRooms([]);
        setSelectedImage(null);
        setIsLoading(false);
      }
    } catch (error) {
      setMeetingRooms([]);
      setSelectedImage(null);
      setIsLoading(false);
      console.error('Error while getting meeting rooms details: ', error);
      setError('Error while getting meeting rooms details.');
    }
  }, [dispatch]);

  const getBookingsApi = useCallback(async (id) => {
    try {
      setIsLoadingTimeline(true);
      const {statusCode, meetingRooms: data} = await dispatch(
        GetMeetingBooking(id),
      ).unwrap();
      if (statusCode === 200) {
        // Add the id property to each item in the API response
        const bookingsWithId = data.map((booking) => ({
          ...booking,
          id: uuid.v4(), // Generate a unique id for each item
        }));
        console.log("Data API;---------------", bookingsWithId)

      setBookings(bookingsWithId);
        setIsLoadingTimeline(false);
      } else {
        setBookings([]);
        setIsLoadingTimeline(false);
      }
    } catch (error) {
      setBookings([]);
      setIsLoadingTimeline(false)
      console.error('Error while getting meeting rooms details: ', error);
      setError('Error while getting meeting rooms details.');
    }
  }, [dispatch]);

  // useEffect(() => {
  //   getMeetingRoomsApi();
  //   return () => {
  //     setMeetingRooms([]);
  //     setError(null);
  //     setSelectedImage(null);
  //     setIsLoading(false);
  //   };
  // }, []);

  useEffect(() => {
    if (meetingRooms.length > 0) {
      // console.log("Hiiiiii", meetingRooms[selectedRoomIndex].Id)
      // getBookingsApi(meetingRooms[selectedRoomIndex].Id)
    }
  }, [selectedRoomIndex])
  

  const renderItem = ({item, index}) => {
    const isSelected = index === selectedRoomIndex;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.4}
          style={[
            styles.btn,
            isSelected
              ? isDarkMode
                ? styles.darkActive
                : styles.lightActive
              : isDarkMode
              ? styles.dark
              : styles.light,
          ]}
          onPress={() => handleButtonClick({type: 'meetingBtn', index})}>
          <Txt
            style={[
              styles.btnText,
              {
                color: isSelected
                  ? AppTheme.COLORS.white
                  : AppTheme.COLORS.text,
              },
            ]}>
            {item.Title}
          </Txt>
        </TouchableOpacity>
      </View>
    );
  };

  const handleButtonClick = data => {
    if (data.type === 'meetingBtn') {
      setSelectedRoomIndex(data.index);
      setSelectedImage({
        uri: `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${
          meetingRooms[data.index]?.Id
        }?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
        id: uuid.v4(),
      });
    } else if (data.type === 'durationBtn') {
      setSelectedDurationBtnIndex(data.index);
      setSelectedDurationBtn(data.index);
    } else {
      console.error('Please Pass a Valid Data!');
    }
  };

  // Function to calculate the width based on the selected item
  const calculateWidth = item => {
    const scaleFactor = item / duration[1]; // Scale factor based on the selected item and the reference item
    const maxWidth = 100; // Maximum width you want to set

    // Calculate the scaled width
    const scaledWidth = maxWidth * scaleFactor;

    return scaledWidth;
  };

  //! Test start
  function generateTimeJSON(startTime, endTime) {
    const times = [];
    const startMoment = moment(startTime, 'h:mm A');
    const endMoment = moment(endTime, 'h:mm A');

    if (startMoment > endMoment) {
      console.error('Start time must be before end time.');
      return [];
    }

    let currentMoment = startMoment.clone();

    while (currentMoment <= endMoment) {
      const formattedHour = currentMoment.format('h');
      const formattedMinute = currentMoment.format('mm');
      const formattedTime = currentMoment.format('h');
      const ampm = currentMoment.format('A');

      let showAMPM = false;

      if (
        currentMoment.isSame(startMoment, 'minute') ||
        currentMoment.isSame(endMoment, 'minute')
      ) {
        showAMPM = true;
      } else if (formattedHour === '12' && formattedMinute === '00') {
        showAMPM = true;
      }

      times.push({
        id: uuid.v4(),
        hour: parseInt(formattedHour),
        minute: parseInt(formattedMinute),
        formattedTime: `${formattedTime}${showAMPM ? ` ${ampm}` : ''}`,
      });

      currentMoment.add(15, 'minutes');
    }

    return times;
  }

  const startTime = '12:00 AM';
  const endTime = '9:00 PM';

  const timeArray = generateTimeJSON(startTime, endTime);

  // Call the function and print the generated time array in JSON format
  console.log(JSON.stringify(timeArray));

  const renderItemTimeline = ({item: {formattedTime, minute, hour}}) => {
    
    const isMatchingTime = bookings.some((booking) => {
      const fromTime = moment(booking.FromTime);
      const toTime = moment(booking.ToTime);
      const itemTime = moment().set({ hour, minute, second: 0 });
      return itemTime.isBetween(fromTime, toTime, null, '[]');
    });

  // console.log("Hmmmmmm;;;;;;;;;;;;;;;;;;;;", isMatchingTime)
  // console.log("Hmmmmmm;;;;;;;;;;;;;;;;;;;;", itemTime)

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 20,
          backgroundColor: isMatchingTime ? 'blue':'red',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {minute === 0 ? (
            <Txt
              style={{
                fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
                fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
                color: isDarkMode
                  ? AppTheme.COLORS.white
                  : AppTheme.COLORS.activeStepBar,
              }}>
              {formattedTime}
            </Txt>
          ) : (
            <View
              style={{
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.text
                  : AppTheme.COLORS.darkText,
                height: minute === 30 ? 6 : 4,
                width: minute === 30 ? 6 : 4,
                borderRadius: 100 / 2,
              }}
            />
          )}
        </View>
      </View>
    );
  };
  //! Test end

  return (
    <Frame
      // headerVariant={'v4'}
      screenTitle={'Scheduled Meeting Room'}
      mode={'View'}
      style={styles.container}>
      <View>
        {/* Duration */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginVertical: 16
          }}>
          <Txt style={styles.duration}>Duration</Txt>
          <View style={{flexDirection: 'row'}}>
            {duration.map((item, index) => {
              const isSelected = index === selectedDurationBtnIndex;
              return (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={[
                      styles.durationBtn,
                      isSelected
                        ? isDarkMode
                          ? styles.darkActive
                          : styles.lightActive
                        : isDarkMode
                        ? styles.dark
                        : styles.light,
                      {
                        marginRight:
                          index !== duration.length - 1
                            ? AppTheme.SPACINGS.MARGINS.M6
                            : 0,
                      },
                    ]}
                    onPress={() =>
                      handleButtonClick({type: 'durationBtn', index})
                    }>
                    <Txt
                      style={[
                        styles.btnText,
                        {
                          color: isSelected
                            ? AppTheme.COLORS.white
                            : AppTheme.COLORS.text,
                        },
                      ]}>
                      {/* {item} */}
                      {convertMinToHrAndMin(item)}
                    </Txt>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
        <FlatList
          data={meetingRooms}
          renderItem={renderItem}
          keyExtractor={item => item.Id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              {!isLoading ? (
                // {/* {false ? ( */}
                <Txt style={styles.notFound}>No meeting rooms found!</Txt>
              ) : (
                <View style={{width: '100%', alignSelf: 'center', padding: 16}}>
                  <View style={styles.btnLoaderContainer}>
                    {[...Array(3)].map(index => {
                      return (
                        <View>
                          <SkeletonLoader
                            key={getRandomInt(100, 300)}
                            visible={false}
                            shimmerStyle={[styles.btnSkeleton]}
                          />
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.imgSkeletonContainer}>
                    <View style={[styles.imgSkeleton]}>
                      <ActivityIndicator
                        size={'large'}
                        color={AppTheme.COLORS.wrapperDarkModeBg}
                        style={styles.loader}
                      />
                    </View>
                  </View>
                  <View style={styles.textSkeletonContainer}>
                    <SkeletonLoader
                      key={getRandomInt(100, 300)}
                      visible={false}
                      shimmerStyle={[styles.detailSkeleton]}
                    />
                    <SkeletonLoader
                      key={getRandomInt(100, 300)}
                      visible={false}
                      shimmerStyle={[styles.detailSkeleton, {width: '50%'}]}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        />
        {meetingRooms && meetingRooms.length > 0 && (
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.tagContainer}>
                <PersonsIcon />
                <Txt style={styles.numOfPersons}>
                  {meetingRooms[selectedRoomIndex]?.Allocation}
                </Txt>
              </View>
              <TouchableOpacity
                onPress={() => setViewImage(true)}
                activeOpacity={0.8}>
                <ImageItem
                  priority={'high'}
                  imageUrl={`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${meetingRooms[selectedRoomIndex]?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`}
                  imageStyling={styles.img}
                />
              </TouchableOpacity>
            </View>
            <Txt style={styles.detail}>
              {removeHtmlTags(meetingRooms[selectedRoomIndex]?.Description)}
            </Txt>
          </View>
        )}
        {/* Test */}
        <View>
          <View
            pointerEvents="box-none"
            style={{
              padding: 16 / 0.63,
              width: calculateWidth(duration[selectedDurationBtnIndex]),
              borderRadius:
                duration[selectedDurationBtnIndex] === 30 ? scale(16) : 100 / 2,
              borderWidth: 2,
              // borderColor: isDarkMode ? AppTheme.COLORS.white: '#C9C9C9',
              borderColor: isDarkMode ? AppTheme.COLORS.white: AppTheme.COLORS.officialBlack,
              alignSelf: 'center',
              position: 'absolute',
              top: '25%',
              zIndex: 1,
            }}
          />
          <FlatList
            data={timeArray}
            horizontal
            keyExtractor={item => item.id}
            renderItem={renderItemTimeline}
            contentContainerStyle={{
              marginVertical: 16 / 0.6,
              padding: 16 / 0.9,
              backgroundColor: isDarkMode
                ? AppTheme.COLORS.wrapperDarkModeBg
                : '#F1F1F1',
            }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            // pointerEvents="box-none"
          />
        </View>
      </View>

      <ImageView
        images={[selectedImage]}
        imageIndex={0}
        visible={viewImage}
        onRequestClose={() => setViewImage(false)}
      />
    </Frame>
  );
}

// 1st Radus last element
// const backgroundColor = isBooked ? 'blue' : 'red';
let borderRadiusStyle = {};

// Find the first and last matched indices
const firstMatchedIndex = bookings.findIndex(item => item.isBooked);
const lastMatchedIndex = bookings
  .slice()
  .reverse()
  .findIndex(item => item.isBooked);

// Apply border radius to the first matched index
if (index === firstMatchedIndex && isBooked) {
  borderRadiusStyle = {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  };
}

// Apply border radius to the last matched index
if (
  bookings.length - 1 - index === bookings.length - 1 - lastMatchedIndex &&
  isBooked
) {
  borderRadiusStyle = {
    ...borderRadiusStyle,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  };
}

console.log("firstMatchedIndex:----------", firstMatchedIndex);
console.log("lastMatchedIndex:----------", lastMatchedIndex);


// Dummy SCreen Code for New Timeline the Basic Working Code Before PanGesture Logic, (21/7/23)
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import Frame from '../../shared/components/core/Frame';
import styles from './DummyScreen.style';
import {GetMeetingRoom} from '../../shared/redux/action/GetMeetingRoom';
import {useDispatch, useSelector} from 'react-redux';
import ImageItem from '../../shared/components/core/ImageItem';
import Txt from '../../shared/components/core/Txt';
import PersonsIcon from '../../assets/images/Persons.svg';
import {convertMinToHrAndMin, removeHtmlTags} from '../../shared/utils/helper';
import ImageView from 'react-native-image-viewing';
import uuid from 'react-native-uuid';
import {AppTheme} from '../../shared/theme';
const moment = require('moment');
import {Svg, Circle} from 'react-native-svg';
// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../shared/utils/scale';
// import { GetMeetingBooking } from '../../shared/redux/action/GetMeetingBooking';
import {GetMeetingNewTimeLine} from '../../shared/redux/action/GetMeetingNewTimeLine';

//! Test start
const duration = [30, 60, 90, 120];
//! Test end

export default function DummyScreen({navigation}) {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [bookings, setBookings] = useState([
    {
      "isBooked": false,
      "timeHours": "08:00 am",
      "timeNumber": 8
    },
    {
      "isBooked": false,
      "timeHours": "08:30 am",
      "timeNumber": 8.5
    },
    {
      "isBooked": false,
      "timeHours": "09:00 am",
      "timeNumber": 9
    },
    {
      "isBooked": false,
      "timeHours": "09:30 am",
      "timeNumber": 9.5
    },
    {
      "isBooked": false,
      "timeHours": "10:00 am",
      "timeNumber": 10
    },
    {
      "isBooked": false,
      "timeHours": "10:30 am",
      "timeNumber": 10.5
    },
    {
      "isBooked": false,
      "timeHours": "11:00 am",
      "timeNumber": 11
    },
    {
      "isBooked": false,
      "timeHours": "11:30 am",
      "timeNumber": 11.5
    },
    {
      "isBooked": false,
      "timeHours": "12:00 pm",
      "timeNumber": 12
    },
    {
      "isBooked": false,
      "timeHours": "12:30 pm",
      "timeNumber": 12.5
    },
    {
      "isBooked": true,
      "timeHours": "01:00 pm",
      "timeNumber": 13
    },
    {
      "isBooked": false,
      "timeHours": "01:30 pm",
      "timeNumber": 13.5
    },
    {
      "isBooked": false,
      "timeHours": "02:00 pm",
      "timeNumber": 14
    },
    {
      "isBooked": false,
      "timeHours": "02:30 pm",
      "timeNumber": 14.5
    },
    {
      "isBooked": false,
      "timeHours": "03:00 pm",
      "timeNumber": 15
    },
    {
      "isBooked": false,
      "timeHours": "03:30 pm",
      "timeNumber": 15.5
    },
    {
      "isBooked": false,
      "timeHours": "04:00 pm",
      "timeNumber": 16
    },
    {
      "isBooked": false,
      "timeHours": "04:30 pm",
      "timeNumber": 16.5
    },
    {
      "isBooked": false,
      "timeHours": "05:00 pm",
      "timeNumber": 17
    },
    {
      "isBooked": false,
      "timeHours": "05:30 pm",
      "timeNumber": 17.5
    },
    {
      "isBooked": false,
      "timeHours": "06:00 pm",
      "timeNumber": 18
    },
    {
      "isBooked": false,
      "timeHours": "06:30 pm",
      "timeNumber": 18.5
    },
    {
      "isBooked": false,
      "timeHours": "07:00 pm",
      "timeNumber": 19
    },
    {
      "isBooked": false,
      "timeHours": "07:30 pm",
      "timeNumber": 19.5
    },
    {
      "isBooked": false,
      "timeHours": "08:00 pm",
      "timeNumber": 20
    },
    {
      "isBooked": false,
      "timeHours": "08:30 pm",
      "timeNumber": 20.5
    },
    {
      "isBooked": false,
      "timeHours": "09:00 pm",
      "timeNumber": 21
    },
    {
      "isBooked": false,
      "timeHours": "09:30 pm",
      "timeNumber": 21.5
    }
  ]);
  const [error, setError] = useState(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [selectedDurationBtnIndex, setSelectedDurationBtnIndex] = useState(0);
  const [selectedDurationBtn, setSelectedDurationBtn] = useState(duration[1]);
  const [viewImage, setViewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTimeLine, setIsLoadingTimeline] = useState(true);
  const [selectedTimelineId, setSelectedTimelineId] = useState(null);

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  // Module to Get Random Number Between Provided Min - Max
  // *Used to Get The Random Width in Skeleton
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getMeetingRoomsApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const {statusCode, meetingRooms: data} = await dispatch(
        GetMeetingRoom(),
      ).unwrap();
      if (statusCode === 200) {
        setMeetingRooms(data);
        console.log('Room Data API;---------------', data[0].Id);
        // getBookingsApi(data[0].Id)
        getBookingsApi('1414985590', '2023-06-02');
        setSelectedImage({
          uri: String(
            `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${data[0]?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
          ),
          id: uuid.v4(),
        });
        setIsLoading(false);
      } else {
        setMeetingRooms([]);
        setSelectedImage(null);
        setIsLoading(false);
      }
    } catch (error) {
      setMeetingRooms([]);
      setSelectedImage(null);
      setIsLoading(false);
      console.error('Error while getting meeting rooms details: ', error);
      setError('Error while getting meeting rooms details.');
    }
  }, [dispatch]);

  const getBookingsApi = useCallback(
    async (id, date) => {
      try {
        setIsLoadingTimeline(true);
        const passingData = {id, date};
        const {statusCode, slots} = await dispatch(
          GetMeetingNewTimeLine(passingData),
        ).unwrap();
        if (statusCode === 200) {
          setBookings(slots);
          console.log("Data API;---------------", slots)
          setIsLoadingTimeline(false);
        } else {
          setBookings([]);
          setIsLoadingTimeline(false);
        }
      } catch (error) {
        setBookings([]);
        setIsLoadingTimeline(false);
        console.error('Error while getting meeting rooms details: ', error);
        setError('Error while getting meeting rooms details.');
      }
    },
    [dispatch],
  );

  useEffect(() => {
    getMeetingRoomsApi();
    return () => {
      setMeetingRooms([]);
      setError(null);
      setSelectedImage(null);
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    if (meetingRooms.length > 0) {
      // console.log("Hiiiiii", meetingRooms[selectedRoomIndex].Id)
      // getBookingsApi(meetingRooms[selectedRoomIndex].Id, '2023-06-02')
      getBookingsApi('1414985590', '2023-06-02');
    }
  }, [selectedRoomIndex]);

  const renderItem = ({item, index}) => {
    const isSelected = index === selectedRoomIndex;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.4}
          style={[
            styles.btn,
            isSelected
              ? isDarkMode
                ? styles.darkActive
                : styles.lightActive
              : isDarkMode
              ? styles.dark
              : styles.light,
          ]}
          onPress={() => handleButtonClick({type: 'meetingBtn', index})}>
          <Txt
            style={[
              styles.btnText,
              {
                color: isSelected
                  ? AppTheme.COLORS.white
                  : AppTheme.COLORS.text,
              },
            ]}>
            {item.Title}
          </Txt>
        </TouchableOpacity>
      </View>
    );
  };

  const handleButtonClick = data => {
    if (data.type === 'meetingBtn') {
      setSelectedRoomIndex(data.index);
      setSelectedImage({
        uri: `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${
          meetingRooms[data.index]?.Id
        }?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
        id: uuid.v4(),
      });
    } else if (data.type === 'durationBtn') {
      setSelectedDurationBtnIndex(data.index);
      setSelectedDurationBtn(data.index);
    } else {
      console.error('Please Pass a Valid Data!');
    }
  };

  // Function to calculate the width based on the selected item
  const calculateWidth = item => {
    const scaleFactor = item / duration[1]; // Scale factor based on the selected item and the reference item
    const maxWidth = 114; // Maximum width you want to set

    // Calculate the scaled width
    const scaledWidth = maxWidth * scaleFactor;

    return scaledWidth;
  };

  //! Test start
  const renderItemTimeline = ({
    item: {isBooked, timeHours, timeNumber},
    index,
    item,
  }) => {
    let shouldApplyLeftRadius = false;
    let shouldApplyRightRadius = false;
    let shouldDisplayAMPM = false;

    // Check if the current item is the first item of a range
    if (index === 0 || bookings[index - 1].isBooked !== isBooked) {
      shouldApplyLeftRadius = true;
    }

    // Check if the current item is the last item of a range
    if (
      index === bookings.length - 1 ||
      bookings[index + 1].isBooked !== isBooked
    ) {
      shouldApplyRightRadius = true;
    }

   // Check if the hour is 12 or the first/last item
  if (
    Math.floor(timeNumber) === 12 ||
    index === 0 ||
    index === bookings.length - 1
  ) {
    shouldDisplayAMPM = true;
  }

  // Convert the timeNumber to 12-hour format using Moment.js
  const formattedTimeNumber = moment(timeHours, 'hh:mm a').format('h');

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: !isBooked ? '#0129FA47' : undefined,
            height: scale(54),

            // Radius Game
            borderTopLeftRadius: shouldApplyLeftRadius ? 100 / 2 : 0,
            borderBottomLeftRadius: shouldApplyLeftRadius ? 100 / 2 : 0,
            borderTopRightRadius: shouldApplyRightRadius ? 100 / 2 : 0,
            borderBottomRightRadius: shouldApplyRightRadius ? 100 / 2 : 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
              marginLeft: 20,
            }}>
            {!timeNumber.toString().includes('.') ? (
              <Txt
                style={{
                  fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
                  fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
                  color: isDarkMode
                    ? AppTheme.COLORS.white
                    : AppTheme.COLORS.activeStepBar,
                }}>
              {formattedTimeNumber} {shouldDisplayAMPM ? moment(timeHours, 'hh:mm a').format('A') : ''}
              </Txt>
            ) : (
              <View
                style={{
                  backgroundColor: isDarkMode
                    ? AppTheme.COLORS.text
                    : AppTheme.COLORS.darkText,
                  height:
                    timeNumber.toString().split('.')[1] === String(5) ? 6 : 4,
                  width:
                    timeNumber.toString().split('.')[1] === String(5) ? 6 : 4,
                  borderRadius: 100 / 2,
                }}
              />
            )}
          </View>
        </View>
      </>
    );
  };

  // ! Static View Scroll Animations Logic
  
  //! Test end

  return (
    <Frame
      // headerVariant={'v4'}
      screenTitle={'Scheduled Meeting Room'}
      mode={'View'}
      style={styles.container}>
      <View>
        {/* Duration */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginVertical: 16,
          }}>
          <Txt style={styles.duration}>Duration</Txt>
          <View style={{flexDirection: 'row'}}>
            {duration.map((item, index) => {
              const isSelected = index === selectedDurationBtnIndex;
              return (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={[
                      styles.durationBtn,
                      isSelected
                        ? isDarkMode
                          ? styles.darkActive
                          : styles.lightActive
                        : isDarkMode
                        ? styles.dark
                        : styles.light,
                      {
                        marginRight:
                          index !== duration.length - 1
                            ? AppTheme.SPACINGS.MARGINS.M6
                            : 0,
                      },
                    ]}
                    onPress={() =>
                      handleButtonClick({type: 'durationBtn', index})
                    }>
                    <Txt
                      style={[
                        styles.btnText,
                        {
                          color: isSelected
                            ? AppTheme.COLORS.white
                            : AppTheme.COLORS.text,
                        },
                      ]}>
                      {/* {item} */}
                      {convertMinToHrAndMin(item)}
                    </Txt>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
        <FlatList
          data={meetingRooms}
          renderItem={renderItem}
          keyExtractor={item => item.Id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              {!isLoading ? (
                <Txt style={styles.notFound}>No meeting rooms found!</Txt>
              ) : (
                <View style={{width: '100%', alignSelf: 'center', padding: 16}}>
                  <View style={styles.btnLoaderContainer}>
                    {[...Array(3)].map(index => {
                      return (
                        <View>
                          <SkeletonLoader
                            key={getRandomInt(100, 300)}
                            visible={false}
                            shimmerStyle={[styles.btnSkeleton]}
                          />
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.imgSkeletonContainer}>
                    <View style={[styles.imgSkeleton]}>
                      <ActivityIndicator
                        size={'large'}
                        color={AppTheme.COLORS.wrapperDarkModeBg}
                        style={styles.loader}
                      />
                    </View>
                  </View>
                  <View style={styles.textSkeletonContainer}>
                    <SkeletonLoader
                      key={getRandomInt(100, 300)}
                      visible={false}
                      shimmerStyle={[styles.detailSkeleton]}
                    />
                    <SkeletonLoader
                      key={getRandomInt(100, 300)}
                      visible={false}
                      shimmerStyle={[styles.detailSkeleton, {width: '50%'}]}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        />
        {meetingRooms && meetingRooms.length > 0 && (
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.tagContainer}>
                <PersonsIcon />
                <Txt style={styles.numOfPersons}>
                  {meetingRooms[selectedRoomIndex]?.Allocation}
                </Txt>
              </View>
              <TouchableOpacity
                onPress={() => setViewImage(true)}
                activeOpacity={0.8}>
                <ImageItem
                  priority={'high'}
                  imageUrl={`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${meetingRooms[selectedRoomIndex]?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`}
                  imageStyling={styles.img}
                />
              </TouchableOpacity>
            </View>
            <Txt style={styles.detail}>
              {removeHtmlTags(meetingRooms[selectedRoomIndex]?.Description)}
            </Txt>
          </View>
        )}
        {/* Test */}
        <View
          style={{
            marginVertical: 16 / 0.6,
          }}>
          <View
            pointerEvents="box-none"
            style={{
              height: scale(54),
              width: calculateWidth(duration[selectedDurationBtnIndex]),
              borderRadius: 100 / 2,
              borderWidth: 2,
              borderColor: isDarkMode
                ? AppTheme.COLORS.white
                : AppTheme.COLORS.officialBlack,
              alignSelf: 'center',
              position: 'absolute',
              zIndex: 1,
            }}
          />
          <FlatList
            data={bookings}
            horizontal
            keyExtractor={item => item.id}
            renderItem={renderItemTimeline}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: isDarkMode
                ? AppTheme.COLORS.wrapperDarkModeBg
                : '#F1F1F1',
            }}
         />
        </View>
      </View>

      <ImageView
        images={[selectedImage]}
        imageIndex={0}
        visible={viewImage}
        onRequestClose={() => setViewImage(false)}
      />
    </Frame>
  );
}



// Timeline 1/8/23

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, FlatList, Animated, PanResponder, Platform} from 'react-native';
import styles from './DummyScreen.style';
//* Components
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import ImageView from 'react-native-image-viewing';
import MeetingRoomDetailSkeleton from '../../shared/components/MeetingRoomDetailSkeleton/MeetingRoomDetailSkeleton';
import MeetingRoomButton from '../../shared/components/MeetingRoomButton/MeetingRoomButton';
import MeetingRoomDetails from '../../shared/components/MeetingRoomDetails/MeetingRoomDetails';
import DurationButton from '../../shared/components/DurationButton/DurationButton';
import TimelineItem from '../../shared/components/TimelineItem/TimelineItem';
import RepeatBookingBtn from '../../shared/components/RepeatBookingBtn/RepeatBookingBtn';
import ScheduleBtn from '../../shared/components/ScheduleBtn/ScheduleBtn';
import GuideLog from '../../shared/components/GuideLog/GuideLog';
//* API Helper Methods
import {useDispatch, useSelector} from 'react-redux';
import {GetMeetingRoom} from '../../shared/redux/action/GetMeetingRoom';
import {GetMeetingNewTimeLine} from '../../shared/redux/action/GetMeetingNewTimeLine';
//* Helper function
import {calculateWidth} from '../../shared/utils/helper';
import {scale} from '../../shared/utils/scale';
//* Others
import {AppTheme} from '../../shared/theme';
import uuid from 'react-native-uuid';
const moment = require('moment');
//* Duration Buttons Data
const duration = [30, 60, 90, 120];
// !Dummy Data
import TimeLineBooking from '../../MockData/TimeLineBooking.json';
import Botton from '../../shared/components/core/Botton';
import RNDateTimePicker from '@react-native-community/datetimepicker';

// TimeLine Logic start
const getCurrentTimeRoundedToNearestDuration = duration => {
  const currentTime = moment();
  const minutes = currentTime.minutes();
  const nearestMinute = Math.ceil(minutes / duration) * duration;
  const roundedTime = currentTime.minutes(nearestMinute).seconds(0);
  return roundedTime;
};
// TimeLine Logic end
export default function DummyScreen({navigation}) {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [viewImage, setViewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTimeLine, setIsLoadingTimeline] = useState(true);

  //* Others
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  //? API Modules
  //* Get Meeting Rooms API
  const getMeetingRoomsApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const {statusCode, meetingRooms: data} = await dispatch(
        GetMeetingRoom(),
      ).unwrap();
      if (statusCode === 200) {
        setMeetingRooms(data);
        // console.log('Room Data API;---------------', data[0].Id);
        // getBookingsApi(data[0].Id)
        getBookingsApi('1414985590', '2023-06-02');
        setSelectedImage({
          uri: String(
            `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${data[0]?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
          ),
          id: uuid.v4(),
        });
        setIsLoading(false);
      } else {
        setMeetingRooms([]);
        setSelectedImage(null);
        setIsLoading(false);
      }
    } catch (error) {
      setMeetingRooms([]);
      setSelectedImage(null);
      setIsLoading(false);
      console.error('Error while getting meeting rooms details: ', error);
      setError('Error while getting meeting rooms details.');
    }
  }, [dispatch]);

  //* Get Bookings API
  const getBookingsApi = useCallback(
    async (id, date) => {
      try {
        setIsLoadingTimeline(true);
        const passingData = {id, date};
        const {statusCode, slots} = await dispatch(
          GetMeetingNewTimeLine(passingData),
        ).unwrap();
        if (statusCode === 200) {
          setBookings(slots);
          console.log('Data API;---------------', slots);
          setIsLoadingTimeline(false);
        } else {
          setBookings([]);
          setIsLoadingTimeline(false);
        }
      } catch (error) {
        setBookings([]);
        setIsLoadingTimeline(false);
        console.error('Error while getting meeting rooms details: ', error);
        setError('Error while getting meeting rooms details.');
      }
    },
    [dispatch],
  );

  //* Calling the "getMeetingRoomsApi" on 1st render
  useEffect(() => {
    getMeetingRoomsApi();
    return () => {
      setMeetingRooms([]);
      setError(null);
      setSelectedImage(null);
      setIsLoading(false);
    };
  }, []);

  //* Calling the "getBookingsApi" on "Meeting Room" Button Press
  useEffect(() => {
    if (meetingRooms.length > 0) {
      // console.log("Hiiiiii", meetingRooms[selectedRoomIndex].Id)
      // getBookingsApi(meetingRooms[selectedRoomIndex].Id, '2023-06-02')
      getBookingsApi('1414985590', '2023-06-02');
    }
  }, [selectedRoomIndex]);

  // ! Test Start
  //* Frame on top of Timeline scroll logic
  const scrollX = useRef(new Animated.Value(0)).current;
  const [scrollEnd, setScrollEnd] = useState(false);
  const [scrollStart, setScrollStart] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        console.log('onMoveShouldSetPanResponder - dx:', gestureState.dx);

        // Flatlist Start
        if (scrollStart && gestureState.dx < 0) {
          console.log('Start');
          return true;
        }

        // Flatlist End
        if (scrollEnd && gestureState.dx > 0) {
          console.log('End');
          return false;
        }

        return false;
      },
      onPanResponderMove: (_, gestureState) => {
        if (scrollStart) {
          // Calculate the new scrollX value
          const newScrollX = scrollX._value - gestureState.dx;
          // Limit the scrollX value based on the scrollStart and scrollEnd states
          const leftLimit = 0;

          // Limit scrolling to the left (from the start position)
          if (newScrollX > leftLimit) {
            console.log("ScrollStart 'if' newScrollX > leftLimit", leftLimit);
            scrollX.setValue(leftLimit);
          } else {
            console.log(
              "ScrollStart 'else' newScrollX > leftLimit: ",
              newScrollX,
            );
            // scrollX.setValue(newScrollX);
          }
        }

        // console.log(
        //   'onPanResponderMove - dx:',
        //   gestureState.dx,
        //   newScrollX,
        //   scrollX._value,
        // );

        // Update the scrollX value based on the gesture
        Animated.event([null, {dx: scrollX}], {
          useNativeDriver: false,
        })(_, gestureState);
      },
    }),
  ).current;

  //* FlatList Methods
  const handleEndReached = () => {
    console.log('Reached end');
    setScrollStart(false);
    setScrollEnd(true);
  };
  const handleStartReached = ({nativeEvent}) => {
    if (nativeEvent.contentOffset.x === 0) {
      setScrollEnd(false);
      setScrollStart(true);
      console.log('At Start');
    } else {
      setScrollEnd(false);
      setScrollStart(false);
    }
  };
  // ! Test End

  //* Date & Time Modal Logic
  const [selectedMode, setSelectedMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  const [repeatBooking, setRepeatBooking] = useState('no');
  const [timeValue, setTimeValue] = useState('');

  // Set the default duration (60 minutes) as selected on initial load
  const defaultDurationIndex = duration.indexOf(60);
  const [selectedDurationBtnIndex, setSelectedDurationBtnIndex] =
    useState(defaultDurationIndex);
  const [selectedDurationBtn, setSelectedDurationBtn] = useState(
    duration[defaultDurationIndex],
  );

  // State for the pre-selected date (default to today's date)
  const [selectedDate, setSelectedDate] = useState(moment().toDate());

  // State for the pre-selected time (default to "now" with specific conditions)
  const initialTime =
    getCurrentTimeRoundedToNearestDuration(selectedDurationBtn);
  const [selectedTime, setSelectedTime] = useState(initialTime.toDate());

  // useEffect to set the initial date and time
  useEffect(() => {
    // Check the current minute to determine the default time selection
    const currentMinute = moment().minutes();
    const isCurrentMinuteLessThan30 = currentMinute < 30;
    // If the current minute is less than 30, select the next available 30-minute slot
    if (isCurrentMinuteLessThan30) {
      const next30MinuteSlot = moment().minutes(30).seconds(0);
      setSelectedTime(next30MinuteSlot.toDate());
    } else {
      // If the current minute is 30 or more, select the next available hour slot
      const nextHourSlot = moment().add(1, 'hour').minutes(0).seconds(0);
      setSelectedTime(nextHourSlot.toDate());
    }

    // Format the start and end times based on the default duration
    const startTime = moment(selectedTime).format('h:mm');
    const endTime = moment(selectedTime)
      .clone()
      .add(selectedDurationBtn, 'minutes')
      .format('h:mm A');

    // console.warn(`${startTime} - ${endTime}`)

    // Update the time value state with the formatted time range
    setTimeValue(`${startTime} - ${endTime}`);
  }, []);

  // Update the the time tab according to the duration
  useEffect(() => {
    setSelectedDate(moment().toDate());

    // Check the current minute to determine the default time selection
    const currentMinute = moment().minutes();
    const isCurrentMinuteLessThan30 = currentMinute < 30;

    // If the current minute is less than 30, select the next available 30-minute slot
    const initialStartTime = moment()
      .minutes(isCurrentMinuteLessThan30 ? 30 : 0)
      .seconds(0);

    // Set the default duration (60 minutes) as selected on initial load
    const defaultDurationIndex = duration.indexOf(selectedDurationBtn);
    setSelectedDurationBtnIndex(defaultDurationIndex);

    // Calculate the end time based on the selected duration
    const selectedDuration = duration[defaultDurationIndex];
    const initialEndTime = initialStartTime
      .clone()
      .add(selectedDuration, 'minutes');

    // Format the start and end times based on the selected duration
    const startTime = initialStartTime.format('h:mm');
    const endTime = initialEndTime.format('h:mm A');

    // Update the time value state with the formatted time range
    setTimeValue(`${startTime} - ${endTime}`);
  }, [selectedDurationBtn]);

  // Auto Scroll to selected Duration (in Timeline)
  // Define a ref for the FlatList
  const timelineListRef = useRef(null);

  // console.log("Passed Time Range------------------:", fromTimeTab)
  // console.log("Formated Value------------------:", startTimeNumber, endTimeNumber)
  // console.log("Index Value------------------:", selectedTimeIndex)

  // Function to handle the "time duration" change
  const handleDurationChange = (fromDurationTab, fromTimeTab) => {
    if (fromTimeTab) {
      console.log('Passed Time Range------------------:', fromTimeTab);
      // Parse the start and end time from the "fromTimeTab" array
      const startTime = moment(fromTimeTab[0], 'hh:mm A');
      const endTime = moment(fromTimeTab[1], 'hh:mm A');

      // Calculate the "timeNumber" for the start and end times
      const startTimeNumber = startTime.hours() + startTime.minutes() / 60;
      const endTimeNumber = endTime.hours() + endTime.minutes() / 60;
      console.log(
        'Formated Value------------------:',
        startTimeNumber,
        endTimeNumber,
      );

      // Find the index of the selected time slot based on the new "time range"
      const startIndex = bookings.findIndex(
        item => item.timeNumber >= startTimeNumber,
      );
      const endIndex = bookings.findIndex(
        item => item.timeNumber >= endTimeNumber,
      );

      // Calculate the center index
      const centerIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
      console.log('Index Value------------------:', centerIndex);

      // Scroll to the center index smoothly
      if (centerIndex !== -1) {
        timelineListRef.current.scrollToIndex({
          animated: true,
          index: centerIndex,
          viewPosition: 0.5, // Center the selected time slot
        });

        // Update the upper frame position to match the selected duration
        const newScrollX = calculateWidth(
          startTimeNumber,
          bookings[centerIndex].timeNumber,
        );
        //  scrollX.setValue(-newScrollX);
        console.log(
          'newScrollX------------------:',
          startTimeNumber,
          bookings[centerIndex].timeNumber,
        );
      } else {
        return -1;
      }
    } else if (fromDurationTab) {
      // Update the selected duration state
      setSelectedDurationBtn(fromDurationTab);

      // // Parse the start time from the first item in "fromDurationTab" array
      // const startTime = moment(fromDurationTab, 'hh:mm A');

      // // Calculate the end time based on the selected duration
      // const endTime = startTime.clone().add(fromDurationTab, 'minutes');

      // // Find the index of the selected time slot based on the new "time range"
      // const selectedTimeIndex = bookings.findIndex(item => {
      //   const time = moment(item.timeHours, 'hh:mm A');
      //   return (
      //     time.isBetween(startTime, endTime, null, '[]') ||
      //     (time.isSameOrAfter(startTime) && time.isSameOrBefore(endTime))
      //   );
      // });

      // // Scroll to the target index smoothly
      // if (selectedTimeIndex !== -1) {
      //   timelineListRef.current.scrollToIndex({
      //     animated: true,
      //     index: selectedTimeIndex,
      //     viewPosition: 0.5, // Center the selected time slot
      //   });
      // }
    } else {
      console.error('Please provide a valid dataset!');
    }
  };

  //* Press Handler for "Meeting Room Buttons" and "Durations Button"
  const handleButtonClick = data => {
    if (data.type === 'meetingBtn') {
      setSelectedRoomIndex(data.index);
      setSelectedImage({
        uri: `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${
          meetingRooms[data.index]?.Id
        }?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
        id: uuid.v4(),
      });
    } else if (data.type === 'durationBtn') {
      setSelectedDurationBtnIndex(data.index);
      setSelectedDurationBtn(duration[data.index]);
      // Animate the timeline according to the index of the duration
      handleDurationChange(duration[data.index]);
    } else {
      console.error('Please Pass a Valid Data!');
    }
  };

  const showPickerModal = currentMode => {
    setSelectedMode(currentMode);
    setShowPicker(true);
  };

  const onChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowPicker(false);
    setSelectedDate(currentDate);

    // Recalculate the end time based on the selected duration
    const endTime = moment(currentDate).add(selectedDurationBtn, 'minutes');

    // Format the start and end times
    const formattedStartTime = moment(currentDate).format('h:mm');
    const formattedEndTime = endTime.format('h:mm A');

    const fromTimeTab = [
      moment(currentDate),
      moment(currentDate).add(selectedDurationBtn, 'minutes'),
    ];
    console.log('Hoi:----------', fromTimeTab);
    handleDurationChange(null, fromTimeTab);
    // Update the time value state with the formatted time range
    setTimeValue(`${formattedStartTime} - ${formattedEndTime}`);
    console.log('Selected Date&Time: ' + currentDate);
  };

  // Logic End

  return (
    <Frame screenTitle={'Scheduled Meeting Room'} style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <ScheduleBtn
            onCalenderPress={() => {
              showPickerModal('date');
            }}
            onTimePress={() => {
              showPickerModal('time');
            }}
            dateValue={moment(selectedDate).format('D MMMM, YYYY')}
            timeValue={timeValue}
          />
          {/* Duration */}
          <View style={styles.durationContainer}>
            <Txt style={styles.duration}>Duration</Txt>
            <View style={{flexDirection: 'row'}}>
              {duration.map((item, index) => (
                <DurationButton
                  key={item}
                  dataLength={duration.length - 1}
                  duration={item}
                  index={index}
                  isSelected={index === selectedDurationBtnIndex}
                  isDarkMode={isDarkMode}
                  onPress={() =>
                    handleButtonClick({type: 'durationBtn', index})
                  }
                />
              ))}
            </View>
          </View>
          <RepeatBookingBtn
            onNo={() => {
              setRepeatBooking('no');
            }}
            onYes={() => {
              setRepeatBooking('yes');
            }}
            selected={repeatBooking}
          />
          {/* Meeting Rooms Buttons */}
          <View>
            {/* Divider */}
            <View
              style={[
                styles.divider,
                {
                  backgroundColor: isDarkMode ? '#FFFFFF1A' : '#C9C9C9',
                },
              ]}
            />
            <View style={styles.meetingRoomsBtnContainer}>
              <Txt
                style={[
                  styles.duration,
                  {paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1},
                ]}>
                Select meeting room
              </Txt>
              <FlatList
                data={meetingRooms}
                renderItem={({item, index}) => (
                  <MeetingRoomButton
                    item={item}
                    index={index}
                    isSelected={index === selectedRoomIndex}
                    isDarkMode={isDarkMode}
                    onPress={index => {
                      setSelectedRoomIndex(index);
                      setSelectedImage({
                        uri: `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${meetingRooms[index]?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
                        id: uuid.v4(),
                      });
                    }}
                  />
                )}
                keyExtractor={item => item.Id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    {!isLoading ? (
                      <Txt style={styles.notFound}>No meeting rooms found!</Txt>
                    ) : (
                      <MeetingRoomDetailSkeleton />
                    )}
                  </View>
                )}
              />
            </View>
          </View>
          {/* Meeting Room Details */}
          {meetingRooms && meetingRooms.length > 0 && (
            <MeetingRoomDetails
              selectedRoom={meetingRooms[selectedRoomIndex]}
              isDarkMode={isDarkMode}
              onViewImage={() => setViewImage(true)}
            />
          )}
          {/* Timeline */}
          {bookings && bookings.length > 0 && (
            <View style={styles.timeLineContainer}>
              <Animated.View
                // pointerEvents="box-none"
                // hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
                style={[
                  styles.timelineUpperFrame,
                  {
                    width: calculateWidth(
                      duration[selectedDurationBtnIndex],
                      duration,
                    ),
                    borderRadius:
                      duration[selectedDurationBtnIndex] == 30 ? 16 : 100 / 2,
                    borderColor: isDarkMode
                      ? AppTheme.COLORS.white
                      : AppTheme.COLORS.officialBlack,
                    transform: [{translateX: scrollX}],
                  },
                ]}
                {...panResponder.panHandlers}
              />
              <FlatList
                data={bookings}
                ref={timelineListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.timeHours.toString()}
                contentContainerStyle={{
                  backgroundColor: isDarkMode
                    ? AppTheme.COLORS.wrapperDarkModeBg
                    : '#F1F1F1',
                }}
                renderItem={({item, index}) => (
                  <TimelineItem
                    bookings={bookings}
                    item={item}
                    index={index}
                    isDarkMode={isDarkMode}
                  />
                )}
                onEndReached={handleEndReached}
                onScroll={handleStartReached}
              />
            </View>
          )}
          <GuideLog />
        </View>
        <Botton title={'Proceed'} singleButtonStyle={styles.mainBtn} />
      </View>
      <ImageView
        images={[selectedImage]}
        imageIndex={0}
        visible={viewImage}
        onRequestClose={() => setViewImage(false)}
      />
      {showPicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          themeVariant={isDarkMode ? 'dark' : 'light'}
          value={selectedDate}
          mode={selectedMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()} // Set minimum date to today's date
          maximumDate={moment().add(1, 'year').toDate()}
          onChange={onChange}
          minuteInterval={30}
        />
      )}
    </Frame>
  );
}

// BookMeetinRoomScreen Data 2/8/23
import {
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Platform,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetFlatList,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {Provider} from 'react-native-paper';
import {FlatList as GestureHandlerFlatList} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import {Divider} from 'react-native-paper';
import {Svg} from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Txt from '../../shared/components/core/Txt';
import Frame from '../../shared/components/core/Frame';
import {
  selectLoginUserId,
  selectLoginUserName,
} from '../../shared/redux/slices/isadminSlice';
import {DayPassCheck} from '../../shared/redux/action/DayPassCheck';
import {GetMeetingBooking} from '../../shared/redux/action/GetMeetingBooking';
import SelectMeetingRoomCard from '../../shared/components/SelectMeetingRoomCard/SelectMeetingRoomCard';
import {PrimaryButton} from '../../shared/components';
import {AppTheme} from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import styles from './BookMeetingRoomScreen.Style';
import style from '../privateOfficeSummaryScreen/privateOfficeSummaryScreen.style';
import {useNavigation} from '@react-navigation/native';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GetMeetingRoom} from '../../shared/redux/action/GetMeetingRoom';

import ClockIcon from '../../assets/images/clockMode.js';
import CalendarDark from '../../assets/images/calendarDark.svg';
import DateIcon from '../../assets/images/dateIcon.svg';
import Botton from '../../shared/components/core/Botton';
import {scale} from '../../shared/utils/scale';

// const data = [];
const Meetingroom = ({route}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const dispatch = useDispatch();
  const coworkerId = useSelector(selectLoginUserId);
  const coworkerName = useSelector(selectLoginUserName);
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  const bottomSheetRefTimePicker = useRef(null);
  const bottomSheetRefRecurringDays = useRef(null);
  const snapPoints = useMemo(() => ['48%'], []);
  const snapPointsRecurringDays = useMemo(() => ['55%'], []);
  const bottomSheetNoBooking = useRef(null);
  const snapPointsNoBooking = useMemo(() => ['28%'], []);

  const {
    meetingRoomOne,
    dayPass,
    dateReschedule,
    rescheduleStartTime,
    rescheduleEndTime,
    rescheduleDuration,
    
    ,
    idReschedule,
    isRescheduleRequest,
    rescheduleRepeatBooking,
    rescheduleRecurringDay,
    participant,
  } = route.params;
  console.log(
    'dayPass----',
    dayPass,
    '---',
    rescheduleStartTime,
    '---',
    rescheduleEndTime,
    rescheduleDuration,
  );
  console.log('meetingRoomOne----', meetingRoomOne);
  const minDate = new Date(); // Today
  // let tomorrow  = moment(minDate).add(1,'days');

  const meetingRoom = [
    {
      id: 1,
      officeNo: 'Meeting Room',
      btnLabel: 'Monthly Plan',
      roomDesc: 'A room has a big table in the middle with Smart TV',
    },
    {
      id: 2,
      officeNo: 'Meeting Room 2',
      btnLabel: 'Monthly Plan 2',
      roomDesc: 'A room has a big table in the middle with Smart TV',
    },
    {
      id: 3,
      officeNo: 'Meeting Room 3',
      btnLabel: 'Monthly Plan 3',
      roomDesc: 'A room has a big table in the middle with Smart TV',
    },
  ];

  const showHours = () => {
    timeLine?.map(item => {
      console.log('timeline data----', item);
    });
  };
  const [bottomSheet, setBottomSheet] = useState({
    bsTimePicker: false,
    bsRepeat: false,
  });
  const [selectedTime, setSelectedTime] = useState([]);

  const recurring = [
    {id: 0, recurringDay: 'Everyday', isSelected: false},
    {id: 1, recurringDay: 'Every Week', isSelected: false},
    {id: 2, recurringDay: 'Every 2 Weeks', isSelected: false},
    {id: 3, recurringDay: 'Every Month', isSelected: false},
  ];
  const duration = [
    {id: 1, hour: 30, timeUnit: 'min'},
    {id: 2, hour: 1, timeUnit: 'h'},
    {id: 3, hour: 1.5, timeUnit: 'h'},
    {id: 4, hour: 2, timeUnit: 'h'},
  ];
  const [meetingRoomNo, setMeetingRoomNo] = useState([]);
  const meetingRoomPending = useSelector(
    state => state?.getMeetingRoom?.loading,
  );
  const GetMeetingBookingPending = useSelector(
    state => state?.getMeetingBooking?.loading,
  );
  const navigation = useNavigation();

  const [timebtn, settimebtn] = useState(
    rescheduleDuration ? rescheduleDuration : 1,
  );
  console.log('timebtn---', timebtn);
  console.log(
    'rescheduleRecurringDay,rescheduleRepeatBooking---',
    rescheduleRepeatBooking,
    '---',
    rescheduleRecurringDay,
  );
  const [repeatBooking, setRepeatBooking] = useState(
    rescheduleRepeatBooking ? rescheduleRepeatBooking : 'No',
  );
  const [selectMeetingRoom, setSelectMeetingRoom] = useState(
    meetingRoomOne?.Title,
  );
  const [addTimeDuration, setAddTimeDuration] = useState();
  console.log('addTimeDuration---', addTimeDuration);

  // const formattedDat= moment(new Date(),'DD-MM-YYYY').format('DD/MM/YYYY');
  const formattedDat = moment(new Date()).format('LL');

  const formattedDateReschedule = moment(dateReschedule, 'DD, MMM YYYY').format(
    'LL',
  );
  console.log(
    'formatted--dateReschedule---22--',
    formattedDateReschedule,
    '---',
  );

  const [selectedDate, setSelectedDate] = useState(
    dateReschedule ? formattedDateReschedule : formattedDat,
  );
  console.log('selectedDate---', selectedDate);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [timePicker, setTimePicker] = useState(new Date());
  const [isInitialSelection, setIsInitialSelection] = useState(true);
  const [minimumDate, setMinimumDate] = useState(new Date());

  useEffect(() => {
    if (isInitialSelection) {
      setTimeout(() => {
        const currentDate = new Date();
        const currentMinutes = currentDate.getMinutes();
        let initialSelectedTime = new Date(currentDate);

        if (currentMinutes >= 1 && currentMinutes <= 29) {
          initialSelectedTime.setMinutes(30);
        } else if (currentMinutes >= 31) {
          initialSelectedTime.setHours(currentDate.getHours() + 1);
          initialSelectedTime.setMinutes(0);
        }

        setTimePicker(initialSelectedTime);
        setMinimumDate(initialSelectedTime);
        setIsInitialSelection(false);
      }, 0);
    }
  }, [isInitialSelection]);

  const [GMTTime, setGMTTime] = useState();
  const [timeFormat, setTimeFormat] = useState();
  console.log('startTime---reshedule--', rescheduleStartTime);

  /// SETTING TIME IN SHOW TIME STATE
  const roundedTime = roundToNearestHalfHour(timePicker);
  const localDateTime = moment.utc(roundedTime).local(); // Convert UTC to local time
  const formattedDateTime = localDateTime.format('hh:mm A'); // Format the local time
  console.log('time123--', formattedDateTime);

  const [showTime, setShowTime] = useState(
    rescheduleStartTime
      ? rescheduleStartTime
      : formattedDateTime
      ? formattedDateTime
      : null,
  );
  console.log('showTime---', showTime);

  const [recurringDaysData, setRecurringDaysData] = useState(
    rescheduleRecurringDay ? rescheduleRecurringDay?.recurringDay : null,
  );
  const [recurringDayObject, setRecurringDayObject] = useState(
    rescheduleRecurringDay ? rescheduleRecurringDay : null,
  );
  console.log(
    'recurringDaysData-----',
    recurringDaysData,
    '--',
    recurringDayObject,
  );
  const [showRecurringDay, setShowRecurringDay] = useState(
    rescheduleRecurringDay ? rescheduleRecurringDay?.recurringDay : null,
  );
  const [borderBlue, setBorderBlue] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [dayPassCheck, setDayPassCheck] = useState();

  const convertTimeString = timeString => {
    if (timeString) {
      console.log('timeString---', timeString);
      const [hoursMinutes, period] = timeString.split(' ');
      const [hours, minutes] = hoursMinutes.split(':').map(Number);
      console.log('hourmin---', hoursMinutes);
      let newHours = period === 'AM' ? hours : hours + 12;

      if (newHours === 12) {
        newHours = 0;
      }
      if (newHours === 24) {
        newHours = 12;
      }
      if (newHours < 10) {
        newHours = `0${newHours}`;
      }
      // let ampm = 'AM'
      // if (newHours > 11) {
      //     period === "AM" ? hours : hours + 12;
      // }
      let min = minutes === 0 ? '00' : minutes;
      return `${newHours}:${min}`;
    }
  };

  const data = [];

  const availableTimeSlots = [];
  let previousBookedEndTime = '00:00';

  //CHECKING IF TIME SLOT IS EMPTY ELSE STARTS FROM 00:00 TO 1 LESSER THAN START TIME OF NEXT BOOKING

  if (timeSlots.length === 0) {
    const fullDaySlot = {start: '00:00', end: '23:59'};
    availableTimeSlots.push(fullDaySlot);
  } else if (timeSlots[0].start > previousBookedEndTime) {
    const firstAvailableTimeSlot = {
      start: '00:00',
      end: moment(timeSlots[0].start, 'HH:mm')
        .subtract(1, 'minute')
        .format('HH:mm'),
    };
    availableTimeSlots.push(firstAvailableTimeSlot);
    previousBookedEndTime = moment(timeSlots[0].end, 'HH:mm').format('HH:mm');
  }

  // CHECKING IF BOOKING LIES BETWEEN TWO BOOKINGS , THEN ITS START TIME BECOMES 1 MIN GREATER AND END TIME 1 MIN LESSER
  for (let i = 0; i < timeSlots.length; i++) {
    const {start: currentBookedStartTime, end: currentBookedEndTime} =
      timeSlots[i];

    if (currentBookedStartTime > previousBookedEndTime) {
      const currentAvailableTimeSlot = {
        start: moment(previousBookedEndTime, 'HH:mm')
          .add(1, 'minute')
          .format('HH:mm'),
        end: moment(currentBookedStartTime, 'HH:mm')
          .subtract(1, 'minute')
          .format('HH:mm'),
      };

      availableTimeSlots.push(currentAvailableTimeSlot, currentBookedStartTime);
    }

    previousBookedEndTime = currentBookedEndTime;
  }
  // THIS IS CHECK FOR LAST BOOKING WHERE START TIME BECOMES ONE MIN GREATER AND END TIME BECOMES 23:59
  if (previousBookedEndTime < '23:59') {
    const lastAvailableTimeSlot = {
      start: moment(previousBookedEndTime, 'HH:mm')
        .add(1, 'minute')
        .format('HH:mm'),
      end: '23:59',
    };

    availableTimeSlots.push(lastAvailableTimeSlot);
  }

  // return availableTimeSlots;
  console.log('availabletime----', availableTimeSlots);
  //   };

  let convertedShowTime;
  let convertedAddTimeDuration;
  if (showTime) {
    convertedShowTime = convertTimeString(showTime);
    console.log('convertedTime------', convertedShowTime);

    convertedAddTimeDuration = convertTimeString(addTimeDuration);
    console.log('convertedTime 22------', convertedAddTimeDuration);
  }
  const selectedStart = convertedShowTime;
  const selectedEnd = convertedAddTimeDuration;
  console.log(' showTime--', showTime);
  console.log(' addTimeDuration--', addTimeDuration);

  //     const startHour = 8;
  // const endHour = 22.25;
  // const numIntervals = (endHour - startHour) * 4;
  for (let i = 0; i < 96; i++) {
    let hours = Math.floor(i / 4);
    let minutes = (i % 4) * 15;
    let time = `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
    let index = i * 0.25;
    // console.log("index---",index)
    //converting 24 hour timeline to 12 hour timeline
    let ampm = 'AM';
    if (hours > 11) {
      ampm = 'PM';
    }
    if (hours > 12) {
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12;
    }

    //  console.log("time----", time)

    let status = 'unavailable';
    let statusSelectedSlots = 'unselected';

    let statusStartTime = false;
    let statusEndTime = false;

    let borderStatusBlue = false;
    let borderStatusRed = false;
    let borderStatusNull = false;

    //showing available slots

    for (const slot of availableTimeSlots) {
      // console.log("time-slot-22--", slot)
      if (time >= slot.start && time <= slot.end) {
        status = 'available';
        break;
      }
    }
    // checks for handling starttime and end time borderWidth
    if (time >= selectedStart && time <= selectedEnd) {
      statusSelectedSlots = 'selected';
      statusStartTime = !statusStartTime;
      statusEndTime = !statusEndTime;
    }

    if (selectedStart === time) {
      statusStartTime = !statusStartTime;
    }
    if (selectedEnd === time) {
      statusEndTime = !statusEndTime;
    }

    let isStartInSlot = false;
    let isEndInSlot = false;
    let isSlotBetween = false;
    let timeBetweenStartEndInSlot = false;
    // checks for use cases when user select the time slot
    for (const slot of availableTimeSlots) {
      if (selectedStart >= slot.start && selectedStart < slot.end) {
        isStartInSlot = true;
      }

      if (selectedEnd > slot.start && selectedEnd <= slot.end) {
        isEndInSlot = true;
      }

      // isSlotbetween below all three clauses checks when either unavalable slot lies between two avalable slots or avalable slot lies between two unavailable slots ,
      // so border width turns red when isSlotBetween status turns red

      if (selectedStart < slot.start && selectedEnd > slot.end) {
        isSlotBetween = true;
      }
      if (
        selectedStart < slot.start &&
        selectedEnd > slot.start &&
        selectedEnd <= slot.end
      ) {
        isSlotBetween = true;
      }
      if (
        selectedStart < slot.end &&
        selectedEnd > slot.end &&
        selectedStart > slot.start
      ) {
        isSlotBetween = true;
      }

      if (selectedStart === slot.end) {
        isStartInSlot = true;
        isEndInSlot = false;
      }
      if (selectedEnd === slot.start) {
        isEndInSlot = true;
        isStartInSlot = false;
      }
    }
    if (isStartInSlot && isEndInSlot) {
      if (!isSlotBetween) {
        borderStatusBlue = !borderStatusBlue;
      } else {
        borderStatusRed = !borderStatusRed;
      }
    } else if (isStartInSlot || isEndInSlot || isSlotBetween) {
      borderStatusRed = !borderStatusRed;
    } else {
      borderStatusNull = !borderStatusNull;
    }

    data.push({
      key: `${hours}:${minutes === 0 ? '00' : minutes}`,
      status,
      statusSelectedSlots,
      statusEndTime,
      statusStartTime,
      time,
      borderStatusBlue,
      borderStatusRed,
      borderStatusNull,
      ampm,
      index,
    });
  }
  // console.log("dataaaaa----",data)
  const Item = ({item}) => {
    setBorderBlue(item?.borderStatusBlue);
    return (
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor:
              item.status === 'available' ? '#D8DEFF' : '#EEEEEE',

            borderTopWidth: item.statusSelectedSlots === 'selected' ? 2 : 0,
            borderBottomWidth: item.statusSelectedSlots === 'selected' ? 2 : 0,
            borderRightWidth:
              item.statusSelectedSlots === 'selected' &&
              item.statusEndTime === false
                ? 2
                : 0,
            borderLeftWidth:
              item.statusSelectedSlots === 'selected' &&
              item.statusStartTime === false
                ? 2
                : 0,

            borderColor:
              item.borderStatusBlue === true
                ? AppTheme.COLORS.purple
                : item.borderStatusRed === true
                ? AppTheme.COLORS.error
                : AppTheme.COLORS.error,
          },
        ]}>
        <Txt
          style={[
            styles.time,
            item.key.endsWith(`:00`) ? styles.boldHourTxt : styles.lightHourTxt,
          ]}>
          {`${item.key}`}
        </Txt>
        <Txt style={styles.ampmTxt}>
          {item.key.endsWith(`:00`) ? item.ampm : null}
        </Txt>
      </View>
    );
  };

  console.log('borderrED-----------222---', borderBlue);
  const getTime = (timeObj, format) => {
    if (!timeObj) return 'hh:mm A';
    const time = moment(timeObj).format(format);
    return time;
  };

  const addTime = () => {
    console.log('showTime999---', GMTTime);
    // const date = new Date(`2022-04-10T${timeString}:00`);
    // console.log("showTime999---", showTime)

    const timeMoment = moment(showTime, 'hh:mm A');
    const newTimeMoment = timeMoment.add(timebtn, 'minutes');
    const newTimeString = newTimeMoment.format('hh:mm A');

    console.log('iso string---2--', newTimeString); // Output: '04:45 PM'

    if (GMTTime) {
      if (timebtn < 12) {
        let time1 = moment(GMTTime).add(timebtn, 'hours').format('hh:mm A');
        setAddTimeDuration(time1);
      } else {
        let time1 = moment(GMTTime).add(timebtn, 'minutes').format('hh:mm A');
        setAddTimeDuration(time1);
      }
      console.log('--addTimeDuration 11---', addTimeDuration);
    } else {
      if (timebtn < 12) {
        let time1 = moment(showTime, 'hh:mm A')
          .add(timebtn, 'hours')
          .format('hh:mm A');
        setAddTimeDuration(time1);
      } else {
        let time1 = moment(showTime, 'hh:mm A')
          .add(timebtn, 'minutes')
          .format('hh:mm A');
        setAddTimeDuration(time1);
      }
      console.log('--addTimeDuration 11---', addTimeDuration);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log(
      'A date has been picked: ',
      date,
      '----',
      moment(new Date(date), 'DD-MM-YYYY').format('DD/MM/YYYY'),
    );
    const formattedDat1 = moment(new Date(date), 'DD-MM-YYYY').format('LL');

    setSelectedDate(formattedDat1);
    console.log('selectedDate---', selectedDate);
    hideDatePicker();
  };

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
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  // This function rounds a given time to the nearest half hour.
  function roundToNearestHalfHour(time) {
    const hour = time.getHours();
    const minute = time.getMinutes();

    if (minute === 0) {
      // If the current time is exactly on the hour
      return new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        hour,
        0,
      );
    } else if (minute >= 1 && minute <= 29) {
      // If the current time is between X:01 and X:29
      return new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        hour,
        30,
      );
    } else if (minute === 30) {
      return new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        hour,
        30,
      );
    } else {
      // If the current time is between X:31 and X:59
      const roundedHour = (hour + 1) % 24;
      return new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        roundedHour,
        0,
      );
    }
  }

  const flatListRef = useRef(null);
  const onSelectionofNoOfTime = () => {
    //     setGMTTime(timePicker);
    // setTimeFormat(getTime(timePicker, 'hh:mm A'));

    const roundedTime = roundToNearestHalfHour(timePicker);
    console.log('time picker---', getTime(roundedTime, 'hh:mm A'));
    setShowTime(timeFormat ? timeFormat : getTime(roundedTime, 'hh:mm A'));
    console.log('time format---', timeFormat);
    bottomSheetRefTimePicker.current?.closeBottomSheet();
    console.log('flatListRef.current:', flatListRef.current);
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({animated: true, index: 12});
      }
    }, 100);
    console.log('flatListRef.current:2-', flatListRef.current);
  };

  const selectReccuringDays = (userType, item) => {
    setRecurringDaysData(userType);
    if (recurringDaysData === userType) {
      setRecurringDaysData(!userType);
    }
    setRecurringDayObject(item);
    console.log('select recurring Day pressed ');
  };

  const timeDuration = usertype => {
    console.log('show me time btn---', usertype);
    settimebtn(usertype);

    // if (timebtn === usertype) {
    //     settimebtn(!usertype);

    // }

    console.log('duration btn pressed ');
  };
  const repeatbookingpress = usertype => {
    setRepeatBooking(usertype);
    console.log('repeat booking pressed ');
  };

  const [currentMeetingRoom, setCurrentMeetingRoom] = useState();

  const selectMeetingRoompress = (usertype, item) => {
    console.log('index---', item);
    setSelectMeetingRoom(usertype);
    setCurrentMeetingRoom(item);

    // if (selectMeetingRoom === usertype) {
    //     setSelectMeetingRoom(!usertype);
    // }
    // handleTimeLine()
    console.log('select meeting room pressed ');
  };

  useEffect(() => {
    addTime();
  }, [timebtn, showTime]);

  useEffect(() => {
    dispatch(GetMeetingRoom())
      .unwrap()
      .then(result => {
        console.warn('Meeting Room---------', result?.meetingRooms);
        setMeetingRoomNo(result ? result?.meetingRooms : []);
      });
  }, [dispatch]);

  const mergeDateTime = (Dates, Time) => {
    console.log('date 11---', Dates);
    const date = moment(Dates, 'LL').format('YYYY-MM-DD');
    const time = moment(Time, 'h:mm A').format('HH:mm');
    console.log('date 11---', date);
    console.log('time 11---', time);
    const isoDate = moment(`${date}T${time}:00.000Z`);

    // const isoDate = date.toISOString();

    console.log('isoDate---', isoDate);
    return isoDate;
  };

  // useEffect(()=>{
  // mergeDateTime()
  // },[showTime , addTimeDuration])

  const convertTo24HourTime = isoTime => {
    const date = new Date(isoTime);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      // hour12: true,
      timeZone: 'UTC',
    };
    const timeFormatter = new Intl.DateTimeFormat(undefined, options);

    // Format the Date object to the desired time format
    const formattedTime = timeFormatter.format(date);

    console.log('formattedTime show please----', formattedTime);

    const [time, modifier] = formattedTime.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12' && modifier === 'AM') {
      hours = '00';
    } else if (hours !== '12' && modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    // const hours= date.getHours().toString().padStart(2,'0')
    // const minutes= date.getMinutes().toString().padStart(2,'0')
    // return `${h}:${m}`;
  };

  const filterSlots = (slots, date) => {
    console.log('date----', date);
    console.log('slot----', slots);

    // const dateString = '14/04/2023';
    const [d, m, y] = date.split('/').map(Number);
    // const isoDateString = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    // const dateObj = new Date(isoDateString);

    const dateObj = new Date(date);
    const isoDateString = dateObj.toISOString().split('T')[0];

    // const dateObj=new Date(date)
    // console.log('dateObj---',dateObj)
    console.log('date 2 ---', isoDateString); // Output: date--- Fri Apr 14 2023 00:00:00 GMT+0000 (Coordinated Universal Time)
    console.log('day 2---', dateObj.getDate()); // Output: day--- 14
    const day = dateObj.getDate();
    console.log('day---', day);

    const filter = slots.filter(slot => {
      console.log("'start date--", slot.FromTime);
      const apiDay = moment.utc(slot.FromTime).format('DD');

      // console.log(dayOfMonth);
      // const apiDate=new Date(slot.FromTime)
      // const apiDay= apiDate.getDate()

      console.log('apiDay 22---', apiDay);
      return Number(apiDay) === day;
    });
    console.log('filter---', filter);

    const convertedTimeSlots = filter.map(
      ({FromTime, ToTime, Id, ResourceId, ResourceName}) => {
        return {
          Id: Id,
          ResourceId: ResourceId,
          ResourceName: ResourceName,
          start: convertTo24HourTime(FromTime),
          end: convertTo24HourTime(ToTime),
        };
      },
    );
    convertedTimeSlots.push(
      {
        start: '22:15',
        end: '23:45',
      },
      {
        start: '00:00',
        end: '07:45',
      },
    );
    console.log('convertedTimeSlots ---', convertedTimeSlots);

    // Sort the Time array based on start time
    const sortedSlots = convertedTimeSlots.sort((a, b) => {
      const timeA = a.start.split(':');
      const timeB = b.start.split(':');
      return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });

    // Output the sorted Time array
    console.log('sortedSlots----', sortedSlots);

    setTimeSlots(sortedSlots);
  };

  //get bookings of meeting room from API
  useEffect(() => {
    dispatch(
      GetMeetingBooking(
        currentMeetingRoom ? currentMeetingRoom?.Id : meetingRoomOne?.Id,
      ),
    )
      .unwrap()
      .then(result => {
        console.log('resultt -- GetMeetingBooking ---', result?.meetingRooms);
        filterSlots(result?.meetingRooms, selectedDate);
      })
      .catch(err => {
        console.log('slots api failed', err);
      });
  }, [dispatch, selectedDate, currentMeetingRoom ? currentMeetingRoom : null]);

  console.log('timeSlots------', timeSlots);

  // CHECKING DAY PASS AVAILIBILITY FOR MEETING ROOM
  // useEffect(()=>{
  // const dayPassDate= moment(selectedDate).format('YYYY-MM-DD')
  // const body ={id:coworkerId,date:dayPassDate}
  // console.log("body----2233--",body)
  // if (dayPass){
  // dispatch(DayPassCheck(body)).unwrap().then(result=>{
  //     console.log("result of day pas check =>>>>>>>",result)
  //     setDayPassCheck(result?.available)
  //     if(result?.available === false){
  //         bottomSheetNoBooking.current?.snapToIndex(0);
  //     }
  // }).catch(error=>{
  //     console.log("error of day pass check---",error)
  // })
  // }
  // else{

  // }
  // },[dayPass,selectedDate])

  //HIDING DATES BETWEEN 10 PM AND 8 AM
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 8 || currentHour >= 22) {
      setTimePicker(null);
    } else {
      setTimePicker(new Date());
    }
  }, []);

  //////The isToday() function is a custom function that you'll need to implement to check whether selectedDate is today's date.////
  function isToday(date) {
    const today = new Date();
    console.log('is today date--', date);
    const providedDate = new Date(date);
    console.log('provides date--', providedDate, '--', today);
    return (
      providedDate.getDate() === today.getDate() &&
      providedDate.getMonth() === today.getMonth() &&
      providedDate.getFullYear() === today.getFullYear()
    );
  }

  /////////////////////////////BOTTOM SHEETS ////////////////////////////

  const bottomSheetContentTimePicker = (
    <View style={styles.bottomSheetContainer}>
      <Txt style={[styles.title, styles.BottomSheetTitle]}>
        {Strings.startTime}
      </Txt>
      <View style={styles.timePickerContainer}>
        {timePicker && (
          <DatePicker
            androidVariant="iosClone"
            date={timePicker}
            textColor={
              isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black
            }
            fadeToColor={'none'}
            onDateChange={value => {
              setTimePicker(value);
              console.log('value--', value);
              setGMTTime(value);
              console.log('value', getTime(value, 'hh:mm A'));
              setTimeFormat(getTime(value, 'hh:mm A'));
            }}
            mode="time"
            is24hourSource="locale"
            minuteInterval={15}
            minimumDate={
              (isToday(selectedDate) ? minimumDate : undefined) ||
              new Date(new Date().setHours(8, 0, 0))
            }
            maximumDate={new Date(new Date().setHours(22, 0, 0))}
          />
        )}
      </View>
      <Botton
        loading={false}
        title={'Confirm'}
        disabled={false}
        accessibilityLabel="confirmTime"
        singleButtonStyle={{marginTop: scale(10)}}
        onPress={() => onSelectionofNoOfTime()}
      />
    </View>
  );

  const bottomSheetRecurringContent = (
    <View style={styles.bottomSheetContainer}>
      <Txt style={[styles.title, styles.BottomSheetTitle]}>
        {Strings.repeatMeeting}
      </Txt>

      {recurring.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            selectReccuringDays(item?.recurringDay, item);
            console.log('selected day', item?.recurringDay);
          }}
          style={[
            styles.recurringDaysContainer,
            {borderWidth: recurringDaysData == item?.recurringDay ? 1 : 0},
          ]}>
          <Txt style={styles.recurringText}>{item?.recurringDay}</Txt>
          {recurringDaysData == item?.recurringDay && (
            <View style={styles.checkedContainer}>
              <MaterialCommunityIcons
                name="check"
                size={20}
                color={AppTheme.COLORS.white}
              />
            </View>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.bottomSheetBtnContainer}>
        <Botton
          loading={false}
          title={'Confirm'}
          disabled={false}
          //    singleButtonStyle={{backgroundColor:isDarkMode ? AppTheme.COLORS.purple : AppTheme.COLORS.black}}
          accessibilityLabel="confirmRecurring"
          onPress={() => {
            setShowRecurringDay(recurringDaysData);
            bottomSheetRefRecurringDays.current?.closeBottomSheet();
          }}
        />
      </View>
    </View>
  );

  ///////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (bottomSheet.bsTimePicker) {
      console.log('timepicker is true');
      bottomSheetRefTimePicker.current?.expandBottomSheet();
    } else if (bottomSheet.bsRepeat) {
      console.log('bsRepeat is true');
      bottomSheetRefRecurringDays.current?.expandBottomSheet();
    }
  }, [bottomSheet]); // dependency array

  return (
    <>
      <Frame
        showBottomSheet={true}
        snapPoints={
          bottomSheet.bsTimePicker ? snapPoints : snapPointsRecurringDays
        }
        bottomSheetContent={
          bottomSheet.bsTimePicker
            ? bottomSheetContentTimePicker
            : bottomSheetRecurringContent
        }
        ref={
          bottomSheet.bsTimePicker
            ? bottomSheetRefTimePicker
            : bottomSheetRefRecurringDays
        }>
        <View style={styles.mainContainer}>
          <Txt style={styles.scheduleText}>{Strings.schedule}</Txt>
          <View
            style={[
              styles.flexDirectionRow,
              {alignItems: 'center', justifyContent: 'space-between'},
            ]}>
            <TouchableOpacity
              accessibilityLabel="selectDateView"
              onPress={() => {
                console.log('i am date');
                showDatePicker();
              }}>
              {/* <Txt style={[styles.inputViewText,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>{Strings.date}</Txt> */}
              <View
                style={[
                  styles.inputView,
                  {
                    backgroundColor: isDarkMode
                      ? AppTheme.COLORS.wrapperDarkModeBg
                      : AppTheme.COLORS.secondaryGreyLightBg,
                  },
                ]}>
                <View style={[styles.flexDirectionRow, {alignItems: 'center'}]}>
                  <View>
                    <Svg width={'100%'}>
                      {isDarkMode ? <CalendarDark /> : <DateIcon />}
                    </Svg>
                  </View>
                  <Txt style={styles.placeHolder}>{selectedDate}</Txt>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="selectTime"
              onPress={() => {
                console.log('i am time');
                setBottomSheet({bsTimePicker: true, bsRepeat: false});
                bottomSheetRefTimePicker.current?.expandBottomSheet();
              }}>
              {/* <Txt style={[styles.inputViewText,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>{Strings.startTime}</Txt> */}
              <View
                style={[
                  styles.inputView,
                  {
                    backgroundColor: isDarkMode
                      ? AppTheme.COLORS.wrapperDarkModeBg
                      : AppTheme.COLORS.secondaryGreyLightBg,
                  },
                ]}>
                <View style={[styles.flexDirectionRow, {alignItems: 'center'}]}>
                  <View>
                    <ClockIcon
                      stroke={
                        isDarkMode
                          ? AppTheme.COLORS.white
                          : AppTheme.COLORS.black
                      }
                    />
                  </View>
                  <Txt style={styles.placeHolder}>
                    {timebtn && showTime
                      ? `${showTime} - ${addTimeDuration}`
                      : showTime
                      ? showTime
                      : 'hh : mm'}
                  </Txt>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.flexDirectionRow,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: AppTheme.SPACINGS.MARGINS.M4,
              },
            ]}>
            <Txt style={styles.screenHeadings}>{Strings.duration}</Txt>
            <View style={styles.durationBoxesView}>
              {duration.map(item => (
                <TouchableOpacity
                  accessibilityLabel="duration"
                  onPress={() => timeDuration(item.hour)}
                  style={
                    timebtn === item.hour
                      ? [
                          styles.btnPress,
                          {
                            backgroundColor: isDarkMode
                              ? AppTheme.COLORS.white
                              : AppTheme.COLORS.black,
                          },
                        ]
                      : [styles.btnNormal, {borderColor: '#C9C9C9'}]
                  }>
                  <Txt
                    style={
                      timebtn === item.hour
                        ? [
                            isDarkMode
                              ? [
                                  styles.durationBoxesOnPressText,
                                  {
                                    color: AppTheme.COLORS.black,
                                    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
                                  },
                                ]
                              : styles.durationBoxesOnPressText,
                          ]
                        : styles.durationBoxesDefaultText
                    }>{`${item.hour} ${item.timeUnit}`}</Txt>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {!dayPass ? (
            <View style={[style.flexDirectionRow, {alignItems: 'center'}]}>
              <View>
                <Txt style={styles.screenHeadings}>{Strings.repeatBooking}</Txt>
                {repeatBooking === 'Yes' && (
                  <>
                    <TouchableOpacity
                      accessibilityLabel="repeatDaysSelect"
                      onPress={() => {
                        bottomSheetRefRecurringDays.current?.expandBottomSheet();
                        setBottomSheet({bsTimePicker: false, bsRepeat: true});
                      }}>
                      <Txt style={styles.recurringselectiontext}>
                        {showRecurringDay
                          ? showRecurringDay
                          : 'Select Repeat Days'}
                      </Txt>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <View style={styles.repeatBookingBoxesView}>
                <TouchableOpacity
                  accessibilityLabel="repeatYes"
                  onPress={() => {
                    repeatbookingpress('Yes');
                    bottomSheetRefRecurringDays.current?.expandBottomSheet();
                    setBottomSheet({bsTimePicker: false, bsRepeat: true});
                    // isModalVisible
                  }}
                  style={
                    repeatBooking === 'Yes'
                      ? [
                          styles.bookingbtnPress,
                          {
                            backgroundColor: isDarkMode
                              ? AppTheme.COLORS.white
                              : AppTheme.COLORS.black,
                          },
                        ]
                      : [styles.bookingbtnNormal, {borderColor: '#C9C9C9'}]
                  }>
                  <Txt
                    style={
                      repeatBooking === 'Yes'
                        ? [
                            isDarkMode
                              ? [
                                  styles.repeatbookingBoxesOnPressText,
                                  {
                                    color: AppTheme.COLORS.black,
                                    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
                                  },
                                ]
                              : styles.repeatbookingBoxesOnPressText,
                          ]
                        : styles.repeatbookingBoxesDefaultText
                    }>
                    Yes
                  </Txt>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityLabel="repeatNo"
                  onPress={() => {
                    repeatbookingpress('No');
                  }}
                  style={
                    repeatBooking === 'No'
                      ? [
                          styles.bookingbtnPress,
                          {
                            backgroundColor: isDarkMode
                              ? AppTheme.COLORS.white
                              : AppTheme.COLORS.black,
                          },
                        ]
                      : [styles.bookingbtnNormal, {borderColor: '#C9C9C9'}]
                  }>
                  <Txt
                    style={
                      repeatBooking === 'No'
                        ? [
                            isDarkMode
                              ? [
                                  styles.repeatbookingBoxesOnPressText,
                                  {
                                    color: AppTheme.COLORS.black,
                                    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
                                  },
                                ]
                              : styles.repeatbookingBoxesOnPressText,
                          ]
                        : styles.repeatbookingBoxesDefaultText
                    }>
                    No
                  </Txt>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <Divider
            style={[
              styles.divider,
              {
                backgroundColor: isDarkMode
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(202, 202, 202, 0.5)',
              },
            ]}
          />
          <Txt style={styles.screenHeadings}>{Strings.selectMeetingRoom}</Txt>

          <View style={styles.shimmerAlign}>
            <ShimmerPlaceHolder
              visible={meetingRoomPending === false}
              shimmerStyle={styles.shimmerAvail}></ShimmerPlaceHolder>

            <ShimmerPlaceHolder
              visible={meetingRoomPending === false}
              shimmerStyle={styles.shimmerAvail}></ShimmerPlaceHolder>

            <ShimmerPlaceHolder
              visible={meetingRoomPending === false}
              shimmerStyle={styles.shimmerAvail}></ShimmerPlaceHolder>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectMeetingRoomBoxesView}>
            {meetingRoomNo.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  selectMeetingRoompress(item.Title, item);
                  console.log('select meeting room N0 ---', item?.Title);
                }}
                style={
                  selectMeetingRoom === item.Title
                    ? [
                        styles.meetingRoombtnPress,
                        {
                          backgroundColor: isDarkMode
                            ? AppTheme.COLORS.white
                            : AppTheme.COLORS.black,
                        },
                      ]
                    : [styles.meetinroombtnNormal, {borderColor: '#C9C9C9'}]
                }>
                <Txt
                  style={
                    selectMeetingRoom === item.Title
                      ? [
                          isDarkMode
                            ? [
                                styles.meetingRoomOnPressText,
                                {
                                  color: AppTheme.COLORS.black,
                                  fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
                                },
                              ]
                            : styles.meetingRoomOnPressText,
                        ]
                      : styles.meetingRoomOnDefaultText
                  }>
                  {item.Title}
                </Txt>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* {console.log('1212121------',meetingRoomNo[0])} */}
          <SelectMeetingRoomCard
            item={currentMeetingRoom ? currentMeetingRoom : meetingRoomOne}
            // timeLine={timeLine}
            data={data}
            ref={flatListRef}
            renderItem={Item}
            disabled={true}
            itemStatus={data.map(item => item.status)}
          />
          {console.log('day pass checkis---', dayPassCheck)}
          <View style={styles.proceedBtn}>
            <Botton
              accessibilityLabel="proceedBtn"
              loading={false}
              title={'Proceed'}
              disabled={
                !dayPass
                  ? !GetMeetingBookingPending &&
                    showTime &&
                    addTimeDuration &&
                    timebtn &&
                    selectMeetingRoom &&
                    (repeatBooking === 'No'
                      ? repeatBooking
                      : showRecurringDay) &&
                    borderBlue
                    ? false
                    : true
                  : !GetMeetingBookingPending &&
                    showTime &&
                    addTimeDuration &&
                    timebtn &&
                    //  dayPassCheck &&
                    selectMeetingRoom &&
                    borderBlue
                  ? false
                  : true
              }
              // disabled={true}
              small={false}
              onPress={() => {
                console.log('currentMeetingRoom---', currentMeetingRoom);
                console.log(' meetingRoomOne', meetingRoomOne);
                navigation.navigate(ScreensName.invitationScreen, {
                  FromTime: showTime,
                  ToTime: addTimeDuration,
                  repeatBooking: repeatBooking === 'Yes' ? true : false,
                  recurringDaysData:
                    repeatBooking === 'Yes' ? recurringDayObject : null,
                  currentMeetingRoom: currentMeetingRoom
                    ? currentMeetingRoom?.Id
                    : meetingRoomOne?.Id,
                  currentMeetingName: currentMeetingRoom
                    ? currentMeetingRoom?.Title
                    : meetingRoomOne?.Title,
                  isoStartTime: mergeDateTime(selectedDate, showTime),
                  isoEndTime: mergeDateTime(selectedDate, addTimeDuration),
                  dayPass: dayPass,
                  selectedDate: selectedDate,
                  allocation: currentMeetingRoom
                    ? currentMeetingRoom?.Allocation
                    : meetingRoomOne?.Allocation,
                  rescheduleTeamMembers: rescheduleTeamMembers,
                  isRescheduleRequest: isRescheduleRequest,
                  idReschedule: idReschedule,
                  participant: false,
                  Description: currentMeetingRoom
                    ? currentMeetingRoom?.Description
                    : meetingRoomOne?.Description,
                });
              }}
            />
          </View>
        </View>

        <Modal
          isVisible={isDatePickerVisible}
          animationIn="pulse"
          animationOut="fadeOut"
          // transparent={true}
        >
          <View style={styles.modalContainer}>
            <Pressable
              onPress={() => {
                hideDatePicker();
              }}>
              <View
                style={[
                  styles.CalendarPickerContainer,
                  {
                    backgroundColor: isDarkMode
                      ? AppTheme.COLORS.wrapperDarkModeBg
                      : '#FFFFFF',
                  },
                ]}>
                <CalendarPicker
                  onDateChange={handleConfirm}
                  width={350}
                  minDate={minDate}
                  monthTitleStyle={[
                    styles.calendarMonth,
                    {
                      color: isDarkMode
                        ? AppTheme.COLORS.orange
                        : AppTheme.COLORS.purple,
                    },
                  ]}
                  yearTitleStyle={[
                    styles.calendarYear,
                    {
                      color: isDarkMode
                        ? AppTheme.COLORS.orange
                        : AppTheme.COLORS.purple,
                    },
                  ]}
                  todayBackgroundColor="#D8DEFF"
                  selectedDayColor="#D8DEFF"
                  textStyle={[
                    styles.calendarText,
                    {
                      color: isDarkMode
                        ? AppTheme.COLORS.white
                        : AppTheme.COLORS.black,
                    },
                  ]}
                  // textStyle={{backgroundColor:'red'}}
                  previousTitle={
                    <MaterialIcons
                      name={'keyboard-arrow-left'}
                      size={24}
                      color={
                        isDarkMode
                          ? AppTheme.COLORS.white
                          : AppTheme.COLORS.black
                      }
                    />
                  }
                  nextTitle={
                    <MaterialIcons
                      name={'keyboard-arrow-right'}
                      size={24}
                      color={
                        isDarkMode
                          ? AppTheme.COLORS.white
                          : AppTheme.COLORS.black
                      }
                    />
                  }
                />
              </View>
            </Pressable>
          </View>
        </Modal>

        <BottomSheet
          ref={bottomSheetNoBooking}
          snapPoints={snapPointsNoBooking}
          backdropComponent={renderBackdropBottomSheet}
          index={-1}
          enablePanDownToClose={true}
          enabledInnerScrolling={true}>
          <BottomSheetView style={styles.bottomSheetTitle}>
            <Txt style={styles.noResource}>No Day Pass Available</Txt>
            <Txt style={styles.noResourceDesc}>
              Oppss. We are sorry that no day pass is available at the moment.
              Please bear with us.
            </Txt>
            <View style={styles.btnContainerHome}>
              <PrimaryButton
                loading={false}
                title={'close'}
                disabled={false}
                small={false}
                onPress={() => {
                  bottomSheetNoBooking.current?.close();
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Frame>
    </>
  );
};

export default Meetingroom;

// Styles
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { scale } from '../../shared/utils/scale';
import { AppTheme } from '../../shared/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,

  },
  safeAreaContainer:
    {
      flex: 1,

    },

  mainContainer: {
    // flex: 1,
    // backgroundColor: AppTheme.COLORS.white,
    padding: AppTheme.SPACINGS.PADDINGS.P1
  },
  bottomSheetScrollView:
        { flexGrow: 1 },
  Meetingroom: {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    // marginTop: normalize(14),
  },
  waitToAssignResource: {
    color: AppTheme.COLORS.primaryBlueBg,

    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(14)
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  card: {
    //paddingHorizontal: normalize(10),
    // paddingVertical: normalize(16),


    //padding: hp('1.5%'),
    borderRadius: normalize(20),
    elevation: 3,
    shadowColor: 'rgba(152, 152, 152, 1)',
    backgroundColor: 'white',
    //marginLeft: normalize(20),
    marginVertical: normalize(10),

  },
  
  tabContainer: {
    flexDirection: 'row',
    // backgroundColor: "red",
    justifyContent: 'space-around',
    marginTop: normalize(34),
    // marginBottom: normalize(24)
  },
  tabTxt: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    lineHeight: normalize(19.5),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontWeight: '600',
  },
  divider: {

    height: 0.7,
    width: '100%',
    marginVertical:   AppTheme.SPACINGS.MARGINS.M1,
    // bottom: 4,
    zIndex: -10,
  
    // marginVertical: normalize(12),
  },
  monthlyTxt: {
    fontWeight: '500',
    color: AppTheme.COLORS.primaryBlueBg,
    fontSize: 24,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM
  },
  price: {
    fontSize: normalize(30),
    lineHeight: normalize(37),
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontWeight: '600',
    color: AppTheme.COLORS.black

  },
  deskTxt: {
    lineHeight: 50,
    fontSize:AppTheme.FONTS.SIZE.HEADINGS.H4,
    color: '#081F32',
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  services:
    {
      flexDirection: 'row',
      alignItems: 'center'
    },
  servicesContainer: {
    marginTop: normalize(12),
    marginBottom: normalize(24)
  },
  servicesTxt: {
    marginLeft: 7,
    fontWeight: '400', fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    lineHeight: 24,
    fontFamily: AppTheme.FONTS.TYPE.LIGHT,
    color: AppTheme.COLORS.black
  },
  priceTxt: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR
  },
  indicator: {
    height: 9,
    width: normalize(144),
    backgroundColor: AppTheme.COLORS.primaryGreenBg,
    borderRadius: normalize(16),
    marginTop: normalize(20),
    zIndex: 10000
  },
  tabView: {
    alignItems: 'center',
    flex: 1
  },
  inputContainer: {
    marginVertical: normalize(12),

  },
  expectedDateTxt: {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontWeight: '600',
    lineHeight: normalize(20),
    marginBottom: normalize(12),
    marginRight: normalize(12)
  },
  expectedEndDate: {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontWeight: '400',
    lineHeight: normalize(20),
    marginBottom: normalize(12),
    marginRight: normalize(10)
  },
  teamMemberTxt: {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontWeight: '600',
    lineHeight: normalize(20),
    marginBottom: normalize(12),
  },
 
  bottomSheetContainer: {
    backgroundColor: 'rgba(245, 245, 245, 1)',
    width: '100%',
    height: normalize(61),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(24)
  },
  bottomSheetBtnContainer: {
    marginHorizontal: normalize(22),
    marginTop: normalize(30),
    marginBottom: normalize(50)
  },
  btnPress: {
    
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
  btnNormal: {
  //  backgroundColor: 'white',
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1
  },
  bookingbtnPress: {
    //backgroundColor: AppTheme.COLORS.black,
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
  bookingbtnNormal: {
   // backgroundColor: AppTheme.COLORS.white,
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1
  },
  defaulttimeline: {
    width: normalize(12),
    height: 20,
    backgroundColor: 'grey',
    marginHorizontal: 4,

    borderRadius: 10,
    alignSelf: 'center'
  },
  selectedtimeline: {
    width: normalize(12),
    height: 20,
    backgroundColor: 'rgba(53, 215, 161, 1)',
    marginHorizontal: 4,
    borderRadius: 10,
    alignSelf: 'center'

  },
  selectedborder: {
    height: 50,
    backgroundColor: 'red',
    width: 70

  },
  modal: {
    margin: 20,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  tt: {
    color: '#3f2949',
    marginTop: 10
  },
  screenHeadings: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  //  color: AppTheme.COLORS.black
  },
  durationBoxesView:
    {
      marginRight: normalize(0),
      flexDirection: 'row',
      height: normalize(50),
      width: '73%',
      alignItems: 'center',
      justifyContent: 'space-between',

    },
  durationBoxesOnPressText:

    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.white,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  durationBoxesDefaultText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.darkText,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  repeatBookingBoxesView:
    {
      flexDirection: 'row',
      height: 50,
      width: '36%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: normalize(80)
    },
  repeatbookingBoxesOnPressText:

    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.white,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  repeatbookingBoxesDefaultText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.darkText,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  recurringselectiontext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    color: AppTheme.COLORS.darkText,
    textDecorationLine: 'underline'
  },
  noofperson:
    {
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4
    },
  avaiabletext:
    {

      color: '#30B991',
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      fontSize: normalize(14),
    },
  inputView:
    {
      width: normalize(160),
      height: normalize(45),
      backgroundColor: AppTheme.COLORS.secondaryGreyLightBg,
      borderRadius: normalize(4),
      justifyContent: 'center',
      paddingHorizontal: normalize(10)
    },
  inputViewText:
    {
      //color: 'rgba(0, 0, 0, 0.5)',
      fontSize: normalize(10),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,

      lineHeight: normalize(17),
      marginBottom: normalize(10),
    },
  scheduleText: {
    //color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    marginBottom:AppTheme.SPACINGS.MARGINS.M4
  },
  placeHolder: {
    //color: AppTheme.COLORS.officialBlack,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: normalize(9),

  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
   // color: AppTheme.COLORS.black,

  },
  BottomSheetTitle: {
    textAlign: 'center',
    marginTop: normalize(18),
   // color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

  },
  bottomSheetBtnContainer: {


    paddingVertical: normalize(20),

  },
  bottomSheetBtnContainer2: {
    flex: 0.9,
    justifyContent: 'flex-end'
  },
  picker:
    {
      backgroundColor: AppTheme.COLORS.white,
      width: Platform.OS === 'ios' ? '100%' : '40%',
      height: normalize(200),
      alignSelf: 'center',
    },
  timePickerContainer:

    {
      alignItems: 'center'
    }
  ,
  bottomSheetContainer:

    {

      paddingHorizontal: normalize(20)
    },

  selectMeetingRoomBoxesView: {
    flexDirection: 'row',
    flexGrow: 1,
    // alignItems: "center",
    marginTop: AppTheme.SPACINGS.MARGINS.M1

  },
  meetingRoombtnPress: {
    //backgroundColor: AppTheme.COLORS.black,
    width: 'auto',
    height: 'auto',
    paddingVertical: normalize(11),
    paddingHorizontal: normalize(12),
    borderRadius: 5,
    marginRight: normalize(12)

  },
  meetinroombtnNormal: {
    //backgroundColor: AppTheme.COLORS.white,
    width: 'auto',
    height: 'auto',
    paddingVertical: normalize(11),
    paddingHorizontal: normalize(12),
    borderRadius: 5,
    borderWidth: 1,
    marginRight: normalize(12)
  },
  meetingRoomOnPressText:

    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.white,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  meetingRoomOnDefaultText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.darkText,
      fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  recurringDaysContainer: {
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    height: normalize(50),
    borderRadius: normalize(4),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(12),
    borderColor: AppTheme.COLORS.orange,
  },
  checkedContainer:
    {
      backgroundColor: AppTheme.COLORS.orange,
      height: normalize(20),
      width: normalize(20),
      borderRadius: normalize(50),
      justifyContent: 'center'
    },
  recurringText:
    {

      lineHeight: normalize(17),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //  color: AppTheme.COLORS.officialBlack,
      fontSize: normalize(14),
    },
  proceedBtn: {
    marginTop: scale(20)
  },
  modalContainer:
    {
      flex: 1,

    },
  CalendarPickerContainer:
    {

      backgroundColor: '#FFFFFF',
      marginTop: normalize(190),
      width: '100%',
      height: '55%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 8
    },
  calendarMonth:
    {
      color: AppTheme.COLORS.purple,
      fontSize: normalize(18),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR

    },
  calendarYear:
    {
      color: AppTheme.COLORS.purple,
      fontSize: normalize(18),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR
    },
  calendarText:
    {
     // color: AppTheme.COLORS.black,
      fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR
    },



  container: {
    height: 42,
  },
  itemContainer: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temp: {
    height: 40,
    width: 40
  },
  time: {
    fontSize: 12,

  },
  boldHourTxt:
    {
      color: AppTheme.COLORS.black,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
     
    },
  ampmTxt: {
    color: AppTheme.COLORS.black,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  lightHourTxt:
    {
      color: 'rgba(0, 0, 0, 0.5)',
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
      
    },
  shimmerAvail:
    {
      backgroundColor: 'rgba(134, 134, 134, 0.06)',
      height: normalize(40),
      borderRadius: normalize(8),
       marginLeft: normalize(10),
      width: '30%',
      marginTop:normalize(10)
    },
  shimmerAlign:{
    flexDirection:'row',
    justifyContent:'space-evenly'
       
  },
  noResource:{
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.black,
    paddingHorizontal: normalize(90),
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
  },
  noResourceDesc:{
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.black,
    paddingHorizontal: normalize(55),
    textAlign: 'center',
    fontSize: normalize(12),
    marginTop:normalize(12)
  },
  btnContainerHome:{
     
    marginTop: normalize(25),
    paddingHorizontal: normalize(20)
  },
  bottomSheetTitle: {
    paddingVertical: 20,
    
  },

});
export default styles;

// Meeting Room data Dummy Old One: 7/8/23
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, FlatList, Animated, PanResponder, Platform} from 'react-native';
import styles from './DummyScreen.style';
//* Components
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import ImageView from 'react-native-image-viewing';
import MeetingRoomDetailSkeleton from '../../shared/components/MeetingRoomDetailSkeleton/MeetingRoomDetailSkeleton';
import MeetingRoomButton from '../../shared/components/MeetingRoomButton/MeetingRoomButton';
import MeetingRoomDetails from '../../shared/components/MeetingRoomDetails/MeetingRoomDetails';
import DurationButton from '../../shared/components/DurationButton/DurationButton';
import TimelineItem from '../../shared/components/TimelineItem/TimelineItem';
import RepeatBookingBtn from '../../shared/components/RepeatBookingBtn/RepeatBookingBtn';
import ScheduleBtn from '../../shared/components/ScheduleBtn/ScheduleBtn';
import GuideLog from '../../shared/components/GuideLog/GuideLog';
//* API Helper Methods
import {useDispatch, useSelector} from 'react-redux';
import {GetMeetingRoom} from '../../shared/redux/action/GetMeetingRoom';
import {GetMeetingNewTimeLine} from '../../shared/redux/action/GetMeetingNewTimeLine';
//* Helper function
import {calculateWidth} from '../../shared/utils/helper';
import {scale} from '../../shared/utils/scale';
//* Others
import {AppTheme} from '../../shared/theme';
import uuid from 'react-native-uuid';
const moment = require('moment');
//* Duration Buttons Data
const duration = [30, 60, 90, 120];
// !Dummy Data
import TimeLineBooking from '../../MockData/TimeLineBooking.json';
import Botton from '../../shared/components/core/Botton';
import RNDateTimePicker from '@react-native-community/datetimepicker';

// TimeLine Logic start
const getCurrentTimeRoundedToNearestDuration = duration => {
  const currentTime = moment();
  const minutes = currentTime.minutes();
  const nearestMinute = Math.ceil(minutes / duration) * duration;
  const roundedTime = currentTime.minutes(nearestMinute).seconds(0);
  return roundedTime;
};

const getDefaultTimeRange = (currentTime, selectedDuration) => {
  // Check the current minute to determine the default time selection
  const currentMinute = moment(currentTime).minutes();
  const isCurrentMinuteLessThan30 = currentMinute < 30;

  // If the current minute is less than 30, select the next available 30-minute slot
  let selectedTime;
  if (isCurrentMinuteLessThan30) {
    selectedTime = moment(currentTime).minutes(30).seconds(0);
  } else {
    // If the current minute is 30 or more, select the next available hour slot
    selectedTime = moment(currentTime).add(1, 'hour').minutes(0).seconds(0);
  }

  // Format the start and end times based on the selected duration
  const startTime = moment(selectedTime).format('h:mm');
  const endTime = moment(selectedTime)
    .clone()
    .add(selectedDuration, 'minutes')
    .format('h:mm A');

  return `${startTime} - ${endTime}`;
};
// TimeLine Logic end
export default function DummyScreen({navigation}) {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [viewImage, setViewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTimeLine, setIsLoadingTimeline] = useState(true);
  //* Others
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  //? API Modules
  //* Get Meeting Rooms API
  const getMeetingRoomsApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const {statusCode, meetingRooms: data} = await dispatch(
        GetMeetingRoom(),
      ).unwrap();
      if (statusCode === 200) {
        setMeetingRooms(data);
        // console.log('Room Data API;---------------', data[0].Id);
        // getBookingsApi(data[0].Id)
        getBookingsApi('1414985590', '2023-06-02');
        setSelectedImage({
          uri: String(
            `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${data[0]?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
          ),
          id: uuid.v4(),
        });
        setIsLoading(false);
      } else {
        setMeetingRooms([]);
        setSelectedImage(null);
        setIsLoading(false);
      }
    } catch (error) {
      setMeetingRooms([]);
      setSelectedImage(null);
      setIsLoading(false);
      console.error('Error while getting meeting rooms details: ', error);
      setError('Error while getting meeting rooms details.');
    }
  }, [dispatch]);

  //* Get Bookings API
  const getBookingsApi = useCallback(
    async (id, date) => {
      try {
        setIsLoadingTimeline(true);
        const passingData = {id, date};
        const {statusCode, slots} = await dispatch(
          GetMeetingNewTimeLine(passingData),
        ).unwrap();
        if (statusCode === 200) {
          setBookings(slots);
          console.log('Data API;---------------', slots);
          setIsLoadingTimeline(false);
        } else {
          setBookings([]);
          setIsLoadingTimeline(false);
        }
      } catch (error) {
        setBookings([]);
        setIsLoadingTimeline(false);
        console.error('Error while getting meeting rooms details: ', error);
        setError('Error while getting meeting rooms details.');
      }
    },
    [dispatch],
  );

  //* Calling the "getMeetingRoomsApi" on 1st render
  useEffect(() => {
    getMeetingRoomsApi();
    return () => {
      setMeetingRooms([]);
      setError(null);
      setSelectedImage(null);
      setIsLoading(false);
    };
  }, []);

  //* Calling the "getBookingsApi" on "Meeting Room" Button Press
  useEffect(() => {
    if (meetingRooms.length > 0) {
      // console.log("Hiiiiii", meetingRooms[selectedRoomIndex].Id)
      // getBookingsApi(meetingRooms[selectedRoomIndex].Id, '2023-06-02')
      // getBookingsApi('1414985590', '2023-06-02');
      getBookingsApi(
        meetingRooms[selectedRoomIndex].Id,
        moment(selectedDate).format('YYYY-MM-DD'),
      );
      // console.warn("Hmm------------", meetingRooms[selectedRoomIndex].Id, moment(selectedDate).format('YYYY-MM-DD'));
      // console.warn("Hmm------------", meetingRooms[selectedRoomIndex].Id, '2023-07-02');
      // console.warn("Hmm------------", meetingRooms[selectedRoomIndex].Id, moment(selectedDate).format('YYYY-MM-DD'));
      // getBookingsApi('1415044085', '2023-06-02');
    }
  }, [selectedRoomIndex]);

  // ! Test Start
  //* Frame on top of Timeline scroll logic
  const scrollX = useRef(new Animated.Value(0)).current;
  const [scrollEnd, setScrollEnd] = useState(false);
  const [scrollStart, setScrollStart] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        console.log('onMoveShouldSetPanResponder - dx:', gestureState.dx);

        // Flatlist Start
        if (scrollStart && gestureState.dx < 0) {
          console.log('Start');
          return true;
        }

        // Flatlist End
        if (scrollEnd && gestureState.dx > 0) {
          console.log('End');
          return false;
        }

        return false;
      },
      onPanResponderMove: (_, gestureState) => {
        if (scrollStart) {
          // Calculate the new scrollX value
          const newScrollX = scrollX._value - gestureState.dx;
          // Limit the scrollX value based on the scrollStart and scrollEnd states
          const leftLimit = 0;

          // Limit scrolling to the left (from the start position)
          if (newScrollX > leftLimit) {
            console.log("ScrollStart 'if' newScrollX > leftLimit", leftLimit);
            scrollX.setValue(leftLimit);
          } else {
            console.log(
              "ScrollStart 'else' newScrollX > leftLimit: ",
              newScrollX,
            );
            // scrollX.setValue(newScrollX);
          }
        }

        // console.log(
        //   'onPanResponderMove - dx:',
        //   gestureState.dx,
        //   newScrollX,
        //   scrollX._value,
        // );

        // Update the scrollX value based on the gesture
        Animated.event([null, {dx: scrollX}], {
          useNativeDriver: false,
        })(_, gestureState);
      },
    }),
  ).current;

  //* FlatList Methods
  const handleEndReached = () => {
    console.log('Reached end');
    setScrollStart(false);
    setScrollEnd(true);
  };
  const handleStartReached = ({nativeEvent}) => {
    if (nativeEvent.contentOffset.x === 0) {
      setScrollEnd(false);
      setScrollStart(true);
      console.log('At Start');
    } else {
      setScrollEnd(false);
      setScrollStart(false);
    }
  };
  // ! Test End

  //* Date & Time Modal Logic
  const [selectedMode, setSelectedMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  const [repeatBooking, setRepeatBooking] = useState('no');
  const [timeValue, setTimeValue] = useState('');

  // Set the default duration (60 minutes) as selected on initial load
  const defaultDurationIndex = duration.indexOf(60);
  const [selectedDurationBtnIndex, setSelectedDurationBtnIndex] =
    useState(defaultDurationIndex);
  const [selectedDurationBtn, setSelectedDurationBtn] = useState(
    duration[defaultDurationIndex],
  );

  // State for the pre-selected date (default to today's date)
  const [selectedDate, setSelectedDate] = useState(moment().toDate());

  // State for the pre-selected time (default to "now" with specific conditions)
  const initialTime =
    getCurrentTimeRoundedToNearestDuration(selectedDurationBtn);
  const [selectedTime, setSelectedTime] = useState(initialTime.toDate());

  // useEffect to set the initial date and time
  useEffect(() => {
    const currentTime = moment(); // Replace this with the current time you want to use
    const timeRange = getDefaultTimeRange(currentTime, selectedDurationBtn);
    // Update the time value state with the formatted time range
    setTimeValue(timeRange);
  }, []);

  // Update the the time tab according to the duration
  useEffect(() => {
    setSelectedDate(moment().toDate());

    // Check the current minute to determine the default time selection
    const currentMinute = moment().minutes();
    const isCurrentMinuteLessThan30 = currentMinute < 30;

    // If the current minute is less than 30, select the next available 30-minute slot
    const initialStartTime = moment()
      .minutes(isCurrentMinuteLessThan30 ? 30 : 0)
      .seconds(0);

    // Set the default duration (60 minutes) as selected on initial load
    const defaultDurationIndex = duration.indexOf(selectedDurationBtn);
    setSelectedDurationBtnIndex(defaultDurationIndex);

    // Calculate the end time based on the selected duration
    const selectedDuration = duration[defaultDurationIndex];
    const initialEndTime = initialStartTime
      .clone()
      .add(selectedDuration, 'minutes');

    // Format the start and end times based on the selected duration
    const startTime = initialStartTime.format('h:mm');
    const endTime = initialEndTime.format('h:mm A');

    // Update the time value state with the formatted time range
    setTimeValue(`${startTime} - ${endTime}`);
  }, [selectedDurationBtn]);

  // Auto Scroll to selected Duration (in Timeline)
  // Define a ref for the FlatList
  const timelineListRef = useRef(null);

  // Function to handle the "time duration" change
  const handleDurationChange = (fromDurationTab, fromTimeTab) => {
    if (fromTimeTab && Array.isArray(fromTimeTab) && fromTimeTab.length === 2) {
      const [startTimeNumber, endTimeNumber] = fromTimeTab;
      console.log(
        'Formated Value------------------:',
        startTimeNumber,
        endTimeNumber,
      );

      // Find the index of the selected time slot based on the new "time range"
      const startIndex = bookings.findIndex(
        item => item.timeNumber == startTimeNumber,
      );
      const endIndex = bookings.findIndex(
        item => item.timeNumber == endTimeNumber,
      );

      // Calculate the center index
      const centerIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
      console.log('Index Value------------------:', centerIndex);

      // Scroll to the center index smoothly
      if (centerIndex !== -1) {
        timelineListRef.current.scrollToIndex({
          animated: true,
          index: centerIndex,
          viewPosition: 0.5, // Center the selected time slot
        });

        // Update the upper frame position to match the selected duration
        const newScrollX = calculateWidth(
          startTimeNumber,
          bookings[centerIndex].timeNumber,
        );
        //  scrollX.setValue(-newScrollX);
        console.log(
          'newScrollX------------------:',
          startTimeNumber,
          bookings[centerIndex].timeNumber,
        );
      } else {
        console.log('Selected time slot not found in the timeline.');
      }
    } else if (fromDurationTab) {
      // Update the selected duration state
      setSelectedDurationBtn(fromDurationTab);
    } else {
      console.error('Please provide a valid dataset!');
    }
  };

  //* Press Handler for "Meeting Room Buttons" and "Durations Button"
  const handleButtonClick = data => {
    if (data.type === 'meetingBtn') {
      setSelectedRoomIndex(data.index);
      setSelectedImage({
        uri: `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${
          meetingRooms[data.index]?.Id
        }?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
        id: uuid.v4(),
      });
    } else if (data.type === 'durationBtn') {
      setSelectedDurationBtnIndex(data.index);
      setSelectedDurationBtn(duration[data.index]);
      // Animate the timeline according to the index of the duration
      handleDurationChange(duration[data.index]);
    } else {
      console.error('Please Pass a Valid Data!');
    }
  };

  const showPickerModal = currentMode => {
    setSelectedMode(currentMode);
    setShowPicker(true);
  };

  const onChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowPicker(false);
    setSelectedDate(currentDate);

    const timeRange = getDefaultTimeRange(currentDate, selectedDurationBtn);

    const [startTime, endTime] = timeRange.split(' -');
    const [startTimeIn24HourFormat, endTimeIn24HourFormat] = [
      moment(startTime, 'h:mm A')
        .add(endTime.includes('PM') ? 12 : 0, 'hours')
        .format('H.mm'),
      moment(endTime, 'h:mm')
        .add(endTime.includes('PM') ? 12 : 0, 'hours')
        .format('H.mm'),
    ];

    console.log('Hmm1_______________', startTimeIn24HourFormat); // Output: "19:30"
    console.log('Hmm2_______________', endTimeIn24HourFormat); // Output: "20:00"
    console.log(moment.duration(str(startTimeIn24HourFormat)).asHours()); // Output: "20:00"
    console.log(moment.duration(str(endTimeIn24HourFormat)).asHours()); // Output: "20:00"

    handleDurationChange(null, [
      moment.duration(timeRange.split(' ')[0]).asHours(),
      moment.duration(timeRange.split(' ')[2]).asHours(),
    ]);
    setTimeValue(timeRange);
    console.log('Selected Date&Time: ', timeRange);
  };

  // Logic End

  //! Test
  const [currentIndex, setCurrentIndex] = useState(0);
  const upperViewRef = useRef(null);
  // Test: Function to calculate the current index based on the position of the upper View
  const calculateCurrentIndex = (upperViewHeight, upperViewPositionY, flatListHeight, flatListPositionY) => {
    console.log('Upper View height:', upperViewHeight);
    console.log('Upper View position (Y):', upperViewPositionY);

    console.log('FlatList height:', flatListHeight);
    console.log('FlatList position (Y):', flatListPositionY);

    const offset = upperViewPositionY - flatListPositionY;
    console.log('Offset:', offset);

    const index = Math.floor(offset / flatListHeight);
    console.log('Current Index:', index);

    // Update the current index
    setCurrentIndex(index);
  };

  // Test: Attach the onScroll event to the FlatList
const onFlatListScroll = (event) => {
  const flatListHeight = event.nativeEvent.layoutMeasurement.height;
  const flatListPositionY = event.nativeEvent.contentOffset.y;

  // The upper view height and position can be obtained using the measure method.
  upperViewRef.current.measure((x, y, width, height, pageX, pageY) => {
    const upperViewHeight = height;
    const upperViewPositionY = pageY;

    // Call the function to calculate the current index
    calculateCurrentIndex(upperViewHeight, upperViewPositionY, flatListHeight, flatListPositionY);
  });
};


  //! Test emd

  return (
    <Frame screenTitle={'Scheduled Meeting Room'} style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <ScheduleBtn
            onCalenderPress={() => {
              showPickerModal('date');
            }}
            onTimePress={() => {
              showPickerModal('time');
            }}
            dateValue={moment(selectedDate).format('D MMMM, YYYY')}
            timeValue={timeValue}
          />
          {/* Duration */}
          <View style={styles.durationContainer}>
            <Txt style={styles.duration}>Duration</Txt>
            <View style={{flexDirection: 'row'}}>
              {duration.map((item, index) => (
                <DurationButton
                  key={item}
                  dataLength={duration.length - 1}
                  duration={item}
                  index={index}
                  isSelected={index === selectedDurationBtnIndex}
                  isDarkMode={isDarkMode}
                  onPress={() =>
                    handleButtonClick({type: 'durationBtn', index})
                  }
                />
              ))}
            </View>
          </View>
          <RepeatBookingBtn
            onNo={() => {
              setRepeatBooking('no');
            }}
            onYes={() => {
              setRepeatBooking('yes');
            }}
            selected={repeatBooking}
          />
          {/* Meeting Rooms Buttons */}
          <View>
            {/* Divider */}
            <View
              style={[
                styles.divider,
                {
                  backgroundColor: isDarkMode ? '#FFFFFF1A' : '#C9C9C9',
                },
              ]}
            />
            <View style={styles.meetingRoomsBtnContainer}>
              <Txt
                style={[
                  styles.duration,
                  {paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1},
                ]}>
                Select meeting room
              </Txt>
              <FlatList
                data={meetingRooms}
                renderItem={({item, index}) => (
                  <MeetingRoomButton
                    item={item}
                    index={index}
                    isSelected={index === selectedRoomIndex}
                    isDarkMode={isDarkMode}
                    onPress={index => {
                      setSelectedRoomIndex(index);
                      setSelectedImage({
                        uri: `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${meetingRooms[index]?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
                        id: uuid.v4(),
                      });
                    }}
                  />
                )}
                keyExtractor={item => item.Id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    {!isLoading ? (
                      <Txt style={styles.notFound}>No meeting rooms found!</Txt>
                    ) : (
                      <MeetingRoomDetailSkeleton />
                    )}
                  </View>
                )}
              />
            </View>
          </View>
          {/* Meeting Room Details */}
          {meetingRooms && meetingRooms.length > 0 && (
            <MeetingRoomDetails
              selectedRoom={meetingRooms[selectedRoomIndex]}
              isDarkMode={isDarkMode}
              onViewImage={() => setViewImage(true)}
            />
          )}
          {/* Timeline */}
          {bookings && bookings.length > 0 && (
            <View style={styles.timeLineContainer}>
              <Animated.View
                onLayout={calculateCurrentIndex}
                // pointerEvents="box-none"
                // hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
                style={[
                  styles.timelineUpperFrame,
                  {
                    width: scale(
                      calculateWidth(
                        duration[selectedDurationBtnIndex],
                        duration,
                      ),
                      true,
                    ),
                    borderRadius: 16,
                    // borderRadius:
                    //   duration[selectedDurationBtnIndex] == 30 ? 16 : 100 / 2,
                    borderColor: isDarkMode
                      ? AppTheme.COLORS.white
                      : AppTheme.COLORS.officialBlack,
                    transform: [{translateX: scrollX}],
                  },
                ]}
                {...panResponder.panHandlers}
              />
              <FlatList
                data={bookings}
                ref={timelineListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.timeHours.toString()}
                contentContainerStyle={{
                  backgroundColor: isDarkMode
                    ? AppTheme.COLORS.wrapperDarkModeBg
                    : '#F1F1F1',
                }}
                renderItem={({item, index}) => (
                  <TimelineItem
                    bookings={bookings}
                    item={item}
                    index={index}
                    isDarkMode={isDarkMode}
                  />
                )}
                onEndReached={handleEndReached}
                onScroll={(e) => {
                  onFlatListScroll(e);
                  handleStartReached();
                }}
              />
            </View>
          )}
          <GuideLog />
        </View>
        <Botton title={'Proceed'} singleButtonStyle={styles.mainBtn} />
      </View>
      <ImageView
        images={[selectedImage]}
        imageIndex={0}
        visible={viewImage}
        onRequestClose={() => setViewImage(false)}
      />
      {showPicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          themeVariant={isDarkMode ? 'dark' : 'light'}
          value={selectedDate}
          mode={selectedMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()} // Set minimum date to today's date
          maximumDate={moment().add(1, 'year').toDate()}
          onChange={onChange}
          minuteInterval={30}
        />
      )}
    </Frame>
  );
}

