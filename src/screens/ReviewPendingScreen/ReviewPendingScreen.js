import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './ReviewPendingScreen.Style';
// Icons
import ReviewPendingIcon from '../../assets/images/ReviewPendingIcon.js';
// Components
import {PrimaryButton} from '../../shared/components';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import {AppTheme} from '../../shared/theme';
import {useSelector} from 'react-redux';
import Botton from '../../shared/components/core/Botton';

export default function ReviewPendingScreen({navigation}) {
  // *Change The Screen Title
  useEffect(() => {
    navigation.setOptions({
      title: 'Review Pending',
    });
  }, []);

  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  return (
    <Frame screenTitle={'Review Pending'} containerStyle={styles.container}>
      {/* Body */}
      <View style={styles.content}>
        {/* Icon */}
        <ReviewPendingIcon stroke={isDarkMode ? '#fff' : '#000'} />
        {/* Heading */}
        <Txt style={styles.heading}>Your approval is pending!</Txt>
        {/* Description */}
        <Txt style={styles.description}>
          Your receipt has been uploaded, is being reviewed by {'\n'} our team,
          you will be notified via notification.
        </Txt>
      </View>
      {/* Button */}
      <Botton
        accessibilityLabel="mainMenu"
        loading={false}
        title={'Go to main menu'}
        disabled={false}
        onPress={() => navigation.navigate(ScreensName.MembershipDetails)}
        singleButtonStyle={{width: '100%'}}
      />
    </Frame>
  );
}
