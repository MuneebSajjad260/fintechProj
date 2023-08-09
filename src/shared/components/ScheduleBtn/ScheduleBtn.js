import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppTheme} from '../../theme';
import Txt from '../core/Txt';
import styles from './ScheduleBtn.style';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
//* Icons
import ClockIcon from '../../../assets/images/clockMode.js';
import CalendarDark from '../../../assets/images/calendarDark.svg';
import DateIcon from '../../../assets/images/dateIcon.svg';

export default function ScheduleBtn({
  onCalenderPress,
  onTimePress,
  dateValue,
  timeValue,
  error,
}) {
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  return (
    <View style={styles.scheduleContainer}>
      <Txt style={styles.title}>{Strings.schedule}</Txt>
      <View style={styles.scheduleBtnContainer}>
        <TouchableOpacity
          accessibilityLabel="selectDateView"
          onPress={onCalenderPress}>
          <View
            style={[
              styles.inputView,
              {
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.wrapperDarkModeBg
                  : AppTheme.COLORS.secondaryGreyLightBg,
              },
            ]}>
            <View style={styles.defRowWIthAlignment}>
              <View>{isDarkMode ? <CalendarDark /> : <DateIcon />}</View>
              <Txt style={styles.placeHolder}>{dateValue}</Txt>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity accessibilityLabel="selectTime" onPress={onTimePress}>
          <View
            style={[
              styles.inputView,
              {
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.wrapperDarkModeBg
                  : AppTheme.COLORS.secondaryGreyLightBg,
                borderWidth: error ? 1 : 0,
              },
            ]}>
            <View style={styles.defRowWIthAlignment}>
              <View>
                <ClockIcon
                  stroke={
                    isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black
                  }
                />
              </View>
              <Txt style={styles.placeHolder}>{timeValue}</Txt>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//* Define default props
ScheduleBtn.defaultProps = {
  dateValue: '',
  timeValue: '',
};

//* Define prop types
ScheduleBtn.propTypes = {
  onCalenderPress: PropTypes.func.isRequired,
  onTimePress: PropTypes.func.isRequired,
  dateValue: PropTypes.string,
  timeValue: PropTypes.string,
};
