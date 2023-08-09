import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  border: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: AppTheme.COLORS.orange,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    borderRadius: 4,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M6,
  },
  listItemName: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  listItemCredits: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.text,
  },
  listItemIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTick: {
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
  },
  // *Skeleton Loader (Shimmer)
  defShimmer: {
    height: scale(12),
    width: scale(100, true),
    borderRadius: 8,
    marginVertical: 8,
  },
  shimmerIcon: {
    height: scale(16),
    width: scale(16, true),
    borderRadius: 100 / 2,
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
  },
});

export default styles;
