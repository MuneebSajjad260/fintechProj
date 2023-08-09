import {TouchableOpacity, View} from 'react-native';
import React, {useRef, useCallback, useState, useEffect, useMemo} from 'react';
import Svg from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {GetProfile} from '../../shared/redux/action/GetProfile';
import {
  setAdministrator,
  setLoginUserId,
  setLoginUserName,
  setTeamName,
  setUserData,
  setEmail,
} from '../../shared/redux/slices/isadminSlice';
import {PendingStatus} from '../../shared/redux/action/PendingStatus';
import {resetError} from '../../shared/redux/slices/authSlice.js';
import {login} from '../../shared/redux/action/user.js';
import styles from '../loginScreen/LoginScreen.style.js';
import {AppTheme} from '../../shared/theme/index.js';
import Strings from '../../shared/constants/Strings.js';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
import NetworkError from '../../shared/components/NetworkError/NetworkError.js';
import {
  emailValidator,
  passwordValidator,
} from '../../shared/utils/validationHelpers.js';
import {AppText} from '../../shared/components/index.js';
import LoginLogo from '../../assets/images/login.js';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import FintechBottomLogoDark from '../../assets/images/FintechBottomLogoDark.svg';
import {
  handleSave,
  suggestSavedCredentials,
  getSavedCredentials,
} from '../../shared/utils/keychain';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Input from '../../shared/components/core/Input';
import Botton from '../../shared/components/core/Botton';
import PushNotification from 'react-native-push-notification';
import CreditAddedIcon from '../../assets/images/CreditAddedIcon';
import {RegisterFCM} from '../../shared/redux/action/RegisterFCM';
import ForgotPasswordComp from '../../shared/components/forgotPassword/ForgotPasswordComp';
import {requestUserPermission} from '../../shared/utils/notificationService';

const LoginScreen = () => {
  //* Suggest Saved Users States
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [showSavePassBtm, setShowSavePassBtm] = useState(false);
  const [error, setError] = useState(null);
  const [emailBtm, setEmailBtm] = useState({value: '', error: ''});
  const [load, setLoading] = useState(false);
  const [isFCMSent, setIsFCMSent] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const loginData = useSelector(state => state.auth);
  const loginPending = loginData?.loading;
  const loginDone = loginData?.data;
  const networkError = loginData?.error?.message;
  const loginError = loginData?.error?.error;
  const loginErrorToken = loginData?.error?.error_description;
  const pendingStatusLoading = useSelector(
    state => state.pendingStatus.loading,
  );

  useEffect(() => {
    if (loginDone?.access_token) {
      setLoading(true);
      //HERE IM CHECKING IF PENDING STATUS IS APPROVED THEN GO TO MEETING HOME SCREEN ELSE GO TO HOME SCREEN
      dispatch(GetProfile(loginDone?.access_token))
        .unwrap()
        .then(result => {
          // check result
          console.log('result--',result);
          let checkMember = result.find(item => {
            return item.CoworkerType === 1;
          });

          console.log('checkMember 1--',checkMember);
          // eslint-disable-next-line no-unsafe-optional-chaining
          // *Store User Data
          dispatch(setUserData(checkMember));
          // console.warn('Data:==============>', checkMember?.Id);
          //* Register FCM Token API
          if (checkMember.Id) {
            // console.warn('Registring:==============>', checkMember);
            // const getToken = async () => {
            //   const token = await requestUserPermission();
            //   console.log("Requesting Token:------", token)
            //   if (token) {
            //     console.log("Getted Token:------", token)
            //     // console.warn('In Token', token);
            //     regFcm(token, checkMember?.Id);
            //   } else {
            //     console.log("Error Token:------", token)
            //     console.error('Error While Getting Token!');
            //   }
            // };
            // getToken();

            const getToken = async () => {
              const token = await requestUserPermission();
              console.log('FCM Token Gen O', token);
              if (token) {
                // FCM token retrieved successfully
                regFcm(token, checkMember?.Id);
                console.log('FCM Token Gen T', token, checkMember?.Id);

              } else {
                console.log('FCM Token Gen in Else', token);
                // Delay and try again after a certain period
                await new Promise(resolve => setTimeout(resolve, 1000));
                const retryToken = await requestUserPermission();
                console.log('FCM Token Gen in Else Retry', retryToken);
                if (retryToken) {
                  // FCM token retrieved on retry
                  regFcm(retryToken, checkMember?.Id);
                  console.log('FCM Token Gen in if RetryToken', retryToken);

                } else {
                  console.log('FCM Token Er ', token);

                  console.error('Error While Getting Token!');
                }
              }
            };
             
            getToken();
          } else {
            console.error(
              'Error Ocurred While Getting User Nexedus ID: ',
              checkMember?.Id,
            );
          }

          var teamid = checkMember?.TeamIds;
          // console.log('----team--33 ID---', teamid);
          if (teamid) {
            dispatch(PendingStatus(teamid))
              .unwrap()
              .then(result => {
                console.log('result111--', result);

                //for user roles ,only admin has an access of full application
                dispatch(setAdministrator(checkMember?.IsTeamAdministrator));
                dispatch(setLoginUserId(checkMember?.Id));
                dispatch(setLoginUserName(checkMember?.UserFullName));
                dispatch(setTeamName(checkMember?.TeamNames));
                dispatch(setEmail(checkMember?.Email));
                if (result?.requestStatus === 'approved') {
                  navigation.reset({
                    index: 2,
                    routes: [
                      {
                        name: ScreensName.MeetingHomeScreen,
                        params: {administrator: false},
                      },
                    ],
                  });
                } else {
                  navigation.reset({
                    index: 1,
                    routes: [
                      {
                        name: ScreensName.HomeScreen,
                        params: {administrator: false},
                      },
                    ],
                  });
                }
              })
              .catch(error => {
                console.log(
                  'error111 pending status--',
                  error?.error?.statusCode,
                );

                if (error?.error?.statusCode === 404) {
                  dispatch(setAdministrator(checkMember?.IsTeamAdministrator));
                  dispatch(setLoginUserId(checkMember?.Id));
                  dispatch(setLoginUserName(checkMember?.UserFullName));
                  dispatch(setTeamName(checkMember?.TeamIds));
                  dispatch(setEmail(checkMember?.Email));
                  navigation.reset({
                    index: 1,
                    routes: [
                      {
                        name: ScreensName.HomeScreen,
                        params: {administrator: false},
                      },
                    ],
                  });
                }
              });
          }
          //If team Id doesnot exist , navigate to day pass home screen
          else {
            dispatch(setAdministrator(checkMember?.IsTeamAdministrator));
            dispatch(setLoginUserId(checkMember?.Id));
            dispatch(setLoginUserName(checkMember?.UserFullName));
            dispatch(setTeamName(checkMember?.TeamIds));
            dispatch(setEmail(checkMember?.Email));
            navigation.reset({
              index: 4,
              routes: [
                {
                  name: ScreensName.dayPassHomeScreen,
                  params: {administrator: false},
                },
              ],
            });
          }
        })
        .catch(error => {
          console.log('error111 tema----', error);

          navigation.reset({
            index: 1,
            routes: [
              {name: ScreensName.HomeScreen, params: {administrator: false}},
            ],
          });
        }).finally(()=>{
          setLoading(false);
          
        });

      //* Save Credentials in KeyChain
      handleSave(userName.value, password.value);
     
    }
   
    // setUserName({value: '', error: ''});
    // setPassword({value: '', error: ''});
   
  }, [loginDone, dispatch]);
  useEffect(() => {
    if (loginError === 'must_reset_password') {
      navigation.navigate(ScreensName.newPasswordScreen, {
        token: loginErrorToken,
      });
      setUserName({value: '', error: ''});
      setPassword({value: '', error: ''});
    }
  }, [loginError === 'must_reset_password']);
  useEffect(() => {
    let emailError;
    let passwordError;
    if (loginError === 'invalid_grant') {
      emailError = emailValidator(loginError);
      passwordError = passwordValidator(loginError);
    }
    setUserName({...userName, error: emailError});
    setPassword({...password, error: passwordError});
  }, [loginError === 'invalid_grant']);

  const onSubmit = async data => {
    try {
      await dispatch(login(data));
    } catch (error) {
      const errMsg = error;
      console.log('errMsg 22----', errMsg);
    }
    // console.log('--login--', data);
    console.log('9999--', loginDone);
    if (loginError === 'must_reset_password') {
      navigation.navigate(ScreensName.newPasswordScreen, {
        token: loginErrorToken,
      });
    } else if (loginDone?.access_token) {
      navigation.navigate(ScreensName.HomeScreen);
    } else if (loginError === 'invalid_grant') {
      let emailError = emailValidator(loginError);
      let passwordError = passwordValidator(loginError);
      setUserName({...userName, error: emailError});
      setPassword({...password, error: passwordError});
    } else {
      /* empty */
    }
  };

  useEffect(() => {
    dispatch(resetError());
  }, []);

  // *API Call (Register FCM)
  const regFcm = useCallback(async (token, id) => {
    try {
      const requiredData = {
        fcmToke: token,
        id,
      };
      const res = await dispatch(RegisterFCM(requiredData)).unwrap();
      console.log('Registring FCM Token Response is Here:------------->', res);
    } catch (error) {
      console.error('Error while Registering FCM: ', error);
      setError('Error while Registering FCM.');
    }
  }, []);

  //? Credentials Save Logic (Haseeb)
  // *Trigger the auto save password retrieving method after (2 Second)
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const result = await getSavedCredentials();
      // const result = []
      if (result) {
        setUsers(result);
        console.log('Saved Users:----------->', result);
        btmSavePassRef.current?.snapToIndex(0);
      } else {
        console.log('No Saved Credentials Found!');
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  //? Bottom Sheets Dep
  //* Forgot Password BTM
  const forgotBtm = useRef(null);
  const forgotBtmSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const renderForgotBackdropBottomSheet = useCallback(
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
  } = useBottomSheetDynamicSnapPoints(forgotBtmSnapPoints);
  //* Forgot Password Module (Bottom Sheet)
  const ForgotPassComp = () => {
    return (
      <BottomSheetView onLayout={handleContentLayout}>
        <ForgotPasswordComp
          route={() => forgotBtm.current?.closeBottomSheet()}
        />
      </BottomSheetView>
    );
  };

  const forgotBtmProps = {
    keyboardBehavior: 'interactive',
    keyboardBlurBehavior: 'restore',
    shouldMeasureContentHeight: true,
    handleHeight: animatedHandleHeight,
    contentHeight: animatedContentHeight,
    snapPoints: animatedSnapPoints,
    customBackDrop: renderForgotBackdropBottomSheet,
  };

  //* Saved Users BTM
  const btmSavePassRef = useRef(null);
  const snapPointsForSavedUsers = useMemo(() => ['40%'], []);
  const renderBackdropBottomSheet = useCallback(
    props => (
      <BottomSheetBackdrop
        BackdropPressBehavior={'close'}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    [],
  );
  //* Saved Credentials Module (Bottom Sheet)
  const SavedCredComp = () => {
    return (
      <BottomSheetScrollView style={styles.saveUsersContainer}>
        <Txt style={styles.saveUsersHeading}>Saved Credentials</Txt>
        <View style={{paddingBottom: 16}}>
          {users.length > 0 &&
            users.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.saveUsersListItemContainer}
                  onPress={() => {
                    btmSavePassRef.current?.close();
                    suggestSavedCredentials(
                      item.service,
                      onSubmit,
                      setUserName,
                      setPassword,
                      dispatch,
                    );
                  }}>
                  <Txt style={styles.saveUsersListItemText}>
                    {item.username}
                  </Txt>
                </TouchableOpacity>
              );
            })}
        </View>
      </BottomSheetScrollView>
    );
  };

  return (
    <Frame
      showBottomSheet={true}
      ref={forgotBtm}
      bottomSheetContent={ForgotPassComp}
      headerVariant={'v2'}
      bottomSheetProps={forgotBtmProps}
      customNavigation={{screen:ScreensName.SplashScreen}}
    //  bottomLogo
    >
      <View style={styles.mainContainer}>

    
        <View style={styles.innerContainer}>

          <View style={styles.loginImg}>
            <LoginLogo stroke={isDarkMode ? AppTheme.COLORS.white : null} />
          </View>
          <View style={styles.subContainer}>
            <Txt style={styles.title}>{Strings.loginToAccount}</Txt>
            <Txt style={styles.desc}>{Strings.checkEmailForCredentials}</Txt>
            <View style={styles.inputsContainer}>
              <View>
                <Input
                  hideTag={false}
                  Tag="Username"
                  value={userName.value}
                  autoCompleteType="email"
                  error={password.error || userName.error}
                  hideErrorContainer={true}
                  accessibilityLabel="Username"
                  onChangeText={text => {
                    setUserName({value: text, error: ''});
                    dispatch(resetError());
                  }}
                  onSubmitEditing={() => {
                    onSubmit({
                      username: userName.value,
                      password: password.value,
                      grant_type: 'password',
                    });
                  }}
                  InputStyling={styles.input}
                />
                <Input
                  hideTag={false}
                  Tag="Password"
                  inputType={'password'}
                  autoCompleteType="password"
                  error={password.error || userName.error}
                  errorDetail={password.error || userName.error}
                  value={password.value}
                  accessibilityLabel="password"
                  onChangeText={text => {
                    setPassword({value: text, error: ''});
                    dispatch(resetError());
                  }}
                  onSubmitEditing={() => {
                    onSubmit({
                      username: userName.value,
                      password: password.value,
                      grant_type: 'password',
                    });
                  }}
                  InputStyling={[styles.input, {marginBottom: 0}]}
                />
              </View>

              <View style={styles.loginBtnContainer}>
                <Botton
                  accessibilityLabel="loginBtn"
                  loading={load || loginPending || pendingStatusLoading}
                  title={'Login'}
                  disabled={
                    password.value != '' && userName.value != '' ? false : true
                  }
                  onPress={() => {
                    onSubmit({
                      username: userName.value,
                      password: password.value,
                      grant_type: 'password',
                    });
                    dispatch(setLoginUserName(userName.value));
                  }}
                />
                <TouchableOpacity
                  style={styles.forgotContainer}
                  onPress={() => {
                    forgotBtm.current?.expandBottomSheet();
                  }}>
                  <Txt style={styles.forgotTxt}>{Strings.forgotPassword}?</Txt>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.forgotContainer,{marginTop:AppTheme.SPACINGS.MARGINS.M1}]}
                  onPress={() => {
                    navigation.navigate(ScreensName.exporeFintechScreen);
                  }}>
                  <Txt style={styles.forgotTxt}>Apply for membership</Txt>
                </TouchableOpacity>
              </View>
             
            </View>
          </View>
        </View>
        <View style={styles.bottomImageContainer}>
          <View>
            <Svg width={'100%'}>
              {isDarkMode ? <FintechBottomLogoDark/> : 
                <FintechBottomLogo />
              }
            </Svg>
          </View>
        </View>
      </View>
      {/* Saved Users Bottom Sheet */}
      <BottomSheet
        ref={btmSavePassRef}
        snapPoints={snapPointsForSavedUsers}
        backdropComponent={renderBackdropBottomSheet}
        index={-1}
        enablePanDownToClose={true}
        enabledInnerScrolling={true}
        containerStyle={{
          zIndex: 2,
        }}
        backgroundStyle={{
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : AppTheme.COLORS.white,
        }}>
        <View style={{flex: 1}}>
          <SavedCredComp />
        </View>
      </BottomSheet>
    </Frame>
  );
};

export default LoginScreen;
