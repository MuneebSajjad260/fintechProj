import React, { useState, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView,  ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch , useSelector } from 'react-redux';
import { Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Botton from '../../shared/components/core/Botton';
import Input  from '../../shared/components/core/Input';
import { selectUserData } from '../../shared/redux/slices/isadminSlice';
import TextInput from '../../shared/components/text-input/Textinput';
import { bottomSheetEmailValidator, validatePhoneNumber } from '../../shared/utils/validationHelpers';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import styles from './ProfileDetailEditScreen.Style';
import { AppTheme } from '../../shared/theme';
import { PrimaryButton } from '../../shared/components';
import { UpdateProfile } from '../../shared/redux/action/UpdateProfile';
import { setProfileEdit } from '../../shared/redux/slices/profileEditSlice';
import ProfileMenu from '../../assets/images/profileMenu.js';

const ProfileDetailEditScreen = ({route}) => {

  const navigation = useNavigation();
  const {isAdmin,FullName,CompanyName,Phone,Email}=route.params;

  console.log('isAdmin',isAdmin);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const userData=useSelector(selectUserData);
  console.log('userdata---',userData?.TeamIds , '--',userData?.Id);

  const profileUpdateLoading = useSelector(state=>state?.updateProfile?.loading);
  const dispatch = useDispatch();
  const [Name, setName] = useState(FullName);
  const [email, setEmail] = useState({ value: Email, error: '' });
  const [phone, setPhone] = useState({ value: Phone, error: '' });
  const [companyName, setCompanyName] = useState(CompanyName);

  //CALLING UPDATE PROFILE API
  const handleEditedName = (profileDetails) => {

    const data ={userId:userData?.Id , teamId: userData?.TeamIds ,body:profileDetails} ;
    console.log('data---',data);
    dispatch(UpdateProfile(data)).unwrap().then(result=>{
      console.log(' update profile result---',result);
      bottomSheetRefSaveDetails.current?.snapToIndex(0);
    }).catch(err=>{
      console.log('update Profile err--',err);
    });


  };

 
  const bottomSheetRefSaveDetails = useRef(null);
  const snapPointsSaveDetails = useMemo(() => ['25%'], []);
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

  //setting screen name
  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.Profiledetail
    });
  }, []);

  return (
    <Frame>
      <View style={styles.innerContainer}>

        <ScrollView
          contentContainerStyle={styles.ScrollView}
          showsVerticalScrollIndicator={false}
        >

          <View style={[styles.allignrow, { justifyContent: undefined }]}>
            <View >
              {/* <Svg width={'100%'} > */}
              <ProfileMenu
                stroke={isDarkMode ? AppTheme.COLORS.white : null} />
              {/* </Svg> */}
            </View>
            <Txt style={styles.personalinformationtext}>PERSONAL INFORMATION</Txt>
          </View>
          <View
            style={styles.editDetailsContainer}
          >

            <Txt style={styles.detailsheadingtext}>Name</Txt>
            <View style={styles.inputContainer}>
              <Input
                InputStyling={ [styles.input , {borderWidth:isDarkMode ? 1 : 0 , backgroundColor : isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : 'rgba(245, 245, 245, 1)'}]}
                onChangeText={name => setName(name)}
                value={Name}
              />
             
            </View>
            <Txt style={  isAdmin ? styles.detailsheadingtext :[styles.detailsheadingtext,{color: AppTheme.COLORS.darkText}]}>Email</Txt>
            <View style={styles.inputContainer}>

              <Input
                editable={isAdmin ? true : false}
                error={email.error}
                errorDetail={email.error}
                InputStyling={ [styles.input , {borderWidth:isDarkMode ? 1 : 0 , backgroundColor : isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : 'rgba(245, 245, 245, 1)'}]}
                // styleInputText={styles.textInput}
                onChangeText={(text) => {
                  setEmail({ value: text, error: bottomSheetEmailValidator(text) });
                   
                }}
                name={'email'}
                value={email.value}
                 
              />
        
              
            </View>
            <Txt style={styles.detailsheadingtext}>Phone</Txt>
            <View style={styles.inputContainer}>
              <Input
               
                error={phone.error}
                errorDetail={phone.error}
                InputStyling={ [styles.input , {borderWidth:isDarkMode ? 1 : 0 , backgroundColor : isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : 'rgba(245, 245, 245, 1)'}]}
                onChangeText={phone => {
                  setPhone({ value: phone, error: validatePhoneNumber(phone) });
                  // eslint-disable-next-line no-useless-escape
                  
                }}
                value={phone.value}
              />

            </View>
            <Txt  style={  isAdmin ? styles.detailsheadingtext :[styles.detailsheadingtext,{color: AppTheme.COLORS.darkText}]}>Company Name</Txt>
            <View style={styles.inputContainer}>
              <Input
              
                editable={!isAdmin ? false : true}
                // error={phone.error}
                hideErrorContainer={true}
                InputStyling={ [styles.input , {borderWidth:isDarkMode ? 1 : 0 , backgroundColor : isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : 'rgba(245, 245, 245, 1)'}]}
                onChangeText={companyName => setCompanyName(companyName)}
                value={companyName}
              />
              {
                !isAdmin &&
              <Txt style={styles.onlyAdminTxt}>Only an administrator can update company name</Txt>
              }

            </View>

          </View>
          <View style={styles.bottom}>
           
            <Botton
              accessibilityLabel='savedetailBtn'
              loading={profileUpdateLoading ? true : false}
              title={'Save Details'}
              disabled={(Name === '' || (email.value === '' || email.error !== '') || (phone.value === '' || phone.error !== '')  || companyName  === '') ? true : false}
              small={false}
              onPress={() => {
                {
                  // if (Name != '' && (email.value != '' && !emailError) && companyName != '' && (phone != '' && !phoneError)) {
                
                  handleEditedName({ Name: Name, email: email.value, phone: phone.value, companyName: companyName });
                  // console.log('details are saved ');
                  // }
                  // else {
                  //   setError('All fields required', error);
                  //   console.log('All fields are required');
                  // }
                }
              }}
            />
          </View>
          {/* </View> */}
        

        </ScrollView>

        <BottomSheet
          ref={bottomSheetRefSaveDetails}
          snapPoints={snapPointsSaveDetails}
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
          }}
        >
          <View style={styles.bottomsheetContainer}>
            <Txt style={styles.profileupdatedtext}>PROFILE UPDATED</Txt>
            <Txt style={styles.Updatedconfirmationtext}>You profile has been updated</Txt>
            <View style={styles.bottomSheetBtn}>
              <Botton
                accessibilityLabel='backToMenu'
                loading={false}
                title={'Back to menu'}
                disabled={false}
                small={false}
                onPress={() => {
                  console.log('i am back to menu btn');
                  navigation.navigate(ScreensName.mainMenuScreen);
                }}
              />
            </View>
          </View>
        </BottomSheet>

      </View>
    </Frame>
  );
};
export default ProfileDetailEditScreen;
