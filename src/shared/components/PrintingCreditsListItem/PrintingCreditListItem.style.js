import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import normalize from 'react-native-normalize';
import {scale} from '../../utils/scale';

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
  // *Printing Credit
  printingCreditContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppTheme.SPACINGS.PADDINGS.P4,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  printingPriceTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    marginLeft: AppTheme.SPACINGS.MARGINS.M4,
  },
  printingCreditRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  printingPrice: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    lineHeight: scale(20, true),
  },
  printingPriceTag: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    marginRight: AppTheme.SPACINGS.MARGINS.M7,
    marginBottom: AppTheme.SPACINGS.MARGINS.M7,
  },
  printingCreditLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Skeleton Loader (Shimmer)
  defShimmer: {
    height: scale(12),
    width: scale(120, true),
    borderRadius: scale(8),
  },
  shimmerIcon: {
    height: scale(40),
    width: scale(40, true),
    borderRadius: scale(6),
    marginRight: AppTheme.SPACINGS.MARGINS.M5,
  },
});

export default styles;
