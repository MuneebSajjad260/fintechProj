import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  mainContainer: {
    flex: 1,
    paddingTop: normalize(20),
    backgroundColor: AppTheme.COLORS.white,
  },
 
  title: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.primaryBlueBg,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: normalize(20),
  },
  officeCard: {
    // margin: normalize(4),
    paddingHorizontal: normalize(20),
    marginTop:normalize(10),
  },
  maintitle: {
    //color: AppTheme.COLORS.black,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    marginLeft: normalize(8),
  },
  cardContainer: {

    paddingTop: normalize(14)
  },
  card: {
    padding: hp('1.5%'),
    borderRadius: normalize(20),
    elevation: 10,
    shadowColor: 'rgba(152, 152, 152, 1)',
    marginTop: hp(5),
    margin: normalize(20),
  },
  cardnumber: {
    color: 'rgba(51, 51, 51, 1)',
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: normalize(24),
  },
  dateRangetext: {
    //color: AppTheme.COLORS.black,
    fontSize:  AppTheme.FONTS.SIZE.SUBTITLES.S1,
    lineHeight: normalize(14.6),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    paddingLeft: normalize(10)

  },
  dateRangetextContainer: {
    // justifyContent: "space-between",
    //  marginLeft: normalize(8),
    flexDirection: 'row',
    marginTop: normalize(8)

  },
  paymentsummarytext: {
    fontSize: normalize(22),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    marginTop: normalize(10),
    //color: AppTheme.COLORS.black
  },
  text: {
    color: '#333333',
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  divider: {
    backgroundColor: 'rgba(130, 130, 130, 0.1)',

    height: 4,
    width: '100%',
    zIndex: -10,
    marginTop: normalize(20)
  },
  flexDirectionRow: {
    flexDirection: 'row',

  },
  expectedDates: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    //color: AppTheme.COLORS.black,
    marginLeft: normalize(8),
    marginTop: normalize(4)
  },
  selectedTeamMember: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize:  AppTheme.FONTS.SIZE.SUBTITLES.S1,
    //color: AppTheme.COLORS.black,
    marginTop: normalize(4)
  },
  subContainer: {
    marginTop: normalize(20),
    paddingHorizontal: normalize(20)
  },
  btnStyle: {
    marginTop: normalize(36),
    marginBottom: normalize(20)
  },
  scrollContainer: {
    flex: 1
  },
  ImageContainer: {
    alignItems: 'center',
    marginTop: normalize(43),

  },
  headerIcons: {
    flexDirection: 'row'
  },
  teamName:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      //color: AppTheme.COLORS.black,
      marginLeft: normalize(20),
      marginTop: normalize(4)
    },
  teamRoleContainer:
    {
      height: normalize(19),
      width: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: normalize(6),
      backgroundColor: AppTheme.COLORS.orange,
      borderRadius:2,

    },
  teamRole:
    {
      color: AppTheme.COLORS.white,
      fontSize:  AppTheme.FONTS.SIZE.SUBTITLES.TAG,
      marginTop: normalize(2),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    },
  innerDivider:
    {
      backgroundColor: 'rgba(202, 202, 202, 0.51)',

      height: 1,
      zIndex: -10,
      marginTop: normalize(14),


      marginRight: normalize(20),
      marginLeft: normalize(55)
    },
  teamMember:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize:  AppTheme.FONTS.SIZE.SUBTITLES.S1,
      //color: AppTheme.COLORS.black,
      marginLeft: normalize(20),
      alignSelf: 'center'

    },
  finalPaymentText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
      //color: AppTheme.COLORS.black,
      marginLeft: normalize(8),
      marginTop: normalize(4)
    },
  paymentContainer:
    {
      height: 'auto',
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(9),
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      marginTop: normalize(20)
    },
  paymentContainerHeadings:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      // color: 'rgba(0, 0, 0, 0.5)',

    },
  paymentContainerValues:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
      //color: AppTheme.COLORS.black,
    },
  totalPayableText:
    {
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      //color: AppTheme.COLORS.black,
    },
  totalPayableValue:
    {
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
     
    },
  bottomSheetTitle: {
    paddingVertical: 20,

  },
  reqPlan: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
    paddingHorizontal: normalize(92),
    textAlign: 'center',
    fontSize: normalize(16),
  },
  allignInRow:
    {

      flexDirection: 'row',
      marginTop: normalize(20),

      justifyContent: 'space-between',
      paddingHorizontal: normalize(20)

    },
  BtnStyle:
    {
      width: '48%',
      //flex: 0.5,

      // marginRight: normalize(14)
    },
  teamContainer:
        { marginLeft: normalize(8) },
  shimmerDesk:
    {
      backgroundColor: 'rgba(134, 134, 134, 0.06)',
      height: normalize(20),
      borderRadius: normalize(4),
      marginLeft: normalize(150),
      width: '20%',
    },
  shimmerPlanFee:
    {
      backgroundColor: 'rgba(134, 134, 134, 0.06)',
      height: normalize(20),
      borderRadius: normalize(4),
      marginLeft: normalize(195),
      width: '20%',
    },
  shimmerTotalPayable:
    {
      backgroundColor: 'rgba(134, 134, 134, 0.06)',
      height: normalize(20),
      borderRadius: normalize(4),
      marginLeft: normalize(165),
      width: '20%',
    },
  pendingstate:{
    width:'auto',
    height:'auto',
    padding:normalize(15),
    backgroundColor:'rgba(230, 234, 255, 1)',
    borderRadius:8,
    marginHorizontal:normalize(20),
    marginTop:normalize(20)
  },
  marginLeft:{
    marginLeft:normalize(23)
  },
  approvalPending:{
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.purple,
    lineHeight: normalize(17)
  },
  approvalPendingDesc:{
    width:normalize(234),
    marginTop:normalize(6),
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: AppTheme.COLORS.black,
    lineHeight: normalize(14)
  },
  privateOfficeContainer:
  {
    height: normalize(19),
    width: 'auto',
    // alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: normalize(6),
    backgroundColor: 'rgba(1, 41, 250, 0.1)',
    marginTop: normalize(10),
    borderRadius:2,

  },
  privateOffice: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.purple,
    fontSize:  AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  selectedTeamContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: normalize(20),

  },
  dedicatedDeskContainer: {
    height: normalize(19),
    width: 'auto',
    // alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: normalize(6),
    backgroundColor: 'rgba(240, 95, 35, 0.15)',
    marginTop: normalize(10),
    borderRadius:2,
  },
  dedicatedDesk: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.orange,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  shimmerPrivateOffice:
  {
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    height: normalize(20),
    borderRadius: normalize(4),
    marginLeft: normalize(166),
    width: '20%',
  },
  pendingAllign:
  {
    flexDirection: 'row',
    alignItems: 'center'
  },
 
  payingMemberContainer:
  {
    height: normalize(19),
    width: normalize(100),
    marginLeft:normalize(88),
    paddingHorizontal: normalize(6),
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.COLORS.purple,
    borderRadius:2,
   
  },
  payingMemberTxt:
  {
    color: AppTheme.COLORS.white,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    marginTop: normalize(2),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

  },
});

export default styles;