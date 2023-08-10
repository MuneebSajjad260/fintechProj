import { StyleSheet } from "react-native";
import { AppTheme } from "../../shared/theme";
import normalize from "react-native-normalize";

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
  },
  notfoundContainer: {
    flex: 1,
  },
  notfound: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: normalize(16),
    color: AppTheme.COLORS.text,
    textAlign: 'center'
  }
})

export default styles