import {  Text, View } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Touchable } from '../touchable';
import { AppTheme } from '../../theme';

const RecurringDays = (props) => {
  const { onPress, isSelected, recurringDay } = props;
  return (
    <Touchable
      onPress={onPress}

      style={[{
        backgroundColor: 'rgba(134, 134, 134, 0.06)',
        height: normalize(50),
        borderRadius: normalize(4),
        paddingHorizontal: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: normalize(12),
        borderColor: AppTheme.COLORS.orange,
        borderWidth: isSelected ? 1 : 0
      }, { ...props.styleContainer }]}
    >
      <View>
        <Text style={{

          lineHeight: normalize(17),
          fontFamily: AppTheme.FONTS.TYPE.REGULAR,
          color: AppTheme.COLORS.officialBlack,
          fontSize: normalize(14),
        }}>
          {recurringDay}
        </Text>

      </View>
      {
        (isSelected) && <View style={{
          backgroundColor: AppTheme.COLORS.orange,
          height: normalize(20),
          width: normalize(20),
          borderRadius: normalize(50),
          justifyContent: 'center'
        }}>
          <MaterialCommunityIcons
            name='check'
            size={20}
            color={AppTheme.COLORS.white}
          />
        </View>
      }
    </Touchable >
  );
};

export default RecurringDays;
