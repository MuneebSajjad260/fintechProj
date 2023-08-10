import React, {useRef, useCallback, useMemo, useState, useEffect} from 'react';
import styles from './ChangePlanScreen.Style';
import {View, ScrollView} from 'react-native';
import PlanChangeIcon from '../../assets/images/PlanChangeIcon.svg';
import {AppTheme} from '../../shared/theme';

// *API
import {useDispatch, useSelector} from 'react-redux';
import {UpdatePlanRequest} from '../../shared/redux/action/UpdatePlanRequest';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Txt from '../../shared/components/core/Txt';
import Frame from '../../shared/components/core/Frame';
import Input from '../../shared/components/core/Input';
import Botton from '../../shared/components/core/Botton';

const ChangePlanScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isDataInserted, setInsertingStatus] = useState(true);
  const [isDataSubmitted, setDataLoadingStatus] = useState(false);
  const [subjectTextLength, setSubjectTextLength] = useState('');
  const [descTextLength, setDescTextLength] = useState('');
  const [error, setError] = useState(null);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  // *Constants for Limit the input Length
  const MAX_CHARACTERS_SUBJECT = 20;
  const MAX_CHARACTERS_DESC = 100;

  const dispatch = useDispatch();
  const {Id} = useSelector(selectUserData);

  // *API Call
  const submitData = useCallback(async (title, desc) => {
    try {
      setDataLoadingStatus(true);
      const requiredData = {
        subject: title,
        description: desc,
        CoworkerId: Id,
      };
      const res = await dispatch(UpdatePlanRequest(requiredData)).unwrap();
      console.log('Response is Here:------------->', res);
      setDataLoadingStatus(false);
      BtmRef.current?.expandBottomSheet();
      // ?Clean Up
      setComment('');
      setTitle('');
    } catch (error) {
      setDataLoadingStatus(false);
      console.error('Error while updating plan: ', error);
      setError('Error while updating plan.');
    }
  }, []);

  // *If One of the input is filled change the Submit Button Disable Status to false
  useEffect(() => {
    if (title.trim() === '' || comment.trim() === '') {
      // Either title or comment is empty or only contains whitespace
      setInsertingStatus(true);
    } else {
      // Both title and comment have at least one non-whitespace character
      setInsertingStatus(false);
    }
  }, [title, comment]);

  //* Bottom Sheet
  const BtmRef = useRef(null);
  const snapPointsConfirm = useMemo(() => ['30%'], []);
  const bottomSheetContent = (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.bottomSheetContent}>
        <Txt style={styles.bottomSheetTitle}>Request Sent</Txt>
        <Txt style={styles.bottomSheetDesc}>
          Your information has been sent successfully.{'\n'}You may need to
          visit Fintech Saudi Space for further information
        </Txt>
      </View>
      <Botton
        loading={false}
        title={'Done'}
        disabled={false}
        onPress={() => {
          BtmRef.current?.closeBottomSheet();
          navigation.navigate(ScreensName.MembershipDetails);
        }}
      />
    </View>
  );
 
  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPointsConfirm}
      bottomSheetContent={bottomSheetContent}
      ref={BtmRef}
      >
      <ScrollView contentContainerStyle={styles.scrollCont}>
        <View style={styles.content}>
          {/* Header */}
          <Txt style={styles.headerTitle}>
            Open a request. Get in touch with our representative at Fintech
            Saudi Space
          </Txt>
          {/* Body */}
          <View style={styles.defAlignment}>
            <View style={styles.planChangeHeaderContainer}>
              <PlanChangeIcon />
              <Txt style={[styles.InputLabel, {marginLeft: 8}]}>
                Plan Change
              </Txt>
            </View>
            <Txt style={styles.worldLength}>
              {subjectTextLength.length}/{MAX_CHARACTERS_SUBJECT}
            </Txt>
          </View>
          {/* Subject */}
          <View style={styles.inputContainer}>
            <Input
              value={title}
              placeholder="Give a title to your plan change"
              maxLength={MAX_CHARACTERS_SUBJECT}
              accessibilityLabel="Subject Input"
              placeholderTextColor={AppTheme.COLORS.text}
              onChangeText={text => {
                setTitle(text);
                // console.log('Input Text (Title):------------->', title);
                if (subjectTextLength.length <= MAX_CHARACTERS_SUBJECT) {
                  setSubjectTextLength(text);
                }
              }}
              InputStyling={[
                styles.input,
                {
                  borderColor: isDarkMode
                    ? AppTheme.COLORS.white
                    : AppTheme.COLORS.black,
                },
              ]}
            />
          </View>
          <View style={styles.defAlignment}>
            <Txt style={[styles.InputLabel, {marginTop: 16, marginBottom: 8}]}>
              What do you want to change in plan ?
            </Txt>
            <Txt style={styles.worldLength}>
              {descTextLength.length}/{MAX_CHARACTERS_DESC}
            </Txt>
          </View>
          {/* Description */}
          <View style={styles.inputContainer}>
            <Input
              value={comment}
              multiline
              maxLength={MAX_CHARACTERS_DESC}
              numberOfLines={24}
              textAlignVertical={'top'}
              placeholder="Give a brief description about your change in plan"
              accessibilityLabel="Comment Input"
              placeholderTextColor={AppTheme.COLORS.text}
              ContentContainerStyle={{height: 320}}
              onChangeText={text => {
                setComment(text);
                // console.log('Input Text (Comment):------------->', comment);
                if (descTextLength.length <= MAX_CHARACTERS_DESC) {
                  setDescTextLength(text);
                }
              }}
              InputStyling={[
                styles.input,
                {
                  borderColor: isDarkMode
                    ? AppTheme.COLORS.white
                    : AppTheme.COLORS.black,
                },
              ]}
            />
          </View>
        </View>
        <View>
          {/* Submit Button */}
          <Botton
            loading={isDataSubmitted}
            title={'Submit details'}
            disabled={isDataInserted}
            onPress={() => {
              submitData(title, comment);
            }}
          />
        </View>
      </ScrollView>
    </Frame>
  );
};

export default ChangePlanScreen;
