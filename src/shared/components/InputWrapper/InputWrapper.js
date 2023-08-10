import {Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import Txt from '../core/Txt';
import styles from './InputWrapper.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Touchable} from '../touchable';
import {AppTheme} from '../../theme';

const InputWrapper = props => {
  const {
    label,
    inputText,
    onPress,
    placeHolder,
    noOfMonths,
    accessibilityLabel,
  } = props;
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);
  return (
    <View>
      <Txt style={[styles.label, {...props.styleLabel}]}>{label}</Txt>
      <Touchable
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDarkMode
              ? AppTheme.COLORS.wrapperDarkModeBg
              : AppTheme.COLORS.white,

            ...props.styleInputContainer,
          },
        ]}>
        {placeHolder || inputText ? (
          <View style={styles.allignInRow}>
            <Txt style={[styles.placeHolderTxt, {...props.placeholdertext}]}>
              {!inputText ? placeHolder : inputText}
            </Txt>
            {noOfMonths ? (
              <View>
                <MaterialCommunityIcons
                  name="greater-than"
                  size={20}
                  color={ isDarkMode
                    ? AppTheme.COLORS.white
                    : AppTheme.COLORS.black}
                />
              </View>
            ) : (
              <View style={styles.allignInRow}>
                <AntDesign
                  name="calendar"
                  size={20}
                  color={ isDarkMode
                    ? AppTheme.COLORS.white
                    : AppTheme.COLORS.black}
                />
              </View>
            )}
          </View>
        ) : null}
      </Touchable>
    </View>
  );
};

export default InputWrapper;
