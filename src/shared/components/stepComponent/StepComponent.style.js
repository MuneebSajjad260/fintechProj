import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(13)
  },
  txtContainer: {
    backgroundColor: AppTheme.COLORS.primaryGreenBg,
    width: normalize(22),
    height: normalize(22),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.white
  },
  divider: {
    height: 0.7,
    width: normalize(60),
    marginHorizontal: normalize(10),
    // bottom: 4,
    zIndex: -10,
    backgroundColor: AppTheme.COLORS.activeStepBar
    // backgroundColor: AppTheme,
    // marginVertical: normalize(12),
  },
});

export default styles;
