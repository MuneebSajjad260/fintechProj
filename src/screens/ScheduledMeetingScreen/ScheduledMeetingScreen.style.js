import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  mainContainer: {
    // margin: normalize(4),
    // paddingVertical: normalize(20),
    // flex: 1,
  },
  nothinschedule:{
    marginTop:normalize(20),
    alignItems:'center',
    justifyContent:'center',
  },
  resourceType: {
    height: normalize(150),
    // width: normalize(0),
    marginTop: normalize(20),
    marginLeft: normalize(18),
    // padding:normalize(10)
  },
  padding:{
    padding:normalize(20),
    
  },
  card:
  {paddingHorizontal:20,paddingBottom:10},
  
 
  devider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8
  },
  //* Header
  meetingDropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronDownContainer: {
    marginTop: 4,
  },
  historyContainer: {},
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  history: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    //color: AppTheme.COLORS.black,
    marginRight: 4,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BDC7FF',
    height: normalize(33),
    paddingHorizontal: 10,
    borderRadius: 100 / 2,
  },
  filterIconContainer: {
    position: 'absolute',
    right: 0,
  },
  datePickerBtnTitle: {
    marginRight: 32,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.purple,
  },
  historyListItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppTheme.COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 5,
    // backgroundColor: 'red'
  },
  historyListItemLeft: {
    flexDirection: 'row',
  },
  historyListItemPriceContainer: {
    marginLeft: 10,
  },
  historyListItemPrice: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: normalize(18),
    //color: AppTheme.COLORS.black,
  },
  historyListItemPriceTag: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: normalize(14),
    //color: AppTheme.COLORS.black,
  },
  historyListItemRight: {},
  printingPage: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: normalize(14),
    //color: AppTheme.COLORS.black,
    textTransform: 'uppercase',
    textAlign: 'right',
    marginBottom: 5,
  },
  date_timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyListItemDate: {
    paddingRight: 10,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(14),
    //color: AppTheme.COLORS.black,
  },
  historyListItemTime: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(14),
    color: AppTheme.COLORS.text,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: AppTheme.COLORS.white,
    borderRadius: 8,
    justifyContent: 'center',
  },
  //* Calender
  calendarMonth: {
    color: AppTheme.COLORS.purple,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  calendarYear: {
    color: AppTheme.COLORS.purple,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  calendarText: {
    //color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },

  // *Bottom Sheet (Filter)
  btmListItemTextColorOne: {
    color: AppTheme.COLORS.purple,
  },
  btmListItemTextColorTwo: {
    color: AppTheme.COLORS.text,
  },

  btmListItemColorOne: {
    // backgroundColor: '#0129FA40',
  },
  btmListItemColorTwo: {
    backgroundColor: '#82828215',
  },

  btmContainer: {
    flex: 1,
  },
  btmHeading: {
    //color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    textAlign: 'center',
    marginTop: normalize(16),
  },
  btmListItemContainer: {
    flexGrow: 1,
    marginHorizontal: normalize(16),
    marginTop: normalize(16),
  },
  btmListItem: {
    borderRadius: 4,
    marginBottom: 8,
    borderColor:AppTheme.COLORS.white,
  },
  btmListItemText: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
  },
  // *Bottom Sheet (Meeting)
  btmContainerMeeting: {
    flex: 1,
    //backgroundColor: AppTheme.COLORS.white,
    padding: 16
  },
  meetingOptionContainer: {},
  meetingDropTitle: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    paddingBottom: normalize(4),
    //color: AppTheme.COLORS.black
  },
  meetingDropTitleActive: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    paddingBottom: normalize(4),
    color: AppTheme.COLORS.purple
  },
  meetingDropNote: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.greyLight
  },
});

export default styles;
