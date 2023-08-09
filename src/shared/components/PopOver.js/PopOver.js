import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Popover from 'react-native-popover-view';

const PopupGuide = ({ isVisible, target, onClose,message }) => {
  return (
    <Popover
      isVisible={isVisible}
      fromView={target}
      onRequestClose={onClose}
      arrowStyle={{ backgroundColor: 'transparent' }}
      popoverStyle={{ backgroundColor: 'white', padding: 10 }}
      backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <View>
        <Text>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Popover>
  );
};

export default PopupGuide;