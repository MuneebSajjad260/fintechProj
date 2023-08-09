import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../theme';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 112.21,
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
    marginHorizontal: 5,
    // backgroundColor: AppTheme.COLORS.white,


    // shadowColor: 'rgba(152, 152, 152, 1)',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  img: {
    height: 86.14,
    width: 86.14,
    borderRadius: 6,
  },
  heading: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    // color: AppTheme.COLORS.officialBlack,
  },
  description: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    color: AppTheme.COLORS.darkText,
    width: 200,
    letterSpacing: 0.5,
  },
  time: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.darkText,
  },
  dot: {
    marginHorizontal: 10,
  },
  date_duration: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  skeleton: {
    borderRadius: normalize(5),
    width: '40%',
    height: 10,
  },
});

export default style;
