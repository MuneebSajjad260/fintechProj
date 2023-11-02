import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import Feather from 'react-native-vector-icons/Feather';
import { Svg } from 'react-native-svg';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import Txt from '../core/Txt';
import Wrapper from '../core/Wrapper';
import { ScreensName } from '../../constants/ScreensStrings';
import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme } from '../../theme';
import styles from './InvoiceDayPassCard.style';
import ViewInvoice from '../../../assets/images/ViewInvoice.svg';
import { Divider } from 'react-native-paper';

const InvoiceDayPassCard = (props) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const { item,disable,price,loading,resourceName,date,userName,email , downloadInvoice} = props;
  const totalSubTotal = price.reduce((total, item) => total + item.SubTotal, 0);
  const totalvat = price.reduce((total, item) => total + item.TaxAmount, 0);

  console.log("price---",price)
  return (
    <>
      <Wrapper style={styles.card}>
        <View style={[styles.flexDirection,{justifyContent:'space-between'}]}>
        
          <View>
            <Txt style={styles.dayPass}>{resourceName}</Txt>
            <View style={[styles.flexDirection,{marginTop:normalize(12)}]}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={22}
                solid
                color={AppTheme.COLORS.purple}
              />
              <Txt style={styles.today}>{date}</Txt>
            </View>
          </View>
          <TouchableOpacity
            onPress={()=>{
              downloadInvoice();
              console.log('i am pdf down');
            }}>
            <View style={styles.downloadContainer}>
              <Feather
                name="download"
                size={20}
                solid
                color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}
              />
              <Txt style={styles.Download}>Download PDF</Txt>
            </View>
          </TouchableOpacity>
        </View>

        <Txt style={styles.name}>
          {userName}
        </Txt>

        <Txt style={styles.email}>
          {email}
        </Txt>
      
    
        <Divider style={styles.divider}/>
        {/* {price?.map(item=>( */}
          <View key ={item?.Id}>
    

            <View style={[styles.flexDirection,{justifyContent:'space-between'}]}>
              <Txt style={styles.product}>Product</Txt>
              <View style={styles.paidContainer}>
                <Txt
                  style={styles.paid}>
                Paid
                </Txt>
              </View>
            </View>
            <View style={[
              styles.subTotalContainer,{marginTop:normalize(13)}]}
            >
            
              <Txt style={styles.dayPassPrice}>
          Day Pass
              </Txt>
            
              <Txt style={styles.dayPassPriceValue}>
                {`SAR ${price[0]?.SubTotal.toFixed(2)} `}
              </Txt>
            </View>

           
            <Divider style={styles.divider}/>

{/* SUB TOTAL SECTION */}
            <View style={[
              styles.subTotalContainer]}
            >
            
              <Txt style={styles.subTotal}>
         Subtotal
              </Txt>
             
              <Txt style={styles.subTotalPrice}>
                {`SAR ${totalSubTotal.toFixed(2)} `}
              </Txt>
            </View>

{/* VAT SECTION */}

            <View style={[
              styles.subTotalContainer]}
            >
            
              <Txt style={styles.vat}>
                {`VAT (${price[0]?.TaxRate}%)`}
              </Txt>
            
              <Txt style={styles.vatPrice}>
                {totalvat.toFixed(2)}
              </Txt>
            </View>

{/* DISCOUNT SECTION */}

<View style={[
              styles.subTotalContainer]}
            >
            
              <Txt style={styles.vat}>
              {price[0]?.DiscountCode ? `Discount(${price[0]?.DiscountCode})` : `Discount(-)`}
              </Txt>
            
              <Txt style={styles.vatPrice}>
                {price[0]?.DiscountAmount ? price[0]?.DiscountAmount : '-' }
              </Txt>
            </View>

{/* AMOUNT PAID SECTION */}
            <View style={
              styles.amountPaidCont}
            >
            
              <Txt style={styles.amountPaid}>
          Amount paid
              </Txt>

             

              <Txt style={styles.amountPaidprice}>
                {((totalSubTotal + ((totalvat / 100) * totalSubTotal))) < price[0]?.DiscountAmount  ? `SAR 0.0` : `SAR ${totalSubTotal + totalvat - price[0]?.DiscountAmount}` }
              </Txt>
            </View>



          </View>
        {/* ))} */}
       

      </Wrapper>
    </>
  );
};

export default InvoiceDayPassCard;
