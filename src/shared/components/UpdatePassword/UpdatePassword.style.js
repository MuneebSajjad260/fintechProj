import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

import {AppTheme} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  innerContainer: {
    paddingHorizontal: normalize(20),
  },
  updatePasswordTxt: {
    fontSize: normalize(16),
    color: AppTheme.COLORS.black,
    textAlign: 'center',
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  subTitle: {
    textAlign: 'center',
    marginVertical: normalize(20),
    marginHorizontal: normalize(13),
    fontSize: normalize(14),
    color: AppTheme.COLORS.text,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: normalize(14),
  },

  btnContainer: {
  },
});

export default styles;
