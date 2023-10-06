import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {selectLoginUserId} from '../../shared/redux/slices/isadminSlice';
import {GetCustomerMeetingRooms} from '../../shared/redux/action/GetCustomerMeetingRooms';
import {useIsFocused} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import 'intl';
import 'intl/locale-data/jsonp/en';


import { AppTheme } from '../../shared/theme';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import styles from './ScheduledMeetingScreen.style';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import MeetingSummaryCard from '../../shared/components/MeetingSummaryCard/MeetingSummaryCard';
import CalendarPicker from 'react-native-calendar-picker';
import FilterIcon from '../../assets/images/FilterIcon.svg';
import ChevronDownArrow from '../../assets/images/ChevronDownArrow.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScheduleFilter } from '../../shared/redux/action/ScheduleFilter';
import { selectUserData } from '../../shared/redux/slices/isadminSlice';
import PastNothingSchedule from '../../assets/images/PastNothingSchedule.js';
//* Bottom Sheet
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView
} from '@gorhom/bottom-sheet';



const ScheduledMeetingScreen = ({route}) => {
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {past} =route.params;
  const coworkerId = useSelector(selectLoginUserId);
  const GetCustomerMeetingRoomsLoading = useSelector(
    state => state?.scheduleFilter?.loading,
  );
  const [selectedItemFromFilter, setSelectedItemFromFilter] = useState(past ? {title:'All' , enum:'all'} : {title:'Today' , enum:'today'});
  const [visible, setVisible] = useState(false);
  const [meetingDropDown, setMeetingDropDown] = useState({title:'My Meetings' , enum:'my'});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const userData=useSelector(selectUserData);
 
  const filterCreditData = [
    {key: 0,title:'Today' , enum:'today'},
    {key: 1,title:'All' ,enum:'all'},
    {key: 2,title:'This Week', enum:'this_week'},
    {key: 3,title:'Last Week' , enum:'last_week'},
    {key: 4,title:'This Month', enum:'this_month'},
    {key: 5,title:'Last Month', enum:'last_month'},
    {key: 6,title:'Custom' , enum:'custom'},
  ];

  const meetingsDropDownData = [
    {
      key: 0,
      title: 'All',
      note:userData?.IsTeamAdministrator === true ? 'Meetings, Team Meetings and Invites' : 'Meetings and Invites' ,
      enum:'all'
    },
    {
      key: 1,
      title: 'My Meetings',
      note: 'Meetings made by you.',
      enum:'my'
    },
    {
      key: 2,
      title: 'Team members',
      note: 'Meetings made by you and your team.',
      enum:'team'
    },
    {
      key: 3,
      title: 'Invites',
      note: 'Meetings in which you are invited.',
      enum:'visitor'
    },
  ];
  // *Bottom Sheet (Meetings)
  const bottomSheetRefMeetingDrop = useRef(null);
  const snapPointsMeetingDrop = useMemo(() => ['40%'], []);
  // *Bottom Sheet (Filter)
  const bottomSheetRefSendInvitation = useRef(null);
  const snapPointsSendInvitation = useMemo(() => ['78%'], []);
  //* Back Drop
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

 


  // eslint-disable-next-line no-unused-vars
  const [customerMeetingRooms,setCustomerMeetingRooms] = useState([]);

  //FILTERS FOR MEETING ROOM
  useEffect(() => {
   

    if (selectedItemFromFilter.enum !== 'custom' || (selectedItemFromFilter.enum === 'custom' && startDate && endDate)) {
      let body;
      if (meetingDropDown.enum === 'all' || meetingDropDown.enum === 'team') {
        body = `${userData?.Id}?bookingType=${meetingDropDown.enum}&teamId=${userData?.TeamIds}&dateFilter=${selectedItemFromFilter.enum}`;
      } else {
        body = `${userData?.Id}?bookingType=${meetingDropDown.enum}&dateFilter=${selectedItemFromFilter.enum}`;
      }
  
      if (selectedItemFromFilter.enum === 'custom' && startDate && endDate) {
        if (meetingDropDown.enum === 'all' || meetingDropDown.enum === 'team') {
          body = `${userData?.Id}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&bookingType=${meetingDropDown.enum}&teamId=${userData?.TeamIds}&dateFilter=${selectedItemFromFilter.enum}`;
        }
        else{
          body = `${userData?.Id}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&bookingType=${meetingDropDown.enum}&dateFilter=${selectedItemFromFilter.enum}`;
        }}
  
      console.log('body---', body);
      dispatch(ScheduleFilter(body))
        .unwrap()
        .then(result => {
          console.log('result of customer meeting rooms schedule----', result);
          setCustomerMeetingRooms(result);
          bottomSheetRefSendInvitation.current?.close();
          bottomSheetRefMeetingDrop?.current?.close();
        })
        .catch(error => {
          console.log('error of customer meeting room ---', error);
        });
    }}, [
    dispatch,
    isFocused,
    meetingDropDown.enum,
    userData?.Id,
    userData?.TeamIds,
    endDate,
    selectedItemFromFilter.enum 
    
  ]);

  //TIME CALCULATION
  const TimeCalculate = date => {
    const d = new Date(date);
   
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
     // timeZone: 'UTC',
    };
    const timeFormatter = new Intl.DateTimeFormat(undefined, options);

    // Format the Date object to the desired time format
    const formattedTime = timeFormatter.format(d);

    // console.log('formattedTime----', formattedTime);
    return formattedTime;
  };

  //DATE CALCULATION
  const dateCalculate = date => {
    // console.log('date calculated---22222---', date);
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
    // console.log('startTime---1', startTime), console.log('endTime----', endTime);
    const start = moment(startTime);
    const end = moment(endTime);

    // console.log('startTime---', start), console.log('endTime----', end);
    const duration = moment.duration(end.diff(start));
    // console.log('duration---', duration);
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
  
  const TextExtractor = description => {
    const match = description.match(/<span[^>]*>([^<]*)<\/span>/);
    const text = match && match[1];
    return text;
  };

  const renderMeetingRoomCard = ({item}) => {
    // console.log('testing item---',item);
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("let's go to all meeting screen");
          navigation.navigate(ScreensName.rescheduleMeeting, {
            meetingScedule: item,
            startTime: TimeCalculate(item?.FromTime),
            endTime: TimeCalculate(item?.ToTime),
            date: dateCalculate(item?.FromTime),
            durationTime: calculateDuration(item?.FromTime, item?.ToTime),
          });
        }}
        style={styles.card}>
       
        < MeetingSummaryCard item={item}
          allocation={item?.Allocation}
          startTime={TimeCalculate(item?.FromTime)}
          endTime={TimeCalculate(item?.ToTime)}  
          date={dateCalculate(item?.FromTime)}
          durationTime={calculateDuration(item?.FromTime,item?.ToTime)}
          desc={TextExtractor(item?.Description ? item?.Description : '' )}
          id={item?.ResourceId}
          status={item?.status}
          label={true}
         
        />
       
      </TouchableOpacity>
    );
  };

  // *Calender Logic
  const handleHideModal = () => {
    setVisible(false);
    // setSelectedDates({});
  };
  const showDatePicker = () => {
    setVisible(!visible);
  };
    //selecting date on modal 
  const handleConfirm = (date,type) => {
 
    const newDate = new Date(date);
    if (type === 'END_DATE') {
      if (newDate < startDate) {
        setEndDate(null);
      } else {
        newDate.setUTCHours(23, 59, 59, 999);
        setEndDate(newDate);
      }
    } else {
      if (newDate.toISOString() === (startDate && endDate.toISOString())) {
        setEndDate(null);
      } else {
        newDate.setUTCHours(0, 0, 0, 0);
        setStartDate(newDate);
        setEndDate(null);
      }
    }

    //handleHideModal ();
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.nothinschedule} >
      
        <PastNothingSchedule
          stroke={isDarkMode ? AppTheme.COLORS.white : null}
        />
            
      </View>
    );
  };

  return (
    <Frame
      mode ='View'>
    
     
      {/* Header */}
      <View style={styles.historyHeader}>
        <Pressable
          onPress={()=>{ 
            if (!GetCustomerMeetingRoomsLoading) {
              bottomSheetRefMeetingDrop.current?.snapToIndex(0);
            }
          }}
          style={styles.meetingDropDownContainer}>
          <Txt style={styles.history}>{meetingDropDown.title}</Txt>
          <View style={styles.chevronDownContainer}>
            <ChevronDownArrow height={10} width={10} />
          </View>
        </Pressable>
        {/* Date Picker */}
        <Pressable
          onPress={()=>{
            if (!GetCustomerMeetingRoomsLoading) {
              bottomSheetRefSendInvitation.current?.snapToIndex(0);
            }
          }}
          style={styles.datePickerContainer}>
          <Txt style={styles.datePickerBtnTitle}>
            {(startDate && endDate &&  selectedItemFromFilter.title ==='Custom')
              ?`${moment.utc(startDate).format('MMM DD')} - ${moment.utc(endDate).format('MMM DD')}`
              : selectedItemFromFilter.title  }
          </Txt>
          <View style={styles.filterIconContainer}>
            <FilterIcon />
          </View>
        </Pressable>
      </View>
       
      {/* Body */}
      <View style={{flex: 1}}>
        <View>
          <ShimmerPlaceHolder
            visible={GetCustomerMeetingRoomsLoading === false}
            shimmerStyle={[
              styles.resourceType,
              {width: '90%', borderRadius: normalize(10)},
            ]}></ShimmerPlaceHolder>
          <ShimmerPlaceHolder
            visible={GetCustomerMeetingRoomsLoading === false}
            shimmerStyle={[
              styles.resourceType,
              {width: '90%', borderRadius: normalize(10)},
            ]}></ShimmerPlaceHolder>
          <ShimmerPlaceHolder
            visible={GetCustomerMeetingRoomsLoading === false}
            shimmerStyle={[
              styles.resourceType,
              {width: '90%', borderRadius: normalize(10)},
            ]}></ShimmerPlaceHolder>
          {/* <ShimmerPlaceHolder
            visible={GetCustomerMeetingRoomsLoading === false}
            shimmerStyle={[
              styles.resourceType,
              {width: '90%', borderRadius: normalize(10)},
            ]}></ShimmerPlaceHolder> */}
        </View>
        {GetCustomerMeetingRoomsLoading === false ? 
          <FlatList
            data={customerMeetingRooms?.data}
            renderItem={renderMeetingRoomCard}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
          />
          : null}
      </View>
    

      {/* Calender Modal */}
      <Modal visible={visible} animationType="fade"
        animationIn="pulse"
        animationOut="fadeOut"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={handleHideModal}>
          <View style={styles.overlay}>
            <View style={[styles.modal,{backgroundColor:isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : '#FFFFFF'}]}>
              <CalendarPicker
                width={350}
                allowRangeSelection={true}
                onDateChange={handleConfirm}
                monthTitleStyle={[styles.calendarMonth,{color: isDarkMode ? AppTheme.COLORS.orange : AppTheme.COLORS.purple}]}
                yearTitleStyle={[styles.calendarYear ,{color: isDarkMode ? AppTheme.COLORS.orange : AppTheme.COLORS.purple}]}
                todayBackgroundColor="#D8DEFF"
                selectedDayColor="#D8DEFF"
                textStyle={[styles.calendarText ,{  color: isDarkMode ? AppTheme.COLORS.white  : AppTheme.COLORS.black}]}
                previousTitle={
                  <MaterialIcons name={'keyboard-arrow-left'} size={24} 
                    color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}/>
                }
                nextTitle={
                  <MaterialIcons name={'keyboard-arrow-right'} size={24} 
                    color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}/>
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bottom sheet (Meetings) */}
      <BottomSheet
        ref={bottomSheetRefMeetingDrop}
        snapPoints={snapPointsMeetingDrop}
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
        <BottomSheetView style={styles.btmContainerMeeting}>
          <BottomSheetFlatList
            showsVerticalScrollIndicator={false}
            data={meetingsDropDownData}
            keyExtractor={i => i.key}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetRefMeetingDrop?.current?.close();
                    setMeetingDropDown({title:item.title,enum:item.enum});
                    console.log('item,title-',item.title,'--',item.enum);
                  
                  }}
                  style={styles.meetingOptionContainer}>
                  <Txt
                    style={[
                      meetingDropDown.title === item.title
                        ? styles.meetingDropTitleActive
                        : styles.meetingDropTitle,
                    ]}>
                    {item.title}
                  </Txt>
                  <Txt style={styles.meetingDropNote}>{item.note}</Txt>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.devider} />}
          />
        </BottomSheetView>
      </BottomSheet>
      {/* Bottom sheet (Filter) */}
      <BottomSheet
        ref={bottomSheetRefSendInvitation}
        snapPoints={snapPointsSendInvitation}
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
        <BottomSheetView style={styles.btmContainer}>
          <Txt style={styles.btmHeading}>Filter</Txt>
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.btmListItemContainer}>
            {filterCreditData.map(item => {
              return (
                <Pressable
                  accessibilityLabel="sendInvitation"
                  key={item.key}
                  style={[
                    styles.btmListItem,
                    selectedItemFromFilter.title === item.title
                      ? [{backgroundColor: isDarkMode ? AppTheme.COLORS.btnActiveDarkMode : '#0129FA40'}]
                      : styles.btmListItemColorTwo,
                  ]}
                  onPress={() => {
                    bottomSheetRefSendInvitation.current?.close();
                    setSelectedItemFromFilter({title:item.title , enum: item.enum});
                    if (item.title=== 'Custom') {
                      setStartDate(null);
                      setEndDate(null);
                      setVisible(true);
                      // showDatePicker();
                    }
                 
                  }}>
                  <Txt
                    style={[
                      styles.btmListItemText,
                      selectedItemFromFilter.title === item.title
                        ? styles.btmListItemTextColorOne
                        : styles.btmListItemTextColorTwo,
                    ]}>
                    {item.title}
                  </Txt>
                </Pressable>
              );
            })}
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheet>
    </Frame>
  );
};

export default ScheduledMeetingScreen;
