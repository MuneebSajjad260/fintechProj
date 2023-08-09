import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import normalize from 'react-native-normalize';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
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
  safeAreaContainer:{
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  container: {
    flex: 1,
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1
  },
  printingCreditContainer: {
    borderRadius: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  x1: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  creditIcon: {},
  printingCreditTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    marginVertical: AppTheme.SPACINGS.MARGINS.M6
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: AppTheme.SPACINGS.MARGINS.M4,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  creditContainer: {
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContainer: {
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditTitle: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    color: AppTheme.COLORS.text,
    marginBottom: AppTheme.SPACINGS.MARGINS.M5,
  },
  amount: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    color: AppTheme.COLORS.purple,
  },
  credit: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    marginLeft: AppTheme.SPACINGS.MARGINS.M5,
  },
  // *Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M1,
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    borderRadius: 8,
    justifyContent: 'center',
    width: '90%'
  },
  modalContent: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  modalTitle: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    textAlign: 'center',
    marginBottom: AppTheme.SPACINGS.MARGINS.M5,
  },
  modalDescription: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.text,
    textAlign: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  // *Bottom Sheet
  btmContainer: {
    flex: 1,
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P5,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P3,
  },
  btmDescription: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
    lineHeight: scale(25),
    marginVertical: AppTheme.SPACINGS.MARGINS.M3
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  BtnStyle: {
    width: '45%',
  },
  teamContainer: {
    flex: 1,
  },
  teamMembers: {
    height: '50%',
  },
  // *Not Found
  notfoundContainer: {},
  notfound: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    color: AppTheme.COLORS.text,
  },
});

export default styles;
