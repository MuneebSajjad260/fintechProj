import React, { useState } from 'react';
import { StyleSheet, View, Modal, Platform } from 'react-native';
import LottieView from 'lottie-react-native';

import { AppTheme } from '../../theme';

const Loader = props => {
  const { loading} = props;
  const [activeModalIndex, setActiveModalIndex] = useState(0);

  return (
    loading ?
      <Modal
        key={(Math.random() * 1000).toString()}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {
          // console.log('close modal')
          setActiveModalIndex(activeModalIndex + 1);
        }}>
        <View style={[styles.modalBackground, { backgroundColor: Platform.OS === 'ios' ? 'rgba(0,0,0, .7)' : 'rgba(0,0,0, .1)' }]}>
          <LottieView
            resizeMode='cover'
            style={styles.imgGIF}
            source={require('../../../assets/lottiefiles/loader.json')} autoPlay loop />
        </View>
      </Modal>
      :
      null
  );
};
export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    flex: .5,
    backgroundColor: AppTheme.COLORS.transparent,
    height: '20%',
    width: '60%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imgGIF: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
});