import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../shared/theme';
const styles = StyleSheet.create({
  mainContainer:
    {
      flex: 1,
      backgroundColor: AppTheme.COLORS.white
    },
  innerContainer:
    {
      paddingHorizontal: normalize(16),
      marginTop: normalize(49)
    },
  changepassword:
    {
      fontSize: normalize(24),
      color: AppTheme.COLORS.primaryBlueBg,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM
    },
  guidlinetext:
    {

      fontSize: normalize(16),
      color: AppTheme.COLORS.black,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM
    },
  allignguidlines:
    {
      flexDirection: 'row',
      alignItems: 'center',
    },
  inputContainer: {
    marginVertical: normalize(12)
  },
  input: {
    backgroundColor: 'rgba(202, 202, 202, 0.1)',
    height: normalize(65),
    borderRadius: normalize(10),
    padding: normalize(20),
    color: '#333333'
  },
  passwordheadings:
    {
      fontSize: normalize(16),
      color: AppTheme.COLORS.black,
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      marginTop: normalize(35)
    },
  passwordupdatedtext:
    {
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      color: AppTheme.COLORS.primaryBlueBg,
      fontSize: normalize(22),
      marginTop: normalize(20),
      alignSelf: 'center'
    },
  Updatedconfirmationtext:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.black,
      fontSize: normalize(16),
      marginTop: normalize(5),
      alignSelf: 'center'
    }


});
export default styles;