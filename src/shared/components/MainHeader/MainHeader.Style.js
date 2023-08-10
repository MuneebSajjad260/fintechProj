import { StyleSheet } from 'react-native';
// eslint-disable-next-line no-unused-vars
import { COLOR } from '@config';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: normalize(90),
    backgroundColor: AppTheme.COLORS.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(21),
  },
  allignInRow:
    {
      flexDirection: 'row',
      alignItems: 'center'
    },
});

export default styles;
