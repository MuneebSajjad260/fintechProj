import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
// *Components
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import Wrapper from '../../shared/components/core/Wrapper';
import Input from '../../shared/components/core/Input';
import Botton from '../../shared/components/core/Botton';
// *Icons
import CloudUploadIcon from '../../assets/images/CloudUploadIcon.svg';
import CloseIcon from '../../assets/images/CloseIcon.svg';

// *Others
import {AppTheme} from '../../shared/theme';
import styles from './InvoiceDetailScreen.Style';
import uuid from 'react-native-uuid';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import moment from 'moment';
import PropTypes from 'prop-types';

// *API'S
import {useDispatch} from 'react-redux';
import {UploadFiles} from '../../shared/redux/action/UploadFiles';
import {SubmitInvoice} from '../../shared/redux/action/SubmitInvoice';

export default function InvoiceDetailScreen({navigation, route}) {
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDataForUpload, setImageUploadData] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [isDataFilled, setDataStatus] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const dispatch = useDispatch();

  // *Get Passed Data
  const {
    invoiceDetails,
    DueDate,
    teamName,
    membershipDetails: {teamId},
  } = route.params;

  // *Change The Screen Title
  useEffect(() => {
    navigation.setOptions({
      title: 'Detailed Invoice',
    });
  }, []);

  // *Import Image from Gallery
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          setSelectedImage(null);
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log(
            'Error While Getting Image From Gallery:------------>',
            response.error,
          );
          setSelectedImage(null);
        } else if (response.assets && response.assets.length > 0) {
          setImageUploadData({
            uri: String(response.assets[0].uri),
            name: String(response.assets[0].fileName),
            type: String(response.assets[0].type),
          });
          setSelectedImage({
            uri: String(response.assets[0].uri),
            id: uuid.v4(),
          });
        }
      },
    );
  };

  /*
  * Indicator for Button(Disabled) if in screen any of 2 inputs is filled 
  * => remove disable from Button 
  */
  useEffect(() => {
    if ((selectedImage !== null && comment) || selectedImage !== null) {
      setDataStatus(false);
    } else {
      console.log('Please Enter Data:------------>');
      setDataStatus(true);
    }
  }, [comment, selectedImage]);

  // ?API Call
  // *Submit The Entered Data(Image & Comment)
  const submitData = () => {
    if (imageDataForUpload !== null) {
      setIsDataSubmitted(true);
      const filesToUpload = [
        {
          uri: imageDataForUpload.uri,
          type: imageDataForUpload.type,
          name: imageDataForUpload.name,
        },
      ];

      dispatch(UploadFiles({files: filesToUpload}))
        .then(
          ({
            meta: {
              arg: {files},
            },
          }) => {
            if (files.length > 0) {
              // *Data to Post
              const requiredData = {
                DueDate: String(DueDate),
                InvoiceDoc: String(files[0].name),
                PlanPrice: Number(
                  invoiceDetails
                    .reduce((acc, {SubTotal}) => acc + SubTotal, 0)
                    .toFixed(2),
                ),
                TaxPrice: Number(
                  invoiceDetails
                    .reduce((acc, {TaxAmount}) => acc + TaxAmount, 0)
                    .toFixed(2),
                ),
                TotalPrice: Number(
                  (
                    invoiceDetails.reduce(
                      (acc, {TaxAmount}) => acc + TaxAmount,
                      0,
                    ) +
                    invoiceDetails.reduce(
                      (acc, {SubTotal}) => acc + SubTotal,
                      0,
                    )
                  ).toFixed(2),
                ),
                OtherPrice: 0,
                InvoiceNo: invoiceDetails[0].CoworkerInvoiceInvoiceNumber,
                InvoiceId: Number(invoiceDetails[0].Id),
                TeamName: teamName,
                PaymentComment: comment,
                TeamId: Number(teamId),
              };

              dispatch(SubmitInvoice(requiredData))
                .then(response => {
                  console.log('API Response:------------>', response);
                  setIsDataSubmitted(false);
                  setComment('');
                  setImageUploadData(null);
                  setSelectedImage(null);
                  navigation.navigate(ScreensName.ReviewPendingScreen);
                })
                .catch(error => {
                  console.log(
                    'Error While Submitting Data:----------->',
                    error,
                  );
                  setIsDataSubmitted(false);
                });
            }
          },
        )
        .catch(error => {
          console.log(
            'Error occurred while uploading image:-------------->',
            error,
          );
          setIsDataSubmitted(false);
          setImageUploadData(null);
          setSelectedImage(null);
        });
    }
  };

  return (
    <Frame screenTitle={'Detailed Invoice'} containerStyle={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Details */}
        <Wrapper style={styles.wrapperContainerForHeading}>
          <View style={styles.headerDetailContainer}>
            {/* ID */}
            <View style={styles.headerContentContainer}>
              <Txt style={styles.headerDetailTitle}>ID</Txt>
              <Txt style={styles.headerDetailDesc}>
                {invoiceDetails[0].CoworkerInvoiceInvoiceNumber || ''}
              </Txt>
            </View>
            {/* Date */}
            <View style={styles.headerContentContainer}>
              <Txt style={styles.headerDetailTitle}>Due date:</Txt>
              <Txt style={styles.headerDetailDesc}>
                {moment(DueDate.split('T')[0]).format('DD MMM, YYYY') || ''}
              </Txt>
            </View>
            {/* Amount */}
            <View style={styles.headerContentContainer}>
              <Txt style={styles.headerDetailTitle}>Total</Txt>
              <Txt style={styles.headerDetailDesc}>
                SAR{' '}
                {invoiceDetails
                  .reduce((acc, {SubTotal}) => acc + SubTotal, 0)
                  .toFixed(2) || ''}
              </Txt>
            </View>
            {/* Status */}
            <View style={styles.headerContentContainer}>
              <Txt style={styles.headerDetailTitle}>Status:</Txt>
              <Txt style={styles.headerDetailDesc}>Transfer Pending</Txt>
            </View>
          </View>
        </Wrapper>

        {/* Account to pay */}
        <View style={styles.accountPayContainer}>
          <Txt
            style={[
              styles.accountPayTitle,
              {marginLeft: AppTheme.SPACINGS.MARGINS.M6},
            ]}>
            Accounts to pay
          </Txt>
          <Wrapper style={styles.accountToPayInnerContainer}>
            <Txt style={styles.bankTitle}>Bank account</Txt>
            {/* Name */}
            <View style={styles.defRowAlignment}>
              <Txt style={styles.accountPayTextBlack}>Account Name</Txt>
              <Txt style={styles.accountPayTextGrey}>Fintech Saudi</Txt>
            </View>
            {/* IBAN */}
            <View style={styles.defRowAlignment}>
              <Txt style={styles.accountPayTextBlack}>IBAN</Txt>
              <Txt style={styles.accountPayTextGrey}>
                SA40 0110 0001 2303 0500 0009
              </Txt>
            </View>
            {/* Sarie */}
            <View style={styles.defRowAlignment}>
              <Txt style={styles.accountPayTextBlack}>Sarie Details</Txt>
            </View>

            <View style={styles.sarieContainer}>
              <Txt style={styles.bankTitle}>SARIE</Txt>
              {/* SARIE CODE */}
              <View style={styles.defRowAlignment}>
                <Txt style={styles.accountPayTextBlack}>SARIE CODE</Txt>
                <Txt style={styles.accountPayTextGrey}>SAMASARI</Txt>
              </View>
              {/* Authority */}
              <View style={styles.defRowAlignment}>
                <Txt style={styles.accountPayTextBlack}>
                  Saudi Arabian Monetary Authority
                </Txt>
              </View>
            </View>
          </Wrapper>
        </View>

        {/* Upload Container */}
        {selectedImage === null ? (
          <Wrapper
            isPressable={true}
            onPress={pickImage}
            style={styles.uploadContainer}>
            <CloudUploadIcon />
            <Txt style={styles.uploadTitle}>Tap here to upload receipt</Txt>
          </Wrapper>
        ) : (
          <Wrapper style={styles.uploadContainer}>
            <Pressable
              onPress={() => setSelectedImage(null)}
              style={styles.closeIcon}>
              <CloseIcon />
            </Pressable>
            <Pressable
              onPress={() => setViewImage(true)}
              style={styles.selectedImageContainer}>
              <Image
                source={{
                  uri: selectedImage.uri,
                }}
                style={styles.selectedImage}
              />
            </Pressable>
          </Wrapper>
        )}

        {/* Comment */}
        <View style={styles.commentContainer}>
          <Txt style={[styles.accountPayTitle, {marginTop: 0}]}>Comments</Txt>
          <Input
            multiline
            numberOfLines={6}
            textAlignVertical={'top'}
            placeholder="Add comments if the amount which you have paid is less or more with the reason"
            accessibilityLabel="Comment Input"
            placeholderTextColor={AppTheme.COLORS.text}
            InputStyling={styles.commentInput}
            value={comment}
            onChangeText={text => {
              setComment(text);
              console.log('Input Text (Comment):------------->', comment);
            }}
          />
        </View>
      </ScrollView>
      {/* Confirm Button */}
      <Botton
        singleButtonStyle={{width: '100%'}}
        loading={isDataSubmitted}
        title={'Upload'}
        disabled={isDataFilled}
        onPress={() => {
          submitData();
        }}
      />

      {/* Image Viewer */}
      <ImageView
        images={[selectedImage]}
        imageIndex={0}
        visible={viewImage}
        onRequestClose={() => setViewImage(false)}
      />
    </Frame>
  );
}

InvoiceDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      membershipDetails: PropTypes.shape({
        teamId: PropTypes.number.isRequired,
      }).isRequired,
      invoiceDetails: PropTypes.array.isRequired,
      DueDate: PropTypes.string.isRequired,
      teamName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

InvoiceDetailScreen.defaultProps = {
  invoiceDetails: [],
  DueDate: '',
  teamName: '',
  teamId: 0,
};
