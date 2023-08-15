import {Text, View, Image, FlatList} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import normalize from 'react-native-normalize';
import ImageItem from '../core/ImageItem';
import {useSelector} from 'react-redux';
import Txt from '../core/Txt';
import Wrapper from '../core/Wrapper';
import CardContainer from '../cardWrapper/CardContainer';
import {AppTheme, Images} from '../../theme';
import styles from './SelectMeetingRoomCard.style';
import moment from 'moment';

const SelectMeetingRoomCard = props => {
  const {item, itemStatus, renderItem, data, startTime} = props;
  console.log('itemStatus 1---', item);
  console.log('itemStatus 2---', data);

  const flatListRef = useRef(null); // Create a ref for the FlatList
  // Calculate the index of the selected start time in the data array
  // const startIndex = data.findIndex((item) => item.start === props.start);

  // Calculate the index of the selected end time in the data array
  //  const endIndex = data.findIndex((item) => item.end === props.end);

  // console.log('startTime 22---', startTime);
  // console.log("startIndex-",startIndex)

  function convert12HourTo24Hour(time12h) {
    const time24h = moment(time12h, 'hh:mm A').format('HH:mm');
    return time24h;
  }

  const time24h = convert12HourTo24Hour(startTime);
  console.log('time 24h---', time24h); // Output: "18:00"
  const [matchingIndex, setMatchingIndex] = useState(0);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].time === convert12HourTo24Hour(startTime)) {
        setMatchingIndex(i);
        break;
      }
    }
  }, [startTime]);

  console.log('matchingIndex-', matchingIndex);
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
            ref={ref => {
              console.log('matchingIndex 2===', !!matchingIndex);
              if (!!matchingIndex && matchingIndex >= 0) {
                flatListRef.current = ref; // Assign the ref to flatListRef
                 ref && ref.scrollToIndex({ animated: false, index: matchingIndex });
              } // Scroll to the selected start time initially
            }}
            renderItem={renderItem}
            keyExtractor={item => item.index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{height: normalize(42)}}
            // onScrollToIndexFailed={(info) => {
            //   // Handle the failure, you might want to log an error message or take other action
            //   console.warn("Scroll to index failed:", info);
            // }}
            getItemLayout={(data, index) => ({
              length: normalize(42),
              offset: normalize(39) * index,
              index,
            })}
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
