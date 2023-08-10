import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppTheme.COLORS.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P6,
  },
  noInternetText: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.white,
    marginLeft: AppTheme.SPACINGS.MARGINS.M6,
  },
});

export default styles;
