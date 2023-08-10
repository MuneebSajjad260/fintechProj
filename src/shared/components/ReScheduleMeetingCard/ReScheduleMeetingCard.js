import { Text, View, Image} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme, Images } from '../../theme';
import styles from './ReScheduleMeetingCard.style';
import ImageItem from '../core/ImageItem';

const ReScheduleMeetingCard = (props) => {
  const isDarkMode = useSelector(state=>state?.mode?.colorScheme);
  const { item} = props;
  
  

  const TextExtractor = description => {
    const match = description.match(/<span[^>]*>([^<]*)<\/span>/);
    const text = match && match[1];   
    return text;
  };

  return (
    <>

      <Wrapper style={styles.card}>
       
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
        <View style={styles.topAllign}>
          <Txt style={styles.resourceName}>{item?.officeNo}</Txt>
          <View style={styles.flexDirection}>
            <Feather
              name="users"
              size={12}
              solid
              color={isDarkMode ?  AppTheme.COLORS.greyLight : AppTheme.COLORS.purple}
            />
            <Txt style={styles.persons}>{item?.noOfPersons}</Txt>
          </View>


        </View>
        <Txt
          style={[styles.desc,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>
          {TextExtractor(item?.Description ? item?.Description : '' )}
        </Txt>
        <View
          style={styles.midAllign}>
          <View style={styles.flexDirection}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={22}
              solid
              color={isDarkMode ?  AppTheme.COLORS.greyLight : AppTheme.COLORS.purple}
            />
            <View style={styles.marginLeft}>
              <Txt
                style={styles.bookDate}>
                {item?.today}
              </Txt>

              <Txt
                style={[styles.hour,{color : isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>
                {item?.hours}
              </Txt>
            </View>
          </View>

          <View style={[styles.flexDirection,{marginLeft:normalize(30)}]}>
            <AntDesign
              name="clockcircleo"
              size={18}
              solid
              color={isDarkMode ?  AppTheme.COLORS.greyLight : AppTheme.COLORS.purple}
            />
            <View style={styles.marginLeft}>
              <Txt
                style={styles.duration}>
                {item?.duration}
              </Txt>

              <Txt
                style={[styles.durationTime,{color : isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>
                {item?.durationTime}
              </Txt>
            </View>
          </View>

        </View>
        <Divider style={[styles.divider,{backgroundColor:isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}]} />

        <View
          style={styles.flexDirection}>
          <View style={styles.width}>
            <Txt
              style={[styles.bookedOn,{color : isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>
              {item?.bookedOn}
            </Txt>

            <Txt
              style={styles.date}>
              {item?.date}
            </Txt>
          </View>

          <View style={styles.endAllign}>

            <Txt
              style={[styles.bookedBy,{color : isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>
              {item?.bookedBy}
            </Txt>

            <Txt
              style={styles.teamLead}>
              {item?.teamLead}
            </Txt>
          </View>

        </View>
      </Wrapper>

    </>
  );
};

export default ReScheduleMeetingCard;
