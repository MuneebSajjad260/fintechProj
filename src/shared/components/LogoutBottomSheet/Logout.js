import {Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {Svg} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {logout} from '../../redux/action/user.js';
import {resetUser} from '../../redux/slices/authSlice.js';
import {PrimaryButton} from '../primaryButton/PrimaryButton.js';
import {SecondaryButton} from '../secondaryButton/SecondaryButton.js';
import styles from './Logout.style';

import LogoutBs from '../../../assets/images/LogoutBs.svg';
import {ScreensName} from '../../constants/ScreensStrings.js';

const Logout = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {bottomSheetRef} = props;

  const onSubmit = async () => {
    dispatch(logout());
    dispatch(resetUser());
    bottomSheetRef.current?.close();
    navigation.reset({
      index: 3,
      routes: [{name: ScreensName.Login}],
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <>
          <View>
            <View style={styles.logoutImg}>
              <Svg width={'100%'}>
                <LogoutBs />
              </Svg>
            </View>
            <Text style={styles.subTitle}>
              {'Are you sure you want to '}
              <Text style={styles.logoutTxt}>Logout?</Text>
            </Text>
          </View>
          <View style={styles.allignInRow}>
            <SecondaryButton
              accessibilityLabel="logoutno"
              loading={false}
              title={'No'}
              disabled={false}
              small={false}
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
              styleMainContainer={styles.BtnStyle}
            />

            <PrimaryButton
              accessibilityLabel="logoutYes"
              loading={false}
              title={'Yes'}
              disabled={false}
              small={false}
              onPress={() => {
                onSubmit();
              }}
              stylesContainer={styles.BtnStyle}
            />
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};

export default Logout;
