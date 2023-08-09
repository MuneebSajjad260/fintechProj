import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';
import { scale } from '../../shared/utils/scale';
const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: AppTheme.COLORS.white,
    flex: 1
  },
  gestureContainer: {
    backgroundColor: AppTheme.COLORS.white,
    flex: 1
  },
  mainContainer: {
    // margin: normalize(4),

    flex: 1,
    backgroundColor: AppTheme.COLORS.white
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: normalize(20),
  },
  btnContainer:
    {
      marginTop: normalize(20)
    },
  secBtnContainer:
    {
      borderWidth: 1,
      borderColor: '#CACACA',
      backgroundColor: AppTheme.COLORS.white
    },
  secBtnText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: AppTheme.COLORS.black,
    fontSize: normalize(16),

  },
  bottomSheetHeading: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //  color: AppTheme.COLORS.black,
    fontSize: normalize(16),
    alignSelf: 'center',

  },
  bottomSheetSubHeading: {

    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: normalize(12),
    alignSelf: 'center',
    marginTop: normalize(20)
  },
  bottomSheetContainer: {
    padding: normalize(20)
  },
  bottomSheetBtnContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(20)
  },
  yesBtn: {
    flex: 0.48
  },
  noBtn: {
    flex: 0.48
  },
  paymentCard:{
    marginTop:normalize(25)
  },
  cancelBtn:{
    marginTop:normalize(10)
  },
  btn1:{
    marginLeft:scale(30)
  },
  backToHomeScreen: {

    marginTop: normalize(20)
  },
});

export default styles;