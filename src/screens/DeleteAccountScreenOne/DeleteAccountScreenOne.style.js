import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  defAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
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
  //* Card
  cardContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    borderRadius: scale(4),
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  cardHeading: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
  },
  cardDescription: {
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(16),
  },
  //* Button
  btnContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  btnSubContainer: {
    borderWidth: 1,
    borderColor: AppTheme.COLORS.error,
    borderRadius: 4,
    padding: AppTheme.SPACINGS.PADDINGS.P4,
  },
  btnHeading: {
    color: AppTheme.COLORS.error,
    marginLeft: AppTheme.SPACINGS.MARGINS.M4,
    fontSize: scale(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(16),
  },
  btnSubHeading: {
    color: AppTheme.COLORS.greyLight,
    fontSize: scale(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: AppTheme.SPACINGS.MARGINS.M4,
    marginTop: AppTheme.SPACINGS.MARGINS.M7,
    lineHeight: scale(16),
  },
});

export default styles;
