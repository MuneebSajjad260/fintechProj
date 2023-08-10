import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, Animated, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './FaqDetailScreen.style';
import normalize from 'react-native-normalize';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
const systemFonts = [...defaultSystemFonts, 'Montserrat-Regular'];

//* Components
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import ImageItem from '../../shared/components/core/ImageItem';
import {AppTheme} from '../../shared/theme';
//* Bottom Sheet
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
//* Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export default function FaqDetailScreen({route}) {
  // *Get Passed Data
  const {title, desc, id} = route.params;
  const FullText = desc !== null ? desc : '';
  const deviceWidth = Dimensions.get('window').width;
  const source = {
    html: `${FullText}`,
  };
  const mixedStyle = {
    p: {
      color: AppTheme.COLORS.text,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      fontSize: AppTheme.FONTS.SIZE.REGULAR,
      lineHeight: 28,
    },
  };

  // *Bottom Sheet Layout Watcher
  const [fullScreenLayout, setFullScreenLayout] = useState(false);
  // *Skeleton Trigger
  const [isDataLoaded, setDataStatus] = useState(true);
  // *Animated Values
  const FadeIn = useState(new Animated.Value(0))[0];
  const article = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  //* Module to Get Random Number Between Provided Min - Max
  // *Used to Get The Random Width in Skeleton
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // ?Bottom Sheet
  //* ref
  const bottomSheetRef = useRef(null);
  //* variables
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  //* callbacks
  const handleSheetChanges = useCallback(index => {
    //* Condition for Changing Layout of Header in Full Screen Mode
    if (index === 1) {
      setFullScreenLayout(true);
    } else {
      setFullScreenLayout(false);
    }
  }, []);

  // ?Animations Logic
  //* Base Animation Function
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

  // *Main Animater Function
  const startAnimation = () => {
    if (!fullScreenLayout) {
      //* Animate The Whole Screen on 1st Time
      animate(FadeIn, undefined, undefined, 1500).start();
      //* Animate Back to its Original Position
      animate(article, true, {x: normalize(0), y: normalize(0)}).start();
    } else {
      animate(article, true, {
        x: normalize(0),
        y: normalize(0, 'height'),
      }).start();
    }
  };

  // *Trigger the animations on each drag of bottom sheet
  useEffect(() => {
    startAnimation();
  }, [fullScreenLayout]);

  // ?Animations Logic End

  return (
    <Frame headerVariant={'v2'}>
      {/* BG Image */}
      <View style={styles.imageContainer}>
        <ImageItem
          accessibilityLabel="Background Image"
          imageStyling={styles.img}
          imageUrl={`https://nexudus.spaces.nexudus.com/en/faq/GetLargeImage/?id=${id}`}
          priority={'high'}
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
          <Animated.View
            style={[{flex: 1, transform: article.getTranslateTransform()}]}>
            {/* Heading */}
            <View style={[styles.headingContainer]}>
              {isDataLoaded ? (
                <Txt style={styles.heading}>{title ? title : ''}</Txt>
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
            <BottomSheetScrollView
              showsVerticalScrollIndicator={false}
              style={styles.body}>
              {/* Text */}
              <View style={[styles.bodyContainer]}>
                {isDataLoaded ? (
                  <RenderHtml
                    tagsStyles={mixedStyle}
                    contentWidth={deviceWidth}
                    source={source}
                    systemFonts={systemFonts}
                  />
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
    </Frame>
  );
}

FaqDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
