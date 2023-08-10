import { Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';


export const FadeInAnimation = (props) => {

  const fadeIn = useRef(new Animated.Value(0)).current;
  useEffect(() => {

    Animated.timing(
      fadeIn, {
        toValue: 1,

        duration: 1000,

        useNativeDriver: true
      },

    ).start();


  }, [fadeIn]);

  return (
    <Animated.View
      style={{ opacity: fadeIn }}>
      {props.children}
    </Animated.View>
  );
};
export const FadeOutAnimation = (props) => {

  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: -100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  // useEffect(() => {

  //     Animated.timing(
  //         fadeIn, {
  //         toValue: 1,

  //         duration: 1000,

  //         useNativeDriver: true
  //     },

  //     ).start()

  //     Animated.timing(
  //         fadeIn, {
  //         toValue: 0,

  //         duration: 1000,

  //         useNativeDriver: true
  //     },

  //     ).start()

  // }, [fadeIn])

  return (

    <Animated.View
      style={{
        // opacity: translation.interpolate({
        //     inputRange: [0, 100],
        //     outputRange: [0, 1],
        // }),
        transform: [
          { translateY: translation },
        ],

      }}>
      {props.children}
    </Animated.View>

  );
};

// export default FadeInAnimation

