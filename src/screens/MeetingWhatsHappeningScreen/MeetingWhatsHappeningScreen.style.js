import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

const style = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,

  },


  innerContainer: {
    padding: normalize(20),

  },

  statusbar: {
    flex: 0,
    backgroundColor: AppTheme.COLORS.black
  },


  flexDirectionRow: {
    flexDirection: 'row'
  },

  officeCard: {
    // margin: normalize(4),
    //  paddingHorizontal: normalize(20)
  },


});
export default style;