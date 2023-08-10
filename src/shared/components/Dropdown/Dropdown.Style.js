import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(4),
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P6,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P4,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  labelText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  options: {
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P7,
    marginTop: -1,
  },
  option: {
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P4,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P2,
  },
  optionText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  // Skeleton Loader (Shimmer)
  defShimmer: {
    height: scale(12),
    width: scale(150, true),
    borderRadius: scale(8),
  },
  shimmerIcon: {
    height: scale(25),
    width: scale(25, true),
    borderRadius: 100 / 2,
  },
});

export default styles;
