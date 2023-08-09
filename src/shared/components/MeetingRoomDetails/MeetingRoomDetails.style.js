import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import {scale} from '../../utils/scale';

const styles = StyleSheet.create({
  //? Card
  cardContainer: {
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
  },
  tagContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    backgroundColor: '#323232',
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P6,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P4,
    borderBottomLeftRadius: scale(12),
    borderTopRightRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  numOfPersons: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: AppTheme.SPACINGS.MARGINS.M6,
    color: AppTheme.COLORS.white,
  },
  //* Image
  imageContainer: {},
  img: {
    width: '100%',
    height: scale(185),
    borderRadius: scale(12),
  },
  //* Details
  detail: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(24),
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
  },
});

export default styles;
