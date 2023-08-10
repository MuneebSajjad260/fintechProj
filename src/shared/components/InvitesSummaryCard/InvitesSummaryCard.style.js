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
  { 
    marginTop:AppTheme.SPACINGS.MARGINS.M1},
  flexDirection:
  { flexDirection: 'row', alignItems: 'center' },
  inviteText:
  {
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: AppTheme.COLORS.black,
    marginLeft: normalize(8)
  },
  editText:{
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: AppTheme.COLORS.black,
   
  },
  editBtnContainer:{
    borderWidth:1,
    borderColor:'rgba(0, 0, 0, 0.1)',
    width:'auto',
    height:'auto',
    paddingHorizontal:normalize(17.5),
    paddingVertical:normalize(7.5),
    borderRadius:4
  },
  marginTop:
  { marginTop: normalize(3) },
  teamMemberContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(14)
  },
  teamMemberName:
{
  fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  //color: AppTheme.COLORS.black,
  marginLeft: normalize(16),
  lineHeight: normalize(14)
},
  InviteContainer:{
  
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(18)
  
  },
  inviteName:
{
  fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  color: AppTheme.COLORS.black,
  marginLeft: normalize(0),
  lineHeight: normalize(14)
}

});

export default style;