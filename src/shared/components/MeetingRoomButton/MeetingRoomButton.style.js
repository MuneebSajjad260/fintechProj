import { StyleSheet } from "react-native";
import { AppTheme } from "../../theme";

const styles = StyleSheet.create({
  darkActive: {
    borderColor: '#0129FA',
    backgroundColor: '#0129FA12',
  },
  dark: {
    borderColor: '#FFFFFF1A',
    backgroundColor: '#FFFFFF06',
  },
  lightActive: {
    backgroundColor: AppTheme.COLORS.black,
  },
  light: {
    borderColor: '#C9C9C9',
  },
  btn: {
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: AppTheme.SPACINGS.MARGINS.M4,
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  btnText: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },
})

export default styles;