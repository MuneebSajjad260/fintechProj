import { StyleSheet } from 'react-native';

import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const styles = StyleSheet.create({
  label:
    {
    //  color: AppTheme.COLORS.black,
      fontSize: normalize(14),
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      lineHeight: normalize(17),
      marginBottom: normalize(10),
    },
  inputContainer: {
    backgroundColor: AppTheme.COLORS.secondaryGreyLightBg,
    height: normalize(50),
    borderRadius: normalize(4),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: normalize(16),
  },
  allignInRow:
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
  placeHolderTxt:
    {

      lineHeight: normalize(24),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      // color: AppTheme.COLORS.black,
      fontSize: normalize(12),
      width: '100%',

    },

});

export default styles;
