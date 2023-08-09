import React, {useState, useRef, useCallback, useMemo} from 'react';

import styles from './UpdatePasswordScreen.Style';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';

import {Svg} from 'react-native-svg';
import Listicon from '../../assets/images/listdiamond.svg';
import {AppTheme} from '../../shared/theme';
import {PrimaryButton} from '../../shared/components';
import InvitationSent from '../../assets/images/InvitationSent.svg';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import normalize from 'react-native-normalize';

const UpdatePasswordScreen = () => {
  const [passsword, setPassword] = useState('');
  const guidlines = [
    {guidline: 'Must be a minimum of 8 characters long'},
    {guidline: 'Must contain an uppercase letter'},
    {guidline: 'Must contain a number'},
  ];

  const bottomSheetRefUpdatePassword = useRef(null);

  const snapPointsUpdatePassword = useMemo(() => ['38%'], []);

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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.changepassword}>CHANGE PASSWORD</Text>
          <View style={{marginTop: 13, paddingHorizontal: 9}}>
            <Text style={styles.guidlinetext}>
              Please follow these Guidelines
            </Text>
            <FlatList
              data={guidlines}
              contentContainerStyle={{marginTop: 10}}
              renderItem={({item}) => {
                return (
                  <View style={styles.allignguidlines}>
                    <Svg width={'8%'}>
                      <Listicon />
                    </Svg>
                    <Text
                      style={[
                        styles.guidlinetext,
                        {
                          fontFamily: AppTheme.FONTS.TYPE.REGULAR,
                          fontSize: normalize(14),
                        },
                      ]}>
                      {item.guidline}
                    </Text>
                  </View>
                );
              }}
            />
          </View>

          <Text style={styles.passwordheadings}>Old Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={password => {
                setPassword(password);
                console.log(passsword);
              }}
              value={passsword}
            />
          </View>
          <Text style={styles.passwordheadings}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              // onChangeText={name => setName(name)}
              // value={Name}
            />
          </View>
          <Text style={styles.passwordheadings}>Re-enter new password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              // onChangeText={name => setName(name)}
              // value={Name}
            />
          </View>

          <View style={{marginTop: normalize(100)}}>
            <PrimaryButton
              loading={false}
              title={'Update Password'}
              disabled={false}
              small={false}
              onPress={() => {
                bottomSheetRefUpdatePassword.current?.snapToIndex(0);
                // handleEditedName()
                // bottomSheetRefParticipants.current?.close()
                console.log('password is updated ');
              }}
            />
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRefUpdatePassword}
        snapPoints={snapPointsUpdatePassword}
        backdropComponent={renderBackdropBottomSheet}
        index={-1}
        enablePanDownToClose={true}
        enabledInnerScrolling={true}>
        <View>
          <View style={{alignSelf: 'center', marginVertical: 24}}>
            <Svg width={'100%'}>
              <InvitationSent />
            </Svg>
          </View>
          <Text style={styles.passwordupdatedtext}>PASSWORD UPDATED</Text>
          <Text style={styles.Updatedconfirmationtext}>
            You password has been updated
          </Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default UpdatePasswordScreen;
