import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

import {AppTheme} from '../../shared/theme';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  mainContainer: {
    padding: normalize(20),
  },
  setPasswordImg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H6,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.black,
  },
  desc: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.LIGHT,
    color: AppTheme.COLORS.text,
    // marginTop: AppTheme.MARGIN.HIGH
    marginTop: normalize(6),
    lineHeight: normalize(15),
  },
  btnContainer: {
    marginTop: normalize(19),
    justifyContent: 'flex-end',
    flex: 1,
    padding: normalize(20),
  },
  guidlinesContainer: {
    marginTop: normalize(36),
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: normalize(16),
    marginTop: normalize(16),
  },
  logo: {
    position: 'absolute',
    bottom: normalize(60, 'width'),
  },
  guidlinesTitleTxt: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H6,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    lineHeight: normalize(17),
    marginBottom: normalize(16),
  },
  guidlinesTxt: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    lineHeight: 15,
  },
  guidlineTxtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(5),
    // marginLeft: normalize(20)
  },
  icon: {
    marginRight: normalize(8),
  },

  textInputLabel: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.black,
  },
  textInputContainer: {
    marginTop: normalize(20),
  },
  // Error Container
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.error,
    marginLeft: 8,
  },
});

export default styles;
