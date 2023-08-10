import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';
import normalize from 'react-native-normalize';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  topContent: {
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  //* Credit
  creditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  credit: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
  },
  creditBtnContainer: {
    borderRadius: scale(4),
    borderWidth: 1,
    borderColor: AppTheme.COLORS.text,
    padding: AppTheme.SPACINGS.PADDINGS.P4,
  },
  creditBtnText: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  devider: {
    height: scale(5),
    backgroundColor: '#EEEEEE',
  },
  //* History
  historyContainer: {
    flex: 1,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M4,
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  history: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BDC7FF',
    height: scale(33),
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P4,
    borderRadius: 100 / 2,
  },
  filterIconContainer: {
    position: 'absolute',
    right: 0,
  },
  datePickerBtnTitle: {
    marginRight: scale(26),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.purple,
  },
  historyListItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P3,
    borderRadius: 8,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
    marginTop: AppTheme.SPACINGS.MARGINS.M7,
  },
  historyListItemLeft: {
    flexDirection: 'row',
  },
  historyListItemPriceContainer: {
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
  },
  historyListItemPrice: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
  },
  historyListItemPriceTag: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  historyListItemRight: {},
  printingPage: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    textTransform: 'uppercase',
    textAlign: 'right',
    marginBottom: AppTheme.SPACINGS.MARGINS.M7,
  },
  date_timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyListItemDate: {
    // paddingRight: AppTheme.SPACINGS.PADDINGS.P4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  historyListItemTime: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.text,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: scale(8),
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
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
  },

  //* Bottom Sheet
  btmListItemTextColorOne: {
    color: AppTheme.COLORS.purple,
  },
  btmListItemTextColorTwo: {
    color: AppTheme.COLORS.text,
  },

  btmListItemColorOne: {
    backgroundColor: '#0129FA40',
  },
  btmListItemColorTwo: {
    backgroundColor: '#82828215',
  },

  btmContainer: {
    flex: 1,
  },
  btmHeading: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    textAlign: 'center',
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  btmListItemContainer: {
    flex: 1,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M1,
    marginTop:AppTheme.SPACINGS.MARGINS.M1,
  },
  btmListItem: {
    borderRadius: 4,
    marginBottom: AppTheme.SPACINGS.MARGINS.M5,
  },
  btmListItemText: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  //* Not Found
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notfound: {
    color: AppTheme.COLORS.darkText,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(16),
    marginTop: normalize(20),
    textAlign: 'center'
  },
});
export default styles;
