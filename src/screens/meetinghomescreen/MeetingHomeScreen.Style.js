import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppTheme } from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const style = StyleSheet.create({
  MeetingImageContainer: {

  },
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,

  },
  fintechBottomLogo: {
    alignItems: 'flex-end',
    // flex:1,
    // justifyContent: 'flex-end',
    // marginBottom:normalize(20)
  },

  headerContainer: {
    flexDirection: 'row',
    height: normalize(65),
    backgroundColor: AppTheme.COLORS.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(15),
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  innerContainer: {
    //paddingHorizontal: normalize(20),
    // paddingTop: normalize(10)
  },
  nothinschedule:{
    marginTop:AppTheme.SPACINGS.MARGINS.M1,
    //alignItems:'center',
    justifyContent:'center'
  },
  headericonsadjustments: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: normalize(16)
  },
  statusbar: {
    flex: 0,
    backgroundColor: AppTheme.COLORS.black
  },
  welcometitle: {
    color: AppTheme.COLORS.black,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: normalize(17),
    marginTop: normalize(4)
    // paddingLeft: hp('2.0%'),
  },
  card: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(16)
  },
  smallcard: {
    elevation: 4,
    marginRight: normalize(16),
    width: normalize(280),
  },
  vsmallcard: {
    elevation: 4,
    marginRight: normalize(16),
    width: normalize(120),
  },
  meetings: {
    //color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  waitToAssignResource: {
    color: AppTheme.COLORS.primaryBlueBg,

    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(14)
  },
  cardtext: {
    color: AppTheme.COLORS.primaryblack,

    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(14)
  },
  text: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  viewMeeting:
{flexDirection:'row',
  justifyContent:'space-between',width:'80%' ,
  alignItems:'center',
  marginTop:AppTheme.SPACINGS.MARGINS.M1,
  marginBottom:scale(10),
  paddingHorizontal:AppTheme.SPACINGS.MARGINS.M1
},
  paddingHorizontal:
{ 
  paddingHorizontal:AppTheme.SPACINGS.MARGINS.M1
},
  waitImage: {
    alignSelf: 'center',
    marginTop: normalize(43)
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  WhatHappeningContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: normalize(24),
    paddingBottom: normalize(20),

  },
  credits: {
    color: AppTheme.COLORS.black,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: normalize(16),
    marginTop: normalize(20)
  },
  smallcardheading: {
    color: 'rgba(51, 51, 51, 0.5)',
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  smallcardtitle: {
    color: '#172659',
    fontSize: normalize(17),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  smallcardtext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: 'rgba(23, 38, 89, 0.6)',
    fontSize: normalize(12),
    paddingLeft: hp('2.0%'),
  },
  viewAllTxt: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: 'rgba(23, 38, 89, 0.7)',
    fontSize: normalize(16),
    paddingLeft: hp('2.0%'),
  },
  smallcardsubscript: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: 'rgba(23, 38, 89, 0.6)',
    fontSize: normalize(12),
  },
  scantext: {
    color: AppTheme.COLORS.white,
    fontSize: normalize(18),
    marginLeft: normalize(10),
    fontFamily: AppTheme.FONTS.TYPE.BOLD
  },
  scanContainer: {
    backgroundColor: AppTheme.COLORS.darkBlue,
    height: normalize(70),
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: normalize(40),
    //position: 'absolute',
    //bottom: 0,
    //right: 0,
    flexDirection: 'row',
    left: 234
  },
  Meetingroom: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(16),
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    marginTop: normalize(14),
  },
  image: {
    width: '100%',
    borderRadius: normalize(10)
  },
  vsmallcardtitle: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: 16,
    color: AppTheme.COLORS.darkBlue,
  },
  vsmallcardtext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: 12,
    color: AppTheme.COLORS.darkBlue,
  },
  officeCard: {
    // backgroundColor: 'red'
    // margin: normalize(4),
    //  paddingHorizontal: normalize(20)
    // flexDirection:'row',
    flexGrow:1,
    //marginBottom:AppTheme.SPACINGS.MARGINS.M1
  },
  whatshappeningtext: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    //color: AppTheme.COLORS.black,
    // marginTop: normalize(0)
  },
  seeMore:
    {
      alignSelf: 'center',
      marginTop: normalize(22),
      fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.purple
    },
  allignInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  viewAll: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: 'rgba(0, 0, 0, 0.5)'
  },
  resourceType: {
    height: normalize(150),
    width: normalize(90),
    marginTop: normalize(20),
    marginLeft: normalize(18),
    width: '90%',
    borderRadius: normalize(10) 
  },
  resourceTypeSchedule:{
    height: normalize(110),
    marginVertical:AppTheme.SPACINGS.MARGINS.M1,
    marginLeft: normalize(18),
    width: '80%',
    borderRadius: normalize(10)
  },
  shimmerFlex:{
    flexDirection:'row'
  },
  // plan request 

  testingCont:{
    flexDirection:'row',
    height:'auto',
    width:'auto',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    borderWidth:1,
    borderRadius:8,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M1,
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  companyNameContainer: {
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  companyContainer:
  {flexDirection:'row' ,
    alignItems:'center',
  },
  companyTag: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginLeft:normalize(16)
    // color:AppTheme.COLORS.black
  },
  companyDetailsHeadingTag: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  companyName: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
  },
});
export default style;