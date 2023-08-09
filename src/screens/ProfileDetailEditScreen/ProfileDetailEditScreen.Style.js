import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

import {AppTheme} from '../../shared/theme';
import { scale } from '../../shared/utils/scale';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: scale(20),
  },
  ScrollView: {
    flex: 1,
  },
  textInput:
  {
    fontSize: normalize(12),
    //color: AppTheme.COLORS.officialBlack,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR

  },
  profiletext:
    {
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      color: AppTheme.COLORS.primaryBlueBg,
      fontSize: normalize(16)
    },
  edittext:
    {
      fontFamily: AppTheme.FONTS.TYPE.BOLD,
      color: AppTheme.COLORS.primaryBlueBg,
      fontSize: normalize(16),
      textDecorationLine: 'underline'
    },
  allignrow:
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
  personalinformationtext:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      //color: AppTheme.COLORS.black,
      fontSize: normalize(16),
      marginLeft: normalize(24)
    },
  detailsheadingtext:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      //color: AppTheme.COLORS.black,
      fontSize: normalize(12),
    },
  detailsinformationtext:
    {
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      //color: AppTheme.COLORS.black,
      fontSize: normalize(16),
      marginTop: normalize(8),
      marginBottom: normalize(24)

    },
  inputContainer: {
    marginVertical: scale(12),
  },
  input: {
    // backgroundColor: 'rgba(245, 245, 245, 1)',
   
    // borderRadius: normalize(4),
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P2,
    // borderWidth:0
  },
  errorCont:
  {
    borderColor: AppTheme.COLORS.error,
    borderWidth: 1,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: normalize(4),
  },
  Updatedconfirmationtext: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    marginTop: scale(20),
    textAlign: 'center',
  },
  editDetailsContainer: {
    marginTop: scale(22),
  },
  bottomsheetContainer: {
    padding: scale(20),
  },
  bottomSheetBtn: {
    marginTop: scale(20),
  },
  noteContainer: {
    height: 'auto',
    borderWidth: 1,
    borderColor: AppTheme.COLORS.error,
    borderRadius: 7,
    paddingHorizontal: scale(9),
    paddingVertical: scale(10),
    marginBottom: scale(20),
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  leftIcon: {},

  onlyAdminTxt:{
    fontSize:normalize(10),
    fontFamily:AppTheme.FONTS.TYPE.LIGHT,
    color:AppTheme.COLORS.text,
    marginTop:normalize(6)
  },
  profileupdatedtext:{
    fontSize:normalize(16),
    fontFamily:AppTheme.FONTS.TYPE.LIGHT,
    alignSelf:'center'
  }
});
export default styles;
