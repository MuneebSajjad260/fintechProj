import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Svg} from 'react-native-svg';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import styles from './TeamMemberDetails.style';
import {useDispatch, useSelector} from 'react-redux';
import normalize from 'react-native-normalize';

import moment from 'moment';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {GetMembershipDetail} from '../../shared/redux/action/GetMembershipDetail';
import MyTeamMembers from '../../assets/images/MyTeamMembers.js';
import {AppTheme} from '../../shared/theme';

const TeamMemberDetail = ({route}) => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  //GETTINFG DATA FROM PARAMS
  const {name, companyName, joiningDate, resourceType} = route.params;
  console.log('33--', userData?.TeamIds, '--', joiningDate);

  //CONVERTING DATE FORMAT
  const formattedDate = moment.utc(joiningDate).format('DD MMM YYYY');

  //State
  const [membership, setMembership] = useState();

  //MEMBERSHIP DETAIL API CALLING
  useEffect(() => {
    dispatch(GetMembershipDetail(Number(userData?.TeamIds)))
      .unwrap()
      .then(result => {
        console.log('membership result---', result);
        setMembership(result);
      })
      .catch(err => {
        console.log('membership error---', err);
      });
  }, [dispatch, userData?.TeamIds]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.mainContainer}>
        <CardContainer style={styles.card}>
          <View style={styles.subContainer}>
            <View style={styles.flexDirectionRow}>
              <View>
                <Svg width={'100%'}>
                  <MyTeamMembers />
                </Svg>
              </View>

              <View>
                <Text style={styles.Heading}>{name}</Text>
                <Text style={styles.subHeading}>Name</Text>
              </View>
            </View>
            <View>
              <Text style={styles.Heading}>Status:</Text>
              <Text style={styles.active}>{membership?.data?.status}</Text>
            </View>
          </View>

          <View style={styles.joiningDateContainer}>
            <Text style={styles.Heading}>{formattedDate}</Text>
            <Text style={styles.subHeading}>Joining Date</Text>
          </View>
        </CardContainer>

        <CardContainer style={styles.card}>
          <View style={styles.flexDirectionRow}>
            <View>
              <Svg width={'100%'}>
                <MyTeamMembers />
              </Svg>
            </View>
            <View>
              <Text
                style={[
                  styles.Heading,
                  {fontFamily: AppTheme.FONTS.TYPE.REGULAR},
                ]}>
                {companyName}
              </Text>
              <Text style={styles.subHeading}>Company</Text>
            </View>
          </View>

          <View style={[styles.subContainer2, {marginTop: normalize(16)}]}>
            {/* LAST CHECK IN MODULE  */}
            <Text
              style={[
                styles.Heading,
                {fontFamily: AppTheme.FONTS.TYPE.REGULAR},
              ]}>
              {membership?.data?.lastCheckin ? formattedDate : '-'}
            </Text>
            <Text style={styles.subHeading}>Last Check-in</Text>

            <View style={styles.marginTop}>
              <Text
                style={[
                  styles.Heading,
                  {fontFamily: AppTheme.FONTS.TYPE.REGULAR},
                ]}>
                {resourceType}
              </Text>
              <Text style={styles.subHeading}>Resource</Text>
            </View>

            <View style={styles.marginTop}>
              <Text
                style={[
                  styles.Heading,
                  {fontFamily: AppTheme.FONTS.TYPE.REGULAR},
                ]}>
                {membership?.data?.planDuration}
              </Text>
              <Text style={styles.subHeading}>Payment Plan</Text>
            </View>
          </View>
        </CardContainer>
      </View>
    </SafeAreaView>
  );
};

export default TeamMemberDetail;
