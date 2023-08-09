import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
//* Icons
import SendIcon from '../../../assets/images/SendIcon.svg';
//* Others
import {scale} from '../../utils/scale';
import {AppTheme} from '../../theme';
import {useSelector} from 'react-redux';

const CustomInput = ({text, setText, data, isLoading}) => {
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  return (
    <View style={styles(isDarkMode).inputContainer}>
      <TextInput
        value={text}
        onChangeText={val => setText(val)}
        style={styles(isDarkMode).input}
        placeholder="Send message to support"
        placeholderTextColor={AppTheme.COLORS.darkText}
        multiline
      />
      <TouchableOpacity
        onPress={() => data.onSend(text)}
        disabled={!text}
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
        style={styles(isDarkMode).sendIcon}>
        {isLoading ? (
          <ActivityIndicator color={AppTheme.COLORS.chatBg} />
        ) : (
          <SendIcon height={20} width={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomInput;

export const styles = isDarkMode => {
  const isDarkModeActivated = isDarkMode
    ? AppTheme.COLORS.wrapperDarkModeBg
    : AppTheme.COLORS.white;
  const InputColor = isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black;

  let style = {
    inputContainer: {
      paddingVertical: AppTheme.SPACINGS.PADDINGS.P5,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
    },
    input: {
      backgroundColor: isDarkModeActivated,
      paddingLeft: scale(10, true),
      paddingRight: scale(40, true),
      paddingVertical: scale(13),
      borderRadius: scale(8),
      borderWidth: 1,
      borderColor: '#D1DAE0',
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
      color: InputColor,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      borderColor: isDarkMode
        ? AppTheme.COLORS.activeStepBar
        : AppTheme.COLORS.greyLight,
      borderWidth: 1,
    },
    sendIcon: {
      position: 'absolute',
      top: '50%',
      right: scale(20),
    },
  };

  return StyleSheet.create(style);
};
