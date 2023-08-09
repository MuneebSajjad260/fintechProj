import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';
import { scale } from '../../shared/utils/scale';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,

  },
  innerContainer: {
    padding: normalize(20),

  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  meetingInvitationText: {
    fontSize:AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    // color: AppTheme.COLORS.black,
    marginLeft: normalize(9)
  },
  allignInRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  max7Text: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: 'rgba(0, 0, 0, 0.5)',
    marginLeft: normalize(9)
  },
  selectTeamMemberText: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
    marginTop: normalize(20),
    marginBottom:normalize(10)
  },
  InputTeamMemberContainer: {
    marginTop: normalize(8)
  },
  otherInvitesText: {
    fontSize:AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
    marginTop: normalize(20)
  },
  addInviteeBtn:
    {
      width: normalize(89),
      height: normalize(34),
      alignSelf: 'flex-start',
      marginTop: normalize(17)
    },
  addInviteeText:
    {
      fontSize: normalize(12),
      color: AppTheme.COLORS.white,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR
    },
  proceedBtnContainer:
    {

      paddingHorizontal: normalize(20),
      paddingBottom:normalize(20)

    },
  textInputLabel:
    {
      fontSize: normalize(12),
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      color: AppTheme.COLORS.black,

    },
  textInputContainer: {
    // backgroundColor: '#EEEEEE',
    //borderWidth: 0,
    marginVertical: AppTheme.SPACINGS.MARGINS.M5,
    paddingVertical:AppTheme.SPACINGS.PADDINGS.P2,
    paddingHorizontal:AppTheme.SPACINGS.PADDINGS.P1,
  },
  textInputContainerError: {
    //backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderColor: AppTheme.COLORS.error,

  },
  inputFieldContainer: {
    marginTop: normalize(20)
  },
  cancelBtn: {
    width: normalize(67),
    height: normalize(34),
    alignSelf: 'flex-start',
    marginTop: normalize(17),
    borderWidth: 1,
    // borderColor: AppTheme.COLORS.black,
    // backgroundColor: AppTheme.COLORS.white,
  },
  canceText: {
    fontSize: normalize(12),
    //color: AppTheme.COLORS.black,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR
  },
  saveBtn: {
    width: normalize(67),
    height: normalize(34),
    marginTop: normalize(17),
    marginLeft: normalize(10)
  },
  saveBtnText: {
    fontSize: normalize(12),
    color: AppTheme.COLORS.white,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR
  },
  textInput:
    {
      fontSize: normalize(12),
      color: AppTheme.COLORS.officialBlack,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR

    },
  shimmerAvail:{
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    height: normalize(50),
    borderRadius: normalize(4),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(12)
  }
});

export default styles;