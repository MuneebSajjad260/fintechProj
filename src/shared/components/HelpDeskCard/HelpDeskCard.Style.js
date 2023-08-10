import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: AppTheme.COLORS.officialBlack,
    marginVertical: AppTheme.SPACINGS.MARGINS.M4,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P4,
    backgroundColor: AppTheme.COLORS.wrapperDarkModeBg,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: AppTheme.COLORS.greyLight,
    marginVertical: AppTheme.SPACINGS.MARGINS.M4,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P4,
  },
  rightSideContainer: {
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
    marginVertical: AppTheme.SPACINGS.MARGINS.M5
  },
  title: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    width: scale(160, true),
  },
  date: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop: AppTheme.SPACINGS.MARGINS.M5,

  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    marginRight: AppTheme.SPACINGS.MARGINS.M5,
  },
  description: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop: AppTheme.SPACINGS.MARGINS.M7,
    maxWidth: '95%'
  },
  defShimmer: {
    borderRadius: 5,
    marginVertical: 5,
    width: scale(150, true),
  },
  iconShimmer: {
    height: scale(33),
    width: scale(33, true),
    borderRadius: 100/2,
    marginVertical: 5,
  },
});

export default styles;
