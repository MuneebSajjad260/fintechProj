import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { AppText } from '@components'; //absolute paths // aliases
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppTheme, CENTER_ROW} from '@themes';
import styles from './SecondaryButtonStyles';
// import {WP} from '../../theme';

const SecondaryButton = props => {
  const { loading, disabled, title, small ,accessibilityLabel} = props;

  // let titleColorProp = {
  //   color:
  //     (!props.disabled && !props.signup) ||
  //     (props.signup && props.isValid && props.checked)
  //       ? Colors.white
  //       : Colors.textLight,
  // };

  // let shadowColorProp = {
  //   shadowColor:
  //     props.disabled || (props.signup && props.isValid && props.checked)
  //       ? Colors.primaryBackground
  //       : Colors.black,
  // };

  // let disableButton = () => {
  //   if (props.signup) {
  //     if (props.isValid) {
  //       if (props.checked) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     if (props.disabled) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };

  // eslint-disable-next-line no-unused-vars
  let buttonBackgroundColor = () => {
    if (disabled) {
      return { backgroundColor: AppTheme.COLORS.greyLight };
    } else {
      return { backgroundColor: AppTheme.COLORS.primaryGreenBg };
    }
  };

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      style={[
        small ? styles.smallContainer : styles.container,
        {
          // marginTop: WP(5),
          // border: 1,
          // borderColor: AppTheme.COLORS.primaryGreenBg,
          // elevation: 3,
        },
        props.styleMainContainer
      ]}
      {...props}
      disabled={loading || disabled}
      activeOpacity={1}>
      <View
        style={{
          ...CENTER_ROW,
        }}>
        {props.loading ? (
          <ActivityIndicator color={AppTheme.COLORS.white} />
        ) : (
          <AppText style={[styles.buttonText, props.styleBtnTxt ]}>{title}</AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

// return (
//   <TouchableOpacity
//     {...props}
//     style={[
//       buttonBackgroundColor(),
//       props?.small ? styles.smallContainer : styles.container,
//       props?.buttonStyle,
//       {
//         marginTop: Metrics.doubleBaseMargin,
//         elevation: props?.disabled ? 0 : 3,
//       },
//     ]}
//     disabled={
//       props.loading || props.disabled || (props.signup && disableButton())
//     }
//     activeOpacity={0.7}>
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       {props.loading ? (
//         <ActivityIndicator color={Colors.white} />
//       ) : (
//         <Text style={[styles.buttonText, props.textStyle, titleColorProp]}>
//           {props.disabled ? props.title : props.title}
//         </Text>
//       )}
//     </View>
//   </TouchableOpacity>
// );

export { SecondaryButton };
