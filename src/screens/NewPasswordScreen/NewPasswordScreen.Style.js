import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import { scale } from '../../shared/utils/scale';
import { AppTheme } from '../../shared/theme';

export default styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  mainContainer: {
    flex: 1,
    // paddingHorizontal: normalize(20),
    backgroundColor: AppTheme.COLORS.white,
  },
  innerContainer: {
    // flex: 1,
    paddingHorizontal: normalize(20),
  },
  subContainer: {
    // marginVertical: hp('3%')
    marginTop: normalize(25),
  },
  setPasswordImg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: normalize(16),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
  },
  desc: {
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    // marginTop: AppTheme.MARGIN.HIGH
    marginTop: normalize(6),
    lineHeight: normalize(15),
  },
  btnContainer: {
    paddingVertical: normalize(20),
    // justifyContent: "flex-end",
    // flex: 1
  },
  guidlinesContainer: {
    marginVertical: normalize(20),
  },
  guidlinesTitleTxt: {
    //color: AppTheme.COLORS.black,
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: normalize(16),
  },
  guidlinesTxt: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: normalize(12),
    lineHeight: 15,
  },
  guidlineTxtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(5),
  },
  icon: {
    marginRight: normalize(8),
  },
  textInputLabel: {
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
  },
  fintechBottomLogo: {
    marginTop: normalize(50),
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
  inputContainer:{
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P3,
  },
  newPassCont:{
    marginTop:scale(20)
  }
});
