import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppTheme } from '../../theme'
import { convertMinToHrAndMin } from '../../utils/helper'
import Txt from '../core/Txt'
import styles from './DurationButton.style'

export default function DurationButton({
  duration,
  isSelected,
  isDarkMode,
  onPress,
  index,
  dataLength,
}) {
  return (
    <View>
        <TouchableOpacity
          activeOpacity={0.4}
          style={[
            styles.durationBtn,
            isSelected
              ? isDarkMode
                ? styles.darkActive
                : styles.lightActive
              : isDarkMode
              ? styles.dark
              : styles.light,
            {
              marginRight:
                index !== dataLength ? AppTheme.SPACINGS.MARGINS.M6 : 0,
            },
          ]}
          onPress={onPress}>
          <Txt
            style={[
              styles.btnText,
              {
                color: isSelected
                  ? AppTheme.COLORS.white
                  : AppTheme.COLORS.text,
              },
            ]}>
            {convertMinToHrAndMin(duration)}
          </Txt>
        </TouchableOpacity>
      </View>
  )
}

