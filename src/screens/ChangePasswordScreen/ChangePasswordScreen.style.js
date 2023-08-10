import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {scale} from '../../shared/utils/scale';
import {AppTheme} from '../../shared/theme';

const Styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },

  mainContainer: {
    flex: 1,
    // paddingHorizontal: scale(20),
    backgroundColor: AppTheme.COLORS.white,
  },
  subContainer: {
    // marginVertical: hp('3%')
    marginTop: scale(25),
  },
  setPasswordImg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  desc: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    // marginTop: AppTheme.MARGIN.HIGH
    marginTop: scale(6),
    lineHeight: scale(15),
  },
  btnContainer: {
    marginBottom: scale(20),
    paddingHorizontal: scale(20),
  },
  guidlinesContainer: {
    marginVertical: scale(20),
  },
  guidlinesTitleTxt: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(17),
  },
  guidlinesTxt: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    lineHeight: 15,
  },
  guidlineTxtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(5),
  },
  icon: {
    marginRight: scale(8),
  },
  textInputLabel: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  fintechBottomLogo: {
    marginTop: scale(50),
  },
  gestureContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
    justifyContent: 'space-between',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
export default Styles;
