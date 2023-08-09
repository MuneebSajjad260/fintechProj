import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,

  },
  ScrollView: {
    flexGrow: 1
  },
  subContainer: {
    padding: normalize(20)
  },
  title: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    marginBottom:normalize(10)
  //  color: AppTheme.COLORS.black,
  },
  tabContainer: {
    flexDirection: 'row',
    // backgroundColor: "red",
    justifyContent: 'space-around',
    marginTop: normalize(34),
    // marginBottom: normalize(24)
  },
  tabTxt: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    lineHeight: normalize(19.5),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontWeight: '600',
  },
  divider: {
    height: 0.7,
    width: '20%',
    marginHorizontal: normalize(10),
    // bottom: 4,
    zIndex: -10
    // backgroundColor: AppTheme,
    // marginVertical: normalize(12),
  },
  monthlyTxt: {
    fontWeight: '500',
    color: AppTheme.COLORS.primaryBlueBg,
    fontSize: 24,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM
  },
  price: {
    fontSize: normalize(30),
    lineHeight: normalize(37),
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontWeight: '600',
    color: AppTheme.COLORS.black

  },
  deskTxt: {
    lineHeight: 50,
    fontSize: 16,
    color: '#081F32',
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  services:
    {
      flexDirection: 'row',
      alignItems: 'center'
    },
  servicesContainer: {
    marginTop: normalize(12),
    marginBottom: normalize(24)
  },
  servicesTxt: {
    marginLeft: 7,
    fontWeight: '400', fontSize: 16,
    lineHeight: 24,
    fontFamily: AppTheme.FONTS.TYPE.LIGHT,
    color: AppTheme.COLORS.black
  },
  priceTxt: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR
  },
  indicator: {
    height: 9,
    width: normalize(144),
    backgroundColor: AppTheme.COLORS.primaryGreenBg,
    borderRadius: normalize(16),
    marginTop: normalize(20),
    zIndex: 10000
  },
  tabView: {
    alignItems: 'center',
    flex: 1
  },
  contentContainerFlatlist: {
    padding: normalize(20)
  },
  bottomSheetTitle: {
    padding: 16,
    border: 1
  },
  privateOfficeCardContainer: {
    marginVertical: normalize(5)
  },
  headerContainer: {

    height: normalize(48),
    backgroundColor: AppTheme.COLORS.darkModeBg,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },
  resourceType: {
    height: normalize(160),
    width: normalize(100),
    marginTop: normalize(25),
    marginLeft: normalize(18)
  },
});
export default styles;