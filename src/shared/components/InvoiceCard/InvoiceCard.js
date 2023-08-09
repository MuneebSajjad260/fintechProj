import React from 'react';
import {View} from 'react-native';
import styles from './InvoiceCard.Style';
import {AppTheme} from '../../theme';
import PropTypes from 'prop-types';
import moment from 'moment';
// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import {scale} from '../../utils/scale';

export default function InvoiceCard({
  invoiceTitle,
  amount,
  resource,
  date,
  status,
  onPress,
  accessibilityLabel,
  Currency,
  isDataLoaded,
}) {
  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  return (
    <Wrapper
      isPressable={true}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[
        styles.invoiceContainer,
        isDataLoaded
          ? {borderColor: AppTheme.COLORS.greyLight}
          : {
              borderColor:
                status === true ? AppTheme.COLORS.green : AppTheme.COLORS.red,
            },
      ]}>
      {/* Header */}
      <View style={styles.invoiceHeader}>
        {!isDataLoaded ? (
          <Txt style={styles.heading}>{invoiceTitle}</Txt>
        ) : (
          <>
            {/* Skeleton */}
            <SkeletonLoader visible={false} shimmerStyle={styles.defShimmer} />
          </>
        )}
        <View style={styles.defAlignmentRow}>
          {!isDataLoaded ? (
            <Txt style={styles.heading}>
              {Currency} {amount}
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
      </View>

      {/* Body */}
      <View style={styles.defAlignmentRow}>
        {/* Resources */}
        <View>
          {!isDataLoaded ? (
            <Txt style={styles.resource}>Resource</Txt>
          ) : (
            <SkeletonLoader visible={false} shimmerStyle={styles.defShimmer} />
          )}

          {!isDataLoaded ? (
            <Txt style={styles.detailsText}>{resource}</Txt>
          ) : (
            <>
              {/* Skeleton */}
              <SkeletonLoader
                visible={false}
                shimmerStyle={[styles.defShimmer, {width: scale(150, true)}]}
              />
            </>
          )}
        </View>
        {/* Due */}
        {!status ? (
          <View>
            {!isDataLoaded ? (
              <Txt style={styles.resource}>Due</Txt>
            ) : (
              <SkeletonLoader
                visible={false}
                shimmerStyle={[styles.defShimmer, {width: scale(50, true)}]}
              />
            )}

            {!isDataLoaded ? (
              <Txt style={styles.detailsText}>
                {moment(date).format('DD MMM, YYYY')}
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
        ) : null}
      </View>
    </Wrapper>
  );
}

InvoiceCard.propTypes = {
  invoiceTitle: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  Currency: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string.isRequired,
};

InvoiceCard.defaultProps = {
  invoiceTitle: '',
  amount: 0,
  resource: '',
  date: '',
  status: false,
  Currency: 'SAR',
  accessibilityLabel: 'Invoice Card (Goto: Invoice Detail Screen)',
};
