import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const style = StyleSheet.create({
  modalView: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: AppTheme.COLORS.black,
  },
  activityIndicatorWrapper: {
    //backgroundColor: AppTheme.COLORS.white,
    //height: 132,
    paddingVertical: normalize(24),
    width: '90%',
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    textAlign: 'center',
    lineHeight: normalize(19.5),
    //color: AppTheme.COLORS.black,
  },
  desc: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

    textAlign: 'center',
    lineHeight: normalize(24),
    // color: AppTheme.COLORS.officialBlack,
    marginHorizontal: normalize(14),
    marginTop: normalize(20)
  }
});

export default style;