/* eslint-disable no-unused-vars */
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { AppTheme } from '../../shared/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// eslint-disable-next-line no-unused-vars
import { color } from 'react-native-reanimated';
const styles = StyleSheet.create({

  divider: {
    height: 0.7,
    width: '100%',
    marginVertical: normalize(20),
    // bottom: 4,
    zIndex: -10
    // backgroundColor: AppTheme,
    // marginVertical: normalize(12),
  },
  input: {
    backgroundColor: AppTheme.COLORS.white,
    height: normalize(65),
    borderRadius: normalize(10),
    padding: normalize(20),
    color: '#333333'
  },
  label: {
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    fontSize: normalize(16),
    colorf: '#333333',
  },
  maincontainer:
    {

      flex: 1,
      backgroundColor: AppTheme.COLORS.white,

    },
  innerContainer:
    {
      paddingHorizontal: normalize(16)
    },
  mainHeadingText:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      color: AppTheme.COLORS.darkBlue,

      paddingVertical: normalize(14)
    },
  screentext:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.black,
    },
  bottomsheetheadingtext:
    {
      fontSize: normalize(24),
      paddingHorizontal: normalize(16),
      textAlign: 'center',
      marginTop: normalize(10),
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
    },
  bottomsheetsubheadingtext:
    {
      fontSize: normalize(14),
      paddingHorizontal: normalize(16),
      textAlign: 'center',
      marginTop: normalize(10),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: '#999999'
    },
  flexdirectionrow:
    {
      flexDirection: 'row'
    },
  participantsandguesttext:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.black,
    },
  bottomsheetcontainer:
    {
      paddingHorizontal: normalize(16)
    },

  participanttext:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      color: AppTheme.COLORS.black,
    },
  editteamtext:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: '#999999',
      textDecorationLine: 'underline',

    },
  participantsviewcontainer:
    {
      height: 'auto',
      width: 'auto',
      backgroundColor: 'rgba(202, 202, 202, 0.1)',
      marginVertical: normalize(12),
      borderRadius: normalize(10)
    },
  participantsviewinnercontainer:
    {
      paddingHorizontal: normalize(16),
      paddingVertical: normalize(19)
    },
  teammembercontainer:
    {
      width: '60%',
      height: 35,
      backgroundColor: AppTheme.COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: normalize(10),
    },
  teammembertext:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.black,
    },
  guestcontainer:
    {
      width: '40%',
      height: 35,
      backgroundColor: 'rgba(245, 245, 245, 1)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: normalize(10),
    },
  guesttext:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.black,
    },
  addguesttext:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      color: AppTheme.COLORS.black,
    },
  closetext:
    {
      fontSize: normalize(16),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: '#999999',
      textDecorationLine: 'underline',


    },
  textinputscontainer:
    {
      width: '100%',
      height: 280,
      backgroundColor: 'rgba(202, 202, 202, 0.1)',
      marginVertical: normalize(12),
      borderRadius: normalize(10)
    },
  textinputsinnercontainer:
    {
      paddingHorizontal: normalize(16),

      marginTop: normalize(19)
    }
});
export default styles;