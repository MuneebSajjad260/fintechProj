import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppTheme } from '../../theme';
import { useSelector } from 'react-redux';
import { scale } from '../../utils/scale';

const Wrapper = ({ style, children, hideShadow, isPressable, ...rest }) => {
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  const wrapperStyles = [
    styles(isDarkMode).wrapper,
    !isDarkMode ? styles().shadow : styles().darkWrapper,
    style,
  ];

  // Conditionally hide shadow based on hideShadow prop
  if (hideShadow) {
    wrapperStyles.splice(1, 1);
  }

  if (isPressable) {
    return (
      <TouchableOpacity style={wrapperStyles} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={wrapperStyles} {...rest}>
      {children}
    </View>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  hideShadow: PropTypes.bool,
  isPressable: PropTypes.bool,
};

Wrapper.defaultProps = {
  hideShadow: false,
  isPressable: false,
};

export const styles = isDarkMode => {
  const isDarkModeActivated = isDarkMode
    ? AppTheme.COLORS.wrapperDarkModeBg
    : AppTheme.COLORS.white;

  let style = {
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    wrapper: {
      padding: scale(10),
      borderRadius: scale(8),
      backgroundColor: isDarkModeActivated,
    },
    darkWrapper: {
      shadowColor: 'transparent',
    },
  };

  return StyleSheet.create(style);
};

export default Wrapper;

//* Documentation
/**
Wrapper is a custom component that provides a container with a
shadow effect, padding, and a background color that depends on the
user's device color scheme preference.
@param {object} props - The component props.
@param {object} [props.style] - The style object to apply to the wrapper.
@param {node} props.children - The content to render inside the wrapper.
@param {boolean} [props.hideShadow=false] - Whether to hide the shadow effect.
@param {boolean} [props.isPressable=false] - Whether the wrapper should be pressable.
@return {JSX.Element} - A View or TouchableOpacity component with
the appropriate styles and shadow effect.
*/