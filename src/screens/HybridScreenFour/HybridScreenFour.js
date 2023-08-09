import { StatusBar, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import InputTeamMember from '../../shared/components/inputTeamMember/inputTeamMember';
import { selectSelectedMembersHybrid } from '../../shared/redux/slices/memberSelectionSlice';
import { setSelectedPrivateOfficeMembersHybrid, setSelectedDedicatedDeskMembersHybrid } from '../../shared/redux/slices/memberSelectionSlice';
import { AppTheme } from '../../shared/theme';
import PrivateOfficeCard from '../../shared/components/privateOfficeCard/PrivateOfficeCard';
import styles from './HybridScreenFour.style';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { AppText, PrimaryButton } from '../../shared/components';
import StepComponent from '../../shared/components/stepComponent/StepComponent';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import Strings from '../../shared/constants/Strings';
import Botton from '../../shared/components/core/Botton';

const HybridScreenFour = ({ navigation, route }) => {
 
  const dispatch = useDispatch();
  const selectedMembersHybrid = useSelector(selectSelectedMembersHybrid);

  const [selectedMembers, setSelectedMembers] = useState(() => {
    return selectedMembersHybrid;

  });

  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const [selectedMembersAgain, setSelectedMembersAgain] = useState([]);
  const [teamLead, setTeamLead] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [selectedPrivateOfficeMembers, setSelectedPrivateOfficeMembers] = useState([]);
  const [selectedDedicatedDeskMembers, setSelectedDedicatedDeskMembers] = useState([]);
  // const unselectedMembers = useSelector(selectUnselectedMembersHybrid)


  const { privateOffice } = route.params;

  const { Allocation,expectedDate, selectedDate  } = route.params;
  const { planId } = route.params;
  const { privateOfficeId, resId } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.hybridScreen
    });
  }, []);
  useEffect(() => {
    if (selectedMembersAgain.length == 0) {
      setSelectedDedicatedDeskMembers(selectedMembersHybrid);
    }
  }, []);


  // both functions below are selecting and unselecting the team member
  const onSelectTeamMember = (index, item) => {
    //this clause is checking that we can only select limited no of members for private office
    if (selectedMembersAgain.length < Allocation) {
      const i = selectedMembersAgain?.findIndex(index =>

        index.Id === item.Id
      );

      if (i !== -1) {

        let temp = [...selectedMembersAgain];
        temp.splice(i, 1);
        console.log('removing members', temp);
        setSelectedMembersAgain(temp);

      }
      else {
        setSelectedMembersAgain([...selectedMembersAgain, item]);
        console.log('Addind members', selectedMembersAgain);
      }
    }
    else {
      selectedMembersAgain.map((i) => {

        if (i.Id === item.Id) {

          const i = selectedMembersAgain?.findIndex(index =>

            index.Id === item.Id
          );

          if (i !== -1) {

            let temp = [...selectedMembersAgain];
            temp.splice(i, 1);
            console.log('removing members', temp);
            setSelectedMembersAgain(temp);

          }
          else {
            setSelectedMembersAgain([...selectedMembersAgain, item]);
            console.log('Addind members', selectedMembersAgain);
          }
        }

      });
    }
    let SelectedHybridMembers = selectedMembers.find(item => (item.isAdministrator === true));
    setTeamLead({ fullName: SelectedHybridMembers?.fullName, isAdministrator: SelectedHybridMembers?.isAdministrator, Id: SelectedHybridMembers?.Id, isPayingMember: SelectedHybridMembers?.isPayingMember });

  };

  const isSelectedMember = (Id) => {

    const isMember = selectedMembersAgain?.find((item) => item?.Id === Id);
    if (isMember) {
      return true;
    } else {
      return false;
    }
  };

  // here i am getting team administrator and setting it into state teamLead
  const isTeamLead = () => {

    let SelectedHybridMembers = selectedMembers.find(item => (item.isAdministrator === true));
    setTeamLead({ fullName: SelectedHybridMembers?.fullName, isAdministrator: SelectedHybridMembers?.isAdministrator, Id: SelectedHybridMembers?.Id, isPayingMember: SelectedHybridMembers?.isPayingMember });

  };

  console.log('array 1----', selectedMembers);
  console.log('araaay----', selectedMembersAgain);

  // here i am sorting selectedMembers array by putting an object with key isAdministrator= true at index 0
  useEffect(() => {

    const fromIndex = selectedMembers.findIndex(item => item?.isAdministrator === true);
    const toIndex = 0;
    let temp = [...selectedMembers];
    const element = temp?.splice(fromIndex, 1)[0];
    temp?.splice(toIndex, 0, element);

    setSelectedMembers(temp);
    isTeamLead();


  }, []);

  //HERE i am comparing selectedMembers array and selectedMembersAgain array and then pushing members in selectDDMembers
  //array which are not present in selectedMembersAgain but present in selectedMembers
  useEffect(() => {
    const selectDDMembers = selectedMembers.filter((obj1) => {
      const selectedObj = selectedMembers.find(obj => obj.isAdministrator);
      return !selectedObj || (obj1.Id !== selectedObj.Id && !selectedMembersAgain.some((obj2) => {
        return obj1.Id === obj2.Id;
      }));

    });
    console.log('unselected array====', selectDDMembers);
    setSelectedDedicatedDeskMembers(selectDDMembers);
  }, [selectedMembersAgain]);
  return (

    <Frame
      screenTitle={'Hybrid'}
      mode={'view'}>
      <View style={styles.headerContainer}>
        <StepComponent
          stepOne={'isCompleted'}
          stepTwo={'isCompleted'}
          stepThree={'isCompleted'}
          stepFour={'isActive'}
          hybrid={true} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Txt style={styles.selectedOffice}>{Strings.selectedOffice}</Txt>

          <View style={styles.officeCard}>

            <PrivateOfficeCard item={privateOffice} disabled={true} btnLabel={'Monthly Plan'} />

          </View>

          <View style={styles.subContainer}>
            <View style={styles.allignInRow}>
              <Txt style={styles.selectMember}>{Strings.selectMember}</Txt>
              <View style={styles.maxUsersContainer}>
                <Txt style={styles.max5}>{`Max${Allocation}`}</Txt>
                <Feather
                  name="users"
                  size={13}
                  solid
                  color={isDarkMode  ? AppTheme.COLORS.lightGrey : AppTheme.COLORS.purple }
                />
              </View>
            </View>

            <Txt style={styles.remainingMembers}>{Strings.remainingMembers}</Txt>
            {/* LIST OF SELECTED MEMBERS */}
            {
              selectedMembers?.map((item, index) => {

                return (<InputTeamMember
                  key={item?.Id}
                  IsAdmin={item?.isAdministrator}
                  IsPayingMember={item?.isPayingMember}
                  isSelected={isSelectedMember(item?.Id) ? true : false}
                  onPress={() => onSelectTeamMember(index, { fullName: item?.fullName, isAdministrator: item?.isAdministrator, Id: item?.Id, isPayingMember: item?.isPayingMember })}
                  teamMemberName={item?.fullName}

                />);

              })
            }


          </View>
        </View>
        <View style={styles.innerContainer}>
          <Botton
            title="Confirm"
            accessibilityLabel='confirmBtn'
            disabled={false}
            onPress={() => {
              navigation.navigate(ScreensName.hybridSummaryScreen, {
                privateOfficeId: privateOfficeId,
                resId,
                planId: planId,
                Allocation:Allocation,
                selectedDate: selectedDate,
                expectedDate: expectedDate,
                privateOffice:privateOffice
              });
              dispatch(setSelectedPrivateOfficeMembersHybrid(selectedMembersAgain.concat(teamLead)));
              dispatch(setSelectedDedicatedDeskMembersHybrid(selectedDedicatedDeskMembers));
            }} />
        </View>
      </ScrollView>


    </Frame>

  );
};


export default HybridScreenFour;