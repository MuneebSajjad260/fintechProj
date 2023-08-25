

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
    idReschedule,
    isRescheduleRequest,
    rescheduleRepeatBooking,
    rescheduleRecurringDay,
    participant,
    rescheduleTeamMembers
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
            // ref={flatListRef}
            renderItem={Item}
            disabled={true}
            itemStatus={data.map(item => item.status)}
            startTime={showTime}
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
