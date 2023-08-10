import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

import {AppTheme} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  innerContainer: {
    paddingHorizontal: normalize(20),
  },
  savePasswordTxt: {
    fontSize: normalize(16),
    color: AppTheme.COLORS.black,
    textAlign: 'center',
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  subTitle: {
    textAlign: 'center',
    marginTop: normalize(12),
    marginHorizontal: normalize(13),
    fontSize: normalize(12),
    color: AppTheme.COLORS.text,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    lineHeight: normalize(14),
  },
  logoutTxt: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
  },
  allignInRow: {
    flex: 1,
    flexDirection: 'row',
    // paddingHorizontal: normalize(16),
    marginVertical: normalize(20),
    justifyContent: 'space-between',
  },
  BtnStyle: {
    width: '48%',
    // flex: 0.5,
    // marginRight: normalize(14)
  },
  logoutImg: {
    alignSelf: 'center',
  },
  txtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
