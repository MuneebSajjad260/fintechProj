import { Text, View, Image} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector
} from 'react-redux';

import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme, Images } from '../../theme';
import styles from './MeetingSummaryCard.style';
import ImageItem from '../core/ImageItem';

const MeetingSummaryCard = (props) => {
  const { item,startTime, endTime ,date,durationTime,desc ,id, allocation,status,label} = props;
  const isDarkMode = useSelector(state=>state?.mode?.colorScheme);
  // console.log('date---',date,'--',item);



  return (
    <>

      <Wrapper style={styles.card}>
        {/* <Image
          style={styles.img}
          source={{uri:`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z` }}
        /> */}
        <View>
          <ImageItem
            containerStyle={styles.imageContainer}
            priority={'low'}
            imageUrl={`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`}
            imageStyling={styles.img}
            imgResizeMode={'cover'}
          />
          {label ?
            <View style={[styles.statusContainer,{backgroundColor:status=='pending' ? AppTheme.COLORS.yellow :
              status == 'approved' ? AppTheme.COLORS.primaryGreenBg :  AppTheme.COLORS.error  }]}>
              <Text style={styles.statusTxt} >{status === 'approved' ? 'Confirmed' : status.charAt(0).toUpperCase() + status.slice(1)}</Text>

            </View>
            :
            null
          }
        </View>
        <View style={styles.allignItem}>
          <Txt style={styles.resource}>{item?.ResourceName}</Txt>
          {item?.BookingVisitors ? 
            <View style={styles.flexDirection}>
              <Feather
                name="users"
                size={12}
                solid
                color={ isDarkMode ? 'rgba(128, 128, 128, 1)' :AppTheme.COLORS.purple}
              />
              <Txt style={styles.allocation}>{ allocation}</Txt>
            </View>

            :
            null}

        </View>
        <Txt
          style={[styles.desc,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>
          {desc}
        </Txt>
        <View
          style={styles.belowCont}>
          <View style={styles.flexDirection}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={22}
              solid
              color={ isDarkMode ? 'rgba(128, 128, 128, 1)' :AppTheme.COLORS.purple}
            />
            <View style={{ marginLeft: normalize(8) }}>
              <Txt
                style={styles.date}>
                {date}
              </Txt>

              <Txt
                style={[styles.time,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>
                {`${startTime} - ${endTime}`}
              </Txt>
            </View>
          </View>

          <View style={styles.durationCont}>
            <AntDesign
              name="clockcircleo"
              size={18}
              solid
              color={ isDarkMode ? 'rgba(128, 128, 128, 1)' :AppTheme.COLORS.purple}
            />
            <View style={styles.marginLeft}>
              <Txt
                style={styles.duration}>
               Duration
              </Txt>

              <Txt
                style={[styles.durationTime,{color:isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}]}>
                {durationTime}
              </Txt>
            </View>
          </View>

        </View>
      </Wrapper>

    </>
  );
};

export default MeetingSummaryCard;
