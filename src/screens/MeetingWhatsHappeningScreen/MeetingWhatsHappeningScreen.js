import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
} from 'react-native';

import styles from './MeetingWhatsHappeningScreen.style';
import {AppTheme} from '../../shared/theme';
import AnnouncementCard from '../../shared/components/AnnouncementCard/AnnouncementCard';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import uuid from 'react-native-uuid';

const MeetingWhatsHappeningScreen = ({route, navigation}) => {
  const {feeds} = route.params;
  console.log('feeds----', feeds);
  // const hubClosure = { id: 1, title: 'Hub closure', desc: 'Announcement', info: 'Hub will remain closed from 10th to 13th July on account of National Holiday' };
  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <SafeAreaView style={styles.statusbar} />
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppTheme.COLORS.black}
      />

      <SafeAreaView style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerContainer}>
            {feeds.map(item => (
              // <HubClosureCard key={item?.Id} item={{id: item?.Id , title: item?.Title, desc: 'Announcement', info: item?.SummaryText}}  />
              <Pressable
                accessibilityLabel="Announcement Card"
                key={uuid.v4()}
                onPress={() =>
                  navigation.navigate(ScreensName.AnnouncementScreen, {
                    cardId: item?.Id,
                  })
                }>
                <AnnouncementCard
                  key={item?.Id}
                  item={{
                    id: item?.Id,
                    title: item?.Title,
                    info: item?.SummaryText,
                    date: item?.PublishDate,
                    fullText: item?.FullText,
                    image: `https://nexudus.spaces.nexudus.com/en/blog/GetImage/?id=${item?.Id}`,
                  }}
                  isDataLoaded={true}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MeetingWhatsHappeningScreen;
