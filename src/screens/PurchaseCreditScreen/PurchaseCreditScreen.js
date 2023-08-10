import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
import {View, Modal, TouchableWithoutFeedback} from 'react-native';
import styles from './PurchaseCreditScreen.Style';
import {PrimaryButton, SecondaryButton} from '@components';
import {ScreensName} from '../../shared/constants/ScreensStrings.js';
// Icon
import AlertRed from '../../assets/images/AlertRed.svg';
import CreditAddedIcon from '../../assets/images/CreditAddedIcon.js';
import TeamCreditsBlueIcon from '../../assets/images/TeamCreditsBlueIcon.js';
import TickOrange from '../../assets/images/TickOrange.svg';
// API
import {PurchaseCredit} from '../../shared/redux/action/PurchaseCredit';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {GetTeam} from '../../shared/redux/action/GetTeam';

// Bottom Sheet
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import TeamListItem from '../../shared/components/TeamListItem/TeamListItem';
import {FlatList} from 'react-native';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Wrapper from '../../shared/components/core/Wrapper';
import Botton from '../../shared/components/core/Botton';
import {AppTheme} from '../../shared/theme';
import {scale} from '../../shared/utils/scale';

export default function PurchaseCreditScreen({
  navigation,
  route: {
    params: {Id, Name, Price, CurrencyCode},
  },
}) {
  const {FullName} = useSelector(selectUserData);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState([FullName]);
  const [teamMembers, setTeamMembers] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth?.data?.access_token);
  const {IsTeamAdministrator} = useSelector(selectUserData);
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  // *API Modules
  // *Purchase Credit
  const purchaseCreditFunc = useCallback(
    async (selectedItem, teamMembers) => {
      if (selectedItem.length > 0 && teamMembers.length > 0) {
        try {
          setIsLoading(true);
          const requiredData = teamMembers
            .filter(item => selectedItem.includes(item.Name))
            .map(item => ({CoworkerId: item.Id, ProductId: Id}));
          console.log(requiredData);

          for (const item of requiredData) {
            const requiredData = {
              CoworkerId: item.CoworkerId,
              ProductId: item.ProductId,
            };
            const response = await dispatch(
              PurchaseCredit(requiredData),
            ).unwrap();
            console.log('API Response is HERE:-------------->', response);
          }

          setVisible(true);
          setIsLoading(false);
          setSelectedItem([]);
          // bottomSheetRefSendInvitation.current?.close();
          BtmRef.current?.closeBottomSheet();
        } catch (error) {
          setVisible(false);
          setIsLoading(false);
          console.error('Error while purchasing credit: ', error);
          setError('Error while purchasing credit.');
        }
      } else {
        setVisible(false);
        setIsLoading(false);
        console.log('Please Provide Proper Data to Proceed!');
      }
    },
    [dispatch],
  );

  // *Get Team Members
  const GetTeamMembers = useCallback(async () => {
    try {
      const [{AllTeamMembers}] = await dispatch(GetTeam(token)).unwrap();
      const newData = AllTeamMembers.map(({FullName, Id}) => ({
        Name: FullName,
        Id,
      }));

      // *Align the matched item and place it to the of the list
      const defaultMember = newData.find(member => member.Name === FullName);
      const updatedMembers = [
        defaultMember,
        ...newData.filter(member => member !== defaultMember),
      ];

      setTeamMembers(updatedMembers);
      console.log('API Response Is Here 3:----------->', updatedMembers);
    } catch (error) {
      setTeamMembers([]);
      console.error('Error while getting membership details: ', error);
      setError({Error: error});
    }
  }, [dispatch, token]);

  // *API Call
  useEffect(() => {
    // *Get Team Members
    GetTeamMembers();
  }, [dispatch]);

  // ?Cleanup
  useEffect(() => {
    return () => {
      setTeamMembers([]);
      setIsLoading(false);
    };
  }, []);

  // *Modal Functionalities
  const handleHideModal = () => {
    // if (Id && coWorkerId) {
    setVisible(false);
    // }
  };

  // console.log('Selected:------------->', selectedItem);

  // ?Team List
  // *FlatList
  const renderItem = ({item: {Name, Id}}) => (
    <View style={{marginBottom: 14}}>
      <TeamListItem
        name={Name}
        counterVerify={FullName}
        credits={Price}
        isSelected={selectedItem.includes(Name)}
        isLoading={false}
        onPress={() => handlePress(Name)}
      />
    </View>
  );

  // *Select Team Members Logic
  const handlePress = item => {
    console.log(selectedItem);
    if (selectedItem.includes(item)) {
      setSelectedItem(
        selectedItem.filter(selectedItem => selectedItem !== item),
      );
    } else {
      setSelectedItem([...selectedItem, item]);
    }
  };

  //* Bottom Sheet
  const BtmRef = useRef(null);
  const snapPoints = useMemo(() => ['26%'], []);
  const BottomSheetContent = (
    <View style={styles.btmContainer}>
      {/* Content */}
      <Txt style={styles.btmDescription}>
        Are you sure you want to {'\n'} purchase credits for {CurrencyCode}{' '}
        {Price}?
      </Txt>
      {/* Buttons */}
      <Botton
        variant={'v2'}
        continueTitle={'Yes'}
        cancelTitle={'No'}
        loading={isLoading}
        onContinue={() => {
          purchaseCreditFunc(selectedItem, teamMembers);
        }}
        onCancel={() => {
          BtmRef.current?.closeBottomSheet();
        }}
      />
    </View>
  );

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPoints}
      bottomSheetContent={BottomSheetContent}
      screenTitle={'Add Credit'}
      mode={'View'}
      ref={BtmRef}
    >
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View>
            <Txt style={styles.heading}>Summary</Txt>
          </View>
          {/* Printing Credit Card */}
          <Wrapper style={styles.printingCreditContainer}>
            <View style={styles.creditIcon}>
              <TeamCreditsBlueIcon
                width={scale(67, true)}
                height={scale(82)}
                stroke={isDarkMode ? AppTheme.COLORS.white : null}
              />
            </View>
            <Txt style={styles.printingCreditTitle}>{Name}</Txt>
            <View style={styles.pricingContainer}>
              <View style={styles.amountContainer}>
                <Txt style={styles.creditTitle}>Amount</Txt>
                <Txt style={styles.amount}>
                  {CurrencyCode} {Price}{' '}
                  <Txt style={styles.x1}>x{selectedItem.length}</Txt>
                </Txt>
              </View>
              <View style={styles.creditContainer}>
                <Txt style={styles.creditTitle}>Credits</Txt>
                <Txt style={styles.credit}>
                  {Price} <Txt style={styles.x1}>x{selectedItem.length}</Txt>
                </Txt>
              </View>
            </View>
            <View style={styles.alertContainer}>
              <AlertRed />
              {IsTeamAdministrator ? (
                <Txt style={styles.alertText}>
                  This amount will be charged in your next team’s memo for
                  each of the member selected.
                </Txt>
              ) : (
                <Txt style={styles.alertText}>
                  This amount will be charged in your next team’s memo.
                </Txt>
              )}
            </View>
          </Wrapper>
          {/* Team Members */}
          {IsTeamAdministrator ? (
            <View style={styles.teamContainer}>
              <Txt
                style={[
                  styles.heading,
                  {marginTop: AppTheme.SPACINGS.MARGINS.M1},
                ]}>
                Purchasing For
              </Txt>
              {teamMembers.length > 0 ? (
                <FlatList
                  data={teamMembers}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={() => {
                    return (
                      <View style={styles.notfoundContainer}>
                        <Txt style={styles.notfound}>
                          No team members found!
                        </Txt>
                      </View>
                    );
                  }}
                />
              ) : (
                <View>
                  {[...Array(3)].map(index => {
                    return (
                      <View
                        key={index}
                        style={{marginBottom: AppTheme.SPACINGS.MARGINS.M1}}>
                        <TeamListItem isLoading={true} />
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          ) : null}
        </View>
        {/* Purchase Button */}
        <Botton
          loading={false}
          title={'Purchase'}
          disabled={selectedItem.length > 0 ? false : true}
          onPress={() => {
            BtmRef.current?.expandBottomSheet();
          }}
          singleButtonStyle={{width: '100%'}}
        />

        {/* Credit Added Modal */}
        <Modal visible={visible} animationType="slide" transparent={true}>
          <TouchableWithoutFeedback onPress={handleHideModal}>
            <View style={styles.overlay}>
              <Wrapper style={styles.modal}>
                <View style={styles.iconContainer}>
                  <CreditAddedIcon
                    stroke={isDarkMode ? AppTheme.COLORS.white : null}
                  />
                </View>
                <View style={styles.modalContent}>
                  <Txt style={styles.modalTitle}>Credits added</Txt>
                  <Txt style={styles.modalDescription}>
                    You have successfully purchased the {'\n'} printing credits
                    package
                  </Txt>
                </View>
                <View>
                  <Botton
                    loading={false}
                    title={'Go to home'}
                    disabled={false}
                    onPress={() => {
                      setVisible(!visible);
                      navigation.replace(ScreensName.TeamCreditsScreen);
                    }}
                  />
                </View>
              </Wrapper>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </Frame>
  );
}
