import React from 'react';
import {View, Text, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import TeamCreditsBlueIcon from '../../../assets/images/TeamCreditsBlueIcon.js';
import styles from './AddCreditListItem.style';
import {ScreensName} from '../../constants/ScreensStrings';
import uuid from 'react-native-uuid';

// *Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import {useSelector} from 'react-redux';
import {AppTheme} from '../../theme/index.js';

const AddCreditListItem = ({
  id,
  name,
  price,
  currencyCode,
  navigation,
  isLoading,
}) => {
  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  const handlePress = () => {
    navigation.navigate(ScreensName.PurchaseCreditScreen, {
      Id: id,
      Name: name,
      Price: price,
      CurrencyCode: currencyCode,
    });
  };

  return (
    <Wrapper
      isPressable={true}
      accessibilityLabel="credits"
      style={styles.wrapperContainer}
      onPress={handlePress}>
      <View style={styles.printingCreditContainer}>
        <View style={styles.printingCreditLeftContainer}>
          {/* Icon */}
          <View>
            {isLoading ? (
              <TeamCreditsBlueIcon
                stroke={isDarkMode ? AppTheme.COLORS.white : null}
              />
            ) : (
              <SkeletonLoader
                visible={false}
                shimmerStyle={styles.shimmerIcon}
              />
            )}
          </View>
          <View>
            {isLoading ? (
              <>
                <Txt style={styles.printingPriceTitle}>{name}</Txt>
                <Txt style={styles.printingPriceSubTitle}>{price} Credits</Txt>
              </>
            ) : (
              <>
                {[100, 90].map(item => {
                  return (
                    <View key={index => uuid.v4()}>
                      <SkeletonLoader
                        visible={false}
                        shimmerStyle={[styles.defShimmer, {width: item}]}
                      />
                    </View>
                  );
                })}
              </>
            )}
          </View>
        </View>
        {/* Amount */}
        <View style={styles.printingCreditRightContainer}>
          {isLoading ? (
            <>
              <Txt style={styles.printingPriceTag}>{currencyCode}</Txt>
              <Txt style={styles.printingPrice}>{price}</Txt>
            </>
          ) : (
            <>
              <SkeletonLoader
                visible={false}
                shimmerStyle={styles.defShimmer}
              />
            </>
          )}
        </View>
      </View>
    </Wrapper>
  );
};

AddCreditListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currencyCode: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

AddCreditListItem.defaultProps = {
  id: 0,
  name: '',
  price: 0,
  currencyCode: '',
  navigation: {},
  isLoading: false,
};

export default AddCreditListItem;
