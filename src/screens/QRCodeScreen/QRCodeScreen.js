import React, {useState, useEffect, useCallback} from 'react';
import {View, Vibration, ActivityIndicator} from 'react-native';
import styles from './QRCodeScreen.Style';
import Frame from '../../shared/components/core/Frame';
import QRMainIcon from '../../assets/images/QRMainIcon.js';
import Txt from '../../shared/components/core/Txt';
import QRCode from 'react-native-qrcode-svg';
import {useDispatch, useSelector} from 'react-redux';
import {AppTheme} from '../../shared/theme';
import {QRCodeGenerator} from '../../shared/redux/action/QRCodeGenerator';
import {GetQRCodeAccessStatus} from '../../shared/redux/action/GetQRCodeAccessStatus';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import moment from 'moment';
// import DeviceBrightness from '@adrianso/react-native-device-brightness';

export default function QRCodeScreen() {
  const [qrValue, setQrValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrGenTime, setQrGenTime] = useState(null);
  const [actualBrightness, setActualBrightness] = useState(null);
  const [accessGranted, setAccessGranted] = useState(false);
  const dispatch = useDispatch();
  const {Id} = useSelector(selectUserData);
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  //* Vibration Logic
  //* Pattern
  const ONE_SECOND_IN_MS = 1000;
  const ONE_SECOND_IN_MS_ERROR = 400;
  const PATTERN = [
    0.6 * ONE_SECOND_IN_MS_ERROR,
    0.6 * ONE_SECOND_IN_MS_ERROR,
    0.6 * ONE_SECOND_IN_MS_ERROR,
    0.6 * ONE_SECOND_IN_MS_ERROR,
  ];
  //* Methods
  // Vibration.vibrate(PATTERN)
  // Vibration.vibrate()
  // Vibration.vibrate(1 * ONE_SECOND_IN_MS)
  // Vibration.cancel()

  //* Setting brightness
  // useEffect(() => {
  //   DeviceBrightness.setBrightnessLevel(1);
  //   return () => {
  //     DeviceBrightness.getSystemBrightnessLevel().then(e => {
  //       DeviceBrightness.setBrightnessLevel(e);
  //       // console.log(e);
  //     });
  //   };
  // }, []);

  const handleQR = useCallback(
    async id => {
      try {
        setLoading(true);
        setAccessGranted(false);
        const {data, message} = await dispatch(QRCodeGenerator(id)).unwrap();
        if (message === 'success') {
          setQrValue(data);
          setQrGenTime(moment().format('YYYY-MM-DD HH:mm:ss'));
          setError(null);
          setAccessGranted(false);
        } else {
          setQrValue(null);
          setAccessGranted(false);
          setError('Something went wrong, please try again');
        }
        setLoading(false);
      } catch (error) {
        setAccessGranted(false);
        setQrValue(null);
        setLoading(false);
        console.error('Error while generating QR details: ', error);
        setError(error.error.message);
      }
    },
    [dispatch, Id],
  );

  useEffect(() => {
    handleQR(Id);
  }, []);

  useEffect(() => {
    if (qrGenTime) {
      const accessStatusTimer = setTimeout(async () => {
        try {
          const {data: accessStatus} = await dispatch(
            GetQRCodeAccessStatus(Id),
          ).unwrap();
          const eventTime = moment(
            accessStatus[0].eventTime,
            'YYYY-MM-DD HH:mm:ss',
          );
          if (eventTime.isAfter(qrGenTime)) {
            setAccessGranted(true);
            Vibration.vibrate(1 * ONE_SECOND_IN_MS);
          }
          Vibration.vibrate(PATTERN);
          console.log('Event Time:', eventTime.format('YYYY-MM-DD HH:mm:ss'));
          console.log('QR Gen Time:', qrGenTime);
        } catch (error) {
          Vibration.vibrate(PATTERN);
          console.error('Error while getting QR code access status: ', error);
        }
      }, 10000);

      return () => {
        clearTimeout(accessStatusTimer);
      };
    }
  }, [dispatch, Id, qrGenTime]);

  return (
    <Frame
      preventScreenShoot={true}
      containerStyle={styles.container}
      headerVariant={'v2'}>
      <View style={styles.headingContainer}>
        <QRMainIcon stroke={isDarkMode ? AppTheme.COLORS.white : null} />
        <Txt style={styles.heading}>Access Code</Txt>
      </View>

      <View style={styles.qrContainer}>
        {loading ? (
          <ActivityIndicator
            color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}
            size={'large'}
          />
        ) : qrValue ? (
          <View style={styles.qrContainer}>
            <QRCode
              color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}
              backgroundColor={'transparent'}
              size={250}
              value={qrValue}
            />
          </View>
        ) : null}
      </View>

      <View style={styles.logContainer}>
        <Txt
          style={[
            error ? styles.errorText : styles.logTxt,
            accessGranted && {color: AppTheme.COLORS.green},
          ]}>
          {error
            ? `${error}`
            : accessGranted
            ? 'Access Granted'
            : 'Position your device in front of \n lock Scanner'}
        </Txt>
      </View>
    </Frame>
  );
}
