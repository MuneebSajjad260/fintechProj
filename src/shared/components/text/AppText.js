import React from 'react';
import {Text} from 'react-native';
import {AppTheme} from '@themes';

const AppText = props => {
  const {children, style, ...rest} = props;

  return (
    <Text
      // eslint-disable-next-line react/no-children-prop
      children={children}
      style={[
        {
          color: props?.primary
            ? AppTheme.COLORS.primaryBackground
            : AppTheme.COLORS.greyLight,
          fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export {AppText};
