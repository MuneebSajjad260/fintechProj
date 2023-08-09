import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import Feather from 'react-native-vector-icons/Feather';
import { Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector
} from 'react-redux';

import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme } from '../../theme';
import styles from './InvitesSummaryCard.style';
import Team from '../../../assets/images/team.js';
import { ScreensName } from '../../constants/ScreensStrings';

const InvitesSummaryCard = (props) => {
  const navigation = useNavigation();
  const { item,disable,data} = props;
  const isDarkMode = useSelector(state=>state?.mode?.colorScheme);
  return (
    <>
      <Wrapper style={styles.card}>
        <View style={[styles.flexDirection,{justifyContent:'space-between'}]}>
          <View style={styles.flexDirection}>
            <View>
              <Svg width={'100%'} >
                <Team />
              </Svg>
            </View>
            <Txt
              style={styles.inviteText}>
              {item?.invitees}
            </Txt>
          </View>
          {disable ? 
            null
            :
            <TouchableOpacity
              accessibilityLabel='edit'
              onPress={()=> {console.log('show me edit btn data ---',data);
                navigation.navigate(ScreensName.invitationScreen,{
                  FromTime:data?.FromTime,
                  ToTime:data?.ToTime,
                  allocation:data?.allocation,
                  currentMeetingName:data?.currentMeetingName,
                  currentMeetingRoom:data?.currentMeetingRoom,
                  idReschedule:data?.idReschedule,
                  isRescheduleRequest:data?.isRescheduleRequest,
                  isoEndTime:data?.isoEndTime,
                  isoStartTime:data?.isoStartTime,
                  recurringDaysData:data?.recurringDaysData,
                  repeatBooking:data?.repeatBooking,
                  rescheduleTeamMembers:data?.rescheduleTeamMembers,
                  selectedDate:data?.selectedDate,
                  dayPass:data?.dayPass,
                  participant:true
                });
              }}
            >
              <View style ={[styles.editBtnContainer,{   borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)',}]}>
         
                <Txt
                  style={styles.editText}>
          Edit
                </Txt>

              </View>
            </TouchableOpacity>
          }
        </View>

        <View style={styles.marginTop}>
          {item?.teamMembers.map(item => (

            // eslint-disable-next-line react/jsx-key
            <View style={
              styles.teamMemberContainer}
            >
              <Feather
                name="user"
                size={12}
                solid
                color={ isDarkMode ? 'rgba(128, 128, 128, 1)' :AppTheme.COLORS.purple}
              />
              <Txt style={styles.teamMemberName}>
                {item?.VisitorFullName}
              </Txt>
            </View>

          ))}
    
        </View>
      </Wrapper>
    </>
  );
};

export default InvitesSummaryCard;
