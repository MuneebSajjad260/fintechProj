import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(54),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginLeft: 16,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  ampm: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
  },
  dot: {
    borderRadius: 100 / 2,
  },
});

export default styles;
