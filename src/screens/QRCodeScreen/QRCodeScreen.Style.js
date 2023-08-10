import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    justifyContent: 'space-between'
  },
  //* Heading
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  heading: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
  },
  //* QR
  qrContainer: {
    alignSelf: 'center',
  }, 
  //* Log
  logContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  logTxt: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    textAlign: 'center',
  },
  //* Error Log
  errorContainer: {
    width: '100%'
  },
  errorText: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    textAlign: 'center',
    alignSelf: 'center',
    color: AppTheme.COLORS.error,
    width: '70%'
  }, 
});

export default styles;
