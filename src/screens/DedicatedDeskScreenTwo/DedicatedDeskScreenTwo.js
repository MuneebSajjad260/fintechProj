/* eslint-disable no-unused-vars */
import { StatusBar, Text, View, ScrollView,SafeAreaView, Platform} from 'react-native';
import React, { useState, useCallback, useLayoutEffect, useRef, useMemo, useEffect } from 'react';
import BottomSheet, { BottomSheetBackdrop, useBottomSheetDynamicSnapPoints, BottomSheetView } from '@gorhom/bottom-sheet';
import { Provider } from 'react-native-paper';
import normalize from 'react-native-normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from 'react-native-wheel-pick';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import Frame from '../../shared/components/core/Frame';
import { TeamMemberShimmer } from '../../shared/components/teamMemberShimmer/TeamMemberShimmer';
import { setStartDateSelectionDD, setEndDateSelectionDD, setNoOfMonths } from '../../shared/redux/slices/DateSlice';
import { GetTeam } from '../../shared/redux/action/GetTeam';
import { setSelectedDedicatedDeskMembers } from '../../shared/redux/slices/memberSelectionSlice';
import { AppTheme } from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import styles from './DedicatedDeskScreenTwo.style';
import { PrimaryButton, Touchable } from '../../shared/components';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import InputView from '../../shared/components/InputWrapper/InputWrapper';
import InputTeamMember from '../../shared/components/inputTeamMember/inputTeamMember';
import InfoModal from '../../shared/components/infoModal/InfoModal';
import StepComponent from '../../shared/components/stepComponent/StepComponent';
import Txt from '../../shared/components/core/Txt';
import Botton from '../../shared/components/core/Botton';


const DedicatedDeskScreenTwo = ({ route }) => {
  const newDate = new Date();

  const loginData = useSelector((state) => state.auth?.data);
  const token = loginData?.access_token;
  console.log('token---------',token);
  const teamMembers = useSelector(state => state?.getTeam);
  const teamMembersPending = teamMembers?.loading;
  const teammembersdata = teamMembers?.data;
  // const name = teammembersdata[0]?.AllTeamMembers
  console.log('All members 11---', teammembersdata);
  const allTeamMembers=teammembersdata?.find((item)=>{ return item;});
  const payingMemberId=allTeamMembers?.Team?.PayingMemberId;
  console.log('All members paying member---', payingMemberId);
  const isDarkMode = useSelector(state => state.mode.colorScheme);


  const dispatch = useDispatch();
  const { planId , startMonth, monthRange } = route.params;
  console.log('params---',startMonth,'--',monthRange);
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const bottomSheetRefNOfMonths = useRef(null);
  const modifiedDate = moment(date).add(startMonth, 'month');
  const formattedDate = modifiedDate.format('MMM YYYY');

  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [selectedmonth, setSelectedMonth] = useState();
  const [expectedEndDate, setExpectedEndDate] = useState();
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const [totalDates, setTotalDates] = useState();
  const [totalMonths, setTotalMonths] = useState();

  const [teamMembersData, setTeamMembersData] = useState(() => {
    return teammembersdata?.AllTeamMembers ? teammembersdata?.AllTeamMembers : [];

  });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamLead, setTeamLead] = useState([]);
  const snapPoints = useMemo(() => ['45%'], []);

  const renderBackdropBottomSheet = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        BackdropPressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);


  // const currentMonth = newDate.getMonth()+startMonth;
  // const date = [
  //   { id: 1, value: `Jan ${newDate.getFullYear()}`, label: 'Jan 2023' },
  //   { id: 2, value: `Feb ${newDate.getFullYear()}`, label: 'Feb 2023' },
  //   { id: 3, value: `Mar ${newDate.getFullYear()}`, label: 'Mar 2023' },
  //   { id: 4, value: `Apr ${newDate.getFullYear()}`, label: 'Apr 2023' },
  //   { id: 5, value: `May ${newDate.getFullYear()}`, label: 'May 2023' },
  //   { id: 6, value: `Jun ${newDate.getFullYear()}`, label: 'Jun 2023' },
  //   { id: 7, value: `Jul ${newDate.getFullYear()}`, label: 'Jul 2023' },
  //   { id: 8, value: `Aug ${newDate.getFullYear()}`, label: 'Aug 2023' },
  //   { id: 9, value: `Sep ${newDate.getFullYear()}`, label: 'Sep 2023' },
  //   { id: 10, value: `Oct ${newDate.getFullYear()}`, label: 'Oct 2023' },
  //   { id: 11, value: `Nov ${newDate.getFullYear()}`, label: 'Nov 2023' },
  //   { id: 12, value: `Dec ${newDate.getFullYear()}`, label: 'Dec 2023' },
  // ]
  // .filter(month => month.id >= currentMonth).slice(1);

  // console.log("date---",date,'---',currentMonth)


  const currentMonth = newDate.getMonth() + (startMonth+1);
  const currentYear = new Date().getFullYear();
  const numberOfYearsToAdd = 2;
  const numberOfMonthsToAdd = numberOfYearsToAdd * 12;
  
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const date = Array.from({ length: numberOfMonthsToAdd }, (_, index) => {
    const monthIndex = (currentMonth - 1 + index) % 12; // Loop through months
    const year = currentYear + Math.floor((currentMonth - 1 + index) / 12); // Increment year if necessary
    const monthName = monthNames[monthIndex];
    return {
      id: index + 1,
      value: `${monthName} ${year}`,
      label: `${monthName} ${year}`,
    };
  });
  
  console.log("date1----",date,"--",currentMonth);
  
 
  // modifing months on basis of range
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const noOfMonthsData = month.slice(monthRange[0]-1, monthRange[1]);
  console.log('monyh---',noOfMonthsData); // Output: [1, 2, 3, 4, 5]

  const onSelectionStartDate = () => {
    // setStartDate(date[indexForDate * 10])
    setSelectedDate(totalDates ? totalDates : formattedDate);
    dispatch(setStartDateSelectionDD(moment(totalDates, 'MMMM DD YYYY').format(`MMMM ${newDate.getDate()}, YYYY`)));
    bottomSheetRef.current?.close();
  };

  const onSelectionofNoOfMonths = () => {
    // setNoOfMonths(indexForDate * 10)
    setSelectedMonth(totalMonths ? totalMonths : noOfMonthsData[0]);
    dispatch(setNoOfMonths(totalMonths ? totalMonths : noOfMonthsData[0]));
    bottomSheetRefNOfMonths.current?.close();
  };

  // Selection of team member when click on member
  const onSelectTeamMember = (index, item) => {

    console.log('-33', selectedMembers);

    const i = selectedMembers?.findIndex(index =>

      index.Id === item.Id
    );
    console.log('-44', i);
    if (i !== -1) {

      let temp = [...selectedMembers];
      temp.splice(i, 1);
      console.log('removing members', temp);

      setSelectedMembers(temp);

    }
    else {
      setSelectedMembers([...selectedMembers, item]);
      console.log('Addind members', selectedMembers);
    }


    let SelectedPOMembers = teamMembersData.find(item => (item.IsTeamAdministrator === true));
    console.log('ADMIN---', [...selectedMembers, { fullName: SelectedPOMembers?.FullName, isAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, isPayingMember: isSelectPayingMember(SelectedPOMembers?.Id) ? true : false  }]);
    //   setSelectedMembers([...selectedMembers, { FullName: SelectedPOMembers?.FullName, IsTeamAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, IsPayingMember: SelectedPOMembers?.IsPayingMember }])
    setTeamLead({ fullName: SelectedPOMembers?.FullName, isAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, isPayingMember:isSelectPayingMember(SelectedPOMembers?.Id) ? true : false  });


  };

  // toggling isSelected entity on click

  const isSelectedMember = (Id) => {
    const isMember = selectedMembers?.find((item) => item?.Id === Id);
    if (isMember) {
      return true;
    } else {
      return false;
    }
  };
  
  // toggling paying member
  const isSelectPayingMember = (Id) => {
    const isPayingMember =  Id === payingMemberId;

    if (isPayingMember) {
      console.log('90900----00----',true);
      return true;
    } else {
      console.log('90900---11-----',false);
      return false;
    }
  };


  //Selection of team Lead 

  const isTeamLead = () => {

    let SelectedPOMembers = teamMembersData?.find(item => (item?.IsTeamAdministrator === true));
    console.log('ADMIN---', [...selectedMembers, { FullName: SelectedPOMembers?.FullName, IsTeamAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, isPayingMember: isSelectPayingMember(SelectedPOMembers?.Id) ? true : false}]);
    //   setSelectedMembers([...selectedMembers, { FullName: SelectedPOMembers?.FullName, IsTeamAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, IsPayingMember: SelectedPOMembers?.IsPayingMember }])
    setTeamLead({ fullName: SelectedPOMembers?.FullName, isAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, isPayingMember: isSelectPayingMember(SelectedPOMembers?.Id) ? true : false });

  };
  console.log('team lead----', teamLead);
  console.log('araaay----', selectedMembers);



  useEffect(() => {
    // console.log("testing", teamMembersData)
    expectedDate();
  }, [planId === 'Monthly' ? selectedmonth : selectedDate , planId === 'Monthly' ? selectedDate : selectedDate]);


  useEffect(() => {
    // dispatch(GetTeam(token))

    dispatch(GetTeam(token)).unwrap().then((result) => {
      // check result 

      console.log('----res plan result 667788a---', result[0]?.AllTeamMembers);

      const filteredData = result[0]?.AllTeamMembers.filter(item => item.CoworkerType === 'Individual');
      console.log('new filtered data -------', filteredData);
      const fromIndex = filteredData.findIndex(item => item?.IsTeamAdministrator === true);
      const toIndex = 0;
      
      // eslint-disable-next-line 
      // let temp =  [...result[0]?.AllTeamMembers ];
      let temp =  [...filteredData ];
      const element = temp?.splice(fromIndex, 1)[0];
      temp?.splice(toIndex, 0, element);
      console.log('new sorted data -------', temp);


      // setTeamMembersData(result ? result[0]?.AllTeamMembers : [])
      setTeamMembersData(result ? temp : []);

    });

  }, [dispatch]);

  useEffect(()=>{
    isTeamLead();
  },[teamMembersData]);

  const expectedDate = () => {

    if (planId === 'Monthly') {
      let expectedDate = moment(selectedDate, 'MMMM DD YYYY').add(selectedmonth, 'months').format('MMMM 1, YYYY');
      setExpectedEndDate(expectedDate);
      dispatch(setEndDateSelectionDD(moment(expectedDate, 'MMMM DD YYYY').format(`MMMM ${newDate.getDate()}, YYYY`)));
      console.log('EXPECTED DATES--', expectedEndDate);
    }
    else {
      let expectedDate = moment(selectedDate, 'MMMM DD YYYY').add(1, 'years').format('MMMM 1, YYYY');
      console.log('-2222----', moment(selectedDate, 'MMMM  DD YYYY').format(`MMMM ${newDate.getDate()}, YYYY`));
      setExpectedEndDate(expectedDate);
      dispatch(setEndDateSelectionDD(moment(expectedDate, 'MMMM DD YYYY').format(`MMMM ${newDate.getDate()}, YYYY`)));
      console.log('EXPECTED DATES--', expectedEndDate);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.dedicatedDeskScreenOne
    });
  }, []);
  return (
    <Frame
      screenTitle={'Dedicated Desks'}
      mode={'View'}>

      <View style={styles.headerContainer}>
        <StepComponent stepOne={'isCompleted'} stepTwo={'isActive'} stepThree={false} dedicatedDesk={true} />
      </View>
      <Provider>
        {/* INFO MODEL COMP WHEN CLICK ON i ICON */}
        <InfoModal
          infoModalVisible={infoModalVisible}
          onDismiss={() => {
            setInfoModalVisible(!infoModalVisible);
          }}
          title={Strings.InfoModalTitle}
          description={Strings.InfoModalDescription}
        />


        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}

        >

          <View style={styles.innerContainer}>
            <Txt style={styles.title}>{Strings.SelectDurationTeam}</Txt>
            <View style={[styles.inputContainer, { marginTop: normalize(10) }]}>
              <InputView
                label={Strings.StartDate}
                // inputText={startDate?.title}
                inputText={selectedDate}
                accessibilityLabel='date'
                placeHolder={Strings.selectMonth}
                placeholdertext={selectedDate ? null : styles.placeholdertext}
                onPress={() => {
                  bottomSheetRef.current?.snapToIndex(0);
                }}
                styleInputContainer={styles.inputViewContainer}

              />

            </View>
            {planId == 'Monthly' ?
              <View style={styles.inputContainer}>
                <InputView
                  label={Strings.NoOfMonths}
                  noOfMonths={true}
                  inputText={selectedmonth}
                  accessibilityLabel='month'
                  placeHolder={Strings.selectNoOfMonths}
                  onPress={() => {
                    bottomSheetRefNOfMonths.current?.snapToIndex(0);

                  }}
                  placeholdertext={selectedmonth ? null : styles.placeholdertext}
                  styleInputContainer={styles.inputViewContainer}
                />
              </View>
              : null
            }
            {planId === 'Monthly' ?

              selectedmonth && (
                <>
                  <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                    <Txt style={styles.expectedDateTxt}>{Strings.ExpectedEndDate}</Txt>
                    <Touchable onPress={() => setInfoModalVisible(!infoModalVisible)}>
                      <AntDesign
                        name="infocirlce"

                        size={20}
                        color={AppTheme.COLORS.purple}
                      />
                    </Touchable>
                  </View>
                  <Txt style={styles.expectedEndDate}>{expectedEndDate}</Txt>

                </>
              )

              :
              selectedDate && (
                <>
                  <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                    <Txt style={styles.expectedDateTxt}>{Strings.ExpectedEndDate}</Txt>
                    <Touchable onPress={() => setInfoModalVisible(!infoModalVisible)}>
                      <AntDesign
                        name="infocirlce"

                        size={20}
                        color={AppTheme.COLORS.purple}
                      />
                    </Touchable>
                  </View>
                  <Txt style={styles.expectedEndDate}>{expectedEndDate}</Txt>

                </>
              )
            }

            <View style={[styles.inputContainer, {}]}>

              <Txt style={styles.teamMemberTxt}>{Strings.TeamMembers}</Txt>
              <TeamMemberShimmer
                teamMembersPending={teamMembersPending}
                planId={planId}
              />
              {/* TEAM MEMBER LIST */}
              {
                teamMembersData?.map((item, index) => {

                  // eslint-disable-next-line react/jsx-key
                  return (<InputTeamMember
                    IsAdmin={item?.IsTeamAdministrator}
                    IsPayingMember={isSelectPayingMember(item?.Id)}

                    isSelected={isSelectedMember(item?.Id) ? true : false}

                    onPress={() => onSelectTeamMember(index, { fullName: item?.FullName, isAdministrator: item?.IsTeamAdministrator, Id: item?.Id, isPayingMember: isSelectPayingMember(item?.Id)})}
                    teamMemberName={item?.FullName}

                  />);

                })
              }


            </View>
          </View>
          <View style={styles.btnContainer}>
            <Botton
            
              title="Confirm"
              accessibilityLabel='confirmBtn'
              disabled={planId == 'Monthly' ? (selectedDate && selectedmonth ? false : true) : selectedDate ? false : true}
              onPress={() => {
                console.log('0909---',moment(selectedDate, 'MMMM DD YYYY').format(`MMMM ${newDate.getDate()}, YYYY`));
                // isTeamLead()
                navigation.navigate(ScreensName.dedicatedDeskSummaryScreen, {
                  planId: planId,
                  expectedDate:expectedEndDate,
                  selectedDate:moment(selectedDate, 'MMMM DD YYYY').format('MMMM 1, YYYY')
                  
                });
                dispatch(setSelectedDedicatedDeskMembers(selectedMembers.concat(teamLead)));
              }

              }
            
            />
            
          </View>
        </ScrollView>


      </Provider>

      {/* //! trying to generic this */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdropBottomSheet}
        index={-1}
        enablePanDownToClose={true}
        enabledInnerScrolling={true}
        backgroundStyle={{
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : AppTheme.COLORS.white,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#D9D9D966',
        }}
      >
        <BottomSheetView
          style={{ flex: 1 }}>
          <Txt style={[styles.BottomSheetTitle,{color:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}]}>{Strings.StartDate}</Txt>
          <Picker
            textSize={20}
            isShowSelectBackground={false}
            textColor={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black }
            selectLineColor={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black }
            selectLineSize={2}
            style={[styles.picker,{  backgroundColor: isDarkMode
              ? AppTheme.COLORS.wrapperDarkModeBg
              : AppTheme.COLORS.white,}]}
            itemStyle={{  color:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black }}
            selectedValue={formattedDate}
            pickerData={date}
            onValueChange={value => {
              console.log('date', value);
              setTotalDates(value);
            }}
          />
          <View style={styles.bottomSheetBtnContainer}>
            <Botton
              loading={false}
              title={'Confirm'}
              accessibilityLabel='confirmDate'
              disabled={false}
              small={false}
              onPress={() => {
                onSelectionStartDate();
            
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        ref={bottomSheetRefNOfMonths}
        snapPoints={snapPoints}
        backdropComponent={renderBackdropBottomSheet}
        index={-1}
        enablePanDownToClose={true}
        enabledInnerScrolling={true}
        backgroundStyle={{
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : AppTheme.COLORS.white,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#D9D9D966',
        }}
      >
        <BottomSheetView
          style={{ flex: 1 }}>
          <Txt style={[styles.title, styles.BottomSheetTitle,{color:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}]}>{Strings.NoOfMonths}</Txt>
          <Picker
            textSize={20}
            // isShowSelectLine={false}
            isShowSelectBackground={false}
            textColor={  isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black }
            selectLineColor={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black }
            selectLineSize={2}
            style={[styles.picker,{  backgroundColor: isDarkMode
              ? AppTheme.COLORS.wrapperDarkModeBg
              : AppTheme.COLORS.white,}]}
            selectedValue={noOfMonthsData[0]}
            pickerData={noOfMonthsData}
            itemStyle={{  color:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black }}
            onValueChange={value => {
              console.log('abc', value);
              setTotalMonths(value);
            }}
          />
          <View style={styles.bottomSheetBtnContainer}>
            <Botton
              loading={false}
              title={'Confirm'}
              accessibilityLabel='confirmMonth'
              disabled={false}
              onPress={() => onSelectionofNoOfMonths()}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>

    </Frame>

  );
};

export default DedicatedDeskScreenTwo;