import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Svg} from 'react-native-svg';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import styles from './TeamMemberDetails.style';
import {useDispatch, useSelector} from 'react-redux';
import normalize from 'react-native-normalize';
import Frame from '../../shared/components/core/Frame';
import moment from 'moment';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {GetMembershipDetail} from '../../shared/redux/action/GetMembershipDetail';
import MyTeamMembers from '../../assets/images/MyTeamMembers.js';
import {AppTheme} from '../../shared/theme';
import Wrapper from '../../shared/components/core/Wrapper';
import { scale } from '../../shared/utils/scale';
import Txt from '../../shared/components/core/Txt';

const TeamMemberDetail = ({route}) => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  //GETTINFG DATA FROM PARAMS
  const {name, companyName, joiningDate, resourceType} = route.params;
  console.log('33--', userData?.TeamIds, '--', joiningDate,'---',resourceType);

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
    <Frame
    mode ='View'>
    {/* <SafeAreaView style={styles.safeAreaContainer}> */}
      <View style={styles.mainContainer}>
        <Wrapper style={styles.card}
        >
          <View style={styles.subContainer}>
            <View style={styles.flexDirectionRow}>
              <View>
                  <MyTeamMembers stroke={isDarkMode ? AppTheme.COLORS.white : null} />
              </View>

              <View>
                <Txt style={styles.Heading}>{name}</Txt>
                <Txt style={styles.subHeading}>Name</Txt>
              </View>
            </View>
            <View>
              <Txt style={styles.Heading}>Status:</Txt>
              <Txt style={styles.active}>{membership?.data?.status}</Txt>
            </View>
          </View>

          <View style={styles.joiningDateContainer}>
            <Txt style={styles.Heading}>{formattedDate}</Txt>
            <Txt style={styles.subHeading}>Joining Date</Txt>
          </View>
        </Wrapper>

        <Wrapper style={[styles.card,{marginTop:scale(20)}]}>
          <View style={styles.flexDirectionRow}>
            <View>
              <Svg width={'100%'}>
              <MyTeamMembers stroke={isDarkMode ? AppTheme.COLORS.white : null} />
              </Svg>
            </View>
            <View>
              <Txt
                style={[
                  styles.Heading,
                  {fontFamily: AppTheme.FONTS.TYPE.REGULAR},
                ]}>
                {membership?.data?.teamName}
              </Txt>
              <Txt style={styles.subHeading}>Company</Txt>
            </View>
          </View>

          <View style={[styles.subContainer2, {marginTop: normalize(16)}]}>
            {/* LAST CHECK IN MODULE  */}
            <Txt
              style={[
                styles.Heading,
                {fontFamily: AppTheme.FONTS.TYPE.REGULAR},
              ]}>
              {membership?.data?.lastCheckin ? formattedDate : '-'}
            </Txt>
            <Txt style={styles.subHeading}>Last Check-in</Txt>

            <View style={styles.marginTop}>
              <Txt
                style={[
                  styles.Heading,
                  {fontFamily: AppTheme.FONTS.TYPE.REGULAR},
                ]}>
                {resourceType}
              </Txt>
              <Txt style={styles.subHeading}>Resource</Txt>
            </View>

            <View style={styles.marginTop}>
              <Txt
                style={[
                  styles.Heading,
                  {fontFamily: AppTheme.FONTS.TYPE.REGULAR},
                ]}>
                {membership?.data?.planDuration}
              </Txt>
              <Txt style={styles.subHeading}>Payment Plan</Txt>
            </View>
          </View>
        </Wrapper>
      </View>
    {/* </SafeAreaView> */}
    </Frame>
  );
};

export default TeamMemberDetail;
