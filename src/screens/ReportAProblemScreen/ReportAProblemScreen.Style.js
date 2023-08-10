import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Header
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: AppTheme.SPACINGS.MARGINS.M4,
  },
  title: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M4,
  },
  // Body
  bodyContainer: {
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  inputLabel: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  inputContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  // Upload
  border: {
    borderWidth: 1,
    borderRadius: scale(4),
  },
  uploadContainer: {
    height: scale(150),
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.greyLight,
    marginTop: AppTheme.SPACINGS.MARGINS.M7,
  },
  uploadTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.text,
    marginTop: AppTheme.SPACINGS.MARGINS.M4,
    marginLeft: AppTheme.SPACINGS.MARGINS.M4,
  },
  uploadHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppTheme.SPACINGS.MARGINS.M3,
  },
  addMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMore: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H1,
    color: AppTheme.COLORS.greyDark,
    marginLeft: AppTheme.SPACINGS.MARGINS.M7,
  },
  // Button
  buttonContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },

  // Bottom Sheet
  btmContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  btmTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
    textAlign: 'center',
  },
  btmDescription: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    textAlign: 'center',
    lineHeight: scale(24),
  },
  btnContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M2,
  },
  // Image
  imageViewContainer: {
    margin: AppTheme.SPACINGS.MARGINS.M4,
  },
  image: {
    height: scale(130),
    width: scale(130, true),
    borderRadius: scale(4),
  },
  closeIcon: {
    position: 'absolute',
    right: scale(10),
    top: scale(10),
    zIndex: 1,
    borderRadius: 50 / 2,
    backgroundColor: AppTheme.COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  closeIconText: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    height: scale(20),
    width: scale(20, true),
    textAlign: 'center',
  },
});
export default styles;
