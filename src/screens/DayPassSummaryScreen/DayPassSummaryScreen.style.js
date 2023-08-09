import { StyleSheet } from 'react-native';

import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:AppTheme.COLORS.white
  },
  innerContainer:{
    padding:normalize(20),
    flex:1,
    justifyContent:'space-between'
  },
  allignInRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  flexDirectionRow:{
    flexDirection:'row',
   
  },
  yourSchedule:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(19.5)
  },
  name:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.purple,
    lineHeight:normalize(15),
    marginTop:normalize(6)
  },
  innerScheduleContainer:{
    marginLeft:normalize(9)
  },
  bookingDetailContainer:{
    marginTop:normalize(15),
    marginHorizontal:normalize(36),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  bookedText:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    // color:'rgba(0, 0, 0, 0.5)',
    lineHeight:normalize(12),
   
  },
  bookingTimeContainer:{
    marginTop:normalize(6),
    marginHorizontal:normalize(36),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  bookingTime:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(6)
  },
  CardContainer:{
    borderRadius:8
  },
  paymentContainer:{
    flexDirection:'row',
    marginTop:normalize(20)
  },
  paymentTxt:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(19.5)
  },
  paymentDesc:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(6)
  },
  paymentDetailContainer:{
    width:'auto',
    height:'auto',
    padding:normalize(10),
    backgroundColor:'rgba(0, 0, 0, 0.04)',
    borderRadius:8,
    marginTop:normalize(20)
  },
  paymentHeadings:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //  color:'rgba(0, 0, 0, 0.5)',
    lineHeight:normalize(15),
   
  },
  payemntValueTxt:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
   
  },
  totalPayableTxt:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
  },
  totalPayableAmount:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.SEMIBOLD,
    color:AppTheme.COLORS.purple,
    lineHeight:normalize(15),
  },
  divider: {
    backgroundColor: 'rgba(130, 130, 130, 0.2)',

    height: 1,
    width: '100%',
    zIndex: -10,
    marginVertical:normalize(8)
  },
  bottomSheetTitle: {
    paddingVertical: 20,

  },
  reqPlan: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: AppTheme.COLORS.black,
    paddingHorizontal: normalize(92),
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
  },
  btnContainer:
    {

      flexDirection: 'row',
      marginTop: normalize(20),

      justifyContent: 'space-between',
      paddingHorizontal: normalize(20)

    },
  btnContainerHome:{
     
    marginTop: normalize(25),
    paddingHorizontal: normalize(20)
  },
  BtnStyle:
    {
      width: '48%',
     
    },
  noResource:{
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.black,
    paddingHorizontal: normalize(90),
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
  },
  noResourceDesc:{
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.black,
    paddingHorizontal: normalize(55),
    textAlign: 'center',
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop:normalize(12)
  },
  shimmerAvail:
    {
      backgroundColor: 'rgba(134, 134, 134, 0.06)',
      height: normalize(20),
      borderRadius: normalize(4),
      marginLeft: normalize(200),
      width: '20%',
    },
  btn1:{
    marginLeft:scale(30)
  }
});

export default styles;