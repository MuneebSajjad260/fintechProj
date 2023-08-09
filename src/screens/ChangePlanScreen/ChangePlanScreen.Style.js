import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollCont: {
    flex: 1,
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  // *Header
  headerTitle: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
    lineHeight: scale(24),
  },
  // ?Body
  content: {},
  // *Input
  InputLabel: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  inputContainer: {
    width: '100%',
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P5,
  },
  planChangeHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },

  // *Bottom Sheet
  bottomSheetContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P1,
  },
  // *Title, Description
  bottomSheetContent: {},
  bottomSheetTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    textAlign: 'center',
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  bottomSheetDesc: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    textAlign: 'center',
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
    lineHeight: scale(20)
  },
  bottomSheetBtn: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    color: AppTheme.COLORS.white,
  },
  //  *Default
  worldLength: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.text,
  },
  defAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default styles;
