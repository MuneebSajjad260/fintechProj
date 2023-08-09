import React, {useEffect, useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import styles from './AddCreditScreen.Style';
import uuid from 'react-native-uuid';
// API
import {GetCreditsProducts} from '../../shared/redux/action/GetCreditsProducts';
import {useDispatch} from 'react-redux';
import AddCreditListItem from '../../shared/components/AddCreditListItem/AddCreditListItem';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import {AppTheme} from '../../shared/theme';

export default function AddCreditScreen({navigation}) {
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(null);
  const dispatch = useDispatch();


  // *FlatList
  const renderItem = ({item}) => {
    return (
        <AddCreditListItem
          id={item.Id}
          name={item.Name}
          price={item.Price}
          currencyCode={item.CurrencyCode}
          navigation={navigation}
          isLoading={true}
        />
    );
  };

  // *API Modules
  const getCreditsList = useCallback(async () => {
    try {
      const {data} = await dispatch(GetCreditsProducts()).unwrap();
      console.log('API Response Is Here 2:----------->', data);
      setCredits(data);
    } catch (error) {
      console.error('Error while getting membership details: ', error);
      setError('Error while getting membership details.');
    }
  }, [dispatch]);

  // *API Calls Based on Active TAB (Details, Invoices)
  useEffect(() => {
    getCreditsList();
  }, [dispatch]);

  return (
    <Frame style={styles.container}>
      {credits !== null ? (
        <FlatList
          data={credits}
          renderItem={renderItem}
          keyExtractor={index => uuid.v4()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 16}}
          ListEmptyComponent={() => {
            return (
              <View style={styles.notfoundContainer}>
                <Txt style={styles.notfound}>No credits found!</Txt>
              </View>
            );
          }}
        />
      ) : (
        <View style={{marginTop: 16}}>
          {[...Array(3)].map(index => {
            return (
              <View
                style={{paddingHorizontal: AppTheme.SPACINGS.PADDINGS.P6}}
                key={index}>
                <AddCreditListItem isLoading={false} />
              </View>
            );
          })}
        </View>
      )}
    </Frame>
  );
}
