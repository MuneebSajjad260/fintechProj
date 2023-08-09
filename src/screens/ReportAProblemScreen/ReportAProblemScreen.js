import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Pressable, ScrollView, Image} from 'react-native';
import {AppTheme} from '../../shared/theme';
import styles from './ReportAProblemScreen.Style';
import normalize from 'react-native-normalize';
import {ScreensName} from '../../shared/constants/ScreensStrings';
//* Image
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import uuid from 'react-native-uuid';
//* Icons
import Feather from 'react-native-vector-icons/Feather';
import SupportIcon from '../../assets/images/SupportIcon.js';
import CloseIconWhite from '../../assets/images/CloseIconWhite.svg';
// *API'S
import {useDispatch, useSelector} from 'react-redux';
import {UploadFileToNexudus} from '../../shared/redux/action/UploadFileToNexudus';
import {ReportAProblem} from '../../shared/redux/action/ReportAProblem';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Input from '../../shared/components/core/Input';
import Wrapper from '../../shared/components/core/Wrapper';
import Botton from '../../shared/components/core/Botton';
import {scale} from '../../shared/utils/scale';

const ReportAProblemScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const {Id} = useSelector(selectUserData);
  //* Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  // *Import Image from Gallery
  const pickImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (!response.didCancel && response.assets.length > 0) {
        setSelectedImage({
          uri: String(response.assets[0].uri),
          name: String(response.assets[0].fileName),
          type: String(response.assets[0].type),
        });
      }
    } catch (error) {
      console.log('Error While Getting Image From Gallery:', error);
    }
  };

  /* Indicator for Button(Disabled) if in screen any of 2 inputs is filled 
  => remove disable from Button */

  useEffect(() => {
    if (
      (title.trim() !== '' &&
        description.trim() !== '' &&
        selectedImage !== null) ||
      (title.trim() !== '' && description.trim() !== '')
    ) {
      setDisable(false);
    } else {
      console.log('Please Enter Data:------------>');
      setDisable(true);
    }
  }, [title, description, selectedImage]);

  // ?API'S Calls
  // *Upload Image to Nexudus
  const uploadImage = () => {
    const filesToUpload = [
      {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
      },
    ];

    return dispatch(UploadFileToNexudus({files: filesToUpload}))
      .then(({payload: {files}}) => {
        if (files.length > 0) {
          return {
            ImageFileName: selectedImage.name,
            NewImageUrl: `https://storage.nexudus.com/api/content/uploads/files${files[0]}`,
          };
        }
      })
      .catch(error => {
        console.log(
          'Error occurred while uploading image:-------------->',
          error,
        );
        throw error;
      });
  };

  // *Submit The Entered Data
  const submitData = async () => {
    setIsDataSubmitted(true);

    const payloadData = {
      subject: title,
      description: description,
      CoworkerId: Id,
    };

    try {
      let imagePayload = {};
      if (selectedImage !== null) {
        imagePayload = await uploadImage();
      }

      const payload = {
        ...payloadData,
        ...imagePayload,
      };

      const {payload: apiResponse} = await dispatch(ReportAProblem(payload));
      console.log('API Response:------------>', apiResponse);

      setIsDataSubmitted(false);
      //* Bottom Sheet Popup
      bottomSheetRef.current?.expandBottomSheet();
      //* Clear States
      setTitle('');
      setDescription('');
      setSelectedImage(null);
    } catch (error) {
      setIsDataSubmitted(false);
      console.log('Error While Submitting Data:----------->', error);
    }
  };

  //* Bottom Sheet
  const bottomSheetRef = useRef(null);
  const snapPointsConfirm = useMemo(() => ['30%'], []);
  const BottomSheetContent = (
    <View style={styles.btmContainer}>
      {/* Content */}
      <View>
        <Txt style={styles.btmTitle}>Report Submitted</Txt>
        <Txt style={styles.btmDescription}>
          A member from our customer support team will contact you shortly via
          email. Thank you for your pateince
        </Txt>
      </View>
      {/* Button */}
      <Botton
        accessibilityLabel="backToMainMenu"
        loading={false}
        title={'Close'}
        disabled={false}
        onPress={() => {
          bottomSheetRef.current?.closeBottomSheet();
          navigation.replace(ScreensName.HelpDeskScreen);
        }}
        singleButtonStyle={{width: '100%'}}
      />
    </View>
  );

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPointsConfirm}
      bottomSheetContent={BottomSheetContent}
      ref={bottomSheetRef}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={{marginRight: scale(10, true)}}>
            <SupportIcon stroke={isDarkMode ? AppTheme.COLORS.white : null} />
          </View>
          <Txt style={styles.title}>
            Open a request. Get in touch with our customer support for any kind
            of assistance.
          </Txt>
        </View>
        <View style={styles.content}>
          {/* Body */}
          <View style={styles.bodyContainer}>
            {/* Title */}
            <Input
              ContentContainerStyle={styles.inputContainer}
              value={title}
              Tag={'Report Subject'}
              hideTag={false}
              TagStyling={styles.inputLabel}
              placeholder="Give a subject to you complaint"
              accessibilityLabel="Title Input"
              placeholderTextColor={AppTheme.COLORS.text}
              InputStyling={{
                borderColor: isDarkMode
                  ? AppTheme.COLORS.white
                  : AppTheme.COLORS.black,
              }}
              onChangeText={text => {
                setTitle(text);
                // console.log('Input Text (Title):------------>', title);
              }}
            />
            {/* Description */}
            <Input
              ContentContainerStyle={styles.inputContainer}
              multiline
              numberOfLines={14}
              textAlignVertical={'top'}
              Tag={'Description'}
              hideTag={false}
              TagStyling={styles.inputLabel}
              placeholder="Give a brief description to you complaint"
              accessibilityLabel="Description Input"
              placeholderTextColor={AppTheme.COLORS.text}
              InputStyling={{
                borderColor: isDarkMode
                  ? AppTheme.COLORS.white
                  : AppTheme.COLORS.black,
              }}
              value={description}
              onChangeText={text => {
                setDescription(text);
                // console.log('Input Text (Desc):------------->', description);
              }}
            />
            {/* Upload Image */}
            <View style={styles.uploadHeading}>
              <Txt style={[styles.inputLabel, {marginBottom: normalize(0)}]}>
                Upload Image
              </Txt>
            </View>
            {selectedImage === null ? (
              <Wrapper
                accessibilityLabel="Tap to Upload Image Button"
                onPress={pickImage}
                style={[
                  styles.uploadContainer,
                  styles.border,
                  {
                    borderColor: isDarkMode
                      ? AppTheme.COLORS.white
                      : AppTheme.COLORS.black,
                  },
                ]}
                hideShadow={true}
                isPressable={true}>
                {/* Heading */}
                <Txt style={styles.uploadTitle}>Upload any related image</Txt>
                {/* Icon & Text */}
                <View style={styles.iconContainer}>
                  <Feather
                    size={32}
                    color={AppTheme.COLORS.greyLight}
                    name="upload"
                  />
                  <Txt style={styles.iconText}>Tap to Upload</Txt>
                </View>
              </Wrapper>
            ) : (
              <Wrapper
                style={[
                  styles.border,
                  {
                    borderColor: isDarkMode
                      ? AppTheme.COLORS.white
                      : AppTheme.COLORS.black,
                  },
                ]}
                hideShadow={true}>
                <Pressable
                  onPress={() => {
                    setSelectedImage(null);
                  }}
                  style={styles.closeIcon}>
                  <Txt style={styles.closeIconText}>X</Txt>
                </Pressable>
                {/* Images View */}
                <View style={styles.imageViewContainer}>
                  <Pressable
                    accessibilityLabel="View The Selected Image Button"
                    onPress={() => {
                      setViewImage(true);
                    }}>
                    <Image
                      accessibilityLabel="Image"
                      source={{
                        uri: selectedImage.uri,
                      }}
                      style={styles.image}
                    />
                  </Pressable>
                </View>
              </Wrapper>
            )}
          </View>
        </View>
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Botton
            accessibilityLabel="saveDetails"
            loading={isDataSubmitted}
            title={'Save Details'}
            disabled={disable}
            onPress={submitData}
          />
        </View>
      </ScrollView>

      {/* Image Viewer */}
      {selectedImage !== null ? (
        <ImageView
          images={[
            {
              id: uuid.v4(),
              uri: selectedImage.uri,
            },
          ]}
          imageIndex={0}
          visible={viewImage}
          onRequestClose={() => setViewImage(false)}
        />
      ) : null}
    </Frame>
  );
};

export default ReportAProblemScreen;
