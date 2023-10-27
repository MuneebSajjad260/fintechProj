import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: AppTheme.COLORS.white,
  },
  gestureContainer: {
    flex: 1,
    // backgroundColor: AppTheme.COLORS.white,
  },
  ScrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding:AppTheme.SPACINGS.PADDINGS.P1
  },
  mainContainer: {
    flex: 1,
    justifyContent:'space-between',
    paddingVertical:AppTheme.SPACINGS.PADDINGS.P1
  },
  title: {
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    // //color: AppTheme.COLORS.black,
  },
  allignInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamManagment: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // //color: AppTheme.COLORS.black,
    lineHeight: normalize(19.5),
    marginLeft: normalize(20),
  },
  edit: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.white,
    lineHeight: normalize(24),
  },
  card: {
    borderRadius: 4,
    // marginHorizontal: normalize(5),
    marginTop: normalize(10),
  },

  imgTxtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  teamName: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    // //color: AppTheme.COLORS.black,
    marginLeft: normalize(20),
  },
  teamRoleContainer: {
    height: normalize(19),
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(6),
    backgroundColor: AppTheme.COLORS.orange,
    borderRadius: 2,
  },
  teamRole: {
    color: AppTheme.COLORS.white,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  privateOfficeContainer: {
    height: normalize(19),
    width: 'auto',
    // alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: normalize(6),
    backgroundColor: 'rgba(1, 41, 250, 0.8)',
    borderRadius: 2,
  },
  privateOffice: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.white,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
  },
  selectedTeamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    backgroundColor: 'rgba(202, 202, 202, 0.51)',

    height: 1,
    width: '100%',
    zIndex: -10,
    marginVertical: normalize(20),
  },
  teamMember: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    // //color: AppTheme.COLORS.black,
    marginLeft: normalize(20),
    alignSelf: 'center',
  },
  dedicatedDeskContainer: {
    height: normalize(19),
    width: 'auto',
    // alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: normalize(6),
    backgroundColor: 'rgba(240, 95, 35, 0.15)',
    borderRadius: 2,
  },
  dedicatedDesk: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.orange,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
  },
  closeBtn: {
    marginLeft: normalize(10),
  },
  bottomSheetTitle: {
    marginVertical: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomSheetScroll: {
    // paddingVertical: 20,
    flexGrow: 1,
  },
  removeMember: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // //color: AppTheme.COLORS.black,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(19.5),
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1
  },
  codeResent: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // //color: AppTheme.COLORS.black,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(19.5),
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    marginTop: normalize(16),
  },
  removeMemberDesc: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // //color: AppTheme.COLORS.black,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(24),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop: normalize(20),
    marginBottom: normalize(10),
  },

  BtnStyle: {
    width: '48%',
  },
  resendCodeBtn: {
    width: '48%',
    backgroundColor: AppTheme.COLORS.white,
    borderWidth: 1,
    borderColor: AppTheme.COLORS.black,
  },
  resendCodeTxt: {
    //color: AppTheme.COLORS.black,
  },
  btnAllign: {
    // flexDirection: 'row',
    marginTop: normalize(20),
    // justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  removeMemberDone: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(24),
    marginTop: normalize(8),
    paddingHorizontal: normalize(20),
  },
  codeResentDone: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(24),
    marginVertical: normalize(8),
    paddingHorizontal: normalize(20),
  },
  DoneBtnStyle: {
    marginTop: normalize(20),
  },
  btnMargin: {marginVertical: normalize(20)},
  payingMemberChange: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // //color: AppTheme.COLORS.black,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(24),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop: normalize(20),
    marginBottom: normalize(10),
  },
  payingMember: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // //color: AppTheme.COLORS.black,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(19.5),
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1
  },
  inputViewContainer: {
    backgroundColor: AppTheme.COLORS.secondaryGreyLightBg,
    height: 'auto',
    width: 'auto',
    borderRadius: normalize(4),
    justifyContent: 'flex-end',
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(14),
    marginTop: normalize(20),
  },
  name: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.officialBlack,
  },
  editContainer: {
    width: 'auto',
    height: 'auto',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(2),
    borderRadius: 4,
    borderColor:AppTheme.COLORS.white,
    // backgroundColor: AppTheme.COLORS.purple,
  },
  memberStatus: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    //color: AppTheme.COLORS.black,
    marginTop: normalize(15),
  },
  creditUsageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(24),
  },
  creditUsage: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    // //color: AppTheme.COLORS.black,
    marginLeft: normalize(20),
  },
  toggleContainer: {
    height: 'auto',
    width: 'auto',
    borderRadius: 4,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(11),
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    marginTop: normalize(10),
  },
  poolText: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    // //color: AppTheme.COLORS.black,
  },
  poolDescText: {
    width: '75%',
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1
    // //color: AppTheme.COLORS.black,
  },
  thumbOffStyle: {backgroundColor: AppTheme.COLORS.greyLight},
  trackOff: {
    borderColor: AppTheme.COLORS.darkText,
    borderWidth: 1,
  },
  memberContainer: {
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    height: normalize(50),
    borderRadius: normalize(4),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(12),
    borderColor: AppTheme.COLORS.orange,
  },
  checkedContainer: {
    backgroundColor: AppTheme.COLORS.orange,
    height: normalize(20),
    width: normalize(20),
    borderRadius: normalize(50),
    justifyContent: 'center',
  },
  nameText: {
    lineHeight: normalize(17),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: AppTheme.COLORS.officialBlack,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  textInputLabel: {
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
  },
  textInputContainer: {
    backgroundColor: '#EEEEEE',
    borderWidth: 0,
    marginVertical: normalize(5),
  },
  textInput: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.officialBlack,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  img: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timer: {
    marginLeft: normalize(21),
    color: '#F05F23',
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: normalize(20),
  },
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shimmerView: {
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    height: normalize(50),
    borderRadius: normalize(4),
    // paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(12),
  },
  shimmerViewInactive: {
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    height: normalize(16),
    borderRadius: normalize(4),
    //paddingHorizontal: normalize(20),
    width: '15%',
    marginTop: normalize(12),
  },
});

export default styles;
