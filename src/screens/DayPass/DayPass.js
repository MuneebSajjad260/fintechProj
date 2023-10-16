import React, {useState,useEffect} from 'react';
import { SafeAreaView, Text, View,TouchableOpacity,Pressable,StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import { Svg } from 'react-native-svg';
import moment from 'moment';
import { useSelector,useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';

import { BookedSlots } from '../../shared/redux/action/BookedSlots';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { selectdayPassProductData } from '../../shared/redux/slices/dayPassProductData';
import { DayPassAvailibilty } from '../../shared/redux/action/DayPassAvailibility';
import { GetProfile } from '../../shared/redux/action/GetProfile';
import styles from './DayPass.style';
import { AppTheme } from '../../shared/theme';
import DayPassCard from '../../shared/components/DayPassCard/DayPassCard';
import DateIcon from '../../assets/images/dateIcon.svg';
import DateLightIcon from '../../assets/images/calendarLight.svg';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import { DayPassPrice } from '../../shared/redux/action/DayPassPrice';
import { selectUserData } from '../../shared/redux/slices/isadminSlice';

const DayPass =({navigation,route})=> {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const dispatch =useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const {dateReschedule , idReschedule , isRescheduleRequest , resourceId}=route.params;
  const formattedDateReschedule= moment(dateReschedule ,'DD, MMM YYYY').add(1,'days').format('DD/MM/YYYY');
  console.log('formatted--dateReschedule---22--',formattedDateReschedule , '---' ,idReschedule , '---' , isRescheduleRequest  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dayPassAvailable,setDayPassAvailable]=useState();
  const [checkSlots, setCheckSlots]=useState();
  const BookedSlotsLoading=useSelector(state=>state?.bookedSlots?.loading);

  const isFocused = useIsFocused();

  const loginData = useSelector((state) => state.auth?.data);
  const token = loginData?.access_token;

  const formattedDat= moment(new Date(),'DD-MM-YYYY').add(1,'days').format('DD/MM/YYYY');
  const [selectedDate, setSelectedDate] = useState( dateReschedule ? formattedDateReschedule : formattedDat);

  const [day,month,year]= selectedDate.split('/'); 
  const fromDate=new Date(Date.UTC(year , month -1 , day , 8, 0, 0));
  const toDate=new Date(Date.UTC(year , month -1 , day , 22, 0, 0));
  const sDateIso=fromDate.toISOString();
  const TDateIso=toDate.toISOString();

  const fromDateIso = moment(sDateIso).subtract(
      moment().utcOffset(),
      "minutes"
    );

    const  ToDateIso = moment( TDateIso).subtract(
      moment().utcOffset(),
      "minutes"
    );


  console.log(" fromDateIso--",  fromDateIso , '--' ,ToDateIso )
  const apiDate=moment(selectedDate , 'DD/MM/YYYY').format('YYYY-MM-DD');

  const availibilityPending = useSelector((state)=>state.dayPassAvailibilty?.loading);

  //getting profile data from api
  // const getProfile = useSelector(state => state?.getProfile?.data);
  // const profile = getProfile?.find(item => { return item; });
  const profile = useSelector(selectUserData);
  console.log('id---',profile?.Id);



  //const {ResourceId,dayPassProducts}=route.params
  const dayPassProducts =useSelector(selectdayPassProductData);
  const minDate = new Date(); // Today
  let tomorrow  = moment(minDate).add(1,'days');
  console.log('11-',tomorrow);
  // const maxDate = new Date(2023, 6, 3);
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //selecting date on modal 
  const handleConfirm = (date) => {
    console.log('A date has been picked: ', date);
    const formattedDate= moment(date,'DD-MM-YYYY').format('DD/MM/YYYY');
    console.log('A formattedDate has been picked: ', formattedDate);
    setSelectedDate(formattedDate);

    hideDatePicker();
  };


  const onSubmit =(data)=>{
    console.log('price data ----',data);
    dispatch(DayPassPrice(data)).unwrap ().then (result=>{
      if(isRescheduleRequest === true ){
        navigation.navigate(ScreensName.dayPassSummary,{
          selectedDate:selectedDate,
          userName:profile?.UserFullName,
          TypeName: 'booking',
          CoworkerId:profile?.Id,
          FromTime:fromDateIso,
          ToTime:ToDateIso,
          isRescheduleRequest : isRescheduleRequest,
          rescheduleId:idReschedule

        });
      }
      else{
        navigation.navigate(ScreensName.dayPassSummary,{
          selectedDate:selectedDate,
          userName:profile?.UserFullName,
          TypeName: 'booking',
          CoworkerId:profile?.Id,
          FromTime:fromDateIso,
          ToTime:ToDateIso,
          // dayPass:dayPass

        });
      }
    }).catch(error=>{console.log('error',error);});
    console.log('data',data);
  };


  // useEffect(() => {
  //   dispatch(GetProfile(token));
  // }, [dispatch,token]);

  //GETTING DAY PASS AVAILIBILITY RESPONSE FROM API
  useEffect(()=>{
    dispatch(DayPassAvailibilty(apiDate)).unwrap().then(result=>{
      console.log('availibility DAYPASS result--- ',result);
      setDayPassAvailable(result?.available);
    }).catch(error=>{
      console.log('availibility day pass---',error);
    });

  },[dispatch,apiDate,isFocused]);

  //check booked slots//////

  useEffect(()=>{
    dispatch(BookedSlots()).unwrap().then(result=>{
      console.log('check booked slots result-',result?.data);

      const utcDates = result?.data.map(slot => new Date(slot.date).toISOString());
      console.log('utcDates-',utcDates);
      setCheckSlots(utcDates);
     
     
    }).catch(error=>{
      console.log('check booked slots error-',error);
    });

  },[dispatch]);

  /////////
 
  return (
 
    <Frame>
      <View style={styles.innerContainer}>
        <Txt style={styles.checkAvailibilityTxt}>Check Availibility</Txt>
        <Txt style={[styles.selectDateText,
          {color : isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Select Date</Txt>

        <ShimmerPlaceHolder
          visible={BookedSlotsLoading === false}
          shimmerStyle={styles.dateContainerShimmer}>
        </ShimmerPlaceHolder>
        { BookedSlotsLoading === false ?
          <TouchableOpacity
            accessibilityLabel='selectDateView'
            onPress={() => {
              showDatePicker();
            }}>
        
            <View style={[styles.inputView,{backgroundColor:isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : AppTheme.COLORS.secondaryGreyLightBg}]}>
              <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
                <View>
                  <Svg width={'100%'} >
                    {isDarkMode ? 
                      <DateLightIcon/>
                      :
                      <DateIcon />
                    }
                  </Svg>
                </View>
                <Txt style={styles.placeHolder}>{selectedDate ? selectedDate : 'dd / mm / yyyy'}</Txt>
              </View>
            </View>
          </TouchableOpacity>
          :
          null
        }
        <View style={styles.dayPassCardContainer}>
          <View style={styles.allignInrow}>
            <Txt style={styles.dayPassTxt}>Day passes</Txt>
            {console.log('sssss--',dayPassAvailable)}
            <View>

            </View>

            <ShimmerPlaceHolder
              visible={availibilityPending === false && availibilityPending === false}
              shimmerStyle={styles.shimmerAvail}>
            </ShimmerPlaceHolder>
            {availibilityPending === false && availibilityPending === false ?
              dayPassAvailable  ?

  
                <View style={[styles.availableContainer,{ 
                  borderColor : isDarkMode ? 'rgba(48, 185, 145, 1)' : null ,
                  borderWidth : isDarkMode ? 1 : 0}]}>
                  <Txt   accessibilityLabel='availableStatus' style={styles.available}>Available</Txt>
                </View>
       
                :
         
                <View style={[styles.unAvailableContainer,{ 
                  borderColor : isDarkMode ? 'rgba(239, 64, 80, 1)' : null ,
                  borderWidth : isDarkMode ? 1 : 0}]}>
                  <Txt  accessibilityLabel='unavailableStatus' style={styles.unAvailable}>Unavailable</Txt>
                </View>
              :
              null
            }
          </View>

          {/* DAY PASS CARD */}
          <Pressable
            accessibilityLabel='dayPasscard'
            onPress={()=>{
              if(selectedDate && dayPassAvailable){

                
                onSubmit({TypeName: 'booking',ResourceId:isRescheduleRequest === true ? resourceId : dayPassProducts?.Id,
                  CoworkerId:profile?.Id,FromTime:fromDateIso,
                  ToTime:ToDateIso,CoworkerName:profile?.FullName
              
                });
              }
              else{
                null;
              }
            }}>
            < DayPassCard  item={{Title:'Day Pass',Id:isRescheduleRequest === true ? resourceId : dayPassProducts?.Id}} />
          </Pressable>
        </View>
      </View>

      {/* DATE PICKER MODAL */}
      <Modal
        isVisible={isDatePickerVisible}
        animationIn="pulse"
        animationOut="fadeOut"
        // transparent={true}
      >
        <View
          style={styles.modalContainer}>
          <Pressable
            onPress={() => { hideDatePicker(); }}>
            <View style={[styles.CalendarPickerContainer,{backgroundColor:isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : '#FFFFFF'}]}>
              <CalendarPicker
                onDateChange={handleConfirm}
                width={350}
                 minDate={tomorrow }
                disabledDates={checkSlots}
                monthTitleStyle={[styles.calendarMonth,{color: isDarkMode ? AppTheme.COLORS.orange : AppTheme.COLORS.purple}]}
                yearTitleStyle={[styles.calendarYear ,{color: isDarkMode ? AppTheme.COLORS.orange : AppTheme.COLORS.purple}]}
                todayBackgroundColor="#D8DEFF"
                selectedDayColor="#D8DEFF"
                textStyle={[styles.calendarText ,{  color: isDarkMode ? AppTheme.COLORS.white  : AppTheme.COLORS.black}]}
                previousTitle={
                  <MaterialIcons
                    name={'keyboard-arrow-left'}
                    size={24}
                    color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}
                  />
                }
                nextTitle={
                  <MaterialIcons
                    name={'keyboard-arrow-right'}
                    size={24}
                    color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black} />
                }

              />
            </View>
          </Pressable>
        </View>
      </Modal>
    </Frame>
   
  );
  
};

export default DayPass;
