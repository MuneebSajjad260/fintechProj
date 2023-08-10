import {StyleSheet, Dimensions} from 'react-native';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

// Get the Actual Width, Height of Device
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  defShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  emptyContainer: {
    marginTop: '10%',
    width: '100%',
  },
  notFound: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    color: AppTheme.COLORS.text,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1,
  },
  //* Meeting Room Options (Buttons)
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  //* Modes Variant for Buttons
  flatListContainer: {
    flexGrow: 1,
  },
  btn: {
    padding: AppTheme.SPACINGS.PADDINGS.P1,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: AppTheme.SPACINGS.MARGINS.M4,
    marginVertical: AppTheme.SPACINGS.MARGINS.M1,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P1,
  },
  duration: {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  },
  btnText: {
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
  },

  //* FlatList
  timeLineContainer: {
    marginVertical: AppTheme.SPACINGS.MARGINS.M4 / 0.6,
  },
  timelineUpperFrame: {
    height: scale(54),
    borderWidth: 2,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  //* Meeting Room Buttons
  meetingRoomsBtnContainer: {
    marginTop: AppTheme.SPACINGS.MARGINS.M1,
  },
  divider: {
    width: '92%',
    height: 1,
    alignSelf: 'center',
  },
  //* Main Button
  mainBtn: {
    marginHorizontal: AppTheme.SPACINGS.MARGINS.M1,
    marginTop: AppTheme.SPACINGS.MARGINS.M1 / .4,
    marginBottom: AppTheme.SPACINGS.MARGINS.M1
  },
});

export default styles;
