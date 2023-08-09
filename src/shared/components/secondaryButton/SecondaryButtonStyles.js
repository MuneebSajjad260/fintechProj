import { StyleSheet } from 'react-native';
import { AppTheme } from '@themes';
import { GLOBAL_STYLE } from '@themes';
// import {HP, WP} from '@themes';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLE.CENTER_ROW,
    width: '100%',
    height: normalize(50),
    alignSelf: 'center',
    borderRadius: AppTheme.RADIUS.SMALL_BOX,

    backgroundColor: '#CACACA'
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 1.65,
    // elevation: 5,
  },
  smallContainer: {
    ...GLOBAL_STYLE.CENTER,
    width: '100%',
    // flex: 1,
    height: AppTheme.METRICES.SMALL_BUTTON_HEIGHT,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: AppTheme.RADIUS.BOX,
    marginBottom: AppTheme.MARGIN.NORMAL,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // elevation: 8,
  },
  // icon: {
  //   fontSize: 20,
  //   color: AppTheme.COLORS.white,
  //   marginRight: AppTheme.MARGIN.LOW,
  // },
  buttonText: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: normalize(16),
    color: AppTheme.COLORS.white,

  },
});

export default styles;
