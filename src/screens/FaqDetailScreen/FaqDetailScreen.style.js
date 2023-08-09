import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';

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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  img: {
    height: normalize(244.1),
    width: '100%',
  },
  body: {
    flex: 1,
  },
  heading: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    color: AppTheme.COLORS.orange,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 28,
    marginBottom: 50,
  },
  bodyText: {
    color: AppTheme.COLORS.text,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
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
