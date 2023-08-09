import { StatusBar, Text, View, ScrollView } from 'react-native';
import React, { useState, useCallback, useLayoutEffect, useRef, useMemo, useEffect } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { Provider } from 'react-native-paper';
import normalize from 'react-native-normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from 'react-native-wheel-pick';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Botton from '../../shared/components/core/Botton';
import { TeamMemberShimmer } from '../../shared/components/teamMemberShimmer/TeamMemberShimmer';
import { setStartDateSelectionHybrid, setEndDateSelectionHybrid, setNoOfMonths } from '../../shared/redux/slices/DateSlice';
import { GetTeam } from '../../shared/redux/action/GetTeam';

import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { setSelectedMembersHybrid } from '../../shared/redux/slices/memberSelectionSlice';
import { AppTheme } from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import styles from './HybridScreenTwo.style';
import { PrimaryButton, Touchable } from '../../shared/components';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import InputView from '../../shared/components/InputWrapper/InputWrapper';
import InputTeamMember from '../../shared/components/inputTeamMember/inputTeamMember';
import InfoModal from '../../shared/components/infoModal/InfoModal';
import StepComponent from '../../shared/components/stepComponent/StepComponent';


const HybridScreenTwo = ({ route }) => {

  const newDate = new Date();
  const loginData = useSelector((state) => state.auth?.data);
  const token = loginData?.access_token;
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const teamMembers = useSelector(state => state?.getTeam);
  const teamMembersPending = teamMembers?.loading;
  console.log('teamMembersPending----', teamMembersPending);
  const teammembersdata = teamMembers?.data;
  // const name = teammembersdata[0]?.AllTeamMembers
  console.log('All members 11---', teammembersdata);
  const allTeamMembers=teammembersdata?.find((item)=>{ return item;});
  console.log('allTeamMembers------',allTeamMembers);
  const payingMemberId=allTeamMembers?.Team?.PayingMemberId;
  console.log('All members paying member---', payingMemberId);

  // console.log("ALL MEMBERS", name)

  const dispatch = useDispatch();


  const { planId, startMonth, monthRange } = route.params;
  console.log('params---',startMonth,'--',monthRange);

  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const bottomSheetRefNOfMonths = useRef(null);


  const modifiedDate = moment(date).add(startMonth, 'month');
  const formattedDate = modifiedDate.format('MMM YYYY');
  
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [selectedmonth, setSelectedMonth] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const [totalDates, setTotalDates] = useState();
  const [totalMonths, setTotalMonths] = useState();
  const [expectedEndDate, setExpectedEndDate] = useState();

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


  const currentMonth = newDate.getMonth()+startMonth;
  const date = [
    { id: 1, value: `Jan ${newDate.getFullYear()}`, label: 'Jan 2023' },
    { id: 2, value: `Feb ${newDate.getFullYear()}`, label: 'Feb 2023' },
    { id: 3, value: `Mar ${newDate.getFullYear()}`, label: 'Mar 2023' },
    { id: 4, value: `Apr ${newDate.getFullYear()}`, label: 'Apr 2023' },
    { id: 5, value: `May ${newDate.getFullYear()}`, label: 'May 2023' },
    { id: 6, value: `Jun ${newDate.getFullYear()}`, label: 'Jun 2023' },
    { id: 7, value: `Jul ${newDate.getFullYear()}`, label: 'Jul 2023' },
    { id: 8, value: `Aug ${newDate.getFullYear()}`, label: 'Aug 2023' },
    { id: 9, value: `Sep ${newDate.getFullYear()}`, label: 'Sep 2023' },
    { id: 10, value: `Oct ${newDate.getFullYear()}`, label: 'Oct 2023' },
    { id: 11, value: `Nov ${newDate.getFullYear()}`, label: 'Nov 2023' },
    { id: 12, value: `Dec ${newDate.getFullYear()}`, label: 'Dec 2023' },
  ].filter(month => month.id >= currentMonth).slice(1);




  // modifing months on basis of range
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const noOfMonthsData = month.slice(monthRange[0]-1, monthRange[1]);
  console.log('monyh---',noOfMonthsData); // Output: [1, 2, 3, 4, 5]



  const onSelectionStartDate = () => {

    setSelectedDate(totalDates ? totalDates : formattedDate);
    dispatch(setStartDateSelectionHybrid(moment(totalDates, 'MMMM DD YYYY').format(`MMMM ${newDate.getDate()}, YYYY`)));

    bottomSheetRef.current?.close();
  };

  const onSelectionofNoOfMonths = () => {
    console.log('jdjdjdjjd----',totalDates);
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


    let SelectedHybridMembers = teamMembersData.find(item => (item.IsTeamAdministrator === true));
    console.log('ADMIN---', [...selectedMembers, { fullName: SelectedHybridMembers?.FullName, isAdministrator: SelectedHybridMembers?.IsTeamAdministrator, Id: SelectedHybridMembers?.Id, isPayingMember:isSelectPayingMember(SelectedHybridMembers?.Id) ? true : false }]);
    //   setSelectedMembers([...selectedMembers, { FullName: SelectedPOMembers?.FullName, IsTeamAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, IsPayingMember: SelectedPOMembers?.IsPayingMember }])
    setTeamLead({ fullName: SelectedHybridMembers?.FullName, isAdministrator: SelectedHybridMembers?.IsTeamAdministrator, Id: SelectedHybridMembers?.Id, isPayingMember:isSelectPayingMember(SelectedHybridMembers?.Id) ? true : false });


  };

  // toggling isSelected entity on click
  const isSelectedMember = (Id) => {

    console.log('Id---', Id);

    const isMember = selectedMembers?.find((item) => item?.Id === Id);
    if (isMember) {
      return true;
    } else {
      return false;
    }
  };
  //Selection of team Lead 
  const isTeamLead = () => {

    let SelectedHybridMembers = teamMembersData.find(item => (item.IsTeamAdministrator === true));
    console.log('ADMIN---', [...selectedMembers, { fullName: SelectedHybridMembers?.FullName, isAdministrator: SelectedHybridMembers?.IsTeamAdministrator, Id: SelectedHybridMembers?.Id, isPayingMember:isSelectPayingMember(SelectedHybridMembers?.Id) ? true : false }]);
    //   setSelectedMembers([...selectedMembers, { FullName: SelectedPOMembers?.FullName, IsTeamAdministrator: SelectedPOMembers?.IsTeamAdministrator, Id: SelectedPOMembers?.Id, IsPayingMember: SelectedPOMembers?.IsPayingMember }])
    setTeamLead({ fullName: SelectedHybridMembers?.FullName, isAdministrator: SelectedHybridMembers?.IsTeamAdministrator, Id: SelectedHybridMembers?.Id, isPayingMember:isSelectPayingMember(SelectedHybridMembers?.Id) ? true : false });


  };
    // toggling paying member
  const isSelectPayingMember = (Id) => {
    const isPayingMember =  Id === payingMemberId;
  
    if (isPayingMember) {
      return true;
    } else {
      return false;
    }
  };
  console.log('team lead----', teamLead);
  console.log('araaay----', selectedMembers);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.hybridScreen
    });
  }, []);

  useEffect(() => {

    dispatch(GetTeam(token)).unwrap().then((result) => {
      // check result 
      console.log('----res team members 667788a---', result[0]?.AllTeamMembers);

      const filteredData = result[0]?.AllTeamMembers.filter(item => item.CoworkerType === 'Individual');
      console.log('new filtered data -------', filteredData);

      const fromIndex = filteredData.findIndex(item => item?.IsTeamAdministrator === true);
      const toIndex = 0;
      // eslint-disable-next-line 
      let temp = [...filteredData];
      const element = temp?.splice(fromIndex, 1)[0];
      console.log('element----', element);
      temp?.splice(toIndex, 0, element);
      console.log('new sorted data -------', temp);

      // setTeamMembersData(result ? result[0]?.AllTeamMembers : [])
      setTeamMembersData(result ? temp : []);

    });

  }, [dispatch]);

  useEffect(() => {

    expectedDate();
  }, [planId === 'Monthly' ? selectedmonth : selectedDate , planId === 'Monthly' ? selectedDate : selectedDate]);

  useEffect(()=>{
    isTeamLead();
  },[teamMembersData]);
  
  const expectedDate = () => {

    if (planId === 'Monthly') {
      let expectedDate = moment(selectedDate, 'MMMM DD YYYY').add(selectedmonth, 'months').format('MMMM 1, YYYY');
      setExpectedEndDate(expectedDate);
      dispatch(setEndDateSelectionHybrid(moment(expectedDate, 'MMMM DD YYYY').format(`MMMM ${newDate.getDate()}, YYYY`)));
      console.log('EXPECTED DATES--', expectedEndDate);
    }
    else {
      let expectedDate = moment(selectedDate, 'MMMM DD YYYY').add(1, 'years').format('MMMM 1, YYYY');
      setExpectedEndDate(expectedDate);
      dispatch(setEndDateSelectionHybrid(moment(expectedDate, 'MMMM DD YYYY').format(`MMMM ${newDate.getDate()}, YYYY`)));
      console.log('EXPECTED DATES--', expectedEndDate);
    }
  };

  return (
    <Frame
      screenTitle={'Hybrid'}
      mode={'View'}>
      <View style={styles.headerContainer}>
        <StepComponent stepOne={'isCompleted'} stepTwo={'isActive'} stepThree={false} stepFour={false} hybrid={true} />
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
                  accessibilityLabel='month'
                  inputText={selectedmonth}
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

            {
              (planId === 'Yearly' ? selectedDate : selectedmonth) && (
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

                  return (<InputTeamMember
                    key={item?.Id}
                    IsAdmin={item?.IsTeamAdministrator}
                    IsPayingMember={isSelectPayingMember(item?.Id) ? true : false}
                    isSelected={isSelectedMember(item?.Id) ? true : false}
                    onPress={() => onSelectTeamMember(index, { fullName: item?.FullName, isAdministrator: item?.IsTeamAdministrator, Id: item?.Id, isPayingMember: isSelectPayingMember(item?.Id)  })}
                    teamMemberName={item?.FullName}
                    teamMembersPending={teamMembersPending}

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
                navigation.navigate(ScreensName.hybridScreenThree, {
                  planId: planId,
                  teamSize: (selectedMembers.concat(teamLead)).length,
                  expectedDate:expectedEndDate,
                  selectedDate:moment(selectedDate, 'MMMM DD YYYY').format('MMMM 1, YYYY')
                });
                dispatch(setSelectedMembersHybrid(selectedMembers.concat(teamLead)));
                // dispatch(setUnselectedMembersHybrid(unselectedTeamMemberData))

              }} />
          </View>
        </ScrollView>


      </Provider>

     
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
          <Txt  style={[styles.BottomSheetTitle,{color:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}]}>{Strings.StartDate}</Txt>



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
              console.log('date111-', value);

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
                // isTeamLead();
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
            itemStyle={{  color:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black }}
            selectedValue={noOfMonthsData[0]}
            pickerData={noOfMonthsData}
            onValueChange={value => {
              console.log('abc', value);

              setTotalMonths(value);

            }}
          />

          <View style={styles.bottomSheetBtnContainer}>
            <Botton
              loading={false}
              accessibilityLabel='confirmMonth'
              title={'Confirm'}
              disabled={false}
              small={false}
              onPress={() => onSelectionofNoOfMonths()}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>

    </Frame>

  );
};


export default HybridScreenTwo;