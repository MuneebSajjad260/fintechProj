import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './HelpDeskHeader.Style';
import {Divider} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Txt from '../core/Txt';
import {AppTheme} from '../../theme';

export default function HelpDeskHeader({
  isSelected,
  setIsSelected,
  tabOneText,
  tabTwoText,
}) {
  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityLabel={`${tabOneText} Button`}
        onPress={() => setIsSelected(tabOneText)}
        style={[
          styles.tabView,
          isSelected === tabOneText ? styles.borderOpen : undefined,
        ]}>
        <Txt
          style={[
            isSelected === tabOneText ? styles.tabOneTitleActive : styles.title,
          ]}>
          {tabOneText}
        </Txt>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={`${tabTwoText} Button`}
        onPress={() => setIsSelected(tabTwoText)}
        style={[
          styles.tabView,
          isSelected === tabTwoText ? styles.borderClosed : undefined,
        ]}>
        <Txt
          style={[
            isSelected === tabTwoText ? styles.tabTwoTitleActive : styles.title,
          ]}>
          {tabTwoText}
        </Txt>
      </TouchableOpacity>
      <Divider style={[isDarkMode ? styles.darkModeDivider : styles.divider]} />
    </View>
  );
}

HelpDeskHeader.propTypes = {
  isSelected: PropTypes.string.isRequired,
  setIsSelected: PropTypes.func.isRequired,
  tabOneText: PropTypes.string.isRequired,
  tabTwoText: PropTypes.string.isRequired,
};
