import { Text, View } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import Txt from '../core/Txt';
import styles from './inputTeamMember.style';

import { Touchable } from '../touchable';
import { AppTheme } from '../../theme';

const InputViewTeamMember = (props) => {
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  const {  onPress, IsAdmin, IsPayingMember, isSelected, teamMemberName , resheduleMember } = props;
  return (

    <View>

      <Touchable
        onPress={onPress}
        disabled={IsAdmin}
        style={[styles.mainContainer, {
          backgroundColor: isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg  : 'rgba(134, 134, 134, 0.06)',
          height: (IsAdmin || IsPayingMember) ? normalize(65) : normalize(50),
          borderColor: (IsAdmin) ? AppTheme.COLORS.orange : AppTheme.COLORS.orange,
         
          borderWidth: (IsAdmin) ? 1 : (isSelected) ? 1 : 0 
        }, { ...props.styleContainer }]}
      >
        <View>

          <Txt style={styles.teamMemberName}>
            {teamMemberName}
          </Txt>

          <View style={styles.allignInRow}>
            {IsAdmin === true &&
                            <View
                              style={styles.adminContainer}>
                              <Text style={styles.adminTxt}>Administrator</Text>
                            </View>
            }
            {IsPayingMember === true &&
                            <View
                              style={[styles.payingMemberContainer, {
                                marginLeft: IsAdmin ? normalize(8) : normalize(0)
                              }]}
                            >
                              <Text style={styles.payingMemberTxt}>Paying member</Text>
                            </View>
            }
          </View>

        </View>
        {
          (IsAdmin || isSelected) && <View style={[styles.checkContainer, {
            backgroundColor: IsAdmin ? null : AppTheme.COLORS.orange,
          }]}>
            <MaterialCommunityIcons
              name='check'
              size={20}
              color={isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : AppTheme.COLORS.white}
            />
          </View>
        }
      </Touchable >
    </View>
  );
};

export default InputViewTeamMember;
