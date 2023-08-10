import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './PrintingCreditListItem.style';
import TeamCreditsBlueIcon from '../../../assets/images/TeamCreditsBlueIcon.js';
// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import {useSelector} from 'react-redux';
import {AppTheme} from '../../theme';

const PrintingCreditListItem = ({printingCredits, isLoading}) => {
  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  return (
    <Wrapper style={styles.printingCreditContainer}>
      <View style={styles.printingCreditLeftContainer}>
        <View>
          {!isLoading ? (
            <TeamCreditsBlueIcon
              stroke={isDarkMode ? AppTheme.COLORS.white : null}
            />
          ) : (
            <SkeletonLoader visible={false} shimmerStyle={styles.shimmerIcon} />
          )}
        </View>
        {!isLoading ? (
          <Txt style={styles.printingPriceTitle}>Printing Credit</Txt>
        ) : (
          <SkeletonLoader visible={false} shimmerStyle={styles.defShimmer} />
        )}
      </View>
      <View style={styles.printingCreditRightContainer}>
        {!isLoading  ? (
          <>
            <Txt style={styles.printingPriceTag}>
              {printingCredits !== null ? printingCredits.currency : ''}
            </Txt>
            <Txt style={styles.printingPrice}>
              {printingCredits !== null ? printingCredits.credit : 0}
            </Txt>
          </>
        ) : (
          <SkeletonLoader
            visible={false}
            shimmerStyle={[styles.defShimmer, {width: 70}]}
          />
        )}
      </View>
    </Wrapper>
  );
};

PrintingCreditListItem.propTypes = {
  printingCredits: PropTypes.shape({
    currency: PropTypes.string,
    credit: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
};

PrintingCreditListItem.defaultProps = {
  printingCredits: null,
  isLoading: false,
};

export default PrintingCreditListItem;
