// import {StyleSheet, Dimensions} from 'react-native';
// import {AppTheme} from '../../shared/theme';
// import {scale} from '../../shared/utils/scale';

// // Get the Actual Width, Height of Device
// const deviceWidth = Dimensions.get('screen').width;
// const deviceHeight = Dimensions.get('screen').height;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   defShadow: {
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.19,
//     shadowRadius: 5.62,
//     elevation: 6,
//   },
//   emptyContainer: {
//     marginTop: '10%',
//     width: '100%',
//   },
//   notFound: {
//     fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
//     fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
//     textAlign: 'center',
//     alignSelf: 'center',
//     width: '100%',
//     color: AppTheme.COLORS.text,
//     marginBottom: AppTheme.SPACINGS.MARGINS.M1,
//   },
//   //* Meeting Room Options (Buttons)
//   buttonsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: AppTheme.SPACINGS.MARGINS.M1,
//   },
//   //* Modes Variant for Buttons
//   flatListContainer: {
//     flexGrow: 1,
//   },
//   btn: {
//     padding: AppTheme.SPACINGS.PADDINGS.P1,
//     borderWidth: 1,
//     borderRadius: 8,
//     marginRight: AppTheme.SPACINGS.MARGINS.M4,
//     marginVertical: AppTheme.SPACINGS.MARGINS.M1,
//   },
//   durationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
//     paddingBottom: AppTheme.SPACINGS.PADDINGS.P4,
//   },
//   duration: {
//     fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
//     fontFamily: AppTheme.FONTS.TYPE.REGULAR,
//   },
//   btnText: {
//     fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
//     fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
//   },

//   //* FlatList
//   timeLineContainer: {
//     marginVertical: AppTheme.SPACINGS.MARGINS.M4 / 0.6,
//   },
//   timelineUpperFrame: {
//     height: scale(54),
//     borderWidth: 2,
//     alignSelf: 'center',
//     position: 'absolute',
//     zIndex: 1,
//   },
//   //* Meeting Room Buttons
//   meetingRoomsBtnContainer: {
//     marginTop: AppTheme.SPACINGS.MARGINS.M1,
//   },
//   divider: {
//     width: '92%',
//     height: 1,
//     alignSelf: 'center',
//   },
//   //* Main Button
//   mainBtn: {
//     marginHorizontal: AppTheme.SPACINGS.MARGINS.M1,
//     marginTop: AppTheme.SPACINGS.MARGINS.M1 / 0.4,
//     marginBottom: AppTheme.SPACINGS.MARGINS.M1,
//   },
//   //* Bottom Sheet
//   bottomSheetContainer: {
//     flex: 1,
//     paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1
//   },
//   bottomSheetBtnContainer: {
//     marginVertical: AppTheme.SPACINGS.MARGINS.M1
//   },
//   BottomSheetTitle: {
//     textAlign: 'center',
//     marginTop: scale(18),
//     fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
//     fontFamily: AppTheme.FONTS.TYPE.REGULAR,
//   },
//   recurringDaysContainer: {
//     backgroundColor: 'rgba(134, 134, 134, 0.06)',
//     height: scale(50),
//     borderRadius: scale(4),
//     paddingHorizontal: scale(20),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: scale(12),
//     borderColor: AppTheme.COLORS.orange,
//   },
//   recurringText: {
//     lineHeight: scale(17),
//     fontFamily: AppTheme.FONTS.TYPE.REGULAR,
//     fontSize: scale(14),
//   },
//   checkedContainer: {
//     backgroundColor: AppTheme.COLORS.orange,
//     height: scale(20),
//     width: scale(20),
//     borderRadius: scale(50),
//     justifyContent: 'center',
//   },
//   //* Timeline Skeleton
//   timelineSkeleton: {
//     height: scale(54),
//     width: '100%',
//     marginVertical: AppTheme.SPACINGS.MARGINS.M1
//   },
// });

// export default styles;

import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { scale } from '../../shared/utils/scale';
import { AppTheme } from '../../shared/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,

  },
  safeAreaContainer:
    {
      flex: 1,

    },

  mainContainer: {
    // flex: 1,
    // backgroundColor: AppTheme.COLORS.white,
    padding: AppTheme.SPACINGS.PADDINGS.P1
  },
  bottomSheetScrollView:
        { flexGrow: 1 },
  Meetingroom: {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    // marginTop: normalize(14),
  },
  waitToAssignResource: {
    color: AppTheme.COLORS.primaryBlueBg,

    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(14)
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  card: {
    //paddingHorizontal: normalize(10),
    // paddingVertical: normalize(16),


    //padding: hp('1.5%'),
    borderRadius: normalize(20),
    elevation: 3,
    shadowColor: 'rgba(152, 152, 152, 1)',
    backgroundColor: 'white',
    //marginLeft: normalize(20),
    marginVertical: normalize(10),

  },
  
  tabContainer: {
    flexDirection: 'row',
    // backgroundColor: "red",
    justifyContent: 'space-around',
    marginTop: normalize(34),
    // marginBottom: normalize(24)
  },
  tabTxt: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    lineHeight: normalize(19.5),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontWeight: '600',
  },
  divider: {

    height: 0.7,
    width: '100%',
    marginVertical:   AppTheme.SPACINGS.MARGINS.M1,
    // bottom: 4,
    zIndex: -10,
  
    // marginVertical: normalize(12),
  },
  monthlyTxt: {
    fontWeight: '500',
    color: AppTheme.COLORS.primaryBlueBg,
    fontSize: 24,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM
  },
  price: {
    fontSize: normalize(30),
    lineHeight: normalize(37),
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontWeight: '600',
    color: AppTheme.COLORS.black

  },
  deskTxt: {
    lineHeight: 50,
    fontSize:AppTheme.FONTS.SIZE.HEADINGS.H4,
    color: '#081F32',
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  services:
    {
      flexDirection: 'row',
      alignItems: 'center'
    },
  servicesContainer: {
    marginTop: normalize(12),
    marginBottom: normalize(24)
  },
  servicesTxt: {
    marginLeft: 7,
    fontWeight: '400', fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    lineHeight: 24,
    fontFamily: AppTheme.FONTS.TYPE.LIGHT,
    color: AppTheme.COLORS.black
  },
  priceTxt: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR
  },
  indicator: {
    height: 9,
    width: normalize(144),
    backgroundColor: AppTheme.COLORS.primaryGreenBg,
    borderRadius: normalize(16),
    marginTop: normalize(20),
    zIndex: 10000
  },
  tabView: {
    alignItems: 'center',
    flex: 1
  },
  inputContainer: {
    marginVertical: normalize(12),

  },
  expectedDateTxt: {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontWeight: '600',
    lineHeight: normalize(20),
    marginBottom: normalize(12),
    marginRight: normalize(12)
  },
  expectedEndDate: {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontWeight: '400',
    lineHeight: normalize(20),
    marginBottom: normalize(12),
    marginRight: normalize(10)
  },
  teamMemberTxt: {
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontWeight: '600',
    lineHeight: normalize(20),
    marginBottom: normalize(12),
  },
 
  bottomSheetContainer: {
    backgroundColor: 'rgba(245, 245, 245, 1)',
    width: '100%',
    height: normalize(61),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(24)
  },
  bottomSheetBtnContainer: {
    marginHorizontal: normalize(22),
    marginTop: normalize(30),
    marginBottom: normalize(50)
  },
  btnPress: {
    
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
  btnNormal: {
  //  backgroundColor: 'white',
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1
  },
  bookingbtnPress: {
    //backgroundColor: AppTheme.COLORS.black,
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
  bookingbtnNormal: {
   // backgroundColor: AppTheme.COLORS.white,
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1
  },
  defaulttimeline: {
    width: normalize(12),
    height: 20,
    backgroundColor: 'grey',
    marginHorizontal: 4,

    borderRadius: 10,
    alignSelf: 'center'
  },
  selectedtimeline: {
    width: normalize(12),
    height: 20,
    backgroundColor: 'rgba(53, 215, 161, 1)',
    marginHorizontal: 4,
    borderRadius: 10,
    alignSelf: 'center'

  },
  selectedborder: {
    height: 50,
    backgroundColor: 'red',
    width: 70

  },
  modal: {
    margin: 20,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  tt: {
    color: '#3f2949',
    marginTop: 10
  },
  screenHeadings: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  //  color: AppTheme.COLORS.black
  },
  durationBoxesView:
    {
      marginRight: normalize(0),
      flexDirection: 'row',
      height: normalize(50),
      width: '73%',
      alignItems: 'center',
      justifyContent: 'space-between',

    },
  durationBoxesOnPressText:

    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.white,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  durationBoxesDefaultText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.darkText,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  repeatBookingBoxesView:
    {
      flexDirection: 'row',
      height: 50,
      width: '36%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: normalize(80)
    },
  repeatbookingBoxesOnPressText:

    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.white,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  repeatbookingBoxesDefaultText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.darkText,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  recurringselectiontext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    color: AppTheme.COLORS.darkText,
    textDecorationLine: 'underline'
  },
  noofperson:
    {
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4
    },
  avaiabletext:
    {

      color: '#30B991',
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      fontSize: normalize(14),
    },
  inputView:
    {
      width: normalize(160),
      height: normalize(45),
      backgroundColor: AppTheme.COLORS.secondaryGreyLightBg,
      borderRadius: normalize(4),
      justifyContent: 'center',
      paddingHorizontal: normalize(10)
    },
  inputViewText:
    {
      //color: 'rgba(0, 0, 0, 0.5)',
      fontSize: normalize(10),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,

      lineHeight: normalize(17),
      marginBottom: normalize(10),
    },
  scheduleText: {
    //color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    marginBottom:AppTheme.SPACINGS.MARGINS.M4
  },
  placeHolder: {
    //color: AppTheme.COLORS.officialBlack,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: normalize(9),

  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
   // color: AppTheme.COLORS.black,

  },
  BottomSheetTitle: {
    textAlign: 'center',
    marginTop: normalize(18),
   // color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

  },
  bottomSheetBtnContainer: {


    paddingVertical: normalize(20),

  },
  bottomSheetBtnContainer2: {
    flex: 0.9,
    justifyContent: 'flex-end'
  },
  picker:
    {
      backgroundColor: AppTheme.COLORS.white,
      width: Platform.OS === 'ios' ? '100%' : '40%',
      height: normalize(200),
      alignSelf: 'center',
    },
  timePickerContainer:

    {
      alignItems: 'center'
    }
  ,
  bottomSheetContainer:

    {

      paddingHorizontal: normalize(20)
    },

  selectMeetingRoomBoxesView: {
    flexDirection: 'row',
    flexGrow: 1,
    // alignItems: "center",
    marginTop: AppTheme.SPACINGS.MARGINS.M1

  },
  meetingRoombtnPress: {
    //backgroundColor: AppTheme.COLORS.black,
    width: 'auto',
    height: 'auto',
    paddingVertical: normalize(11),
    paddingHorizontal: normalize(12),
    borderRadius: 5,
    marginRight: normalize(12)

  },
  meetinroombtnNormal: {
    //backgroundColor: AppTheme.COLORS.white,
    width: 'auto',
    height: 'auto',
    paddingVertical: normalize(11),
    paddingHorizontal: normalize(12),
    borderRadius: 5,
    borderWidth: 1,
    marginRight: normalize(12)
  },
  meetingRoomOnPressText:

    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.white,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  meetingRoomOnDefaultText:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.darkText,
      fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG
    },
  recurringDaysContainer: {
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
  checkedContainer:
    {
      backgroundColor: AppTheme.COLORS.orange,
      height: normalize(20),
      width: normalize(20),
      borderRadius: normalize(50),
      justifyContent: 'center'
    },
  recurringText:
    {

      lineHeight: normalize(17),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //  color: AppTheme.COLORS.officialBlack,
      fontSize: normalize(14),
    },
  proceedBtn: {
    marginTop: scale(20)
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
      fontSize: normalize(18),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR

    },
  calendarYear:
    {
      color: AppTheme.COLORS.purple,
      fontSize: normalize(18),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR
    },
  calendarText:
    {
     // color: AppTheme.COLORS.black,
      fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR
    },



  container: {
    height: 42,
  },
  itemContainer: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temp: {
    height: 40,
    width: 40
  },
  time: {
    fontSize: 12,

  },
  boldHourTxt:
    {
      color: AppTheme.COLORS.black,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
     
    },
  ampmTxt: {
    color: AppTheme.COLORS.black,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG
  },
  lightHourTxt:
    {
      color: 'rgba(0, 0, 0, 0.5)',
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
      
    },
  shimmerAvail:
    {
      backgroundColor: 'rgba(134, 134, 134, 0.06)',
      height: normalize(40),
      borderRadius: normalize(8),
       marginLeft: normalize(10),
      width: '30%',
      marginTop:normalize(10)
    },
  shimmerAlign:{
    flexDirection:'row',
    justifyContent:'space-evenly'
       
  },
  noResource:{
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
   // color: AppTheme.COLORS.black,
    paddingHorizontal: normalize(90),
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
  },
  noResourceDesc:{
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
   // color: AppTheme.COLORS.black,
    paddingHorizontal: normalize(55),
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop:normalize(12)
  },
  btnContainerHome:{
     
    marginTop: normalize(25),
    paddingHorizontal: normalize(20)
  },
  bottomSheetTitle: {
    paddingVertical: 20,
    
  },

});
export default styles;