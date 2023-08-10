import { Text, View } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme } from '../../theme';

const PitchEventCard = (props) => {
  const { item } = props;
  return (
    <>
      <CardContainer style={{ padding: normalize(10), borderRadius: 4, elevation: 3 }}>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: normalize(10),
        }}><View>
            <Text style={{
              fontSize: normalize(14),
              fontFamily: AppTheme.FONTS.TYPE.REGULAR,
              color: AppTheme.COLORS.black,
              lineHeight: normalize(17)
            }}>{item?.title}</Text>
            <View style={{
              width: normalize(44),
              // borderWidth: 4,
              backgroundColor: AppTheme.COLORS.purple,
              height: normalize(4),
              borderRadius: 20,
              marginTop: normalize(5)

            }}>

            </View>
          </View>
          <View style={{
            height: 'auto',
            width: 'auto',
            paddingHorizontal: normalize(9.5),
            paddingVertical: normalize(3),
            backgroundColor: AppTheme.COLORS.orange
          }}>
            <Text style={{
              fontSize: normalize(12),
              fontFamily: AppTheme.FONTS.TYPE.REGULAR,
              color: AppTheme.COLORS.white
            }}>{item?.desc}</Text>

          </View>
       
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: normalize(17),
        }}>
          <MaterialIcons
            size={12}
            color={AppTheme.COLORS.black}
            name="calendar-today"
            style={{ marginRight: normalize(6) }}
          />
          <Text style={{
            fontSize: normalize(10),
            fontFamily: AppTheme.FONTS.TYPE.REGULAR,
            color: ' rgba(0, 0, 0, 0.6)',
            lineHeight: normalize(17),

          }}>{item?.date}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: normalize(11),
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            // marginTop: normalize(11),
          }}>
            <MaterialIcons
              size={12}
              color={AppTheme.COLORS.black}
              name="hourglass-top"
              style={{ marginRight: normalize(6) }}
            />
            <Text style={{
              fontSize: normalize(10),
              fontFamily: AppTheme.FONTS.TYPE.REGULAR,
              color: ' rgba(0, 0, 0, 0.6)',
              lineHeight: normalize(17),

            }}>{item?.time}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

            }}
          >
            <Text style={{
              fontSize: normalize(18),
              fontFamily: AppTheme.FONTS.TYPE.REGULAR,
              color: AppTheme.COLORS.black,
              lineHeight: normalize(17),

            }}>{item?.amount}</Text>
            <Text style={{
              fontSize: normalize(12),
              fontFamily: AppTheme.FONTS.TYPE.REGULAR,
              color: ' rgba(0, 0, 0, 0.5)',
              lineHeight: normalize(17),
              marginLeft: normalize(2)

            }}>{item?.each}</Text>
          </View>
        </View>
      </CardContainer>
    </>
  );
};

export default PitchEventCard;
