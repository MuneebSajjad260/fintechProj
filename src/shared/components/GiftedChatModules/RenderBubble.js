import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {scale} from '../../utils/scale';
import {formatAMPM} from '../../utils/global';
import {AppTheme} from '../../theme';
import ImageItem from '../core/ImageItem';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../redux/slices/isadminSlice';

const data = {
  //* Text
  currentMessage: {
    type: 'text',
    text: 'Lorem Ipsum is',
    createdAt: new Date(),
  },
  //* Image
  currentMessage: {
    type: 'image',
    images: [
      'https://plus.unsplash.com/premium_photo-1684966119641-f4248f1df850?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    ],
    createdAt: new Date(),
    size: '4 MB',
    extention: 'JPG',
  },
};

const RenderBubble = ({bubbleProps, setIsImageVisible, setImagePath}) => {
  const {Id: ownId} = useSelector(selectUserData) || {};
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  // console.log('Id 1:---------', bubbleProps.currentMessage.user._id);
  // console.log('Id 2:---------', bubbleProps.currentMessage.user.helpDeskId);
  // console.log('Id 3:---------', ownId);

  const currentUser =
    bubbleProps.currentMessage.user._id === ownId ? true : false;
  const currentType = bubbleProps.currentMessage.type;
  let pathSet = setImagePath;

  if (currentType == 'text') {
    return (
      <View style={styles(currentUser, isDarkMode).bubbleWrap}>
        <Text style={styles(currentUser).chatText}>
          {bubbleProps.currentMessage.text}
        </Text>
        <Text style={styles(currentUser).time}>
          {formatAMPM(new Date(bubbleProps.currentMessage.createdAt))}
        </Text>
        {/* Bottom Curve Shape */}
        <View style={styles(currentUser, isDarkMode).chatPointer} />
      </View>
    );
  } else if (currentType == 'image') {
    return (
      <View style={styles(currentUser).bubbleWrap}>
        {bubbleProps.currentMessage.images.length >= 2 ? (
          <View
            style={{
              padding: 10,
            }}>
            {/* Image Outside Container */}
            <TouchableOpacity style={styles().imageOuter}>
              {bubbleProps.currentMessage.images
                .slice(0, 4)
                .map((image, index) => (
                  <View key={image}>
                    <View
                      style={[
                        styles().moreContainer,
                        {
                          display:
                            bubbleProps.currentMessage.images.length > 4 &&
                            index == 3
                              ? 'flex'
                              : 'none',
                        },
                      ]}>
                      <Text style={styles().more}>{`+${
                        bubbleProps.currentMessage.images.length - 4
                      }`}</Text>
                    </View>
                    <View>
                      <Image
                        source={{uri: image}}
                        style={{
                          width: 120,
                          height: 80,
                          borderRadius: 5,
                          margin: scale(4),
                          opacity:
                            bubbleProps.currentMessage.images.length > 4 &&
                            index == 3
                              ? 0.2
                              : 1,
                        }}
                      />
                    </View>
                  </View>
                ))}
            </TouchableOpacity>
            {/* Bottom Information (File Size & Timestamp + Tick) */}
            <View style={styles().alignment}>
              {/* TODO: Make it Dynamic */}
              <Text style={[styles().fileProperty, {marginTop: 5}]}>
                4:06 MB . png
              </Text>
              <View style={[styles().info, {padding: 0, marginTop: 5}]}>
                <Text style={styles().time}>
                  {formatAMPM(new Date(bubbleProps.currentMessage.createdAt))}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              padding: AppTheme.SPACINGS.PADDINGS.P5,
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsImageVisible(true);
                pathSet(bubbleProps.currentMessage.images[0]);
              }}
              style={
                {
                  // backgroundColor: AppTheme.COLORS.white,
                  // padding: 2,
                  // borderRadius: 8,
                  // marginVertical: scale(2),
                }
              }>
              {bubbleProps.currentMessage.images.map(image => {
                return (
                  <ImageItem
                    key={image}
                    imageUrl={image}
                    priority={'high'}
                    imgResizeMode={'cover'}
                    imageStyling={{
                      width: scale(230, true),
                      height: scale(120),
                      borderRadius: scale(4),
                    }}
                  />
                );
              })}
            </TouchableOpacity>
            <View
              style={{
                alignSelf: 'flex-end',
              }}>
              <View
                style={[styles(currentUser).info, {padding: 0, marginTop: 5}]}>
                <Text style={styles(currentUser).time}>
                  {formatAMPM(new Date(bubbleProps.currentMessage.createdAt))}
                </Text>
              </View>
            </View>
          </View>
        )}
        {/* Bottom Curve Shape */}
        <View style={styles(currentUser).chatPointer} />
      </View>
    );
  }
};

export default memo(RenderBubble);

const styles = (currentUser, isDarkMode) => {
  return StyleSheet.create({
    bubbleWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      position: 'relative',
      marginVertical: scale(10),
      backgroundColor: currentUser
        ? AppTheme.COLORS.chatBg
        : !isDarkMode && !currentUser
        ? AppTheme.COLORS.chatBgLight
        : AppTheme.COLORS.white,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      borderBottomRightRadius: currentUser ? 0 : 8,
      borderBottomLeftRadius: currentUser ? 8 : 0,
    },
    chatText: {
      color: currentUser ? AppTheme.COLORS.white : AppTheme.COLORS.black,
      padding: scale(10),
      fontSize: AppTheme.FONTS.SIZE.TEXT.T2,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
    },
    time: {
      color: currentUser ? AppTheme.COLORS.white : AppTheme.COLORS.black,
      fontSize: 10,
      paddingHorizontal: scale(10, true),
      paddingVertical: scale(2),
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    },
    chatPointer: {
      backgroundColor: currentUser
        ? AppTheme.COLORS.chatBg
        : !isDarkMode && !currentUser
        ? AppTheme.COLORS.chatBgLight
        : AppTheme.COLORS.white,
      width: 10,
      position: 'absolute',
      bottom: -8,
      ...(currentUser && {right: 0}),
      borderBottomLeftRadius: currentUser ? 20 : 0,
      borderBottomRightRadius: currentUser ? 0 : 20,
      height: 8,
    },
    imageOuter: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '100%',
      backgroundColor: 'rgba(34, 181, 221, 0.2)',
      padding: 7,
      borderRadius: 8,
      marginVertical: scale(5),
    },
    fileProperty: {
      color: currentUser ? AppTheme.COLORS.white : AppTheme.COLORS.black,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
    },
    alignment: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    moreContainer: {
      zIndex: 1,
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    more: {
      color: currentUser ? AppTheme.COLORS.white : AppTheme.COLORS.black,
      fontSize: AppTheme.FONTS.SIZE.HEADINGS.H4,
      fontFamily: AppTheme.FONTS.TYPE.SEMIBOLD,
    },
  });
};
