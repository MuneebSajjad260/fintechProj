import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import styles from './TeamCreditsScreen.Style';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
// *Icons
import FilterIcon from '../../assets/images/FilterIcon.svg';
import CreditUpArrow from '../../assets/images/CreditUpArrow.svg';
import CreditDownArrow from '../../assets/images/CreditDownArrow.svg';
import CalenderIcon from '../../assets/images/CalenderIcon.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// *Other
import moment from 'moment';
import Dropdown from '../../shared/components/Dropdown/Dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
import uuid from 'react-native-uuid';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
//* Bottom Sheet
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
//* API
import {CreditHistory} from '../../shared/redux/action/CreditHistory';
import {GetTeam} from '../../shared/redux/action/GetTeam';
import {GetMyCredit} from '../../shared/redux/action/GetMyCredit';
import {GetTeamMemberCredit} from '../../shared/redux/action/GetTeamMemberCredit';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import PrintingCreditListItem from '../../shared/components/PrintingCreditsListItem/PrintingCreditListItem';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Wrapper from '../../shared/components/core/Wrapper';
import {AppTheme} from '../../shared/theme';
import NoPrinting from '../../assets/images/NoPrinting';

const filterCreditData = [
  'Today',
  'All',
  'This Week',
  'Last Week',
  'This Month',
  'Last Month',
  'Custom',
];

function HistoryListItem(creditHistory) {
  return (
    <Wrapper style={styles.historyListItemContainer}>
      {/* Left Side */}
      <View style={styles.historyListItemLeft}>
        <CreditUpArrow />
        <View style={styles.historyListItemPriceContainer}>
          <Txt style={styles.historyListItemPrice}>{creditHistory?.creditHistory?.count}</Txt>
          <Txt style={styles.historyListItemPriceTag}>Count</Txt>
        </View>
      </View>
      {/* Right Side */}
      <View style={styles.historyListItemRight}>
        <Txt style={styles.printingPage}>{creditHistory?.creditHistory?.type == 'BLACK_WHITE' ? 'B & W' : creditHistory?.creditHistory?.type }</Txt>
        <View style={styles.date_timeContainer}>
          <Txt style={styles.historyListItemDate}>{ moment(creditHistory?.creditHistory?.timestamp, 'MM/DD/YYYY HH:mm').format('Do MMMM, YYYY hh:mm A')}</Txt>
          {/* <Txt style={styles.historyListItemTime}>04:00 PM</Txt> */}
        </View>
      </View>
    </Wrapper>
  );
}

const TeamCreditsScreen = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [isSimpleUser, setIsSimpleUser] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const[creditHistory,setCreditHistory]=useState();
  const [selectedItemFromFilter, setSelectedItemFromFilter] = useState('Today');
  // *Loading States
  const [printingCreditLoading, setPrintingCreditLoading] = useState(false);

  const [dropDownLoading, setDropDownLoading] = useState(false);
  const [error, setError] = useState(null);
  // *Data Sates
  const [printingCredits, setPrintingCredits] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const token = useSelector(state => state.auth?.data?.access_token);
  const {IsTeamAdministrator, FullName , Id} = useSelector(selectUserData);
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  // ?API'S Logic
  // *API Modules (Own Credits)
  // const GetMyPrintingCredit = useCallback(async () => {
  //   try {
  //     setPrintingCreditLoading(true);
  //     const {
  //       ExtraServices: [{MinutesLeft}],
  //     } = await dispatch(GetMyCredit(token)).unwrap();
  //     // console.log('API Response Is Here:----------->', MinutesLeft);
  //     setPrintingCredits({currency: 'SAR', credit: MinutesLeft});
  //     setPrintingCreditLoading(false);
  //   } catch (error) {
  //     setPrintingCredits(null);
  //     setPrintingCreditLoading(false);
  //     console.error('Error while getting membership details: ', error);
  //     setError({Error: error});
  //   }
  // }, [dispatch]);

  // *API Modules (Get Team Members)
  const GetTeamMembers = useCallback(async () => {
    try {
      setDropDownLoading(true);
     
      const [{AllTeamMembers}] = await dispatch(GetTeam(token)).unwrap();
      const newData = AllTeamMembers.map(({FullName, Id}) => ({
        Name: FullName,
        Id,
      }));
      setTeamMembers(newData);
      console.log('API Response Is Here:----------->', newData);
      setDropDownLoading(false);
    } catch (error) {
      setDropDownLoading(false);
      setTeamMembers([]);
      console.error('Error while getting membership details: ', error);
      setError({Error: error});
    }
  }, [dispatch]);

  // *API Modules (Get Selected Team Member Credits)
  const GetSelectTeamMemberCredit = useCallback(
    async id => {
      if (id) {
        try {
          setPrintingCreditLoading(true);
          const {credits, currenyCode} = await dispatch(
            GetTeamMemberCredit(id),
          ).unwrap();
          console.log(
            'API Response Is Here:----------->',
            credits,
            currenyCode,
          );
          setPrintingCredits({currency: currenyCode, credit: credits});
          setPrintingCreditLoading(false);
        } catch (error) {
          setPrintingCreditLoading(false);
          setPrintingCredits(null);
          console.error('Error while getting membership details: ', error);
          setError({Error: error});
        }
      } else {
        setPrintingCredits(null);
        setPrintingCreditLoading(false);
        console.log('Please Provide ID to Continue or Check your ID!');
      }
    },
    [dispatch],
  );

  // *API Calls
  useEffect(()=>{
    GetTeamMembers();
  },[dispatch]);
  
  useEffect(() => {
    // *Get Printing Credits
  
    GetSelectTeamMemberCredit(Id);
    // *Get Team Members
    // if (!isSimpleUser) {
    //   GetTeamMembers();
    // }
  }, [dispatch]);

  // *Drop Down
  const handleSelect = option => {
    console.log('options---',option);
    setSelectedValue(option);
    // *API Call (Get Printing Credit of Selected Item from Dropdown)
    GetSelectTeamMemberCredit(option.Id);
  };
  // *Calender Logic
  const handleHideModal = () => {
    setVisible(false);
    setSelectedDates({});
  };

  // *FlatList
  const renderItem = ({item}) => {
    return (
    
      <Pressable
        accessibilityLabel="historyListItems"
        onPress={() => navigation.navigate(ScreensName.TransactionDetailScreen,{creditHistory:item,price:item.type =='BLACK_WHITE' ? creditHistory?.BnW : creditHistory?.Color })}
        style={{paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P7}}>
        <HistoryListItem creditHistory={item}/>
      </Pressable>
    );
  };
  //* On Empty Data
  const renderListEmpty = () => (
    <View style={styles.emptyContainer}>
      {/* <View style={styles.nothinschedule} > */}
      
      <NoPrinting
        stroke={isDarkMode ? AppTheme.COLORS.white : null}
      />
          
      {/* </View> */}
    </View>
  );

  // TODO
  // * Pull to Refresh
  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    // *Get Printing Credits
    //GetMyPrintingCredit();

    // *Get Team Members
    if (!isSimpleUser) {
      GetTeamMembers();
    } // call your data fetching function here
    setIsRefreshing(false);
  }, []);

  ///GET CREDITS HISTORY API////

  useEffect(()=>{
    dispatch(CreditHistory(1416819898)).unwrap().then((result)=>{
      console.log('result credit history--', result);
      setCreditHistory(result);
    }).
      catch(err=>{
        console.log('error credit history--', err);
      });
  },[]);

  /////////////////////


  // *Bottom Sheet
  const BtmRef = useRef(null);
  const snapPointsConfirm = useMemo(() => ['72%'], []);
  const bottomSheetContent = (
    <View style={styles.btmContainer}>
      <Txt style={styles.btmHeading}>Filter</Txt>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={styles.btmListItemContainer}>
        {filterCreditData.map(item => {
          return (
            <Pressable
              accessibilityLabel="sendInvitation"
              key={item}
              style={[
                styles.btmListItem,
                selectedItemFromFilter === item
                  ? [{backgroundColor: isDarkMode ? AppTheme.COLORS.btnActiveDarkMode : '#0129FA40'}]
                  : styles.btmListItemColorTwo,
              ]}
              onPress={() => {
                setSelectedItemFromFilter(item);
                if (item === 'Custom') {
                  setVisible(true);
                }
                BtmRef.current?.closeBottomSheet();
              }}>
              <Txt
                style={[
                  styles.btmListItemText,
                  selectedItemFromFilter === item
                    ? styles.btmListItemTextColorOne
                    : styles.btmListItemTextColorTwo,
                ]}>
                {item}
              </Txt>
            </Pressable>
          );
        })}
      </BottomSheetScrollView>
    </View>
  );

  // *Show Filter Credit Bottom Sheet
  const handlePress = () => {
    BtmRef.current?.expandBottomSheet();
  };

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPointsConfirm}
      bottomSheetContent={bottomSheetContent}
      ref={BtmRef}
      mode={'View'}
    >
      <View style={styles.topContent}>
        {/* Add Credit */}
        <View style={styles.creditContainer}>
          <Txt style={styles.credit}>Credits</Txt>
          {/* Button */}
          {isSimpleUser === false && IsTeamAdministrator ? (
            <Pressable
              accessibilityLabel="addCreditBtn"
              onPress={() => navigation.navigate(ScreensName.AddCreditScreen)}
              style={styles.creditBtnContainer}>
              <Txt style={styles.creditBtnText}>Add credits</Txt>
            </Pressable>
          ) : null}
        </View>

        {/* Select Team Member Dropdown */}
        {isSimpleUser === false && IsTeamAdministrator ? (
          <View style={{marginBottom: AppTheme.SPACINGS.MARGINS.M1}}>
           
            <Dropdown
              options={teamMembers}
              selectedValue={selectedValue}
              onSelect={handleSelect}
              isLoading={dropDownLoading}
              placeholder={FullName}
            />
          </View>
        ) : null}

        {/* Printing Credit List Item */}
        <PrintingCreditListItem
          isLoading={printingCreditLoading}
          printingCredits={printingCredits}
        
        />
      </View>

      {/* Devider */}
      <View
        style={[
          styles.devider,
          {
            backgroundColor: isDarkMode
              ? AppTheme.COLORS.wrapperDarkModeBg
              : '#EEEEEE',
          },
        ]}
      />
      {/* History */}
      <View style={styles.historyContainer}>
        {/* Header */}
        <View style={styles.historyHeader}>
          <Txt style={styles.history}>History</Txt>
          {/* Date Picker */}
          {/* <Pressable onPress={handlePress} style={styles.datePickerContainer}>
            <Txt style={styles.datePickerBtnTitle}>
              {selectedItemFromFilter}
            </Txt>
            <View style={styles.filterIconContainer}>
              <FilterIcon />
            </View>
          </Pressable> */}
        </View>
        <FlatList
          keyExtractor={index => uuid.v4()}
          showsVerticalScrollIndicator={false}
          data={creditHistory?.data}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmpty}
        />
      </View>

      {/* Calender Modal */}
      <Modal visible={visible} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback onPress={handleHideModal}>
          <View style={styles.overlay}>
            <View
              style={[
                styles.modal,
                {
                  backgroundColor: isDarkMode
                    ? AppTheme.COLORS.wrapperDarkModeBg
                    : AppTheme.COLORS.white,
                },
              ]}>
              <CalendarPicker
                width={350}
                onDateChange={() => console.log('Under Construction!')}
                monthTitleStyle={styles.calendarMonth}
                yearTitleStyle={styles.calendarYear}
                todayBackgroundColor="#D8DEFF"
                selectedDayColor="#D8DEFF"
                textStyle={[
                  styles.calendarText,
                  {
                    color: isDarkMode
                      ? AppTheme.COLORS.white
                      : AppTheme.COLORS.black,
                  },
                ]}
                previousTitle={
                  <MaterialIcons name={'keyboard-arrow-left'} size={24} />
                }
                nextTitle={
                  <MaterialIcons name={'keyboard-arrow-right'} size={24} />
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Frame>
  );
};

export default TeamCreditsScreen;
