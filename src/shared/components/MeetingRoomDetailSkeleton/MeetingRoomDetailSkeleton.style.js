import { StyleSheet } from "react-native";
import { AppTheme } from "../../theme";
import { scale } from "../../utils/scale";

const styles = StyleSheet.create({
  //? Skeleton Loader
  imgSkeleton: {
    height: scale(185),
    width: '100%',
    borderRadius: scale(12),
    marginVertical: AppTheme.SPACINGS.MARGINS.M7,
    backgroundColor: AppTheme.COLORS.inputView,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
   backgroundColor: '#CACACA70',
   padding: AppTheme.SPACINGS.PADDINGS.P6,
   borderRadius: 8
  },
  detailSkeleton: {
    height: scale(15),
    borderRadius: scale(12),
    marginVertical: AppTheme.SPACINGS.MARGINS.M7,
    width: '85%'
  }, 
  innerContentSkeleton: {
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1
  },
  //* Buttons Skeleton
  btnLoaderContainer: {
    flexDirection: 'row',
    marginBottom: AppTheme.SPACINGS.MARGINS.M4
  },
  btnSkeleton: {
    marginRight: AppTheme.SPACINGS.MARGINS.M5,
    height: 36,
    width: scale(110, true),
    borderRadius: 8,
  },
  //* Timeline Skeleton
  timelineSkeleton: {
    height: scale(54),
    width: '100%',
    marginVertical: AppTheme.SPACINGS.MARGINS.M1
  },
})

export default styles