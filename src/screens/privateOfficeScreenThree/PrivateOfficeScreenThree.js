import {StatusBar, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import {PrivateOfficeResources} from '../../shared/redux/action/PrivateOfficeResources';
import {selectResourceData} from '../../shared/redux/slices/planResourceDataSlice';
import {AppTheme} from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import styles from './PrivateOfficeScreenThree.Style';

import {Touchable} from '../../shared/components';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import PrivateOfficeCard from '../../shared/components/privateOfficeCard/PrivateOfficeCard';
import StepComponent from '../../shared/components/stepComponent/StepComponent';
import {useEffect} from 'react';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';

const PrivateOfficeScreenThree = ({route}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {planId} = route.params;
  //getting selected members
  const {teamSize, expectedDate, selectedDate} = route.params;

  const capacity = teamSize - 1;

  const privateOffices = useSelector(
    state => state.privateOfficeResources?.data,
  );
  // console.log("privateOffices-----", privateOffices)
  const privateOfficeData = privateOffices?.data;

  const privateOfficeDataPending = useSelector(
    state => state.privateOfficeResources?.loading,
  );

  // console.log("privateOfficeData--->", privateOfficeData)
  // eslint-disable-next-line no-unused-vars
  const privateOfficeRecords = privateOfficeData?.Records;
  // console.log("privateOfficeRecords--->", privateOfficeRecords)

  const resourceData = useSelector(selectResourceData);

  const [privateOfficeResourceData, setPrivateOfficeResourceData] = useState(
    [],
  );

  // private Office Card

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.privateOfficeScreenOne,
    });
  }, []);

  useEffect(() => {
    const data = {Id: resourceData?.Id, capacity: capacity};
    // dispatch(PrivateOfficeResources(data))
    dispatch(PrivateOfficeResources(data))
      .unwrap()
      .then(result => {
        // check result
        console.log(
          'Private Office Resources:----------------',
          result?.data?.Records,
        );
        setPrivateOfficeResourceData(result?.data?.Records);
      });
  }, []);

  return (
    <Frame mode="View" screenTitle="Private office">
      {/* <SafeAreaView style={styles.mainContainer}> */}
      {/* <StatusBar backgroundColor={AppTheme.COLORS.black} barStyle="light-content" /> */}
      {/* STEP COMPONENT */}
      <View style={styles.headerContainer}>
        <StepComponent
          stepOne={'isCompleted'}
          stepTwo={'isCompleted'}
          stepThree={'isActive'}
          privateOffice={true}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.ScrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <Txt style={styles.title}>{Strings.selectPrivateOffice}</Txt>

          <View>
            <ShimmerPlaceHolder
              visible={privateOfficeDataPending === false}
              shimmerStyle={[
                styles.resourceType,
                {width: '90%', borderRadius: normalize(10)},
              ]}></ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              visible={privateOfficeDataPending === false}
              shimmerStyle={[
                styles.resourceType,
                {width: '90%', borderRadius: normalize(10)},
              ]}></ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              visible={privateOfficeDataPending === false}
              shimmerStyle={[
                styles.resourceType,
                {width: '90%', borderRadius: normalize(10)},
              ]}></ShimmerPlaceHolder>
          </View>

          {/* GETTING LIST OF ALL PRIVATE OFFICES ON BASIS OF TEAM SIZE */}
          {privateOfficeResourceData?.map(item => {
            return (
              <>
                {item.CoworkerContractIds === null && (
                  <Touchable
                    key={item?.Id}
                    onPress={() => {
                      navigation.navigate(ScreensName.summaryScreen, {
                        Allocation: item?.Capacity,
                        privateOffice: item,
                        planId: planId,
                        privateOfficeId: item?.ResourceId,
                        resId: item?.Id,
                        selectedDate: selectedDate,
                        expectedDate: expectedDate,
                      });
                    }}
                    style={styles.privateOfficeCardContainer}>
                    <PrivateOfficeCard item={item} />
                  </Touchable>
                )}
              </>
            );
          })}
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </Frame>
  );
};
export default PrivateOfficeScreenThree;
