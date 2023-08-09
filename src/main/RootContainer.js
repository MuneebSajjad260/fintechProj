// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react';
import {View, useColorScheme} from 'react-native';
import RootNavigation from '../routes';
//* Mode
import {setColorScheme} from '../shared/redux/slices/modeSlice';
import {useDispatch} from 'react-redux';
import {StatusBar} from 'react-native';
import {AppTheme} from '../shared/theme';

const RootContainer = () => {
  //* Mode Logic
  const colorScheme = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  //* Update the state (setColorScheme) according to the device mode either its a "dark" or "light"
  useEffect(() => {
    dispatch(setColorScheme(colorScheme));
  }, [colorScheme, dispatch]);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={AppTheme.COLORS.statusbar}
      />
      <RootNavigation />
    </View>
  );
};

export default RootContainer;
