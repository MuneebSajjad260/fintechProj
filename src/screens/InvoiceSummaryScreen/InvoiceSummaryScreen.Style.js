import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  // *Default Styling
  defTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  defText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    textTransform: 'capitalize',
  },
  defHeading: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.purple,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  devider: {
    height: 1,
    width: '100%',
    backgroundColor: AppTheme.COLORS.greyLight,
  },
  defMargin: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M4,
  },
  defAlignmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  defSpacing: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  // *Skeleton Loader (Shimmer)
  defShimmer: {
    height: scale(12),
    width: scale(70, true),
    borderRadius: scale(8),
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
  },
  // *General
  container: {
    flex: 1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
    backgroundColor: AppTheme.COLORS.white,
  },
  // Header
  headerContainer: {
  },
  headerDetailContainer: {
    marginTop: AppTheme.SPACINGS.MARGINS.M4,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  headerDetail: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.greyLight,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  // Body
  bodyContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: AppTheme.COLORS.greyLight,
    borderRadius: scale(4),
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  body: {
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P4,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numOfMembers: {
    marginLeft: AppTheme.SPACINGS.MARGINS.M7,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  // Team Details
  teamDetailsContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  name: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    marginBottom: AppTheme.SPACINGS.MARGINS.M7,
    maxWidth: '70%',
  },
  serial: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  teamDetailSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: AppTheme.SPACINGS.MARGINS.M4,
  },
  resourceContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M4,
  },
  addressContainer: {},
  address: {
    maxWidth: '80%',
  },
  paymentContainer: {},

  // Billing Details
  billingDetailContainer: {
    marginTop: AppTheme.SPACINGS.MARGINS.M4,
  },
  billingPeriodIconContainer: {
    // marginTop: 16
  },
  billingPeriodIcon: {
    position: 'absolute',
    top: scale(5),
    alignSelf: 'center',
  },
  period: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    textAlign: 'center',
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M7,
  },

  // Product Detail
  productDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  productTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    width: scale(200, 'width'),
  },
  productSubTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    width: scale(170, 'width'),
  },
  productPrice: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    textAlign: 'right',
  },
  productCount: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    textAlign: 'right',
  },
  productItem: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },

  // Sub Total
  subTotalDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtotal: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  subtotalText: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
  },
  subtotalPrice: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    textAlign: 'right',
  },
  subtotalSubPrice: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    textAlign: 'right',
  },
  // Total
  totalDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0129FA33',
    alignItems: 'center',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  totalTitle: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.purple,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  totalAmount: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.purple,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    textAlign: 'right',
  },
  // Proceed Button
  proceedBtn: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
});

export default styles;
