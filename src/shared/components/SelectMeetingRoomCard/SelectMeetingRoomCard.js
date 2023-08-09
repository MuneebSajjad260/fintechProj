import {Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import ImageItem from '../core/ImageItem';
import {useSelector} from 'react-redux';
import Txt from '../core/Txt';
import Wrapper from '../core/Wrapper';
import CardContainer from '../cardWrapper/CardContainer';
import {AppTheme, Images} from '../../theme';
import styles from './SelectMeetingRoomCard.style';

const SelectMeetingRoomCard = props => {
  const {item, itemStatus, renderItem, data, ref} = props;
  console.log('itemStatus---', item);
  console.log('itemStatus---', data);
  console.log('--ref--', ref);
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);

  const TextExtractor = description => {
    if (item?.Description) {
      const match = description.match(/<span[^>]*>([^<]*)<\/span>/);
      const text = match && match[1];
      // console.log('text---', text);
      return text;
    }
  };

  return (
    <>
      <Wrapper
        style={[
          styles.card,
          {
            backgroundColor: isDarkMode
              ? AppTheme.COLORS.wrapperDarkModeBg
              : AppTheme.COLORS.white,
          },
        ]}>
        <View style={styles.imgCont}>
          <ImageItem
            containerStyle={styles.imageContainer}
            priority={'low'}
            imageUrl={`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${item?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`}
            imageStyling={styles.img}
            imgResizeMode={'cover'}
          />
        </View>
        <View style={styles.rowContainer}>
          <Txt style={styles.title}>{item?.Title}</Txt>
        </View>
        <View style={styles.descCont}>
          <Txt
            style={[
              styles.desc,
              {
                color: isDarkMode
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(0, 0, 0, 0.5)',
              },
            ]}>
            {TextExtractor(item?.Description)}
          </Txt>
        </View>

        <View style={styles.flatList}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.index.toString()}
            ref={ref}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{height: normalize(42)}}
          />
        </View>

        <View style={styles.checkAvail}>
          <View style={styles.flexDirection}>
            <View style={styles.unavailableCont}></View>
            <Txt
              style={[
                styles.unavailable,
                {
                  color: isDarkMode
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(0, 0, 0, 0.5)',
                },
              ]}>
              Unavailable
            </Txt>
          </View>

          <View
            style={[
              styles.flexDirection,
              {
                marginLeft: normalize(16),
              },
            ]}>
            <View style={styles.availableCont}></View>
            <Txt
              style={[
                styles.unavailable,
                {
                  color: isDarkMode
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(0, 0, 0, 0.5)',
                },
              ]}>
              Available
            </Txt>
          </View>
        </View>
      </Wrapper>
    </>
  );
};

export default SelectMeetingRoomCard;