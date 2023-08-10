import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white
  },
  mainContainer: {
    flex: 1,

  },
  scrollView:

    {
      flexGrow: 1,
      justifyContent: 'space-between'
    },
  title: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    //color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H2,
    marginTop: normalize(30),
    textAlign: 'center',

  },
  desc: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,

    textAlign: 'center',
    color: AppTheme.COLORS.text,
    // marginHorizontal: normalize(20),
    marginTop: normalize(14)
  },
  subContainer: {
    paddingHorizontal: normalize(20),
    // flex: 0.8,
    // justifyContent: "center",


  },
  img: {
    //bottom: 0,
    // alignSelf: "center",
    height: '100%',
    width: '100%',
  },
  bottomImageContainer: {
    marginTop: normalize(142)
  },
  btnContainer: {
    marginTop: normalize(30)
  },
  bookingConfirmedImg: {
    marginTop: normalize(143),
    alignSelf: 'center',
    justifyContent: 'center',

  }
});

export default styles;
