import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';
import { scale } from '../../utils/scale';

const styles = StyleSheet.create({
  darkModeIndicator: {
    height: 9,
    width: scale(144),
    backgroundColor: AppTheme.COLORS.orange,
    borderRadius: scale(16),
    marginTop: scale(20),
    zIndex: 10000,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabView: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  indicator: {
    height: 3,
    width: scale(195),
    //borderRadius: scale(16),
    marginTop: scale(20),
    zIndex: 10000,
  },
  divider: {
    height: 0.7,
    width: '100%',
    position: 'absolute',
    bottom: 1,
    zIndex: -10,
  },
  darkModeDivider: {
    height: 0.7,
    width: '100%',
    position: 'absolute',
    bottom: 1,
    zIndex: -10,
    backgroundColor: AppTheme.COLORS.text
  }
});

export default styles;
