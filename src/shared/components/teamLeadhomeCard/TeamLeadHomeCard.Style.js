import { StyleSheet } from 'react-native';


import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const styles = StyleSheet.create({
  cardContainer:
    {
      padding: normalize(10),
      // borderRadius: 8,
      elevation: 7,
      marginBottom: AppTheme.SPACINGS.MARGINS.M1
    },
  imgContainer:
    {
      height: normalize(131),
      width: '100%',
      borderRadius: 4,
    },
  allignInRow:
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  subContainer:
    {
      paddingBottom: 2,
      borderRadius: normalize(8),
      flex: 1,
      marginTop: normalize(10)
    },
  titleTxt:
    {
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      // color: AppTheme.COLORS.black,

    },
  descTxt: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginTop: normalize(6),
    // color:'rgba(0, 0, 0, 0.5)',

  },
  btnTxt:{
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    
    // color: AppTheme.COLORS.purple,
  },
  btnContainer:{
    height:'auto',
    width:'auto',
    borderWidth:1,
    borderColor:'rgba(1, 41, 250, 0.2)',
    paddingHorizontal:normalize(14),
    paddingVertical:normalize(8),
    marginTop:normalize(10),
    borderRadius:4
  }
});

export default styles;
