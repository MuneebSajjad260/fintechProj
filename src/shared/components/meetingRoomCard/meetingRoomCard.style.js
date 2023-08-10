import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../theme';

const style = StyleSheet.create({
  img: {
    height: normalize(131),
    width: '100%',
    borderRadius: 4,
   
  },
  card:{
    padding: normalize(10),
    //   marginTop: AppTheme.SPACINGS.MARGINS.M1
  },
  innerContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(10),
  },
  title:
  {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: AppTheme.COLORS.black,
    lineHeight: normalize(17)
  },
  flexDirection:
  {
    flexDirection: 'row',
    alignItems: 'center'

  },
  capacity:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

    marginLeft: normalize(5),
    //color: AppTheme.COLORS.black
  },
  desc:
  {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: 'rgba(0, 0, 0, 0.5)',
    lineHeight: normalize(17),
    marginTop: normalize(6)
  }
});

export default style;