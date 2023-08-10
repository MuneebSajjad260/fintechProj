import { Text, View, Image } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';
import CardContainer from '../cardWrapper/CardContainer';
import { Images } from '../../theme';
import styles from './DayPassCard.style';
import Txt from '../core/Txt';
import Wrapper from '../core/Wrapper';
import ImageItem from '../core/ImageItem';


const DayPassCard = (props) => {
  const { item} = props;
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  return (
    <>
      <Wrapper style={styles.cardContainer}>
        {/* <Image
          style={styles.img}
          source={{uri:`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${item?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z` }}
        /> */}
        <ImageItem
          containerStyle={styles.imageContainer}
          priority={'low'}
          imageUrl={`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${item?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`}
          imageStyling={styles.img}
          imgResizeMode={'cover'}
        />
        <View style={styles.allignInRow}>
          <Txt style={styles.title}>{item?.Title}</Txt>
        </View>
      </Wrapper>
    </>
  );
};

export default DayPassCard;
