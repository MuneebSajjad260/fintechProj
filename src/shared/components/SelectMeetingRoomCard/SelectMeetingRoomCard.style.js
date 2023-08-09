import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { scale } from '../../utils/scale';
import { AppTheme } from '../../theme';
const style = StyleSheet.create({
  img: {
    height: normalize(131),
    width: '100%',
    borderRadius: 4,
  },
  card:
  { padding: normalize(0), paddingVertical: normalize(10) ,marginTop:AppTheme.SPACINGS.MARGINS.M3},
  rowContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(10),
    paddingHorizontal: normalize(10)
  },
  imgCont:
  { paddingHorizontal: normalize(10) },
  title:
  {
    fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    // color: AppTheme.COLORS.black,
    lineHeight: normalize(17)
  },
  descCont:
  { width: '75%', paddingHorizontal: normalize(10) },
  desc:
{
  fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
  fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  // color: 'rgba(0, 0, 0, 0.5)',
  marginTop: scale(4),

},
  flatList:
{ backgroundColor: '#EEEEEE', marginTop: scale(6) },
  checkAvail:
{
  flexDirection: 'row', alignItems: 'center',
  marginTop: normalize(15),
  paddingHorizontal: normalize(10)
},
  flexDirection:
{
  flexDirection: 'row', alignItems: 'center'
},
  unavailableCont:
{
  backgroundColor: '#EEEEEE',
  borderRadius: 20,
  height: normalize(17),
  width: normalize(17)
},
  unavailable:
{
  fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
  fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  color: 'rgba(0, 0, 0, 0.5)',
  marginLeft: normalize(6)
},
  availableCont:
{
  backgroundColor: '#D8DEFF',
  borderRadius: 20,
  height: normalize(17),
  width: normalize(17)
},
  available:
{
  fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
  fontFamily: AppTheme.FONTS.TYPE.REGULAR,
  color: 'rgba(0, 0, 0, 0.5)',
  marginLeft: normalize(6)
}


});

export default style;