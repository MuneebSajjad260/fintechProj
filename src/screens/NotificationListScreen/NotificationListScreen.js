import React, {useState, useCallback, useEffect} from 'react';
import {View, SectionList, TouchableOpacity} from 'react-native';
import styles from './NotificationListScreen.Style';
// Icons
import BellIcon from '../../assets/images/BellIcon.svg';
import BellIconActive from '../../assets/images/BellIconWithYellowDot.svg';
import Entypo from 'react-native-vector-icons/Entypo';
// Others
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import NotificationsData from '../../MockData/Notifications.json';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import {AppTheme} from '../../shared/theme';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
// Test
import database from '@react-native-firebase/database';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
const moment = require('moment');

const NotificationListScreen = ({navigation}) => {
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  //* SectionList
  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (Object.values(ScreensName).includes(item.redirect_to)) {
          navigation.navigate(item.redirect_to);
        } else {
          console.log('Not Redirect');
        }
      }}
      style={styles.notificationContainer}>
      <View style={{justifyContent: 'space-between', ...styles.defAlignment}}>
        <View style={styles.defAlignment}>
          <View style={[styles.shadow, styles.iconContainer]}>
            {/* {item.recent ? <BellIconActive /> : <BellIcon />} */}
            {false ? <BellIconActive /> : <BellIcon />}
          </View>
          <View style={styles.notificationContent}>
            <Txt numberOfLines={1} style={styles.notificationTitle}>
              {item.title}
            </Txt>
            <Txt numberOfLines={2} style={styles.notification}>
              {item.description}
            </Txt>
          </View>
        </View>
        <View>
          <View style={{marginLeft: 10}}>
            <View style={{marginLeft: 16}}>
              {/* <TouchableOpacity
                onPress={() => {
                  console.log('Under Construction, Discuss Him About Me!');
                }}>
                <Entypo name="dots-three-vertical" size={14} color="#D9D9D9" />
              </TouchableOpacity> */}
            </View>
            <Txt style={styles.time}>{moment(item.time).format('h:mm a')}</Txt>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const SectionHeader = ({section}) => (
    <Txt style={styles.notificationHeader}>{section.title}</Txt>
  );

  //! Test start
  //* API Module (Get The Notifications List)
  // TODO: Dynamic Me
  // const {Id} = useSelector(selectUserData);
  const Id = '110011';
  useEffect(() => {
    // Reference to the Realtime Database path where notifications are stored for the user
    const notificationsRef = database().ref(`/users/${Id}`);

    // Update 'seen' value to true for each notification
    const markNotificationsAsSeen = () => {
      notificationsRef.once('value', snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            const notificationKey = childSnapshot.key;
            const notificationData = childSnapshot.val();

            // Check if the notification is not seen and update it to 'seen: true'
            if (!notificationData.seen) {
              notificationsRef.child(notificationKey).update({seen: true});
            }
          });
        }
      });
    };

    const onValueChange = database()
      .ref(`/users/${Id}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          // console.log('Old Data:---------', snapshot.val());
          const objectLength = Object.keys(snapshot.val()).length;
          if (objectLength > 0) {
            const groupedData = groupNotificationsByDate(snapshot.val());
            setNotifications(groupedData);
            // console.log('Grouped Data:---------', JSON.stringify(groupedData));

            // Mark notifications as seen in Realtime Database
            markNotificationsAsSeen();
          } else {
            setError('Something went wrong!');
            setNotifications([]);
          }
        } else {
          setError('Something went wrong!');
          setNotifications([]);
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${Id}`).off('value', onValueChange);
  }, [Id]);

  const groupNotificationsByDate = data => {
    if (!data || typeof data !== 'object') {
      // If data is not an object or is null/undefined, return an empty array
      return [];
    }

    // Separate notifications into different arrays based on their time
    const todayData = [];
    const yesterdayData = [];
    const olderData = [];

    const currentTime = new Date();
    const yesterdayTime = new Date(currentTime.getTime() - 86400000);

    Object.keys(data).forEach(key => {
      const notification = data[key];
      const notificationDate = new Date(notification.time);

      if (notificationDate.toDateString() === currentTime.toDateString()) {
        todayData.push(notification);
      } else if (
        notificationDate.toDateString() === yesterdayTime.toDateString()
      ) {
        yesterdayData.push(notification);
      } else {
        const notificationDateInPast = notificationDate < currentTime;
        if (notificationDateInPast) {
          olderData.push(notification);
        }
      }
    });

    // Combine all the sections in the correct order
    const groupedData = [
      {title: 'Today', data: todayData},
      {title: 'Yesterday', data: yesterdayData},
      {title: 'Older', data: olderData},
    ];

    return groupedData;
  };
  //! Test end

  return (
    <Frame>
      {notifications.length >= 1 ? (
        <SectionList
          contentContainerStyle={styles.secContainer}
          sections={notifications}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item item={item} />}
          renderSectionHeader={({section}) => (
            <SectionHeader section={section} />
          )}
          ItemSeparatorComponent={({section, index}) =>
            index !== section.data.length - 1 && (
              <Divider
                style={[
                  styles.divider,
                  {
                    backgroundColor: isDarkMode
                      ? AppTheme.COLORS.text
                      : AppTheme.COLORS.greyLight,
                  },
                ]}
              />
            )
          }
        />
      ) : (
        <View style={styles.notFoundContainer}>
          <Txt style={styles.notFound}>No Notifications Found!</Txt>
        </View>
      )}
    </Frame>
  );
};

export default NotificationListScreen;
