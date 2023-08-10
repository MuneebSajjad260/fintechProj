import {StatusBar, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';

import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import {PrivateOfficeResources} from '../../shared/redux/action/PrivateOfficeResources';
import {selectResourceData} from '../../shared/redux/slices/planResourceDataSlice';
import {AppTheme} from '../../shared/theme';
import Strings from '../../shared/constants/Strings';
import styles from './HybridScreenThree.style';
import {Touchable} from '../../shared/components';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import PrivateOfficeCard from '../../shared/components/privateOfficeCard/PrivateOfficeCard';
import StepComponent from '../../shared/components/stepComponent/StepComponent';

const HybridScreenThree = ({route}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {planId} = route.params;
  //getting size of selected members
  const {teamSize, expectedDate, selectedDate} = route.params;
  console.log('team size--', teamSize);

  const capacity = teamSize - 1;
  console.log('capacity---11--', capacity);

  // console.log("privateOffices-----", privateOffices)

  const privateOfficeDataPending = useSelector(
    state => state.privateOfficeResources?.loading,
  );

  const resourceData = useSelector(selectResourceData);
  console.log('Resource Data DD--', resourceData);

  const [privateOfficeResourceData, setPrivateOfficeResourceData] = useState(
    [],
  );

  // bottom Sheet

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ScreensName.hybridScreen,
    });
  }, []);

  useEffect(() => {
    const data = {Id: resourceData?.Id, capacity: capacity};
    // dispatch(PrivateOfficeResources(data))
    dispatch(PrivateOfficeResources(data))
      .unwrap()
      .then(result => {
        // check result
        console.warn(
          'Finding an Id in Hybrid:------------',
          result?.data?.Records,
        );
        setPrivateOfficeResourceData(result?.data?.Records);
      });
  }, []);
  return (
    <Frame screenTitle={'Hybrid'} mode={'view'}>
      <View style={styles.headerContainer}>
        {/* STEPPER COMPONENT */}
        <StepComponent
          stepOne={'isCompleted'}
          stepTwo={'isCompleted'}
          stepThree={'isActive'}
          stepFour={false}
          hybrid={true}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.ScrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <Txt style={styles.title}>{Strings.selectPrivateOffice}</Txt>
          {/* SHIMMER PLACEHOLDERS */}
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

          {/* LIST OF ALL PRIVATE OFFICES ON BASIS OF TEAM SIZE */}
          {privateOfficeResourceData?.map(item => {
            return (
              <>
                {item.CoworkerContractIds === null && (
                  <Touchable
                    key={item?.Id}
                    onPress={() => {
                      navigation.navigate(ScreensName.hybridScreenFour, {
                        Allocation: item?.Capacity,
                        privateOffice: item,
                        planId: planId,
                        privateOfficeId: item?.ResourceId,
                        resId: item?.Id,
                        selectedDate: selectedDate,
                        expectedDate: expectedDate,
                      });
                      console.log('lets go to summary screen');
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
    </Frame>
  );
};
export default HybridScreenThree;
