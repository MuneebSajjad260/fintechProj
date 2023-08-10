import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './TransactionDetailScreen.Style';
import {AppTheme} from '../../shared/theme';
import Frame from '../../shared/components/core/Frame';
import Wrapper from '../../shared/components/core/Wrapper';
import Txt from '../../shared/components/core/Txt';
import moment from 'moment';

export default function TransactionDetailScreen({route}) {
  const [isDebit, setIsDebit] = useState(true);
  const {creditHistory,price}=route.params;
  console.log('creditHistory-',creditHistory);

  return (
    <Frame style={styles.container}>
      {/* Credit Card */}
      <Wrapper style={styles.creditContainer}>
        {/* Header */}
        <View style={styles.creditHeader}>
          {/* Date & Time */}
          <View style={styles.date_timeContainer}>
            <Txt style={styles.creditDate}>{moment(creditHistory?.timestamp, 'MM/DD/YYYY HH:mm').format('Do MMMM, YYYY hh:mm A')}</Txt>
            {/* <Txt style={styles.creditTime}>04:00 PM</Txt> */}
          </View>
          {/*Mini Tag (Credit) */}
          <View
            style={[
              styles.miniTagContainer,
              {backgroundColor: isDebit ? '#EF405033' : '#EBFBF6'},
            ]}>
            <Txt
              style={[
                styles.miniTagName,
                {
                  color: isDebit
                    ? AppTheme.COLORS.red
                    : AppTheme.COLORS.primaryGreenBg,
                },
              ]}>
              {isDebit ? 'Debit' : 'Credit'}
            </Txt>
          </View>
        </View>
        
        {/* Credit */}
        <View style={[styles.creditHeader,{ marginTop: AppTheme.SPACINGS.MARGINS.M1,}]}>
          <Txt style={styles.creditName}>{creditHistory?.name}</Txt>
          <Txt style={styles.creditTime}>{creditHistory?.type == 'BLACK_WHITE' ? 'B & W' : creditHistory?.type}</Txt>
        </View>
      </Wrapper>
      {/* Amount Card */}
      <Wrapper style={styles.creditContainer}>
        {isDebit ? (
          <>
            <View style={[styles.defAlignment, {marginTop: 0}]}>
              <Txt style={[styles.amountDefText, {marginRight: 40}]}>
                Type
              </Txt>
              <Txt style={styles.amountDefText}>Page Count</Txt>
              <Txt style={styles.amountDefText}>Sub-total</Txt>
            </View>
            <View style={styles.defAlignment}>
              <View style={[styles.defRow, {marginRight: 40}]}>
                <Txt style={[styles.amountDefText, {marginRight: 4}]}>
                  Color
                </Txt>
                <Txt style={styles.amountDefTextGray}>{ creditHistory?.type == 'COLOR' ? `(SAR ${price})` : '(SAR 0)'}</Txt>
              </View>
              <Txt style={[styles.amountDefText, styles.defMargin]}> {creditHistory?.count}</Txt>
              <Txt style={[styles.amountDefText, {marginRight: 24}]}>
                {creditHistory?.type == 'COLOR' ? `${price * creditHistory?.count}` : '0'}
              </Txt>
            </View>
            {/* Devider */}
            <View style={styles.devider} />
            <View style={[styles.defAlignment]}>
              <View style={[styles.defRow, {marginRight: 40}]}>
                <Txt style={[styles.amountDefText, {marginRight: 4}]}>
                  B&W
                </Txt>
                <Txt style={styles.amountDefTextGray}>{ creditHistory?.type == 'BLACK_WHITE' ? `(SAR ${price})` : '(SAR 0)'}</Txt>
              </View>
              <Txt style={[styles.amountDefText, styles.defMargin]}>{creditHistory?.count}</Txt>
              <Txt style={[styles.amountDefText, {marginRight: 25}]}>{creditHistory?.type == 'BLACK_WHITE' ? `${price * creditHistory?.count}` : '0'}</Txt>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.defAlignment, {marginTop: 0}]}>
              <Txt style={[styles.amountDefText, {marginRight: 40}]}>
                Type
              </Txt>
              <Txt style={styles.amountDefText}>Sub-total</Txt>
            </View>
            <View style={styles.defAlignment}>
              <View style={[styles.defRow, {marginRight: 40}]}>
                <Txt style={styles.amountDefText}>Print Credits</Txt>
              </View>
              <Txt style={[styles.amountDefText, {marginRight: 24}]}>100</Txt>
            </View>
          </>
        )}
        {/* Devider */}
        <View style={styles.devider} />
        {/* Total */}
        <View style={styles.amountTotalContainer}>
          <View></View>
          <View style={styles.totalInnerContainer}>
            <Txt style={styles.total}>Total</Txt>
            <Txt style={styles.totalAmount}>{`SAR ${price * creditHistory?.count}`}</Txt>
          </View>
        </View>
      </Wrapper>
    </Frame>
  );
}
