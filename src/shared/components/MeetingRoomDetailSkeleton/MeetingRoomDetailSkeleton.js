import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import styles from './MeetingRoomDetailSkeleton.style';
import { getRandomInt } from '../../utils/helper';
import { AppTheme } from '../../theme';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
export default function MeetingRoomDetailSkeleton() {
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  return (
    <View>
        <View style={styles.innerContentSkeleton}>
          <View style={styles.btnLoaderContainer}>
            {[...Array(3)].map(index => {
              return (
                <View>
                  <SkeletonLoader
                    key={getRandomInt(100, 300)}
                    visible={false}
                    shimmerStyle={[styles.btnSkeleton]}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.imgSkeletonContainer}>
            <View style={[styles.imgSkeleton]}>
              <ActivityIndicator
                size={'large'}
                color={AppTheme.COLORS.wrapperDarkModeBg}
                style={styles.loader}
              />
            </View>
          </View>
          <View style={styles.textSkeletonContainer}>
            <SkeletonLoader
              key={getRandomInt(100, 300)}
              visible={false}
              shimmerStyle={[styles.detailSkeleton]}
            />
            <SkeletonLoader
              key={getRandomInt(100, 300)}
              visible={false}
              shimmerStyle={[styles.detailSkeleton, {width: '50%'}]}
            />
          </View>
        </View>
        {/* <View style={styles.timelineSkeletonContainer}>
          <SkeletonLoader
            key={getRandomInt(100, 300)}
            visible={false}
            shimmerStyle={[styles.timelineSkeleton]}
          />
        </View> */}
      </View>
  )
}