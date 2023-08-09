import { Text, View, Image} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme} from '../../theme';
import {useSelector} from 'react-redux';
import ImageItem from '../core/ImageItem';
import styles from './ReSheduleDayPassCard.style';

const ReScheduleDayPassCard = (props) => {
  const {item} = props;
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  return (
    <>

      <Wrapper style={styles.card}>
        {console.log('show me id ----22',item?.id)}
       
        <View>
          <ImageItem
            containerStyle={styles.imageContainer}
            priority={'low'}
            imageUrl={`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${item?.id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`}
            imageStyling={styles.img}
            imgResizeMode={'cover'}
          />
          <View style={[styles.statusContainer,{backgroundColor:item?.status=='pending' ? AppTheme.COLORS.yellow :
            item?.status == 'approved' ? AppTheme.COLORS.primaryGreenBg :  AppTheme.COLORS.error  }]}>
            <Text style={styles.statusTxt} >{ item?.status == 'approved' ? 'Confirmed' : item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}</Text>

          </View>
        </View>
        <View style={styles.allign}>
          <Txt style={styles.officeNo}>{item?.officeNo}</Txt>
          <View style={styles.flexDirection}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={22}
              solid
              color={isDarkMode ?  AppTheme.COLORS.greyLight : AppTheme.COLORS.purple}
            />
            <Txt style={styles.today}>{item?.today}</Txt>
          </View>
        </View>
      </Wrapper>

    </>
  );
};

export default ReScheduleDayPassCard;
