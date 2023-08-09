import {View} from 'react-native';
import React from 'react';
import styles from './TimelineItem.style';
import {AppTheme} from '../../theme';
import Txt from '../core/Txt';
const moment = require('moment');
export default function TimelineItem({item, index, isDarkMode, bookings}) {
  const formattedTimeNumber = moment(item.timeHours, 'hh:mm a').format('h');
  const shouldApplyLeftRadius =
    index === 0 || bookings[index - 1].isBooked !== item.isBooked;
  const shouldApplyRightRadius =
    index === bookings.length - 1 ||
    bookings[index + 1].isBooked !== item.isBooked;
  const shouldDisplayAMPM =
    Math.floor(item.timeNumber) === 12 ||
    index === 0 ||
    index === bookings.length - 1;

  // console.warn(item.isBooked)
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !item.isBooked ? '#0129FA47' : undefined,
          borderTopLeftRadius: shouldApplyLeftRadius ? 100 / 2 : 0,
          borderBottomLeftRadius: shouldApplyLeftRadius ? 100 / 2 : 0,
          borderTopRightRadius: shouldApplyRightRadius ? 100 / 2 : 0,
          borderBottomRightRadius: shouldApplyRightRadius ? 100 / 2 : 0,
        },
      ]}>
      <View style={styles.innerContainer}>
        {!item.timeNumber.toString().includes('.') ? (
          <>
            <View style={styles.timeContainer}>
              <Txt
                style={[
                  styles.time,
                  {
                    color: isDarkMode
                      ? AppTheme.COLORS.white
                      : AppTheme.COLORS.activeStepBar,
                  },
                ]}>
                {formattedTimeNumber}
              </Txt>
              {shouldDisplayAMPM ? (
                <Txt style={styles.ampm}>
                  {moment(item.timeHours, 'hh:mm a').format('A')}
                </Txt>
              ) : null}
            </View>
          </>
        ) : (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.text
                  : AppTheme.COLORS.darkText,
                height:
                  item.timeNumber.toString().split('.')[1] === String(5)
                    ? 6
                    : 4,
                width:
                  item.timeNumber.toString().split('.')[1] === String(5)
                    ? 6
                    : 4,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
}
