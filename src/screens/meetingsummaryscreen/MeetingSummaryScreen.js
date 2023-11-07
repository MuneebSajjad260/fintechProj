import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Divider } from 'react-native-paper';
import normalize from 'react-native-normalize';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { Svg } from 'react-native-svg';

import Txt from '../../shared/components/core/Txt';
import { setMeetingRoomid } from '../../shared/redux/slices/bookingResourceSlice';
import { selectUserData } from '../../shared/redux/slices/isadminSlice';
import { MeetingRoomReschedule } from '../../shared/redux/action/MeetingRoomReschedule';
import { ParticipantReschedule } from '../../shared/redux/action/ParticipantReschedule';
import { DayPassPrice } from '../../shared/redux/action/DayPassPrice';
import { BookingSetting } from '../../shared/redux/action/BookingSetting';
import { GetProfile } from '../../shared/redux/action/GetProfile';
import { selectLoginUserName } from '../../shared/redux/slices/isadminSlice';
import { MeetingRoomRequest } from '../../shared/redux/action/MeetingRoomRequest';
import { MeetingRoomPrice } from '../../shared/redux/action/MeetingRoomPrice';
// import { PendingStatus } from '../../shared/redux/action/PendingStatus';
import {selectLoginUserId,selectTeamName } from '../../shared/redux/slices/isadminSlice';
import { AppTheme } from '../../shared/theme';
import { PrimaryButton } from '../../shared/components';
import styles from './MeetingSummaryScreen.Style';
import MeetingSummaryCard from '../../shared/components/MeetingSummaryCard/MeetingSummaryCard';
import InvitesSummaryCard from '../../shared/components/InvitesSummaryCard/InvitesSummaryCard';
import { ScreensName } from '../../shared/constants/ScreensStrings.js';
import { selectTeamMembersMeetingRoom, selectOtherInviteeMeetingRoom } from '../../shared/redux/slices/memberSelectionSlice';
import Strings from '../../shared/constants/Strings';
import Error from '../../assets/images/errorApi.svg';
import Frame from '../../shared/components/core/Frame';
import Botton from '../../shared/components/core/Botton';


const MeetingSummaryScreen = ({route}) => {

  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const navigation = useNavigation();
  const dispatch =useDispatch();
 
  const isDarkMode = useSelector(state=>state?.mode?.colorScheme);

  const tax = useSelector(state=> state?.tax?.data)
  console.log("tax---",tax,'-',tax?.setting?.isTaxEnable)

  const userData=useSelector(selectUserData);
  console.log('userdata---',userData?.TeamIds);
  const loginUserName=useSelector(selectLoginUserName);
  const teamName=useSelector(selectTeamName);
  console.log('teamName 11-----',teamName);
  console.log('login username----',loginUserName);
  const[tentative,setTentative]=useState();
  const[payment , setPayment]=useState();

  const priceLoading = useSelector((state) => state.meetingRoomPrice?.loading);
  const DayPassPriceLoading = useSelector((state) => state.dayPassPrice?.loading);
  const meetingReqLoading = useSelector((state) => state?.meetingRoomRequest?.loading);
  const meetingRescheduleLoading = useSelector((state) => state?.meetingRoomReschedule?.loading);
  const ParticipantRescheduleLoading = useSelector((state) => state?.participantReschedule?.loading);
  MeetingRoomRequest;
  const [coWorkerId,setCoWorkerId]=useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  console.log('coWorkerId---',coWorkerId);
  const { FromTime, ToTime,repeatBooking, currentMeetingRoom, isoStartTime , isoEndTime,recurringDaysData, currentMeetingName, dayPass, selectedDate, allocation,idReschedule,isRescheduleRequest , back , id,participant, Description} = route.params;
  console.log('idReschedule,isRescheduleRequest---',idReschedule,'---',isRescheduleRequest);
  console.log('recurringDaysData---',recurringDaysData,repeatBooking);
  console.log(' currentMeetingName---', currentMeetingName,'participant--',participant);
  const selectedMembers=useSelector(selectTeamMembersMeetingRoom);
  const selectedInviteeData=useSelector(selectOtherInviteeMeetingRoom);
  const LoginUserId=useSelector(selectLoginUserId);

  console.log('--selectedInviteeData--',selectedInviteeData);
  console.log('selectedMembers----',selectedMembers);
  const loginData = useSelector((state) => state.auth?.data);
  const token = loginData?.access_token;
  // console.log('token-----', token);

  const now = new Date();
  console.log('now----',now.toISOString());
  console.log('1122---',moment(now).format('Do MMMM, YYYY'));
  // const enddate = new Date(`${startDate} 23:59 UTC`).toISOString();
  const isoDateString = new Date(now.toDateString() + ' ' + FromTime).toISOString();
  console.log('isoDateString--',isoDateString); // 

  console.log('LoginUserId---',LoginUserId);
  console.log('data- from book meeting room screen -----',FromTime,'-',ToTime,'-',repeatBooking,'-', currentMeetingRoom,'-',LoginUserId,' selected date----------', selectedDate,'---------',selectedMembers.concat(selectedInviteeData));

  console.log('daypass---',dayPass,'---',isoStartTime,'---',isoEndTime);


  //CALCULATING DIFFERENCE BETWEEN START AND  END TIME (DURATION)
  const calculateDuration=(startTime, endTime)=> {
    const start = moment(startTime, 'hh:mm A');
    const end = moment(endTime, 'hh:mm A');
    const duration = moment.duration(end.diff(start));

    const hours = duration.hours();
    const minutes = duration.minutes();
    if (hours<1){
      return `${minutes}m`;
    }
    else if (minutes<1){
      return `${hours}h`;
    }
    else{
      return `${hours}h ${minutes}m`;
    }
  };

  //CONVERTING TIME TO DECIMAL TO CALCULATE SUBTOTAL
  const convertTimeToDecimal = (start,end)=>{
    const start1 = moment(start, 'hh:mm A');
    const end1 = moment(end, 'hh:mm A');
    const duration = end1.diff(start1 , 'minutes');
    console.log('required time---',(duration / 60).toFixed(2));
    return (duration / 60).toFixed(2);
  };

  const meetingRoomCard = {
    id: 1, ResourceName: currentMeetingName,
    BookingVisitors: (selectedMembers.concat(selectedInviteeData)), desc: 'A room has a big table in the middle with Smart TV',
    today: 'Today', date: `${FromTime} - ${ToTime}`,
    duration: 'Duration', durationTime: calculateDuration(FromTime,ToTime)
  };
  const inviteesCard = {
    id: 1, invitees: 'Invitees',
    teamMembers: selectedMembers.concat(selectedInviteeData), otherInvitee: selectedInviteeData
  };

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // posting plan request api on submit request button
  const onSubmit = (data) => {

    console.log('testing data-----', data);
    dispatch(MeetingRoomRequest(data)).unwrap().then(result=>{
      dispatch(setMeetingRoomid(result?.data?.id));
      if(result?.statusCode === 200){
        console.log('result--',result);
        if(userData?.TeamIds){
          navigation.navigate(ScreensName.bookingConfirmed,{dayPass:false});
        }
        else{
          if(dayPass && priceDayPass == 0 )
          { navigation.navigate(ScreensName.bookingConfirmed,{dayPass:true});}
          else{

            if(repeatBooking === false  || !recurringDaysData){
              navigation.navigate(ScreensName?.dayPassPayment,{dueDate:moment(now).format('Do MMMM, YYYY'),
                // price:convertTimeToDecimal(FromTime,ToTime) * payment?.Price,
                price:data?.Price,
                id:result?.data?.id,
                invoiceNo:result?.data?.InvoiceNo, paymentStatus:result?.data?.paymentStatus,dayPass:false ,tentative:data.Tentative,
                dayPassSubmit:false,
                resheduleData:{
                  BookingVisitors: selectedMembers.concat(selectedInviteeData) , CoworkerId:LoginUserId,
                  FromTime: isoStartTime, ToTime: isoEndTime ,
                  ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
                  isTeamBooking:true, CoworkerName:loginUserName,ResourceName:currentMeetingName,
                  Team:teamName ? teamName : '',BookedOn:now.toISOString(),Tentative:tentative,Price: dayPass ? priceDayPass : convertTimeToDecimal(FromTime,ToTime) * payment?.Price,
                  isRescheduleRequest:isRescheduleRequest ,rescheduleId:idReschedule
                }
              });
            }
        
            else{

              navigation.navigate(ScreensName?.dayPassPayment,{dueDate:moment(now).format('Do MMMM, YYYY'),
              // price:convertTimeToDecimal(FromTime,ToTime) * payment?.Price,
                price:data?.Price,
                id:result?.data?.id,
                invoiceNo:result?.data?.InvoiceNo, paymentStatus:result?.data?.paymentStatus,dayPass:false ,tentative:data.Tentative,
                dayPassSubmit:false,
                resheduleData:{
                  BookingVisitors: selectedMembers.concat(selectedInviteeData)  , CoworkerId:LoginUserId,
                  FromTime: isoStartTime, ToTime: isoEndTime ,
                  ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
                  isTeamBooking:true , RepeatEvery: recurringDaysData.id === 2 ? 2 : 1,
                  Repeats: recurringDaysData.id === 0 ? '1' : recurringDaysData.id === 3 ? '3' : '2',
                  contractId:Number(coWorkerId),
                  CoworkerName:loginUserName,ResourceName:currentMeetingName,Team:teamName ? teamName : '',BookedOn:now.toISOString(),
                  Tentative:tentative,Price: dayPass ? priceDayPass : convertTimeToDecimal(FromTime,ToTime) * payment?.Price,
                  isRescheduleRequest:isRescheduleRequest ,rescheduleId:idReschedule
                }
              });
            }
          }
        }
      }
      else{
        console.log('testing data-----', data);
        console.log('result reject --',result);
        showDatePicker();
      }
    }).catch(err=>{
      console.log('err---',err);
    });
   

  };

  // reschedule meeting room request
  const  onSubmitReschedule =(data)=>{
    console.log('testing data-----', data);
    let bookingData;
    if((repeatBooking === false  || !recurringDaysData)){
      bookingData = {BookingVisitors: selectedMembers.concat(selectedInviteeData) , CoworkerId:LoginUserId,
        FromTime: isoStartTime, ToTime: isoEndTime ,
        ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
        isTeamBooking:true, CoworkerName:loginUserName,ResourceName:currentMeetingName,
        Team:teamName ? teamName : '',BookedOn:now.toISOString(),Tentative:tentative,
        Price: dayPass ? priceDayPass : convertTimeToDecimal(FromTime,ToTime) * payment?.Price};
    }
    else{
      bookingData={BookingVisitors: selectedMembers.concat(selectedInviteeData)  , CoworkerId:LoginUserId,
        FromTime: isoStartTime, ToTime: isoEndTime ,
        ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
        isTeamBooking:true , RepeatEvery: recurringDaysData.id === 2 ? 2 : 1,
        Repeats: recurringDaysData.id === 0 ? '1' : recurringDaysData.id === 3 ? '3' : '2',
        contractId:Number(coWorkerId),
        CoworkerName:loginUserName,ResourceName:currentMeetingName,Team:teamName ? teamName : '',BookedOn:now.toISOString(),
        Tentative:tentative,
        Price: dayPass ? priceDayPass : convertTimeToDecimal(FromTime,ToTime) * payment?.Price};
    }
    console.log('bookindata---',bookingData);
    dispatch(MeetingRoomRequest(bookingData)).unwrap().then(result=>{
      console.log('result for booking in reshedule---',result);
      if(result?.statusCode === 200){
        dispatch(MeetingRoomReschedule(data)).unwrap().then(result=>{
          dispatch(setMeetingRoomid(result?.data?.id));
      
          console.log('result--',result);
       
          navigation.navigate(ScreensName.bookingConfirmed ,{dayPass:false});
        
      
      
        }).catch(err=>{
          console.log('reshedule is failed ---',err);
          showDatePicker();
        });
      }
      else{
        console.log('testing data-----', data);
        console.log('result--',result);
        showDatePicker();
  
      }
    }).catch(err=>{
      console.log('booking is failed for reshedule--',err);
      showDatePicker();
    });

  };


  // reschedule meeting room request WHEN only participants are changed
  const  participantReschedule =(data)=>{
    console.log('participant reshedule data ---',data);
    dispatch(ParticipantReschedule(data)).unwrap().then(result=>{
      dispatch(setMeetingRoomid(result?.data?.id));
      if(result?.statusCode === 200){
        console.log('result participant reshedule--',result);
       
        navigation.navigate(ScreensName.bookingConfirmed ,{dayPass:false});
      }
      else{
        console.log('400 result--',result);
        showDatePicker();
      }
    
    }).catch(err=>{
      console.log('reshedule is failed ---',err);
      showDatePicker();
    });
     
  };

  useEffect(()=>{
    dispatch(MeetingRoomPrice(currentMeetingRoom)).unwrap().then(result=>{
      console.log('result---',result.resource);
      setPayment(result ? result.resource : {} );
    }).catch(error=>{
      console.log('error meeting room price payment--',error);
    });
  },[dispatch,currentMeetingRoom]);

  useEffect(()=>{
    dispatch(GetProfile(token)).unwrap()
    .then(result=>{
      const sortProfile= result.filter(item=> item?.CoworkerType === 1);
      console.log('test api -',sortProfile);
      console.log('getProfileResult Id----', result);
      const timestampString = sortProfile[0]?.CoworkerContractIds;
      const timestampsArray = timestampString.split(',');
      const firstTimestamp = timestampsArray[0];
      console.log('firstTimestamp----',firstTimestamp);
      setCoWorkerId(sortProfile ? firstTimestamp : 0 );
    })
    .catch((err)=>{
      console.log("GetProfile :",err)
    })
  },[dispatch,token]);

  useEffect(()=>{
    dispatch(BookingSetting()).unwrap().then(result=>{
      console.log('booking setting result ----',result?.setting);
      setTentative( dayPass ? result?.setting?.passUserMeetingRoomConfirmation  : result?.setting?.memberMeetingRoomConfirmation);
    }).catch(err=>{
      console.log('error booking setting ----',err);
    });
  },[dispatch]);

  //DATE CALCULATION
  const dateCalculate=(date)=>{
    console.log('date calculated---22222---',date);
    const newdate= new Date();
    console.log('newdata---',newdate);
    const formattednewDate = moment(newdate,'DD/MM/YYYY').format('DD, MMM YYYY');
    console.log('11--',formattednewDate);
    // Convert the month abbreviation to title case
    const formattednewMonth = formattednewDate.split(' ')[1].toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    const formattednewDateString = formattednewDate.replace(formattednewDate.split(' ')[1], formattednewMonth);
    console.log('00000-----date---',formattednewDateString);


    const formattedDate = moment(date,'LL').format('DD, MMM YYYY');
    console.log('2222-',formattedDate);
    // Convert the month abbreviation to title case
    const formattedMonth = formattedDate.split(' ')[1].toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    const formattedDateString = formattedDate.replace(formattedDate.split(' ')[1], formattedMonth);
    console.log('2222-',formattedDate);
    console.log('333333-',formattedDateString);
    if (formattednewDateString === formattedDateString )
    { return 'Today';}
    else{
      return formattedDateString;
    }
  };
  const [priceDayPass,setPriceDayPass] = useState();
  const [vatDaypass,setVatDaypass] = useState();
  const [discount,setDiscount] = useState();
  const [discountCode,setDiscountCode] = useState();
  const [totalPrice , setTotalPrice] = useState()
  //DAYPASS PRICING API
  useEffect(()=>{
    
    dispatch(DayPassPrice({
      TypeName: 'booking',
      ResourceId: currentMeetingRoom,
      CoworkerId: LoginUserId,
      FromTime: isoStartTime,
      ToTime: isoEndTime,
      CoworkerName:loginUserName}
    )).unwrap().then(result=>{
      console.log('data price--- daypass',result);
      setPriceDayPass(result?.Price?.EstimatedCost);
      setVatDaypass(result?.Price?.vat)
      setDiscount(result?.Price?.DiscountAmount)
      setDiscountCode(result?.Price?.DiscountCode)
      setTotalPrice (result?.Price?.EstimatedCost + result?.Price?.DiscountAmount )
    }).catch(err=>{
      console.log('error price--daypass',err);
    });
    
    
  },[dayPass === true]);

  const TextExtractor = description => {
    const match = description.match(/<span[^>]*>([^<]*)<\/span>/);
    const text = match && match[1];
    // console.log('text---', text);
    return text;
  };
  return (

    <Frame>
  
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={styles.officeCard}>

            < MeetingSummaryCard item={meetingRoomCard} 
              startTime={FromTime}
              endTime={ToTime}
              durationTime={ calculateDuration(FromTime,ToTime)}
              date={dateCalculate(selectedDate)}
              id={currentMeetingRoom}
              allocation={ allocation}
              desc={TextExtractor(Description ? Description : '' )}
              label={false}
            />

          </View>

          <View style={styles.officeCard}>

            < InvitesSummaryCard item={inviteesCard}  disable={true}/>

          </View>

          <View style={styles.subContainer}>
            <Txt style={styles.maintitle}>{Strings.payment}</Txt>
            <View style={[styles.paymentContainer, { marginTop: normalize(8) ,  backgroundColor: isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : 'rgba(0, 0, 0, 0.04)'}]}>
              <View style={[styles.flexDirectionRow,
                {
                  justifyContent: 'space-between',

                }]}>
                <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' :  'rgba(0, 0, 0, 0.5)'}]}>{Strings.meetingRoomPerHour}</Txt>
                 {/* MEETING ROOM PER HOUR */}
                {dayPass ?
    
                  <View>
                    <ShimmerPlaceHolder
                      visible={DayPassPriceLoading === false }
                      shimmerStyle={styles.shimmerPlanFee}>
                    </ShimmerPlaceHolder>

                    <Txt accessibilityLabel='dayPassPrice' style={styles.paymentContainerValues}>{DayPassPriceLoading === false ? `SAR ${totalPrice}` : null}</Txt>
                  </View>
                  :
                  <View>
                    <ShimmerPlaceHolder
                      visible={priceLoading === false }
                      shimmerStyle={styles.shimmerPlanFee}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='meetingroomprice' style={styles.paymentContainerValues}>{priceLoading === false ? `SAR ${totalPrice}` : null}</Txt>
                  </View>
                }
              </View>

{/* NO OF HOURS SECTION */}
              <View style={[styles.flexDirectionRow,
                {
                  justifyContent: 'space-between',
                  marginTop: normalize(8)

                }]}>
                <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' :  'rgba(0, 0, 0, 0.5)'}]}>{Strings.noOfHour}</Txt>

                
                {dayPass ?
                  <View>
                    <ShimmerPlaceHolder
                      visible={DayPassPriceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(164),}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='daypasshours' style={styles.paymentContainerValues}>{DayPassPriceLoading === false ?  calculateDuration(FromTime,ToTime) : null}</Txt> 
                  </View>
                  :
                  <View>
                    <ShimmerPlaceHolder
                      visible={priceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(164),}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='meetingroomhours' style={styles.paymentContainerValues}>{priceLoading === false ?  calculateDuration(FromTime,ToTime) : null}</Txt> 
                  </View>
                }
               
              </View>
              <Divider style={[styles.innerDivider, { marginLeft: normalize(0), marginRight: normalize(0) }]} />

              {/* SUBTOTAL SECTION */}
              <View style={[styles.flexDirectionRow,
                {
                  justifyContent: 'space-between'

                }]}>
                <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' :  'rgba(0, 0, 0, 0.5)'}]}>{Strings.subTotal}</Txt>
                
                {dayPass ?
                  <View>
                    <ShimmerPlaceHolder
                      visible={DayPassPriceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(200),width:'18%'}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='daypassSubtotal' style={styles.paymentContainerValues}>{ DayPassPriceLoading === false ?  totalPrice : null}</Txt>
                  </View>
                  :
                  <View>
                    <ShimmerPlaceHolder
                      visible={priceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(200),width:'18%'}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='meetingroomSubtotal' style={styles.paymentContainerValues}>{ priceLoading === false ? totalPrice : null}</Txt>
                  </View>
                }
               
              </View>

              {/* VAT SECTION */}
              <View style={[styles.flexDirectionRow,
                {
                  justifyContent: 'space-between'

                }]}>
                <Txt style={[styles.paymentContainerHeadings,{marginTop:AppTheme.SPACINGS.MARGINS.M6,color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' :  'rgba(0, 0, 0, 0.5)'}]}>VAT {tax?.setting?.taxRate}%</Txt>
                
                {dayPass ?
                  <View>
                    <ShimmerPlaceHolder
                      visible={DayPassPriceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(200),width:'18%'}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='daypassSubtotal' style={[styles.paymentContainerValues,{marginTop:AppTheme.SPACINGS.MARGINS.M6}]}>{ DayPassPriceLoading === false ? 
                     tax?.setting?.isTaxEnable   ? ((tax?.setting?.taxRate / 100) * totalPrice).toFixed(2) : 0 
                     
                     : null}</Txt>
                  </View>
                  :
                  <View>
                    <ShimmerPlaceHolder
                      visible={priceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(200),width:'18%'}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='meetingroomSubtotal' style={[styles.paymentContainerValues,{marginTop:AppTheme.SPACINGS.MARGINS.M6}]}>{ priceLoading === false ?  
                    tax?.setting?.isTaxEnable   ? ((tax?.setting?.taxRate / 100) *  totalPrice).toFixed(2) : 0 
                    : null}</Txt>
                  </View>
                }
               
              </View>

              {/* DISCOUNT SECTION */}
              <View style={[styles.flexDirectionRow,
                {
                  justifyContent: 'space-between'

                }]}>
                <Txt style={[styles.paymentContainerHeadings,{marginTop:AppTheme.SPACINGS.MARGINS.M6,color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' :  'rgba(0, 0, 0, 0.5)'}]}>{discountCode ? `Discount(${discountCode})` : `Discount(-)`}</Txt>
                
                {dayPass ?
                  <View>
                    <ShimmerPlaceHolder
                      visible={DayPassPriceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(125),width:'22%'}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='daypassSubtotal' style={[styles.paymentContainerValues,{marginTop:AppTheme.SPACINGS.MARGINS.M6}]}>{ DayPassPriceLoading === false ? 
                  discount ?  discount : '-' 
                     
                     : null}</Txt>
                  </View>
                  :
                  <View>
                    <ShimmerPlaceHolder
                      visible={priceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(125),width:'18%'}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='meetingroomSubtotal' style={[styles.paymentContainerValues,{marginTop:AppTheme.SPACINGS.MARGINS.M6}]}>{ priceLoading === false ?  
                  discount ?  discount  : '-'
                    : null}</Txt>
                  </View>
                }
               
              </View>


              

              {/* TOTAL PAYABLE SECTION */}
              <Divider style={[styles.innerDivider, { marginLeft: normalize(0), marginRight: normalize(0) }]} />

              <View style={[styles.flexDirectionRow,
                {
                  justifyContent: 'space-between',

                }]}>
                <Txt style={styles.totalPayableText}>{Strings.totalPayable}</Txt>

              
                {dayPass ? 

                  <View>
                    <ShimmerPlaceHolder
                      visible={DayPassPriceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(170),}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='daypassTotal' style={[styles.totalPayableValue,{color:isDarkMode ? AppTheme.COLORS.text : AppTheme.COLORS.purple}]}>{DayPassPriceLoading === false ?
                      ((totalPrice + ((tax?.setting?.taxRate / 100) * totalPrice))) < discount  ? `SAR 0.0` :
                      tax?.setting?.isTaxEnable  ? `SAR ${((totalPrice + ((tax?.setting?.taxRate / 100) * totalPrice))- discount).toFixed(2) }`
                      : `SAR ${totalPrice - discount}`
                     : null}</Txt>
                  </View>
                  :
                  <View>
                    <ShimmerPlaceHolder
                      visible={priceLoading === false }
                      shimmerStyle={[styles.shimmerPlanFee,{ marginLeft: normalize(170),}]}>
                    </ShimmerPlaceHolder>
                    <Txt accessibilityLabel='meetingRoomTotal' style={[styles.totalPayableValue,{color:isDarkMode ? AppTheme.COLORS.text : AppTheme.COLORS.purple}]}>{priceLoading === false ?
                     ((totalPrice + ((tax?.setting?.taxRate / 100) * totalPrice))) < discount  ? `SAR 0.0` :
                     tax?.setting?.isTaxEnable  ? `SAR ${(((totalPrice) + ((tax?.setting?.taxRate / 100) * totalPrice)) - discount).toFixed(2) }` : `SAR ${priceDayPass - discount}` : null}</Txt>
                  </View>
                }
              </View>

            </View>
          </View>
        </View>
        <View>
          <Botton
            loading={ (meetingReqLoading || meetingRescheduleLoading || ParticipantRescheduleLoading )  ? true :false}
            accessibilityLabel='bookBtn'
            title={'Book'}
            disabled={ priceLoading === false ? false : true}
            singleButtonStyle={styles.btnStyle}

            onPress={() => {
              if(isRescheduleRequest === true && dayPass != true){
                console.log('1 condition');
                if(participant === true){

                  if(repeatBooking === false  || !recurringDaysData){
                    participantReschedule({
                      BookingVisitors: selectedMembers.concat(selectedInviteeData) , CoworkerId:LoginUserId,
                      FromTime: isoStartTime, ToTime: isoEndTime ,
                      ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
                      isTeamBooking:true, CoworkerName:loginUserName,ResourceName:currentMeetingName,
                      Team:teamName ? teamName : '',BookedOn:now.toISOString(),Tentative:tentative,Price: dayPass ? priceDayPass : priceDayPass,
                      isRescheduleRequest:isRescheduleRequest ,rescheduleId:idReschedule
                    });
                  }
                  else{
                    participantReschedule({
                      BookingVisitors: selectedMembers.concat(selectedInviteeData)  , CoworkerId:LoginUserId,
                      FromTime: isoStartTime, ToTime: isoEndTime ,
                      ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
                      isTeamBooking:true , RepeatEvery: recurringDaysData.id === 2 ? 2 : 1,
                      Repeats: recurringDaysData.id === 0 ? '1' : recurringDaysData.id === 3 ? '3' : '2',
                      contractId:Number(coWorkerId),
                      CoworkerName:loginUserName,ResourceName:currentMeetingName,Team:teamName ? teamName : '',BookedOn:now.toISOString(),
                      Tentative:tentative,Price: dayPass ? priceDayPass : priceDayPass,
                      isRescheduleRequest:isRescheduleRequest ,rescheduleId:idReschedule
       
  
  
                    });
      
                  }

                }
                else{
                  if(repeatBooking === false  || !recurringDaysData){
                    onSubmitReschedule({
                      BookingVisitors: selectedMembers.concat(selectedInviteeData) , CoworkerId:LoginUserId,
                      FromTime: isoStartTime, ToTime: isoEndTime ,
                      ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
                      isTeamBooking:true, CoworkerName:loginUserName,ResourceName:currentMeetingName,
                      Team:teamName ? teamName : '',BookedOn:now.toISOString(),Tentative:tentative,Price: dayPass ? priceDayPass : priceDayPass,
                      isRescheduleRequest:isRescheduleRequest ,rescheduleId:idReschedule
                    });
                  }
                  else{
                    onSubmitReschedule({
                      BookingVisitors: selectedMembers.concat(selectedInviteeData)  , CoworkerId:LoginUserId,
                      FromTime: isoStartTime, ToTime: isoEndTime ,
                      ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
                      isTeamBooking:true , RepeatEvery: recurringDaysData.id === 2 ? 2 : 1,
                      Repeats: recurringDaysData.id === 0 ? '1' : recurringDaysData.id === 3 ? '3' : '2',
                      contractId:Number(coWorkerId),
                      CoworkerName:loginUserName,ResourceName:currentMeetingName,Team:teamName ? teamName : '',BookedOn:now.toISOString(),
                      Tentative:tentative,Price: dayPass ? priceDayPass : priceDayPass,
                      isRescheduleRequest:isRescheduleRequest ,rescheduleId:idReschedule
     


                    });
    
                  }
                }
              }
              else{
                console.log('2 condition');
                if(repeatBooking === false  || !recurringDaysData){
                  onSubmit({
                    BookingVisitors: selectedMembers.concat(selectedInviteeData) , CoworkerId:LoginUserId,
                    FromTime: isoStartTime, ToTime: isoEndTime ,
                    ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
                    isTeamBooking:true, CoworkerName:loginUserName,ResourceName:currentMeetingName,
                    Team:teamName ? teamName : '',BookedOn:now.toISOString(),Tentative:tentative,Price: dayPass ? priceDayPass : priceDayPass

                  });
                }
                else{
                  onSubmit({
                    BookingVisitors: selectedMembers.concat(selectedInviteeData)  , CoworkerId:LoginUserId,
                    FromTime: isoStartTime, ToTime: isoEndTime ,
                    ResourceId:currentMeetingRoom , isRepeatBooking:repeatBooking,
                    isTeamBooking:true , RepeatEvery: recurringDaysData.id === 2 ? 2 : 1,
                    Repeats: recurringDaysData.id === 0 ? '1' : recurringDaysData.id === 3 ? '3' : '2',
                    contractId:Number(coWorkerId),
                    CoworkerName:loginUserName,ResourceName:currentMeetingName,Team:teamName ? teamName : '',BookedOn:now.toISOString(),
                    Tentative:tentative,Price: dayPass ? priceDayPass : priceDayPass
                   

  
                  });
                  
                }
              }
            }}
          />
        </View>
      </ScrollView>
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
            <View style={styles.mainModalContainer}>
              <View style={styles.innerModal}>
                <View>
                  <Svg width={'100%'}>
                    <Error/>
                  </Svg>
                </View>
                <Txt style={styles.header}>Failed to book meeting room</Txt>
                <Txt style={styles.desc}>This booking cannot be created at this time, please try again later</Txt>

              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
     

    

    </Frame>

  );

};

export default MeetingSummaryScreen;
