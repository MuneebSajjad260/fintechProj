import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import normalize from 'react-native-normalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { AppTheme } from '../../shared/theme';
import Botton from '../../shared/components/core/Botton';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { CancelDayPass } from '../../shared/redux/action/CancelDayPass';
import { selectLoginUserId } from '../../shared/redux/slices/isadminSlice';
import { PrimaryButton, SecondaryButton } from '../../shared/components';
import styles from './ReSheduleDayPassScreen.style';
import Strings from '../../shared/constants/Strings';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import ReScheduleDayPassCard from '../../shared/components/ReScheduleDayPassCard/ReSheduleDayPassCard';
import PaymentCard from '../../shared/components/PaymentCard/PaymentCard';
import { DayPassPrice } from '../../shared/redux/action/DayPassPrice';
import { selectLoginUserName } from '../../shared/redux/slices/isadminSlice';

const ReScheduleDayPassScreen = ({ route }) => {
  const dispatch =useDispatch();
  const navigation = useNavigation();

  const tax = useSelector(state=> state?.tax?.data)
  console.log("tax---",tax,'-',tax?.setting?.isTaxEnable)

  const coworkerName=useSelector(selectLoginUserName);
  const [price, setPrice] = useState();
  const [checkDate,setCheckDate]=useState(false);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const { meetingScedule ,startTime,endTime,date,durationTime, CoworkerInvoiceNumber} = route.params;
  const DayPassPriceLoading = useSelector(state=>state?.dayPassPrice?.loading);
  console.log('meeting schedule---',meetingScedule, ' invoice no ---',CoworkerInvoiceNumber);
  const now = new Date();

  const [bottomSheet, setBottomSheet] = useState({bsReschedule:false,bsCancel:false,bsisCanceled:false});

  const selectedDate= moment(date ,'DD, MMM YYYY').format('DD/MM/YYYY');
  const [day,month,year]= selectedDate.split('/'); 
  const fromDate=new Date(Date.UTC(year , month -1 , day , 8, 0, 0));
  const toDate=new Date(Date.UTC(year , month -1 , day , 22, 0, 0));
  const fromDateIso=fromDate.toISOString();
  const toDateIso=toDate.toISOString();
  const loginId=useSelector(selectLoginUserId);
  const CancelMeetingRoomLoading=useSelector(state=>state?.cancelDayPass?.loading);
  console.log('dates--11--',date,'---',fromDate);
  console.log('datessss---',fromDateIso,'---',toDateIso,'----',loginId);
  
  // const otherInvitee = useSelector(selectOtherInviteeMeetingRoom);

  const bottomSheetRefReschedule = useRef(null);

  const snapPointsReschedule = useMemo(() => ['22%'], []);


  const bottomSheetRefCancel = useRef(null);
  const bottomSheetRefCanceledMeeting = useRef(null);
  
  const snapPointsCancel = useMemo(() => ['22%'], []);
  const snapPointsCanceledMeeting = useMemo(() => ['26%'], []);

  const renderBackdropBottomSheet = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        BackdropPressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  // eslint-disable-next-line no-unused-vars
  const [meetingRoomCard, setMeetingRoomCard] = useState([{
    id: meetingScedule.ResourceId, officeNo: meetingScedule.ResourceName,
    noOfPersons: meetingScedule?.BookingVisitors?.length +1, desc: meetingScedule.desc,
    today: date, hours: `${startTime} - ${endTime}`,
    duration: 'Duration', durationTime: durationTime,
    bookedOn: 'Booked on', date: moment(meetingScedule?.BookedOn).format('Do MMMM, YYYY'),
    bookedBy: 'Booked by', teamLead: meetingScedule?.CoworkerName,
    status:meetingScedule?.status,Description:meetingScedule?.Description
  },
  ]);
  console.log('dayte---',date);

  //COMPARING DATES TO SHOW RESHEDULE AND CANCEL BOOKING BTN 
  const compareDates = ()=> {
    const specifiedDate = moment(date, 'DD, MMM YYYY');
    const currentDate = moment();
    console.log('currentDate---', currentDate);
    if (currentDate.isSame(specifiedDate)) {
      setCheckDate(false);
    } else if (currentDate.isAfter(specifiedDate)) {
      setCheckDate(false);
    } else if (currentDate.isBefore(specifiedDate)) {
      setCheckDate(true);
    }
  };
  useEffect(()=>{
    compareDates();
  },[]);
  //////////////////////


  console.log('meetingScedule---',meetingScedule);

  useEffect(()=>{
    dispatch(DayPassPrice({TypeName: 'booking',ResourceId:meetingScedule.ResourceId,
      CoworkerId:loginId,FromTime:fromDateIso,
      ToTime:toDateIso,
      CoworkerName:coworkerName

    }))
      .unwrap()
      .then(result=>{
        setPrice(result?.Price);
      });
  },[dispatch]);

  //CANCEL dayPass
  const onSubmitCancel=()=>{

    console.log('meetingScedule?.id--',meetingScedule?.id);
    dispatch(CancelDayPass(meetingScedule?.id)).unwrap().then(result=>{
      console.log('result of cancel meeting room---',result);
      if(result?.statusCode == 200){
        setBottomSheet({ bsReschedule: false, bsCancel: false, bsisCanceled: true });
        bottomSheetRefCancel.current?.closeBottomSheet();
        navigation.navigate(ScreensName.dayPassHomeScreen);
        // bottomSheetRefCanceledMeeting.current?.expandBottomSheet();
      }
      // eslint-disable-next-line no-empty
      else{
        
      }
    }).catch(error=>{
      console.log('error cancel meeting room ---',error);
    });
    // bottomSheetRefCancel.current?.closeBottomSheet();
  };

  ////////////////// for reshedule meeting bottom sheet
  
  const bottomSheetContentReschedule = (
    <View
      style={styles.bottomSheetContainer}>
   
      <Txt style={styles.bottomSheetHeading}>{Strings.wantRescheduleMeeting}</Txt>
      <View style={styles.bottomSheetBtnContainer}>
   
        {/* <View style={styles.noBtn}> */}
        <Botton
          continueBtnAccessibilityLabel='rescheduleYes'
          cancelBtnAccessibilityLabel='rescheduleNo'
          variant={'v2'}
          loading={false}
          continueTitle={'Yes'}
          cancelTitle={'No'}
          disabled={false}
          button1Style={styles.btn1}
            
          onCancel={() => {
            console.log('i AM No BTN');
            bottomSheetRefReschedule.current?.closeBottomSheet();
          }}
          onContinue={() => {
                  
            navigation.navigate(ScreensName.dayPass,{dateReschedule:date , idReschedule:meetingScedule.id , isRescheduleRequest:true,resourceId:meetingScedule.ResourceId});
            bottomSheetRefReschedule.current?.closeBottomSheet();
          }}
        />
          
      </View>
    </View>
  );
    ///////////////

  //////////For Cancel meeting room/////////

  const bottomSheetContentCancel = (
    <View
      style={styles.bottomSheetContainer}>
      <Txt style={styles.bottomSheetHeading}>Do you want to cancel this daypass</Txt>
      <View style={styles.bottomSheetBtnContainer}>

        {/* <View style={styles.noBtn}> */}
        <Botton
          continueBtnAccessibilityLabel='cancelYes'
          cancelBtnAccessibilityLabel='cancelNo'
          variant={'v2'}
          loading={CancelMeetingRoomLoading  ? true : false}
          continueTitle={'Yes'}
          cancelTitle={'No'}
          disabled={false}
          button1Style={styles.btn1}
          onCancel={() => {
            console.log('i AM No BTN');
            bottomSheetRefCancel.current?.closeBottomSheet();
         
          }}
          onContinue={() => {
            console.log('cancel meeting');
            onSubmitCancel();
           
          }}
        />
       
      </View>
    </View>
  );

  ////////////////////

  /////WHEN meeting gets cancelled

  const bottomSheetMeetingCanceled = (

    <View
      style={styles.bottomSheetContainer}>
      <Txt style={styles.bottomSheetHeading}>Daypass Cancelled</Txt>
      <Txt style={styles.bottomSheetSubHeading}>Your daypass has been canceled successfully.</Txt>
     

      <View style={styles.backToHomeScreen}>
        <Botton
          accessibilityLabel='homeScreen'
          // variant={'v1'}
          loading={false}
          title={'Back to home screen'}
          disabled={false}
          onPress={() => {
            console.log("Let's go to home screen");
            
          }}
        />
       
      </View>
    </View>
  );

  ////////////////////////////


  useEffect(() => {
    if (bottomSheet.bsReschedule) {
      console.log('bsReshedule is true');
      bottomSheetRefReschedule.current?.expandBottomSheet();
    } else if (bottomSheet.bsCancel) {
      console.log('bsCancel is true');
      bottomSheetRefCancel.current?.expandBottomSheet();
    } else if (bottomSheet.bsisCanceled) {
      console.log('bsisCanceled is true');
      bottomSheetRefCanceledMeeting.current?.expandBottomSheet();
    }
  }, [bottomSheet]); // dependency array

  return (

    <Frame
    
      showBottomSheet={true}
      snapPoints={bottomSheet.bsReschedule === true ? snapPointsReschedule : bottomSheet.bsCancel ? snapPointsCancel : snapPointsCanceledMeeting}
      bottomSheetContent={ bottomSheet.bsReschedule === true ? bottomSheetContentReschedule : bottomSheet.bsCancel ? bottomSheetContentCancel : bottomSheetMeetingCanceled}
      ref={  bottomSheet.bsReschedule === true ? bottomSheetRefReschedule : bottomSheet.bsCancel ?  bottomSheetRefCancel : bottomSheetRefCanceledMeeting}
    >
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {/* <View style={styles.mainContainer} > */}
        <View>
          {
            meetingRoomCard.map(item => (

              // eslint-disable-next-line react/jsx-key
              < ReScheduleDayPassCard item={item} />

            ))
          }
          <View style={styles.paymentCard}>
            <PaymentCard price ={price} date={date} tax={tax} resourceName={meetingScedule?.ResourceName} loading={DayPassPriceLoading}
              CoworkerInvoiceNumber={CoworkerInvoiceNumber} status={meetingScedule?.paymentStatus}
              reason={meetingScedule?.PaymentsObjections[0]?.reason}
            />
          </View>

        </View>
        { checkDate && (meetingScedule?.status !='cancelled' &&  meetingScedule?.status !='deny' )  ?
          <View style={styles.btnContainer}>


            <Botton
              continueBtnAccessibilityLabel='reschedule'
              cancelBtnAccessibilityLabel='cancel'
              loading={false}
              variant='v1'
              continueTitle='Reschedule'
              disabled={false}
        
           
              onContinue={() => {

                if(meetingScedule?.paymentStatus == 'objected')
                {
                  navigation.navigate(ScreensName?.dayPassPayment,{dueDate:moment(now).format('Do MMMM, YYYY'),
                  // price:convertTimeToDecimal(FromTime,ToTime) * payment?.Price,
                  price: meetingScedule?.Price,
                  id:meetingScedule?.id,
                  invoiceNo:meetingScedule?.InvoiceNo, paymentStatus:meetingScedule?.paymentStatus,dayPass:false ,tentative:meetingScedule?.Tentative,
                  dayPassSubmit:false,
                  resheduleData:{
                    BookingVisitors: meetingScedule?.BookingVisitors , CoworkerId: meetingScedule?.CoworkerId,
                    FromTime: meetingScedule?.FromTime, ToTime:  meetingScedule?.ToTime ,
                    ResourceId:meetingScedule?.ResourceId , isRepeatBooking:meetingScedule?.isRepeatBooking,
                    isTeamBooking:meetingScedule?.isTeamBooking, CoworkerName:meetingScedule?.CoworkerName,ResourceName:meetingScedule?.ResourceName,
                    Team:meetingScedule?.Team,BookedOn:meetingScedule?.BookedOn,Tentative:meetingScedule?.Tentative,Price: meetingScedule?.Price,
                    isRescheduleRequest:meetingScedule?.isRescheduleRequest ,rescheduleId:meetingScedule?.rescheduleId
                  }
                });

                }

                else{
                console.log("let's ReSchedule meeting");
                setBottomSheet({  bsReschedule: true, bsCancel: false, bsisCanceled: false });
                bottomSheetRefReschedule.current?.expandBottomSheet();
                }
              }}
              onCancel={() => {
                console.log('im cancel btn');
                setBottomSheet({  bsReschedule: false, bsCancel: true, bsisCanceled: false });
                bottomSheetRefCancel.current?.expandBottomSheet();
              }}
            />
          </View>
          :
          null
        }

      </ScrollView>

     

    </Frame>
  );
};

export default ReScheduleDayPassScreen;
