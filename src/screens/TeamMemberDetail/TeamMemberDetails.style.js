import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  safeAreaContainer:
    {
      flex: 1,
      backgroundColor: AppTheme.COLORS.white
    },
  mainContainer:{
    padding:normalize(20)
  },
  card:{
    borderRadius:4
  },
  flexDirectionRow:{
    flexDirection:'row',
  },
  Heading:{
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:normalize(16),
    color:AppTheme.COLORS.black,
    marginLeft:normalize(13)
  },
  subHeading:{
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:normalize(12),
    color:AppTheme.COLORS.text,
    marginLeft:normalize(14),
    marginTop:normalize(4)
  },
  subContainer:{
    // marginLeft:normalize(30),
    marginTop:normalize(10),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  subContainer2:{
    marginLeft:normalize(30),
    marginTop:normalize(10),

  },
  active:{
    fontFamily:AppTheme.FONTS.TYPE.BOLD,
    fontSize:normalize(12),
    color:AppTheme.COLORS.purple,
    marginLeft:normalize(15),
    marginTop:normalize(4)
  },
  marginTop:{
    marginTop:normalize(20)
  },
  joiningDateContainer:{
    marginLeft:normalize(30),
    marginTop:normalize(6)
  }
});

export default styles;