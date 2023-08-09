import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  repeatBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  // Schedule
  defRowWIthAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleContainer: {
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  scheduleBtnContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  inputView: {
    width: scale(168, true),
    height: scale(46),
    backgroundColor: AppTheme.COLORS.secondaryGreyLightBg,
    borderRadius: scale(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppTheme.COLORS.error,
  },
  placeHolder: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: AppTheme.SPACINGS.MARGINS.M5,
  },
});

export default styles;
