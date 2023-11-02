import React, {useState, useRef} from 'react';
import {useEffect} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSelector, useDispatch} from 'react-redux';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {GetPendingPlan} from '../../shared/redux/action/GetPendingPlan';
import {PendingStatus} from '../../shared/redux/action/PendingStatus';
import styles from './MainMenueScreen.Style';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
import Frame from '../../shared/components/core/Frame';
import Wrapper from '../../shared/components/core/Wrapper';
import Txt from '../../shared/components/core/Txt';
import Botton from '../../shared/components/core/Botton';
import {logout} from '../../shared/redux/action/user';
import {resetUser} from '../../shared/redux/slices/authSlice';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {AppTheme} from '../../shared/theme';
import {GetProfile} from '../../shared/redux/action/GetProfile';
import {useIsFocused} from '@react-navigation/native';
//* Icons
import ProfileMenu from '../../assets/images/profileMenu.js';
import LogoutMenu from '../../assets/images/logoutMenu.js';
import HelpDeskActiveIcon from '../../assets/images/HelpDeskActiveIcon.js';
import InvoicesIconActive from '../../assets/images/InvoicesIconActive.js';
import MyTeamActive from '../../assets/images/MyTeamActive.js';
import TeamCreditsIconActive from '../../assets/images/TeamCreditsIconActive.js';
import SettingsActive from '../../assets/images/SettingsActive.js';
import LogoutBs from '../../assets/images/LogoutBs.js';
import CopyIcon from '../../assets/images/CopyIcon.js';
import FaqIcon from '../../assets/images/FaqIcon';

const MainMenuScreen = ({navigation, route}) => {
  const loginData = useSelector(state => state?.auth);
  const loginDone = loginData?.data;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [pendingStatus, setPendingStatus] = useState();
  const [profileData, setProfileData] = useState();

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const isTodayDayPassAvailable = useSelector(state => state?.getDayPassBookings?.isActiveDayPass)
  const teamId = userData?.TeamIds;

  useEffect(() => {
    dispatch(PendingStatus(teamId))
      .unwrap()
      .then(result => {
        setPendingStatus(result?.requestStatus);
      })
      .catch(error => {
        console.log('Error While Getting The Approval Status:', error);
      });
    dispatch(GetPendingPlan(teamId));
  }, [teamId]);

  //* Bottom Sheet
  const bottomSheetRef = useRef(null);
  const snapPoints = React.useMemo(() => ['40%'], []);
  const bottomSheetContent = (
    <BottomSheetView style={styles.btmContainer}>
      <View>
        <View style={styles.logoutImg}>
          <LogoutBs stroke={isDarkMode ? AppTheme.COLORS.white : null} />
        </View>
        <Txt style={styles.subTitle}>
          {'Are you sure you want to '}
          <Txt style={styles.logoutTxt}>Logout?</Txt>
        </Txt>
      </View>
      <View style={styles.btmBtnContainer}>
        <Botton
          variant={'v2'}
          continueTitle={'Yes'}
          cancelTitle={'No'}
          continueBtnAccessibilityLabel={'logoutBtn'}
          cancelBtnAccessibilityLabel={'logoutCancelBtn'}
          onCancel={() => {
            bottomSheetRef.current?.closeBottomSheet();
          }}
          onContinue={() => {
            dispatch(logout());
            dispatch(resetUser());
            bottomSheetRef.current?.expandBottomSheet();
            navigation.reset({
              index: 3,
              routes: [{name: ScreensName.Login}],
            });
          }}
        />
      </View>
    </BottomSheetView>
  );

  //* Copy access pin code
  const handleCopy = () => {
    Clipboard.setString(userData?.AccessPincode);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(GetProfile(loginDone?.access_token))
      .unwrap()
      .then(result => {
        // check result
        console.log('result--', result);
        let checkMember = result.find(item => {
          return item.CoworkerType === 1;
        });
        setProfileData(checkMember);
        console.log('checkMember-', checkMember);
      })
      .catch(err => {
        console.log('error get profile-', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, loginDone?.access_token, isFocused]);

  // Function to truncate the name if it exceeds 12 letters
  const truncateName = (name, maxLength) => {
    if (name?.length <= maxLength) {
      return name;
    } else {
      return name?.substr(0, maxLength) + '...';
    }
  };

  return (
    <Frame
      headerVariant={'v4'}
      showBottomSheet={true}
      snapPoints={snapPoints}
      bottomSheetContent={bottomSheetContent}
      ref={bottomSheetRef}>
      <View style={styles.mainContainer}>
        {/* Options */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.subContainer}>
            {/* Profile */}
            <View
              style={[
                styles.cardContainer,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <TouchableOpacity
                accessibilityLabel="profileDetail"
                onPress={() => {
                  navigation.navigate(ScreensName.Profiledetail);
                }}>
                <View style={styles.allignInRow}>
                  <View>
                    <ProfileMenu
                      stroke={isDarkMode ? AppTheme.COLORS.white : null}
                    />
                  </View>
                  <View>
                    <Txt style={styles.tabName}>
                      {profileData?.UserFullName}
                    </Txt>
                    <Txt style={styles.profileEmail}>
                      {!loading ? truncateName(profileData?.Email, 30) : null}
                    </Txt>
                  </View>
                </View>
              </TouchableOpacity>

              {/* ? Membership is available and approved also if it's a day pass user  */}
              {pendingStatus === 'approved' || isTodayDayPassAvailable ? (
                <View>
                  <View style={styles.accessCodeCont}>
                    <Txt style={styles.pinCode}>
                      {profileData?.AccessPincode}
                    </Txt>
                    <TouchableOpacity
                      onPress={handleCopy}
                      style={styles.copyCont}>
                      <CopyIcon />
                    </TouchableOpacity>
                  </View>
                  <Txt style={styles.accessCode}>Access Code</Txt>
                </View>
              ) : null}
            </View>

            {/* Options Sec#1 */}
            <Wrapper style={styles.cardContainer}>
              <TouchableOpacity
                accessibilityLabel="Goto Invoices & Membership Screen Button"
                disabled={pendingStatus === 'approved' ? false : true}
                onPress={() => {
                  if (pendingStatus === 'approved') {
                    navigation.navigate(ScreensName.MembershipDetails);
                  }
                }}
                style={[
                  styles.allignInRow,
                  {opacity: pendingStatus === 'approved' ? 1 : 0.5},
                ]}>
                <View>
                  <InvoicesIconActive
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}
                  />
                </View>
                <View>
                  <Txt style={styles.tabName}>Membership</Txt>
                  <Txt style={styles.tabInnerText}>Manage your membership</Txt>
                </View>
              </TouchableOpacity>

              <Divider style={styles.divider} />
              <TouchableOpacity
                accessibilityLabel="myTeam"
                disabled={pendingStatus === 'approved' ? false : true}
                onPress={() => {
                  if (pendingStatus === 'approved') {
                    navigation.navigate(ScreensName.myTeam);
                  }
                }}
                style={{opacity: pendingStatus === 'approved' ? 1 : 0.5}}>
                <View style={styles.allignInRow}>
                  <View>
                    <MyTeamActive
                      stroke={isDarkMode ? AppTheme.COLORS.white : null}
                    />
                  </View>
                  <View>
                    <Txt style={styles.tabName}>My team</Txt>
                    <Txt style={styles.tabInnerText}>
                      Team details and management
                    </Txt>
                  </View>
                </View>
              </TouchableOpacity>

              <Divider style={styles.divider} />
              <TouchableOpacity
                accessibilityLabel="Goto Team Credit Screen Button"
                disabled={pendingStatus === 'approved' ? false : true}
                onPress={() => {
                  if (pendingStatus === 'approved') {
                    navigation.navigate(ScreensName.TeamCreditsScreen);
                  }
                }}
                style={[
                  styles.allignInRow,
                  {opacity: pendingStatus === 'approved' ? 1 : 0.5},
                ]}>
                <View>
                  <TeamCreditsIconActive
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}
                  />
                </View>
                <View>
                  <Txt style={styles.tabName}>Team Credits</Txt>
                  <Txt style={styles.tabInnerText}>
                    Balance, usage and buy credits
                  </Txt>
                </View>
              </TouchableOpacity>
            </Wrapper>

            {/* Options Sec#2 */}
            <Wrapper style={styles.cardContainer}>
              <TouchableOpacity
                accessibilityLabel="faq"
                onPress={() => {
                  navigation.navigate(ScreensName.FaqScreen);
                }}>
                <View style={styles.allignInRow}>
                  <View>
                    <FaqIcon
                      outlineColor={isDarkMode ? AppTheme.COLORS.white : null}
                    />
                  </View>
                  <View>
                    <Txt style={styles.tabName}>FAQs</Txt>
                    <Txt style={styles.tabInnerText}>
                      Read about commonly asked questions
                    </Txt>
                  </View>
                </View>
              </TouchableOpacity>

              <Divider style={styles.divider} />
              <TouchableOpacity
                accessibilityLabel="helpdesk"
                onPress={() => {
                  navigation.navigate(ScreensName.HelpDeskScreen);
                }}>
                <View style={styles.allignInRow}>
                  <View>
                    <HelpDeskActiveIcon
                      stroke={isDarkMode ? AppTheme.COLORS.white : null}
                    />
                  </View>
                  <View>
                    <Txt style={styles.tabName}>Help Desk</Txt>
                    <Txt style={styles.tabInnerText}>
                      Request help from the Hub team
                    </Txt>
                  </View>
                </View>
              </TouchableOpacity>

              <Divider style={styles.divider} />
              <TouchableOpacity
                accessibilityLabel="settings"
                onPress={() => {
                  navigation.navigate(ScreensName.settingScreen);
                }}
                style={styles.allignInRow}>
                <View>
                  <SettingsActive
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}
                  />
                </View>
                <View>
                  <Txt style={styles.tabName}>Settings</Txt>
                  <Txt style={styles.tabInnerText}>
                    Personalize the app experience
                  </Txt>
                </View>
              </TouchableOpacity>

              <Divider style={styles.divider} />
              <TouchableOpacity
                accessibilityLabel="logout"
                onPress={() => {
                  bottomSheetRef.current?.expandBottomSheet();
                }}>
                <View style={styles.allignInRow}>
                  <View>
                    <LogoutMenu
                      stroke={isDarkMode ? AppTheme.COLORS.white : null}
                    />
                  </View>
                  <View>
                    <Txt style={styles.tabName}>Logout</Txt>
                    <Txt style={styles.tabInnerText}>
                      Logout from this device
                    </Txt>
                  </View>
                </View>
              </TouchableOpacity>
            </Wrapper>
          </View>
        </ScrollView>
      </View>
    </Frame>
  );
};

export default MainMenuScreen;
