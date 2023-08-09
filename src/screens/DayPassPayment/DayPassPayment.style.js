import { StyleSheet } from 'react-native';

import normalize from 'react-native-normalize';
import { AppTheme } from '../../shared/theme';

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:AppTheme.COLORS.white
  },
  innerContainer:{
    
    padding:normalize(20),
   
  },
  scrollView:{
    flexGrow:1,
    justifyContent:'space-between'
  },
  allignInRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  statusHeading:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    // color:'rgba(0, 0, 0, 0.5)',
    lineHeight:normalize(12),
  },
  invoiceId:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(4)
  },
  bookingTime:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(4)
  },
  cardContainer:{
  
    paddingVertical:normalize(12),
    marginHorizontal:normalize(6),
    marginTop:normalize(10)
  },
  paymentAmountText:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    color:AppTheme.COLORS.purple,
    lineHeight:normalize(15),
    marginTop:normalize(4)
  },
  transferPendingText:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.error,
    lineHeight:normalize(12),
  
  },
  transferPendingContainer:{
    backgroundColor:'rgba(239, 64, 80, 0.1)',
    width:'auto',
    height:'auto',
    paddingHorizontal:normalize(5.5),
    paddingVertical:normalize(4),
    marginTop:normalize(4),
    borderRadius:4
  },
  flexDirectionRow:{
    flexDirection:'row',
    // justifyContent:'center'
  },
  bankDetails:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(19.5)
  },
  bankDetailDesc:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(4)
  },
  bankDetailContainer:{
    marginLeft:normalize(8),
    width:normalize(271),
  },
  accountDetails:{
    marginVertical:normalize(15),
    marginLeft:normalize(36)
  },
  accountName:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.MEDIUM,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(4)
  },
  ibanNo:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(4)
  },
  sarieDetailsContainer:{
    marginTop:normalize(14),
    marginLeft:normalize(36),
    marginBottom:normalize(4)
  },
  sarieDetails:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(19.5)
  },
  sarieCodeTxt:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(4)
  },
  paymentProofContainer:{
    flexDirection:'row',
    marginTop:normalize(20)
   
  },
  paymentProofSubContainer:{
    marginLeft:normalize(8)
  },
  paymentProof:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(19.5)
  },
  paymentProofDesc:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15),
    marginTop:normalize(4)
  },
  uploadPicContainer:{
    borderRadius:8,
    height:'auto',
    width:'auto',
    alignItems:'center',
    paddingVertical:normalize(37),

    borderWidth:1,
    marginTop:normalize(14),
    borderStyle:'dashed'
  },
  uploadReceiptTxt:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(15)
  },
  receiptImg:
  {
    width:normalize(87),
    height:normalize(88),
    alignSelf:'center',
    marginTop:normalize(14)
  },
  removeContainer:{
    alignSelf:'flex-end',
    width:'auto',
    height:'auto',
    borderColor:AppTheme.COLORS.error,
    borderWidth:1,
    paddingVertical:normalize(8),
    paddingHorizontal:normalize(15),
    borderRadius:4,
    marginLeft:normalize(17)
  },
  removeTxt:{
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    color:AppTheme.COLORS.error,
    lineHeight:normalize(15)
  },
  commentContainer:{
    marginTop:normalize(16)
  },
  anyCommentTxt:{
    fontSize:AppTheme.FONTS.SIZE.TEXT.T1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
    //color:AppTheme.COLORS.black,
    lineHeight:normalize(19.5)
  },
  anyCommentSubContainer:{
   
    height:normalize(88),
    marginTop:normalize(10),
    borderRadius:8,
    padding:normalize(10),
    textAlignVertical:'top',
    //color:AppTheme.COLORS.black,
    fontSize:AppTheme.FONTS.SIZE.SUBTITLES.S1,
    fontFamily:AppTheme.FONTS.TYPE.REGULAR,
   
  },
  BtnStyle:{
    marginTop:normalize(16)
  },
  confirmBtn:{
    marginTop:normalize(16)
  },
  modalContainer:
        {
          flex: 1,
    
        },
  mainModalContainer:
        {
    
          backgroundColor: '#FFFFFF',
          marginTop: normalize(190),
          width: '100%',
          height: '48%',
          alignItems: 'center',
          // justifyContent: "center",
          borderWidth: 1,
          borderRadius: 8
        },
  innerModal:
        {
          marginTop:39,
          alignItems: 'center',
        },
  header:{
    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    //color: AppTheme.COLORS.black
    marginTop:normalize(30),
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
  },
  desc:{
    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    color: AppTheme.COLORS.text,
    marginTop:normalize(14),
    textAlign: 'center',
    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
    paddingHorizontal:normalize(40)
  }
});

export default styles;