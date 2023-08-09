import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import HelpDeskCard from '../../shared/components/HelpDeskCard/HelpDeskCard';
import HelpDeskOutLineButton from '../../shared/components/HelpDeskOutLineButton/HelpDeskOutLineButton';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {GetHelpDeskTickets} from '../../shared/redux/action/GetHelpDeskTickets';
import styles from './HelpDeskScreen.Style';
import uuid from 'react-native-uuid';
import {useIsFocused} from '@react-navigation/native';
import Frame from '../../shared/components/core/Frame';
import {AppTheme} from '../../shared/theme';
import Txt from '../../shared/components/core/Txt';
import HelpDeskHeader from '../../shared/components/HelpDeskHeader/HelpDeskHeader';
import NoDeskReq from '../../assets/images/NoDeskReq'

const HelpDeskScreen = ({navigation}) => {
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const [selectedTab, setSelectedTab] = useState('Open');
  const [inReviewTickets, setInReviewTickets] = useState([]);
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {Id} = useSelector(selectUserData);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const fetchTickets = useCallback(
    async (id, path) => {
      const requiredData = {id: Number(id), path};
      try {
        const {data} = await dispatch(
          GetHelpDeskTickets(requiredData),
        ).unwrap();
        if (path === 'open') {
          setInReviewTickets(data);
        } else {
          setResolvedTickets(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error while getting Tickets details: ', error);
        setError('Error while getting Tickets details.');
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      fetchTickets(Id, selectedTab === 'Open' ? 'open' : 'closed');
    }
    setIsLoading(true);
    fetchTickets(Id, selectedTab === 'Open' ? 'open' : 'closed');
  }, [selectedTab, Id, fetchTickets, isFocused]);

  const renderItem = ({item}) => (
    <HelpDeskCard
      accessibilityLabel="gotoReportSummary"
      title={item.Subject}
      status={item.Closed ? 'Closed' : 'Open'}
      date={moment(item.CreatedOn.split('T')[0]).format('DD/MM/YYYY')}
      description={item.MessageText}
      onPress={() =>
        navigation.navigate(ScreensName.ReportSummaryScreen, {item})
      }
      isDataLoading={true}
    />
  );

  const renderListEmpty = () => (
    <View style={styles.emptyContainer}>
      {isLoading ? (
        <>
          {/* Skeleton */}
          {[...Array(3)].map(index => {
            return (
              <View key={uuid.v4()}>
                <HelpDeskCard isDataLoading={false} />
              </View>
            );
          })}
        </>
      ) : (
        <NoDeskReq
        stroke={isDarkMode ? AppTheme.COLORS.white : null}
      />
      )}
    </View>
  );

  return (
    <Frame mode={'View'}>
      <View style={{marginBottom: AppTheme.SPACINGS.MARGINS.M1}}>
        <HelpDeskHeader
          tabOneText={'Open'}
          tabTwoText={'Closed'}
          isSelected={selectedTab}
          setIsSelected={setSelectedTab}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={{width: '100%'}}>
          <FlatList
            data={
              selectedTab === 'Open' ? inReviewTickets : resolvedTickets
            }
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={renderListEmpty}
          />
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <HelpDeskOutLineButton
          accessibilityLabel="reportIssue"
          onPress={() => navigation.navigate(ScreensName.reportproblemscreen)}
        />
      </View>
    </Frame>
  );
};

export default HelpDeskScreen;
