import {StyleSheet} from 'react-native';
import {AppTheme} from '../../shared/theme';
import normalize from 'react-native-normalize';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  // *Default Styling
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  devider: {
    height: scale(1),
    backgroundColor: '#EEEEEE',
  },
  defAlignment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  defRow: {
    flexDirection: 'row',
  },
  defMargin: {
    marginRight: '30%',
  },
  // *General
  container: {
    flex: 1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P3,
    paddingTop: AppTheme.SPACINGS.PADDINGS.P1,
  },
  // *Credit Card
  creditContainer: {
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P3,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M6,
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P2,
    borderRadius: scale(4),
    marginVertical: AppTheme.SPACINGS.MARGINS.M5,
  },
  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditAmount: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
    textAlign: 'left',
  },
  creditName: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
   
  },
  purchase: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.text,
    marginTop: AppTheme.SPACINGS.MARGINS.M7,
  },
  date_timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditDate: {
    // paddingRight: AppTheme.SPACINGS.PADDINGS.P4,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  creditTime: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.text,
  },
  // ?Mini Tag (Credit)
  miniTagContainer: {
    borderRadius: scale(4),
  },
  miniTagName: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    color: AppTheme.COLORS.primaryGreenBg,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  // *Amount Card
  amountDefText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  amountDefTextGray: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    color: AppTheme.COLORS.text,
  },
  amountTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  amountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  total: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.text,
  },
  totalAmount: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    marginLeft: AppTheme.SPACINGS.MARGINS.M1,
  },
});

export default styles;
