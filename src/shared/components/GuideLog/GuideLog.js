import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppTheme} from '../../theme';
import Txt from '../core/Txt';
import styles from './GuideLog.style';
import {useSelector} from 'react-redux';

export default function GuideLog() {
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  return (
    <View style={styles.guideContainer}>
      {/* Unavailable */}
      <View style={styles.unavailableContainer}>
        {/* Indicator */}
        <View
          style={[
            styles.unIndicator,
            {
              backgroundColor: isDarkMode
                ? '#FFFFFF80'
                : AppTheme.COLORS.greyLight,
            },
          ]}
        />
        <Txt style={styles.unavailable}>Unavailable</Txt>
      </View>
      {/* Available */}
      <View style={styles.availableContainer}>
        {/* Indicator */}
        <View style={styles.avIndicator} />
        <Txt style={styles.available}>Available</Txt>
      </View>
    </View>
  );
}
