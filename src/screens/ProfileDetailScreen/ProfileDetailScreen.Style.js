import {StyleSheet} from 'react-native';
import {scale} from '../../shared/utils/scale';
import {AppTheme} from '../../shared/theme';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  innerContainer: {
    padding: scale(20),
  },
  profiletext: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    color: AppTheme.COLORS.primaryBlueBg,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
  },
  edittext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    textDecorationLine: 'underline',
  },
  allignrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personalinformationtext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginLeft: scale(24),
  },
  detailsheadingtext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    lineHeight: scale(24),
  },
  detailsinformationtext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    lineHeight: scale(14),
    marginTop: scale(2),
  },
  inputContainer: {
    marginVertical: scale(12),
  },
  input: {
    backgroundColor: 'rgba(202, 202, 202, 0.1)',
    height: scale(65),
    borderRadius: scale(10),
    padding: scale(20),
    color: '#333333',
  },
  cardContainer: {
    padding: scale(10),
    borderRadius: 4,
  },
  profileDeatilsContainer: {
    marginTop: scale(10),
    marginLeft: scale(55),
  },
  divider: {
    backgroundColor: 'rgba(202, 202, 202, 0.51)',
    height: 1,
    zIndex: -10,
    marginVertical: scale(10),
    marginRight: scale(20),
    // marginLeft: scale(20)
  },
  noteContainer: {
    height: 'auto',
    borderWidth: 1,
    borderColor: AppTheme.COLORS.error,
    borderRadius: 7,
    paddingHorizontal: scale(9),
    paddingVertical: scale(10),
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    // marginBottom: 0
    paddingHorizontal: scale(20),
    marginBottom: scale(20),
  },
  Note: {
    color: AppTheme.COLORS.error,
    marginLeft: scale(11),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(16),
  },
  noteDescription: {
    color: '#ABABAB',
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: scale(11),
    marginTop: scale(2),
    lineHeight: scale(16),
  },
  //* Change Password
  cardContainer: {
    padding: scale(16),
    borderRadius: 4,
    marginVertical: scale(12),
  },
  defAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //* List Item (TAB)
  tabName: {
    marginLeft: scale(24),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(19),
  },
  tabInnerText: {
    marginLeft: scale(24),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.darkText,
    lineHeight: scale(12),
    marginTop: scale(2),
  },
});
export default styles;
