import {StyleSheet} from 'react-native';
import {AppTheme} from '../../theme';
import normalize from 'react-native-normalize';
import { scale } from '../../utils/scale';
const styles = StyleSheet.create({
  // *Save Password Bottom Sheet
  bottomSheetSavePassContainer: {
    flex: 1,
    padding: normalize(16),
    justifyContent: 'space-between',
  },
  savePasswordContent: {
    marginBottom: normalize(16),
  },
  savePasswordTxt: {
    fontSize: normalize(16),
    //color: AppTheme.COLORS.black,
    textAlign: 'center',
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  saveSubPasswordTxt: {
    fontSize: normalize(14),
    color: AppTheme.COLORS.text,
    textAlign: 'center',
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginVertical: normalize(12),
  },
  savePassButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(8),
  },
  savaPassBtnDef: {
    width: '48%',
  },
  btn1:{
    marginLeft:scale(30)
  }
});

export default styles;
