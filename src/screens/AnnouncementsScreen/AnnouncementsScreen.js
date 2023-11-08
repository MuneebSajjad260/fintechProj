import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, Text, View, Animated, SafeAreaView} from 'react-native';
import styles from './AnnouncementsScreen.style';
import PropTypes from 'prop-types';
import moment from 'moment';

// Icons
import {Svg} from 'react-native-svg';
import ClockIcon from '../../assets/images/ActiveClockIcon.svg';
// Mock Data
import AnnouncementData from '../../MockData/Announcement.json';
const DefaultImagePlaceHolder = require('../../assets/images/DefaultPlaceholder.png');
// Bottom Sheet
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppTheme} from '../../shared/theme';
import normalize from 'react-native-normalize';
// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Frame from '../../shared/components/core/Frame';
import {useSelector} from 'react-redux';
import Txt from '../../shared/components/core/Txt';

export default function AnnouncementsScreen({route}) {
  // *Get Passed Data
  const {
    item: {FullText, Title, PublishDate, SummaryText, PostedByFullName, Id},
  } = route.params;
  // *Bottom Sheet Layout Watcher
  const [fullScreenLayout, setFullScreenLayout] = useState(false);
  // *Skeleton Trigger
  const [isDataLoaded, setDataStatus] = useState(true);
  // *Animated Values
  const FadeIn = useState(new Animated.Value(0))[0];
  const article = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const credit = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const date = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const image = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const imageFadeIn = useState(new Animated.Value(0))[0];

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

  // *Body Text Content Operations
  const FirstWordOfString = FullText.replace(/<[^>]+>/g, '').substring(0, 1);
  const RestOfString = FullText.replace(/<[^>]+>/g, '').substring(1);
  // *Get Formatted Date
  const formatDate = dateString => moment(dateString).format('DD MMM, YYYY');

  // ?Bottom Sheet
  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  // callbacks
  const handleSheetChanges = useCallback(index => {
    // Condition for Changing Layout of Header in Full Screen Mode
    if (index === 1) {
      setFullScreenLayout(true);
    } else {
      setFullScreenLayout(false);
    }
  }, []);

  // ?Animations Logic

  // Base Animation Function
  const animate = (
    value,
    useNativeDriver = true,
    toValue = 1,
    duration = 1000,
  ) => {
    return Animated.timing(value, {
      toValue,
      duration,
      useNativeDriver,
    });
  };

  // Image Animation
  const animateImage = (
    imagePosition,
    imageFadeIn,
    positions = {x: normalize(100), y: normalize(0)},
    opacity,
  ) => {
    // Multiple Animations Run on Parallel
    return Animated.parallel([
      Animated.timing(imagePosition, {
        toValue: positions,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(imageFadeIn, {
        toValue: opacity,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);
  };

  // *Main Animater Function
  const startAnimation = () => {
    if (!fullScreenLayout) {
      // Animate The Whole Screen on 1st Time
      animate(FadeIn, undefined, undefined, 1500).start();
      // Animate Back to its Original Position
      animate(date, true, {x: normalize(0), y: normalize(2)}).start();
      animate(credit, true, {x: normalize(0), y: normalize(0)}).start();
      animate(article, true, {x: normalize(0), y: normalize(0)}).start();
      animateImage(
        image,
        imageFadeIn,
        {x: normalize(0), y: normalize(80, 'height')},
        0,
      ).start();
    } else {
      // Animate The Date, Credit and Image
      animate(date, true, {
        x: normalize(-110, 'width'),
        y: normalize(55, 'height'),
      }).start();
      animate(credit, true, {
        x: normalize(110, 'width'),
        y: normalize(0),
      }).start();
      animate(article, true, {
        x: normalize(0),
        y: normalize(50, 'height'),
      }).start();
      animateImage(
        image,
        imageFadeIn,
        {x: normalize(0), y: normalize(2, 'height')},
        1,
      ).start();
    }
  };

  // *Trigger the animations on each drag of bottom sheet
  useEffect(() => {
    startAnimation();
  }, [fullScreenLayout]);

  // ?Animations Logic End

  return (
    <Frame>
      {/* <GestureHandlerRootView style={styles.gestureContainer}> */}
      {/* BG Image */}
      <View style={styles.imageContainer}>
        <Image
          accessibilityLabel="Background Image"
          style={styles.img}
          source={
            Id && isDataLoaded
              ? {
                  uri: `https://nexudus.spaces.nexudus.com/en/blog/GetLargeImage/?id=${Id}`,
                }
              : DefaultImagePlaceHolder
          }
        />
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={isDataLoaded ? snapPoints : ['70%']}
        onChange={handleSheetChanges}
        handleStyle={
          fullScreenLayout
            ? {
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.wrapperDarkModeBg
                  : AppTheme.COLORS.white,
              }
            : {}
        }
        handleIndicatorStyle={{display: 'none'}}
        backgroundStyle={{
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : AppTheme.COLORS.white,
        }}>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              backgroundColor: isDarkMode
                ? AppTheme.COLORS.wrapperDarkModeBg
                : AppTheme.COLORS.white,
              opacity: FadeIn,
            },
          ]}>
          {/* Header */}
          <View>
            <View style={{marginBottom: 5}}>
              {/* Image */}
              {isDataLoaded ? (
                <Animated.Image
                  accessibilityLabel="Mini Image"
                  style={[
                    styles.imgMini,
                    {
                      opacity: imageFadeIn,
                      transform: image.getTranslateTransform(),
                      position: 'absolute',
                    },
                  ]}
                  source={
                    Id
                      ? {
                          uri: `https://nexudus.spaces.nexudus.com/en/blog/GetImage/?id=${Id}`,
                        }
                      : DefaultImagePlaceHolder
                  }
                />
              ) : null}

              <View style={styles.header}>
                {isDataLoaded ? (
                  <>
                    {/* Company */}
                    <Animated.View
                      style={[{transform: credit.getTranslateTransform()}]}>
                      {/* Name */}
                      <Txt numberOfLines={1} style={styles.name}>
                        {Title}
                      </Txt>
                      {/* By */}
                      <View style={styles.byContainer}>
                        <Text numberOfLines={1} style={styles.byCredit}>
                          By: {PostedByFullName}
                        </Text>
                      </View>
                    </Animated.View>
                  </>
                ) : (
                  <View>
                    {/* Skeleton */}
                    <SkeletonLoader
                      visible={isDataLoaded}
                      shimmerStyle={[styles.headerSkeleton, {width: '70%'}]}
                    />

                    <SkeletonLoader
                      visible={isDataLoaded}
                      shimmerStyle={[
                        styles.headerSkeleton,
                        {width: '40%', height: 15, marginBottom: 10},
                      ]}
                    />
                  </View>
                )}

                {isDataLoaded ? (
                  <>
                    {/* Date */}
                    <Animated.View
                      style={[
                        styles.dateContainer,
                        {transform: date.getTranslateTransform()},
                      ]}>
                      {/* Icon */}
                      <View style={styles.clockIcon}>
                        <Svg height={25} width={25}>
                          <ClockIcon />
                        </Svg>
                      </View>
                      {/* Date */}
                      <Text numberOfLines={1} style={styles.date}>
                        {formatDate(PublishDate?.split('T')[0])}
                      </Text>
                    </Animated.View>
                  </>
                ) : (
                  <SkeletonLoader
                    visible={isDataLoaded}
                    shimmerStyle={[
                      styles.headerSkeleton,
                      {width: '40%', height: 20},
                    ]}
                  />
                )}
              </View>
            </View>
          </View>
          {/* Body */}
          <Animated.View
            style={[{flex: 1, transform: article.getTranslateTransform()}]}>
            {/* Heading */}
            <View style={[styles.headingContainer]}>
              {isDataLoaded ? (
                // <Text style={styles.heading}>{AnnouncementData.title}</Text>
                <Txt style={styles.heading}>{SummaryText}</Txt>
              ) : (
                <>
                  {/* Skeleton */}
                  {[...Array(3)].map(index => {
                    return (
                      <SkeletonLoader
                        key={getRandomInt(100, 300)}
                        visible={isDataLoaded}
                        shimmerStyle={[
                          styles.headingSkeleton,
                          {width: `${getRandomInt(85, 100)}%`},
                        ]}
                      />
                    );
                  })}
                </>
              )}
            </View>
            {/* Description */}
            <BottomSheetScrollView style={styles.body}>
              {/* Text */}
              <View style={[styles.bodyContainer]}>
                {isDataLoaded ? (
                  <Text style={styles.bodyText}>
                    <Text style={styles.firstWord}>{FirstWordOfString}</Text>
                    {RestOfString}
                  </Text>
                ) : (
                  <>
                    {/* Skeleton */}
                    {[...Array(10)].map(index => {
                      return (
                        <SkeletonLoader
                          key={getRandomInt(1, 100)}
                          visible={isDataLoaded}
                          shimmerStyle={[
                            styles.headingSkeleton,
                            {width: `${getRandomInt(90, 100)}%`},
                          ]}
                        />
                      );
                    })}
                  </>
                )}
              </View>
            </BottomSheetScrollView>
          </Animated.View>
        </Animated.View>
      </BottomSheet>
      {/* </GestureHandlerRootView> */}
    </Frame>
  );
}

AnnouncementsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        FullText: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        PublishDate: PropTypes.any.isRequired,
        SummaryText: PropTypes.string.isRequired,
        PostedByFullName: PropTypes.string.isRequired,
        Id: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
};
