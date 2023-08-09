import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  gestureContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    height: '100%',
  },
  subContainer: {
    padding: scale(20),
  },
  headerContainer: {
    flexDirection: 'row',
    height: scale(90),
    backgroundColor: AppTheme.COLORS.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(21),
  },
  divider: {
    backgroundColor: 'rgba(202, 202, 202, 0.51)',
    height: 1,
    zIndex: -10,
    marginVertical: scale(13),
    marginRight: scale(20),
    marginLeft: scale(55),
  },
  allignInRow: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  cardContainer: {
    marginBottom: scale(20),
    padding:10
  },
  tabName: {
    marginLeft: scale(24),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    // fontSize: scale(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(19),
  },
  profileEmail: {
    marginLeft: scale(24),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.darkText,
    lineHeight: scale(12),
    marginTop: scale(2),
  },
  tabInnerText: {
    marginLeft: scale(24),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.darkText,
    lineHeight: scale(12),
    marginTop: scale(2),
  },
  //* Bottom Sheet Content
  btmContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    justifyContent: 'space-between',
  },
  btmBtnContainer: {
    marginTop: scale(32),
  },
  logoutImg: {
    alignSelf: 'center',
  },
  subTitle: {
    textAlign: 'center',
    marginTop: scale(12),
    marginHorizontal: scale(13),
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.text,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(14),
  },
  logoutTxt: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
  },
  pinCode:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.purple,
  },
  accessCode:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.greyLight
  },
  accessCodeCont:
  {flexDirection:'row'},
  copyCont:
  {marginLeft:8}
});
export default styles;
