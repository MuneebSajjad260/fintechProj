import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  safeAreaContainer:{
    flex:1,
    backgroundColor:AppTheme.COLORS.white,
   
  },
  marginBottom:
  {marginBottom:normalize(10)},
  mainContainer:{
    padding:normalize(20)
  },
  fintechDetails:{
    color:AppTheme.COLORS.greyLight,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  shimmerAvail:
  {
    height: normalize(300),
    width: normalize(90),
    marginTop: normalize(20),
    marginLeft: normalize(18),
    borderRadius:8

  },
});

export default styles;