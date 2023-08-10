import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../theme';

const style = StyleSheet.create({
  dayPass:{
    color:AppTheme.COLORS.purple,
    fontFamily:AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize:AppTheme.FONTS.SIZE.TEXT.T2
  },
  product:{
    color:AppTheme.COLORS.purple,
    fontFamily:AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize:AppTheme.FONTS.SIZE.TEXT.T2
  },
  today:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.TEXT.T2,
    marginLeft:normalize(8)
  },
  Download:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    marginLeft:normalize(10)
  },
  downloadContainer:{
    flexDirection:'row',
    alignItems:'center',
    width:'auto',
    height:'auto',
    borderWidth:1,
    borderColor:AppTheme.COLORS.greyLight,
    paddingHorizontal:normalize(10),
    paddingVertical:normalize(12),
    borderRadius:4
  },
  name:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.TEXT.T2,
    marginTop:normalize(15)
   
  },
  email:{
    color:AppTheme.COLORS.darkText,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  flexDirection:{
    flexDirection:'row',
    alignItems:'center'
  },
  paid:{
    color:'#35D7A1',
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  paidContainer:{
    height:'auto',
    width:'auto',
    paddingHorizontal:normalize(13.5),
    paddingVertical:normalize(2.5),
    marginLeft:normalize(10),
    backgroundColor:'rgba(53, 215, 161, 0.2)',
    borderRadius:2
  },
  invoiceText:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    textDecorationLine:'underline',
    marginLeft:normalize(6)
  },
  card:{
    padding: normalize(10), borderRadius:8  ,elevation:3
  },
  resource:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  resourceContainer:{
    marginTop:normalize(18),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  resourcePrice:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  divider:{
    marginVertical:normalize(12),
    color:'rgba(0, 0, 0, 0.1)',
    height:1
  },
  subTotalContainer:{

    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  dayPassPriceValue:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  dayPassPrice:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  subTotal:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  subTotalPrice:{
    ////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  vatContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:normalize(6)
  },
  vat:{
    color:AppTheme.COLORS.text,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  vatPrice:{
    color:AppTheme.COLORS.text,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  amountPaidCont:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:normalize(14),
    backgroundColor:'rgba(1, 41, 250, 0.15)',
    marginHorizontal:-10,
    marginBottom:-10,
    paddingHorizontal:10,
    width:'auto',
    height:'auto',
    paddingVertical:normalize(15),
    borderBottomEndRadius:8,
    borderBottomStartRadius:8
  },
  amountPaid:{
    color:AppTheme.COLORS.purple,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  amountPaidprice:{
    color:AppTheme.COLORS.purple,
    fontFamily:AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  shimmerAvail:
  {
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    height: normalize(20),
    borderRadius: normalize(4),
    marginLeft: normalize(200),
    width: '20%',
  },

});

export default style;