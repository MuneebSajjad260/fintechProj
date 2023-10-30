/* eslint-disable no-unused-vars */
import {TouchableOpacity} from 'react-native';
import * as React from 'react';
import AppStartScreen from '../screens/appStartScreen/AppStartScreen';
import ExploreFintechScreen from '../screens/exploreFintechScreen/ExploreFintechScreen';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from '../shared/redux/store/Store';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import ProfileDetailScreen from '../screens/ProfileDetailScreen/ProfileDetailScreen';
import {AppTheme} from '../shared/theme';
import normalize from 'react-native-normalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScreensName} from '../shared/constants/ScreensStrings.js';
//* Static Path Used
import SplashScreen from '../screens/splashScreen/SplashScreen';
import PrivateOfficeScreenOne from '../screens/privateOfficeScreenOne/PrivateOfficeScreenOne.js';
import PrivateOfficeScreenTwo from '../screens/privateOfficeScreenTwo/PrivateOfficeScreenTwo';
import PrivateOfficeScreenThree from '../screens/privateOfficeScreenThree/PrivateOfficeScreenThree';
import DedicatedDeskScreenOne from '../screens/DedicatedDeskScreenOne/DedicatedDeskScreenOne';
import DedicatedDeskScreenTwo from '../screens/DedicatedDeskScreenTwo/DedicatedDeskScreenTwo';
import DedicatedDeskSummaryScreen from '../screens/DedicatedDeskSummaryScreen/DedicatedDeskSummaryScreen';
import PrivateOfficeRequestSentScreen from '../screens/privateOfficeRequestSentScreen/privateOfficeRequestSentScreen';
import DedicatedDeskRequestSentScreen from '../screens/DedicatedDeskRequestSentScreen/DedicatedDeskRequestSentScreen';
import HybridScreenOne from '../screens/HybridScreenOne/HybridScreenOne';
import HybridScreenTwo from '../screens/HybridScreenTwo/HybridScreenTwo';
import HybridScreenThree from '../screens/HybridScreenThree/HybridScreenThree';
import HybridScreenFour from '../screens/HybridScreenFour/HybridScreenFour';
import HybridSummaryScreen from '../screens/HybridSummaryScreen/HybridSummaryScreen';
import HybridRequestSentScreen from '../screens/HybridRequestSentScreen/HybridRequestSentScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import privateOfficeSummaryScreen from '../screens/privateOfficeSummaryScreen/privateOfficeSummaryScreen';
import MeetingWhatsHappeningScreen from '../screens/MeetingWhatsHappeningScreen/MeetingWhatsHappeningScreen';
import BankTransferScreen from '../screens/BankTransferScreen/BankTransferScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import waitingScreen from '../screens/waitingSceen/waitingScreen';
import BookMeetingroom from '../screens/BookMeetingRoomScreen/BookMeetingRoomScreen';
import InvitationScreen from '../screens/MeetingroomInvitationScreen/MeetingRoomInvitationScreen';
import MeetingRoomBookingConfirmed from '../screens/MeetingRoomBookingConfirmed/MeetingRoomBookingConfirmed';
import ScheduledMeetingScreen from '../screens/ScheduledMeetingScreen/ScheduledMeetingScreen';
import ReScheduleMeeting from '../screens/ReScheduleMeetingScreen/ReScheduleMeeting';
import ReportAProblemScreen from '../screens/ReportAProblemScreen/ReportAProblemScreen';
import MainMenuScreen from '../screens/MainMenuScreen/MainMenuScreen';
import NotificationScreen from '../screens/NotificationsScreen/NotificationScreen';
import HelpDeskScreen from '../screens/HelpDeskScreen/HelpDeskScreen';
import OldPasswordScreen from '../screens/OldPasswordScreen/OldPasswordScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen/ChangePasswordScreen';
import AccesskeyScreen from '../screens/AccesskeyScreen/AccesskeyScreen';
import ChangePlanScreen from '../screens/ChangePlanScreen/ChangePlanScreen';
import TeamCreditsScreen from '../screens/TeamCreditsScreen/TeamCreditsScreen';
import MeetingSummaryScreen from '../screens/meetingsummaryscreen/MeetingSummaryScreen';
import ProfileDetailEditScreen from '../screens/ProfileDetailEditScreen/ProfileDetailEditScreen';
import MeetingWelcomeScreen from '../screens/meetinghomescreen/MeetingHomeScreen';
// import UpdatePasswordScreen from '../screens/UpdatePasswordScreen/UpdatePasswordScreen';
import MembershipDetailsScreen from '../screens/MembershipDetailsScreen/MembershipDetailsScreen';
import WebView from '../screens/WebView/WebView';
import DeskRequestPending from '../screens/DeskRequestPending/DeskRequestPending';
import DayPassHomeScreen from '../screens/DayPassHomeScreen/DayPassHomeScreen';
import DayPass from '../screens/DayPass/DayPass';
import DayPassSummaryScreen from '../screens/DayPassSummaryScreen/DayPassSummaryScreen';
import DayPassPayment from '../screens/DayPassPayment/DayPassPayment';
import DayPassRequestSent from '../screens/DayPassRequestSent/DayPassRequestSent';
import MembershipInactiveScreen from '../screens/MembershipInactiveScreen/MembershipInactiveScreen';
import MyTeam from '../screens/MyTeam/MyTeam';
import AddMembers from '../screens/AddMembersScreen/AddMembers';
import TeamMemberDetail from '../screens/TeamMemberDetail/TeamMemberDetail';
import AnnouncementsScreen from '../screens/AnnouncementsScreen/AnnouncementsScreen';
import DummyScreen from '../screens/DummyScreen/DummyScreen';
import ReportSummaryScreen from '../screens/ReportSummaryScreen/ReportSummaryScreen';
import InvoiceSummaryScreen from '../screens/InvoiceSummaryScreen/InvoiceSummaryScreen';
import InvoiceDetailScreen from '../screens/InvoiceDetailScreen/InvoiceDetailScreen';
import ReviewPendingScreen from '../screens/ReviewPendingScreen/ReviewPendingScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen/TransactionDetailScreen';
import AddCreditScreen from '../screens/AddCreditScreen/AddCreditScreen';
import PurchaseCreditScreen from '../screens/PurchaseCreditScreen/PurchaseCreditScreen';
import YourPurchasesScreen from '../screens/YourPurchasesScreen/YourPurchasesScreen';
import ReScheduleDayPassScreen from '../screens/ReScheduleDayPassScreen/ReSheduleDayPassScreen';
import ReScheduleDayPassMeeting from '../screens/ReScheduleDayPassMeeting/ReSheduleDayPassMeeting';
import InvoiceDayPass from '../screens/InvoiceDayPass/InvoiceDayPass';
import DeleteAccountScreenOne from '../screens/DeleteAccountScreenOne/DeleteAccountScreenOne';
import DeleteAccountScreenTwo from '../screens/DeleteAccountScreenTwo/DeleteAccountScreenTwo';
import DeleteAccountScreenThree from '../screens/DeleteAccountScreenThree/DeleteAccountScreenThree';
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen.js';
import NotificationListScreen from '../screens/NotificationListScreen/NotificationListScreen.js';
import NavigationService from './NavigationService';
import QRCodeScreen from '../screens/QRCodeScreen/QRCodeScreen';
import FaqScreen from '../screens/FaqScreen/FaqScreen';
import FaqDetailScreen from '../screens/FaqDetailScreen/FaqDetailScreen';

const RootNavigation = () => {
  const Stack = createStackNavigator();
  const Login = ({navigation}) => ({
    headerStyle: {
      backgroundColor: AppTheme.COLORS.white,
    },
    title: '',
    headerShadowVisible: false,
    headerTintColor: AppTheme.COLORS.primaryBlueBg,
    headerLeft: () => {
      return (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.navigate(ScreensName.SplashScreen);
            }}>
            <Ionicons
              size={normalize(26)}
              color={AppTheme.COLORS.primaryBlueBg}
              name="arrow-back"
            />
          </TouchableOpacity>
        </>
      );
    },
  });

  //* QR Stack Animation Properties
  const QrOpacityTransition = {
    gestureDirection: 'horizontal',
    headerShown: false,
    presentation: 'modal',
    transitionSpec: {
      open: {
        animation: 'timing',
      },
      close: {
        animation: 'timing',
        config: {
          duration: 50,
        },
      },
    },
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  };
  //* QR Stack
  const QRStack = createStackNavigator();
  const QRStackScreens = () => (
    <QRStack.Navigator
      initialRouteName={ScreensName.DummyScreen}
      screenOptions={{
        ...QrOpacityTransition,
      }}>
      <QRStack.Screen name={ScreensName.DummyScreen} component={DummyScreen} />
      <QRStack.Screen
        name={ScreensName.QRCodeScreen}
        component={QRCodeScreen}
      />
    </QRStack.Navigator>
  );

  return (
    <Provider store={store}>
      <>
        <NavigationContainer
          ref={ref => NavigationService.setTopLevelNavigator(ref)}
          theme={DarkTheme}>
          <Stack.Navigator
            // initialRouteName={'QRStack'}
            // initialRouteName={ScreensName.NotificationListScreen}
            screenOptions={{
              headerShown: false,
              gestureDirection: 'vertical',
            }}>
            <Stack.Screen
              name={ScreensName.SplashScreen}
              component={SplashScreen}
            />
            <Stack.Screen
              name={ScreensName.HomeScreen}
              component={HomeScreen}
            />
            <Stack.Screen
              name={ScreensName.MeetingHomeScreen}
              component={MeetingWelcomeScreen}
            />
            <Stack.Screen
              name={ScreensName.Login}
              component={LoginScreen}
              options={Login}
            />
            <Stack.Screen
              name={ScreensName.dayPassHomeScreen}
              component={DayPassHomeScreen}
            />
            <Stack.Screen name={ScreensName.dayPass} component={DayPass} />
            <Stack.Screen
              name={ScreensName.dayPassSummary}
              component={DayPassSummaryScreen}
            />
            <Stack.Screen
              name={ScreensName.dayPassPayment}
              component={DayPassPayment}
            />
            <Stack.Screen
              name={ScreensName.dayPassRequestSent}
              component={DayPassRequestSent}
            />
            <Stack.Screen
              name={ScreensName.membershipInactive}
              component={MembershipInactiveScreen}
            />
            {/* <Stack.Screen name={ScreensName.filterPackages} component={FilterPackagesScreen}  /> */}
            <Stack.Screen
              name={ScreensName.mainMenuScreen}
              component={MainMenuScreen}
            />
            <Stack.Screen name={ScreensName.myTeam} component={MyTeam} />
            <Stack.Screen
              name={ScreensName.addMembers}
              component={AddMembers}
            />
            <Stack.Screen
              name={ScreensName.teamMemberDetail}
              component={TeamMemberDetail}
            />
            <Stack.Screen
              name={ScreensName.changePasswordScreen}
              component={OldPasswordScreen}
            />
            <Stack.Screen
              name={ScreensName.updatePassword}
              component={ChangePasswordScreen}
            />
            <Stack.Screen
              name={ScreensName.MembershipDetails}
              component={MembershipDetailsScreen}
            />
            <Stack.Screen
              name={ScreensName.ChangePlan}
              component={ChangePlanScreen}
            />
            <Stack.Screen
              name={ScreensName.Profiledetail}
              component={ProfileDetailScreen}
            />
            <Stack.Screen
              name={ScreensName.Profiledetaileditscreen}
              component={ProfileDetailEditScreen}
            />
            <Stack.Screen
              name={ScreensName.TeamCreditsScreen}
              component={TeamCreditsScreen}
            />
            {/* <Stack.Screen name={ScreensName.UpdatePasswordScreen} component={UpdatePasswordScreen}  /> */}
            <Stack.Screen
              name={ScreensName.reportproblemscreen}
              component={ReportAProblemScreen}
            />
            <Stack.Screen
              name={ScreensName.settingScreen}
              component={SettingsScreen}
            />
            <Stack.Screen
              name={ScreensName.AccessKeyScreen}
              component={AccesskeyScreen}
            />

            {/* <Stack.Screen name={ScreensName.MeetingWelcomescreen} component={MeetingWelcomeScreen}  /> */}
            <Stack.Screen
              name={ScreensName.meetingWhatsHappeningScreen}
              component={MeetingWhatsHappeningScreen}
            />
            <Stack.Screen
              name={ScreensName.bookMeetingRoom}
              component={BookMeetingroom}
            />
            <Stack.Screen
              name={ScreensName.invitationScreen}
              component={InvitationScreen}
            />
            <Stack.Screen
              name={ScreensName.bookingConfirmed}
              component={MeetingRoomBookingConfirmed}
            />
            <Stack.Screen
              name={ScreensName.scheduledMeetingScreen}
              component={ScheduledMeetingScreen}
            />
            <Stack.Screen
              name={ScreensName.yourPurchases}
              component={YourPurchasesScreen}
            />
            <Stack.Screen
              name={ScreensName.rescheduleMeeting}
              component={ReScheduleMeeting}
            />

            <Stack.Screen
              name={ScreensName.rescheduleDayPass}
              component={ReScheduleDayPassScreen}
            />
            <Stack.Screen
              name={ScreensName.invoiceDayPass}
              component={InvoiceDayPass}
            />
            <Stack.Screen
              name={ScreensName.rescheduleDayPassMeeting}
              component={ReScheduleDayPassMeeting}
            />
            <Stack.Screen
              name={ScreensName.Meetingsummary}
              component={MeetingSummaryScreen}
            />
            <Stack.Screen
              name={ScreensName.Banktransferscreen}
              component={BankTransferScreen}
            />
            {/* <Stack.Screen name={ScreensName.SplashScreen} component={SplashScreen}  /> */}
            <Stack.Screen
              name={ScreensName.waitingScreen}
              component={waitingScreen}
            />
            <Stack.Screen
              name={ScreensName.privateOfficeScreenTwo}
              component={PrivateOfficeScreenTwo}
            />

            <Stack.Screen
              name={ScreensName.requestPending}
              component={DeskRequestPending}
            />
            {/* <Stack.Screen name={ScreensName.experimentalSummaryScreen} component={ExperimentalSummaryScreen}  /> */}
            <Stack.Screen
              name={ScreensName.summaryScreen}
              component={privateOfficeSummaryScreen}
            />
            <Stack.Screen
              name={ScreensName.requestSentScreen}
              component={PrivateOfficeRequestSentScreen}
            />
            <Stack.Screen
              name={ScreensName.dedicatedDeskRequestSentScreen}
              component={DedicatedDeskRequestSentScreen}
            />
            <Stack.Screen
              name={ScreensName.privateOfficeScreenThree}
              component={PrivateOfficeScreenThree}
            />
            <Stack.Screen
              name={ScreensName.privateOfficeScreenOne}
              component={PrivateOfficeScreenOne}
            />
            <Stack.Screen
              name={ScreensName.dedicatedDeskScreenOne}
              component={DedicatedDeskScreenOne}
            />
            <Stack.Screen
              name={ScreensName.dedicatedDeskScreenTwo}
              component={DedicatedDeskScreenTwo}
            />
            <Stack.Screen
              name={ScreensName.dedicatedDeskSummaryScreen}
              component={DedicatedDeskSummaryScreen}
            />
            <Stack.Screen
              name={ScreensName.hybridScreenOne}
              component={HybridScreenOne}
            />
            <Stack.Screen
              name={ScreensName.hybridScreenTwo}
              component={HybridScreenTwo}
            />
            <Stack.Screen
              name={ScreensName.hybridScreenThree}
              component={HybridScreenThree}
            />
            <Stack.Screen
              name={ScreensName.hybridScreenFour}
              component={HybridScreenFour}
            />
            <Stack.Screen
              name={ScreensName.hybridSummaryScreen}
              component={HybridSummaryScreen}
            />
            <Stack.Screen
              name={ScreensName.hybridRequestSentScreen}
              component={HybridRequestSentScreen}
            />
            <Stack.Screen
              name={ScreensName.AppStartScreen}
              component={AppStartScreen}
            />

            <Stack.Screen
              name={ScreensName.exporeFintechScreen}
              component={ExploreFintechScreen}
            />
            <Stack.Screen name={ScreensName.webview} component={WebView} />
            <Stack.Screen
              name={ScreensName.newPasswordScreen}
              component={NewPasswordScreen}
            />

            {/* Routes Created By Haseeb Khan Start */}
            <Stack.Screen
              name={ScreensName.PurchaseCreditScreen}
              component={PurchaseCreditScreen}
            />
            <Stack.Screen
              name={ScreensName.AddCreditScreen}
              component={AddCreditScreen}
            />
            <Stack.Screen
              name={ScreensName.TransactionDetailScreen}
              component={TransactionDetailScreen}
            />
            <Stack.Screen
              name={ScreensName.ReviewPendingScreen}
              component={ReviewPendingScreen}
            />
            <Stack.Screen
              name={ScreensName.InvoiceDetailScreen}
              component={InvoiceDetailScreen}
            />
            <Stack.Screen
              name={ScreensName.InvoiceSummaryScreen}
              component={InvoiceSummaryScreen}
            />
            {/* <Stack.Screen
              name={ScreensName.DummyScreen}
              component={DummyScreen}
            /> */}
            <Stack.Screen
              name={ScreensName.HelpDeskScreen}
              component={HelpDeskScreen}
            />
            <Stack.Screen
              name={ScreensName.AnnouncementScreen}
              component={AnnouncementsScreen}
            />
            <Stack.Screen
              name={ScreensName.ReportSummaryScreen}
              component={ReportSummaryScreen}
            />
            <Stack.Screen
              name={ScreensName.DeleteAccountScreenOne}
              component={DeleteAccountScreenOne}
            />
            <Stack.Screen
              name={ScreensName.DeleteAccountScreenTwo}
              component={DeleteAccountScreenTwo}
            />
            <Stack.Screen
              name={ScreensName.DeleteAccountScreenThree}
              component={DeleteAccountScreenThree}
            />
            <Stack.Screen
              name={ScreensName.NotificationScreen}
              component={NotificationScreen}
            />
            <Stack.Screen
              name={ScreensName.NotificationListScreen}
              component={NotificationListScreen}
            />
            {/* <Stack.Screen
              name={ScreensName.QRCodeScreen}
              component={QRCodeScreen}
            /> */}
            <Stack.Screen name={'QRStack'} component={QRStackScreens} />
            <Stack.Screen name={ScreensName.FaqScreen} component={FaqScreen} />
            <Stack.Screen
              name={ScreensName.FaqDetailScreen}
              component={FaqDetailScreen}
            />
            {/* Routes Created By Haseeb Khan End */}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </Provider>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  backButton: {
    marginRight: normalize(22),
    justifyContent: 'center',
    alignContent: 'center',
  },
});
