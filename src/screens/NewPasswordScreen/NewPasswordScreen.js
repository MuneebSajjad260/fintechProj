import {View, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';
import {useRef, useCallback, useState, useEffect} from 'react';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import BottomSheet, {
//   BottomSheetBackdrop,
//   useBottomSheetDynamicSnapPoints,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
// import { logout } from '../../redux/action/user.js';
// import { resetUser } from '../../redux/slices/authSlice.js';
import {clearSetPassword} from '../../shared/redux/action/user.js';
import {resetPassword} from '../../shared/redux/slices/authSlice.js';
import {newPassword} from '../../shared/redux/action/setPassword.js';
import {PrimaryButton} from '@components';
import {AppTheme} from '../../shared/theme/index.js';
import TextInput from '../../shared/components/text-input/Textinput.js';
import styles from './NewPasswordScreen.Style.js';
import Frame from '../../shared/components/core/Frame.js';
import Txt from '../../shared/components/core/Txt.js';
import Input from '../../shared/components/core/Input.js';
import Botton from '../../shared/components/core/Botton.js';
import Strings from '../../shared/constants/Strings.js';
import {
  confirmPasswordValidator,
  setPasswordValidator,
} from '../../shared/utils/validationHelpers.js';
import GUIDLINES_PASSWORD from '../../shared/datasets/passwordGuidline.js';
import {AppText} from '../../shared/components/index.js';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import SetPasswordLogo from '../../assets/images/setPasswordScreenLogo.js';
import Diamond from '../../assets/images/Rectangle.svg';
import ErrorDiamond from '../../assets/images/errorRectangle.svg';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
import SavePassword from '../../shared/components/SavePasswordComp/SavePassword.js';

export default NewPasswordScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {token} = route.params;
  // console.log("token", token)
  const bottomSheetRef = useRef(null);
  const snapPoints = React.useMemo(() => ['CONTENT_HEIGHT'], []);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const newPassPending=useSelector(state=>state?.newPassword?.loading);
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
    status: '',
  });
  const [guidlinesData, setGuidlinesData] = useState(GUIDLINES_PASSWORD);

  const onSelectError = () => {
    guidlinesData.forEach(item => {
      switch (password.error) {
        case item.id:
          item.status = true;
          break;
        case 5:
          item.status = !!item.id;
          break;
        case 6:
          item.status = [1, 2, 9].includes(item.id);
          break;
        case 7:
          item.status = [1, 3, 9].includes(item.id);
          break;
        case 8:
          item.status = [2, 3, 9].includes(item.id);
          break;
        default:
          item.status = false;
          break;
      }
    });
    setGuidlinesData([...guidlinesData]);
  };
  

  // const renderBackdropBottomSheet = useCallback(
  //   props => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       BackdropPressBehavior="close"
  //       disappearsOnIndex={-1}
  //       appearsOnIndex={0}
  //     />
  //   ),
  //   [],
  // );

  // const {
  //   animatedHandleHeight,
  //   animatedSnapPoints,
  //   animatedContentHeight,
  //   handleContentLayout,
  // } = useBottomSheetDynamicSnapPoints(snapPoints);

  useEffect(() => {
    handleSetPasswordError();
    // handleConfirmPasswordError()
    onSelectError();
  }, [password.error]);

  useEffect(() => {
    handleConfirmPasswordError();
  }, [confirmPassword.error]);

  const handleConfirmPasswordError = () => {
    const confirmPasswordError = confirmPasswordValidator(
      password.value,
      confirmPassword.value,
    );

    if (confirmPasswordError) {
      setConfirmPassword({
        ...confirmPassword,
        error: confirmPasswordError.error,
        status: confirmPassword.status,
      });
      // console.log("confirmPass-", confirmPassword)
      // console.log("confirmPass1-", confirmPasswordError)

      return;
    }
  };
  const handleSetPasswordError = () => {
    const passwordError = setPasswordValidator(password.value);

    if (passwordError) {
      console.log('error1-', passwordError);
      {
        passwordError.id?.map(error => {
          console.log('item-', error);
          // console.log("hello", item.id)
          setPassword({...password, error: error.id});
        });
      }
      // console.log("setpassword-", password)
      return;
    }
  };

  const onSubmit = data => {
    console.log('data----', data);
    if (password.error === 4 && password.value === confirmPassword.value) {
      dispatch(newPassword(data))
        .unwrap()
        .then(result => {
          console.log('result new pass--', result);
          navigation.navigate(ScreensName.Login);
        })
        .then(err => {
          console.log('new pass err----', err);
        });
      dispatch(resetPassword());
      dispatch(clearSetPassword());
    //  bottomSheetRef.current?.snapToIndex(0);
    }
  };
  return (
    <Frame
      headerVariant={'blank'}
    >
      <KeyboardAwareScrollView
        // eslint-disable-next-line no-undef
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <View style={styles.setPasswordImg}>
            <View>
              <SetPasswordLogo
                stroke={isDarkMode ? AppTheme.COLORS.white : null}
              />
            </View>
          </View>
          <View style={styles.subContainer}>
            <Txt style={styles.title}>{Strings.setupNewPassword}</Txt>
            <Txt style={styles.desc}>
              {Strings.keepYourAccountSafe}
            </Txt>
            <View style={styles.guidlinesContainer}>
              <Txt style={styles.guidlinesTitleTxt}>
                {Strings.followGuidlines}
              </Txt>
              {/* {console.log("ab", password.error)} */}
              {guidlinesData.map((item, index) => (
                <View style={styles.guidlineTxtContainer} key={index}>
                  {/* {console.log("a", password.error, 'b', item.id)} */}
                  <View style={styles.icon}>
                    <Svg width={'100%'}>
                      {item?.status ? <ErrorDiamond /> : <Diamond />}
                    </Svg>
                  </View>
                  {
                    <Txt
                      style={
                        // password.error === item.id ?
                        item?.status
                          ? [
                            styles.guidlinesTxt,
                            {
                              color: AppTheme.COLORS.error,
                              fontFamily: AppTheme.FONTS.TYPE.REGULAR,
                            },
                          ]
                          : styles.guidlinesTxt
                      }>
                      {item?.title}
                    </Txt>
                  }
                </View>
              ))}
            </View>
            <View>
              <Input
                hideTag={false}
                inputType={'password'}
                Tag="New Password"
                // error={password.error}
                value={password.value}
                password={true}
                hideErrorContainer={true}
                styleLabel={styles.textInputLabel}
                onChangeText={text => {
                  setPassword({value: text, error: ''});
                  // console.log("password", password)
                }}
                returnKeyType="done"
                onSubmitEditing={() =>
                  onSubmit({newPassword: password.value, token: token})
                }
                InputStyling={
                  password.error &&
                    password.error != -1 &&
                    password.error != 4
                    ? [styles.inputContainer,{borderColor: AppTheme.COLORS.error, borderWidth: 0.5}]
                    : styles.inputContainer
                }
              />
              <Input
                inputType={'password'}
                hideTag={false}
                Tag="Confirm New Password"
                error={
                  confirmPassword.error === 'password match'
                    ? null
                    : confirmPassword.error
                }
                errorDetail={confirmPassword.error}
                value={confirmPassword.value}
                password={true}
                hideErrorContainer={true}
                styleLabel={styles.textInputLabel}
                onChangeText={text => {
                  setConfirmPassword({value: text, error: ''});
                  console.log('confirm password', confirmPassword);
                }}
                returnKeyType="done"
                onSubmitEditing={() =>
                  onSubmit({newPassword: password.value, token: token})
                }
                InputStyling={styles.inputContainer}
                ContentContainerStyle={styles.newPassCont}
              />
              <View style={styles.btnContainer}>
                <Botton
                  loading={ newPassPending ? true : false}
                  title={'Set new password'}
                  disabled={
                    password.value != '' &&
                      confirmPassword.value != '' &&
                      guidlinesData.find(item => item.id === 9)?.status !== true &&
                      password.value === confirmPassword.value
                      ? false
                      : true
                  }
                  // disabled={false}
                  small={false}
                  // onPress={() => navigation.navigate(ScreensName.welcomeToFintech)}
                  onPress={() =>
                    onSubmit({newPassword: password.value, token: token})
                  }
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.fintechBottomLogo}>
          <View>
            <Svg width={'100%'}>
              <FintechBottomLogo />
            </Svg>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={animatedSnapPoints}
        enablePanDownToClose={true}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackdropBottomSheet}
        shouldMeasureContentHeight={true}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backgroundStyle={{
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : AppTheme.COLORS.white,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#D9D9D966',
        }}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <SavePassword
            onSave={() => {
              navigation.navigate(ScreensName.Login);
              bottomSheetRef.current?.close();
            }}
            onReject={() => {
              bottomSheetRef.current?.close();
            }}
            // newPassword={password.value}
            // token={token}
          />
        </BottomSheetView>
      </BottomSheet> */}
    </Frame>
  );
};
