import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: 'center',
    padding: 4,

    //borderRadius: 4,
  },
  text: {

    fontSize: 10,
    color: '#000000',
    fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD
  },
});
export default memo(Label);