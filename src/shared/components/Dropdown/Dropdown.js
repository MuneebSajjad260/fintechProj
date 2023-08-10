import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './Dropdown.Style';
import ChevronDownArrow from '../../../assets/images/ChevronDownArrow.svg';
// Skeleton Loading
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import {useSelector} from 'react-redux';
import {AppTheme} from '../../theme';

const Dropdown = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  isLoading,
}) => {
  const [visible, setVisible] = useState(false);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  // *Skeleton Loading
  const SkeletonLoader = createShimmerPlaceholder(LinearGradient);

  const handlePress = () => {
    setVisible(!visible);
  };

  const handleSelect = option => {
    setVisible(false);
    onSelect(option);
  };

  let defaultPlaceholder = '';

  if (!placeholder && options.length > 0) {
    defaultPlaceholder = options[0].Name;
  } else {
    defaultPlaceholder = placeholder;
  }

  return (
    <Wrapper
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : '#EEEEEE',
        },
      ]}
      hideShadow
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (!isLoading) {
            handlePress();
          }
        }}>
        <View style={styles.labelContainer}>
          {!isLoading ? (
            <Txt style={styles.labelText}>
              {selectedValue ? selectedValue.Name : defaultPlaceholder}
            </Txt>
          ) : (
            <SkeletonLoader visible={false} shimmerStyle={styles.defShimmer} />
          )}
          {!isLoading ? (
            <ChevronDownArrow />
          ) : (
            <SkeletonLoader visible={false} shimmerStyle={styles.shimmerIcon} />
          )}
        </View>
      </TouchableWithoutFeedback>
      {visible && (
        <View style={styles.options}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleSelect(option)}>
              <Txt style={styles.optionText}>{option.Name}</Txt>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      Name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      Name: PropTypes.string.isRequired,
    }),
  ]),
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
};

Dropdown.defaultProps = {
  selectedValue: {Id: -1, Name: ''},
  isLoading: false,
};

export default Dropdown;
