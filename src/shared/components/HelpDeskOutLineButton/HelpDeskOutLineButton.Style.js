import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  container: {
    height: scale(49),
    borderRadius: scale(8),
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.COLORS.purple
  },
  darkContainer: {
    height: scale(49),
    borderRadius: scale(4),
    borderWidth: 1,
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppTheme.COLORS.white,
    backgroundColor: AppTheme.COLORS.btnActiveDarkMode
  },
  text: {
    marginLeft: scale(5),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    color: AppTheme.COLORS.white
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M4,
  },
});

export default styles;
