import React, {useState, useEffect, useCallback} from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './NotificationScreen.Style';
import SpeakerIcon from '../../assets/images/SpeakerIcon.js';
import ToggleSwitch from 'toggle-switch-react-native';
import {AppTheme} from '../../shared/theme';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Wrapper from '../../shared/components/core/Wrapper';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {GetNotificationSettings} from '../../shared/redux/action/GetNotificationSettings';
import {PatchNotificationSettings} from '../../shared/redux/action/PatchNotificationSettings';

const notificationItems = [
  {
    label: 'Notify 30 minutes before closing time',
    value: 'notification30MintBefore',
  },
  {label: 'Notify for any new bookings', value: 'notificationForNewBookings'},
  {
    label: 'Notify if any booking request is approved',
    value: 'notificationBookingApproved',
  },
  {
    label: 'Notify a week before memo due date',
    value: 'notificationInvoiceDue',
  },
];

const NotificationScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdated, setIsLoadingUpdated] = useState(true);
  const [error, setError] = useState(null);
  const [toggleStates, setToggleStates] = useState({});
  const {Id} = useSelector(selectUserData);
  const dispatch = useDispatch();

  //* Fetch Notification Settings API
  const fetchNotificationSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const {statusCode, notifications: data} = await dispatch(
        GetNotificationSettings(Id),
      ).unwrap();
      if (statusCode === 200) {
        if (Object.keys(data).length === 0) {
          console.log('Inside Immediately Update!');
          // Empty response, set default values to false
          const defaultSettings = notificationItems.reduce(
            (acc, item) => ({
              ...acc,
              [item.value]: false,
            }),
            {},
          );
          setToggleStates(defaultSettings);
          // Call updateNotificationSetting with default values
          await updateNotificationSetting();
        } else {
          setToggleStates(data);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error while getting notification details: ', error);
      setError('Error while getting notification details.');
      setIsLoading(false);
    }
  }, [dispatch, Id]);

  useEffect(() => {
    fetchNotificationSettings();
  }, [fetchNotificationSettings]);

  //* Update Notification Setting API
  const updateNotificationSetting = useCallback(
    async (value, key) => {
      try {
        setIsLoadingUpdated(true);
        let updatedSettings;
        if (Object.keys(toggleStates).length === 0) {
          // If toggleStates is empty, set default values to false for all options
          updatedSettings = notificationItems.reduce((acc, item) => {
            acc[item.value] = false;
            return acc;
          }, {});
        } else {
          updatedSettings = {
            ...toggleStates,
            [key]: value,
          };
        }
        const craftedData = {Id, body: updatedSettings};
        const res = await dispatch(
          PatchNotificationSettings(craftedData),
        ).unwrap();
        console.log(res);
        setToggleStates(updatedSettings);
        setIsLoadingUpdated(false);
      } catch (error) {
        console.error('Error while updating notification details: ', error);
        setError('Error while updating notification details.');
        setIsLoadingUpdated(false);
      }
    },
    [dispatch, toggleStates, Id],
  );

  const handleToggleSwitch = (value, key) => {
    updateNotificationSetting(value, key);
  };

  return (
    <Frame>
      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <SpeakerIcon stroke={AppTheme.COLORS.white} />
          <Txt style={styles.headerTxt}>Notification Settings</Txt>
        </View>
        {/* Card */}
        {!isLoading ? (
          <Wrapper style={styles.cardContainer}>
            {notificationItems.map((item, index) => (
              <View key={index} style={styles.listItemContainer}>
                <Txt style={styles.listItemsText}>{item.label}</Txt>
                <ToggleSwitch
                  isOn={toggleStates[item.value] || false}
                  onColor={AppTheme.COLORS.purple}
                  offColor={AppTheme.COLORS.white}
                  thumbOffStyle={styles.thumbOffStyle}
                  trackOffStyle={styles.trackOff}
                  onToggle={value => handleToggleSwitch(value, item.value)}
                />
              </View>
            ))}
          </Wrapper>
        ) : (
          <ActivityIndicator size={'large'} color={AppTheme.COLORS.white} />
        )}
      </View>
    </Frame>
  );
};

export default NotificationScreen;
