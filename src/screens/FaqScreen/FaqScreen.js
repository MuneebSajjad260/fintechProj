import React from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './FaqScreen.style';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import {useDispatch, useSelector} from 'react-redux';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import {useCallback} from 'react';
import {GetFaqs} from '../../shared/redux/action/GetFaqs';
import {useEffect} from 'react';
import {useState} from 'react';
import {AppTheme} from '../../shared/theme';

export default function FaqScreen({navigation}) {
  const [faqList, setFaqList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  //* API Module (Get The FAQ'S List)
  const getFaqApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const {faqs} = await dispatch(GetFaqs()).unwrap();
      console.log('API Response:-------------->', faqs);
      //* Transforming the API response into the required structure
      const sections = Object.keys(faqs).map(title => ({
        title,
        data: faqs[title],
      }));

      setFaqList(sections);
      setIsLoading(false);
    } catch (error) {
      setFaqList([]);
      console.error('Error while getting faqs details: ', error);
      setError('Error while getting faqs details.');
      setIsLoading(false);
    }
  }, []);

  //* API Call
  useEffect(() => {
    getFaqApi();
    return () => {
      setFaqList([]);
    };
  }, [dispatch, navigation]);

  //? SectionList Logic
  //* Render item component
  const renderItem = ({item, index, section}) => {
    // console.log('Item:--------', item.FullText, item.Title, item.Id);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreensName.FaqDetailScreen, {
            title: item.Title,
            desc: item.FullText,
            id: item.Id,
          });
        }}
        style={[
          styles.sectionItemContainer,
          index === 0 && styles.itemFirst,
          index === section.data.length - 1 && styles.itemLast,
          isDarkMode
            ? styles.sectionContainerDark
            : styles.sectionContainerWhite,
        ]}>
        <Txt numberOfLines={3} style={styles.sectionItemTitle}>
          {item.Title}
        </Txt>
        <Txt numberOfLines={2} style={styles.sectionItemDesc}>
          {item.SummaryText}
        </Txt>
      </TouchableOpacity>
    );
  };

  //* Render section header component
  const renderSectionHeader = ({index, section}) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Txt numberOfLines={3} style={styles.sectionHeader}>
          {section.title}
        </Txt>
      </View>
    );
  };

  //? SectionList Deviders
  //* Section Separator
  const SectionItemSeparator = () => <View style={styles.sectionDevider} />;
  //* Item Separator
  const ItemSeparator = () => <View style={styles.devider} />;

  return (
    <Frame mode={'View'} screenTitle="FAQs" style={styles.container}>
      <View style={styles.innerContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={
              isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.darkModeBg
            }
          />
        ) : faqList.length === 0 ? (
          <Txt style={styles.notFound}>No FAQs Found</Txt>
        ) : (
          <SectionList
            sections={faqList}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => item.Id.toString()}
            ItemSeparatorComponent={ItemSeparator}
            SectionSeparatorComponent={SectionItemSeparator}
          />
        )}
      </View>
    </Frame>
  );
}
