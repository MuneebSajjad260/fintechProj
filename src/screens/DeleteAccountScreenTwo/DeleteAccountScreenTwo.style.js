import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  gestureCont: {flex: 1, backgroundColor: AppTheme.COLORS.white},
  safeAreaContainer: {
    flex: 1,
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
  },
  cardDescription: {
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(16),
  },
  //* Options
  optionsContainer: {
    flex: 1,
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
  },
  optionsHeadingContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  optionsHeading: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  //* List Items
  listItemsContainer: {
    flex: 1,
  },
  checkbox: {},
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
    borderRadius: scale(4),
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M7,
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P7,
    marginBottom: AppTheme.SPACINGS.MARGINS.M3,
  },
  listItemText: {
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    width: '75%',
  },
  //* Error States
  stateContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  stateHeadingContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M5,
  },
  stateTitle: {
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: AppTheme.SPACINGS.MARGINS.M5,
  },
  stateMsg: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(16)
  },
  //* BottomSheet
  btmContainer: {
    flex: 1,
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  btmHeading: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    textAlign: 'center',
    paddingBottom: AppTheme.SPACINGS.PADDINGS.P7,
  },
  btmDescContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  btmDesc: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    textAlign: 'center',
  },
});

export default styles;
