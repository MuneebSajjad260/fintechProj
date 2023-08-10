import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  safeAreaContainer:
    {
      flex: 1,
      backgroundColor: AppTheme.COLORS.white
    },
  statusBar:
    {

      backgroundColor: AppTheme.COLORS.black
    },
  Schedule:{
    flexDirection:'row',
    // flex:1
   
  },
  officeCard:{
    flexGrow:1
  },
  ScrollView: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  mainContainer: {
    flex: 1,
    justifyContent:'space-between',
    //  marginBottom:normalize(40)

  },
  headerContainer: {
    flexDirection: 'row',
    height: normalize(90),
    backgroundColor: AppTheme.COLORS.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(21),
  },
  subContainer: {
    // paddingHorizontal: normalize(20),
  
  },
  txtContainer: {
    marginTop: normalize(20)
  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.black,
    // lineHeight:normalize(19.5)
    //marginVertical: normalize(4),

  },
  desc: {
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.officialBlack,
    marginVertical: normalize(6),
    lineHeight: normalize(17)
  },

  allignInRow:
    {
      flexDirection: 'row',
      alignItems: 'center'
    },
  fintechBottomLogo: {
    alignItems: 'flex-end',
    // flex:1,
    // justifyContent: 'flex-end',
    // marginBottom:normalize(20)
  },
  img: {

    height: normalize(47),
    width: normalize(82),

  },
  resourceType: {
    height: normalize(150),
    // width: normalize(90),
    // marginTop: normalize(20),
    marginLeft: normalize(18),
    width: '90%',
    borderRadius: normalize(10) 
  },
  pendingstate:{
    width:'auto',
    height:'auto',
    padding:normalize(15),
    backgroundColor:'rgba(230, 234, 255, 1)',
    borderRadius:8,
    margin:normalize(20)
  },
  marginLeft:{
    marginLeft:normalize(23)
  },
  approvalPending:{
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.purple,
    lineHeight: normalize(17)
  },
  approvalPendingDesc:{
    width:normalize(234),
    marginTop:normalize(6),
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.black,
    lineHeight: normalize(14)
  },
  viewMeeting:
{flexDirection:'row',
  justifyContent:'space-between' ,
  marginTop:AppTheme.SPACINGS.MARGINS.M1,
  alignItems:'center',
  marginBottom:scale(10),
  paddingHorizontal:AppTheme.SPACINGS.MARGINS.M1
},
  waitImage: {
    alignSelf: 'center',
    marginTop: normalize(43)
  },
  paddingHorizontal:
{ 
  paddingHorizontal:AppTheme.SPACINGS.MARGINS.M1
},
  meetings: {
    // color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  viewAll: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: 'rgba(0, 0, 0, 0.5)'
  },
  
  allignInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nothinschedule:{
    marginTop:AppTheme.SPACINGS.MARGINS.M1,
    // alignItems:'center',
    justifyContent:'center'
  },
  resourceTypeSchedule:{
    height: normalize(110),
    marginVertical: normalize(20),
    marginLeft: normalize(18),
    width: '80%',
    borderRadius: normalize(10)
  },
  shimmerFlex:{
    flexDirection:'row'
  },
  marginTop:
  {
    marginTop:normalize(-20)
  },
  product:{
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: AppTheme.COLORS.black,
    // lineHeight:normalize(19.5)
  },
  cantBook:{
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.greyLight,
    marginTop:AppTheme.SPACINGS.MARGINS.M7
  },
  flexDirection:{
    flexDirection:'row'
  }
});

export default styles;