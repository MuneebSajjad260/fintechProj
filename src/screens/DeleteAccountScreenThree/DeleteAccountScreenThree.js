import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import styles from './DeleteAccountScreenThree.style';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {PrimaryButton, SecondaryButton} from '../../shared/components';
import {AppTheme} from '../../shared/theme';
import {DeleteAccount} from '../../shared/redux/action/DeleteAccount';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {logout} from '../../shared/redux/action/user';
import {resetUser} from '../../shared/redux/slices/authSlice';
import {deleteKeychainItem} from '../../shared/utils/keychain';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Wrapper from '../../shared/components/core/Wrapper';
import Botton from '../../shared/components/core/Botton';

const points = [
  'Your team account(s) are queued for deletion.',
  'You will receive an email once your accounts and associated data is deleted.',
  'Please note, as intimated earlier, your contract and memos will be stored in Fintech Hub’s archive.',
];

export default function DeleteAccountScreenThree({route, navigation}) {
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {Email, Id, TeamIds, IsTeamAdministrator} = useSelector(selectUserData);
  const {access_token} = route.params;
  // console.warn("Grabed Data:------------------->", res)

  //* Bottom Sheet
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['32%'], []);
  const bottomSheetContent = (
    <View style={styles.btmContainer}>
      <Txt style={styles.btmHeading}>Delete Account</Txt>
      <View style={styles.btmDescContainer}>
        <Txt style={styles.btmDesc}>
          Are you sure you want to delete your account and data?{'\n'}You will
          not be able to recover the account or data once it has been deleted.
        </Txt>
      </View>
      <View style={styles.btmBtnContainer}>
        <Botton
          variant={'v2'}
          disabled={isRequestSubmitted}
          loading={isRequestSubmitted}
          continueTitle={'Yes, Log Out'}
          cancelTitle={'No'}
          continueBtnAccessibilityLabel={'YesBtn'}
          cancelBtnAccessibilityLabel={'NoBtn'}
          onCancel={() => {
            bottomSheetRef.current?.closeBottomSheet();
          }}
          onContinue={() => {
            const data = {
              token: access_token,
              TeamIds,
              id: Id,
            };
            deleteUser(data);
          }}
        />
      </View>
    </View>
  );

  // ?API Logic
  // *API Modules
  const deleteUser = useCallback(
    async data => {
      try {
        setIsRequestSubmitted(true);
        const res = await dispatch(DeleteAccount(data)).unwrap();
        console.log('API Response Here:--------------->', res);
        // Logout
        dispatch(logout());
        dispatch(resetUser());
        navigation.reset({
          index: 3,
          routes: [{name: ScreensName.Login}],
        });
        // Delete the Entry from KeyChain (Saved Users)
        deleteKeychainItem(Email);
        setIsRequestSubmitted(false);
      } catch (error) {
        setIsRequestSubmitted(false);
        console.error('Error while deleting user: ', error);
        setError('Error while deleting user.');
      }
    },
    [dispatch, Id, TeamIds, Email],
  );

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPoints}
      bottomSheetContent={bottomSheetContent}
      ref={bottomSheetRef}
      enablePanDownToClose={isRequestSubmitted ? false : true}
      enabledInnerScrolling={true}
      screenTitle="Delete Account & Data">
      <View style={styles.container}>
        {/* Content */}
        <View>
          {/* Heading */}
          <Txt style={styles.heading}>Sorry to see you go!</Txt>
          {/* Card */}
          <Wrapper style={styles.cardContainer}>
            {/* Card Heading */}
            <View style={styles.cardTitleContainer}>
              <Txt style={styles.cardHeading}>What happens next?</Txt>
            </View>
            {/* Points */}
            <View>
              {points.map((item, index) => {
                return (
                  <View
                    style={[styles.defAlignment, styles.pointContainer]}
                    key={index}>
                    <View style={styles.dot} />
                    <Txt style={styles.pointTxt}>{item}</Txt>
                  </View>
                );
              })}
            </View>
          </Wrapper>
        </View>
        {/* Button */}
        <Pressable
          accessibilityLabel="deleteAndLogout"
          onPress={() => {
            bottomSheetRef.current?.expandBottomSheet();
          }}
          style={styles.btnContainer}>
          <Txt style={styles.btnText}>Delete & Logout</Txt>
        </Pressable>
      </View>
    </Frame>
  );
}
