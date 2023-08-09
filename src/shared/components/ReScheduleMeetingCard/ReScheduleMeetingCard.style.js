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
  topAllign:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(10),
  },
  resourceName:
  {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: AppTheme.COLORS.black,
    lineHeight: normalize(17)
  },
  flexDirection:
  {
    flexDirection: 'row',
    alignItems: 'center'

  },
  persons:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

    marginLeft: normalize(5),
    //color: AppTheme.COLORS.black
  },
  desc:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: 'rgba(0, 0, 0, 0.5)',
    marginTop: normalize(7)
  },
  midAllign:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(12)
  },
  marginLeft:
  { marginLeft: normalize(8) },
  bookDate:
  {
    fontSize:  AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,

  },
  hour:
  {
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: 'rgba(0, 0, 0, 0.5)',
    marginTop: normalize(6)

  },
  duration:
  {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,

  },
  durationTime:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: 'rgba(0, 0, 0, 0.5)',
    marginTop: normalize(6)

  },
  divider:
  {
    height: 0.7,
    width: '100%',
    marginTop: normalize(16),
    marginBottom: normalize(9)

  },
  width:
  { width: '42%' },
  bookedOn:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: 'rgba(0, 0, 0, 0.5)',

  },
  date:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
    marginTop: normalize(6)

  },
  endAllign:
  { marginLeft: normalize(20), width: '42%' },
  bookedBy:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: 'rgba(0, 0, 0, 0.5)',

  },
  teamLead:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
    marginTop: normalize(6)

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