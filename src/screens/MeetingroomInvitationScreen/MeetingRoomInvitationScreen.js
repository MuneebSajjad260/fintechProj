import React from 'react';
import {View, SafeAreaView, ScrollView, StatusBar, Text} from 'react-native';
import {Svg} from 'react-native-svg';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import Txt from '../../shared/components/core/Txt';
import Frame from '../../shared/components/core/Frame';
import {GetMembers} from '../../shared/redux/action/GetMembers';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {GetTeam} from '../../shared/redux/action/GetTeam';
import {
  setTeamMembersMeetingRoom,
  setOtherInviteeMeetingRoom,
} from '../../shared/redux/slices/memberSelectionSlice';
import Strings from '../../shared/constants/Strings';
import {AppText} from '../../shared/components';
import styles from './MeetingRoomInvitationScreen.style';
import InputTeamMember from '../../shared/components/inputTeamMember/inputTeamMember';
import InputViewOtherInvitee from '../../shared/components/inputOtherInvitee/inputOtherInvitee';
import {PrimaryButton, SecondaryButton} from '../../shared/components';
import TextInput from '../../shared/components/text-input/Textinput';
import Invitation from '../../assets/images/invitationsImg.js';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import {bottomSheetEmailValidator} from '../../shared/utils/validationHelpers.js';
import {AppTheme} from '../../shared/theme';
import Input from '../../shared/components/core/Input';
import Botton from '../../shared/components/core/Botton';

const InvitationScreen = ({route}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const {
    repeatBooking,
    currentMeetingRoom,
    allocation,
    isoStartTime,
    isoEndTime,
    recurringDaysData,
    dayPass,
    currentMeetingName,
    selectedDate,
    rescheduleTeamMembers,
    idReschedule,
    isRescheduleRequest,
    participant,
    Description,
    start_end_time,
    duration,
  } = route.params;
  // console.warn('Hmmm________________', repeatBooking, recurringDaysData);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const userData = useSelector(selectUserData);
  const GetMembersLoading = useSelector(state => state?.getMembers?.loading);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [seqId, setSeqId] = useState(
    rescheduleTeamMembers ? rescheduleTeamMembers.length : 0,
  );
  const [otherInvitee, setOtherInvitee] = useState(false);
  const [userName, setUserName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});

  const rescheduleTeamMembers1 = rescheduleTeamMembers?.map((item, index) => {
    return {
      ...item,
      Id: index, // add a unique ID to each object starting from 1
    };
  });
  const [inviteeName, setInviteeName] = useState(
    rescheduleTeamMembers ? rescheduleTeamMembers1 : [],
  );
  const [inviteeNameScreen, setInviteeNameScreen] = useState(
    rescheduleTeamMembers ? rescheduleTeamMembers1 : [],
  );

  const loginData = useSelector(state => state.auth?.data);
  const token = loginData?.access_token;
  const teamMembers = useSelector(state => state?.getTeam);
  const teamMembersPending = teamMembers?.loading;
  const teammembersdata = teamMembers?.data;
  // const name = teammembersdata[0]?.AllTeamMembers
  console.log('All members 11---', teammembersdata);
  const allTeamMembers = teammembersdata?.find(item => {
    return item;
  });
  const payingMemberId = allTeamMembers?.Team?.PayingMemberId;
  console.log('All members paying member---', payingMemberId);

  const [teamMembersData, setTeamMembersData] =
    useState();
    // resheduleMember ? resheduleMember : []
    //   () => {
    //   return teammembersdata?.AllTeamMembers ? teammembersdata?.AllTeamMembers : [];

    // }
  // console.log('teammemberdata-777--', teamMembersData);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [teamLead, setTeamLead] = useState([]);

  const onSelectTeamMember = (index, item) => {
    if (selectedMembers.length + inviteeName.length < 7) {
      const i = selectedMembers?.findIndex(index => index.Id === item.Id);
      console.log('-44', i);
      if (i !== -1) {
        let temp = [...selectedMembers];
        temp.splice(i, 1);
        console.log('removing members', temp);

        setSelectedMembers(temp);
      } else {
        setSelectedMembers([...selectedMembers, item]);
        console.log('Addind members', selectedMembers);
      }
    } else {
      selectedMembers.map(i => {
        if (i.Id === item.Id) {
          const i = selectedMembers?.findIndex(index => index.Id === item.Id);

          if (i !== -1) {
            let temp = [...selectedMembers];
            temp.splice(i, 1);
            console.log('removing members', temp);
            setSelectedMembers(temp);
          } else {
            setSelectedMembers([...selectedMembers, item]);
            console.log('Addind members', selectedMembers);
          }
        }
      });
    }
    // let SelectedPOMembers = teamMembersData.find(item => (item.IsTeamAdministrator === true));
    // console.log('ADMIN---', [...selectedMembers, { fullName: SelectedPOMembers?.FullName, isAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, isPayingMember: isSelectPayingMember(SelectedPOMembers?.Id) ? true : false  }]);
    // //   setSelectedMembers([...selectedMembers, { FullName: SelectedPOMembers?.FullName, IsTeamAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, IsPayingMember: SelectedPOMembers?.IsPayingMember }])
    // setTeamLead({ fullName: SelectedPOMembers?.FullName, isAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, isPayingMember:isSelectPayingMember(SelectedPOMembers?.Id) ? true : false  });
  };

  // toggling isSelected entity on click

  const isSelectedMember = Id => {
    const isMember = selectedMembers?.find(item => item?.Id === Id);
    if (isMember) {
      return true;
    } else {
      return false;
    }
  };

  // toggling paying member
  const isSelectPayingMember = Id => {
    const isPayingMember = Id === payingMemberId;

    if (isPayingMember) {
      console.log('90900----00----', true);
      return true;
    } else {
      console.log('90900---11-----', false);
      return false;
    }
  };

  const isTeamLead = () => {
    let SelectedPOMembers = teamMembersData?.find(
      item => item?.IsTeamAdministrator === true,
    );
    console.log('ADMIN---', [
      ...selectedMembers,
      {
        FullName: SelectedPOMembers?.FullName,
        IsTeamAdministrator: SelectedPOMembers?.IsTeamAdministrator,
        Id: SelectedPOMembers?.Id,
        isPayingMember: isSelectPayingMember(SelectedPOMembers?.Id)
          ? true
          : false,
      },
    ]);
    //   setSelectedMembers([...selectedMembers, { FullName: SelectedPOMembers?.FullName, IsTeamAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, IsPayingMember: SelectedPOMembers?.IsPayingMember }])
    setTeamLead({
      fullName: SelectedPOMembers?.FullName,
      isAdministrator: SelectedPOMembers?.IsTeamAdministrator,
      Id: SelectedPOMembers?.Id,
      isPayingMember: isSelectPayingMember(SelectedPOMembers?.Id)
        ? true
        : false,
    });
  };
  console.log('team lead----', teamLead);
  console.log('araaay----', selectedMembers);

  const onselectInvitee = (index, item) => {
    console.log('-33 item--', item);
    if (selectedMembers.length + inviteeName.length < 7) {
      const i = inviteeName?.findIndex(index => index.Id === item.Id);
      console.log('-44', i);
      if (i !== -1) {
        let temp = [...inviteeName];
        temp.splice(i, 1);
        console.log('removing members', temp);

        setInviteeName(temp);
      } else {
        setInviteeName([...inviteeName, item]);
        console.log('Addind members', inviteeName);
      }
    } else {
      inviteeName.map(i => {
        if (i.Id === item.Id) {
          const i = inviteeName?.findIndex(index => index.Id === item.Id);

          if (i !== -1) {
            let temp = [...inviteeName];
            temp.splice(i, 1);
            console.log('removing members', temp);
            setInviteeName(temp);
          } else {
            setInviteeName([...inviteeName, item]);
            console.log('Addind members', inviteeName);
          }
        }
      });
    }
  };
  console.log('inviteNAMESCREEN---22--', inviteeNameScreen);
  console.log('inviteNAME---33--', inviteeName);
  const isSelectedInvitee = Id => {
    console.log('ID-----', Id);
    const isMember = inviteeName?.find(item => item?.Id === Id);
    if (!isMember) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = () => {
    // console.log('hello im userName');
    const emailError = bottomSheetEmailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
  };

  const handleSaveBtn = () => {
    // setOtherInvitee(false);
    console.log(
      'rescheduleTeamMembers lemgth---',
      rescheduleTeamMembers?.length,
    );
    setSeqId(seqId + 1);
    console.log('seq idlemgth---', seqId);
    setEmail({value: ' '});
    console.log('--1111--', inviteeName);

    const emailError = bottomSheetEmailValidator(email.value);

    if (emailError) {
      setEmail({...email, error: emailError});

      return;
    } else {
      setUserName({value: ' '});
      setOtherInvitee(false);
      setInviteeName([
        ...inviteeName,
        {
          Id: seqId,
          VisitorFullName: userName.value.replace(/^\s+/, ''),
          VisitorEmail: email.value.replace(/^\s+/, ''),
          IsTeamAdministrator: false,
          isPayingMember: false,
          TypeName: 'bookingVisitor',
        },
      ]);
      setInviteeNameScreen([
        ...inviteeNameScreen,
        {
          Id: seqId,
          VisitorFullName: userName.value.replace(/^\s+/, ''),
          VisitorEmail: email.value.replace(/^\s+/, ''),
          IsTeamAdministrator: false,
          isPayingMember: false,
          TypeName: 'bookingVisitor',
        },
      ]);
      return;
    }
  };

  useEffect(() => {
    // dispatch(GetTeam(token))

    dispatch(GetMembers(userData?.TeamIds))
      .unwrap()
      .then(result => {
        // check result

        console.log('----res plan result 667788a---', result);

        const fromIndex = result?.findIndex(
          item => item?.IsTeamAdministrator === true,
        );
        const toIndex = 0;

        // eslint-disable-next-line
        let temp = [...result];
        const element = temp?.splice(fromIndex, 1)[0];
        temp?.splice(toIndex, 0, element);
        console.log('new sorted data -------', temp);

        const filteredData = temp.filter(
          member => member.Email !== userData?.Email,
        );
        console.log('filterData---', filteredData);
        setTeamMembersData(result ? filteredData : []);

        const matchingEmails = rescheduleTeamMembers1.filter(item1 => {
          const item2 = temp.find(item => item.Email === item1.VisitorEmail);
          return item2 ? {...item1, ...item2} : false;
        });

        const nonMatchingEmails = rescheduleTeamMembers1.filter(item1 => {
          const item2 = temp.find(item => item.Email === item1.VisitorEmail);
          return !item2;
        });

        console.log('matchingEmails----', matchingEmails);
        console.log('nonMatchingEmails---', nonMatchingEmails);
        const nonmatching =
          dayPass === true
            ? rescheduleTeamMembers
              ? rescheduleTeamMembers1
              : []
            : nonMatchingEmails
            ? nonMatchingEmails
            : [];
        setSeqId(seqId + 1);
        setInviteeName(nonmatching);
        setInviteeNameScreen(nonmatching);

        //REPLACING ID OF MATCHING EMAILS ARRAY WITH TEAMMEMBERSDATA ARRAY IN CASE OF RESCHEDULE ONLY
        const replaceId = matchingEmails.map(obj => {
          const teamMember = temp.find(
            member => member.Email === obj.VisitorEmail,
          );
          if (teamMember) {
            return {...obj, Id: teamMember.Id};
          }
          return obj;
        });
        console.log('newParams--', replaceId);
        setSelectedMembers(rescheduleTeamMembers1 ? replaceId : []);
      })
      .catch(error => {
        console.log('error team members---', error);
      });
  }, [dispatch]);

  useEffect(() => {
    isTeamLead();
  }, [teamMembersData]);

  return (
    <Frame>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <View style={styles.allignInRow}>
            <View>
              {/* <Svg width={'100%'} > */}
              <Invitation stroke={isDarkMode ? AppTheme.COLORS.white : null} />
              {/* </Svg> */}
            </View>
            <View>
              <Txt style={styles.meetingInvitationText}>
                {Strings.meetingInvitation}
              </Txt>
              <Txt
                style={[
                  styles.max7Text,
                  {
                    color: isDarkMode
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(0, 0, 0, 0.5)',
                  },
                ]}>
                {Strings.max7}
              </Txt>
            </View>
          </View>
          <View style={styles.InputTeamMemberContainer}>
            {!dayPass ? (
              <View>
                <Txt style={styles.selectTeamMemberText}>
                  {Strings.selectFromTeamMember}
                </Txt>
                <ShimmerPlaceHolder
                  visible={teamMembersPending === false}
                  shimmerStyle={[styles.shimmerAvail, {}]}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  visible={teamMembersPending === false}
                  shimmerStyle={[styles.shimmerAvail, {}]}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  visible={teamMembersPending === false}
                  shimmerStyle={[styles.shimmerAvail, {}]}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  visible={teamMembersPending === false}
                  shimmerStyle={[styles.shimmerAvail, {}]}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  visible={teamMembersPending === false}
                  shimmerStyle={[styles.shimmerAvail, {}]}></ShimmerPlaceHolder>
                {teamMembersData?.map((item, index) => (
                  // eslint-disable-next-line react/jsx-key

                  // !item?.IsTeamAdministrator ?
                  // eslint-disable-next-line react/jsx-key
                  <InputTeamMember
                    // resheduleMember={resheduleMember}
                    IsAdmin={
                      userData?.IsTeamAdministrator
                        ? item?.IsTeamAdministrator
                        : false
                    }
                    // IsPayingMember={isSelectPayingMember(item?.Id)}

                    isSelected={isSelectedMember(item?.Id) ? true : false}
                    onPress={() =>
                      onSelectTeamMember(index, {
                        VisitorFullName: item?.FullName,
                        VisitorEmail: item?.Email,
                        TypeName: 'bookingVisitor',
                        isAdministrator: item?.IsTeamAdministrator,
                        Id: item?.Id,
                        isPayingMember: isSelectPayingMember(item?.Id),
                      })
                    }
                    teamMemberName={item?.FullName}
                    // teamMemberName={rescheduleTeamMembers ? item?.VisitorFullName : item?.FullName}
                  />
                  // :
                  // null;
                ))}

                <Txt style={styles.otherInvitesText}>
                  {Strings.otherInvites}
                </Txt>
              </View>
            ) : null}
            {teamMembersPending === false
              ? inviteeNameScreen.map((item, index) => {
                  return (
                    <>
                      <InputViewOtherInvitee
                        // IsAdmin={item?.IsTeamAdministrator}
                        // IsPayingMember={isSelectPayingMember(item?.Id)}

                        isSelected={isSelectedInvitee(item?.Id) ? true : false}
                        onPress={() =>
                          onselectInvitee(index, {
                            VisitorFullName: item?.VisitorFullName,
                            VisitorEmail: item?.VisitorEmail,
                            TypeName: item?.TypeName,
                            isAdministrator: item?.IsTeamAdministrator,
                            Id: item?.Id,
                            isPayingMember: isSelectPayingMember(item?.Id),
                          })
                        }
                        teamMemberName={item?.VisitorFullName}
                        email={item?.VisitorEmail}
                      />
                    </>
                  );
                })
              : null}

            {otherInvitee === false ? (
              <PrimaryButton
                accessibilityLabel="addInvitee"
                loading={false}
                title={'Add invitee'}
                disabled={
                  selectedMembers.length + inviteeName.length < 7 ? false : true
                }
                small={false}
                onPress={() => {
                  console.log('I am add invitee btn ');
                  setOtherInvitee(true);

                  console.log('hello', otherInvitee);
                }}
                stylesContainer={[
                  styles.addInviteeBtn,
                  {
                    backgroundColor: isDarkMode
                      ? AppTheme.COLORS.btnActiveDarkMode
                      : AppTheme.COLORS.black,
                    borderWidth: isDarkMode ? 1 : 0,
                    borderColor: isDarkMode ? AppTheme.COLORS.white : null,
                  },
                ]}
                btnText={styles.addInviteeText}
              />
            ) : (
              <View style={styles.inputFieldContainer}>
                <Input
                  accessibilityLabel="name"
                  hideTag={false}
                  Tag={'Name'}
                  value={userName.value}
                  // error={userName.error}
                  hideErrorContainer={true}
                  onChangeText={text => {
                    setUserName({value: text, error: ''});
                    console.log('username:', userName);
                  }}
                  InputStyling={[
                    styles.textInputContainer,
                    {
                      backgroundColor: isDarkMode
                        ? AppTheme.COLORS.wrapperDarkModeBg
                        : '#EEEEEE',
                    },
                  ]}
                />
                <Input
                  accessibilityLabel="email"
                  hideTag={false}
                  Tag={'Email'}
                  errorDetail={'Ooops! We need a valid email address.'}
                  value={email.value}
                  error={email.error}
                  hideErrorContainer={true}
                  onChangeText={text => {
                    setEmail({value: text, error: ''});
                    console.log('Email:', email);
                  }}
                  InputStyling={[
                    styles.textInputContainer,
                    {
                      backgroundColor: isDarkMode
                        ? AppTheme.COLORS.wrapperDarkModeBg
                        : '#EEEEEE',
                    },
                  ]}
                />
                <View style={styles.allignInRow}>
                  <SecondaryButton
                    accessibilityLabel="cancelBtn"
                    loading={false}
                    title={'Cancel'}
                    disabled={false}
                    small={false}
                    onPress={() => {
                      console.log('I am close btn ');
                      setOtherInvitee(false);
                    }}
                    styleMainContainer={[
                      styles.cancelBtn,
                      {
                        backgroundColor: isDarkMode
                          ? AppTheme.COLORS.black
                          : AppTheme.COLORS.white,
                        borderColor: isDarkMode
                          ? AppTheme.COLORS.white
                          : AppTheme.COLORS.black,
                      },
                    ]}
                    styleBtnTxt={[
                      styles.canceText,
                      {
                        color: isDarkMode
                          ? AppTheme.COLORS.white
                          : AppTheme.COLORS.black,
                      },
                    ]}
                  />
                  <PrimaryButton
                    accessibilityLabel="SaveBtn"
                    loading={false}
                    title={'Save'}
                    disabled={
                      userName.value != '' &&
                      email.value != '' &&
                      userName.value != ' ' &&
                      email.value != ' ' &&
                      !email.error
                        ? false
                        : true
                    }
                    small={false}
                    onPress={() => {
                      handleSaveBtn();
                    }}
                    stylesContainer={[
                      styles.saveBtn,
                      {
                        backgroundColor: isDarkMode
                          ? AppTheme.COLORS.btnActiveDarkMode
                          : AppTheme.COLORS.black,
                        borderWidth: isDarkMode ? 1 : 0,
                        borderColor: isDarkMode ? AppTheme.COLORS.white : null,
                      },
                    ]}
                    btnText={styles.saveBtnText}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.proceedBtnContainer}>
          <Botton
            loading={GetMembersLoading ? true : false}
            accessibilityLabel="confirmBtn"
            title={
              selectedMembers.length === 0 && inviteeName.length === 0
                ? 'Skip'
                : 'Confirm'
            }
            disabled={false}
            small={false}
            onPress={() => {
              navigation.navigate(ScreensName.Meetingsummary, {
                repeatBooking: repeatBooking,
                currentMeetingRoom: currentMeetingRoom,
                currentMeetingName: currentMeetingName,
                isoStartTime: isoStartTime,
                isoEndTime: isoEndTime,
                recurringDaysData,
                dayPass: dayPass,
                selectedDate: selectedDate,
                allocation: allocation,
                idReschedule: idReschedule,
                isRescheduleRequest: isRescheduleRequest,
                participant: participant,
                Description: Description,
                start_end_time,
                duration,
              });
              // destructuring keys from state selected members
              const newSelectedMember = selectedMembers.map(
                ({VisitorEmail, VisitorFullName, TypeName}) => ({
                  VisitorFullName,
                  VisitorEmail,
                  TypeName,
                }),
              );
              dispatch(setTeamMembersMeetingRoom(newSelectedMember));

              // destructuring keys from state selectedInviteeData
              //    const newSelectedInviteeData=selectedInviteeData.map(({VisitorEmail,VisitorFullName,TypeName})=>
              //    ({VisitorFullName,VisitorEmail,TypeName}));
              // dispatch(setOtherInviteeMeetingRoom(newSelectedInviteeData));
              const newSelectedInviteeData = inviteeName.map(
                ({VisitorEmail, VisitorFullName, TypeName}) => ({
                  VisitorFullName,
                  VisitorEmail,
                  TypeName,
                }),
              );
              dispatch(setOtherInviteeMeetingRoom(newSelectedInviteeData));
            }}
          />
        </View>
      </ScrollView>
    </Frame>
  );
};

export default InvitationScreen;
