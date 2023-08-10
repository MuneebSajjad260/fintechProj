import {  Text, View, Image } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector
} from 'react-redux';
import Wrapper from '../core/Wrapper';
import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme, Images } from '../../theme';
import Txt from '../core/Txt';
import styles from './meetingRoomCard.style';
import ImageItem from '../core/ImageItem';

const MeetingRoomCard = (props) => {
  const { item,description,visitor } = props;
  const isDarkMode = useSelector(state=>state?.mode?.colorScheme);
  return (
    <>
      <Wrapper style={[styles.card,{opacity: visitor ? 0.5 : 1}]}>
        { console.log('id iss---',item?.Id)}
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
        
        <View style={styles.innerContainer}>
          <Txt style={styles.title}>Meeting Room</Txt>

          <View style={styles.flexDirection}>
            <Feather
              name="users"
              size={12}
              solid
              color={ isDarkMode ? AppTheme.COLORS.greyLight : AppTheme.COLORS.purple}
            />
            <Txt style={styles.capacity}>{item?.Allocation}</Txt>
          </View>

        </View>
        <Txt style={[styles.desc,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }]}>{description}</Txt>
      </Wrapper>
    </>
  );
};

export default MeetingRoomCard;
