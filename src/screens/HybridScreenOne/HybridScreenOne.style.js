import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  statusBar:
    {

      backgroundColor: AppTheme.COLORS.black
    },
  mainContainer: {
    flex: 1,
    // backgroundColor: AppTheme.COLORS.white,
    height: '100%',
  },
  headerContainer: {

    height: normalize(48),
    backgroundColor: AppTheme.COLORS.darkModeBg,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },
  subContainer: {
    paddingHorizontal: normalize(16),
    height: '100%',
    // backgroundColor: AppTheme.COLORS.white,
    // padding: normalize(20),
  },
  scrollViewContainer:
    {
      flex: 1
    },
  title: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
    marginTop: normalize(13)
  },
  tabContainer: {
    flexDirection: 'row',
    // backgroundColor: "red",
    justifyContent: 'space-around',
    marginTop: normalize(30),
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
    position: 'absolute',
    bottom: 4,
    zIndex: -10
    // backgroundColor: AppTheme,
    // marginVertical: normalize(12),
  },
  monthleOrYearlyCard:
    {
      marginTop: normalize(15),
      //  backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderRadius: 8
    },
  monthlyTxt: {

    color: AppTheme.COLORS.white,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.BOLD
  },
  SARtext: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
   
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    color: AppTheme.COLORS.yellow,
    marginRight: normalize(3.2)

  },
  price: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
   
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    color: AppTheme.COLORS.yellow

  },
  deskTxt: {
    
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    color: ' rgba(255, 255, 255, 0.5)',
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    alignSelf: 'flex-end'
  },
  services:
    {
      flexDirection: 'row',
      alignItems: 'center'
    },
  servicesContainer: {
    marginTop: normalize(8),

  },
  servicesTxt: {
    marginLeft: 7,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    lineHeight: 24,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.white
  },
  priceTxt: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    
    //marginVertical: normalize(14),

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
  allignInRow:
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
  allignInCol:
    {
      flexDirection: 'column',
      // alignItems: "center",
      // justifyContent: "space-between"
    },
  marginTop:
    {
      marginTop: normalize(8)
    },
  descriptionContainer:
    {
      flex: 1,
      marginLeft: normalize(10),
      marginTop: normalize(14)
    },
  noteContainer:
    {
      height: 'auto',
      borderWidth: 1,
      borderColor: AppTheme.COLORS.orange,
      borderRadius: 7,
      paddingHorizontal: normalize(9),
      paddingVertical: normalize(10),



    },
  bottom: {
    flex: 0.8,
    justifyContent: 'flex-end',
    // marginBottom: 0
  },
  Note:
    {
      color: AppTheme.COLORS.orange,
      marginLeft: normalize(11),
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      marginBottom: normalize(8)
    },
  noteDescription:
    {
      //color: AppTheme.COLORS.black,
      fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      marginLeft: normalize(35),
      lineHeight: normalize(12.19),

    }
});
export default styles;