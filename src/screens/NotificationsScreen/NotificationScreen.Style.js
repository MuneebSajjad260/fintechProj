import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  //* Default
  defAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
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
  innerContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  //* Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  headerTxt: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: AppTheme.SPACINGS.MARGINS.M5,
  },
  //* Card
  cardContainer: {
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
    paddingTop: AppTheme.SPACINGS.PADDINGS.P1,
    borderRadius: scale(4),
  },
  //* List Items (Options)
  listItemContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
    flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
  },
  listItemsText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.greyDark,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  //* Switch
  thumbOffStyle: {
    backgroundColor: AppTheme.COLORS.white,
  },
  trackOff: {
    backgroundColor: AppTheme.COLORS.greyLight,
  },
  trackOffIOS: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
});

export default styles;
