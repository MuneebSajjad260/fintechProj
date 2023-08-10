import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  monthleOrYearlyCard: {
    height: scale(144),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: AppTheme.COLORS.black,
    marginVertical: scale(10),
    padding: scale(12),
  },
  meetingroomtext: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.black,
    fontSize: scale(16),
  },
  date: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: scale(14.63),
  },
  helpTxt: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.black,
    fontSize: scale(14),
    lineHeight: 24,
    marginVertical: scale(10),
  },
  aligninrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: scale(16),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    marginTop: 10
  },
  
  notfound: {
    color: AppTheme.COLORS.darkText,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginTop: scale(20),
    textAlign: 'center'
  },
  btnContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1
  },
});
export default styles;
