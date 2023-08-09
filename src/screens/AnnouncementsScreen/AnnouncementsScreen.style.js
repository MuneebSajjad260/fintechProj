import {StyleSheet, Dimensions} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';

// Get the Actual Width, Height of Device
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  gestureContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
    justifyContent: 'space-between',
  },
  statusBar: {
    backgroundColor: AppTheme.COLORS.black,
  },
  imageContainer: {
    zIndex: 0,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: AppTheme.COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // marginHorizontal: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  img: {
    height: normalize(244.1),
    width: '100%',
  },
  imgMini: {
    height: 86.14,
    width: 86.14,
    borderRadius: 6,
    marginRight: 20,
  },
  clockIcon: {
    marginRight: 8,
  },
  name: {
    color: AppTheme.COLORS.orange,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: AppTheme.FONTS.SIZE.LARGE,
  },
  byContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  By: {
    color: AppTheme.COLORS.text,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SMALL,
    marginRight: 5,
  },
  byCredit: {
    color: AppTheme.COLORS.text,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.MEDIUM,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
  },
  body: {
    flex: 1,
  },
  headingContainer: {
    // backgroundColor: AppTheme.COLORS.white
  },
  heading: {
    // color: AppTheme.COLORS.black,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: 20,
    lineHeight: 35,
  },
  date: {
    color: AppTheme.COLORS.greyLight,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.MEDIUM,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 28,
    marginBottom: 50,
  },
  bodyText: {
    color: AppTheme.COLORS.text,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.REGULAR,
    lineHeight: 28,
  },
  firstWord: {
    fontSize: 24,
  },

  // Skeleton Loader
  headerSkeleton: {
    borderRadius: normalize(5),
    marginVertical: normalize(5),
    height: normalize(25),
  },
  headingSkeleton: {
    height: normalize(25),
    borderRadius: normalize(5),
    width: '90%',
    marginVertical: normalize(5),
  },
});

export default styles;
