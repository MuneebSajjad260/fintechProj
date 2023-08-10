import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: normalize(10),
    backgroundColor: AppTheme.COLORS.white,
  },
  title: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.primaryBlueBg,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: normalize(20),
  },
  officeCard: {
    margin: normalize(4),
  },
  maintitle: {
    color: '#172659',
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: normalize(22),
    paddingLeft: hp('2.0%'),
  },
  cardContainer: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(14)
  },
  card: {
    padding: hp('1.5%'),
    borderRadius: normalize(20),
    elevation: 10,
    shadowColor: 'rgba(152, 152, 152, 1)',
    marginTop: hp(5),
    margin: normalize(20),
  },
  cardnumber: {
    color: 'rgba(51, 51, 51, 1)',
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: normalize(24),
  },
  innertext: {
    color: 'rgba(51, 51, 51, 1)',
    fontSize: normalize(16),
    marginTop: normalize(12),
    lineHeight: normalize(24),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,

  },
  adminandpaymingmembertext: {
    color: 'rgba(153, 153, 153, 1)',
    fontSize: normalize(12),


    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  paymentsummarytext: {
    fontSize: (24),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontWeight: '500',
    marginTop: normalize(12),
    color: AppTheme.COLORS.black
  },
  text: {
    color: '#333333',
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  divider: {
    height: 0.7,
    width: '100%',
    zIndex: -10,
    marginVertical: normalize(27)
  },
  teamviewdivider: {
    height: 0.7,
    width: '100%',
    zIndex: -10,
    marginTop: normalize(12)
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  durationSubTitle: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: normalize(16),
    color: '#333333',
    marginTop: normalize(15)
  },

  view: {
    paddingHorizontal: normalize(20),
    //marginTop: 16
  },
  btnStyle: {
    marginTop: normalize(36),
    marginBottom: normalize(20)
  },
  scrollContainer: {
    flex: 1
  },
  waitingImageContainer: {
    alignItems: 'center',
    marginTop: normalize(43)
  },
  headerIcons: {
    flexDirection: 'row'
  }
});

export default styles;