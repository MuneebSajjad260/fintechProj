import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  //* Invoice
  invoiceContainer: {
    flex: 1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P5,
  },

  //* Detail
  detailContainer: {
    flex: 1,
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
  },
  companyTag: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    marginLeft:normalize(16)
    // color:AppTheme.COLORS.black
  },
  companyNameContainer: {
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  companyContainer:
  {flexDirection:'row' ,
    alignItems:'center',
  },
  companyDetailsHeadingTag: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  },
  companyName: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
  },
  statusContainer: {
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  statusTag: {
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
  },
  status: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
   
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
   
  },
  statusTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
    flex:1,
    justifyContent:'flex-end',
  },
  activeDot: {
    height: scale(15),
    width: scale(15, true),
    borderRadius: 100 / 2,
    marginRight: AppTheme.SPACINGS.MARGINS.M5,
  },
  // Plan
  planContainer: {},
  planTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editText: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    textDecorationLine: 'underline',
  },
  numOfMembers: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    marginTop: AppTheme.SPACINGS.MARGINS.M5,
  },
  noTeamFoundContainer: {
    flex: 1,
  },
  noTeamFound: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
    textAlign: 'center',
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  // Invoice Card Container

  invoiceContainer: {
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P5,
    paddingVertical: AppTheme.SPACINGS.PADDINGS.P1,
  },
  // Skeleton Loader (Shimmer)
  defShimmer: {
    height: scale(100),
    width:'100%',
    borderRadius: 8,
    marginTop: 8,
    alignSelf:'center',
    marginBottom:scale(10)
  },
  testingCont:{
    flexDirection:'row',
    height:'auto',
    width:'auto',
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    borderWidth:1,
    borderRadius:8,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  resourceCont:
  {borderWidth:1,
   
    width:'auto',
    height:'auto',
    padding:AppTheme.SPACINGS.PADDINGS.P1,
    borderRadius:8,
  },
  divider:{
    marginVertical:AppTheme.SPACINGS.MARGINS.M1,
  
  }
});
export default styles;
