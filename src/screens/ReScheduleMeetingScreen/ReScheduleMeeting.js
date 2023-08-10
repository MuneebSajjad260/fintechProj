import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import {CancelMeetingRoom} from '../../shared/redux/action/CancelMeetingRoom';
import {PrimaryButton, SecondaryButton} from '../../shared/components';
import styles from './ReScheduleMeeting.style';
import Strings from '../../shared/constants/Strings';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import InvitesSummaryCard from '../../shared/components/InvitesSummaryCard/InvitesSummaryCard';
import ReScheduleMeetingCard from '../../shared/components/ReScheduleMeetingCard/ReScheduleMeetingCard';
import PaymentCard from '../../shared/components/PaymentCard/PaymentCard';
import Botton from '../../shared/components/core/Botton';
import {AppTheme} from '../../shared/theme';

const ReScheduleMeeting = ({route}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const CancelMeetingRoomLoading = useSelector(
    state => state?.cancelMeetingRoom?.loading,
  );
  const recurring = [
    {id: 0, recurringDay: 'Everyday', isSelected: false},
    {id: 1, recurringDay: 'Every Week', isSelected: false},
    {id: 2, recurringDay: 'Every 2 Weeks', isSelected: false},
    {id: 3, recurringDay: 'Every Month', isSelected: false},
  ];
  const [bottomSheet, setBottomSheet] = useState({
    bsReschedule: false,
    bsCancel: false,
    bsisCanceled: false,
  });
  console.log(
    'hshshs---',
    recurring[0],
    '-',
    recurring[1],
    '-',
    recurring[2],
    '-',
    recurring[3],
    '-',
  );
  const navigation = useNavigation();

  const {meetingScedule, startTime, endTime, date, durationTime} = route.params;
  console.log('date---', date, '--', startTime);

  console.log('meeting schedule---', meetingScedule);

  const teamMembers = meetingScedule?.BookingVisitors;
  // const otherInvitee = useSelector(selectOtherInviteeMeetingRoom);

  // for reshedule meeting bottom sheet
  const bottomSheetRefReschedule = useRef(null);
  const snapPointsReschedule = useMemo(() => ['23%'], []);

  const bottomSheetContentReschedule = (
    <View style={styles.bottomSheetContainer}>
      <Txt style={styles.bottomSheetHeading}>
        {Strings.wantRescheduleMeeting}
      </Txt>
      <View style={styles.bottomSheetBtnContainer}>
        {/* <View style={styles.noBtn}> */}
        <Botton
          continueBtnAccessibilityLabel="rescheduleYes"
          cancelBtnAccessibilityLabel="rescheduleNo"
          variant={'v2'}
          loading={false}
          continueTitle={'Yes'}
          cancelTitle={'No'}
          disabled={false}
          button1Style={styles.btn1}
          onCancel={() => {
            console.log('i AM No BTN');
            bottomSheetRefReschedule.current?.closeBottomSheet();
          }}
          onContinue={() => {
            const meetingSceduleNew = {
              ...meetingScedule,
              Title: meetingScedule?.ResourceName,
              Id: meetingScedule?.ResourceId,
              ResourceName: undefined,
              ResourceId: undefined,
            };
            navigation.navigate(ScreensName.bookMeetingRoom, {
              meetingRoomOne: meetingSceduleNew,
              dateReschedule: date,
              idReschedule: meetingScedule.id,
              isRescheduleRequest: true,
              rescheduleStartTime: moment(startTime, 'h:mm A').format(
                'hh:mm A',
              ),
              rescheduleEndTime: moment(endTime, 'h:mm A').format('hh:mm A'),
              rescheduleDuration: convertDurationToHours(durationTime),
              rescheduleTeamMembers: teamMembers,
              rescheduleRepeatBooking: meetingScedule?.Repeats ? 'Yes' : 'No',
              participant: false,
              rescheduleRecurringDay:
                meetingScedule?.Repeats === '1'
                  ? recurring[0]
                  : meetingScedule?.Repeats === '3'
                  ? recurring[3]
                  : meetingScedule?.Repeats === '2' &&
                    meetingScedule?.RepeatEvery === 1
                  ? recurring[1]
                  : meetingScedule?.Repeats === '2' &&
                    meetingScedule?.RepeatEvery === 2
                  ? recurring[2]
                  : null,
            });
          }}
        />
      </View>
    </View>
  );
  ///////////////

  //////////For Cancel meeting room/////////

  const bottomSheetRefCancel = useRef(null);
  const snapPointsCancel = useMemo(() => ['22%'], []);

  const bottomSheetContentCancel = (
    <View style={styles.bottomSheetContainer}>
      <Txt style={styles.bottomSheetHeading}>{Strings.wantCancelMeeting}</Txt>
      <View style={styles.bottomSheetBtnContainer}>
        {/* <View style={styles.noBtn}> */}
        <Botton
          continueBtnAccessibilityLabel="cancelYes"
          cancelBtnAccessibilityLabel="cancelNo"
          variant={'v2'}
          loading={CancelMeetingRoomLoading ? true : false}
          continueTitle={'Yes'}
          cancelTitle={'No'}
          disabled={false}
          button1Style={styles.btn1}
          onCancel={() => {
            console.log('i AM No BTN');
            bottomSheetRefCancel.current?.closeBottomSheet();
          }}
          onContinue={() => {
            console.log('cancel meeting');
            onSubmitCancel();
          }}
        />
      </View>
    </View>
  );

  ////////////////////

  /////WHEN meeting gets cancelled
  const bottomSheetRefCanceledMeeting = useRef(null);
  const snapPointsCanceledMeeting = useMemo(() => ['26%'], []);
  const bottomSheetMeetingCanceled = (
    <View style={styles.bottomSheetContainer}>
      <Txt style={styles.bottomSheetHeading}>{Strings.meetingCancelled}</Txt>
      <Txt style={styles.bottomSheetSubHeading}>
        {Strings.meetingHasCancelled}
      </Txt>

      <View style={styles.backToHomeScreen}>
        <Botton
          accessibilityLabel="homeScreen"
          // variant={'v1'}
          loading={false}
          title={'Back to home screen'}
          disabled={false}
          onPress={() => {
            console.log("Let's go to home screen");
            // navigation.navigate(ScreensName.MeetingHomeScreen);
          }}
        />
      </View>
    </View>
  );

  ////////////////////////////

  // eslint-disable-next-line no-unused-vars
  const [meetingRoomCard, setMeetingRoomCard] = useState([
    {
      id: meetingScedule.ResourceId,
      officeNo: meetingScedule.ResourceName,
      noOfPersons: meetingScedule?.Allocation,
      desc: meetingScedule.desc,
      today: date,
      hours: `${startTime} - ${endTime}`,
      duration: 'Duration',
      durationTime: durationTime,
      bookedOn: 'Booked on',
      date: moment(meetingScedule?.BookedOn).format('Do MMMM, YYYY'),
      bookedBy: 'Booked by',
      teamLead: meetingScedule?.CoworkerName,
      status: meetingScedule?.status,
      Description: meetingScedule?.Description,
    },
  ]);
  console.log('dayte---', meetingScedule?.status);

  const inviteesCard = {
    id: 1,
    invitees: 'Participants',
    teamMembers: teamMembers,
    // otherInvitee: otherInvitee
  };

  //getting duration
  const convertDurationToHours = durationString => {
    const durationParts = durationString.split(' ');

    let hours = 0;
    let minutes = 0;

    for (const part of durationParts) {
      if (part.includes('h')) {
        hours = parseFloat(part.replace('h', ''));
      } else if (part.includes('m')) {
        minutes = parseFloat(part.replace('m', ''));
      }
    }

    if (hours === 0) {
      return minutes;
    }

    const totalHours = hours + minutes / 60;

    return totalHours;
  };

  //CANCEL MEETING ROOM
  const onSubmitCancel = () => {
    console.log('meetingScedule?.id--', meetingScedule?.id);
    dispatch(CancelMeetingRoom(meetingScedule?.id))
      .unwrap()
      .then(result => {
        console.log('result of cancel meeting room---', result);
        if (result?.statusCode == 200) {
          setBottomSheet({
            bsReschedule: false,
            bsCancel: false,
            bsisCanceled: true,
          });
          // bottomSheetRefCanceledMeeting.current?.expandBottomSheet();
          bottomSheetRefCancel.current?.closeBottomSheet();
          navigation.navigate(ScreensName.MeetingHomeScreen);
        } else {
        }
      })
      .catch(error => {
        console.log('error cancel meeting room ---', error);
      });
  };

  useEffect(() => {
    if (bottomSheet.bsReschedule) {
      console.log('bsReshedule is true');
      bottomSheetRefReschedule.current?.expandBottomSheet();
    } else if (bottomSheet.bsCancel) {
      console.log('bsCancel is true');
      bottomSheetRefCancel.current?.expandBottomSheet();
    } else if (bottomSheet.bsisCanceled) {
      console.log('bsisCanceled is true');
      bottomSheetRefCanceledMeeting.current?.expandBottomSheet();
    }
  }, [bottomSheet]); // dependency array
  return (
    <Frame
      // headerVariant='v1'
      showBottomSheet={true}
      snapPoints={
        bottomSheet.bsReschedule === true
          ? snapPointsReschedule
          : bottomSheet.bsCancel
          ? snapPointsCancel
          : snapPointsCanceledMeeting
      }
      bottomSheetContent={
        bottomSheet.bsReschedule === true
          ? bottomSheetContentReschedule
          : bottomSheet.bsCancel
          ? bottomSheetContentCancel
          : bottomSheetMeetingCanceled
      }
      ref={
        bottomSheet.bsReschedule === true
          ? bottomSheetRefReschedule
          : bottomSheet.bsCancel
          ? bottomSheetRefCancel
          : bottomSheetRefCanceledMeeting
      }>
      {console.log('bs---', bottomSheet)}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {/* <View style={styles.mainContainer} > */}
        <View>
          {meetingRoomCard.map(item => (
            // eslint-disable-next-line react/jsx-key
            <ReScheduleMeetingCard item={item} />
          ))}

          <InvitesSummaryCard
            disable={
              meetingScedule?.status != 'cancelled' &&
              meetingScedule?.status != 'deny' &&
              meetingScedule?.isCancellable
                ? false
                : true
            }
            item={inviteesCard}
            data={{
              isoStartTime: meetingScedule?.FromTime,
              isoEndTime: meetingScedule?.ToTime,
              currentMeetingRoom: meetingScedule?.ResourceId,
              idReschedule: meetingScedule.id,
              isRescheduleRequest: true,
              currentMeetingName: meetingScedule?.ResourceName,
              allocation: meetingScedule?.Allocation,
              selectedDate: moment.utc(meetingScedule?.FromTime).format('LL'),
              rescheduleTeamMembers: teamMembers,
              FromTime: startTime,
              ToTime: endTime,
              repeatBooking: meetingScedule?.isRepeatBooking,
              recurringDaysData:
                meetingScedule?.Repeats === '1'
                  ? recurring[0]
                  : meetingScedule?.Repeats === '3'
                  ? recurring[3]
                  : meetingScedule?.Repeats === '2' &&
                    meetingScedule?.RepeatEvery === 1
                  ? recurring[1]
                  : meetingScedule?.Repeats === '2' &&
                    meetingScedule?.RepeatEvery === 2
                  ? recurring[2]
                  : null,
            }}
          />
          {/* <View style={styles.paymentCard}>
              <PaymentCard/>
            </View> */}
        </View>
        {meetingScedule?.status != 'cancelled' &&
        meetingScedule?.status != 'deny' &&
        meetingScedule?.isCancellable ? (
          <Botton
            continueBtnAccessibilityLabel="reschedule"
            cancelBtnAccessibilityLabel="cancel"
            loading={false}
            variant="v1"
            continueTitle="Reschedule"
            disabled={false}
            onContinue={() => {
              console.log("let's ReSchedule meeting");
              setBottomSheet({
                bsReschedule: true,
                bsCancel: false,
                bsisCanceled: false,
              });
              bottomSheetRefReschedule.current?.expandBottomSheet();
            }}
            onCancel={() => {
              console.log('im cancel btn');
              setBottomSheet({
                bsReschedule: false,
                bsCancel: true,
                bsisCanceled: false,
              });
              bottomSheetRefCancel.current?.expandBottomSheet();
            }}
          />
        ) : null}

        {/* </View> */}
      </ScrollView>
    </Frame>
  );
};

export default ReScheduleMeeting;
