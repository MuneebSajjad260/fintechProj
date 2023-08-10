import { View,Text} from 'react-native';
// eslint-disable-next-line no-unused-vars
import { Svg } from 'react-native-svg';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';

import { PrimaryButton } from '../primaryButton/PrimaryButton.js';
import styles from './NetworkError.style';
import NoInternet from '../../../assets/images/noInternet.svg';

const NetworkError = (props) => {
  const {error}=props;
  console.log('error--please!',error ? true : false);
  const [isVisible,setIsVisible]=useState(false);

  useEffect(()=>{
    setIsVisible(error ? true : false);
  },[error]);
  return (
    <>
      <Modal 
        visible={isVisible} 
        animationType="fade" 
        transparent 
        statusBarTranslucent
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}    
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
        
            <View style={styles.logoutImg}>
              <Svg width={'100%'} >
                <NoInternet />
              </Svg>
            </View>
            <Text style={styles.modalTitle}>No internet connection</Text>
            <Text style={styles.modalText}>
            Make sure that your wifi and cellular data 
             is turned on and try again.
            </Text>
           
            <View style={styles.btnContainer}>
              <PrimaryButton 
                title={'Try again'}
                onPress={()=>setIsVisible(false)}
              />
          
            </View>
          </View>
        </View>
      </Modal>
    
    </>
  );

};

export default NetworkError ;
