import { StyleSheet } from 'react-native';

import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:AppTheme.COLORS.white
  },
  innerContainer:{
    padding:normalize(20)
  },
  checkAvailibilityTxt:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(19.5)
  },
  selectDateText:
  {
    //color: 'rgba(0, 0, 0, 0.5)',
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

    lineHeight: normalize(17),
    marginBottom: normalize(10),
    marginTop:normalize(6)
  },
  inputView:
  {
    width: 'auto',
    height: 'auto',
    borderRadius: normalize(4),
    justifyContent: 'center',
    paddingHorizontal: normalize(10),
    paddingVertical:normalize(15)
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  placeHolder: {
    //color: AppTheme.COLORS.officialBlack,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: normalize(9),

  },
  modalContainer:
  {
    flex: 1,

  },
  CalendarPickerContainer:
  {

    backgroundColor: '#FFFFFF',
    marginTop: normalize(190),
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8
  },
  calendarMonth:
  {
    color: AppTheme.COLORS.purple,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR

  },
  calendarYear:
  {
    color: AppTheme.COLORS.purple,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR
  },
  calendarText:
  {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR
  },
  dayPassCardContainer:{
    marginTop:normalize(20)
  },
  dayPassTxt:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(19.5)
  },
  allignInrow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  available:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.available,
    lineHeight:normalize(12)
  },
  unAvailable:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.error,
    lineHeight:normalize(12)
  },
  availableContainer:{
    width:'auto',
    height:'auto',
    paddingHorizontal:normalize(11),
    paddingVertical:normalize(4),
    backgroundColor:'rgba(48, 185, 145, 0.1)',
    borderRadius:2
  },
  unAvailableContainer:{
    width:'auto',
    height:'auto',
    paddingHorizontal:normalize(11),
    paddingVertical:normalize(4),
    backgroundColor:'rgba(239, 64, 80, 0.1)',
    borderRadius:2
  },
  shimmerAvail:
  {
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    height: normalize(20),
    borderRadius: normalize(4),
    marginLeft: normalize(165),
    width: '20%',
  },
  dateContainerShimmer:
 {
   backgroundColor: 'rgba(134, 134, 134, 0.06)',
   height: normalize(50),
   borderRadius: normalize(4),
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   width: '100%',
  

 }
});

export default styles;