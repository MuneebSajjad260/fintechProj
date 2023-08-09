import { StyleSheet } from 'react-native';

import normalize from 'react-native-normalize';
import { AppTheme } from '../../theme';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // height:'100%',
    // width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:normalize(-20),
    marginVertical:normalize(-20),

  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: normalize(16),
    width: '90%',
    display:'flex'
  },
  allign:{
    alignItems:'center'
  },
  modalTitle: {
    fontSize: normalize(14),
    fontFamily:AppTheme.FONTS.TYPE.SEMIBOLD,
    color:AppTheme.COLORS.black,
    alignSelf:'center',
    marginTop:normalize(24),
  },
  modalText: {
    fontSize: normalize(12),
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.text,
    marginTop:normalize(4),
    textAlign:'center'
  },
  logoutImg:
  {
    alignSelf: 'center'
  },
  btnContainer:{
    marginTop:normalize(30),
    width:'62%',
    alignSelf:'center'
  }

});

export default styles;