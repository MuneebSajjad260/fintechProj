import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: AppTheme.COLORS.white
  },
  mainContainer: {
    padding: normalize(20),
    flex: 1,
    justifyContent: 'space-between',
  },
  textInputLabel: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: AppTheme.COLORS.black,
    marginTop: scale(15),
  },
  textInputContainer: {
    // backgroundColor: '#EEEEEE',
    borderWidth: 0,
    marginTop: scale(15),
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  textInput: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    // color: AppTheme.COLORS.officialBlack,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  selectName: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    // color: AppTheme.COLORS.black,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    marginTop: normalize(16),
    
  },
  inputViewContainer: {
    backgroundColor: '#EEEEEE',
    height: normalize(52),
    width: 'auto',
    borderRadius: normalize(4),
    paddingHorizontal: normalize(16),
    //paddingVertical: normalize(14),
    marginTop: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    color: AppTheme.COLORS.officialBlack,
  },
  justifyContent: {
    paddingVertical: normalize(16),
  },
  allignResources: {
    //paddingTop:normalize(16)
  },
  announcementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  announcementTxt: {
    marginLeft: normalize(13),
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.darkText,
    width: '90%',
  },
  btnStyle: {
    marginTop: normalize(20),
  },
  fullCap: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    marginTop: normalize(10),
    color: AppTheme.COLORS.error,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  bottomSheetTitle: {
    marginVertical: 20,
    flex: 1,
    justifyContent: 'space-between',
  },

  removeMember: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: AppTheme.COLORS.black,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(19.5),
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
  },
  removeMemberDone: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: normalize(24),
    marginTop: normalize(8),
    paddingHorizontal: normalize(20),
  },
  DoneBtnStyle: {
    marginTop: normalize(20),
  },
  bg: {backgroundColor: '#EEEEEE'},
  inputView:{
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P3,
  }
});

export default styles;
