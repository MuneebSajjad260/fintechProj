import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';
const style = StyleSheet.create({
  img: {
    height: normalize(131),
    width: '100%',
    borderRadius: 4,
  },
  card:
{ padding: normalize(10), elevation: 3 },
  allign:
{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: normalize(10),
},
  officeNo:{
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: AppTheme.COLORS.black,
    lineHeight: normalize(17)
  },
  flexDirection:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  today:{
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,

    marginLeft: normalize(5),
    // color: AppTheme.COLORS.black
  },
  //status
  statusContainer:
   {
     position:'absolute',
     height:'auto',
     width:'auto',
     paddingVertical:AppTheme.SPACINGS.PADDINGS.P6,
     paddingHorizontal:AppTheme.SPACINGS.PADDINGS.P1,
     backgroundColor:'red',
     alignSelf:'flex-end',
     borderBottomLeftRadius:4,
     borderTopRightRadius:4
   
   },
  statusTxt:{
    color:AppTheme.COLORS.white,
    fontFamily:AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  }


});

export default style;