/* eslint-disable no-unused-vars */
import React, { } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useCallback, useState } from 'react';
import { Svg } from 'react-native-svg';
import InvitationSent from '../../assets/images/InvitationSent.svg';
import styles from './BankTransferScreen.Style';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { PrimaryButton, SecondaryButton } from '../../shared/components';
import { AppTheme } from '../../shared/theme';
import normalize from 'react-native-normalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//import CheckBox from '@react-native-community/checkbox';
import { Divider } from 'react-native-paper';
// import { CheckBox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
const BankTransferScreen = () => {
  const bottomSheetRefParticipants = useRef(null);
  const bottomSheetRefAddGuest = useRef(null);
  const bottomSheetRefSendInvitation = useRef(null);


  const snapPointsParticipants = useMemo(() => ['60%'], []);
  const snapPointsAddGuest = useMemo(() => ['92%'], []);
  const snapPointsSendInvitation = useMemo(() => ['38%'], []);
  const renderBackdropBottomSheet = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        BackdropPressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );


  const initialParticipants = [
    { id: 1, name: 'Saqib', checked: false },
    { id: 2, name: 'Taha', checked: false },
    { id: 3, name: 'Amir', checked: false },
    { id: 4, name: 'Shehryar', checked: false }
  ];



  const [input, setInput] = useState('');
  const [guestarr, setguestarr] = useState([]);

  // console.log("inputarr?.length", inputarr?.length > 8)
  const [participants, setParticipants] = useState(initialParticipants);
  const [newparticipants, setnewParticipants] = useState([]);
  // console.log("checkbox1111", participants)
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selectedparticipants, setselectedparticipants] = useState([]);
  const noofparticipants = [];

  const pressCheckBox = () => {
    setToggleCheckBox(!toggleCheckBox);

    console.log('hello');
  };
  const addGuest = (text) => {
    setInput({ input: text });

  };

  let name = input;
  const pressAddGuest = (e) => {
    setguestarr([...guestarr, { name }]);


    setInput(' ');
  };
  const removeGuest = (name) => {
    console.log('object====>', name);
    console.log('name====>', name.name.input);
    const deleted = guestarr.filter((participant) => participant.name !== name.name);
    setguestarr(deleted);
    console.log(' guest  Left', deleted);
  };
  const removeparticipants = (id) => {
    console.log('object====>', id);
    console.log('id====>', id.id);
    const deleted = selectedparticipants.filter((participant) => participant.id !== id.id);
    setselectedparticipants(deleted);
    console.log(' participants Left', deleted);

  };


  const onselectparticipant = (id) => {
    let temp = participants.map((participant) => {
      console.log('participantchecked', !participant.checked);
      console.log('id', participant.id, id);
      if (id === participant.id) {
        return { ...participant, checked: !participant.checked };
      }
      return { ...participant, checked: participant.checked };
    });
    setParticipants(temp);
    console.log('participants are ', participants);
  };




  const checkedparticipants = () => {
    const listselected = participants.filter(item => item.checked == true);
    console.log('selected', listselected);
    setselectedparticipants(listselected);
    // console.log("hhhhh", selectedparticipants)
    // return listselected

  };
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: AppTheme.COLORS.white }}>
      <SafeAreaView style={styles.maincontainer}>
        <View style={styles.innerContainer}>


          <Text style={styles.mainHeadingText}> Your approval is pending! </Text>
          <Text style={styles.screentext}>Your receipt has been uploaded, is being reviewed by our team, you will be notified via notification. </Text>
          <View style={{ marginTop: 50 }}>
            <SecondaryButton
              title={'Send Invitations'}
              small={false}
              styleBtnTxt={{
                color: AppTheme.COLORS.black,
                fontSize: normalize(16),
                fontFamily: AppTheme.FONTS.TYPE.BOLD,
                fontWeight: '600',
                lineHeight: normalize(18)
              }}
              onPress={() => {

                bottomSheetRefParticipants.current?.snapToIndex(0);
              }}

              styleMainContainer={{ borderColor: 'black' }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <PrimaryButton
              loading={false}
              title={'Go to main menu'}
              disabled={false}
              small={false}
              onPress={() => { }}
              stylesContainer={{}}
            />
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRefParticipants}
          snapPoints={snapPointsParticipants}
          backdropComponent={renderBackdropBottomSheet}
          index={-1}
          enablePanDownToClose={true}
          enabledInnerScrolling={true}
        >
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text style={styles.bottomsheetheadingtext}>MEETING INVITATION</Text>
              <Text style={styles.bottomsheetsubheadingtext}>You can invite a maximum of 8 participants</Text>
              {/* {

                                !selectedparticipants.map((d) => { */}







              {/* <Button title="save" onPress={() => { checkedparticipants() }}></Button>
                        {selectedparticipants.map((d) => <Text key={d.name}>{d.name}</Text>)} */}

              <FlatList

                data={participants}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                renderItem={({ item, index }) => {

                  return (
                    <TouchableOpacity onPress={() => {
                      onselectparticipant(item.id);

                      console.log('new parci', selectedparticipants);
                    }
                    }
                    >

                      <View style={[styles.flexdirectionrow, {
                        alignItems: 'center', justifyContent: 'space-between', //paddingHorizontal: normalize(30),
                        backgroundColor: AppTheme.COLORS.secondaryGreyLightBg,
                        height: normalize(65),
                        borderRadius: normalize(10),
                        padding: normalize(12),
                        width: '100%',
                        marginTop: 12,
                        borderColor: AppTheme.COLORS.primaryGreenBg,
                        borderWidth: (item.checked) === true ? 1.5 : 0
                      }]}>

                        <Text style={styles.participantsandguesttext}>{item.name}</Text>

                        {/* <CheckBox
                                            disabled={false}
                                            value={item.name}
                                            onValueChange={
                                                // (value) =>
                                                //     setParticipants([{ ...participants, checked: value }])
                                                () => { onselectparticipant(item, index) }
                                            }
                                            boxType="square"
                                            tintColor='#172659'
                                            onCheckColor='white'
                                            onFillColor='#172659'
                                            onTintColor='#172659'
                                            onAnimationType='fade'
                                            offAnimationType='fade'
                                            animationDuration={0.4}


                                        /> */}
                        {item.checked && <View style={{
                          backgroundColor: AppTheme.COLORS.primaryGreenBg,
                          height: normalize(20),
                          width: normalize(20),
                          borderRadius: normalize(50),
                          justifyContent: 'center'
                        }}>
                          <MaterialCommunityIcons
                            name={(item.checked) === true ? 'check' : null} size={20}
                            color={AppTheme.COLORS.white} />

                        </View>
                        }


                      </View>

                    </TouchableOpacity>
                  // <>
                  //     <InputTeamMember
                  //         IsAdminOrPayingMember={item?.checked}
                  //         isSelected={item?.isSelected}
                  //         onPress={() => onselectparticipant(item.id)}
                  //         teamMemberName={item?.name}
                  //     // userRole={item?.userRole}
                  //     />
                  // </>

                  );
                }}

              />

              {/* })} */}




              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: normalize(16), marginVertical: normalize(36) }}>
                <SecondaryButton
                  title={'Add Guest'}
                  small={false}
                  styleBtnTxt={{
                    color: AppTheme.COLORS.black,
                    fontSize: normalize(16),
                    fontFamily: AppTheme.FONTS.TYPE.BOLD,
                    fontWeight: '600',
                    lineHeight: normalize(18)
                  }}
                  onPress={() => {
                    bottomSheetRefAddGuest.current?.snapToIndex(0);
                    bottomSheetRefParticipants.current?.close();
                    checkedparticipants();

                  }}

                  styleMainContainer={{ borderColor: 'black', width: '35%', marginRight: normalize(20) }}
                />
                <PrimaryButton
                  loading={false}
                  title={'Send Invitation'}
                  disabled={false}
                  small={false}
                  onPress={() => {
                    bottomSheetRefSendInvitation.current?.snapToIndex(0);
                    bottomSheetRefParticipants.current?.close();
                  }}
                  stylesContainer={{ width: '58%' }}
                />
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>


        <BottomSheet
          ref={bottomSheetRefAddGuest}
          snapPoints={snapPointsAddGuest}
          backdropComponent={renderBackdropBottomSheet}
          index={-1}
          enablePanDownToClose={true}
          enabledInnerScrolling={true}
        >

          <BottomSheetScrollView>

            <Text style={styles.bottomsheetheadingtext}>MEETING INVITATION</Text>


            <View style={styles.bottomsheetcontainer}>
              <View style={[styles.flexdirectionrow, { alignItems: 'center', justifyContent: 'space-between', marginTop: normalize(35) }]}>
                <Text style={styles.participanttext}>Participants</Text>
                <Text style={styles.editteamtext}>Edit Team</Text>
              </View>
              {
                ((selectedparticipants?.length + guestarr?.length) >= 1) ?

                  <View style={styles.participantsviewcontainer}>
                    <View style={styles.participantsviewinnercontainer}>



                      {selectedparticipants.map((d) =>
                        // eslint-disable-next-line react/jsx-key
                        <View>

                          <View style={[
                            styles.flexdirectionrow, {
                              alignItems: 'center', justifyContent: 'space-between'
                            }]}>
                            {/* <Text style={{ fontSize: 16, fontWeight: "400", color: "#333333" }}> */}
                            <Text style={styles.participantsandguesttext} key={d.id}>{d.name}</Text>
                            {/* </Text> */}
                            <View style={[
                              styles.flexdirectionrow, {
                                alignItems: 'center', justifyContent: 'flex-end'
                              }]}>
                              <View style={styles.teammembercontainer}>
                                <Text style={styles.teammembertext}>Team Member</Text>
                              </View>
                              <View style={{ marginLeft: normalize(10) }}>
                                <MaterialCommunityIcons name='close' color={'red'} size={normalize(18)} onPress={() => { removeparticipants(d); }} />
                              </View>
                            </View>
                          </View><Divider style={styles.divider} />


                        </View>

                      )}

                      <FlatList
                        data={guestarr}

                        renderItem={({ item, d }) => {
                          return (
                            <View>

                              <View style={[
                                styles.flexdirectionrow, {
                                  alignItems: 'center', justifyContent: 'space-between'
                                }]}>
                                <Text style={styles.participantsandguesttext} >{item.name.input}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                  <View style={styles.guestcontainer}>
                                    <Text style={styles.guesttext}>Guest</Text>
                                  </View>
                                  <View style={{ marginLeft: normalize(10) }}>
                                    <MaterialCommunityIcons name='close' color={'red'} size={normalize(18)} onPress={() => { removeGuest(item); }} />
                                  </View>
                                </View>
                              </View>
                              <Divider style={styles.divider} />
                            </View>
                          );
                        }

                        }
                      />


                    </View>

                  </View>
                  :
                  <View style={styles.participantsviewcontainer}>
                    <View style={styles.participantsviewinnercontainer}>
                      <Text>No participant</Text>
                    </View>
                  </View>
              }
              {

                !((selectedparticipants?.length + guestarr?.length) >= 6) ?
                  <>
                    {/* {console.log('guest array', guestarr.length)}
                    {console.log('selected participants array', selectedparticipants.length)}
                    {console.log('bigarray', selectedparticipants.length + guestarr.length)} */}

                    <View style={[
                      styles.flexdirectionrow, {
                        alignItems: 'center', justifyContent: 'space-between', marginTop: normalize(24)
                      }]}>
                      <Text style={styles.addguesttext}>Add Guest</Text>
                      <TouchableOpacity onPress={() => { console.log('close me please!!'); }}>
                        <Text style={styles.closetext}>Close</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.textinputscontainer}>
                      <View style={styles.textinputsinnercontainer}>
                        <Text style={styles.label}>Name</Text>
                        <View style={{ paddingVertical: 12 }}>
                          <TextInput
                            label="Name"
                            style={styles.input}
                            onChangeText={addGuest}
                            value={input}
                          />
                        </View>
                        <Text style={styles.label}>Email</Text>
                        <View style={{ paddingVertical: 12 }}>
                          <TextInput
                            label="Email"
                            style={styles.input}
                            onSubmitEditing={(text) => {
                              // eslint-disable-next-line no-undef
                              setName({ value: text });
                            }}
                            value={name}
                          />
                        </View>

                      </View>
                    </View>



                    <View style={[
                      styles.flexdirectionrow, {
                        alignItems: 'center', marginVertical: normalize(23)
                      }]}>

                      <SecondaryButton
                        title={'Add Guest'}
                        small={false}
                        styleBtnTxt={{
                          color: AppTheme.COLORS.black,
                          fontSize: normalize(16),
                          fontFamily: AppTheme.FONTS.TYPE.BOLD,
                          fontWeight: '600',
                          lineHeight: normalize(18)
                        }}
                        onPress={() => {
                          pressAddGuest();
                          console.log('guestarr', guestarr);
                        }}
                        // styleMainContainer={{ marginTop: normalize(10), flex: 0.8, borderRadius: normalize(10) }}
                        styleMainContainer={{ borderColor: 'black', width: '35%', marginRight: normalize(20) }}
                      />


                      <PrimaryButton
                        loading={false}
                        title={'Send Invitation'}
                        disabled={false}
                        small={false}
                        onPress={() => {
                          bottomSheetRefSendInvitation.current?.snapToIndex(0);
                          bottomSheetRefAddGuest.current?.close();
                        }}
                        stylesContainer={{ flex: 1 }}
                      />
                    </View>
                  </>

                //ternary else condition
                  :



                  <>



                    <Text>added 8 participants , cant add more</Text>

                    <View style={[
                      styles.flexdirectionrow, {
                        alignItems: 'center', justifyContent: 'space-between', marginTop: normalize(24)
                      }]}>
                      <Text style={styles.addguesttext}>Add Guest</Text>
                      <Text style={styles.closetext}>Close</Text>
                    </View>
                    <View style={styles.textinputscontainer}>
                      <View style={styles.textinputsinnercontainer}>
                        <Text style={styles.label}>Name</Text>
                        <View style={{ paddingVertical: 12 }}>
                          <TextInput
                            label="Name"
                            editable={false}
                            style={styles.input}
                            onChangeText={addGuest}
                            value={input}
                          />
                        </View>
                        <Text style={styles.label}>Email</Text>
                        <View style={{ paddingVertical: 12 }}>
                          <TextInput
                            label="Email"
                            editable={false}
                            style={styles.input}
                            onSubmitEditing={(text) => {
                              // eslint-disable-next-line no-undef
                              setName({ value: text });
                            }}
                            value={name}
                          />
                        </View>

                      </View>
                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 23 }}>

                      <SecondaryButton
                        title={'Add Guest'}
                        disabled
                        small={false}
                        styleBtnTxt={{
                          color: AppTheme.COLORS.black,
                          fontSize: normalize(16),
                          fontFamily: AppTheme.FONTS.TYPE.BOLD,
                          fontWeight: '600',
                          lineHeight: normalize(18)
                        }}
                        onPress={() => {
                          pressAddGuest();
                          console.log('guestarr', guestarr);
                        }}
                        // styleMainContainer={{ marginTop: normalize(10), flex: 0.8, borderRadius: normalize(10) }}
                        styleMainContainer={{ borderColor: 'black', width: '35%', marginRight: normalize(20) }}
                      />


                      <PrimaryButton
                        loading={false}
                        title={'Send Invitation'}
                        disabled={false}
                        small={false}
                        onPress={() => {
                          bottomSheetRefSendInvitation.current?.snapToIndex(0);
                          bottomSheetRefAddGuest.current?.close();
                        }}
                        stylesContainer={{ flex: 1 }}
                      />
                    </View>
                  </>
              }
            </View>


          </BottomSheetScrollView>
        </BottomSheet>

        <BottomSheet
          ref={bottomSheetRefSendInvitation}
          snapPoints={snapPointsSendInvitation}
          backdropComponent={renderBackdropBottomSheet}
          index={-1}
          enablePanDownToClose={true}
          enabledInnerScrolling={true}
        >
          <View style={{ paddingHorizontal: 16, }}>
            <Text style={styles.bottomsheetheadingtext}>INVITATION SENT</Text>
            <View style={{ alignSelf: 'center', marginVertical: 24 }}>
              <Svg width={'100%'} >
                <InvitationSent />
              </Svg>
            </View>
            <PrimaryButton
              loading={false}
              title={'Back to summary'}
              disabled={false}
              small={false}
              onPress={() => { }}

            />
          </View>
        </BottomSheet>


      </SafeAreaView>
    </GestureHandlerRootView >
  );
};


export default BankTransferScreen;
