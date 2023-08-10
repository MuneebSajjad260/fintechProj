import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../../shared/theme';

const styles = StyleSheet.create({
  btmListItemTextColorOne: {
    color: AppTheme.COLORS.purple,
  },
  btmListItemTextColorTwo: {
    color: AppTheme.COLORS.text,
  },

  btmListItemColorOne: {
    backgroundColor: '#0129FA40',
  },
  btmListItemColorTwo: {
    backgroundColor: '#82828230',
  },

  btmContainer: {
    flex: 1,
  },
  btmHeading: {
    color: AppTheme.COLORS.black,
    fontSize: normalize(18),
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    textAlign: 'center',
    marginTop: normalize(16),
  },
  btmListItemContainer: {
    flex: 1,
    marginHorizontal: normalize(16),
    marginTop: normalize(16),
  },
  btmListItem: {
    borderRadius: 4,
    marginBottom: 8,
  },
  btmListItemText: {
    fontSize: normalize(16),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
  },
});

export default styles;
