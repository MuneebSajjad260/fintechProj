import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './TabHeader.Style';
import {Divider} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Txt from '../core/Txt';
import { AppTheme } from '../../theme';


export default function TabHeader({
  isSelected,
  setIsSelected,
  tabOneText,
  tabTwoText,
  status,
}) {
  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityLabel={`${tabOneText} Button`}
        onPress={() => setIsSelected(tabOneText)}
        style={styles.tabView}>
        <Txt style={[styles.title,{color:status === 'active' ? AppTheme.COLORS.primaryGreenBg :
          status === 'pending' ? AppTheme.COLORS.pending : status === 'expire' ? AppTheme.COLORS.error : AppTheme.COLORS.white}]}>{tabOneText}</Txt>
        {isSelected === tabOneText && (
          <View
            style={[styles.indicator , {  backgroundColor:status === 'active' ? AppTheme.COLORS.primaryGreenBg :
              status === 'pending' ? AppTheme.COLORS.pending :  status === 'expire' ? AppTheme.COLORS.error : null
            }]}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={`${tabTwoText} Button`}
        onPress={() => setIsSelected(tabTwoText)}
        style={styles.tabView}>
        <Txt style={styles.title}>{tabTwoText}</Txt>
        {isSelected === tabTwoText && (
          <View
            style={[styles.indicator , {  backgroundColor:status === 'active' ? AppTheme.COLORS.primaryGreenBg :
              status === 'pending' ? AppTheme.COLORS.pending : AppTheme.COLORS.error
            }]}
          />
        )}
      </TouchableOpacity>
      <Divider style={[isDarkMode ? styles.darkModeDivider : styles.divider]} />
    </View>
  );
}

TabHeader.propTypes = {
  isSelected: PropTypes.string.isRequired,
  setIsSelected: PropTypes.func.isRequired,
  tabOneText: PropTypes.string.isRequired,
  tabTwoText: PropTypes.string.isRequired,
};
