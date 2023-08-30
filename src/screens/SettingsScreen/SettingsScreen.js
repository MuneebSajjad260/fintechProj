import React,{useState,useRef,useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from './SettingsScreen.Style';
//* Components
import {Divider} from 'react-native-paper';
//* Icons
import Accesskey from '../../assets/images/QRIcon.js';
import Notification from '../../assets/images/notificationIcon.js';
//* Others
import {useSelector} from 'react-redux';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
import Frame from '../../shared/components/core/Frame';
import Wrapper from '../../shared/components/core/Wrapper';
import Txt from '../../shared/components/core/Txt';
import {AppTheme} from '../../shared/theme';
//Popover
import { selectUserData } from '../../shared/redux/slices/isadminSlice';
import AsyncStorage from '@react-native-community/async-storage';
import PopupGuide from '../../shared/components/PopOver.js/PopOver.js';

const SettingsScreen = ({navigation}) => {
  // *Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  // popover states
  const {Id}=useSelector(selectUserData);
  const [isGuideVisible, setIsGuideVisible] = useState(false);
  const [guideTarget, setGuideTarget] = useState(null);
  // const [userId, setUserId] = useState('');
  // const handleGuideClose = () => {
  //   setIsGuideVisible(false);
  // };
 
  //popover appears when user login for the first time only
  // useEffect(() => {
    
  //   const checkUserVisitedSettings = async () => {
  //     try {
  //       //const userId = Id; // Get the unique user identifier, e.g., from authentication
  //       // setUserId(Id);

  //       const userVisitedSettings = await AsyncStorage.getItem(`userVisitedSettings_${Id}`);
  //       if (userVisitedSettings === null) {
  //         setIsGuideVisible(true);
  //         await AsyncStorage.setItem(`userVisitedSettings_${Id}`, 'true');
  //       }
  //     } catch (error) {
  //       console.log('AsyncStorage Error:', error);
  //     }
  //   };

  //   checkUserVisitedSettings();
  // }, []);
  
  return (
    <Frame style={styles.innerContainer}>
      {/* Options */}
      <Wrapper style={{margin: AppTheme.SPACINGS.MARGINS.M4}}>
        {/* Notifications */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreensName.NotificationScreen);
          }}>
          <View style={styles.defAlignment}>
            <View>
              <Notification
                stroke={isDarkMode ? AppTheme.COLORS.white : null}
              />
            </View>
            <View>
              <Txt style={styles.tabName}>Notifications</Txt>
              <Txt style={styles.tabInnerText}>Manage notifications</Txt>
            </View>
          </View>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        {/* Access Key */}
        <TouchableOpacity
          ref={guideTarget}
          onPress={() => {
            navigation.navigate(ScreensName.AccessKeyScreen);
          
          }}>
          <View style={styles.defAlignment}>
            <View>
              <Accesskey stroke={isDarkMode ? AppTheme.COLORS.white : null} />
            </View>
            <View>
              <Txt style={styles.tabName}>Access Key</Txt>
              <Txt style={styles.tabInnerText}>
                Scan and see your access key
              </Txt>
            </View>
          </View>
        </TouchableOpacity>
      </Wrapper>
      {/* {isGuideVisible && (
        <PopupGuide
          isVisible={isGuideVisible}
          target={guideTarget}
          onClose={handleGuideClose}
          message={'click to change access key settings'}
        />
      )} */}
    </Frame>
  );
};

export default SettingsScreen;
