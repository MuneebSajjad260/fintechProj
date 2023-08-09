import { Platform, StyleSheet } from 'react-native';
import { AppTheme } from '@themes';
import { GLOBAL_STYLE } from '@themes';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.primaryBlueBg,
    // flexDirection: 'column',
  },
  btnContainer: {
    flex: 1,
    ...GLOBAL_STYLE.CENTER,
    justifyContent: 'flex-end',
    margin: normalize(16)
  },
  separator: {
    marginTop: normalize(18),
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomImage: {
    flex: 1,
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 44 : 56
  },
  imageContainer: {
    flex: 1
  }
});

export default styles;
