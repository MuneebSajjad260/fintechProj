import {Text, View} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {Svg} from 'react-native-svg';

import CardContainer from '../cardWrapper/CardContainer';
import {AppTheme} from '../../theme';
import Info from '../../../assets/images/info.svg';
const HubClosureCard = props => {
  const {item} = props;
  return (
    <>
      <CardContainer
        style={{padding: normalize(10), borderRadius: 4, elevation: 3}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: normalize(10),
          }}>
          <View>
            <Text
              style={{
                fontSize: normalize(14),
                fontFamily: AppTheme.FONTS.TYPE.REGULAR,
                color: AppTheme.COLORS.black,
                lineHeight: normalize(17),
              }}>
              {item?.title}
            </Text>
            <View
              style={{
                width: normalize(44),
                backgroundColor: AppTheme.COLORS.orange,
                height: normalize(4),
                borderRadius: 20,
                marginTop: normalize(5),
              }}></View>
          </View>
          <View
            style={{
              height: 'auto',
              width: 'auto',
              paddingHorizontal: normalize(9.5),
              paddingVertical: normalize(3),
              backgroundColor: AppTheme.COLORS.yellow,
            }}>
            <Text
              style={{
                fontSize: normalize(12),
                fontFamily: AppTheme.FONTS.TYPE.REGULAR,
                color: AppTheme.COLORS.white,
              }}>
              {item?.desc}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(17),
          }}>
          <View>
            <Svg width={'100%'}>
              <Info />
            </Svg>
          </View>
          <Text
            style={{
              fontSize: normalize(10),
              fontFamily: AppTheme.FONTS.TYPE.REGULAR,
              color: ' rgba(0, 0, 0, 0.6)',
              lineHeight: normalize(12),
              marginLeft: normalize(5),
            }}>
            {item?.info}
          </Text>
        </View>
      </CardContainer>
    </>
  );
};

export default HubClosureCard;
