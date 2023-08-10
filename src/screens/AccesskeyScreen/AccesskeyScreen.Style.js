import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  //* Default
  defStyle: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  defAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    padding: normalize(16),
  },

  //? Options
  optionContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1/0.5
  },
  bodyOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionTxtContainer: {
    borderWidth: 2,
    borderRadius: scale(12),
    // borderColor:AppTheme.COLORS.black,
  },
  optionTxt: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1/0.43,
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P1/0.8,
  },
  //? Direction
  directionContainer: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M1
  },
  //* Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  headerTxt: {
    fontSize: normalize(16),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginLeft: normalize(8),
  },
  //* Body
  body: {},

});
export default styles;
