import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  defAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  secContainer: {
    padding: scale(16),
  },
  divider: {
    height: 0.7,
    width: '100%',
    marginVertical: scale(12),
    zIndex: -10,
  },
  //* Headers
  notificationHeader: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginVertical: scale(16),
  },
  //* Notifications
  notificationContainer: {},
  notificationTitle: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginBottom: scale(8),
  },
  notificationContent: {
    width: '70%',
    marginLeft: 20,
  },
  notification: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.text,
  },
  iconContainer: {
    backgroundColor: AppTheme.COLORS.white,
    height: scale(45),
    width: scale(45, true),
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.text,
    marginTop: 8,
    position: 'relative',
    right: scale(22, true)
  },
  //* Not Found
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    color: AppTheme.COLORS.text,
  },
});
export default styles;
