import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  // subTitle: {
  //     textAlign: "center",
  //     marginVertical: normalize(12),
  //     marginHorizontal: normalize(13),
  //     fontSize: normalize(16),
  //     color: AppTheme.COLORS.black,
  //     fontFamily: AppTheme.FONTS.TYPE.LIGHT,
  //     fontWeight: "400",
  //     lineHeight: normalize(24)
  // },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: normalize(60),
  },
  textInputLabel: {
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.black,
  },

  input: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  fotgotMainContainer: {
    flex: 1,
    padding: scale(16),
  },
  forgotPasswordTxt: {
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  subTitle: {
    textAlign: 'center',
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.text,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    lineHeight: normalize(14),
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: normalize(60),
    marginVertical: scale(16)
  },
  textInputLabel: {
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  BtmBtn: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
});

export default styles;
