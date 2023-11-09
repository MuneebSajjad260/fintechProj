import React, {useState, useEffect, useCallback} from 'react';
import styles from './MembershipDetailsScreen.Style';
import {View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
import {Divider} from 'react-native-paper';
import HelpDeskHeader from '../../shared/components/HelpDeskHeader/HelpDeskHeader';
import InvoiceCard from '../../shared/components/InvoiceCard/InvoiceCard';
import uuid from 'react-native-uuid';
import normalize from 'react-native-normalize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
// API
import {GetMembershipDetail} from '../../shared/redux/action/GetMembershipDetail';
import {GetInvoicesDetail} from '../../shared/redux/action/GetInvoicesDetail';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import moment from 'moment';
// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import { AppTheme } from '../../shared/theme';
import BuildingIcon from '../../assets/images/BuildingIcon.js';
import TabHeader from '../../shared/components/TabHeader/TabHeader';
import NoMemo from '../../assets/images/NoMemo.js';

const MembershipDetailsScreen = ({navigation}) => {
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const [isSelected, setIsSelected] = useState('Details');
  const [membershipDetails, setMembershipDetails] = useState(null);
  const [memeDetailRes, setMemeDetailRes] = useState(null);
  const [invoiceDetailRes, setInvoiceDetailRes] = useState(null);
  const [invoicesDetails, setInvoicesDetails] = useState(null);
  const [test, setTest] = useState(false);
  const [error, setError] = useState(null);
  const {Id, TeamIds} = useSelector(selectUserData);
  const [status, setStatus] = useState('');
  // console.warn('Required IDS: ---------------->', TeamIds, Id);
  const dispatch = useDispatch();

  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  // *FlatList
  const renderItem = ({
    item: {
      InvoiceNumber,
      CurrencyCode,
      TotalAmountFormated,
      DueDate,
      Paid,
      Id,
      InvoiceToDate,
      InvoiceFromDate,
      SentOn,
    },
  }) => {
    return (
      <View style={styles.invoiceContainer}>
        <InvoiceCard
          invoiceTitle={InvoiceNumber}
          amount={TotalAmountFormated}
          resource={membershipDetails?.PlanType}
          date={DueDate}
          status={Paid}
          Currency={CurrencyCode}
          onPress={() => {
            if (membershipDetails !== null) {
              navigation.navigate(ScreensName.InvoiceSummaryScreen, {
                membershipDetails,
                Paid,
                Id,
                DueDate,
                InvoiceFromDate,
                InvoiceToDate,
                SentOn,
              });
            }
          }}
          isDataLoaded={false}
          accessibilityLabel="Invoice Card (Goto: Invoice Detail Screen)"
        />
      </View>
    );
  };

  // *API Modules
  const getMembershipDetails = useCallback(
    async id => {
      try {
        const {statusCode, data, message} = await dispatch(
          GetMembershipDetail(id),
        ).unwrap();
        setMemeDetailRes({statusCode});
        if (statusCode === 200) {
          setMembershipDetails(data);
          console.log("data---",data)
        } else {
          setMembershipDetails(null);
        }
        ////Muneeb--calculating dates for checking status/////

        const startDate = moment(data?.startDate);
        const endDate =  startDate.clone().add(data?.contractLength, 'months');
        const currentDate = moment();
        if ( currentDate.isSame(startDate) ||
        currentDate.isSame(endDate) ||currentDate.isBetween(startDate, endDate)) {
          setStatus('active');
        } else if (currentDate.isAfter(endDate)) {
          setStatus('expire');
        } else if (currentDate.isBefore(startDate)) {
          setStatus('pending');
        }
     
        ////Muneeb--calculating dates for checking status/////
      } catch (error) {
        setMemeDetailRes(null);
        setMembershipDetails(null);
        console.error('Error while getting membership details: ', error);
        setError('Error while getting membership details.');
      }
    },
    [dispatch, TeamIds],
  );

  const getInvoicesDetails = useCallback(
    async id => {
      try {
        const {statusCode, data, message} = await dispatch(
          GetInvoicesDetail(id),
        ).unwrap();
        if (statusCode === 200) {
          setInvoicesDetails(data);
        } else {
          setInvoicesDetails(null);
        }
        console.log('data invoice---',data);
      } catch (error) {
        setInvoicesDetails(null);
        setInvoiceDetailRes(null);
        console.error('Error while getting invoices details: ', error);
        setError('Error while getting memos details.');
      }
    },
    [dispatch, Id],
  );

  // *API Calls Based on Active TAB (Details, Invoices)
  useEffect(() => {
    if (isSelected === 'Details') {
      if (TeamIds) {
        getMembershipDetails(Number(TeamIds));
      } else {
        setMembershipDetails(null);
        setError('Error while getting team ID.');
        console.error('Error while getting team ID.');
      }
    } else if (isSelected === 'Memo(s)') {
      if (Id) {
        getInvoicesDetails(Number(Id));
       
      } else {
        setInvoicesDetails(null);
        console.error('Error while getting "Co Worker ID".');
        setError('Error while getting "Co Worker ID".');
      }
    }
  }, [isSelected, TeamIds, Id, getMembershipDetails, getInvoicesDetails]);

  function validateNextInvoiceFormat(nextInvoice) {
    const regex =
      /^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{1,2} \d{4} \d{2}:\d{2}:\d{2} [A-Z]{3}\+\d{4}$/;
    return regex.test(nextInvoice);
  }

  const renderListEmpty = () => (
    <View style={styles.emptyContainer}>
      {/* <View style={styles.nothinschedule} > */}
      
      <NoMemo
        stroke={isDarkMode ? AppTheme.COLORS.white : null}
      />
          
      {/* </View> */}
    </View>
  );

  return (
    <Frame
      screenTitle={isSelected === 'Details' ? 'Membership' : 'Memos'}
      mode={'View'}>
      {/* TAB Header */}
      <TabHeader
        tabOneText={'Details'}
        tabTwoText={'Memo(s)'}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        status={status}
      />

      <View style={styles.innerContainer}>
        {isSelected === 'Details' ? (
          <>
            {membershipDetails !== null ? (
              <ScrollView
                contentContainerStyle={[
                  styles.detailContainer,
                  {justifyContent: 'space-between'},
                ]}>
                <View>
                  {status === 'pending' ? (
                    <View
                      style={[
                        styles.testingCont,
                        {
                          borderColor: 'rgba(247, 183, 24, 0.6)',
                          backgroundColor: 'rgba(247, 183, 24, 0.05)',
                        },
                      ]}>
                      <View>
                        <View style={styles.companyContainer}>
                          <Feather
                            name={'clock'}
                            size={24}
                            color={AppTheme.COLORS.pending}
                          />
                          <Txt style={[styles.companyTag, {}]}>
                            {' '}
                            {moment
                              .utc(membershipDetails?.startDate)
                              .format('MMM DD, YYYY')}
                          </Txt>
                        </View>
                        <Txt
                          style={[
                            styles.companyName,
                            {marginLeft: normalize(42)},
                          ]}>
                          Your membership will start soon.
                        </Txt>
                      </View>
                    </View>
                  ) : status === 'expire' ? (
                    <View
                      style={[
                        styles.testingCont,
                        {
                          borderColor: 'rgba(239, 64, 80, 0.6)',
                          backgroundColor: 'rgba(239, 64, 80, 0.05)',
                        },
                      ]}>
                      <View>
                        <View style={styles.companyContainer}>
                          <Feather
                            name={'clock'}
                            size={24}
                            color={AppTheme.COLORS.error}
                          />
                          <Txt style={[styles.companyTag, {}]}>
                            {' '}
                            {moment
                              .utc(membershipDetails?.startDate)
                              .add(membershipDetails?.contractLength, 'months')
                              .format('MMM DD, YYYY')}
                          </Txt>
                        </View>
                        <Txt
                          style={[
                            styles.companyName,
                            {marginLeft: normalize(42)},
                          ]}>
                          Your membership is expired.
                        </Txt>
                      </View>
                    </View>
                  ) : null}

                  <View
                    style={[
                      styles.testingCont,
                      {
                        borderColor: isDarkMode
                          ? status == 'active'
                            ? 'rgba(56, 213, 159, 0.6)'
                            : status == 'pending'
                            ? 'rgba(247, 183, 24, 0.6)'
                            : 'rgba(255, 255, 255, 0.1)'
                          : status == 'active'
                          ? 'rgba(56, 213, 159, 0.6)'
                          : status == 'pending'
                          ? 'rgba(247, 183, 24, 0.6)'
                          : 'rgba(0, 0, 0, 0.1)',

                        backgroundColor: isDarkMode
                          ? status == 'active'
                            ? 'rgba(56, 213, 159, 0.03)'
                            : status == 'pending'
                            ? 'rgba(247, 183, 24, 0.05)'
                            : '#1D1D1D'
                          : status == 'active'
                          ? null
                          : status == 'pending'
                          ? null
                          : null,
                      },
                    ]}>
                    <View style={{flex:0.8}}>
                      <View style={styles.companyContainer}>
                        <MaterialIcons
                          name={'corporate-fare'}
                          size={24}
                          color={
                            isDarkMode ? '#747474' : AppTheme.COLORS.purple
                          }
                        />
                        <Txt style={[styles.companyTag, {}]}>
                          {membershipDetails?.teamName}
                        </Txt>
                      </View>
                      <Txt
                        style={[
                          styles.companyName,
                          {marginLeft: normalize(39)},
                        ]}>
                        Company Name
                      </Txt>
                    </View>

                    <View style={[styles.statusTitleContainer,{flex:0.2}]}>
                      <Txt
                        style={[
                          styles.status,
                          {
                            color:
                              status == 'active'
                                ? AppTheme.COLORS.primaryGreenBg
                                : AppTheme.COLORS.pending,
                          },
                        ]}>
                        {status == 'active'
                          ? 'Active'
                          : status == 'pending'
                          ? 'Pending'
                          : null}
                      </Txt>
                    </View>

                  </View>

                  <View style={styles.planContainer}>
                    <View
                      style={[
                        styles.resourceCont,
                        {
                          borderColor: isDarkMode
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                          backgroundColor: isDarkMode ? '#1D1D1D' : null,
                        },
                      ]}>
                      <View style={styles.planTagContainer}>
                        <View style={styles.companyContainer}>
                          <MaterialIcons
                            name={'corporate-fare'}
                            size={24}
                            color={
                              isDarkMode ? '#747474' : AppTheme.COLORS.purple
                            }
                          />
                          <Txt style={styles.companyTag}>
                            {membershipDetails?.PlanType}
                          </Txt>
                        </View>
                        <TouchableOpacity
                          accessibilityLabel="editBtn"
                          onPress={() => {
                            navigation.navigate(ScreensName.ChangePlan);
                          }}>
                          <MaterialIcons
                            name={'edit'}
                            size={24}
                            color={
                              isDarkMode ? '#747474' : AppTheme.COLORS.purple
                            }
                          />
                        </TouchableOpacity>
                      </View>

                      <Txt
                        style={[
                          styles.companyName,
                          {marginLeft: normalize(39)},
                        ]}>
                        Resource
                      </Txt>

                      <Divider
                        style={[
                          styles.divider,
                          {
                            backgroundColor: isDarkMode
                              ? '#FFFFFF'
                              : 'rgba(0, 0, 0, 0.3)',
                          },
                        ]}
                      />
                      <View>
                        <View style={styles.companyContainer}>
                          <Feather
                            name={'user'}
                            size={24}
                            color={
                              isDarkMode ? '#747474' : AppTheme.COLORS.purple
                            }
                          />

                          <Txt style={styles.companyTag}>
                            {membershipDetails?.teamMembers}
                          </Txt>
                        </View>
                        <Txt
                          style={[
                            styles.companyName,
                            {marginLeft: normalize(39)},
                          ]}>
                          Members
                        </Txt>
                      </View>
                    </View>
                    {/* <View style={[styles.companyNameContainer, {marginTop: 24}]}>
                    <Txt style={styles.companyDetailsHeadingTag}>
                      Next invoice date:
                    </Txt>

                    {membershipDetails.nextInovice &&
                    validateNextInvoiceFormat(membershipDetails.nextInovice) ? (
                        <Txt style={[styles.companyName]}>
                          {moment(
                            membershipDetails.nextInovice,
                            'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ',
                          ).format('DD/MM/YYYY')}
                        </Txt>
                      ) : (
                        <Txt />
                      )}
                  </View> */}
                    {status === 'active' ? (
                      <View
                        style={[
                          styles.testingCont,
                          {
                            borderColor: 'rgba(1, 41, 250, 0.5)',
                            backgroundColor: 'rgba(1, 41, 250, 0.05)',
                            marginTop: AppTheme.SPACINGS.MARGINS.M1,
                          },
                        ]}>
                        <View>
                          <View style={styles.companyContainer}>
                            <Feather
                              name={'clock'}
                              size={24}
                              color={AppTheme.COLORS.purple}
                            />
                            <Txt style={[styles.companyTag, {}]}>
                              {' '}
                              {moment(membershipDetails?.nextInovice).format(
                                'MMM DD, YYYY',
                              )}
                            </Txt>
                          </View>
                          <Txt
                            style={[
                              styles.companyName,
                              {marginLeft: normalize(42)},
                            ]}>
                            Next memo date
                          </Txt>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <View>
                  {status === 'active' ? (
                    <View
                      style={[
                        styles.testingCont,
                        {
                          borderColor: 'rgba(239, 64, 80, 0.6)',
                          backgroundColor: 'rgba(239, 64, 80, 0.05)',
                        },
                      ]}>
                      <View>
                        <View style={styles.companyContainer}>
                          <Feather
                            name={'clock'}
                            size={24}
                            color={AppTheme.COLORS.error}
                          />
                          <Txt style={[styles.companyTag, {}]}>
                            {' '}
                            {moment(membershipDetails?.startDate)
                              .add(membershipDetails?.contractLength, 'months')
                              .format('MMM DD, YYYY')}
                          </Txt>
                        </View>
                        <Txt
                          style={[
                            styles.companyName,
                            {marginLeft: normalize(42)},
                          ]}>
                          Membership expires on.
                        </Txt>
                      </View>
                    </View>
                  ) : null}
                </View>
              </ScrollView>
            ) : (
              <View style={styles.noTeamFoundContainer}>
                {memeDetailRes !== null && memeDetailRes.statusCode === 400 ? (
                  <Txt style={styles.noTeamFound}>Team not found!</Txt>
                ) : (
                  <View style={styles.detailContainer}>
                    <View style={styles.companyNameContainer}>
                      {/* Skeleton */}
                      <SkeletonLoader
                        visible={false}
                        shimmerStyle={styles.defShimmer}
                      />
                    </View>

                    {/* Skeleton */}
                    <SkeletonLoader
                      visible={false}
                      shimmerStyle={styles.defShimmer}
                    />

                    {/* Skeleton */}
                    <SkeletonLoader
                      visible={false}
                      shimmerStyle={[styles.defShimmer]}
                    />
                  </View>
                )}
              </View>
            )}
          </>
        ) : null}

        {/* Invoices List */}
        {isSelected === 'Memo(s)' ? (
          <>
            {invoicesDetails !== null ? (
              <View style={styles.invoiceContainer}>
                <FlatList
                  keyExtractor={index => uuid.v4()}
                  data={invoicesDetails}
                  renderItem={renderItem}
                  ListEmptyComponent={renderListEmpty}
                />
              </View>
            ) : (
              <View style={styles.noTeamFoundContainer}>
                {/* {test ? ( */}
                {invoiceDetailRes !== null &&
                invoiceDetailRes.statusCode === 400 ? (
                  <Txt style={styles.noTeamFound}>No memo found!</Txt>
                ) : (
                  <>
                    {[...Array(3)].map(index => {
                      return (
                        <View key={uuid.v4()} style={styles.invoiceContainer}>
                          <InvoiceCard
                            invoiceTitle={''}
                            accessibilityLabel="invoice"
                            amount={''}
                            resource={''}
                            date={''}
                            status={false}
                            Currency={''}
                            isDataLoaded={true}
                            onPress={() => {}}
                          />
                        </View>
                      );
                    })}
                  </>
                )}
              </View>
            )}
          </>
        ) : null}
      </View>
    </Frame>
  );
};

export default MembershipDetailsScreen;