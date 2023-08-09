import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {Svg} from 'react-native-svg';
import {Divider} from 'react-native-paper';
import {GetProfile} from '../../shared/redux/action/GetProfile';
import styles from './ProfileDetailScreen.Style';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
import CardContainer from '../../shared/components/cardWrapper/CardContainer';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import Frame from '../../shared/components/core/Frame';
import Wrapper from '../../shared/components/core/Wrapper';
import Txt from '../../shared/components/core/Txt';
import {AppTheme} from '../../shared/theme';
//* Icons
import ProfileMenu from '../../assets/images/profileMenu.js';
import DeleteAccount from '../../assets/images/DeleteAccount.js';
import LockIconBlue from '../../assets/images/LockIconBlue.js';

const ProfileDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginData = useSelector(state => state.auth?.data);
  const token = loginData?.access_token;
  console.log('token-----', token);

  const getProfile = useSelector(state => state?.getProfile?.data);

  const profile = getProfile?.find(item => {
    return item;
  });
  console.log('profile---', profile);
  const isAdmin = profile?.IsTeamAdministrator;
  const {IsTeamAdministrator, TeamIds} = useSelector(selectUserData);
  const isDarkMode = useSelector(state => state.mode.colorScheme);



  useEffect(() => {
    dispatch(GetProfile(token));
  }, [dispatch]);

  return (
    <Frame style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Wrapper style={styles.cardContainer}>
          <View style={[styles.allignrow, {justifyContent: 'space-between'}]}>
            <View style={styles.allignrow}>
              <View>
                <ProfileMenu
                  stroke={isDarkMode ? AppTheme.COLORS.white : null}
                />
              </View>
              <Txt style={styles.personalinformationtext}>
                Personal Information
              </Txt>
            </View>
            <TouchableOpacity
              accessibilityLabel="edit"
              onPress={() => {
                navigation.navigate(ScreensName.Profiledetaileditscreen, {
                  isAdmin: isAdmin,
                  FullName: profile?.UserFullName,
                  Email: profile?.Email,
                  Phone: profile?.MobilePhone,
                  CompanyName: profile?.TeamNames,
                });
              }}>
              <Txt style={styles.edittext}>Edit</Txt>
            </TouchableOpacity>
          </View>
          <View style={styles.profileDeatilsContainer}>
            <Text style={styles.detailsheadingtext}>Name</Text>
            <Txt style={styles.detailsinformationtext}>
              {profile?.UserFullName}
            </Txt>
            <Divider style={styles.divider} />
            <Text style={styles.detailsheadingtext}>Email</Text>
            <Txt style={styles.detailsinformationtext}>{profile?.Email}</Txt>
            <Divider style={styles.divider} />
            <Text style={styles.detailsheadingtext}>Phone</Text>
            <Txt style={styles.detailsinformationtext}>
              {profile?.MobilePhone}
            </Txt>
            <Divider style={styles.divider} />
            <Text style={styles.detailsheadingtext}>Company Name</Text>
            <Txt style={styles.detailsinformationtext}>
              {profile?.TeamNames}
            </Txt>
          </View>
        </Wrapper>
        {/* Change Password */}
        <Wrapper style={[styles.cardContainer]}>
          <TouchableOpacity
            accessibilityLabel="changePassword"
            onPress={() => {
              navigation.navigate(ScreensName.changePasswordScreen);
            }}>
            <View style={styles.defAlignment}>
              <View>
                <LockIconBlue
                  stroke={isDarkMode ? AppTheme.COLORS.white : null}
                />
              </View>
              <View>
                <Txt style={styles.tabName}>Change Password</Txt>
                <Txt style={styles.tabInnerText}>
                  Safely change or update your password
                </Txt>
              </View>
            </View>
          </TouchableOpacity>
        </Wrapper>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          accessibilityLabel="deleteAccount"
          disabled={TeamIds === null || IsTeamAdministrator ? false : true}
          style={{opacity: TeamIds === null || IsTeamAdministrator ? 1 : 0.5}}
          onPress={() => {
            console.log('I am delete account and data ');
            if (TeamIds === null || IsTeamAdministrator) {
              navigation.navigate(ScreensName.DeleteAccountScreenOne);
            }
          }}>
          <View style={styles.noteContainer}>
            <View style={[styles.allignrow, {justifyContent: undefined}]}>
              <View>
                <DeleteAccount
                  stroke={isDarkMode ? AppTheme.COLORS.white : null}
                />
              </View>
              <View>
                <Text style={styles.Note}>Delete Account & Data</Text>
                <Text style={styles.noteDescription}>
                  Only an administrator can delete accounts
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Frame>
  );
};

export default ProfileDetailScreen;
