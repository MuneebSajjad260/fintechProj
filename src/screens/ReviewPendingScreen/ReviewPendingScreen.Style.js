import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
    textAlign: 'center',
  },
  description: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    lineHeight: scale(24, true),
    color: AppTheme.COLORS.text,
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
    textAlign: 'center',
  },
});

export default styles;
