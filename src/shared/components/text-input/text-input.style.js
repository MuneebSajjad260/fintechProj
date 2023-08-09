import { StyleSheet } from 'react-native';
import { COLOR } from '@config';

import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(10),
    //backgroundColor: "red",
  },
  errorContainer: {
    borderColor: AppTheme.COLORS.error,
    borderWidth: 0.5
  },
  label: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: normalize(14),
    // fontWeight: '700',
    color: COLOR.TEXT_INPUT_LABEL,
    // marginBottom: 10,
    marginBottom: normalize(6)
  },
  inputContainer: {
    height: normalize(50),
    // flex: 1,
    // width: screenWidth - 100,
    backgroundColor: 'rgba(202, 202, 202, 0.1)',
    borderRadius: 4,
    // borderBottomWidth: 0.9,
    borderColor: '#CACACA',
    shadowColor: '#000000',
    borderWidth: 1,
    // shadowOffset: {
    //   width: 3,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: 8,
  },
  applyInputContainer: {
    // height: 242,
    // width: screenWidth - 100,
    backgroundColor: COLOR.TEXT_INPUT_BACKGROUND,
    borderRadius: 8,
    borderBottomWidth: 0.9,
    // borderColor: '#FFF5EE',
    shadowColor: '#000000',
    // shadowOffset: {
    //   width: 3,
    //   height: 3,
    // },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    // elevation: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  input: {
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: COLOR.TEXT_INPUT_VALUE,
    flex: 1,
    marginLeft: normalize(15),
  },
  applyInput: {
    fontSize: 14,
    // fontFamily: 'Roboto',
    flex: 1,
    color: AppTheme.COLORS.black,
    marginLeft: normalize(15),
  },
  errorMessage: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.error,
    fontSize: normalize(12),
    fontFamily:AppTheme.FONTS.TYPE.REGULAR
  },
  errorMessageContainer: {
    justifyContent: 'center',
    marginTop: normalize(5.5),

  },
  emptyErrorMessageContainer: {
    justifyContent: 'center',
    marginTop: normalize(20),
  },
  errorIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.COLORS.error,
    height: '100%',
    width: normalize(65),
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: AppTheme.COLORS.error,

  },
  leftIcon: {
    // paddingLeft: 5,
    // marginLeft: 5,
    marginRight: 8,
  },
  eyeIcon: {

  },
  allignInRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default styles;
