import {View, Text, Pressable} from 'react-native';
import React from 'react';
import TickOrange from '../../../assets/images/TickOrange.svg';
import PropTypes from 'prop-types';
import styles from './TeamListItem.styles';
// *Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';
import Txt from '../core/Txt';
import Wrapper from '../core/Wrapper';
import {useSelector} from 'react-redux';
import {AppTheme} from '../../theme';

export default function TeamListItem({
  name,
  credits,
  isSelected,
  onPress,
  isLoading,
  counterVerify,
}) {
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const selected = isSelected === true || isSelected === null;
  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  // Module to Get Random Number Between Provided Min - Max
  // *Used to Get The Random Width in Skeleton
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <Wrapper
      isPressable={true}
      onPress={() => !isLoading && onPress()}
      style={[
        styles.listItem,
        selected && !isLoading && styles.border,
        {
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : '#F4F4F4',
        },
      ]}
      hideShadow
      >
      <View>
        {!isLoading ? (
          <Txt style={styles.listItemName}>
            {counterVerify === name ? `${name} (You)` : name}
          </Txt>
        ) : (
          <SkeletonLoader
            visible={false}
            shimmerStyle={[
              styles.defShimmer,
              {width: `${getRandomInt(60, 80)}%`},
            ]}
          />
        )}
      </View>
      <View style={styles.listItemIconContainer}>
        {!isLoading ? (
          <>
            {selected ? (
              <>
                <Txt style={styles.listItemCredits}>{credits} credits</Txt>
                <View style={styles.listItemTick}>
                  <TickOrange />
                </View>
              </>
            ) : null}
          </>
        ) : (
          <>
            <SkeletonLoader
              visible={false}
              shimmerStyle={[styles.defShimmer]}
            />
            <SkeletonLoader visible={false} shimmerStyle={styles.shimmerIcon} />
          </>
        )}
      </View>
    </Wrapper>
  );
}

TeamListItem.defaultProps = {
  name: '',
  credits: 0,
  isSelected: null,
  isLoading: false,
  counterVerify: '',
};

TeamListItem.propTypes = {
  name: PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  counterVerify: PropTypes.string.isRequired,
};
