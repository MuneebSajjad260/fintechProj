import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const Styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: AppTheme.COLORS.white,
  },
  gestureContainer: {
    flex: 1,
    // backgroundColor: AppTheme.COLORS.white,
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
    justifyContent:'space-between'
    // backgroundColor: AppTheme.COLORS.white
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: normalize(20),
  },
  subContainer: {
    // flex: 1,
    marginTop: normalize(45),
  },
  loginImg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomImg: {
    marginTop: normalize(115),
  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  desc: {
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    marginTop: normalize(6),
    lineHeight: normalize(18),
  },
  loginBtnContainer: {
    marginTop: normalize(40),
  },
  forgotContainer: {
    marginTop: normalize(20),
    alignItems: 'center',
  },
  forgotTxt: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  bottomSheetHeader: {
    height: normalize(4),
    width: normalize(36),
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    alignSelf: 'center',
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  inputsContainer: {
    marginTop: normalize(20),
  },
  textInputLabel: {
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },

  errorMessageContainer: {
    justifyContent: 'center',
    marginTop: normalize(5.5),
  },
  errorMessage: {
    color: AppTheme.COLORS.error,
    fontSize: normalize(12),
  },
  leftIcon: {
    // paddingLeft: 5,
    // marginLeft: 5,
    marginRight: 8,
  },
  eyeIcon: {},
  allignInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputHeight: {
    height: normalize(160),
  },
  input: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P2,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
  },
  // *Saved Users (Bottom Sheet)
  saveUsersContainer: {
    flex: 1,
    padding: 16,
  },
  saveUsersHeading: {
    fontSize: normalize(16),
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    marginBottom: 8,
  },
  saveUsersListItemContainer: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: 'black',
    borderRadius: 4,
  },
  saveUsersListItemText: {
    color: AppTheme.COLORS.white,
    fontSize: normalize(16),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
});
export default Styles;
