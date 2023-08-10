import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';
import Txt from './Txt';

const Botton = ({
  title,
  onPress,
  onContinue,
  onCancel,
  variant,
  button1Style,
  button2Style,
  titleStyle,
  singleButtonStyle,
  outlineButtonStyle,
  linkButtonStyle,
  continueTitle,
  cancelTitle,
  loading,
  disabled,
  accessibilityLabel,
  continueBtnAccessibilityLabel,
  cancelBtnAccessibilityLabel,
}) => {
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  // console.log('disabled---',disabled);
  const containerStyles = {
    v1: styles().v1ButtonsContainer,
    v2: styles().v2ButtonsContainer,
    v3: styles().v3ButtonsContainer,
  };

  const defaultButtonStyles = {
    single: [
      styles(isDarkMode, disabled, loading).singleButton,
      singleButtonStyle,
    ],
    outline: [
      styles(isDarkMode, disabled, loading).outlineButton,
      outlineButtonStyle,
    ],
    link: [styles().link, linkButtonStyle],
    v1: [styles(isDarkMode, disabled, loading).v1Button],
    v2: [styles(isDarkMode, disabled, loading).v2Button],
    v3: [styles(isDarkMode, disabled, loading).v3Button],
  };

  const textStyles = {
    single: [styles(isDarkMode).singleButtonText],
    outline: [styles(isDarkMode).outlineButtonText],
    link: [styles(isDarkMode).linkTxt],
    v1: [styles(isDarkMode).v1ButtonText],
    v2: [styles(isDarkMode).v2ButtonText],
    v3: [styles(isDarkMode, undefined, undefined, variant).v3ButtonText],
  };

  const containerStyle = containerStyles[variant];
  const buttonStyle = defaultButtonStyles[variant];
  const textStyle = [textStyles[variant], titleStyle];

  if (variant === 'v1') {
    const [defaultStyle] = buttonStyle;
    return (
      <View style={containerStyle}>
        <TouchableOpacity
          accessibilityLabel={continueBtnAccessibilityLabel}
          style={[
            defaultStyle,
            button1Style,
            {justifyContent: loading ? 'center' : 'flex-start'},
          ]}
          onPress={onContinue}
          disabled={loading || disabled}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Txt style={textStyle}>{continueTitle}</Txt>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={cancelBtnAccessibilityLabel}
          style={[
            defaultStyle,
            styles(isDarkMode, undefined, undefined, undefined).cancelBtn,
            button2Style,
            {justifyContent: loading ? 'center' : 'flex-start'},
          ]}
          onPress={onCancel}>
          <Txt style={textStyle}>{cancelTitle}</Txt>
        </TouchableOpacity>
      </View>
    );
  } else if (variant === 'v2' || variant === 'v3') {
    const [defaultStyle] = buttonStyle;
    return (
      <View style={containerStyle}>
        <TouchableOpacity
          accessibilityLabel={cancelBtnAccessibilityLabel}
          style={[
            defaultStyle,
            styles(isDarkMode, undefined, undefined, variant).cancelBtn,
            button2Style,
            {justifyContent: loading ? 'center' : 'flex-start'},
          ]}
          onPress={onCancel}>
          <Txt
            style={[
              textStyle,
              styles(isDarkMode, undefined, undefined, variant, true)
                .miniUnselectBtnStyling,
            ]}>
            {cancelTitle}
          </Txt>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={continueBtnAccessibilityLabel}
          style={[
            defaultStyle,
            button1Style,
            {justifyContent: loading ? 'center' : 'flex-start'},
          ]}
          onPress={onContinue}
          disabled={loading || disabled}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Txt style={textStyle}>{continueTitle}</Txt>
          )}
        </TouchableOpacity>
      </View>
    );
  } else if (variant === 'link') {
    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        style={[buttonStyle]}
        onPress={onPress}
        disabled={disabled}>
        <Txt style={textStyle}>{title}</Txt>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      style={[buttonStyle]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline'
              ? AppTheme.COLORS.error
              : AppTheme.COLORS.white
          }
        />
      ) : (
        <Txt style={textStyle}>{title}</Txt>
      )}
    </TouchableOpacity>
  );
};

export const styles = (
  isDarkMode,
  disabled,
  loading,
  variant,
  isMiniUnselect,
) => {
  let isDarkModeActivated;
  let isDarkModeActivatedMini;

  if (disabled || loading) {
    isDarkModeActivated = AppTheme.COLORS.greyLight;
    isDarkModeActivatedMini = AppTheme.COLORS.greyLight;
  } else {
    isDarkModeActivated = isDarkMode
      ? AppTheme.COLORS.btnActiveDarkMode
      : AppTheme.COLORS.black;
    isDarkModeActivatedMini = isDarkMode
      ? AppTheme.COLORS.white
      : AppTheme.COLORS.black;
  }
  const textColor = AppTheme.COLORS.white;
  const BorderWidth = isDarkMode ? 1 : undefined;

  let style = {
    //? Buttons
    cancelBtn: {
      backgroundColor:
        variant === 'v3'
          ? undefined
          : isDarkMode
          ? AppTheme.COLORS.greyLightBtnDark
          : AppTheme.COLORS.greyLight,
      borderWidth: variant === 'v3' ? 1 : 0,
      borderColor: isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black,
    },
    miniUnselectBtnStyling: {
      color: isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black,
    },
    //* Single
    singleButton: {
      padding: scale(13),
      borderRadius: scale(4),
      backgroundColor: isDarkModeActivated,
      borderWidth: BorderWidth,
      borderColor: AppTheme.COLORS.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    singleButtonText: {
      fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      color: textColor,
      letterSpacing: 1,
    },
    //* Outline
    outlineButton: {
      padding: scale(13),
      borderRadius: scale(4),
      borderColor: AppTheme.COLORS.error,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    outlineButtonText: {
      color: AppTheme.COLORS.error,
      fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      letterSpacing: 1,
    },
    //* Links
    link: {},
    linkTxt: {
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      textDecorationLine: 'underline',
    },
    //* V1
    v1ButtonsContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    v1Button: {
      padding: scale(13),
      borderRadius: scale(4),
      backgroundColor: isDarkModeActivated,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: scale(24),
      minWidth: '100%',
      borderWidth: BorderWidth,
      borderColor: AppTheme.COLORS.white,
    },
    v1ButtonText: {
      fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      color: textColor,
      letterSpacing: 1,
    },
    //* V2
    v2ButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    v2Button: {
      padding: scale(13),
      borderRadius: scale(4),
      backgroundColor: isDarkModeActivated,
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%',
      minWidth: '45%',
      borderWidth: BorderWidth,
      borderColor: AppTheme.COLORS.white,
    },
    v2ButtonText: {
      fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      color: textColor,
      letterSpacing: 1,
    },
    //* V3
    v3ButtonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    v3Button: {
      padding: scale(10),
      borderRadius: scale(4),
      backgroundColor: isDarkModeActivatedMini,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(8),
      minWidth: scale(62, true),
    },
    v3ButtonText: {
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
      color: isDarkMode && variant === 'v3' ? AppTheme.COLORS.black : textColor,
    },
  };

  return StyleSheet.create(style);
};

Botton.propTypes = {
  title: PropTypes.string,
  onContinue: PropTypes.string,
  onCancel: PropTypes.string,
  onPress: PropTypes.func,
  onContinue: PropTypes.func,
  onCancel: PropTypes.func,
  variant: PropTypes.oneOf(['single', 'outline', 'link', 'v1', 'v2', 'v3']),
  button1Style: PropTypes.object,
  button2Style: PropTypes.object,
  titleStyle: PropTypes.object,
  singleButtonStyle: PropTypes.object,
  outlineButtonStyle: PropTypes.object,
  linkButtonStyle: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  cancelBtnAccessibilityLabel: PropTypes.string,
  continueBtnAccessibilityLabel: PropTypes.string,
};

Botton.defaultProps = {
  variant: 'single',
  continueTitle: 'Continue',
  cancelTitle: 'Cancel',
  accessibilityLabel: 'Btn',
  cancelBtnAccessibilityLabel: 'Btn',
  continueBtnAccessibilityLabel: 'Btn',
  loading: false,
  disabled: false,
  button1Style: {},
  button2Style: {},
  titleStyle: {},
  singleButtonStyle: {},
  outlineButtonStyle: {},
  linkButtonStyle: {},
};

export default Botton;

//* Documentation
/**
Button is a custom button component that can be customized based on the
variant passed to it. The button component also applies a theme-specific
background color and text color based on the user's device color scheme preference.
@param {object} props - The component props.
@param {string} props.title - The text to display on the button.
@param {function} props.onPress - The function to execute when the button is pressed.
@param {function} props.onContinue - The function to execute when the continue button is pressed.
@param {function} props.onCancel - The function to execute when the cancel button is pressed.
@param {string} props.variant - The button variant to display.
@param {object} [props.button1Style] - The style object to apply to the first button.
@param {object} [props.button2Style] - The style object to apply to the second button.
@param {object} [props.titleStyle] - The style object to apply to the button text.
@param {object} [props.singleButtonStyle] - The style object to apply to the single button.
@param {object} [props.outlineButtonStyle] - The style object to apply to the outline button.
@param {object} [props.linkButtonStyle] - The style object to apply to the link button.
@param {string} [props.continueTitle] - The text to display on the continue button.
@param {string} [props.cancelTitle] - The text to display on the cancel button.
@param {bool} [props.loading] - If true, the button will display a loading indicator instead of the title.
@param {bool} [props.disabled] - If true, the button will be disabled.
@param {string} [props.accessibilityLabel] - The accessibility label for the button.
@param {string} [props.continueBtnAccessibilityLabel] - The accessibility label for the continue button.
@param {string} [props.cancelBtnAccessibilityLabel] - The accessibility label for the cancel button.
@return {JSX.Element} - A button component with the appropriate theme-specific background color and text color.
*/
