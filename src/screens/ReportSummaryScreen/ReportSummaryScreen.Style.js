import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //* Spacing
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  renderRightContainer: {
    borderRadius: scale(8),
  },
  renderRightText: {
    padding: AppTheme.SPACINGS.PADDINGS.P7,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
  },
  //* Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: AppTheme.SPACINGS.MARGINS.M2,
  },
  title: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    lineHeight: scale(20),
    width: scale(195, true),
  },
  date: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    marginRight: AppTheme.SPACINGS.MARGINS.M5,
  },
  //* Body
  body: {
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  description: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    lineHeight: scale(24),
    marginBottom: AppTheme.SPACINGS.MARGINS.M4,
    color: AppTheme.COLORS.text,
  },
  //* Image
  attachmentTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
  },
  imageContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  image: {
    height: scale(146),
    width: scale(167, true),
    borderRadius: scale(4),
  },
  attachmentContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  //* Footer
  footerDefTxt: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    textAlign: 'center',
    color: AppTheme.COLORS.text
  },
});

export default styles;
