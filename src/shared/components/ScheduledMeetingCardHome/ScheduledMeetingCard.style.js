import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';
import { scale } from '../../utils/scale';
const style = StyleSheet.create({
  img: {
    // height: normalize(131),
    // width: "100%",

    position: 'absolute',
    bottom: 0,
    right: 0,
// justifyContent:'space-between'
  },
  card:{
    padding: normalize(0), borderRadius: 10,
   
    width: normalize(280),
    elevation: 3,
  
    marginLeft:normalize(10)
  },
  mainContainer:{
    height: normalize(24),
    width: normalize(69),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderTopRightRadius: 8,
    top: 0,
    right: 0,
    // paddingVertical: normalize(6),
    // paddingHorizontal: normalize(10),
    backgroundColor: AppTheme.COLORS.purple
  },
  upcoming:{
    fontSize: normalize(10),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
   
    lineHeight: normalize(12)
  },
  resourceName:{
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  
    lineHeight: normalize(15)
  },
  flexDirection:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(3)
  },
lengthVisitor:{
  fontSize: normalize(9),
  fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  marginLeft: normalize(5),
 
},

});

export default style;