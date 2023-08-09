/* eslint-disable no-unused-vars */
import {View} from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';
import {useCallback, useState, useEffect, useLayoutEffect} from 'react';
import {AppTheme} from '../../shared/theme/index.js';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import styles from './ChangePasswordScreen.style';
import Strings from '../../shared/constants/Strings';
import {
  confirmPasswordValidator,
  setPasswordValidator,
} from '../../shared/utils/validationHelpers.js';
import GUIDLINES_PASSWORD from '../../shared/datasets/passwordGuidline';
import SetPasswordLogo from '../../assets/images/setPasswordScreenLogo.js';
import Diamond from '../../assets/images/Rectangle.svg';
import ErrorDiamond from '../../assets/images/errorRectangle.svg';
// *API
import {GetNexudusResources} from '../../shared/redux/action/GetNexudusResources';
import {UpdatePassword as UpdatePasswordAPI} from '../../shared/redux/action/UpdatePassword';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {logout} from '../../shared/redux/action/user.js';
import {resetUser} from '../../shared/redux/slices/authSlice.js';
import {deleteKeychainItem} from '../../shared/utils/keychain.js';
import Frame from '../../shared/components/core/Frame';
import Input from '../../shared/components/core/Input';
import Txt from '../../shared/components/core/Txt.js';
import Botton from '../../shared/components/core/Botton.js';

const ChangePasswordScreen = ({navigation, route}) => {
  const [password, setPassword] = useState({value: '', error: ''});
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
    status: '',
  });
  const [error, setError] = useState(null);
  const [guidlinesData, setGuidlinesData] = useState(GUIDLINES_PASSWORD);
  const [btnText, setBtnText] = useState('Update Password');
  const {Id, Email} = useSelector(selectUserData);
  const {access_token} = route.params;
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  // *Change The Screen Title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.changePasswordScreen,
    });
  }, []);

  // *Manage Error States
  const onSelectError = () => {
    const { error } = password;
    guidlinesData.forEach(item => {
      switch (error) {
        case item.id:
          item.status = true;
          break;
        case 5:
          if (item.id) item.status = true;
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

  // *Validate The Passwords
  useEffect(() => {
    const passwordError = setPasswordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(
      password.value,
      confirmPassword.value,
    );

    if (passwordError) {
      console.log('error1-', passwordError);
      passwordError.id?.map(error => {
        console.log('item-', error);
        setPassword({...password, error: error.id});
      });
    }

    if (confirmPasswordError) {
      setConfirmPassword({
        ...confirmPassword,
        error: confirmPasswordError.error,
        status: confirmPassword.status,
      });
      // console.log("confirmPass-", confirmPassword)
      // console.log("confirmPass1-", confirmPasswordError)
    }

    onSelectError();
  }, [password.error, confirmPassword.error]);

  // ?API Logic
  // *API Module
  const updatePasswordModule = useCallback(
    async password => {
      try {
        setIsRequestSubmitted(true);
        const data = {
          token: access_token,
          data: {password},
          id: Id,
        };
        const PasswordUpdated = await dispatch(
          UpdatePasswordAPI(data),
        ).unwrap();
        // Clear States
        setPassword({value: '', error: ''});
        setConfirmPassword({value: '', error: ''});
        // Logout
        dispatch(logout());
        dispatch(resetUser());
        navigation.reset({
          index: 3,
          routes: [{name: ScreensName.Login}],
        });
        // Delete the Entry from KeyChain (Saved Users)
        deleteKeychainItem(Email);
        console.log('API Responses Here:--------------->', PasswordUpdated);
        setIsRequestSubmitted(false);
      } catch (error) {
        setIsRequestSubmitted(false);
        console.error('Error while getting Nexudus resources: ', error);
        setError('Error while getting Nexudus resources.');
      }
    },
    [dispatch, access_token],
  );

  const onSubmit = data => {
    if (password.error === 4 && password.value === confirmPassword.value) {
      updatePasswordModule(data.newPassword);
      setBtnText('Logging out');
    }
  };

  return (
    <Frame
      screenTitle={'Change Password'}
      containerStyle={{justifyContent: 'space-between'}}
      style={{padding: AppTheme.SPACINGS.PADDINGS.P1}}>
      <View>
        <View style={styles.setPasswordImg}>
          <View>
            <SetPasswordLogo
              stroke={isDarkMode ? AppTheme.COLORS.white : null}
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <Txt style={styles.title}>{Strings.setupNewPassword}</Txt>
          <Txt style={styles.desc}>{Strings.keepYourAccountSafe}</Txt>
          <View style={styles.guidlinesContainer}>
            <Txt style={styles.guidlinesTitleTxt}>
              {Strings.followGuidlines}
            </Txt>
            {guidlinesData.map((item, index) => (
              <View style={styles.guidlineTxtContainer} key={index}>
                <View style={styles.icon}>
                  <Svg width={'100%'}>
                    {item?.status ? <ErrorDiamond /> : <Diamond />}
                  </Svg>
                </View>
                {
                  <Txt
                    style={
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
              Tag="New Password"
              hideTag={false}
              accessibilityLabel="newPassword"
              value={password.value}
              onChangeText={text => {
                setPassword({value: text, error: ''});
              }}
              onSubmitEditing={onSubmit}
              inputType={'password'}
            />
            <Input
              accessibilityLabel="confirmPassword"
              hideTag={false}
              Tag="Confirm New Password"
              error={
                confirmPassword.error === 'password match'
                  ? null
                  : confirmPassword.error
              }
              errorDetail={"Password don't match"}
              value={confirmPassword.value}
              onChangeText={text => {
                setConfirmPassword({value: text, error: ''});
                console.log('confirm password', confirmPassword);
              }}
              onSubmitEditing={onSubmit}
              inputType={'password'}
              ContentContainerStyle={{marginTop: AppTheme.SPACINGS.MARGINS.M1}}
            />
          </View>
        </View>
      </View>
      <Botton
        accessibilityLabel="updatePassword"
        loading={isRequestSubmitted}
        title={btnText}
        disabled={
          password.value != '' &&
          confirmPassword.value != '' &&
          guidlinesData.find(item => item.id === 9)?.status !== true &&
          password.value === confirmPassword.value
            ? false
            : true

        }
        onPress={() => onSubmit({newPassword: password.value})}
        singleButtonStyle={{marginVertical: AppTheme.SPACINGS.MARGINS.M1}}
      />
    </Frame>
  );
};

export default ChangePasswordScreen;
