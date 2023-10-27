import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './DeleteAccountScreenTwo.style';
import {Checkbox} from 'react-native-paper';
import {AppTheme} from '../../shared/theme';
import {PrimaryButton, SecondaryButton} from '../../shared/components';
// Icons
import InfoGreyIcon from '../../assets/images/infoGreyIcon.svg';
import InfoRedIcon from '../../assets/images/infoRedIcon.svg';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import TextInput from '../../shared/components/text-input/Textinput';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import AlertRed from '../../assets/images/AlertRed.svg';
import {VerifyUser} from '../../shared/redux/action/VerifyUser';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {DeleteAccountErrorState} from '../../shared/redux/action/DeleteAccountErrorState';
import Frame from '../../shared/components/core/Frame';
import Wrapper from '../../shared/components/core/Wrapper';
import Txt from '../../shared/components/core/Txt';
import Botton from '../../shared/components/core/Botton';
import Input from '../../shared/components/core/Input';

const options = [
  'You and your team will no longer be able to use any the remaining credits.',
  'Your contract details will not be deleted, it will remain part of the records at Fintech Hub archive.',
  'Your memos for past bookings and purchases cannot be deleted because it is prohibited by state laws.',
];

export default function DeleteAccountScreenTwo({navigation}) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [password, setPassword] = useState({value: '', error: ''});
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [deleteAccountState, setDeleteAccountState] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [error, setError] = useState(null);
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const {Email, TeamIds} = useSelector(selectUserData);
  // console.warn('Checking Status:----------->', TeamIds);

  const isDarkMode = useSelector(state => state.mode.colorScheme);
  // ?API Logic
  // *API Modules
  const updatePasswordFunc = useCallback(
    async data => {
      try {
        setIsRequestSubmitted(true);
        const {access_token} = await dispatch(VerifyUser(data)).unwrap();
        console.log('API Response Here:--------------->', access_token);
        setIsPasswordMatch(true);
        navigation.navigate(ScreensName.DeleteAccountScreenThree, {
          access_token,
        });
        setIsRequestSubmitted(false);
        setPassword({value: '', error: ''});
      } catch (error) {
        setIsPasswordMatch(false);
        setIsRequestSubmitted(false);
        console.error('Error while checking user details: ', error);
        setError('Error while checking user details.');
      }
    },
    [dispatch, Email],
  );

  const gettingDeleteAccountStatus = useCallback(
    async data => {
      try {
        const {isContractAvailable, statusCode} = await dispatch(
          DeleteAccountErrorState(data),
        ).unwrap();
        if (!isContractAvailable && statusCode === 200) {
          setDeleteAccountState(true);
        } else {
          setDeleteAccountState(false);
        }
        // console.log('API Response Here:--------------->', res);
      } catch (error) {
        console.error('Error while checking user details: ', error);
        setError('Error while checking user details.');
      }
    },
    [dispatch, TeamIds],
  );

  //? Error State API (if its return true do not process the request of delete account further)
  useEffect(() => {
    const data = {
      TeamIds: TeamIds !== null ? Number(TeamIds) : 'null',
    };
    gettingDeleteAccountStatus(data);
  }, []);

  const onSubmit = () => {
    if (password.value) {
      const rawData = {
        grant_type: 'password',
        username: Email,
        password: password.value,
      };
      const formData = new URLSearchParams(rawData).toString();
      updatePasswordFunc(formData);
    }
  };

  //* FlatList
  const renderItem = ({item, index}) => (
    <Wrapper
      isPressable={true}
      accessibilityLabel="checkBox"
      onPress={() => {
        const items = checkedItems.includes(index)
          ? checkedItems.filter(i => i !== index)
          : [...checkedItems, index];
        setCheckedItems(items);
      }}
      style={styles.listItemContainer}>
      <Checkbox.Item
        label=""
        mode="android"
        status={checkedItems.includes(index) ? 'checked' : 'unchecked'}
        color={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}
        uncheckedColor={
          isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black
        }
        style={styles.checkbox}
      />
      <Text style={styles.listItemText}>{item}</Text>
    </Wrapper>
  );

  //* Bottom Sheet
  const snapPointsConfirm = useMemo(() => ['43%'], []);
  const bottomSheetContent = (
    <BottomSheetScrollView
      style={styles.btmContainer}
      showsVerticalScrollIndicator={false}>
      <Txt style={styles.btmHeading}>Confirm your identity!</Txt>
      <View style={styles.btmDescContainer}>
        <Txt style={styles.btmDesc}>
          Are you sure you want to submit request for permanently deleting your
          account and data?
          {'\n\n'}
          You will not be able to recover the account or data once it has been
          deleted.
        </Txt>
      </View>
      <Input
        accessibilityLabel="password"
        //secureTextEntry
        placeholder="Enter Your Password"
        isBottomSheetInput={true}
        value={password.value}
        inputType={'password'}
        onChangeText={text => {
          setPassword({value: text, error: ''});
          setIsPasswordMatch(true);
        }}
        error={!isPasswordMatch}
        errorDetail={'Entered password is incorrect!'}
      />
      <View style={{marginVertical: AppTheme.SPACINGS.MARGINS.M1}}>
        <Botton
          variant={'v2'}
          continueTitle={'Confirm'}
          disabled={password.value !== '' ? false : true}
          onCancel={() => {
            bottomSheetRef.current?.closeBottomSheet();
          }}
          onContinue={() => {
            onSubmit();
          }}
          cancelBtnAccessibilityLabel="cancelBtn"
          continueBtnAccessibilityLabel="confirmBtn"
          loading={isRequestSubmitted}
        />
      </View>
    </BottomSheetScrollView>
  );

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPointsConfirm}
      bottomSheetContent={bottomSheetContent}
      ref={bottomSheetRef}>
      <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            {/* Card */}
            <Wrapper style={styles.cardContainer}>
              {/* Card Heading */}
              <View style={styles.cardTitleContainer}>
                <Txt style={styles.cardHeading}>Delete Account(s) Request</Txt>
              </View>
              <Txt style={styles.cardDescription}>
                You are about to request permanent deletion of all of your
                company accounts.{'\n\n'}
                If you want to end this contract, and delete all of your team
                accounts, then you may submit a request.
              </Txt>
            </Wrapper>
            {/* Options */}
            <View style={styles.optionsContainer}>
              {/* Heading */}
              <View style={styles.optionsHeadingContainer}>
                <Txt style={styles.optionsHeading}>
                  Please agree to the following terms, first.
                </Txt>
              </View>

              {/* Option List Items */}
              <View style={styles.listItemsContainer}>
                <FlatList
                  data={options}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </View>

          {/* Error States */}
          <View style={styles.stateContainer}>
            {!deleteAccountState ? (
              <>
                {/* Status */}
                <View
                  style={[styles.defAlignment, styles.stateHeadingContainer]}>
                  <InfoGreyIcon />
                  <Txt style={styles.stateTitle}>Error!</Txt>
                </View>

                {/* Message */}
                <Txt style={styles.stateMsg}>
                  You must cancel your contract before you are able to delete
                  your and your team accounts.
                </Txt>
              </>
            ) : (
              <>
                {/* Status */}
                <View
                  style={[styles.defAlignment, styles.stateHeadingContainer]}>
                  <InfoRedIcon />
                  <Txt
                    style={[styles.stateTitle, {color: AppTheme.COLORS.error}]}>
                    Warning
                  </Txt>
                </View>

                {/* Message */}
                <Txt style={styles.stateMsg}>
                  You are about to permanently delete your team accounts and
                  data
                </Txt>
              </>
            )}
          </View>
          {/* Button */}
          <View>
            <Botton
              accessibilityLabel="reqDeletion"
              loading={false}
              title={'Request Deletion'}
              disabled={
                deleteAccountState && options.length === checkedItems.length
                  ? false
                  : true
              }
              onPress={() => {
                console.log('im save changes');
                bottomSheetRef.current?.expandBottomSheet();
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Frame>
  );
}
