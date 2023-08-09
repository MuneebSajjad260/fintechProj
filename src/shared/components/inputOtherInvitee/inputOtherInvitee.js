import { Text, View } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import styles from './inputOtherInvitee.style';
import Txt from '../core/Txt';
import { Touchable } from '../touchable';
import { AppTheme } from '../../theme';

const InputViewOtherInvitee = (props) => {
  const { onPress, IsAdminOrPayingMember, isSelected, teamMemberName, email } = props;
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);
  return (
    <Touchable
      onPress={onPress}
      disabled={IsAdminOrPayingMember}
      style={[styles.mainCont,{
        backgroundColor: isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg  : 'rgba(134, 134, 134, 0.06)',
        height: IsAdminOrPayingMember ? normalize(65) : normalize(50),
        borderColor: IsAdminOrPayingMember ? AppTheme.COLORS.orange : AppTheme.COLORS.orange,
        borderWidth: IsAdminOrPayingMember ? 1 : (!isSelected) ? 1 : 0
      }, { ...props.styleContainer }]}
    >
      <View>
        <Txt style={styles.name}>
          {teamMemberName}
        </Txt>
        <Txt style={styles.email}
        >
          {email}
        </Txt>
      </View>
      {
        (IsAdminOrPayingMember || !isSelected) && <View style={[styles.checkCont,{
          backgroundColor: IsAdminOrPayingMember ? null : AppTheme.COLORS.orange,
         
        }]}>
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

export default InputViewOtherInvitee;
