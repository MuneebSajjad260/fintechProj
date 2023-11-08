import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './AnnouncementCard.Style';
import ClockIcon from '../../../assets/images/ClockIcon.js';
import Dot from '../../../assets/images/Dot.svg';
import {Svg} from 'react-native-svg';
import moment from 'moment';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';

// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';
import {AppTheme} from '../../theme';

const DefaulImagePlaceHolder = require('../../../assets/images/DefaultPlaceholder.png');

export default function AnnouncementCard({item, style, isDataLoaded}) {
  const {title, info, fullText, date, image} = item;
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  // Module to Get Random Number Between Provided Min - Max
  // *Used to Get The Random Width in Skeleton
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // *Calculate the estimated reading time of an article
  function readingTime(value) {
    if (value) {
      const text = value;
      const wpm = 183;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
      return `${time} min read`;
    } else {
      return '0 min read';
    }
  }
  // *Get Formatted Date
  const formatDate = dateString => moment(dateString).format('DD MMM, YYYY');

  return (
    <Wrapper
      style={[
        style,
        styles.container,
        // {
        //   backgroundColor: isDarkMode
        //     ? AppTheme.COLORS.wrapperDarkModeBg
        //     : AppTheme.COLORS.white,
        // },
      ]}>
      {/* Image */}
      {isDataLoaded ? (
        <View>
          {/* TODO: Did not Handle Properly */}
          <Image
            style={styles.img}
            source={!image ? DefaulImagePlaceHolder : {uri: image}}
          />
        </View>
      ) : (
        <>
          {/* Skeleton */}
          <SkeletonLoader visible={isDataLoaded} shimmerStyle={styles.img} />
        </>
      )}
      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Title and Description*/}
        <View>
          {isDataLoaded ? (
            <Txt numberOfLines={1} style={styles.heading}>
              {title || ''}
            </Txt>
          ) : (
            <>
              {/* Skeleton */}
              <SkeletonLoader
                key={getRandomInt(100, 300)}
                visible={isDataLoaded}
                shimmerStyle={{
                  borderRadius: normalize(5),
                  width: `${getRandomInt(70, 90)}%`,
                  marginBottom: normalize(8),
                }}
              />
            </>
          )}
          {isDataLoaded ? (
            <Txt style={styles.description} numberOfLines={2}>
              {info || ''}
            </Txt>
          ) : (
            <>
              {/* Skeleton */}
              {[...Array(3)].map(index => {
                return (
                  <SkeletonLoader
                    key={getRandomInt(100, 300)}
                    visible={isDataLoaded}
                    shimmerStyle={{
                      borderRadius: normalize(5),
                      marginVertical: normalize(3.5),
                      width: `${getRandomInt(85, 100)}%`,
                      height: 10,
                    }}
                  />
                );
              })}
            </>
          )}
        </View>

        {/* Date and Duration */}
        {isDataLoaded ? (
          <View style={styles.date_duration}>
            <View style={styles.dateContainer}>
              {/* Clock Icon */}
              <View style={{marginRight: 8}}>
                {/* <Svg width={'100%'}> */}
                <ClockIcon
                  width={16}
                  height={16}
                  color={
                    isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black
                  }
                />
                {/* </Svg> */}
              </View>
              {/* Date */}
              <Txt style={styles.time}>{formatDate(date?.split('T')[0])}</Txt>
            </View>
            {/* Dot */}
            <View style={styles.dot}>
              <Svg width={'100%'}>
                <Dot />
              </Svg>
            </View>
            {/* Duration */}
            <Txt style={styles.time}>
              {info ? readingTime(fullText) : '1 min read'}
            </Txt>
          </View>
        ) : (
          <>
            {/* Skeleton */}
            <SkeletonLoader
              key={getRandomInt(100, 300)}
              visible={isDataLoaded}
              shimmerStyle={[styles.skeleton, {width: '80%', marginTop: 5}]}
            />
          </>
        )}
      </View>
    </Wrapper>
  );
}

AnnouncementCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    fullText: PropTypes.string.isRequired,
    date: PropTypes.any.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isDataLoaded: PropTypes.bool,
};
