import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';



const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.COLORS.white,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: normalize(20),
    backgroundColor: AppTheme.COLORS.white,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  headerContainer: {

    height: normalize(48),
    backgroundColor: AppTheme.COLORS.darkModeBg,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },
  subContainer: {
    marginVertical: normalize(20)
  },
  officeCard: {
    marginTop: normalize(10),

  },
  title: {
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    color: AppTheme.COLORS.primaryBlueBg,
    fontSize: normalize(20),
  },
  selectedOffice:
    {
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      //color: AppTheme.COLORS.black,
      fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
      marginTop: normalize(20)
    },
  selectMember:
    {
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      //color: AppTheme.COLORS.black,
      fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
    },
  allignInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  maxUsersContainer: {

    width: normalize(60),
    height: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
   
  },
  max5: {

    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginRight: normalize(5)
  },
  remainingMembers: {
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    marginTop: normalize(10)
  },
  btnContainer:
    {
      paddingHorizontal: normalize(20),
      // marginTop: normalize(20),

      marginBottom: normalize(20)
    },
  innerContainer:
    {
      paddingHorizontal: normalize(20),
      paddingBottom: 20
    },
  selectedMemberContainer: {
    backgroundColor: 'rgba(134, 134, 134, 0.06)',
    borderRadius: normalize(4),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(10),
  },
  selectedMemberName:

    {

      lineHeight: normalize(17),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      color: AppTheme.COLORS.officialBlack,
      fontSize: normalize(14),

    },
  userRole1Container:
    {
      height: normalize(19),
      width: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: normalize(6),
      backgroundColor: AppTheme.COLORS.orange

    },
  userRole1:
    {
      color: AppTheme.COLORS.white,
      fontSize: normalize(10),
      marginTop: normalize(2),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    },
  userRole2Container:
    {
      height: normalize(19),
      width: 'auto',
      paddingHorizontal: normalize(6),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: AppTheme.COLORS.purple,
      marginLeft: normalize(8)

    },
  userRole2:
    {
      color: AppTheme.COLORS.white,
      fontSize: normalize(10),
      marginTop: normalize(2),
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,

    },
  checkedContainer:
    {

      height: normalize(20),
      width: normalize(20),
      borderRadius: normalize(50),
      justifyContent: 'center',

    },
  unselectedMemberContainer:
    {
      backgroundColor: 'rgba(134, 134, 134, 0.06)',
      borderRadius: normalize(4),
      paddingHorizontal: normalize(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: normalize(10),

    },
  alignRoles:
    {
      flexDirection: 'row',
      marginTop: normalize(4)
    }
});

export default styles;