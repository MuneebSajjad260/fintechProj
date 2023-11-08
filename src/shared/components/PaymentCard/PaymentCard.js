import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import Feather from 'react-native-vector-icons/Feather';
import { Svg } from 'react-native-svg';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { ScreensName } from '../../constants/ScreensStrings';
import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme } from '../../theme';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import styles from './PaymentCard.style';
import ViewInvoice from '../../../assets/images/ViewInvoice.svg';
import { Divider } from 'react-native-paper';

const PaymentCard = (props) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
 
  const { item,disable,price,loading,resourceName,date,CoworkerInvoiceNumber,status,reason, tax} = props;
  return (
    <>
      <Wrapper style={styles.card}>
        <View style={[styles.flexDirection,{justifyContent:'space-between'}]}>
          <View style={styles.flexDirection}>
            <Txt style={styles.payment}>Payment</Txt>
            { (price?.EstimatedCost + price?.DiscountAmount) != 0 ?
            <View style={[status === 'pending' ? styles.pendingContainer : status === 'approved' ? styles.paidContainer : status === 'objected' ? styles.objectedContainer : styles.refundedContainer]}>
              <Txt
                style={[status === 'pending' ? styles.pending : status === 'approved' ? styles.paid  : status === 'objected' ? styles.objected  : styles.refunded ]}>
                {status === 'pending' ? 'pending' : status === 'approved' ? 'paid' : status === 'objected' ? 'objection' : 'deny'}
              </Txt>
            </View>
            :
            null
}
          </View>
          {CoworkerInvoiceNumber ?
            <TouchableOpacity
              onPress={()=>{
                navigation.navigate(ScreensName.invoiceDayPass,{resourceName:resourceName,date:date , CoworkerInvoiceNumber:CoworkerInvoiceNumber});
              }}
            >
              <View style={styles.flexDirection}>
                <View>
                  <Svg width={'100%'}> 
                    <ViewInvoice/>
                  </Svg>
                </View>
         
                <Txt
                  style={styles.invoiceText}>
              View Memo
                </Txt>

              </View>
            </TouchableOpacity>
            :
        
            null
       
          }
        </View>

      
       
        <View style={
          styles.resourceContainer}
        >
            
          <Txt style={styles.resource}>
          {resourceName}
          </Txt>
          <ShimmerPlaceHolder
            visible={loading === false}
            shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(150)}]}>

          </ShimmerPlaceHolder>
          <Txt style={styles.resourcePrice}>
            { loading === false ? `SAR ${price?.EstimatedCost + price?.DiscountAmount}` : null}
          </Txt>
        </View>
    
        <Divider style={[isDarkMode ? styles.darkModeDivider : styles.divider]}/>

        <View style={
          styles.subTotalContainer}
        >
            
          <Txt style={styles.Subtotal}>
          Subtotal
          </Txt>
          <ShimmerPlaceHolder
            visible={loading === false}
            shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(203)}]}>

          </ShimmerPlaceHolder>
          <Txt style={styles.SubtotalPrice}>
            { loading === false ? (price?.EstimatedCost + price?.DiscountAmount) : null}
          </Txt>
        </View>

{/* VAT SECTION */}
        <View style={
          styles.vatContainer}
        >
            
          <Txt style={styles.vat}>
          VAT {tax?.setting?.taxRate}%
          </Txt>

          <ShimmerPlaceHolder
            visible={loading === false}
            shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(210)}]}>

          </ShimmerPlaceHolder>

          <Txt style={styles.vatPrice}>
          {!loading ? tax?.setting?.isTaxEnable   ? ((tax?.setting?.taxRate / 100) * (price?.EstimatedCost + price?.DiscountAmount)).toFixed(2) : 0 : null}
          </Txt>
        </View>

        {/* DISCOUNT SECTION */}
        <View style={
          styles.vatContainer}
        >
            
          <Txt style={styles.vat}>
          {price?.DiscountCode ? `Discount(${price?.DiscountCode})` : `Discount(-)`}
          </Txt>

          <ShimmerPlaceHolder
            visible={loading === false}
            shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(208)}]}>

          </ShimmerPlaceHolder>

          <Txt style={styles.vatPrice}>
         {!loading ? price?.DiscountAmount ? price?.DiscountAmount : '-' : null}
          </Txt>
        </View>

{/* AMOUNT PAID SECTION */}
        <View style={
          styles.amountPaidCont}
        >
            
          <Txt style={styles.amountPaid}>
          Total amount
          </Txt>

          <ShimmerPlaceHolder
            visible={loading === false}
            shimmerStyle={[styles.shimmerAvail,{marginLeft:normalize(173)}]}>

          </ShimmerPlaceHolder>

          <Txt style={styles.amountPaidprice}>
            { loading === false ? (((price?.EstimatedCost + price?.DiscountAmount) + ((tax?.setting?.taxRate / 100) * (price?.EstimatedCost + price?.DiscountAmount)))) < price?.DiscountAmount  ?
             `SAR 0.0` :
              tax?.setting?.isTaxEnable  ? 
              `SAR ${(((price?.EstimatedCost + price?.DiscountAmount) + ((tax?.setting?.taxRate / 100) * (price?.EstimatedCost + price?.DiscountAmount))) - price?.DiscountAmount).toFixed(2) }`
                 : `SAR ${(price?.EstimatedCost + price?.DiscountAmount) - price?.DiscountAmount}` : null}
          </Txt>
        </View>


      </Wrapper>

      {status == 'objected' ?
      <Wrapper style={[styles.card,{marginTop: normalize(20)}]}>
         <Txt style={styles.payment}>Objection</Txt>
        <Txt style={[styles.Subtotal,{marginTop:normalize(10)}]}>
            {reason}
          </Txt>

    </Wrapper>
    
    :
    
    null}
    </>
  );
};

export default PaymentCard;
