import {Pressable, Text, View} from 'react-native';
import React from 'react';
import PlusIcon from '../../../assets/images/PlusIcon.js';
import styles from './HelpDeskOutLineButton.Style';
import PropTypes from 'prop-types';
import Txt from '../core/Txt';
import {useSelector} from 'react-redux';
import {AppTheme} from '../../theme';

export default function HelpDeskOutLineButton({onPress, accessibilityLabel}) {
  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[isDarkMode ? styles.darkContainer : styles.container]}>
      <View style={styles.innerContainer}>
        <PlusIcon color={AppTheme.COLORS.white} />
        <Txt style={styles.text}>Ask for Help</Txt>
      </View>
    </Pressable>
  );
}

HelpDeskOutLineButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  accessibilityLabel: PropTypes.string.isRequired,
};
