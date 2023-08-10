import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppTheme } from '../../shared/theme';

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white
  },
  headerContainer: {
    flexDirection: 'row',
    height: normalize(65),
    backgroundColor: AppTheme.COLORS.primaryBlueBg,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(15),
  },
  headericonsadjustments: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: normalize(16)
  },
  statusbar: {
    flex: 0,
    backgroundColor: AppTheme.COLORS.primaryBlueBg
  },
  welcometitle: {
    color: AppTheme.COLORS.primaryBlueBg,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: normalize(17),
    marginTop: normalize(4)
    // paddingLeft: hp('2.0%'),
  },
  card: {
    paddingHorizontal: normalize(26),
    paddingVertical: normalize(16)
  },
  smallcard: {
    elevation: 4,
    marginRight: normalize(16),
    width: normalize(280),
  },
  userNameTxt: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(15),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  waitToAssignResource: {
    color: AppTheme.COLORS.primaryBlueBg,
    marginTop: normalize(23),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: normalize(16)
  },

  text: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },

  waitImage: {
    alignSelf: 'center',
    marginTop: normalize(43)
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  WhatHappeningContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: normalize(24),
    paddingBottom: normalize(20)
  },
  whatshappeningtext: {
    color: '#172659',
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: normalize(19)
  },
  smallcardheading: {
    color: '#30B991',
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  smallcardtitle: {
    color: '#172659',
    fontSize: normalize(17),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
  smallcardtext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: 'rgba(23, 38, 89, 0.6)',
    fontSize: normalize(12),
    paddingLeft: hp('2.0%'),
  },
  viewAllTxt: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: 'rgba(23, 38, 89, 0.7)',
    fontSize: normalize(16),
    paddingLeft: hp('2.0%'),
  },
  smallcardsubscript: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: 'rgba(23, 38, 89, 0.6)',
    fontSize: normalize(12),
  },
  scantext: {
    color: AppTheme.COLORS.white,
    fontSize: normalize(18),
    marginLeft: normalize(10),
    fontFamily: AppTheme.FONTS.TYPE.BOLD
  },
  scanContainer: {
    backgroundColor: 'rgba(23, 38, 89, 0.5)',
    height: normalize(70),
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: normalize(40),
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
  },

});
export default style;