import React from 'react';
import {Pressable, View} from 'react-native';
import {AppTheme} from '../../theme';
import styles from './HelpDeskCard.Style';
import PropTypes from 'prop-types';
//* Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
//* Icons
import Headphone from '../../../assets/images/HeadPhoneIcon.js';
//* Others
import normalize from 'react-native-normalize';
import uuid from 'react-native-uuid';
import Txt from '../core/Txt';
import {useSelector} from 'react-redux';
export default function HelpDeskCard({
  title,
  date,
  description,
  status,
  onPress,
  accessibilityLabel,
  isDataLoading,
}) {
  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);
  // Module to Get Random Number Between Provided Min - Max
  // *Used to Get The Random Width in Skeleton
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[isDarkMode ? styles.darkModeContainer : styles.container]}>
      <View>
        {isDataLoading ? (
          <Headphone
            micColor={status === 'Open' ? '#F99B1C' : '#35D7A1'}
            color={
              !isDarkMode
                ? AppTheme.COLORS.wrapperDarkModeBg
                : AppTheme.COLORS.white
            }
          />
        ) : (
          <>
            {/* Skeleton */}
            <SkeletonLoader
              visible={false}
              shimmerStyle={styles.iconShimmer}
            />
          </>
        )}
      </View>
      <View style={styles.rightSideContainer}>
          <View>
            {isDataLoading ? (
              <Txt numberOfLines={1} style={styles.title}>
                {title}
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
             {isDataLoading ? (
          <Txt numberOfLines={1} style={styles.description}>
            {description}
          </Txt>
        ) : (
          <View style={{marginTop: AppTheme.SPACINGS.MARGINS.M7}}>
            {/* Skeleton */}
            {[...Array(1)].map(index => {
              return (
                <View key={uuid.v4()}>
                  <SkeletonLoader
                    visible={false}
                    shimmerStyle={{
                      borderRadius: normalize(5),
                      marginVertical: normalize(5),
                      width: `${getRandomInt(85, 100)}%`,
                      height: 10,
                    }}
                  />
                </View>
              );
            })}
          </View>
        )}
            {isDataLoading ? (
              <Txt style={styles.date}>{date}</Txt>
            ) : (
              <>
                {/* Skeleton */}
                <SkeletonLoader
                  visible={false}
                  shimmerStyle={[styles.defShimmer, {width: normalize(100)}]}
                />
              </>
            )}
          </View>
      </View>
    </Pressable>
  );
}

HelpDeskCard.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Open', 'Closed']).isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
};

HelpDeskCard.defaultProps = {
  title: '',
  status: 'Open',
  date: '',
  description: '',
  accessibilityLabel: 'Help Desk Card',
  isDataLoading: false,
};
