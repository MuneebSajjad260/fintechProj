import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../../../shared/theme/images';
import PropTypes from 'prop-types';

export default function ImageItem({
  containerStyle,
  priority,
  imageUrl,
  imageStyling,
  imgResizeMode,
  ...props
}) {
  return (
    <View style={{...containerStyle}}>
      <FastImage
        style={[styles.defImageStyling, imageStyling]}
        defaultSource={Images.imgPlaceholder}
        source={{
          uri: imageUrl,
          priority: priority,
        }}
        resizeMode={imgResizeMode}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  defImageStyling: {
    height: '100%',
    width: '100%',
  },
});

ImageItem.propTypes = {
  containerStyle: PropTypes.object,
  imageStyling: PropTypes.object,
  imgResizeMode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'center']),
  priority: PropTypes.oneOf(['low', 'normal', 'high']),
  imageUrl: PropTypes.string,
};

ImageItem.defaultProps = {
  containerStyle: {},
  imageStyling: {},
  imgResizeMode: 'cover',
  priority: 'normal',
};

/**
 * A component to display an image using FastImage.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} [props.containerStyle] - The style object for the container view.
 * @param {string} [props.priority='normal'] - The priority of the image loading.
 * @param {string} props.imageUrl - The URL of the image.
 * @param {Object} [props.imageStyling] - The style object for the image.
 * @param {string} [props.imgResizeMode='cover'] - The resize mode for the image.
 * @returns {React.Element} The rendered element.
 */
