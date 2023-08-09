// import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

const PrimaryView = props => {
  const {children, style, ...rest} = props;

  //   const theme = useTheme();

  return (
    <View
      // eslint-disable-next-line react/no-children-prop
      children={children}
      style={[{backgroundColor: '#ffff33'}, style]}
      {...rest}
    />
  );
};

export {PrimaryView};
