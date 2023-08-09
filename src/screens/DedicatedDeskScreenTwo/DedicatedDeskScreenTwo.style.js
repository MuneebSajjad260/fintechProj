import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  statusBar:{
  
    flex:1,
    backgroundColor: AppTheme.COLORS.black
    
  },
  gestureContainer:
    {
      flex: 1,
      backgroundColor: AppTheme.COLORS.white
    },
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,

    padding: normalize(20),
    position: 'relative'

  },
  btnContainer:
    {
      paddingHorizontal: normalize(20),
      // marginTop: normalize(20),

      marginBottom: normalize(20)
    },
  inputContainer: {

    marginTop: normalize(20),
    // backgroundColor: "red"

  },
  innerContainer:
        { padding: normalize(20) },
  title: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,

  },
  tabContainer: {
    flexDirection: 'row',
    // backgroundColor: "red",
    justifyContent: 'space-around',
    marginTop: normalize(34),
    // marginBottom: normalize(24)
  },
  tabTxt: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    lineHeight: normalize(19.5),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontWeight: '600',
  },
  divider: {
    height: 0.7,
    width: '100%',
    marginVertical: normalize(20),
    // bottom: 4,
    zIndex: -10
    // backgroundColor: AppTheme,
    // marginVertical: normalize(12),
  },
  monthlyTxt: {
    fontWeight: '500',
    color: AppTheme.COLORS.primaryBlueBg,
    fontSize: 24,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM
  },
  price: {
    fontSize: normalize(30),
    lineHeight: normalize(37),
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.black

  },
  deskTxt: {
    lineHeight: 50,
    fontSize: 16,
    color: '#081F32',
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  services:
    {
      flexDirection: 'row',
      alignItems: 'center'
    },
  servicesContainer: {
    marginTop: normalize(12),
    marginBottom: normalize(24)
  },
  servicesTxt: {
    marginLeft: 7,
    fontWeight: '400', fontSize: 16,
    lineHeight: 24,
    fontFamily: AppTheme.FONTS.TYPE.LIGHT,
    color: AppTheme.COLORS.black
  },
  priceTxt: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR
  },
  indicator: {
    height: 9,
    width: normalize(144),
    backgroundColor: AppTheme.COLORS.primaryGreenBg,
    borderRadius: normalize(16),
    marginTop: normalize(20),
    zIndex: 10000
  },
  tabView: {
    alignItems: 'center',
    flex: 1
  },


  expectedDateTxt: {
    // color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,

    lineHeight: normalize(20),

    marginRight: normalize(12)
  },
  expectedEndDate: {
    color: AppTheme.COLORS.darkText,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

    lineHeight: normalize(14),
    marginTop: normalize(4),

    marginRight: normalize(10)
  },
  teamMemberTxt: {
    // color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    lineHeight: normalize(20),
    // marginBottom: normalize(12),
  },
  BottomSheetTitle: {
    textAlign: 'center',
    marginTop: normalize(18),
    //color: AppTheme.COLORS.black,
    fontSize: normalize(18),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,

  },
  bottomSheetContainer: {


  },
  bottomSheetBtnContainer: {
    marginHorizontal: normalize(22),
    flex: 0.9,
    // backgroundColor: "red",
    justifyContent: 'flex-end'
    // marginTop: normalize(30),
    //marginBottom: normalize(50)
  },
  headerContainer: {

    height: normalize(48),
    backgroundColor: AppTheme.COLORS.darkModeBg,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },

  inputViewContainer:
    {
      borderWidth: 1,
      borderColor: '#CACACA'
    },
  placeholdertext:
    {

      color: AppTheme.COLORS.text,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: normalize(12),

    },
  scrollView:

    {
      flexGrow: 1,
      justifyContent: 'space-between'

    },
  picker:
    {
     
      //backgroundColor: AppTheme.COLORS.white,
      // eslint-disable-next-line no-undef
      width: Platform.OS === 'ios' ? '100%' : '40%',
      height: normalize(200),
      alignSelf: 'center'
    }


});
export default styles;