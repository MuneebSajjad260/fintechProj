import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import normalize from 'react-native-normalize';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  // *Default Styling
  defRowAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P2,
    paddingBottom: AppTheme.SPACINGS.PADDINGS.P1,
  },
  content: {
    marginBottom: AppTheme.SPACINGS.MARGINS.M2,
  },
  // Header Detail Card
  wrapperContainerForHeading: {
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M6,
  },
  headerDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    borderRadius: scale(4),
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P7,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P7,
  },
  headerDetailTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginBottom: AppTheme.SPACINGS.MARGINS.M4,
  },
  headerDetailDesc: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
  },
  headerContentContainer: {
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M1,
  },

  // Account to Pay
  accountPayContainer: {},
  accountPayTitle: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
    marginBottom: AppTheme.SPACINGS.MARGINS.M4,
  },
  accountToPayInnerContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P3,
    borderRadius: scale(4),
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M6,
  },

  accountPayNameContainer: {},
  accountPayIBANContainer: {},
  accountPaySarieContainer: {},

  bankTitle: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.purple,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginBottom: AppTheme.SPACINGS.MARGINS.M7,
  },
  accountPayTextBlack: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginBottom: AppTheme.SPACINGS.MARGINS.M5,
  },
  accountPayTextGrey: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    textAlign: 'right',
    marginBottom: AppTheme.SPACINGS.MARGINS.M5,
  },
  sarieContainer: {
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },

  // Upload
  uploadContainer: {
    height: scale(216),
    padding: AppTheme.SPACINGS.PADDINGS.P3,
    borderRadius: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: AppTheme.SPACINGS.MARGINS.M2,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M6,
  },

  uploadTitle: {
    textAlign: 'center',
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop: AppTheme.SPACINGS.MARGINS.M4,
  },
  // Selected Image
  selectedImageContainer: {},
  closeIcon: {
    position: 'absolute',
    top: scale(15),
    right: scale(15, true),
  },
  selectedImage: {
    width: scale(118, true),
    height: scale(192),
  },

  // Comment
  commentContainer: {},
  commentInput: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    padding: scale(20),
    height: scale(150),
    marginBottom: AppTheme.SPACINGS.MARGINS.M7,
  },
  // Confirm Button
  confirmBtn: {},
});

export default styles;
