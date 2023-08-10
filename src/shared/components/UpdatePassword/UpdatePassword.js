import {Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {PrimaryButton} from '../primaryButton/PrimaryButton.js';
import {ScreensName} from '../../constants/ScreensStrings.js';
import styles from './UpdatePassword.style';

const UpdatePassword = () => {
  const navigation = useNavigation();

  const onSubmit = () => {
    navigation.navigate(ScreensName.mainMenuScreen);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <>
          <View>
            <Text style={styles.updatePasswordTxt}>Password Updated</Text>
            <Text style={styles.subTitle}>You password has been updated</Text>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton
              accessibilityLabel='backToMenuBtn'
              loading={false}
              title={'Back to menu'}
              disabled={false}
              small={false}
              onPress={() => {
                onSubmit();
              }}
            />
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassword;
