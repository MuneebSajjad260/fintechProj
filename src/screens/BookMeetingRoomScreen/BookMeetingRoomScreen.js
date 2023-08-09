import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  Animated,
  PanResponder,
  Platform,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import styles from './BookMeetingRoomScreen.Style';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useMemo} from 'react';
import uuid from 'react-native-uuid';
import Toast from 'react-native-root-toast';
const moment = require('moment');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
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
import Botton from '../../shared/components/core/Botton';
//* API Helper Methods
import {useDispatch, useSelector} from 'react-redux';
import {GetMeetingRoom} from '../../shared/redux/action/GetMeetingRoom';
import {GetMeetingNewTimeLine} from '../../shared/redux/action/GetMeetingNewTimeLine';
//* Helper function
import {
  calculateWidth,
  duration,
  recurring,
  getDefaultTimeRange,
  getTimeRangeIn24HourFormat,
  getRandomInt,
} from '../../shared/utils/helper';
import {scale} from '../../shared/utils/scale';
//* Others
import {AppTheme} from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import {ScreensName} from '../../shared/constants/ScreensStrings';

export default function BookMeetingRoomScreen({navigation, route}) {
  //* Passed Params
  const {
    dayPass,
    dateReschedule,
    meetingRoomOne,
    idReschedule,
    rescheduleEndTime,
    rescheduleTeamMembers,
    isRescheduleRequest,
    rescheduleStartTime,
    rescheduleDuration,
    rescheduleRepeatBooking,
    rescheduleRecurringDay,
    participant,
  } = route.params;
  // const {Id} = useSelector(selectUserData);
  // console.warn(Id)
  console.warn(
    'Checking the Rescheduled data:-----------------',
    // rescheduleEndTime,
    // rescheduleStartTime,
    rescheduleDuration,
    // rescheduleRepeatBooking,
    // rescheduleRecurringDay,
    // participant,
    // idReschedule,
    // isRescheduleRequest,
    // rescheduleTeamMembers,
    // dateReschedule,
    // meetingRoomOne
  );
  //? Data States
  //* API states
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTimeLine, setIsLoadingTimeline] = useState(true);
  const [error, setError] = useState(null);
  //* Track index States
  const [selectedDurationBtnIndex, setSelectedDurationBtnIndex] = useState(
    duration.indexOf(60),
  );
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  //* Others states
  const [viewImage, setViewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMode, setSelectedMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  const [repeatBooking, setRepeatBooking] = useState('no');
  const [selectedRecurringDay, setSelectedRecurringDay] = useState(
    isRescheduleRequest && rescheduleRepeatBooking === 'Yes'
      ? rescheduleRecurringDay.recurringDay
      : null,
  );
  const [passedRecurringDay, setPassedRecurringDay] = useState(
    isRescheduleRequest && rescheduleRepeatBooking === 'Yes'
      ? rescheduleRecurringDay
      : null,
  );
  const [scrollEnd, setScrollEnd] = useState(false);
  const [scrollStart, setScrollStart] = useState(true);
  //* Date & Timeline States
  const [selectedDurationBtn, setSelectedDurationBtn] = useState(duration[1]);
  const [selectedDate, setSelectedDate] = useState(
    isRescheduleRequest
      ? moment(dateReschedule, 'DD, MMM YYYY')
      : moment().toDate(),
  );
  const [timeValue, setTimeValue] = useState('');
  const [passedDateToAnotherScrn, setPassedDate] = useState(
    isRescheduleRequest
      ? moment(dateReschedule, 'DD, MMM YYYY')
      : moment().toDate(),
  );

  //? Others
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);
  const timelineListRef = useRef(null); //* ref for the auto scroll of FlatList
  const scrollX = useRef(new Animated.Value(0)).current; //* Track the value of X-axis scroll
  const snapPointsRecurring = useMemo(() => ['50%'], []);
  const btmRefRecurring = useRef(null);
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);
  const upperFrameRef = useRef(null);

  //? Effects
  //* API Effects
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
  //* Calling the "getBookingsApi" or "Date Picker" on "Meeting Room" Button Press
  useEffect(() => {
    if (meetingRooms.length > 0) {
      if (selectedMode == 'date') {
        getBookingsApi(
          meetingRooms[selectedRoomIndex].Id,
          moment(selectedDate).format('YYYY-MM-DD'),
        );
      }
    }
  }, [selectedRoomIndex, selectedDate]);

  //* Timeline & Others Effects
  //* useEffect to set the initial date and time
  useEffect(() => {
    if (!isRescheduleRequest) {
      const currentTime = moment();
      const timeRange = getDefaultTimeRange(currentTime, selectedDurationBtn);
      //* Update the time value state with the formatted time range
      setTimeValue(timeRange);
    } else {
      const timeRange = getDefaultTimeRange(
        selectedDate,
        moment.duration(rescheduleDuration, 'hours').asMinutes(),
      );
      console.warn(timeRange, selectedDate, moment().toDate(), moment.duration(rescheduleDuration, 'hours').asMinutes())
      //* Update the time value state with the formatted time range
      setTimeValue(timeRange);
    }
  }, []);

  //* Update the the time tab according to the duration
  useEffect(() => {
    const timeRange = getDefaultTimeRange(selectedDate, selectedDurationBtn);
    //* Update the time value state with the formatted time range
    setTimeValue(timeRange);
  }, [selectedDurationBtn]);

  //* Event listener for selected recurring if selected set to "yes" else "no
  useEffect(() => {
    if (selectedRecurringDay === null) {
      setRepeatBooking('no');
    } else {
      setRepeatBooking('yes');
    }
  }, [selectedRecurringDay]);

  useEffect(() => {
    if (isRescheduleRequest) {
      setRepeatBooking(rescheduleRepeatBooking.toLowerCase());
    }
  }, []);

  //? Actions
  //* Get Meeting Rooms API
  const getMeetingRoomsApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const {statusCode, meetingRooms: data} = await dispatch(
        GetMeetingRoom(),
      ).unwrap();
      if (statusCode === 200) {
        setMeetingRooms(data);
        if (isRescheduleRequest) {
          const index = data.findIndex(
            (item, index) => item.Id === meetingRoomOne.Id,
          );
          setSelectedRoomIndex(index);
        }
        // console.log('Room Data API;---------------', data);
        getBookingsApi(data[0].Id, moment(selectedDate).format('YYYY-MM-DD'));
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
    } else {
      console.error('Please Pass a Valid Data!');
    }
  };
  //* Time & Calender Picker Handler
  const onChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowPicker(false);
    const [startTimeIn24HourFormat, endTimeIn24HourFormat] =
      getTimeRangeIn24HourFormat(currentDate, selectedDurationBtn);
    //* AnimateTo Selected Index In Timeline
    animateToSelectedIndexInTimeline(
      [startTimeIn24HourFormat, endTimeIn24HourFormat],
      currentDate,
    );
  };
  //* Auto Scroll to selected Duration (in Timeline)
  const animateToSelectedIndexInTimeline = (passedIndexes, currentDate) => {
    if (
      passedIndexes &&
      Array.isArray(passedIndexes) &&
      passedIndexes.length === 2
    ) {
      const [startTimeNumber, endTimeNumber] = passedIndexes;
      // Find the index of the selected time slot based on the new "time range"
      const startIndex = bookings.findIndex(
        item => item.timeNumber == startTimeNumber,
      );
      const endIndex = bookings.findIndex(
        item => item.timeNumber == endTimeNumber,
      );

      // Calculate the center index
      const centerIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

      //* Scroll to the center index smoothly
      if (centerIndex !== -1) {
        //* Set states
        setSelectedDate(currentDate);
        const timeRange = getDefaultTimeRange(currentDate, selectedDurationBtn);
        setTimeValue(timeRange);
        setPassedDate(moment(new Date(currentDate), 'DD-MM-YYYY').format('LL'));
        //* Animate to the matched index
        timelineListRef.current.scrollToIndex({
          animated: true,
          index: centerIndex,
          viewPosition: 0.5, //* Center the selected time slot
        });
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            'The selected time range is not available!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        } else {
          Toast.show('The selected time range is not available!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
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
      }
    } else {
      console.error('Please provide a valid dataset!');
    }
  };
  //* Move the timeline upper frame logic
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // console.log('onMoveShouldSetPanResponder - dx:', gestureState.dx);

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
            // console.log("ScrollStart 'if' newScrollX > leftLimit", leftLimit);
            scrollX.setValue(leftLimit);
          } else {
            // console.log(
            //   "ScrollStart 'else' newScrollX > leftLimit: ",
            //   newScrollX,
            // );
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

  //? Others
  //* Bottom Sheet Components
  const renderItemRecurring = ({item, index}, selectRecurringMatch) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedRecurringDay(
          item.recurringDay !== selectRecurringMatch ? item.recurringDay : null,
        );
        setPassedRecurringDay(recurring[index]);
      }}
      style={[
        styles.recurringDaysContainer,
        {borderWidth: selectRecurringMatch === item.recurringDay ? 1 : 0},
      ]}>
      <Txt style={styles.recurringText}>{item.recurringDay}</Txt>
      {selectRecurringMatch === item.recurringDay && (
        <View style={styles.checkedContainer}>
          <MaterialCommunityIcons
            name="check"
            size={20}
            color={AppTheme.COLORS.white}
          />
        </View>
      )}
    </TouchableOpacity>
  );
  const btmRecurringContent = (
    <View style={styles.bottomSheetContainer}>
      <Txt style={styles.BottomSheetTitle}>{Strings.repeatMeeting}</Txt>
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        data={recurring}
        renderItem={item => {
          return <>{renderItemRecurring(item, selectedRecurringDay)}</>;
        }}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.bottomSheetBtnContainer}>
        <Botton
          loading={false}
          title="Confirm"
          disabled={false}
          accessibilityLabel="confirmRecurring"
          onPress={() => {
            // Use the selectedRecurringDay as needed
            btmRefRecurring.current?.closeBottomSheet();
          }}
        />
      </View>
    </View>
  );

  //! Test
  // Function to calculate the current index based on the position of the UpperFrame
  const calculateCurrentIndex = nativeEvent => {
    const offsetX = nativeEvent.contentOffset.x;
    const itemHeight = 58.66666793823242; // Replace with your actual item height
    const index = Math.floor(offsetX / itemHeight);

    console.log('Scroll Offset:', offsetX);
    console.log('Item Index:', index);
    console.log('nativeEvent:', nativeEvent.contentOffset);
  };
  //! Test end

  return (
    <Frame
      showBottomSheet
      snapPoints={snapPointsRecurring}
      bottomSheetContent={btmRecurringContent}
      ref={btmRefRecurring}
      screenTitle={'Scheduled Meeting Room'}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <ScheduleBtn
            onCalenderPress={() => {
              setSelectedMode('date');
              setShowPicker(true);
            }}
            error={false}
            onTimePress={() => {
              setSelectedMode('time');
              setShowPicker(true);
            }}
            dateValue={moment(selectedDate).format('D MMM, YYYY')}
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
          {/* if "Day Pass" don't show repeat booking */}
          {!dayPass ? (
            <RepeatBookingBtn
              onNo={() => {
                setRepeatBooking('no');
                setSelectedRecurringDay(null);
                setPassedRecurringDay(null);
              }}
              onYes={() => {
                btmRefRecurring.current?.expandBottomSheet();
              }}
              selected={repeatBooking}
              bottomContent={selectedRecurringDay}
            />
          ) : null}
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
            <>
              {meetingRooms.length > 0 && !isLoadingTimeLine ? (
                <View style={styles.timeLineContainer}>
                  <Animated.View
                    ref={upperFrameRef}
                    // onLayout={event => {
                    //   calculateCurrentIndex(null, event.nativeEvent);
                    // }}
                    // pointerEvents="box-none"
                    // hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
                    style={[
                      styles.timelineUpperFrame,
                      {
                        width: calculateWidth(
                          duration[selectedDurationBtnIndex],
                          duration,
                        ),
                        // borderRadius: 100 / 2,
                        borderRadius:
                          duration[selectedDurationBtnIndex] == 30
                            ? 16
                            : 100 / 2,
                        borderColor: isDarkMode
                          ? AppTheme.COLORS.white
                          : AppTheme.COLORS.black,
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
                    onEndReached={() => {
                      setScrollStart(false);
                      setScrollEnd(true);
                    }}
                    onScroll={({nativeEvent}) => {
                      // const upperViewEvent = upperFrameRef.current;
                      // calculateCurrentIndex(nativeEvent);
                      if (nativeEvent.contentOffset.x === 0) {
                        setScrollEnd(false);
                        setScrollStart(true);
                        console.log('At Start');
                      } else {
                        setScrollEnd(false);
                        setScrollStart(false);
                      }
                    }}
                  />
                </View>
              ) : (
                <View style={styles.timelineSkeletonContainer}>
                  <SkeletonLoader
                    key={getRandomInt(100, 300)}
                    visible={false}
                    shimmerStyle={[styles.timelineSkeleton]}
                  />
                </View>
              )}
            </>
          )}
          <GuideLog />
        </View>
        <Botton
          title={'Proceed'}
          singleButtonStyle={styles.mainBtn}
          disabled={
            bookings.length === 0 ||
            meetingRooms.length === 0 ||
            isLoadingTimeLine ||
            isLoading
          }
          onPress={() => {
            if (meetingRooms.length > 0) {
              navigation.navigate(ScreensName.invitationScreen, {
                isoStartTime: moment(passedDateToAnotherScrn)
                  .set(
                    'hour',
                    moment(
                      `${timeValue.split(' ')[0]} ${timeValue.split(' ')[3]}`,
                      'h:mm A',
                    ).hours(),
                  )
                  .set(
                    'minute',
                    moment(
                      `${timeValue.split(' ')[0]} ${timeValue.split(' ')[3]}`,
                      'h:mm A',
                    ).minutes(),
                  )
                  .seconds(0)
                  .milliseconds(0)
                  .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                isoEndTime: moment(passedDateToAnotherScrn)
                  .set(
                    'hour',
                    moment(
                      `${timeValue.split(' ')[2]} ${timeValue.split(' ')[3]}`,
                      'h:mm A',
                    ).hours(),
                  )
                  .set(
                    'minute',
                    moment(
                      `${timeValue.split(' ')[2]} ${timeValue.split(' ')[3]}`,
                      'h:mm A',
                    ).minutes(),
                  )
                  .seconds(0)
                  .milliseconds(0)
                  .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                duration: selectedDurationBtn,
                start_end_time: timeValue,
                repeatBooking: Boolean(repeatBooking === 'yes' ? true : false),
                recurringDaysData: passedRecurringDay,
                currentMeetingRoom: meetingRooms[selectedRoomIndex].Id,
                currentMeetingName: meetingRooms[selectedRoomIndex].Title,
                Description: meetingRooms[selectedRoomIndex].Description,
                allocation: meetingRooms[selectedRoomIndex].Allocation,
                selectedDate: passedDateToAnotherScrn,
                participant: false,
                rescheduleTeamMembers,
                isRescheduleRequest,
                idReschedule,
                dayPass,
              });
            }
          }}
        />
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
          // minimumDate={new Date()} //* Set minimum date to today's date
          maximumDate={moment().add(1, 'year').toDate()}
          onChange={onChange}
          minuteInterval={30}
        />
      )}
    </Frame>
  );
}
