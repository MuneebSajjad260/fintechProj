import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

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
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  divider: {
    height: 0.7,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: -10,
  },
  darkModeDivider: {
    height: 0.7,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: -10,
    backgroundColor: AppTheme.COLORS.text,
  },
  //* Header Indicator
  borderOpen: {
    borderBottomWidth: scale(3),
    borderBottomColor: AppTheme.COLORS.gold,
    borderRadius: scale(1),
  },
  borderClosed: {
    borderBottomWidth: scale(3),
    borderBottomColor: AppTheme.COLORS.available,
    borderRadius: scale(1),
  },
  //*  Tab Titles
  tabOneTitleActive: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
    color: AppTheme.COLORS.gold,
  },
  tabTwoTitleActive: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
    color: AppTheme.COLORS.available,
  },
});

export default styles;
