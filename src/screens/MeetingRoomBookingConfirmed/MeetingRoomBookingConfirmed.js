import { StatusBar, Text, View, ScrollView, SafeAreaView,BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import Svg from 'react-native-svg';
import { useDispatch ,useSelector} from 'react-redux';

import { setConfirmBooking } from '../../shared/redux/slices/meetingHomeScreenBookingSlice';
import styles from './MeetingRoomBookingConfirmed.style';
import { PrimaryButton } from '../../shared/components';
import { AppTheme } from '../../shared/theme';
//import OfficeBottomImage from '../../assets/images/office2.svg'
import { ScreensName } from '../../shared/constants/ScreensStrings';
import Strings from '../../shared/constants/Strings';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import BookingConfirmed from '../../assets/images/bookingConfirmed.svg';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import Botton from '../../shared/components/core/Botton';
const MeetingRoomBookingConfirmed = ({ navigation ,route}) => {

  const {dayPass}=route.params;
  const Dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  //preventing going back
  useEffect(() => {
    const backAction = () => {
      return true; // Return true to prevent going back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Frame
      
    >
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.subContainer}>
            <View style={styles.bookingConfirmedImg}>
              <Svg width={'100%'} >
                <BookingConfirmed  stroke={isDarkMode ? AppTheme.COLORS.white : null}/>
              </Svg>
            </View>

            <Txt style={styles.title}>{Strings.bookingConfirmed}</Txt>
            <Txt style={styles.desc}>{Strings.bookingChargedPosted}</Txt>

            <View style={styles.btnContainer}>
              <Botton
                title="Home"
                onPress={() => {
                  console.log("let's go to home screen");
                  Dispatch(setConfirmBooking(true));
                  if(dayPass === true){
                    navigation.navigate(ScreensName.dayPassHomeScreen);
                  }
                  
                  else{
                    navigation.navigate(ScreensName.MeetingHomeScreen);}
                }}
              />
            </View>
          </View>
          <View style={styles.bottomImageContainer}>


            <Svg width={'100%'} >
              <FintechBottomLogo />
            </Svg>

          </View>
        </ScrollView>
      </View>

    </Frame>
  );
};

export default MeetingRoomBookingConfirmed;
