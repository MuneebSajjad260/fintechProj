import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppTheme} from '../../theme';
import Txt from '../core/Txt';
import styles from './RepeatBookingBtn.style';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

export default function RepeatBookingBtn({
  onYes,
  onNo,
  selected,
  bottomContent,
}) {
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  return (
    <View style={styles.repeatBtnContainer}>
      <View>
        <Txt style={styles.title}>Repeat booking</Txt>
        <Txt
          style={[styles.title, {fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG}]}>
          {bottomContent}
        </Txt>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={onYes}
          style={[
            styles.btnBg,
            selected === 'yes'
              ? isDarkMode
                ? styles.darkActive
                : styles.lightActive
              : isDarkMode
              ? styles.dark
              : styles.light,
            {
              marginRight: AppTheme.SPACINGS.MARGINS.M6,
            },
          ]}>
          <Txt
            style={[
              styles.btnText,
              {
                color:
                  selected === 'yes'
                    ? AppTheme.COLORS.white
                    : AppTheme.COLORS.text,
              },
            ]}>
            Yes
          </Txt>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={onNo}
          style={[
            styles.btnBg,
            selected === 'no'
              ? isDarkMode
                ? styles.darkActive
                : styles.lightActive
              : isDarkMode
              ? styles.dark
              : styles.light,
          ]}>
          <Txt
            style={[
              styles.btnText,
              {
                color:
                  selected === 'no'
                    ? AppTheme.COLORS.white
                    : AppTheme.COLORS.text,
              },
            ]}>
            No
          </Txt>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//* Define default props
RepeatBookingBtn.defaultProps = {
  selected: 'yes',
  bottomContent: '',
};

//* Define prop types
RepeatBookingBtn.propTypes = {
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
  selected: PropTypes.oneOf(['yes', 'no']),
};
