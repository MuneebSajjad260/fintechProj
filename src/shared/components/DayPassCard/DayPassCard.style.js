import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';
const style = StyleSheet.create({
  img: {
    height: normalize(131),
    width: '100%',
    borderRadius: 4,
  },
  cardContainer:
    {
      padding: normalize(10),
      borderRadius: 8,
      marginTop:normalize(12)
    },
  allignInRow:
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: normalize(10),
    },
  title:
    {
      fontSize:AppTheme.FONTS.SIZE.TEXT.T2,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      // color: AppTheme.COLORS.black,
      lineHeight: normalize(17)
    }
});

export default style;