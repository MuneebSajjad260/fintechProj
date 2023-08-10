import {View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import styles from './InternetConnectivity.style';
import {AppTheme} from '../../theme/index.js';
import {scale} from '../../utils/scale';

const InternetConnectivity = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showBackToLive, setShowBackToLive] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      if (state.isConnected && !isConnected) {
        setShowBackToLive(true);
        setTimeout(() => {
          setShowBackToLive(false);
        }, 1000);
      }
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  return !isConnected ? (
    <View style={styles.mainContainer}>
      <Feather
        name={'wifi-off'}
        size={scale(16)}
        color={AppTheme.COLORS.white}
      />
      <Text style={styles.noInternetText}>No internet connection.</Text>
    </View>
  ) : showBackToLive ? (
    <View
      style={[styles.mainContainer, {backgroundColor: AppTheme.COLORS.green}]}>
      <Feather name={'wifi'} size={scale(16)} color={AppTheme.COLORS.white} />
      <Text style={styles.noInternetText}>Back to Live</Text>
    </View>
  ) : null;
};

export default InternetConnectivity;