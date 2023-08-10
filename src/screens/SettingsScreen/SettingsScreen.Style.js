import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P2,
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
  divider: {
    backgroundColor: 'rgba(202, 202, 202, 0.51)',
    height: 1,
    zIndex: -10,
    marginVertical: scale(13),
    marginRight: scale(15, true),
    marginLeft: scale(50, true),
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
    color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
  },
  cardDescription: {
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(16),
  },
  //* List Item (TAB)
  tabName: {
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(19),
  },
  tabInnerText: {
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.darkText,
    lineHeight: scale(12),
    marginTop: AppTheme.SPACINGS.MARGINS.M7,
  },
});
export default styles;
