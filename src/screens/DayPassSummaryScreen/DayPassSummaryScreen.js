import React, {  useLayoutEffect, useRef,useState, useMemo,useEffect} from 'react';
import { View,Pressable } from 'react-native';
import { Svg } from 'react-native-svg';
import moment from 'moment';
import { Divider } from 'react-native-paper';
import { useSelector,useDispatch } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';
import Modal from 'react-native-modal';

import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { setDayPassId } from '../../shared/redux/slices/bookingResourceSlice';
import { DayPassReschedule } from '../../shared/redux/action/DayPassReschedule';
import { DayPassPaymentDetail } from '../../shared/redux/action/DayPassPaymentDetail';
import { selectdayPassProductData } from '../../shared/redux/slices/dayPassProductData';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import styles from './DayPassSummaryScreen.style';
import Botton from '../../shared/components/core/Botton';
import Wrapper from '../../shared/components/core/Wrapper';
import { BookingSetting } from '../../shared/redux/action/BookingSetting';
import DayPassSchedule from '../../assets/images/DayPassSchedule.js';
import DayPassPayment from '../../assets/images/DayPassPayment.js';
import Error from '../../assets/images/errorApi.svg';

import { AppTheme } from '../../shared/theme';

const DayPassSummaryScreen =({navigation,route})=>  {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const dispatch=useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const dayPassPrice=useSelector((state) => state?.dayPassPrice?.data?.Price);
  const dayPassPricePending=useSelector((state) => state?.dayPassPrice?.loading);
  console.log('dayPassPrice----',JSON.stringify(dayPassPrice,null,2));

  const tax = useSelector(state=> state?.tax?.data)
  console.log("tax---",tax,'-',tax?.setting?.isTaxEnable)

  const totalPrice = dayPassPrice?.EstimatedCost + dayPassPrice?.DiscountAmount
  console.log("totalPrice---",totalPrice)

  const  dayPassPaymentDetailLoading= useSelector((state) => state.dayPassPaymentDetail?.loading);
  const  DayPassRescheduleLoading= useSelector((state) => state.dayPassReschedule?.loading);
  const[tentative,setTentative]=useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dayPassProduct=useSelector(selectdayPassProductData);
  console.log('dayPassProduct----',dayPassProduct);
  const date1=new Date();

  const date = moment(date1).format("YYYY-MM-DDTHH:mm:ss[Z]");

  console.log('date------',date);
  //TODAY'S DATE
  const newDate=moment(date).format('Do MMM, YYYY');
  //SELECTED DATE
  const {selectedDate,userName,FromTime,ToTime,TypeName,CoworkerId, isRescheduleRequest ,rescheduleId }=route.params;
  console.log('show data ---',rescheduleId,'--',isRescheduleRequest,'--',selectedDate,'--',FromTime,'--',ToTime);
  const formattedSelectedDate=moment(selectedDate,'DD/MM/YYYY').format('Do MMM, YYYY');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.summaryScreen
    });
  }, []);

  const bottomSheetrequestSubmit = useRef(null);
  const snapPoints = useMemo(() => ['25%'], []);

  const bottomSheetNoBooking = useRef(null);
  const snapPointsNoBooking = useMemo(() => ['28%'], []);

  
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onSubmitYes=(data)=>{

    console.log('showData---',data);
    dispatch(DayPassPaymentDetail(data)).unwrap().then(result=>{
      dispatch(setDayPassId(result?.data?.id));
      console.log('result-09000--',result);
      bottomSheetrequestSubmit.current?.closeBottomSheet();
      if (result?.statusCode === 200){
        if(dayPassPrice?.EstimatedCost == 0){
          navigation.navigate(ScreensName.bookingConfirmed,{dayPass:true});
        }
        else{
          navigation.navigate(ScreensName.dayPassPayment,{
            dueDate:newDate,
            price:dayPassPrice?.EstimatedCost,
            dayPassConfirm:tentative,
            id:result?.data?.id,
            invoiceNo:result?.data?.InvoiceNo,
            paymentStatus:result?.data?.paymentStatus,
            dayPass:true,
            dayPassSubmit:true,
            resheduleData:
          {
            isRescheduleRequest: isRescheduleRequest, 
            rescheduleId: rescheduleId,
            FromTime:FromTime,
            ToTime:ToTime,
            TypeName:TypeName,
            CoworkerId:CoworkerId,
            Tentative: tentative,
            BookedOn:date,
            CoworkerName:userName,
            Price:dayPassPrice?.EstimatedCost
          }
          });
        }
      }
      else{
        // navigation.navigate(ScreensName.bookingConfirmed,{dayPass:true});
        console.log('400 result--',result);
        bottomSheetrequestSubmit.current?.closeBottomSheet();
        showDatePicker();
       
      }
    }).catch(error=>{
      console.log('error--',error);
      bottomSheetrequestSubmit.current?.closeBottomSheet();
      showDatePicker();
      // bottomSheetNoBooking.current?.snapToIndex(0);
    });

  };

  const onSubmitYesReshedule =(data)=>{
    console.log('onSubmitYesReshedule data ---',data);
    dispatch(DayPassPaymentDetail(data)).unwrap().then(result=>{
      if(result?.statusCode === 200){
    dispatch(DayPassReschedule(data)).unwrap().then(result=>{
      dispatch(setDayPassId(result?.data?.id));
      console.log('result-09000--',result);
      bottomSheetrequestSubmit.current?.closeBottomSheet();
      // if (result?.statusCode === 200){
      //   navigation.navigate(ScreensName.dayPassPayment,{
      //     dueDate:newDate,
      //     price:dayPassPrice?.EstimatedCost,
      //     dayPassConfirm:tentative,
      //     id:result?.data?.id,
      //     invoiceNo:result?.data?.InvoiceNo,
      //     paymentStatus:result?.data?.paymentStatus,
      //     dayPass:true,
      //     dayPassSubmit:true,
      //   });
      // }
      if (result?.statusCode === 200){
        if(dayPassPrice?.EstimatedCost == 0){
          navigation.navigate(ScreensName.bookingConfirmed,{dayPass:true});
        }
        else{
          navigation.navigate(ScreensName.dayPassPayment,{
            dueDate:newDate,
            price:dayPassPrice?.EstimatedCost,
            dayPassConfirm:tentative,
            id:result?.data?.id,
            invoiceNo:result?.data?.InvoiceNo,
            paymentStatus:result?.data?.paymentStatus,
            dayPass:true,
            dayPassSubmit:true,
            resheduleData:
          {
            isRescheduleRequest: isRescheduleRequest, 
            rescheduleId: rescheduleId,
            FromTime:FromTime,
            ToTime:ToTime,
            TypeName:TypeName,
            CoworkerId:CoworkerId,
            Tentative: tentative,
            BookedOn:date,
            CoworkerName:userName,
            Price:dayPassPrice?.EstimatedCost
          }
          });
        }
      }
      else{
        // navigation.navigate(ScreensName.dayPassRequestSent,{dayPass:true});
        console.log('400 result reshedule--',result);
        bottomSheetrequestSubmit.current?.closeBottomSheet();
        showDatePicker();
      }
    }).catch(error=>{
      console.log('error reshedule--',error);
      bottomSheetrequestSubmit.current?.closeBottomSheet();
      showDatePicker();
    //  bottomSheetNoBooking.current?.snapToIndex(0);
    });
  }
  else{
    console.log('testing data-----', data);
    console.log('result--',result);
    bottomSheetrequestSubmit.current?.closeBottomSheet();
    showDatePicker();
  

  }
}).catch(err=>{
  console.log('booking is failed for reshedule--',err);
  bottomSheetrequestSubmit.current?.closeBottomSheet();
  showDatePicker();
  
});
  };



  ///////////////////BOTTOM SHEETS//////////////

  const bottomSheetRequestContent=(

    <View style={styles.bottomSheetTitle}>
      <Txt style={styles.reqPlan}>Are you sure you want to book day pass?</Txt>
      <View style={styles.btnContainer}>

        <Botton
          continueBtnAccessibilityLabel='bookdaypass'
          cancelBtnAccessibilityLabel='dontbookdaypass'
          loading={(dayPassPaymentDetailLoading || DayPassRescheduleLoading) ? true :false}
          variant='v2'
          continueTitle='Yes'
          cancelTitle='No'
          disabled={false}
          button1Style={styles.btn1}
        
          onContinue={() => {
            if (isRescheduleRequest === true ){
              onSubmitYesReshedule({FromTime:FromTime,ToTime:ToTime,TypeName:TypeName,CoworkerId:CoworkerId,
                Tentative: tentative,BookedOn:date,CoworkerName:userName,Price:dayPassPrice?.EstimatedCost,
                isRescheduleRequest: isRescheduleRequest, rescheduleId: rescheduleId
              });
            }
            else{
            onSubmitYes({FromTime:FromTime,ToTime:ToTime,TypeName:TypeName,CoworkerId:CoworkerId,
              Tentative: tentative,BookedOn:date,CoworkerName:userName,Price:dayPassPrice?.EstimatedCost
            });
             }
          }}
          onCancel={() => {
            bottomSheetrequestSubmit.current?.closeBottomSheet();
          }}
        />
           
      </View>
    </View>

  );



  /////////////////////////////////////////////
  useEffect(()=>{
    dispatch(BookingSetting()).unwrap().then(result=>{
      console.log('booking setting result ----',result?.setting);
      setTentative(  result?.setting?.daypassConfirm );
    }).catch(err=>{
      console.log('error booking setting ----',err);
    });
  },[dispatch]);

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPoints}
      bottomSheetContent={bottomSheetRequestContent}
      ref={bottomSheetrequestSubmit}
    >
      <View style={styles.innerContainer}>
        <View>
          <Wrapper
            style={styles.CardContainer}>
            <View style={styles.flexDirectionRow}>

              <View>
                
                <DayPassSchedule
                  stroke={isDarkMode ? AppTheme.COLORS.white : null}
                />
              
              </View>
              <View style={styles.innerScheduleContainer}>
                <Txt style={styles.yourSchedule}>Your schedule</Txt>
                <Txt style={styles.name}>{userName}</Txt>
              </View>

            </View>

            <View style={styles.bookingDetailContainer}>
              <View>
                <Txt style={[styles.bookedText,{color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Booked on</Txt>
                <Txt style={styles.bookingTime}>{newDate}</Txt>
              </View>
              <View>
                <Txt style={[styles.bookedText,{color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Booked for</Txt>
                <Txt style={styles.bookingTime}>{formattedSelectedDate}</Txt>
              </View>
            </View>
    
          </Wrapper>

          {/* PAYMENT DETAILS CARD */}

          <View style={styles.paymentContainer}>

            <View>
           
              <DayPassPayment 
                stroke={isDarkMode ? AppTheme.COLORS.white : null}
              />
            
            </View>
            <View style={styles.innerScheduleContainer}>
              <Txt style={styles.paymentTxt}>Payment</Txt>
              <Txt style={styles.paymentDesc}>Please submit payment receipt for confirmation</Txt>
            </View>

          </View>

          <View style={[styles.paymentDetailContainer,{backgroundColor : isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : 'rgba(0, 0, 0, 0.04)'}]}>

{/* DAYpASS SECTION */}
            <View style={styles.allignInRow}>
              <Txt style={[styles.paymentHeadings,{color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Day pass</Txt>

              <ShimmerPlaceHolder
                visible={dayPassPricePending === false }
                shimmerStyle={styles.shimmerAvail}>
              </ShimmerPlaceHolder>
            
              <Txt  accessibilityLabel='estimatedCostDaypass' style={styles.payemntValueTxt}>{ !dayPassPricePending  ? totalPrice : null}</Txt>
            </View>
            <Divider style={styles.divider} />

            {/* SUB TOTAL SECTION */}
            <View style={styles.allignInRow}>
              <Txt style={[styles.paymentHeadings,{color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Subtotal</Txt>

              <ShimmerPlaceHolder
                visible={dayPassPricePending === false }
                shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(202)}]}>
              </ShimmerPlaceHolder>

              <Txt accessibilityLabel='subtotal' style={styles.payemntValueTxt}>{!dayPassPricePending  ? totalPrice : null}</Txt>
            </View>

{/* VAT SECTION */}
            <View style={styles.allignInRow}>
              <Txt style={[styles.paymentHeadings,{marginTop:AppTheme.SPACINGS.MARGINS.M6,color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>VAT {tax?.setting?.taxRate}%</Txt>

              <ShimmerPlaceHolder
                visible={dayPassPricePending === false }
                shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(202)}]}>
              </ShimmerPlaceHolder>

              <Txt accessibilityLabel='subtotal' style={[styles.payemntValueTxt,{marginTop:AppTheme.SPACINGS.MARGINS.M6}]}>{!dayPassPricePending  ?
                tax?.setting?.isTaxEnable   ? ((tax?.setting?.taxRate / 100) * totalPrice).toFixed(2) : 0
              : null}</Txt>
            </View>

{/* DISCOUNT SECTION */}
            <View style={styles.allignInRow}>
              <Txt style={[styles.paymentHeadings,{marginTop:AppTheme.SPACINGS.MARGINS.M6,color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>
              {dayPassPrice?.DiscountCode ? `Discount(${dayPassPrice?.DiscountCode})` : `Discount(-)`}
                </Txt>

              <ShimmerPlaceHolder
                visible={dayPassPricePending === false }
                shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(202)}]}>
              </ShimmerPlaceHolder>

              <Txt accessibilityLabel='subtotal' style={[styles.payemntValueTxt,{marginTop:AppTheme.SPACINGS.MARGINS.M6}]}>{!dayPassPricePending  ?
               dayPassPrice?.DiscountAmount ? dayPassPrice?.DiscountAmount : '-'
              : null}</Txt>
            </View>

{/* TOTAL PAYABLE SECTION */}
            <Divider style={styles.divider} />
            <View style={styles.allignInRow}>
              <Txt style={styles.totalPayableTxt}>Total payable</Txt>

              <ShimmerPlaceHolder
                visible={dayPassPricePending === false }
                shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(175)}]}>
              </ShimmerPlaceHolder>

              <Txt accessibilityLabel='totalPayable' style={styles.totalPayableAmount}>{!dayPassPricePending  ? 
              ((totalPrice + ((tax?.setting?.taxRate / 100) * totalPrice))) < dayPassPrice?.DiscountAmount  ? `SAR 0.0` :
                 tax?.setting?.isTaxEnable  ? `SAR ${((totalPrice + ((tax?.setting?.taxRate / 100) * totalPrice)) - dayPassPrice?.DiscountAmount).toFixed(2) }`
                 : `SAR ${(totalPrice - dayPassPrice?.DiscountAmount).toFixed(2)}`

               : null}</Txt>
            </View>

          </View>
        </View>
        <View>
          <Botton
            loading={false}
            title={'Proceed'}
            accessibilityLabel='ProeedBtn'
            disabled={false}
            onPress={() => {
              bottomSheetrequestSubmit.current?.expandBottomSheet();
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

export default DayPassSummaryScreen;
