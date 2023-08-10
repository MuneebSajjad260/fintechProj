import { Text, View, Image } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme, Images } from '../../theme';
import styles from './ScheduledMeetingCard.style';
import { scale } from '../../utils/scale';
import Wrapper from '../core/Wrapper';


// import Hexagon from '../../../assets/images/Hexagon.svg'

const SceduledMeetingCardHome = (props) => {
  const { item,startTime, endTime ,date,durationTime} = props;
  console.log('date schedule card---',date);

  const today = new Date();
  // today.setHours(0, 0, 0, 0);
  // console.log('test 1---',today);
  const dateObj = moment.utc(date, 'DD, MMM YYYY').toDate();
  // dateObj.setHours(0, 0, 0, 0); 
  // console.log('test 2---',dateObj);
  let dateToShow;
  // console.log('hhhh--111---',dateObj.getDate(),dateObj.getFullYear(),dateObj.getMonth()+1);
  if (dateObj.getDate() === today.getDate() && dateObj.getFullYear() === today.getFullYear() && dateObj.getMonth()+1 ===today.getMonth()+1 ) {
    dateToShow ='Today' ;
  } else {
    // console.log('date schedule card---33',moment(dateObj).format('DD, MMM YYYY'));
    dateToShow =date;
  }
  return (
    <>
      

      <Wrapper style={{
        padding: scale(0), borderRadius: 10,
        backgroundColor: dateToShow === 'Today' ? '#202020' : AppTheme.COLORS.white,
        width: scale(306),
        elevation: 3,
        borderWidth: dateToShow === 'Today' ? 0 : 1,
        borderColor: dateToShow === 'Today' ? null : AppTheme.COLORS.black,
        marginLeft:AppTheme.SPACINGS.MARGINS.M1,
       
      }}>
        <Image
          style={styles.img}
          source={Images.polyGon}
        />
      
     
   
        <View
          style={{
            height: scale(24),
            width: scale(69),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            borderTopRightRadius: 8,
            top: 0,
            right: 0,
            // paddingVertical: scale(6),
            // paddingHorizontal: scale(10),
            backgroundColor: AppTheme.COLORS.purple
          }}
        >
          <Text style={{
            fontSize:AppTheme.FONTS.SIZE.SUBTITLES.TAG,
            fontFamily: AppTheme.FONTS.TYPE.REGULAR,
            color: dateToShow === 'Today' ? AppTheme.COLORS.white : AppTheme.COLORS.white,
            lineHeight: scale(12)
          }}>UPCOMING</Text>
        </View>
        <View style={{ padding: scale(12) }}>
          <Text style={{
            fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
            fontFamily: AppTheme.FONTS.TYPE.REGULAR,
            color: dateToShow === 'Today' ? AppTheme.COLORS.white : AppTheme.COLORS.black,
            lineHeight: scale(15)
          }}>{item?.ResourceName}</Text>
          {item?.BookingVisitors ? 
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: scale(3)
            }}>
              <Feather
                name="users"
                size={16}
                solid
                color={AppTheme.COLORS.orange}
              />
              <Text style={{
                fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
                fontFamily: AppTheme.FONTS.TYPE.REGULAR,
                marginLeft: scale(5),
                color: dateToShow === 'Today' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
              }}>{`${item?.BookingVisitors?.length  } members invited`}</Text>
            </View>
            :   
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: scale(3)
            }}>
            
              <Text style={{
                fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
                fontFamily: AppTheme.FONTS.TYPE.REGULAR,
                marginLeft: scale(5),
                color: dateToShow === 'Today' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
              }}></Text>
            </View>}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: scale(20)
            }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={22}
                solid
                color={AppTheme.COLORS.orange}
              />
              <View style={{ marginLeft: scale(8) }}>
                <Text
                  style={{
                    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
                    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
                    color: dateToShow === 'Today' ? AppTheme.COLORS.white : AppTheme.COLORS.black,

                  }}>
                  {dateToShow}
                </Text>

                <Text
                  style={{
                    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
                    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
                    color: dateToShow === 'Today' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                    marginTop: scale(6)

                  }}>
                  {`${startTime} - ${endTime}`}
                </Text>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: scale(10)
            }}>
              <AntDesign
                name="clockcircleo"
                size={18}
                solid
                color={AppTheme.COLORS.orange}
              />
              <View style={{ marginLeft: scale(8) }}>
                <Text
                  style={{
                    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.S1,
                    fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
                    color: dateToShow === 'Today' ? AppTheme.COLORS.white : AppTheme.COLORS.black,

                  }}>
                  Duration
                </Text>

                <Text
                  style={{
                    fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
                    fontFamily: AppTheme.FONTS.TYPE.REGULAR,
                    color: dateToShow === 'Today' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                    marginTop: scale(6)

                  }}>
                  {durationTime}
                </Text>
              </View>
            </View>

          </View>
        </View>
        
      </Wrapper>
        
      {/* {item?.map(item => (

                
            ))} */}
    </>
  );
};

export default SceduledMeetingCardHome;
