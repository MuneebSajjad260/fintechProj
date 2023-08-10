import { Text, View } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import { Svg } from 'react-native-svg';

import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme } from '../../theme';
import PrintingCredit from '../../../assets/images/printingCredit.svg';

const PrintingCreditCard = (props) => {
  const { item } = props;
  return (
    <>
      <CardContainer style={{ padding: normalize(10), borderRadius: 4 }}>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: normalize(10),
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>

            <View>
              <Svg width={'100%'} >
                <PrintingCredit />
              </Svg>
            </View>
            <Text style={{
              fontSize: normalize(14),
              fontFamily: AppTheme.FONTS.TYPE.REGULAR,
              color: AppTheme.COLORS.black,
              lineHeight: normalize(17),
              marginLeft: normalize(18)
            }}>{item?.officeNo}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
          }}>
            <Text style={{
              fontSize: normalize(10),
              fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
              marginTop: normalize(2),
              color: AppTheme.COLORS.black,
              alignSelf: 'flex-start'
            }}>{item?.currency}</Text>
            <Text style={{
              fontSize: normalize(18),
              fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
              marginLeft: normalize(3),
              color: AppTheme.COLORS.black,
              alignSelf: 'center'
            }}>{item?.amount}</Text>
          </View>

        </View>

      </CardContainer>
    </>
  );
};

export default PrintingCreditCard;
