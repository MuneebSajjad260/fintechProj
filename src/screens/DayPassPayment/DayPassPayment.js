import React, {useState,useEffect} from 'react';
import { View, Text, SafeAreaView, Pressable ,Image, TouchableOpacity, ScrollView, TextInput,BackHandler,AppState} from 'react-native';
import { Svg } from 'react-native-svg';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigation,useIsFocused } from '@react-navigation/native';

import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { DayPassReschedule } from '../../shared/redux/action/DayPassReschedule';
import { CancelDayPass } from '../../shared/redux/action/CancelDayPass';
import { MeetingRoomReschedule } from '../../shared/redux/action/MeetingRoomReschedule';
import { selectMeetingRoomid,selectDayPassId } from '../../shared/redux/slices/bookingResourceSlice';
import { CancelMeetingRoom } from '../../shared/redux/action/CancelMeetingRoom';
import { MeetingRoomComment } from '../../shared/redux/action/MeetingRoomComment';
import { DayPassComment } from '../../shared/redux/action/DayPassComment';
import { DayPassUpload } from '../../shared/redux/action/DayPassUpload';
import styles from './DayPassPayment.style';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import DayPassBankDetail from '../../assets/images/DayPassBankDetail.js';
import DayPassPaymentProof from '../../assets/images/DayPassPaymentProof.js';
import { PrimaryButton } from '../../shared/components';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import Wrapper from '../../shared/components/core/Wrapper';
import { AppTheme } from '../../shared/theme';
import Error from '../../assets/images/errorApi.svg';
import Botton from '../../shared/components/core/Botton';


const DayPassPayment = ({route}) => {
  const dispatch =useDispatch();
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const isFocused=useIsFocused();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const  DayPassRescheduleLoading= useSelector((state) => state.dayPassReschedule?.loading);
  const meetingRescheduleLoading = useSelector((state) => state?.meetingRoomReschedule?.loading);
  const {dueDate,price,id,invoiceNo,paymentStatus,dayPass,dayPassConfirm,tentative,ResourceId,dayPassSubmit , resheduleData}=route.params;
  // const meetingRoomId=useSelector(selectMeetingRoomid);
  // const dayPassId=useSelector(selectDayPassId);
  console.log('---daypassconfirm--',dayPassConfirm,'dayPass--',dayPass,'dayPassSubmit:',dayPassSubmit,'--',id);
  console.log('reshedule data---',resheduleData);

  
  const backAction = () => {
    console.log('event happened on back button');
    // dispatch(CancelMeetingRoom(id));
    navigation.goBack();
    
    return true;
  };
  
  useEffect(() => {

    // if (isFocused) {
    const subs = navigation.addListener('beforeRemove', (e) => {
      if (navigation.isFocused()) {
        if(dayPassSubmit === true)
        {
          console.log('CANCEL DAY PASS');
          dispatch(CancelDayPass(id));
        }
        else{
          console.log('CANCEL MEETING ROOM');
          dispatch(CancelMeetingRoom(id));
        }
        console.log('-----beforeRemove called-------', e);
      }
      if ( e.data.action.type === 'POP' && !e.data.action.preventRemove) {
        // e.preventDefault();
        BackHandler.removeEventListener('hardwareBackPress',backAction);
      }
      return false;
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  
  
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      subs();
  
    };
    // }
  }, [ navigation, id, dispatch]);

  ////////////////////////


  const paymentDetails=useSelector((state) => state?.dayPassPaymentDetail?.data);

  const meetingRoomCommentLoading=useSelector((state) => state?.meetingRoomComment?.loading);
  const dayPassCommentLoading=useSelector((state) => state?.dayPassComment?.loading);

  const uploadPhotoLoading=useSelector((state) => state?.dayPassUpload?.loading);
  const uploadPhoto=useSelector((state) => state?.dayPassUpload?.data);
  console.log('upload Photo---',uploadPhoto);
  
  console.log('hshs33--',dayPass,dayPassConfirm,tentative,'----',ResourceId,'---',price);
  const [photo, setPhoto] = useState();
  const[comment,setComment]=useState();


  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //////UPLOAD PHOTO//////////
  const handlechoosephoto = () => {
    const options = {
      noData: true
    };
    launchImageLibrary(options, response => {
      try{
        setPhoto( response?.assets[0]?.uri);
        console.log('response22---,', response);
        let formData =new FormData();
        formData.append('image', {
          uri: response?.assets[0]?.uri,
          name: response?.assets[0]?.fileName,
          type: response?.assets[0]?.type,
        });

        dispatch(DayPassUpload(formData)).unwrap().then(result=>{
          console.log('result---',result);
        }).catch(error=>{
          console.log('upload error--',error);
        });

      }catch(error){
        setPhoto( null);
      }
    });
  };

  const clearImg=()=>{
    setPhoto(null);
  };


  //IN CASE OF DAY PASS
  const onSubmit=(data)=>{

    console.log('data---444--- daypass--', data);
    dispatch (DayPassComment(data)).unwrap().then(result=>{

      //Reshedule day pass
      if (resheduleData?.isRescheduleRequest === true){
        console.log('data resh daypass---',resheduleData);
        dispatch(DayPassReschedule(resheduleData)).unwrap().then(result=>{
          console.log('reshedule result daypass--',result);
          navigation.navigate(ScreensName.dayPassRequestSent,{dayPass : true , tentative:tentative});
        })
          .catch(err=>{
            console.log('reshedule err dypass--',err);
            showDatePicker();
          });
      }
 
      else{
        console.log('reuslt daypass----',result);
        navigation.navigate(ScreensName.dayPassRequestSent,{dayPass : true , tentative:tentative});
      }
    }).catch(error=>{
      console.log('error daypass-----',error);
      showDatePicker();
    });
 
  };


  //IN CASE OF MEETING ROOM (BEFORE AND AFTER MEMBERSHIP)
  const onSubmitMeeting=(data)=>{

    console.log('datta---222---meeting--', data);
    dispatch (MeetingRoomComment(data)).unwrap().then(result=>{
      console.log('reuslt meeeting---',result);
     
      //Reshedule day pass
      if (resheduleData?.isRescheduleRequest === true){
        console.log('data reshedule meeting room---',resheduleData);
        dispatch(MeetingRoomReschedule(resheduleData)).unwrap().then(result=>{
          console.log('reshedule result meeting--',result);
          if(result?.statusCode === 200){
            navigation.navigate(ScreensName.dayPassRequestSent,{dayPass : true , tentative:tentative});
          }
          // eslint-disable-next-line no-empty
          else{
            
          }
        })
          .catch(err=>{
            console.log('reshedule err meeting--',err);
            showDatePicker();
          });
      }
 
      else{
        console.log('reuslt daypass----',result);
        navigation.navigate(ScreensName.dayPassRequestSent,{dayPass : true , tentative:tentative});
      }
      
    }).catch(error=>{
      console.log('error meeting--',error);
      showDatePicker();
    });
 
  };

  return (
    <Frame>
      <View style={styles.innerContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          <View>
            <Wrapper style={styles.cardContainer}>
              <View style={styles.allignInRow}>
                <View>
                  <View>
                    <Txt style={[styles.statusHeading,{color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Invoice ID</Txt>
                    <Txt style={styles.invoiceId}>{`FH - ${invoiceNo}`}</Txt>
                  </View>

                  <View>
                    <Txt style={[styles.statusHeading,{marginTop:normalize(16),color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Total</Txt>
                    <Txt style={styles.paymentAmountText}>{`SAR ${price}`}</Txt>
                  </View>

                </View>
                <View>
                  <View>
                    <Txt style={[styles.statusHeading,{color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Due Date</Txt>
                    <Txt style={styles.bookingTime}>{dueDate}</Txt>
                  </View>

                  <View>
                    <Txt style={[styles.statusHeading,{marginTop:normalize(16),
                      color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Status</Txt>
                    <View style={styles.transferPendingContainer} >
                      <Txt style={styles.transferPendingText}>{`Transfer ${paymentStatus}`}</Txt>
                    </View>
                  </View>
                </View>
              </View>
         
            </Wrapper>

            <Wrapper style={styles.cardContainer}>
              <View style={styles.flexDirectionRow}>

                <View>
                  {/* <Svg width={'100%'} > */}
                  <DayPassBankDetail 
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}/>
                  {/* </Svg> */}
                </View>
                <View style={styles.bankDetailContainer}>
                  <Txt style={styles.bankDetails}>Bank details</Txt>
                  <Txt style={styles.bankDetailDesc}>Please transfer payable amount into this account and attach the screenshot below</Txt>
                </View>

              </View>

              <View style={styles.accountDetails}>
                <Txt style={[styles.statusHeading,{color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Account name</Txt>
                <Txt style={styles.accountName}>Fintech Saudi</Txt>
                <Txt style={[styles.statusHeading,{marginTop:normalize(9),color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>IBAN</Txt>
                <Txt style={styles.ibanNo}>SA40 0110 0001 2303 0500 0009</Txt>
              </View>

              <View style={styles.sarieDetailsContainer}>
                <Txt style={styles.sarieDetails}>Sarie details</Txt>
                <Txt style={[styles.statusHeading,{marginTop:normalize(12),color:isDarkMode ? AppTheme.COLORS.lightDarkModeTxt : AppTheme.COLORS.lightLightModeTxr}]}>Sarie Code</Txt>
                <View style={[styles.flexDirectionRow,{alignItems:'center'}]}>
                  <Txt style={styles.sarieCodeTxt}>SAMASARI</Txt>
                  <Txt style={[styles.sarieCodeTxt,{fontSize:normalize(10),marginLeft:normalize(17)}]}>Saudi Arabian Monetary Authority</Txt>
                </View>
              </View>
            </Wrapper>

            <View style={styles.paymentProofContainer}>

              <View>
                {/* <Svg width={'100%'} > */}
                <DayPassPaymentProof
                  stroke={isDarkMode ? AppTheme.COLORS.white : null} />
                {/* </Svg> */}
              </View>
              <View style={styles.paymentProofSubContainer}>
                <Txt style={styles.paymentProof}>Upload payment proof</Txt>
                <Txt style={styles.paymentProofDesc}>Please make sure the file size is less than 5MB</Txt>
              </View>

            </View>
            {photo ? 
              <View style={[styles.flexDirectionRow,{justifyContent:'center'}]}>
                <Image
                  source={{ uri: photo}}
                  style={styles.receiptImg}
                />
                <TouchableOpacity
                  accessibilityLabel='removeReceipt'
                  style={styles.removeContainer}
                  onPress={()=>{ 
                    clearImg();
                  }}>
           
                  <Txt style={styles.removeTxt}>Remove</Txt>
             
                </TouchableOpacity>
              </View>
              :
              <Pressable
                accessibilityLabel='uploadReceipt'
                onPress={()=>{
                  handlechoosephoto();
                }}>
                <View style={[styles.uploadPicContainer,{ borderColor: isDarkMode ? 'rgba(202, 202, 202, 1)' : 'rgba(0, 0, 0, 0.1)'}]}>
                  <Txt style={styles.uploadReceiptTxt}>Tap here to upload receipt</Txt>
                </View>
              </Pressable>
            } 
            <View style={styles.commentContainer}>
              <Txt style={styles.anyCommentTxt}>Any Comments?</Txt>
              <TextInput
                style={[styles.anyCommentSubContainer,{ backgroundColor: isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : 'rgba(0, 0, 0, 0.04)',
                  color:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}]}
                value={comment}
                onChangeText={(value)=>{
                  setComment(value);
                  console.log('comment',comment);
                }}
              />
            
           
            </View>

          </View>
          <View>
            <Botton
              loading={ 
                resheduleData?.isRescheduleRequest === true ? (dayPassCommentLoading || meetingRoomCommentLoading || DayPassRescheduleLoading || meetingRescheduleLoading || uploadPhotoLoading ) ? true :false 
                  : (dayPassCommentLoading || meetingRoomCommentLoading 
                    || uploadPhotoLoading  ) ? true :false
              }
              accessibilityLabel='confirmBtn'
              title={'Confirm'}
              disabled={ (!photo || uploadPhotoLoading)  ? true : false }
              onPress={() => {
                if(dayPassSubmit === true){
                  comment ?
                    onSubmit({ id:id , body:{InvoiceDoc: uploadPhoto?.files[0]?.originalname , PaymentComment: comment }})
                    //Reshedule
                    :
                    onSubmit({id:id , body:{InvoiceDoc: uploadPhoto?.files[0]?.originalname }});
                }
                else{
                  comment ?
                    onSubmitMeeting({ id:id , body:{InvoiceDoc: uploadPhoto?.files[0]?.originalname , PaymentComment: comment }})
                    //Reschedule
                    :
                    onSubmitMeeting({id:id , body:{InvoiceDoc: uploadPhoto?.files[0]?.originalname }});
                }
              }}

              singleButtonStyle={styles.confirmBtn}
            />
          </View>
        </ScrollView>
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


export default DayPassPayment;
