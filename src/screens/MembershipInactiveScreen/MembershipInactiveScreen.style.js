import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  safeAreaContainer:
    {
      flex: 1,
      backgroundColor: AppTheme.COLORS.white
    },
  statusBar:
    {

      backgroundColor: AppTheme.COLORS.black
    },
  ScrollView: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: AppTheme.COLORS.white

  },
  headerContainer: {
    flexDirection: 'row',
    height: normalize(90),
    backgroundColor: AppTheme.COLORS.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(21),
  },
  subContainer: {
    paddingHorizontal: normalize(20),
    // height: "100%",
    backgroundColor: AppTheme.COLORS.white
  },
  txtContainer: {
    marginTop: normalize(20)
  },
  title: {
    fontSize: normalize(16),
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    color: AppTheme.COLORS.black,
    //marginVertical: normalize(4),

  },
  desc: {
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.officialBlack,
    marginVertical: normalize(6),
    lineHeight: normalize(17)
  },

  allignInRow:
    {
      flexDirection: 'row',
      alignItems: 'center'
    },
  fintechBottomLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    // position: "absolute",
    // bottom: 0

  },
  img: {

    height: normalize(47),
    width: normalize(82),

  },
  resourceType: {
    height: normalize(150),
    width: normalize(90),
    marginTop: normalize(20),
    marginLeft: normalize(18)
  },
  pendingstate:{
    width:'auto',
    height:'auto',
    padding:normalize(15),
    backgroundColor:'rgba(230, 234, 255, 1)',
    borderRadius:8,
    margin:normalize(20)
  },
  marginLeft:{
    marginLeft:normalize(23)
  },
  approvalPending:{
    fontSize: normalize(14),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.purple,
    lineHeight: normalize(17)
  },
  approvalPendingDesc:{
    width:normalize(234),
    marginTop:normalize(6),
    fontSize: normalize(12),
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.black,
    lineHeight: normalize(14)
  }
});

export default styles;