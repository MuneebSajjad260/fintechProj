import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Txt from '../core/Txt';
import styles from './MeetingRoomButton.style';
import {useSelector} from 'react-redux';
import { AppTheme } from '../../theme';

export default function MeetingRoomButton({
  item,
  index,
  isSelected,
  isDarkMode,
  onPress,
}) {

  return (
    <View style={{marginLeft: index === 0 ? AppTheme.SPACINGS.MARGINS.M1:0}}>
      <TouchableOpacity
        activeOpacity={0.4}
        style={[
          styles.btn,
          isSelected
            ? isDarkMode
              ? styles.darkActive
              : styles.lightActive
            : isDarkMode
            ? styles.dark
            : styles.light,
        ]}
        onPress={() => onPress(index)}>
        <Txt
          style={[
            styles.btnText,
            {
              color: isSelected ? AppTheme.COLORS.white : AppTheme.COLORS.text,
            },
          ]}>
          {item.Title}
        </Txt>
      </TouchableOpacity>
    </View>
  );
}
