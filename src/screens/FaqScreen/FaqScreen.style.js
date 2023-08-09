import {StyleSheet, Dimensions} from 'react-native';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../shared/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    margin: AppTheme.SPACINGS.MARGINS.M4,
  },
  //? SectionList Styling
  //* Headers
  sectionHeaderContainer: {
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M6,
    marginTop: AppTheme.SPACINGS.MARGINS.M6,
  },
  sectionHeader: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H3,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
  },
  //* Items
  sectionItemContainer: {
    padding: AppTheme.SPACINGS.PADDINGS.P2,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M6,
  },
  sectionItemTitle: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.BOLD,
    marginBottom: AppTheme.SPACINGS.MARGINS.M4,
  },
  sectionItemDesc: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.greyDark,
  },
  //* Section Container
  sectionContainerWhite: {
    backgroundColor: AppTheme.COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  sectionContainerDark: {
    backgroundColor: AppTheme.COLORS.wrapperDarkModeBg,
  },
  //* Section Devider
  sectionDevider: {
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  //* Item Devider
  devider: {
    height: 1,
    backgroundColor: AppTheme.COLORS.greyDark,
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M6,
    opacity: 0.5
  },
  //* Add Border Radius to Section Content
  itemFirst: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 0,
    marginBottom: AppTheme.SPACINGS.MARGINS.M4,
  },
  //* Not Found
  notFound: {
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.greyDark,
    textAlign: 'center'
  },
});

export default styles;
