import {Text, View, Image} from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';
import styles from './TeamLeadHomeCard.Style';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import ImageItem from '../core/ImageItem';

const TeamLeadHomeCard = props => {
  const {description, title, image, buttonTxt, id, homeResource,visitor} = props;
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  return (
    <Wrapper style={[styles.cardContainer,{  opacity: visitor ? 0.5 : 1}]}>
      {/* <Image
        style={styles.imgContainer}
        source={
          homeResource
            ? image
            : {
              uri: `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`,
            }
        }
      /> */}

      <ImageItem
        containerStyle={styles.imageContainer}
        priority={'low'}
        imageUrl={homeResource ? image :
          `https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`}
        imageStyling={styles.imgContainer}
        imgResizeMode={'cover'}
      />
      <View style={styles.allignInRow}>
        <View style={styles.subContainer}>
          <Txt style={styles.titleTxt}>{title}</Txt>
          <Txt style={[styles.descTxt,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }]}>{description}</Txt>
        </View>
        {buttonTxt ? (
          <View style={styles.btnContainer}>
            <Txt style={styles.btnTxt}>{buttonTxt}</Txt>
          </View>
        ) : null}
      </View>
    </Wrapper>
  );
};

export default TeamLeadHomeCard;
