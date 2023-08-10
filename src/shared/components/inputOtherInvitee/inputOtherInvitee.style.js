import { StyleSheet } from 'react-native';

import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const styles = StyleSheet.create({

mainCont:{
borderRadius: normalize(4),
paddingHorizontal: normalize(20),
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
width: '100%',
marginTop: normalize(12),},
name:
{

    lineHeight: normalize(24),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  //  color: AppTheme.COLORS.officialBlack,
    fontSize: normalize(12),
  },
  email:
  {

    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: normalize(8),
  },
  checkCont:{
  height: normalize(20),
  width: normalize(20),
  borderRadius: normalize(50),
  justifyContent: 'center'}
});

export default styles;
