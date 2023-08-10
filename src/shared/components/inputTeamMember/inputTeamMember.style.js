import { StyleSheet } from 'react-native';

import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const styles = StyleSheet.create({

  mainContainer: {
    borderRadius: normalize(4),
    paddingHorizontal:AppTheme.SPACINGS.PADDINGS.P1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(12),
  },
  teamMemberName:
    {

      lineHeight: normalize(17),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      // color: AppTheme.COLORS.officialBlack,
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    },
  allignInRow:
    {
      flexDirection: 'row',
      marginTop: normalize(4)
    },
  adminContainer:
    {
      height: normalize(19),
      width: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: normalize(6),
      backgroundColor: AppTheme.COLORS.orange,
      borderRadius:2

    },
  adminTxt:
    {
      color: AppTheme.COLORS.white,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
      marginTop: normalize(2),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    },
  payingMemberContainer:
    {
      height: normalize(19),
      width: 'auto',
      paddingHorizontal: normalize(6),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: AppTheme.COLORS.purple,
      borderRadius:2
    },
  payingMemberTxt:
    {
      color: AppTheme.COLORS.white,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
      marginTop: normalize(2),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,

    },
  checkContainer: {
    height: normalize(20),
    width: normalize(20),
    borderRadius: normalize(50),
    justifyContent: 'center'
  },
});

export default styles;
