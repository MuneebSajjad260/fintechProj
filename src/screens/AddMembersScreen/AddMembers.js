import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import normalize from 'react-native-normalize';
import {Svg} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  bottomSheetEmailValidator,
  validatePhoneNumber,
} from '../../shared/utils/validationHelpers';
import { ResourceId } from '../../shared/config/resourceId';
import {AddMember} from '../../shared/redux/action/AddMember';
import {PrimaryButton} from '../../shared/components';
import TextInput from '../../shared/components/text-input/Textinput';
import Input from '../../shared/components/core/Input';
import styles from './AddMembers.style';
import {AppTheme} from '../../shared/theme';
import AnnouncementAddMember from '../../assets/images/AnnouncementAddMember.js';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Botton from '../../shared/components/core/Botton';

const AddMembers = ({route, navigation}) => {
  const dispatch = useDispatch();
  const AddMemberPending = useSelector(state => state?.addMember?.loading);
  // Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  // const isMultiple = true;
  const {data} = route.params;
 console.log('params data ---', data);
  // // console.log('9494---',data?.activeMembers?.deskMembers.length);
  const isMultiple = data?.isMultiple;
  const [userName, setUserName] = useState({
    value: data?.name ? data?.name : '',
    error: '',
  });
  const [email, setEmail] = useState({
    value: data?.email ? data?.email : '',
    error: '',
  });
  const [phone, setPhone] = useState({
    value: data?.phone ? data?.phone : '',
    error: '',
  });
  const [workTitle, setWorkTitle] = useState({
    value: data?.workTitle ? data?.workTitle : '',
    error: '',
  });
  const [downIcon, setDownIcon] = useState(false);
  const [resourceName, setResourceName] = useState();
  const [fullCapacity, setFullCapacity] = useState(
    isMultiple
      ? false
      : !isMultiple && data?.officeResourceTypeId === ResourceId.privateOffice
        ? data?.activeMembers.length < data?.capacity
          ? false
          : true
        : false,
  );

  const bottomSheetConfirm = useRef(null);
  const snapPointsConfirm = useMemo(() => ['35%'], []);
  const renderBackdropBottomSheet = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        BackdropPressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  //Resources list
  const resources = isMultiple
    ? [
      {
        ResourceName: 'Private Office',
        ResourceId: data?.officeResourceTypeId,
      },
      {ResourceName: 'Dedicated Desk', ResourceId: data?.deskResourceTypeId},
    ]
    : !isMultiple && data?.officeResourceTypeId === ResourceId.privateOffice
      ? [{ResourceName: 'Private Office', ResourceId: data?.officeResourceTypeId}]
      : [{ResourceName: 'Dedicated Desk', ResourceId: data?.deskResourceTypeId}];

  // REQUEST FOR ADDING MEMBER
  const onSubmit = data => {
    // // console.log('hello im confirm data---', data);

    dispatch(AddMember(data))
      .unwrap()
      .then(result => {
        // console.log('redult add member---', result);
        bottomSheetConfirm.current?.snapToIndex(0);
      })
      .catch(err => {
        // console.log('add mem err---', err);
      });
  };
  //ON SELECTING RESOURCE IN CASE OF HYBRID
  const onSubmitResource = item => {
    // console.log('item-resrouce--', item);
    setResourceName({name: item?.ResourceName, id: item?.ResourceId});
  };

  return (
    <Frame style={styles.safeAreaContainer}>
      <View style={styles.mainContainer}>
        <View>
          {/* Name Input */}
          <Input
            Tag={'Name'}
            hideTag={false}
            accessibilityLabel="name"
            value={userName.value}
            // error={userName.error}
            hideErrorContainer={true}
            editable={!data?.name}
            onChangeText={text => {
              if (data?.name) {
                null;
              } else {
                setUserName({value: text, error: ''});
              }
            }}
            InputStyling={[styles.inputView,{
              backgroundColor:isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : AppTheme.COLORS.inputView,
             
            }]}
          />

         

          {/* email Input */}
          <Input
            Tag={'Work email address'}
            hideTag={false}
            value={email.value}
            error={email.error}
            errorDetail={email.error}
            editable={!data?.email}
            onChangeText={text => {
              if (data?.email) {
                null;
              } else {
                setEmail({
                  value: text,
                  error: bottomSheetEmailValidator(text),
                });
              }
            }}
            ContentContainerStyle={styles.textInputContainer}
            InputStyling={[styles.inputView,{
              backgroundColor:isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : AppTheme.COLORS.inputView,
            }]}
          />

          

          {/* Phone Number */}
          <Input
            accessibilityLabel="phone"
            Tag={'Phone number'}
            hideTag={false}
            value={phone.value}
            error={phone.error}
            errorDetail={phone.error}
            editable={!data?.phone}
            onChangeText={text => {
              if (data?.phone) {
                null;
              } else {
                setPhone({value: text, error: validatePhoneNumber(text)});
              }
            }}
            ContentContainerStyle={styles.textInputContainer}
            InputStyling={[styles.inputView,{
              backgroundColor:isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : AppTheme.COLORS.inputView,
             
            }]}
          />

         

          {/* Work Title */}
          <Input
            accessibilityLabel="workTitle"
            Tag={'Work title'}
            ContentContainerStyle={styles.textInputContainer}
            hideTag={false}
            value={workTitle.value}
            hideErrorContainer={true}
            editable={!data?.workTitle}
            onChangeText={text => {
              if (data?.workTitle) {
                null;
              } else {
                setWorkTitle({value: text, error: ''});
              }
            }}
            InputStyling={[styles.inputView,{
              backgroundColor:isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : AppTheme.COLORS.inputView,
             
            }]}
          />

        
          <View>
            <Txt style={styles.textInputLabel}>Select Resource</Txt>
            {isMultiple === true ? (
              <View
                style={
                  downIcon
                    ? [styles.inputViewContainer, {height: normalize(100),backgroundColor: isDarkMode
                      ? AppTheme.COLORS.wrapperDarkModeBg
                      : '#EEEEEE',}]
                    : [styles.inputViewContainer,{backgroundColor: isDarkMode
                      ? AppTheme.COLORS.wrapperDarkModeBg
                      : '#EEEEEE',}]
                }>
                <View style={styles.allignResources}>
                  <Txt style={styles.selectName}>
                    {resourceName ? resourceName?.name : 'Select Resource'}
                  </Txt>
                  {downIcon ? (
                    <View>
                      {resources?.map(item => {
                        const isOptionEnabled =
                          (item.ResourceId === ResourceId.privateOffice &&
                            data?.activeMembers?.privateOfficeMembers.length <
                              data?.capacity) ||
                          (item.ResourceId === ResourceId.dedicatedDesk &&
                            data?.activeMembers?.deskMembers.length < 40);

                        return (
                          <Pressable
                            key={item?.ResourceId}
                            onPress={() => {
                              onSubmitResource(item);
                              setDownIcon(false);
                              if (!isOptionEnabled) {
                                setFullCapacity(true);
                              }
                            }}>
                            <Txt
                              style={[
                                styles.textInput,
                                {marginTop: normalize(10)},
                              ]}>
                              {item?.ResourceName}
                            </Txt>
                          </Pressable>
                        );
                      })}
                    </View>
                  ) : null}
                </View>
                {downIcon ? (
                  <TouchableOpacity
                    style={styles.justifyContent}
                    onPress={() => {
                      setDownIcon(false);
                    }}>
                    <Entypo
                      name="chevron-thin-up"
                      size={22}
                      color={AppTheme.COLORS.text}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.justifyContent}
                    onPress={() => {
                      setDownIcon(true);
                      setFullCapacity(false);
                    }}>
                    <Entypo
                      name="chevron-thin-down"
                      size={22}
                      color={AppTheme.COLORS.text}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View>
                <View style={styles.allignResources}>
                  {resources?.map(item => (
                    <View
                      key={item?.ResourceId}
                      style={[
                        styles.inputViewContainer,
                        {
                          backgroundColor: isDarkMode
                            ? AppTheme.COLORS.wrapperDarkModeBg
                            : '#EEEEEE',
                        },
                      ]}>
                      <Txt
                        style={[styles.textInput, {marginTop: normalize(17)}]}>
                        {item?.ResourceName}
                      </Txt>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <View>
              <Txt style={styles.fullCap}>
                {fullCapacity
                  ? 'Hub is at full capacity right now, you can not add any new members.'
                  : null}
              </Txt>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.announcementContainer}>
            <View>
              {/* <Svg width={'100%'}> */}
              <AnnouncementAddMember
                stroke={isDarkMode ? AppTheme.COLORS.white : null} />
              {/* </Svg> */}
            </View>
            <Txt style={styles.announcementTxt}>
              After the request is approved, the team member will be added to
              your team contract. This will effect your next memo.
            </Txt>
          </View>
          <View style={styles.btnStyle}>
            <Botton
              accessibilityLabel="confirmBtn"
              loading={AddMemberPending === true ? true : false}
              title={'Confirm'}
              disabled={
                userName.value === '' ||
                 email.value === '' ||
                 email.error !== '' ||
                workTitle.value === '' ||
                phone.value === '' ||
                phone.error !== '' ||
                fullCapacity
                  ? true
                  : false
              }
              small={false}
              // stylesContainer={styles.btnStyle}

              onPress={() => {
                onSubmit({
                  name: userName.value,
                  email: email.value,
                  companyName: data?.companyName,
                  phoneNumber: phone.value,
                  workTitle: workTitle.value,
                  capacity: data?.capacity,
                  nexudusTeamId: Number(data?.nexudusTeamId),
                  resourceTypeId: isMultiple
                    ? resourceName?.id
                    : data?.officeResourceTypeId,
                });
              }}
            />

         
          </View>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetConfirm}
        snapPoints={snapPointsConfirm}
        backdropComponent={renderBackdropBottomSheet}
        index={-1}
        enablePanDownToClose={true}
        enabledInnerScrolling={true}
        backgroundStyle={{
          backgroundColor: isDarkMode
            ? AppTheme.COLORS.wrapperDarkModeBg
            : AppTheme.COLORS.white,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#D9D9D966',
        }}>
        <BottomSheetView
          style={[styles.bottomSheetTitle, {paddingHorizontal: normalize(20)}]}>
          <Txt style={styles.removeMember}>Request sent</Txt>
          <Txt style={[styles.removeMemberDone, {marginTop: normalize(20)}]}>
            Your request to add a new team member has been sent.You will be
            notified about the status. If accepted, the member will be added to
            your team.
          </Txt>
          <View style={styles.paddingHorizontal}></View>

          <Botton
            title={'Done'}
            onPress={() => {
              navigation.navigate(ScreensName.myTeam);
              bottomSheetConfirm.current?.close();
            }}
            singleButtonStyle={styles.DoneBtnStyle}
          />

      
        </BottomSheetView>
      </BottomSheet>
  
    </Frame>
  );
};

export default AddMembers;
