import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  // *Default Styling
  defAlignmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  invoiceContainer: {
    width: '100%',
    height: scale(110),
    padding: AppTheme.SPACINGS.PADDINGS.P4,
    borderWidth: 1,
    borderRadius: scale(4),
    justifyContent: 'space-between',
  },
  invoiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
  },
  amount: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
  },
  resource: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  detailsText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.greyDark,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop: AppTheme.SPACINGS.MARGINS.M6,
  },
  // Skeleton Loader (Shimmer)
  defShimmer: {
    height: 12,
    width: 100,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default styles;
