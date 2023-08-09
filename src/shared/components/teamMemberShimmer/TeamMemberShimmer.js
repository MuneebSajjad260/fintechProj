import React, { } from 'react';
import { View } from 'react-native';
import normalize from 'react-native-normalize';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const TeamMemberShimmer = props => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const { teamMembersPending, planId } = props;
  return (
    <View>
      <ShimmerPlaceHolder
        visible={teamMembersPending === false}
        shimmerStyle={{
          backgroundColor: 'rgba(134, 134, 134, 0.06)',
          height: normalize(50),
          borderRadius: normalize(4),
          paddingHorizontal: normalize(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: normalize(12),

        }}>
      </ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        visible={teamMembersPending === false}
        shimmerStyle={{
          backgroundColor: 'rgba(134, 134, 134, 0.06)',
          height: normalize(50),
          borderRadius: normalize(4),
          paddingHorizontal: normalize(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: normalize(12),

        }}>
      </ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        visible={teamMembersPending === false}
        shimmerStyle={{
          backgroundColor: 'rgba(134, 134, 134, 0.06)',
          height: normalize(50),
          borderRadius: normalize(4),
          paddingHorizontal: normalize(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: normalize(12),

        }}>
      </ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        visible={teamMembersPending === false}
        shimmerStyle={{
          backgroundColor: 'rgba(134, 134, 134, 0.06)',
          height: normalize(50),
          borderRadius: normalize(4),
          paddingHorizontal: normalize(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: normalize(12),

        }}>
      </ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        visible={teamMembersPending === false}
        shimmerStyle={{
          backgroundColor: 'rgba(134, 134, 134, 0.06)',
          height: normalize(50),
          borderRadius: normalize(4),
          paddingHorizontal: normalize(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: normalize(12),

        }}>
      </ShimmerPlaceHolder>

      {
        planId === 'Yearly' ?
          <ShimmerPlaceHolder
            visible={teamMembersPending === false}
            shimmerStyle={{
              backgroundColor: 'rgba(134, 134, 134, 0.06)',
              height: normalize(50),
              borderRadius: normalize(4),
              paddingHorizontal: normalize(20),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: normalize(12),

            }}>
          </ShimmerPlaceHolder>
          : null
      }

    </View >
  );
};

export { TeamMemberShimmer };
