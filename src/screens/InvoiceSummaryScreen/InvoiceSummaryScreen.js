import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import styles from './InvoiceSummaryScreen.Style';
// Icons & Logo
import FintechLogoLight from '../../assets/images/FintechLogoLight.js';
import UsersIcon from '../../assets/images/UsersIcon.svg';
import BillingPeriodIcon from '../../assets/images/BillingPeriodIcon.svg';
// Others
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'react-native-uuid';
// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
// API
import {GetSingleInvoiceDetail} from '../../shared/redux/action/GetSingleInvoiceDetail';
import {useDispatch, useSelector} from 'react-redux';
import Frame from '../../shared/components/core/Frame';
import {scale} from '../../shared/utils/scale';
import Txt from '../../shared/components/core/Txt';
import {AppTheme} from '../../shared/theme';
import Botton from '../../shared/components/core/Botton';

export default function InvoiceSummaryScreen({navigation, route}) {
  const [error, setError] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  // Get Passed Data
  const {PlanType, address, planDuration, teamMembers, teamName, teamId} =
    route.params.membershipDetails;
  const {
    Paid,
    Id,
    DueDate,
    InvoiceFromDate,
    InvoiceToDate,
    SentOn,
    membershipDetails,
  } = route.params;
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  // *API Modules
  const getInvoiceDetail = useCallback(async () => {
    try {
      const {data} = await dispatch(GetSingleInvoiceDetail(Id)).unwrap();
      setInvoiceDetails(data);
    } catch (error) {
      setInvoiceDetails(null);
      console.error('Error while getting invoice details: ', error);
      setError('Error while getting memo details.');
    }
  }, [dispatch, Id]);

  // *API Call
  useEffect(() => {
    if (Id) {
      getInvoiceDetail();
    } else {
      setInvoiceDetails(null);
      setError('Error while getting memo ID.');
      console.log('Error while getting Invoice ID.');
    }
  }, [Id, getInvoiceDetail]);

  return (
    <Frame
      screenTitle={'Summary'}
      style={{padding: scale(16)}}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <FintechLogoLight
          color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}
        />
        {/* Content */}
        <View style={styles.headerDetailContainer}>
          <Txt style={styles.headerDetail}>
            169-A, Street 2, Al Riyadh{'\n'}+966-54345-65456
          </Txt>
        </View>
      </View>
      {/* Body */}
      <View style={styles.bodyContainer}>
        <View style={styles.body}>
          {/* Team */}
          <View style={styles.teamContainer}>
            <Txt style={styles.defHeading}>Team</Txt>
            <View style={styles.personIconContainer}>
              <UsersIcon />
              <Txt style={styles.numOfMembers}>
                {teamMembers !== null ? teamMembers : ''}
              </Txt>
            </View>
          </View>
          {/* Teams Details */}
          <View>
            {/* Title & Sub Title */}
            <View style={styles.teamDetailsContainer}>
              <Txt numberOfLines={1} style={styles.name}>
                {teamName !== null ? teamName : ''}
              </Txt>
              <Txt style={styles.serial}>{teamId !== null ? teamId : ''}</Txt>
            </View>
            <View style={styles.teamDetailSubContainer}>
              <View>
                <View style={styles.resourceContainer}>
                  <Txt style={styles.defTitle}>Resource plan</Txt>
                  <Txt style={styles.defText}>
                    {PlanType !== null ? PlanType : ''}
                  </Txt>
                </View>
                <View style={styles.addressContainer}>
                  <Txt style={styles.defTitle}>Address</Txt>
                  <Txt
                    numberOfLines={2}
                    style={[styles.defText, styles.address]}>
                    {address !== null ? address : ''}
                  </Txt>
                </View>
              </View>
              <View style={styles.paymentContainer}>
                <Txt style={styles.defTitle}>Payment plan</Txt>
                <Txt style={styles.defText}>
                  {planDuration !== null ? planDuration : ''}
                </Txt>
              </View>
            </View>
          </View>
          <View style={styles.devider} />
          {/* Billing Details */}
          <View style={styles.defSpacing}>
            <Txt style={styles.defHeading}>Billing</Txt>
            <View style={styles.billingDetailContainer}>
              <View>
                <View style={styles.defAlignmentRow}>
                  <Txt style={styles.defTitle}>Memo Date</Txt>
                  <Txt style={styles.defTitle}>Due Date</Txt>
                </View>
              </View>
              <View style={styles.defAlignmentRow}>
                {/* Invoice Date */}
                <View>
                  <Txt style={[styles.defText, styles.defMargin]}>
                    {SentOn !== null
                      ? moment(SentOn.split('T')[0]).format('DD MMM, YYYY')
                      : ''}
                  </Txt>
                </View>

                {/* Due Date */}
                <View>
                  <Txt style={[styles.defText, styles.defMargin]}>
                    {DueDate !== null
                      ? moment(DueDate.split('T')[0]).format('DD MMM, YYYY')
                      : ''}
                  </Txt>
                </View>
              </View>
              <View style={[styles.defAlignmentRow, {alignItems: 'center'}]}>
                <Txt style={styles.defText}>
                  {InvoiceFromDate !== null
                    ? moment(InvoiceFromDate.split('T')[0]).format(
                      'DD MMM, YYYY',
                    )
                    : ''}
                </Txt>
                {/* Billing Period Icon */}
                <View style={styles.billingPeriodIconContainer}>
                  <View style={styles.billingPeriodIcon}>
                    <BillingPeriodIcon />
                  </View>
                  <Txt
                    style={[
                      styles.period,
                      {
                        backgroundColor: isDarkMode
                          ? AppTheme.COLORS.darkModeBg
                          : AppTheme.COLORS.white,
                      },
                    ]}>
                    Billing period
                  </Txt>
                </View>
                <Txt style={styles.defText}>
                  {InvoiceToDate !== null
                    ? moment(InvoiceToDate.split('T')[0]).format('DD MMM, YYYY')
                    : ''}
                </Txt>
              </View>
            </View>
          </View>
          <View style={styles.devider} />
          {/* Products Details */}
          <View style={[styles.defSpacing, {marginBottom: 0}]}>
            <Txt style={styles.defHeading}>Products</Txt>
            <View>
              {/* Product Detail */}
              {invoiceDetails !== null && invoiceDetails.length > 0 ? (
                invoiceDetails.map(
                  ({
                    DisplayAs,
                    CoworkerInvoiceCurrencyCode,
                    UnitPrice,
                    Quantity,
                    SubTotal,
                  }) => {
                    return (
                      <View
                        style={styles.productDetailContainer}
                        key={uuid.v4()}>
                        <View>
                          <View style={styles.productItem}>
                            <Txt numberOfLines={2} style={styles.productTitle}>
                              {DisplayAs}
                            </Txt>
                            {/* <Txt
                              numberOfLines={1}
                              style={styles.productSubTitle}>
                              Sheikh Ahmad
                            </Txt> */}
                          </View>
                        </View>
                        {/* Pricing */}
                        <View>
                          <View style={styles.productItem}>
                            <Txt style={styles.productPrice}>
                              {CoworkerInvoiceCurrencyCode}{' '}
                              {SubTotal.toFixed(2)}
                            </Txt>
                            <Txt style={styles.productCount}>
                              {Quantity} x {UnitPrice.toFixed(2)}
                            </Txt>
                          </View>
                        </View>
                      </View>
                    );
                  },
                )
              ) : (
                <View style={styles.productDetailContainer} key={uuid.v4()}>
                  <View>
                    <View style={styles.productItem}>
                      {[...Array(2)].map(index => {
                        return (
                          <SkeletonLoader
                            key={uuid.v4()}
                            visible={false}
                            shimmerStyle={[styles.defShimmer, {width: 140}]}
                          />
                        );
                      })}
                    </View>
                  </View>
                  {/* Pricing */}
                  <View>
                    <View style={styles.productItem}>
                      {[...Array(2)].map(index => {
                        return (
                          <SkeletonLoader
                            key={uuid.v4()}
                            visible={false}
                            shimmerStyle={[styles.defShimmer, {width: 100}]}
                          />
                        );
                      })}
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.devider} />
          {/* Sub Total */}
          <View style={[styles.defSpacing, {marginBottom: 0}]}>
            <View style={styles.subTotalDetailContainer}>
              <View>
                <Txt style={styles.subtotal}>Subtotal</Txt>
                {invoiceDetails !== null && invoiceDetails.length > 0 ? (
                  <Txt style={styles.subtotalText}>
                    VAT{' '}
                    {invoiceDetails.reduce(
                      (acc, {TaxRate}) => acc + TaxRate,
                      0,
                    ) / invoiceDetails.length}
                    %
                  </Txt>
                ) : (
                  <>
                    {/* Skeleton */}
                    <SkeletonLoader
                      visible={false}
                      shimmerStyle={styles.defShimmer}
                    />
                  </>
                )}
              </View>

              <View>
                {invoiceDetails !== null && invoiceDetails.length > 0 ? (
                  <Txt style={styles.subtotalPrice}>
                    SAR{' '}
                    {invoiceDetails
                      .reduce((acc, {SubTotal}) => acc + SubTotal, 0)
                      .toFixed(2)}
                  </Txt>
                ) : (
                  <>
                    {/* Skeleton */}
                    <SkeletonLoader
                      visible={false}
                      shimmerStyle={[styles.defShimmer, {width: 100}]}
                    />
                  </>
                )}

                {invoiceDetails !== null && invoiceDetails.length > 0 ? (
                  <Txt style={styles.subtotalSubPrice}>
                    {invoiceDetails
                      .reduce((acc, {TaxAmount}) => acc + TaxAmount, 0)
                      .toFixed(2)}
                  </Txt>
                ) : (
                  <>
                    {/* Skeleton */}
                    <SkeletonLoader
                      visible={false}
                      shimmerStyle={[
                        styles.defShimmer,
                        {alignSelf: 'flex-end'},
                      ]}
                    />
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
        {/* Total */}
        <View style={styles.totalDetailContainer}>
          <Txt style={styles.totalTitle}>Total Payable</Txt>
          {invoiceDetails !== null && invoiceDetails.length > 0 ? (
            <Txt style={styles.totalAmount}>
              SAR{' '}
              {(
                invoiceDetails.reduce(
                  (acc, {TaxAmount}) => acc + TaxAmount,
                  0,
                ) +
                invoiceDetails.reduce((acc, {SubTotal}) => acc + SubTotal, 0)
              ).toFixed(2)}
            </Txt>
          ) : (
            <>
              {/* Skeleton */}
              <SkeletonLoader
                visible={false}
                shimmerStyle={[styles.defShimmer, {width: 100}]}
              />
            </>
          )}
        </View>
      </View>
      {/* Button */}
      {!Paid ? (
        <Botton
          loading={false}
          title={'Proceed'}
          disabled={invoiceDetails !== null ? false : true}
          singleButtonStyle={styles.proceedBtn}
          onPress={() =>
            navigation.navigate(ScreensName.InvoiceDetailScreen, {
              invoiceDetails,
              membershipDetails,
              Paid,
              DueDate,
              teamName,
            })
          }
        />
      ) : null}
    </Frame>
  );
}

InvoiceSummaryScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      membershipDetails: PropTypes.shape({
        PlanType: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        planDuration: PropTypes.string.isRequired,
        teamMembers: PropTypes.number.isRequired,
        teamName: PropTypes.string.isRequired,
        teamId: PropTypes.number.isRequired,
      }).isRequired,
      Paid: PropTypes.bool.isRequired,
      Id: PropTypes.number.isRequired,
      DueDate: PropTypes.string.isRequired,
      InvoiceFromDate: PropTypes.string,
      InvoiceToDate: PropTypes.string,
      SentOn: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

InvoiceSummaryScreen.defaultProps = {
  Id: null,
  PlanType: '',
  address: '',
  planDuration: '',
  teamMembers: '',
  teamName: '',
  Paid: false,
  teamId: 0,
  DueDate: '',
  InvoiceFromDate: '',
  InvoiceToDate: '',
  SentOn: '',
};
