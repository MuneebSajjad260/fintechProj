import { StyleSheet, TurboModuleRegistry } from 'react-native';
import { scale } from '../../shared/utils/scale';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';
const styles = StyleSheet.create({


  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.darkModeBg,

  },
  spaceEven:{justifyContent:'space-evenly'},
  textContainer: {
    paddingHorizontal: normalize(20),
    marginBottom: normalize(10)

  },
  img: {
    //bottom: 0,
    //alignSelf: "center",
    height: scale(250),
    width: scale(250,true),
    resizeMode:'contain',   
   

  },
  imgcontainer: {
    // flex: 1,
    // backgroundColor: AppTheme.COLORS.primaryBlueBg,
    // paddingVertical: AppTheme.MARGIN.HIGH,
    // alignItems: "center",
    // justifyContent: 'space-around',

    marginTop: normalize(260),
    alignItems: 'center',

  },

  fintechText: {
    color: AppTheme.COLORS.white,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: scale(30),

  },
  introText:
  {
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    marginTop: normalize(29)

  },
  btnContainer:
  {
    marginTop: normalize(31),
    flexDirection: 'row'
  },

  btnAllignment:
  {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: normalize(30),
    marginTop: normalize(32),
    marginBottom: normalize(23)
  },

  secondaryBtnContainer:
  {
    flex: 1,
    backgroundColor: '#0D0D0D',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    marginRight: normalize(20)
  },

  secondaryBtnContainer2:
  {
    flex: 1,
    backgroundColor: '#0129FA',
  },
  tokenImg:
  {alignItems:'center'}
});

export default styles;
