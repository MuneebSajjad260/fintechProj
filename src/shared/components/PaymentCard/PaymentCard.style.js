import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../theme';

const style = StyleSheet.create({
  payment:{
    //////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1
  },
  flexDirection:{
    flexDirection:'row',
    alignItems:'center'
  },
  paid:{
    color:AppTheme.COLORS.white,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  pending:{
    color:AppTheme.COLORS.white,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  paidContainer:{
    height:'auto',
    width:'auto',
    paddingHorizontal:normalize(13.5),
    paddingVertical:normalize(2.5),
    marginLeft:normalize(10),
    backgroundColor:'#35D7A1',
    borderRadius:2
  },
  objectedContainer:{
    height:'auto',
    width:'auto',
    paddingHorizontal:normalize(13.5),
    paddingVertical:normalize(2.5),
    marginLeft:normalize(10),
    backgroundColor:'#F7B718',
    borderRadius:2
  },
  objected:{
    color:AppTheme.COLORS.white,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  refundedContainer:{
    height:'auto',
    width:'auto',
    paddingHorizontal:normalize(13.5),
    paddingVertical:normalize(2.5),
    marginLeft:normalize(10),
    backgroundColor:'#0129FA',
    borderRadius:2
  },
  refunded:{
    color:AppTheme.COLORS.white,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  pendingContainer:{
    height:'auto',
    width:'auto',
    paddingHorizontal:normalize(13.5),
    paddingVertical:normalize(2.5),
    marginLeft:normalize(10),
    backgroundColor:'#F05F23',
    borderRadius:2
  },
  invoiceText:{
    //////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    textDecorationLine:'underline',
    marginLeft:normalize(6)
  },
  card:{
    padding: normalize(10), borderRadius:8  ,elevation:3
  },
  resource:{
    //////color:AppTheme.COLORS.black,
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
    //////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  divider:{
    marginVertical:normalize(10),
    backgroundColor:'rgba(0, 0, 0, 0.1)',
    height:1
  },
  darkModeDivider: {
    marginVertical:normalize(10),
    backgroundColor: AppTheme.COLORS.text,
    height:1
  },
  subTotalContainer:{

    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  SubtotalPrice:{
    //////color:AppTheme.COLORS.black,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1
  },
  Subtotal:{
    color:AppTheme.COLORS.text,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
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
    marginTop:normalize(18),
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