/* eslint-disable no-unused-vars */
import { StatusBar, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { Divider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Svg from 'react-native-svg';
import normalize from 'react-native-normalize';
import { useSelector, useDispatch } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';


import { ResourceId } from '../../shared/config/resourceId';
import Wrapper from '../../shared/components/core/Wrapper';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import HybridCard from '../../shared/components/HybridCard/HybridCard';
import PrivateOfficeCard from '../../shared/components/privateOfficeCard/PrivateOfficeCard';
import { ResourcePlan } from '../../shared/redux/action/ResourcePlan';
import { GetTeam } from '../../shared/redux/action/GetTeam';
import { GetPendingPlan } from '../../shared/redux/action/GetPendingPlan';
import { AppTheme } from '../../shared/theme';
import DedicatedDeskCard from '../../shared/components/DedicatedDeskCard/DedicatedDeskCard';
import styles from './DeskRequestPending.style';
import Duration from '../../assets/images/duration.js';
import Team from '../../assets/images/team.js';
import Paymentsummary from '../../assets/images/paymentSummary.js';
import Pending from '../../assets/images/Pending.js';
import Strings from '../../shared/constants/Strings';

const DeskRequestPending = ({ navigation, route }) => {
  const newDate = new Date();
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const loginData = useSelector((state) => state.auth?.data);
  const token = loginData?.access_token;

  const resourcePlan = useSelector((state) => state?.resourcePlan);
  const resourcePlanData = useSelector((state) => state?.resourcePlan?.data);
  console.log('allResources', resourcePlan);
  console.log('---all--Resources---,', resourcePlanData);

  const teamMembers = useSelector(state => state?.getTeam);
  const teammembersdata = teamMembers?.data;
  // const teamMemberTeams = teammembersdata[0]?.Team;
  // console.log('All members 11---', teamMemberTeams);

  const allTeamMembers=teammembersdata?.find((item)=>{ return item;});
  const teamId=allTeamMembers?.Team?.Id;
  console.log('team Id----',teamId);
  
  const [pendingPlan, setPendingPlan]=useState(() => {
    return pendingPlanData ? pendingPlanData : [];

  });
  const [teamLead, setTeamLead] = useState([]);
 

  const pendingPlanData = useSelector(state => state?.getPendingPlan?.data);
  const pendingPlanDataPending = useSelector((state) => state?.getPendingPlan?.loading);
 
  const pendingPlanObject=pendingPlan?.find(item=>{ return item;});
  const pendingPlanStatus = pendingPlanObject?.status;

  console.log('pending plan Object ----',pendingPlanObject);


  const SelectedMembers = pendingPlanObject?.teamMembers;
  console.log('SelectedMembers 22---', SelectedMembers);

  const POMembersHybrid = pendingPlanObject?.privateMembers ? pendingPlanObject?.privateMembers : [];
  console.log('SelectedMembers 33---',  POMembersHybrid);

  const DDMembersHybrid = pendingPlanObject?.dedicatedMembers ? pendingPlanObject?.dedicatedMembers : [];
  console.log('SelectedMembers 44---', DDMembersHybrid);

  const sDate = pendingPlanObject?.date;
  const startDate=moment.utc(sDate).format('MMMM DD, YYYY');

  let resPlanDD = resourcePlanData?.find(planName => planName.ResourceId === +process.env.dedicatedDeskID);
  let memberTerrifDD = resPlanDD?.ResourcePlan;
  console.log('ress plann DD------->', resPlanDD);
  console.log('plann DD------->', memberTerrifDD);


  const [resourceType, setResourceType] = useState([]);
  const [expectedEndDate, setExpectedEndDate] = useState();


  const selectTeamLead = () => {
    if (SelectedMembers){
      if (SelectedMembers.some(item => (item?.isAdministrator === true))) {
        let lead = SelectedMembers.filter(item => (item?.isAdministrator === true));
        setTeamLead(lead);

      }
    }
  };

  useEffect(() => {
    selectTeamLead();
  }, [pendingPlan]);


  const deskItem = { id: 1, officeNo: 'Dedicated Desk',Capacity:1  };
  const hybridItem = { id: 1, officeNo: `${resourceType} - Hybrid`,Capacity:pendingPlanObject?.deskCapacity };
  const privateOffice={ResourceName:resourceType , Capacity:pendingPlanObject?.deskCapacity};

  //GETTING TEAM MEMBERS
  useEffect(() => {
    dispatch(GetTeam(token));
  }, [dispatch,token]);

  //PENDING PLAN API 
  useEffect(() => {
    dispatch(GetPendingPlan(teamId)).unwrap().then((result)=>{
      console.log('shoe me reult 22 ----',result);
      setPendingPlan(result);
      console.log('70707---',pendingPlan);
    }).catch(error=>{
      console.log('error111--',error);
    });
  }, [teamId]);

  

  useEffect(()=>{

    expectedDate();
  },[pendingPlanObject]);

  const expectedDate = () => {

    if (pendingPlanObject?.planDuration === 'Monthly') {
      let expectedDate = moment(startDate, 'MMMM DD YYYY').add(pendingPlanObject?.RenewalMonths, 'months').format('MMMM 1, YYYY');
      setExpectedEndDate(expectedDate);
   
      console.log('EXPECTED DATES--', expectedEndDate);
    }
    else {
      let expectedDate = moment(startDate, 'MMMM DD YYYY').add(1, 'years').format('MMMM 1, YYYY');
    
      setExpectedEndDate(expectedDate);
     
      console.log('EXPECTED DATES--', expectedEndDate);
    }
  };
  useEffect(() => {

    dispatch(ResourcePlan()).unwrap().then((result) => {
      // check result 
      console.log('----res plan result 667788a---', result);
      const PO=result?.find (item=>{return item?.ResourceId === ResourceId?.privateOffice;});
      const resourceType= PO?.ResourcePlan?.resources;
      const resourceTypeId=resourceType?.find(item=>{return  item?.resourceId===pendingPlanObject?.Desk;});
      console.log('----res plan private office name 667788a---', resourceTypeId);
      setResourceType(resourceTypeId?.resourceName);

    });
  }, [pendingPlanObject]);

  return (
    <Frame>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {/* PENDING STATE */}
        <Wrapper style={[styles.pendingstate,{ backgroundColor: isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : 'rgba(230, 234, 255, 1)'}]}>
          <View style={styles.pendingAllign}>
            <View >
            
              <Pending
                stroke={isDarkMode ? AppTheme.COLORS.white : null} />
            
            </View>
            <View style={styles.marginLeft}>
              <Txt style={styles.approvalPending}>Request Status</Txt>
              <Txt style={styles.approvalPendingDesc}>Please wait, your team membership request is in processing.</Txt>
            </View>
          </View>
        </Wrapper>

        {/* resource type card */}
        {pendingPlanObject?.ResourceTypeId===+process.env.privateOfficeID ?
          <View style={styles.officeCard}>

            <PrivateOfficeCard item={privateOffice} disabled={true} btnLabel={'Monthly Plan'} />

          </View>
          :
          pendingPlanObject?.ResourceTypeId === +process.env.dedicatedDeskID ?
            <View style={styles.officeCard}>

              < DedicatedDeskCard item={deskItem} />

            </View>
            :
            <View style={styles.officeCard}>

              <HybridCard item={hybridItem} />

            </View>
        }
        <View style={styles.subContainer}>
          <View style={[styles.flexDirectionRow, {}]}>
            <View>
                
              <Duration
                stroke={isDarkMode ? AppTheme.COLORS.white : null} />
                
            </View>
            <View >
              <Txt style={styles.maintitle}>{Strings.duration}</Txt>


              <Txt style={styles.expectedDates}>
                {Strings.expectedDates}
              </Txt>

              <View style={styles.dateRangetextContainer}>

                <Txt style={[styles.dateRangetext, { paddingLeft: normalize(8) }]}>{startDate}</Txt>
                <Txt style={[styles.dateRangetext, { fontFamily: AppTheme.FONTS.TYPE.BOLD, color: AppTheme.COLORS.black }]}>To</Txt>
                <Txt style={styles.dateRangetext}>{expectedEndDate}</Txt>
              </View>

            </View>
          </View>



        </View>
        <Divider style={styles.divider} />
        {teamLead?.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <View style={styles.subContainer} >
            <View style={[styles.selectedTeamContainer, { paddingRight: normalize(0) }]}>
              <View style={styles.flexDirectionRow}>
                <View>
                  {/* <Svg width={'100%'} > */}
                  <Team 
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}/>
                  {/* </Svg> */}
                </View>

                <View style={styles.teamContainer}>
                  <Txt style={[styles.maintitle, { marginLeft: normalize(0) }]}>{Strings.team}</Txt>
                  <Txt style={styles.selectedTeamMember}>{Strings.selectedTeamMember}</Txt>

                  <View style={[styles.flexDirectionRow, { marginTop: normalize(8), alignItems: 'center' }]}>
                    <Feather
                      name="user"

                      size={15}
                      color={isDarkMode ? AppTheme.COLORS.lightGrey : AppTheme.COLORS.purple}
                    />
                    <Txt style={styles.teamName}>{item.fullName}</Txt>
                  </View>
                  <View style={[styles.flexDirectionRow, { marginTop: normalize(2), marginLeft: normalize(35) }]}>

                    <View
                      style={styles.teamRoleContainer}>
                      <Txt style={styles.teamRole}>Administrator</Txt>
                    </View>
                    {item?.isPayingMember === true ?
                      <View
                        style={[styles.teamRoleContainer, { marginLeft: normalize(8), backgroundColor: AppTheme.COLORS.purple }]}
                      >
                        <Txt style={styles.teamRole}>Paying member</Txt>
                      </View>
                      : null
                    }
                  </View>
                </View>
              </View>
              {pendingPlanObject?.isMultiple === true ?
                 
                <View style={[styles.privateOfficeContainer, { alignSelf: 'flex-end' }]}>
                  <Txt style={styles.privateOffice}>{Strings.privateOffice}</Txt>
                </View>
                :null
              }

            </View>

          </View>
        ))}
        <Divider style={styles.innerDivider} />
        {pendingPlanObject?.isMultiple === false ?
        // MEMBERS LIST FOR PRIAVTE OFFICE AND DEDICATED DESK
          SelectedMembers?.map(item => (

            // eslint-disable-next-line react/jsx-key
            <View key={item?.Id} >
              {console.log('show9999---',item)}
              {
                item?.isAdministrator === false ?
                  <View>

                    <View>
                      <View style={[styles.flexDirectionRow, { marginTop: normalize(14), marginLeft: normalize(55) }]}>
                        <Feather
                          name="user"

                          size={15}
                          color={isDarkMode ? AppTheme.COLORS.lightGrey : AppTheme.COLORS.purple}
                        />
                        <Txt style={styles.teamMember}>{item.fullName}</Txt>
                      </View>
                        
                    </View>
                    { item?.isPayingMember === true &&
                            <View
                              style={[styles.payingMemberContainer, {
                              }]}
                            >
                              <Txt style={styles.teamRole}>Paying member</Txt>
                            </View>
                    }
                  </View>
                  :
                  null
              }

            </View>

          ))

            
          :
        // MEMBERS LIST FOR HYBRID
          <View>

            {/* HYBRID PRIVATE OFFICE MEMBERS */}

            {
              POMembersHybrid?.map(item => (

                <View key={item.Id} style={styles.selectedTeamContainer}>
                  {
                    item.isAdministrator === false ?
                      <View>
                        <View style={[styles.flexDirectionRow, { marginTop: normalize(14), marginLeft: normalize(55) }]}>
                          <Feather
                            name="user"
  
                            size={15}
                            color={isDarkMode ? AppTheme.COLORS.lightGrey : AppTheme.COLORS.purple}
                          />
                          <Txt style={styles.teamMember}>{item.fullName}</Txt>
  
                        </View>
                        { item?.isPayingMember === true &&
                            <View
                              style={[styles.payingMemberContainer, {
                              }]}
                            >
                              <Txt style={styles.payingMemberTxt}>Paying member</Txt>
                            </View>
                        }
                      </View>
                      :
                      null
                  }
                  {
                    item.isAdministrator === false ?
                      <View style={styles.privateOfficeContainer}>
                        <Txt style={styles.privateOffice}>{Strings.privateOffice}</Txt>
                      </View>
                      :
                      null
                  }
                </View>
  
              ))
            }

            {/* HYBRID DEDICATED DESK MEMBERS */}

            {
              DDMembersHybrid?.map(item => (
                <View  key={item.Id} style={styles.selectedTeamContainer}>
                  {
                    item.isAdministrator === false ?
                      <View>
                        <View style={[styles.flexDirectionRow, { marginTop: normalize(14), marginLeft: normalize(55) }]}>
                          <Feather
                            name="user"
  
                            size={15}
                            color={isDarkMode ? AppTheme.FONTS.SIZE.lightGrey : AppTheme.COLORS.orange}
                          />
                          <Txt style={styles.teamMember}>{item.fullName}</Txt>
  
                        </View>
                        { item?.isPayingMember === true &&
                            <View
                              style={[styles.payingMemberContainer, {
                              }]}
                            >
                              <Txt style={styles.payingMemberTxt}>Paying member</Txt>
                            </View>
                        }
                      </View>
                      :
                      null
                  }
                  {
                    item.isAdministrator === false ?
                      <View style={styles.dedicatedDeskContainer}>
                        <Txt style={styles.dedicatedDesk}>{Strings.dedicatedDesk}</Txt>
                      </View>
                      :
                      null
                  }
                </View>
  
  
              ))
            }
          </View>
        }
        <Divider style={styles.divider} />
        <View style={[styles.subContainer,{marginBottom:normalize(40)}]}>
          <View style={styles.flexDirectionRow}>
            <View>
              {/* <Svg width={'100%'}  > */}
              <Paymentsummary
                stroke={isDarkMode ? AppTheme.COLORS.white : null}/> 
              {/* </Svg> */}
            </View>
            <View>
              <Txt style={styles.maintitle}>{Strings.payment}</Txt>
              <Txt style={styles.finalPaymentText}>{Strings.finalPayment}</Txt>
            </View>
          </View>



          <View style={[styles.paymentContainer,{
            backgroundColor: isDarkMode
              ? AppTheme.COLORS.wrapperDarkModeBg
              : 'rgba(0, 0, 0, 0.04)',
          }]}>
            <View style={[styles.flexDirectionRow,
              {
                justifyContent: 'space-between',

              }]}>
              <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>Plan</Txt>
              <Txt style={styles.paymentContainerValues}>{pendingPlanObject?.planDuration}</Txt>
            </View>

            {pendingPlanObject?.isMultiple === false ?
              <View style={[styles.flexDirectionRow,
                {
                  justifyContent: 'space-between',
                  marginTop: normalize(8)

                }]}>
                    
                <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>{pendingPlanObject?.planType}</Txt>

                <ShimmerPlaceHolder
                  visible={pendingPlanDataPending === false}
                  shimmerStyle={styles.shimmerDesk}>
                </ShimmerPlaceHolder>
                {pendingPlanDataPending === false ? 
                  <Txt style={styles.paymentContainerValues}>{pendingPlanObject?.ResourceTypeId === +process.env.dedicatedDeskID ? `SAR ${pendingPlanObject?.deskPrice}` :
                    `SAR ${pendingPlanObject?.privateOfficePrice}`}</Txt>
                  : null}
              </View>
                
              :
              <View>
                <View style={[styles.flexDirectionRow,
                  {
                    justifyContent: 'space-between',
                    marginTop: normalize(8)

                  }]}>
                  <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>Private office</Txt>

                  <ShimmerPlaceHolder
                    visible={pendingPlanDataPending === false  }
                    shimmerStyle={styles.shimmerPrivateOffice}>
                  </ShimmerPlaceHolder>


                  <Txt style={styles.paymentContainerValues}>{ pendingPlanDataPending === false ? `SAR ${pendingPlanObject?.privateOfficePrice}` : null}</Txt>

                </View>
                <View style={[styles.flexDirectionRow,
                  {
                    justifyContent: 'space-between',
                    marginTop: normalize(8)

                  }]}>
                  <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>{Strings.dedicatedDesk}</Txt>

                  <ShimmerPlaceHolder
                    visible={pendingPlanDataPending === false   }
                    shimmerStyle={styles.shimmerDesk}>
                  </ShimmerPlaceHolder>

                  <Txt style={styles.paymentContainerValues}>{pendingPlanDataPending === false ? `SAR ${pendingPlanObject?.deskPrice}` : null }</Txt>
                </View>
              </View>
                  
            }
          </View>



          <View style={[styles.paymentContainer, { marginTop: normalize(8),
            backgroundColor: isDarkMode
              ? AppTheme.COLORS.wrapperDarkModeBg
              : 'rgba(0, 0, 0, 0.04)',
          }]}>
            <View style={[styles.flexDirectionRow,
              {
                justifyContent: 'space-between',

              }]}>
              <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>VAT 15%</Txt>
              <Txt style={styles.paymentContainerValues}>0</Txt>
            </View>

            <View style={[styles.flexDirectionRow,
              {
                justifyContent: 'space-between',
                marginTop: normalize(8)

              }]}>
              <Txt style={[styles.paymentContainerHeadings,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>Plan fee</Txt>
              <ShimmerPlaceHolder
                visible={pendingPlanDataPending === false}
                shimmerStyle={styles.shimmerPlanFee}>
              </ShimmerPlaceHolder>
              <Txt style={styles.paymentContainerValues}>
                {
                  pendingPlanDataPending === false ?  pendingPlanObject?.planFee : null
                }
              </Txt>
            </View>
                
            <Divider style={[styles.innerDivider, { marginLeft: normalize(0), marginRight: normalize(0) }]} />

            <View style={[styles.flexDirectionRow,
              {
                justifyContent: 'space-between',
                marginTop: normalize(14)

              }]}>
              <Txt style={styles.totalPayableText}>Total payable</Txt>
              <ShimmerPlaceHolder
                visible={pendingPlanDataPending === false}
                shimmerStyle={styles.shimmerTotalPayable}>
              </ShimmerPlaceHolder>
              <Txt style={[styles.totalPayableValue,{ color: isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.purple,}]}>
                {
                  pendingPlanDataPending === false ? `SAR ${pendingPlanObject?.price}`  : null
                }
              </Txt>
            </View>

          </View>

            
        </View>
      </ScrollView>
    </Frame>
  );
};


export default DeskRequestPending;