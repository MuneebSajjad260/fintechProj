import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  darkActive: {
    borderColor: '#0129FA',
    backgroundColor: '#0129FA12',
  },
  dark: {
    borderColor: '#FFFFFF1A',
    backgroundColor: '#FFFFFF06',
  },
  lightActive: {
    backgroundColor: AppTheme.COLORS.black,
  },
  light: {
    borderColor: '#C9C9C9',
  },
  durationBtn: {
    width: scale(62, true),
    height: scale(33),
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
});

export default styles;
