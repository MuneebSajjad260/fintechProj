import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';
import Txt from './Txt';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';

const Input = ({
  ContentContainerStyle,
  InputStyling,
  TagStyling,
  hideTag,
  Tag,
  inputType,
  error,
  errorDetail,
  bottomDetail,
  isBottomSheetInput,
  isBorder,
  ...rest
}) => {
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    if (inputType === 'password') {
      setSecureTextEntry(true)
    }
  }, [inputType])

  return (
    <View style={[ContentContainerStyle]}>
      {!hideTag ? (
        <Txt style={[styles().topPlaceHolder, TagStyling]}>{Tag}</Txt>
      ) : null}
      <View style={styles(isDarkMode).inputWrapper}>
        {isBottomSheetInput ? (
          <BottomSheetTextInput
            placeholderTextColor={AppTheme.COLORS.darkText}
            style={[
              styles(isDarkMode, error, isBorder).input,
              styles(undefined, error).border,
              InputStyling,
            ]}
            secureTextEntry={secureTextEntry}
            {...rest}
          />
        ) : (
          <TextInput
            placeholderTextColor={AppTheme.COLORS.darkText}
            style={[
              styles(isDarkMode, error, isBorder).input,
              isDarkMode ? undefined : styles(undefined, error).border,
              InputStyling,
            ]}
            secureTextEntry={secureTextEntry}
            {...rest}
          />
        )}
        {inputType === 'password' ? (
          <Pressable
            onPress={toggleSecureTextEntry}
            style={styles(isDarkMode).iconContainer}>
            <Entypo
              name={secureTextEntry ? 'eye' : 'eye-with-line'}
              size={24}
              color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}
              style={styles(isDarkMode).leftIcon}
            />
          </Pressable>
        ) : null}
      </View>
      {error && errorDetail ? (
        <View style={[styles().defAlignment, {marginTop: scale(8)}]}>
          <MaterialIcons
            name={'error'}
            size={14}
            color={AppTheme.COLORS.error}
            style={styles().alertIcon}
          />
          <Txt style={styles().errorMessage}>{errorDetail}</Txt>
        </View>
      ) : null}

      {!error && bottomDetail ? (
        <View style={[{marginTop: scale(8)}]}>
          <Txt style={styles().bottomDetailTxt}>{bottomDetail}</Txt>
        </View>
      ) : null}
    </View>
  );
};

export const styles = (isDarkMode, error, isBorder) => {
  const isDarkModeActivated = isDarkMode
    ? AppTheme.COLORS.wrapperDarkModeBg
    : AppTheme.COLORS.white;
  const InputColor = isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black;

  let style = {
    defAlignment: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      backgroundColor: isDarkModeActivated,
      // backgroundColor: AppTheme.COLORS.lightDarkModeTxt,
      borderRadius: scale(4),
      paddingHorizontal: scale(10, true),
      paddingVertical: scale(6),
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
      color: InputColor,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      width: '100%',

      borderColor: isDarkMode && error ? AppTheme.COLORS.error : undefined,
      borderWidth: isDarkMode && error ? 1 : 0,
    },
    border: {
      borderWidth: 1,
      borderColor: error ? AppTheme.COLORS.error : AppTheme.COLORS.greyLight,
    },
    topPlaceHolder: {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      lineHeight: scale(14),
      marginBottom: scale(6),
      letterSpacing: scale(0.2),
    },
    inputWrapper: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      position: 'absolute',
      right: scale(10),
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: isDarkModeActivated,
    },
    leftIcon: {
      marginRight: scale(10),
    },

    //* Error
    alertIcon: {
      marginRight: scale(8),
    },
    errorMessage: {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      color: AppTheme.COLORS.error,
    },
    //* Bottom Detail
    bottomDetailTxt: {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
      color: AppTheme.COLORS.darkText,
    },
  };

  if (isBorder) {
    style.border = {
      borderWidth: 4,
      borderColor: 'red', // Customize the border color if needed
    };
  }

  return StyleSheet.create(style);
};

Input.defaultProps = {
  hideTag: true,
  Tag: '',
  inputType: '',
  error: false,
  errorDetail: '',
  bottomDetail: '',
  isBottomSheetInput: false,
};

export default Input;

//* Documentation
/**
 * Input is a custom TextInput component with support for a tag, password input, and error handling.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} [props.ContentContainerStyle] - The style object to apply to the container view.
 * @param {object} [props.TagStyling] - The style object to apply to the tag.
 * @param {object} [props.InputStyling] - The style object to apply to the TextInput.
 * @param {boolean} [props.hideTag=true] - Whether to hide the tag.
 * @param {string} [props.Tag=''] - The tag text to display above the TextInput.
 * @param {string} [props.inputType=''] - The input type. Can be "password".
 * @param {boolean} [props.error=false] - Whether there is an error with the input.
 * @param {string} [props.errorDetail=''] - The error detail message to display below the input.
 * @param {string} [props.bottomDetail=''] - The detail message to display below the input, without error styling.
 * @param {boolean} [props.isBottomSheetInput=false] - Whether to use the BottomSheetTextInput component.
 * @param {any} [rest] - Any other props that can be passed to a TextInput component.
 * @return {JSX.Element} - A custom TextInput component with support for a tag, password input, and error handling.
 */
