import { StyleSheet } from 'react-native';
import { AppTheme } from '@themes';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  safeAreaContainer:
  {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white
  },
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  innerContainer: {
    paddingHorizontal: normalize(20),
    
  },
  loginImg: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  fintechBottomLogo: {
    marginTop: normalize(119)
  },
  button: {
    position: 'absolute',
    bottom: 0
  },
  img: {
    borderRadius: normalize(20),
    width: '100%',
    // height: "60%"
  },
  title: {
    fontSize: normalize(16),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    // color: AppTheme.COLORS.black,

    // lineHeight: normalize(29),
  },
  desc: {
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.LIGHT,
    color: AppTheme.COLORS.text,
    marginTop: normalize(12),

    // lineHeight: normalize(24),
    textAlign: 'left'
  },
  cardContainer: {
    marginTop: normalize(20),
    // paddingHorizontal: normalize(13),
    // paddingVertical: normalize(18),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderRadius: 8,
    // elevation: 3
  },
  cardParent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtContainer: {
    flex: 1,
    marginLeft: normalize(2),
    marginTop: normalize(12),
    marginRight: normalize(8),
  },
  imgContainer: {
    flex: 0.9
  },
  maincardContainer:
  {
    // marginTop: normalize(47)
  },
  indicator: {
    height: 3,
    width: normalize(26),
    backgroundColor: AppTheme.COLORS.orange,
    borderRadius: normalize(16),
    marginTop: normalize(4),
    zIndex: 10000
  },
  subContainer: {

    marginTop: normalize(45)
  },
  scrollView:
  {
    paddingVertical:normalize(20),
    flexGrow: 1,
    justifyContent: 'space-between'
  }
});

export default styles;
