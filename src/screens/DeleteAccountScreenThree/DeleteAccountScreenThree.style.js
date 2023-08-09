import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import normalize from 'react-native-normalize';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: scale(16),
  },
  safeAreaContainer:{
    flex: 1,
  },
  defAlignment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  heading: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
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
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  pointTxt: {
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: scale(16),
  },
  dot: {
    backgroundColor: AppTheme.COLORS.error,
    height: 8,
    width: 8,
    borderRadius: 100 / 2,
    marginRight: AppTheme.SPACINGS.MARGINS.M5,
    marginTop: AppTheme.SPACINGS.MARGINS.M7,
  },
  pointContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
    paddingRight: AppTheme.SPACINGS.PADDINGS.P4
  },
  //* Button
  btnContainer: {
    borderWidth: 1,
    borderRadius: scale(4),
    borderColor: AppTheme.COLORS.error,
  },
  btnText: {
    color: AppTheme.COLORS.error,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    textAlign: 'center',
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P1,
  },
  //* BottomSheet
  btmContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  btmHeading: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    textAlign: 'center',
    paddingBottom: AppTheme.SPACINGS.PADDINGS.P4,
  },
  btmDescContainer: {},
  btmDesc: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    textAlign: 'center',
    lineHeight: scale(24),
  },
  btmBtnContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  btmBtnStyle: {
    width: '47%',
  },
});

export default styles;
