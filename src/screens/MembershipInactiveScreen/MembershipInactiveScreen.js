import { StatusBar, View, SafeAreaView, TouchableOpacity, ScrollView, Pressable,RefreshControl } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import Svg from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import normalize from 'react-native-normalize';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { GetTeam } from '../../shared/redux/action/GetTeam';
import { GetPendingPlan } from '../../shared/redux/action/GetPendingPlan';
import { PendingStatus } from '../../shared/redux/action/PendingStatus';
import styles from './MembershipInactiveScreen.style';
import { AppTheme } from '../../shared/theme';
import { ScreensName } from '../../shared/constants/ScreensStrings';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../../shared/components';
import FintechLogo from '../../assets/images/fintechHomeScreenLogo.svg';
import MenuIcon from '../../assets/images/menuIcon.svg';
import FintechBottomLogo from '../../assets/images/FintechBottomLogo.svg';
import Pending from '../../assets/images/Pending.js';

import { useState } from 'react';



const MembershipInactiveScreen = () => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginData = useSelector((state) => state.auth?.data);
  const token = loginData?.access_token;

  const teamMembers = useSelector(state => state?.getTeam);
  const teamMembersPending = teamMembers?.loading;
  console.log('teamMembersPending----', teamMembersPending);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingStatus,setPendingStatus]=useState();

  const [teamId,setTeamId]=useState(null);
  console.log('teamId 22---',teamId);

  useEffect(() => {
    dispatch(GetTeam(token)).unwrap().then((result) => {
      // check result 
      const allTeamMembers=result?.find((item)=>{ return item;});
      var teamid=allTeamMembers?.Team?.Id;
      console.log('----login ID---', teamid);
      setTeamId(teamid);
      console.log('----login ID 2222---', teamId);
  
    });
  }, [dispatch]);


  useEffect(() => {
    dispatch(PendingStatus(teamId)).unwrap().then((result) => {
      console.log('result111--',result);
      setPendingStatus(result?.requestStatus);
    }).catch((error)=>{
      console.log('error111--',error);

    });
    
    dispatch(GetPendingPlan(teamId));
  }, [teamId,isFocused]);

  {/* PENDING STATUS 200 MEANS THAT STATUS IS PENDING AND 500 MEANS THAT REQUEST IS DENIED */}
    
  const onRefresh=()=>{
    console.log('pendingstatus----',pendingStatus);
    setIsRefreshing(true);

    dispatch(PendingStatus(teamId)).unwrap().then((result) => {
      console.log('result111--',result);
      setPendingStatus(result?.requestStatus);
      dispatch(GetPendingPlan(teamId));
    });
    // if(pendingStatus==='pending'){
    //   dispatch(ResourcePlan()).unwrap().then((result) => {
    //   // check result 
    //     console.log('----res plan result on refresh 667788a---', result);
    //     setResourcePlanData(result);
    //     setIsRefreshing(false);
    //   });
    // }
  
    setIsRefreshing(false);
  };

  return (

    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.safeAreaContainer}>
        <StatusBar barStyle={'light-content'} backgroundColor={AppTheme.COLORS.black} />

        {/* <Loader loading={isLoading} /> */}

        <View style={styles.mainContainer}>
          {/* HEADER */}
          <View style={styles.headerContainer}>
            <View >
              <Svg width={'100%'} >
                <FintechLogo />
              </Svg>
            </View>

            <View style={styles.allignInRow}>
              <Feather
                size={25}
                color={AppTheme.COLORS.white}
                name="bell"
                style={{ marginRight: normalize(23.6) }}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ScreensName.mainMenuScreen);
            
                }

                }
              >
                <MenuIcon />
              </TouchableOpacity>
            </View>

          </View>
          <ScrollView
            contentContainerStyle={styles.ScrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }
          >
            {/* CHECKING PENDING STATUS */}
            {pendingStatus==='pending' ?
              <Pressable
                onPress={()=>{
                  navigation.navigate(ScreensName.requestPending);
                }}>
                <View style={styles.pendingstate}>
                  <View style={styles.allignInRow}>
                    <View >
                     
                      <Pending />
                      
                    </View>
                    <View style={styles.marginLeft}>
                      <AppText style={styles.approvalPending}>Approval Pending</AppText>
                      <AppText style={styles.approvalPendingDesc}>Please wait, your team membership request is in processing.</AppText>
                    </View>
                  </View>
                </View>
              </Pressable>
              :
              <View style={styles.pendingstate}>
                <View style={styles.allignInRow}>
                  <View >
                    <Svg width={'100%'} >
                      <Pending />
                    </Svg>
                  </View>
                  <View style={styles.marginLeft}>
                    <AppText style={styles.approvalPending}>Membership Inactive</AppText>
                    <AppText style={styles.approvalPendingDesc}>Please wait, your team membership request is not yet submitted by your team lead</AppText>
                  </View>
                </View>
              </View>

            
               
            } 
            <View style={styles.fintechBottomLogo}>
              <View>
                <Svg width={'100%'} >
                  <FintechBottomLogo />
                </Svg>
              </View>
            </View>


          </ScrollView>

        </View>
      </SafeAreaView>
    </>

  );
  
};

export default  MembershipInactiveScreen;
