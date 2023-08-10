import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  //* Guide Log
  guideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
  },
  unavailableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unIndicator: {
    width: scale(12, true),
    height: scale(12),
    borderRadius: 3,
    marginRight: AppTheme.SPACINGS.MARGINS.M4,
  },
  unavailable: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  availableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: AppTheme.SPACINGS.PADDINGS.P1 /.6,
  },
  avIndicator: {
    width: scale(12, true),
    height: scale(12),
    backgroundColor: '#0129FA',
    borderRadius: 3,
    marginRight: AppTheme.SPACINGS.MARGINS.M4,
  },
  available: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
});

export default styles;
