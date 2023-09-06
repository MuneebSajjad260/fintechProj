import {Text, View, SafeAreaView, Linking} from 'react-native';
import React, {useCallback, useState} from 'react';
import Svg from 'react-native-svg';
import {PrimaryButton} from '../primaryButton/PrimaryButton.js';
import styles from './ForgotPasssword.style.js';
import Strings from '../../constants/Strings.js';
import {Touchable} from '../touchable/index.js';
import {bottomSheetEmailValidator} from '../../utils/validationHelpers.js';

import Gmail from '../../../assets/images/gmail.svg';
import Mail from '../../../assets/images/mail.svg';
import Outlook from '../../../assets/images/outlook.svg';
import Txt from '../core/Txt.js';
import Input from '../core/Input.js';
import Botton from '../core/Botton.js';
import {ForgotPassword} from '../../redux/action/ForgotPassword.js';
import {useDispatch} from 'react-redux';

const ForgotPasswordComp = ({route}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState({value: '', error: ''});
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [showNextBtm, setShowNextBtm] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // *API Call (Forgot Password)
  const submitEmail = useCallback(async email => {
    try {
      setIsEmailSubmitted(true);
      const {statusCode} = await dispatch(ForgotPassword(email.toLowerCase())).unwrap();
      console.log('Response is Here:------------->', statusCode);
      if (statusCode == 200) {
        setShowNextBtm(true);
        setEmail({value: '', error: ''});
      } else {
        setShowNextBtm(false);
        setEmail({...email, error: 'Not a Valid Email!'});
      }
      setIsEmailSubmitted(false);
    } catch (error) {
      setShowNextBtm(false);
      setIsEmailSubmitted(false);
      console.error('Error while sending email: ', error);
      setError('Error while sending email.');
    }
  }, []);

  return (
    <View style={styles.fotgotMainContainer}>
      {!showNextBtm ? (
        <>
          <View>
            <Txt style={styles.forgotPasswordTxt}>{Strings.forgotPassword}</Txt>
            <Txt style={styles.subTitle}>{Strings.enterEmailAddress}</Txt>
            <Input
              isBottomSheetInput
              hideTag={false}
              Tag="Enter your email address"
              ContentContainerStyle={styles.input}
              onChangeText={text => {
                setEmail({value: text, error: ''});
              }}
              value={email.value}
              error={email.error}
              errorDetail={email.error}
            />
          </View>
          <Botton
            loading={isEmailSubmitted}
            title={Strings.sendEmail}
            disabled={!email.value}
            onPress={() => {
              submitEmail(email.value);
            }}
            singleButtonStyle={styles.BtmBtn}
          />
        </>
      ) : (
        <>
          <View>
            <Txt style={styles.forgotPasswordTxt}>{Strings.checkEmail}</Txt>
            <Txt style={styles.subTitle}>{Strings.forgotPasswordSent}</Txt>
            <View style={styles.iconContainer}>
              <Touchable
                onPress={() => {
                  Linking.openURL('googlegmail://').catch(() => {
                    console.log('Failed to open Gmail');
                  });
                }}>
                <Svg width={'100%'}>
                  <Gmail />
                </Svg>
              </Touchable>
              <View>
                <Svg width={'100%'}>
                  <Outlook />
                </Svg>
              </View>
              <View>
                <Svg width={'100%'}>
                  <Mail />
                </Svg>
              </View>
            </View>
          </View>
          <Botton title={Strings.login} disabled={false} onPress={route} />
        </>
      )}
    </View>
  );
};

export default ForgotPasswordComp;
