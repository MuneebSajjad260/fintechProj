import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import database from '@react-native-firebase/database';
import PushNotification from 'react-native-push-notification';
//* Icons
import LogoWithName from '../../../assets/images/fintechHomeScreenLogo.svg';
import Menu from '../../../assets/images/menuIcon.svg';
import BackIcon from '../../../assets/images/BackButtonWithBg.js';
import NotificationLink from '../../../assets/images/HeaderNotificationIcon.svg';
import Close from '../../../assets/images/HeaderCloseIcon.svg';
import FintechBottomLogo from '../../../assets/images/FintechBottomLogo.svg';
import FintechBottomLogoDark from '../../../assets/images/FintechBottomLogoFrameDark.svg';
//* Others
import {SCROLL_VIEW, VIEW} from '../../constants/Strings';
import {scale} from '../../../shared/utils/scale';
import {AppTheme} from '../../theme';
import {useSelector} from 'react-redux';
import {ScreensName} from '../../constants/ScreensStrings';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Txt from './Txt';
import InternetConnectivity from '../InternetConnectivity/InternetConnectivity';
import {
  preventScreenshots,
  useEnableSecureView,
  useDisableSecureView,
  addScreenshotListener,
} from '../../../shared/utils/preventScreenShots';

// New Props
// scrollViewProps
// renderRightComp
// preventScreenShoot (Add doc)

const Frame = forwardRef(
  (
    {
      children,
      mode,
      headerVariant,
      bottomLogo,
      style,
      containerStyle,
      showBottomSheet,
      snapPoints,
      bottomSheetContent,
      enablePanDownToClose,
      bottomSheetProps,
      customBackDrop,
      backDropComp,
      screenTitle,
      hideBack,
      restrictBack,
      headerColor,
      customNavigation,
      scrollViewProps,
      renderRightComp,
      preventScreenShoot,
      ...props
    },
    ref,
  ) => {
    const [badgeCount, setBadgeCount] = useState(0);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const {name: ScreenName} = useRoute();
    const isDarkMode = useSelector(state => state.mode.colorScheme);
    //* Get Notifications Badge Count
    // TODO: Dynamic Me
    // const {Id} = useSelector(selectUserData);
    const Id = '110011';
    const badgeCountRef = useRef(0); // Using a ref to store the badge count
    useEffect(() => {
      const notificationsRef = database().ref(`/users/${Id}`);

      // Update badge count when data changes in the Realtime Database
      const onValueChange = notificationsRef.on('value', snapshot => {
        if (snapshot.exists()) {
          let unseenCount = 0; // Initialize the count of unseen objects

          // Loop through each notification in the snapshot
          snapshot.forEach(childSnapshot => {
            const notificationData = childSnapshot.val();
            if (!notificationData.seen) {
              // If 'seen' is false, increment the count of unseen objects
              unseenCount++;
            }
          });

          // Update badge count and application icon badge number
          badgeCountRef.current = unseenCount;
          setBadgeCount(unseenCount);
          PushNotification.setApplicationIconBadgeNumber(unseenCount);
        } else {
          // No data, reset badge count to 0
          badgeCountRef.current = 0;
          setBadgeCount(0);
          PushNotification.setApplicationIconBadgeNumber(0);
        }
      });

      // Stop listening for updates when no longer required
      return () => {
        notificationsRef.off('value', onValueChange);
      };
    }, [Id]);
    //* Bottom Sheet Logic
    const bottomSheetRef = useRef(null);
    const renderBackdropBottomSheet = useCallback(
      props => (
        <BottomSheetBackdrop
          BackdropPressBehavior={'close'}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      ),
      [],
    );
    //* Listen Bottom Sheet Event From Parent
    useImperativeHandle(ref, () => ({
      expandBottomSheet: () => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.snapToIndex(0);
        }
      },
      closeBottomSheet: () => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.close();
        }
      },
    }));
    //* Screen Navigator
    const handleBackPress = () => {
      if (customNavigation && customNavigation.screen) {
        // Navigate to the defined path if customNavigation prop is provided
        navigation.navigate(customNavigation.screen);
      } else {
        // Otherwise, go back using the goBack() function
        navigation.goBack();
      }
    };
    //* Main View Mode: (View || ScrollView)
    const content =
      mode === SCROLL_VIEW ? (
        <GestureHandlerRootView style={{flex: 1}}>
          <ScrollView
            style={[styles(isDarkMode).container, style]}
            contentContainerStyle={[styles().contentContainer, containerStyle]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            {...scrollViewProps}>
            {children}
            <View style={styles().btmLogoContainer}>
              {bottomLogo ? (
                isDarkMode ? (
                  <View style={styles().btmLogo}>
                    <FintechBottomLogoDark />
                  </View>
                ) : (
                  <View style={styles().btmLogo}>
                    <FintechBottomLogo />
                  </View>
                )
              ) : null}
            </View>
          </ScrollView>
          {showBottomSheet && (
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              index={-1}
              enablePanDownToClose={enablePanDownToClose}
              enabledInnerScrolling={true}
              backdropComponent={
                customBackDrop ? backDropComp : renderBackdropBottomSheet
              }
              backgroundStyle={{
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.wrapperDarkModeBg
                  : AppTheme.COLORS.white,
              }}
              handleIndicatorStyle={{
                backgroundColor: '#D9D9D966',
              }}
              {...bottomSheetProps}>
              {bottomSheetContent}
            </BottomSheet>
          )}
        </GestureHandlerRootView>
      ) : (
        <GestureHandlerRootView style={{flex: 1}}>
          <View style={[styles(isDarkMode).container, style]}>{children}</View>
          <View style={styles().btmLogoContainer}>
            {bottomLogo ? (
              isDarkMode ? (
                <View style={styles().btmLogo}>
                  <FintechBottomLogoDark />
                </View>
              ) : (
                <View style={styles().btmLogo}>
                  <FintechBottomLogo />
                </View>
              )
            ) : null}
          </View>
          {showBottomSheet && (
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              index={-1}
              enablePanDownToClose={enablePanDownToClose}
              enabledInnerScrolling={true}
              backdropComponent={
                customBackDrop ? backDropComp : renderBackdropBottomSheet
              }
              backgroundStyle={{
                backgroundColor: isDarkMode
                  ? AppTheme.COLORS.wrapperDarkModeBg
                  : AppTheme.COLORS.white,
              }}
              handleIndicatorStyle={{
                backgroundColor: '#D9D9D966',
              }}
              containerStyle={
                {
                  // zIndex: 1
                }
              }
              elevation={20000}
              {...bottomSheetProps}>
              {bottomSheetContent}
            </BottomSheet>
          )}
        </GestureHandlerRootView>
      );
    //* Return Header Based on Passed Variant
    const Header = variant => {
      switch (variant) {
        case 'blank':
          return null;
        case 'v1':
          return (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles().backWithScrnName}>
                {!hideBack ? (
                  <Pressable
                    hitSlop={{top: 60, bottom: 60, left: 60, right: 60}}
                    onPress={handleBackPress}>
                    <BackIcon
                      bgFill={
                        headerColor === 'white' ? 'transparent' : '#D9D9D9'
                      }
                      fill={
                        headerColor
                          ? AppTheme.COLORS.black
                          : AppTheme.COLORS.white
                      }
                    />
                  </Pressable>
                ) : null}
                <Txt
                  numberOfLines={1}
                  style={styles(undefined, hideBack, headerColor).screenName}>
                  {screenTitle !== '' ? screenTitle : ScreenName}
                </Txt>
              </View>
              <View>{renderRightComp}</View>
            </View>
          );
        case 'v2':
          return (
            <View style={styles().backWithScrnName}>
              {!hideBack ? (
                <Pressable
                  hitSlop={{top: 60, bottom: 60, left: 60, right: 60}}
                  onPress={handleBackPress}>
                  <BackIcon
                    bgFill={headerColor === 'white' ? 'transparent' : '#D9D9D9'}
                    fill={
                      headerColor
                        ? AppTheme.COLORS.black
                        : AppTheme.COLORS.white
                    }
                  />
                </Pressable>
              ) : null}
            </View>
          );
        case 'v3':
          return (
            <View style={styles().defAlignmentWithSpBtw}>
              <LogoWithName width={81} height={47} />
              <View style={styles().rightSideLinks}>
                <Pressable
                  onPress={() =>
                    navigation.navigate(ScreensName.NotificationListScreen)
                  }
                  style={styles().notificationIcon}>
                  <NotificationLink />

                  {/* Badge */}
                  {badgeCount !== 0 && (
                    <View style={styles().badgeContainer}>
                      <View style={styles().badgeInnerContainer}>
                        <Txt style={styles().badgeText}>{badgeCount}</Txt>
                      </View>
                    </View>
                  )}
                </Pressable>
                <Pressable
                  hitSlop={{top: 60, bottom: 60, left: 20, right: 60}}
                  onPress={() =>
                    navigation.navigate(ScreensName.mainMenuScreen)
                  }>
                  <Menu />
                </Pressable>
              </View>
            </View>
          );
        case 'v4':
          return (
            <View style={styles().defAlignmentWithSpBtw}>
              <LogoWithName width={81} height={47} />
              <Pressable
                hitSlop={{top: 60, bottom: 60, left: 60, right: 60}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Close height={scale(16)} width={scale(16)} />
              </Pressable>
            </View>
          );
        default:
          return (
            <View style={styles().backWithScrnName}>
              {!hideBack ? (
                <Pressable
                  hitSlop={{top: 60, bottom: 60, left: 60, right: 60}}
                  onPress={handleBackPress}>
                  <BackIcon
                    bgFill={headerColor === 'white' ? 'transparent' : '#D9D9D9'}
                    fill={
                      headerColor
                        ? AppTheme.COLORS.black
                        : AppTheme.COLORS.white
                    }
                  />
                </Pressable>
              ) : null}
              <Txt
                numberOfLines={1}
                style={styles(undefined, hideBack, headerColor).screenName}>
                {screenTitle !== '' ? screenTitle : ScreenName}
              </Txt>
            </View>
          );
      }
    };

    //* Restrict User To Go Back (Module)
    useEffect(() => {
      const backAction = () => {
        if (restrictBack) {
          return true; // Prevent navigating back
        }
        return false; // Allow navigating back
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [restrictBack]);

    //* On IOS (Restrict User to GoBack() if restrictBack: True)
    useEffect(() => {
      if (restrictBack && Platform.OS === 'ios') {
        navigation.setOptions({
          gestureEnabled: false,
          gestureDirection: 'horizontal',
        });
      }
    }, [restrictBack, navigation]);

    //* Prevent User to Take Screen Shoot (Android)
    useEffect(() => {
      if (Platform.OS === 'android') {
        if (preventScreenShoot) {
          preventScreenshots(true);
          const handleScreenshotTaken = () => {
            // Handle screenshot taken event
            console.log('Screenshot taken! No');
          };
          const screenshotListener = addScreenshotListener(
            handleScreenshotTaken,
          );
          return () => {
            preventScreenshots(false);
            screenshotListener();
          };
        } else {
          preventScreenshots(false);
          const handleScreenshotTaken = () => {
            // Handle screenshot taken event
            console.log('Screenshot taken! Yes');
          };
          const screenshotListener = addScreenshotListener(
            handleScreenshotTaken,
          );
          return () => {
            preventScreenshots(false);
            screenshotListener();
          };
        }
      } else if (Platform.OS === 'ios') {
        if (preventScreenShoot) {
          useEnableSecureView();
        } else {
          useDisableSecureView();
        }
      }
    }, [preventScreenShoot]);

    return (
      isFocused && (
        <KeyboardAvoidingView style={{flex: 1}}>
          <SafeAreaView style={styles().superContainer}>
            {/* WHEN INTERNET TURNS OFF */}
            <InternetConnectivity />
            <View
              style={
                styles(undefined, undefined, headerColor, headerVariant).topBar
              }>
              {Header(headerVariant)}
            </View>
            <View style={{flex: 1}}>{content}</View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )
    );
  },
);

export const styles = (isDarkMode, hideBack, headerColor, headerVariant) => {
  const isDarkModeActivated = isDarkMode
    ? AppTheme.COLORS.darkModeBg
    : AppTheme.COLORS.white;

  let style = {
    //* Default
    defAlignmentWithSpBtw: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    //* Containers
    superContainer: {
      flex: 1,
      backgroundColor: AppTheme.COLORS.darkModeBg,
    },
    container: {
      flex: 1,
      backgroundColor: isDarkModeActivated,
      color: '#fff',
    },
    contentContainer: {flexGrow: 1},
    //* Headers
    topBar: {
      paddingVertical: scale(10, false),
      paddingHorizontal: scale(20, true),
      backgroundColor:
        headerVariant !== 'v3' && headerVariant !== 'v4'
          ? headerColor || AppTheme.COLORS.statusbar
          : AppTheme.COLORS.statusbar,
    },
    //* Right Container
    rightSideLinks: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    //* Badge
    badgeContainer: {
      position: 'absolute',
      top: -12,
      left: 8,
    },
    badgeInnerContainer: {
      backgroundColor: AppTheme.COLORS.error,
      borderRadius: 100 / 2,
      height: 23,
      width: 23,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      fontFamily: AppTheme.FONTS.TYPE.MEDIUM,
      fontSize: AppTheme.FONTS.SIZE.SUBTITLES.TAG,
    },
    //* Left Container
    backWithScrnName: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    screenName: {
      fontSize: AppTheme.FONTS.SIZE.TEXT.T1,
      color:
        headerColor === 'white' ? AppTheme.COLORS.black : AppTheme.COLORS.white,
      fontFamily: AppTheme.FONTS.TYPE.REGULAR,
      marginLeft: hideBack ? 0 : scale(12),
      width: '90%',
    },
    //* Icons Styling
    notificationIcon: {
      marginHorizontal: scale(24),
    },
    //* Bottom Logo
    btmLogoContainer: {
      backgroundColor: isDarkModeActivated,
      zIndex: 1,
    },
    btmLogo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  };

  return StyleSheet.create(style);
};

Frame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['View', 'Scrollview']),
  headerVariant: PropTypes.oneOf(['v1', 'v2', 'v3', 'v4', 'blank']),
  bottomLogo: PropTypes.bool,
  customBackDrop: PropTypes.bool,
  screenTitle: PropTypes.string,
  enablePanDownToClose: PropTypes.bool,
  snapPoints: PropTypes.array,
  showBottomSheet: PropTypes.bool,
  bottomSheetContent: PropTypes.any,
  backDropComp: PropTypes.elementType,
  hideBack: PropTypes.bool,
  restrictBack: PropTypes.bool,
  headerColor: PropTypes.string,
  customNavigation: PropTypes.object,
  preventScreenShoot: PropTypes.bool,
};

Frame.defaultProps = {
  mode: SCROLL_VIEW,
  headerVariant: 'v1',
  bottomLogo: false,
  customBackDrop: false,
  screenTitle: '',
  enablePanDownToClose: true,
  snapPoints: [],
  showBottomSheet: false,
  hideBack: false,
  restrictBack: false,
  preventScreenShoot: false,
};

export default Frame;

//* Documentation
/**
Frame is a custom component that provides a container with header, content, and optional bottom logo.
@param {object} props - The component props.
@param {node} props.children - The content to render inside the Frame component.
@param {string} [props.mode='ScrollView'] - The main view mode of the Frame component. It can be 'View' or 'ScrollView'.
@param {string} [props.headerVariant='v1'] - The variant of the header to display. Possible values are 'v1', 'v2', 'v3', 'v4', or 'blank'.
@param {boolean} [props.bottomLogo=false] - Determines whether to display the bottom logo or not.
@param {object} [props.style] - The style object to apply to the Frame component.
@param {object} [props.containerStyle] - The style object to apply to the content container.
@param {boolean} [props.showBottomSheet] - Determines whether to show the bottom sheet or not.
@param {array} [props.snapPoints] - The array of snap points for the bottom sheet.
@param {node} [props.bottomSheetContent] - The content to render inside the bottom sheet.
@param {boolean} [props.enablePanDownToClose] - Determines whether to enable pan down to close the bottom sheet.
@param {object} [props.bottomSheetProps] - Additional props to pass to the bottom sheet component.
@param {boolean} [props.customBackDrop] - Determines whether to use a custom backdrop component for the bottom sheet or not.
@param {node} [props.backDropComp] - The custom backdrop component to render for the bottom sheet.
@param {string} [props.screenTitle=''] - The title of the screen to display in the header.
@param {React.Ref} ref - Ref object for accessing the component's instance.
@property {boolean} [hideBack] - Flag indicating whether the back button should be hidden in the header.
@property {boolean} [restrictBack] - Flag indicating whether the back button should be restricted and only navigate within the current screen stack.
@property {string} [headerColor] - The background color of the header.
@property {object} [customNavigation] - Custom navigation configuration for the back button.
@property {string} customNavigation.screen - The screen to navigate when the back button is pressed.
@return {JSX.Element|null} - The rendered Frame component.
*/
