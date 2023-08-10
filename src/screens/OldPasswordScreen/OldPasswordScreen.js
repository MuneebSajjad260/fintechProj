import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {Svg} from 'react-native-svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './OldPasswordScreen.style';
import GUIDLINES_PASSWORD from '../../shared/datasets/passwordGuidline';
import {AppTheme} from '../../shared/theme/index.js';
import {setPasswordValidator} from '../../shared/utils/validationHelpers.js';
import Strings from '../../shared/constants/Strings';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Input from '../../shared/components/core/Input';
import Botton from '../../shared/components/core/Botton';
// *API
import {useDispatch, useSelector} from 'react-redux';
import {VerifyUser} from '../../shared/redux/action/VerifyUser';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
//* Icons
import SetPasswordLogo from '../../assets/images/setPasswordScreenLogo.js';

const OldPasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState({value: '', error: ''});
  const [error, setError] = useState(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const dispatch = useDispatch();
  const {Email} = useSelector(selectUserData);

  // ?API Logic
  // *API Modules
  const updatePasswordFunc = useCallback(
    async data => {
      try {
        setIsRequestSubmitted(true);
        const {access_token} = await dispatch(VerifyUser(data)).unwrap();
        console.log('API Response Here:--------------->', access_token);
        setIsPasswordMatch(true);
        navigation.navigate(ScreensName.updatePassword, {access_token});
        setIsRequestSubmitted(false);
        setPassword({value: '', error: ''});
      } catch (error) {
        setIsPasswordMatch(false);
        setIsRequestSubmitted(false);
        console.error('Error while checking user details: ', error);
        setError('Error while checking user details.');
      }
    },
    [dispatch, Email],
  );

  const onSubmit = () => {
    if (password.value !== '') {
      const rawData = {
        grant_type: 'password',
        username: Email,
        password: password.value,
      };
      const formData = new URLSearchParams(rawData).toString();
      updatePasswordFunc(formData);
    }
  };

  return (
    <Frame>
      <KeyboardAwareScrollView
        // eslint-disable-next-line no-undef
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.mainContainer}>
          <View style={styles.setPasswordImg}></View>
          <View style={styles.guidlinesContainer}>
              <SetPasswordLogo
                stroke={isDarkMode ? AppTheme.COLORS.white : null}
                width={42}
                height={42}
              />
            <View style={styles.content}>
              <Txt style={styles.guidlinesTitleTxt}>
                Please enter your current password
              </Txt>
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <Input
              accessibilityLabel="oldPassword"
              Tag="Current Password"
              hideTag={false}
              value={password.value}
              inputType={'password'}
              onChangeText={text => {
                setPassword({value: text, error: ''});
                setIsPasswordMatch(true);
              }}
              onSubmitEditing={onSubmit}
              error={!isPasswordMatch}
              errorDetail={'Entered password is incorrect!'}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Botton
            accessibilityLabel="verifyBtn"
            loading={isRequestSubmitted}
            title={'Verify'}
            disabled={password.value != '' ? false : true}
            onPress={() => onSubmit({newPassword: password.value})}
          />
        </View>
      </KeyboardAwareScrollView>
    </Frame>
  );
};

export default OldPasswordScreen;
