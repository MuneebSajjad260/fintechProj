import React, {forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, ToastAndroid, Pressable, Platform,Alert} from 'react-native';
import QRIcon from '../../../assets/images/QRAccessCodeIcon.js';
import {useSelector} from 'react-redux';
import {scale} from '../../utils/scale.js';
import {ScreensName} from '../../constants/ScreensStrings.js';
import Toast from 'react-native-root-toast';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppTheme} from '../../theme/index.js';

const QRButton = forwardRef(
  ({onPress = () => {}, isDragAble=true, navigation, scaleValue,block,dayPass}, ref) => {
    const isDarkMode = useSelector(state => state.mode.colorScheme);
    const QRDirection = useSelector(state => state.qrAsset.qrDirection);
    const derivedScaleValue = useDerivedValue(() => scaleValue.value);
    const hiz = useSharedValue(0);
    useAnimatedReaction(
      () => {
        return derivedScaleValue.value;
      },
      value => {
        hiz.value = value;
      },
      [],
    );

    useImperativeHandle(ref, () => ({
    
      startAnimation() {
        if(block){
          if(dayPass){
            navigation.replace(ScreensName.dayPassHomeScreen,{dragBlocked:true});
          }
          else{
            navigation.replace(ScreensName.MeetingHomeScreen,{dragBlocked:true});
          }
        }else{
          navigation.navigate('QRStack', {screen: ScreensName.QRCodeScreen});
        }
      },
      
    }));

    const styleAnimated = useAnimatedStyle(() => {
      const scaleValueInterpolation = interpolate(
        hiz.value,
        [0, 100],
        [1, 30],
        Extrapolate.CLAMP,
      );
      return {
        transform: [
          {
            scale: withTiming(scaleValueInterpolation, {duration: 40}),
          },
        ],
      };
    });
    console.log('block---block',block);
    //* Show Toaster
    const showToastWithGravity = () => {
      if (isDragAble) {
        if(Platform.OS === 'android'){
          ToastAndroid.showWithGravity(
            'Drag upwards for key',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
        else{
          Toast.show('Drag upwards for key', {
            duration: 5000,
            position: scale(-70),
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black,
            textColor: isDarkMode ? AppTheme.COLORS.black : AppTheme.COLORS.white,
            opacity: 1,
          });
        }
      }
    };
    const showBlockToast= () => {
   
      if(Platform.OS === 'android'){
        ToastAndroid.showWithGravity(
          'Access unavailable at this time',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      else{
        Toast.show('Access unavailable at this time', {
          duration: 5000,
          position: scale(-70),
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor:isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black,
          textColor: isDarkMode ? AppTheme.COLORS.black : AppTheme.COLORS.white,
          opacity: 1,
        });
      }
      
    };
   
    return (
      <>
      
        <Animated.View
          style={[
            styles.container,
            styleAnimated,
            QRDirection === 'right' ? styles.right : styles.left,
          ]}
        />
        <Pressable
          style={[
            styles.container,
            QRDirection === 'right' ? styles.right : styles.left,
          ]}
          onPress={() => {
            onPress();
            if(block && !isDragAble){
              showBlockToast();
            }
            else{
              showToastWithGravity();
            }
          }}>
          <QRIcon color={isDarkMode ? AppTheme.COLORS.white : null} />
        </Pressable>
     
      </>
    );
  }

);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme.COLORS.darkModeBg,
    width: scale(55, true),
    height: scale(55),
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
  },
  right: {
    position: 'absolute',
    right: 0,
    bottom: 24,
  },
  left: {
    position: 'absolute',
    left: 0,
    bottom: 24,
  },
});

export default QRButton;
