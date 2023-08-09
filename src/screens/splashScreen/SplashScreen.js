import {
  StatusBar,
  View,
  Animated,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import normalize from 'react-native-normalize';
import {useDispatch, useSelector} from 'react-redux';

// import { PendingStatus } from '../../shared/redux/action/PendingStatus';
import {
  setAdministrator,
  setLoginUserId,
  setLoginUserName,
  setTeamName,
  setEmail,
  setUserData,
} from '../../shared/redux/slices/isadminSlice';
// import { GetTeam } from '../../shared/redux/action/GetTeam';
import {GetProfile} from '../../shared/redux/action/GetProfile';
import {PendingStatus} from '../../shared/redux/action/PendingStatus';
import {SecondaryButton} from '../../shared/components';
import {AppTheme} from '../../shared/theme';
import Frame from '../../shared/components/core/Frame';
import styles from './SplashScreen.style';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import {Images} from '@themes';
import {AppText} from '../../shared/components/index.js';
import Strings from '../../shared/constants/Strings.js';

const SplashScreen = ({navigation}) => {
  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;
  const dispatch = useDispatch();
  // const userName=useSelector(selectLoginUserName);
  // console.log('username splash screen ---', userName);
  const loginData = useSelector(state => state.auth?.data);
  const token = loginData?.access_token;
  console.log('token--', token);

  const translation = useRef(new Animated.Value(0)).current;

  const [img, setImg] = useState(0);

  useEffect(() => {
    Animated.timing(translation, {
      toValue: -(deviceHeight / 5),
      duration: 600,
      delay: 4500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let subscribe = true;

    setTimeout(() => {
      setImg(1);
    }, 4500);

    return () => {
      subscribe = false;
    };
  }, []);

  useEffect(() => {
    if (token) {
      //HERE IM CHECKING IF PENDING STATUS IS APPROVED THEN GO TO MEETING HOME SCREEN ELSE GO TO HOME SCREEN
      dispatch(GetProfile(token))
        .unwrap()
        .then(result => {

          console.log('result profile--',result);

          // check result
          // let AllTeamMembers = result[0]?.AllTeamMembers;
          // eslint-disable-next-line no-unsafe-optional-chaining
          // const checkMember=AllTeamMembers?.find((item)=>{ return (item?.Email).toLowerCase() === userName.toLowerCase();});
          // console.log('----login 909090 spalsh screen ---', checkMember);
          // const allTeamMembers=result?.find((item)=>{ return item;});
          // console.log('result----',result);
          let checkMember = result.find(item => {
            return item.CoworkerType === 1;
          });
          console.log('checkMember--',checkMember);
        
          dispatch(setUserData(checkMember));
          var teamid = checkMember?.TeamIds;
          console.log('----team--33 ID spalsh ---', teamid);
          if (teamid) {
            dispatch(PendingStatus(teamid))
              .unwrap()
              .then(result => {
                console.log('result111 spalsh--', result);

                //for user roles ,only admin has an access of full application
                dispatch(setAdministrator(checkMember?.IsTeamAdministrator));
                dispatch(setLoginUserId(checkMember?.Id));
                dispatch(setLoginUserName(checkMember?.UserFullName));
                dispatch(setTeamName(checkMember?.TeamNames));
                dispatch(setEmail(checkMember?.Email));
                if (result?.requestStatus === 'approved') {
                  setTimeout(() => {
                    navigation.reset({
                      index: 1,
                      routes: [{name: ScreensName.MeetingHomeScreen}],
                    });
                  }, 1500);
                } else {
                  setTimeout(() => {
                    navigation.reset({
                      index: 1,
                      routes: [
                        {
                          name: ScreensName.HomeScreen,
                          params: {administrator: false},
                        },
                      ],
                    });
                  }, 1500);
                }
              })
              .catch(error => {
                console.log(
                  'error111 pending status--',
                  error?.error?.statusCode,
                );

                dispatch(setAdministrator(checkMember?.IsTeamAdministrator));
                dispatch(setLoginUserId(checkMember?.Id));
                dispatch(setLoginUserName(checkMember?.UserFullName));
                dispatch(setTeamName(checkMember?.TeamNames));
                dispatch(setEmail(checkMember?.Email));
                if (error?.error?.statusCode === 404) {
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
          console.log('error111--', error);
        });
    }
  }, []);

  return (
    <Frame mode={'View'} headerVariant={'blank'}>
      <View
        style={styles.mainContainer}
        shouldRasterizeIOS
        renderToHardwareTextureAndroid>
        {!token ? (
          <View style={styles.spaceEven}>
            <View style={styles.imgcontainer}>
              <Animated.Image
                style={
                  img
                    ? [
                      styles.img,
                      {
                        transform: [{translateY: translation}],
                      },
                    ]
                    : styles.img
                }
                source={Images.Logonfin[img]}
              />
            </View>
            {img ? (
              <View style={styles.textContainer}>
                <AppText style={styles.fintechText}>Fintech Hub</AppText>
                <AppText style={styles.introText}>
                  {Strings.splashScreenIntro}
                </AppText>
                <View style={styles.btnAllignment}>
                  <SecondaryButton
                    accessibilityLabel="exploreBtn"
                    title={'Apply'}
                    small={false}
                    onPress={() => {
                      navigation.navigate(ScreensName.exporeFintechScreen);
                    }}
                    styleMainContainer={styles.secondaryBtnContainer}
                  />
                  <SecondaryButton
                    accessibilityLabel="loginBtn"
                    title={'Login'}
                    small={false}
                    onPress={() => {
                      navigation.navigate(ScreensName.Login);
                    }}
                    styleMainContainer={styles.secondaryBtnContainer2}
                  />
                </View>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.tokenImg}>
            <Image
              style={[styles.img, {marginTop: normalize(260)}]}
              source={Images.Logonfin[0]}
            />
          </View>
        )}
      </View>
    </Frame>
  );
};
export default SplashScreen;
