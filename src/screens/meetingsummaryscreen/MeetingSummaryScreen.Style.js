import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  mainContainer: {
    // flex: 1,
    paddingTop: normalize(20),
    paddingHorizontal: normalize(20),
    // backgroundColor: AppTheme.COLORS.white,
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
    // paddingHorizontal:normalize(2)
  },
  maintitle: {
    ////color: AppTheme.COLORS.black
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,

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
    //color: AppTheme.COLORS.black
    fontSize: normalize(12),
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
    color: AppTheme.COLORS.black
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
    fontSize: normalize(12),
    //color: AppTheme.COLORS.black
    marginLeft: normalize(8),
    marginTop: normalize(4)
  },
  selectedTeamMember: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(12),
    //color: AppTheme.COLORS.black
    marginTop: normalize(4)
  },
  subContainer: {
    marginTop: normalize(20),
  
  },
  btnStyle: {
    marginTop: normalize(36),
    marginBottom: normalize(20)
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent:'space-between',
    padding: normalize(20),
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
      fontSize: normalize(12),
      //color: AppTheme.COLORS.black
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
      backgroundColor: AppTheme.COLORS.orange

    },
  teamRole:
    {
      color: AppTheme.COLORS.white,
      fontSize: normalize(10),
      marginTop: normalize(2),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    },
  innerDivider:
    {
      backgroundColor: 'rgba(202, 202, 202, 0.51)',

      height: 1,
      zIndex: -10,
      marginVertical: normalize(9),
      marginRight: normalize(20),
      marginLeft: normalize(55)
    },
  teamMember:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: normalize(12),
      //color: AppTheme.COLORS.black
      marginLeft: normalize(20),
      alignSelf: 'center'

    },
  finalPaymentText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: normalize(12),
      //color: AppTheme.COLORS.black
      marginLeft: normalize(8),
      marginTop: normalize(4)
    },
  paymentContainer:
    {
      height: 'auto',
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(9),
      //backgroundColor: 'rgba(0, 0, 0, 0.04)',
      marginTop: normalize(20),
      borderRadius:8
    },
  paymentContainerHeadings:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      color: 'rgba(0, 0, 0, 0.5)',

    },
  paymentContainerValues:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize:  AppTheme.FONTS.SIZE.SUBTITLES.S1,
      //color: AppTheme.COLORS.black
    },
  totalPayableText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      //color: AppTheme.COLORS.black
    },
  totalPayableValue:
    {
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      fontSize:  AppTheme.FONTS.SIZE.SUBTITLES.S1,
      // color: AppTheme.COLORS.purple,
    },
  bottomSheetTitle: {
    paddingVertical: 20,

  },
  reqPlan: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black
    paddingHorizontal: normalize(92),
    textAlign: 'center',
    fontSize:  AppTheme.FONTS.SIZE.TEXT.T1,
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
  shimmerPlanFee:
        {
          backgroundColor: 'rgba(134, 134, 134, 0.06)',
          height: normalize(20),
          borderRadius: normalize(4),
          marginLeft: normalize(145),
          width: '20%',
        },
  modalContainer:
        {
          flex: 1,
    
        },
  mainModalContainer:
        {
    
          backgroundColor: '#FFFFFF',
          marginTop: normalize(190),
          width: '100%',
          height: '48%',
          alignItems: 'center',
          // justifyContent: "center",
          borderWidth: 1,
          borderRadius: 8
        },
  innerModal:
        {
          marginTop:39,
          alignItems: 'center',
        },
  header:{
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black
    marginTop:normalize(30),
    textAlign: 'center',
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
  },
  desc:{
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    marginTop:normalize(14),
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    paddingHorizontal:normalize(40)
  }
});

export default styles;