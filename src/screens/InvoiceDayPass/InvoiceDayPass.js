import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView,Platform ,alert} from 'react-native';
import { Svg } from 'react-native-svg';
import normalize from 'react-native-normalize';
import { useDispatch,useSelector} from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import RNFetchBlob from 'rn-fetch-blob';
import { DownloadPdf } from '../../shared/redux/action/DownloadPdf';
import styles from './InvoiceDayPass.style';
import {GetSingleInvoiceDetail} from '../../shared/redux/action/GetSingleInvoiceDetail';
import { selectLoginUserName,selectEmail } from '../../shared/redux/slices/isadminSlice';
import FintechLogoInvoice from '../../assets/images/FintechLogoInvoice.js';
import InvoiceDayPassCard from '../../shared/components/InvoiceDayPassCard/InvoiceDayPassCard';
import { API_ENDPOINTS } from '../../shared/config/api-endpoints';
import { createBottomSheetScrollableComponent } from '@gorhom/bottom-sheet';
import { AppTheme } from '../../shared/theme';


const InvoiceDayPass =({route})=> {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  const loginData = useSelector((state) => state.auth?.data);
  const token = loginData?.access_token;
  console.log(token);
  const GetSingleInvoiceDetailLoading = useSelector(state=>state?.getSingleInvoiceDetail?.loading);
  const {resourceName,date ,CoworkerInvoiceNumber}=route.params;
  const dispatch =useDispatch();
  const userName=useSelector(selectLoginUserName);
  const email=useSelector(selectEmail);

  const [price , setPrice]=useState([]);
  const [uniqueId , setUniqueId]=useState();
  useEffect(()=>{
    dispatch(GetSingleInvoiceDetail(CoworkerInvoiceNumber)).unwrap().then(result=>{
      console.log('result of single invoice----',result);
      setPrice(result?.data);
      setUniqueId(result?.uniqueId);
      console.log('result of iddddd----',result?.uniqueId);
 

    }).catch(err=>{
      console.log('error of single invoice----',err);
    });
  },[dispatch,CoworkerInvoiceNumber]);

 


  ////DOWNLOAD PDF/////
  const downloadInvoice = async () => {
    try {
      const { dirs } = RNFetchBlob.fs;
      const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      const fileName = 'pdfInfo.pdf';
      const filePath = `${dirToSave}/${fileName}`;
  
      const configfb = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          description: 'Downloading file...',
          mime: 'application/pdf',
          mediaScannable: true,
          path: filePath,
        },
      };
  
      const configOptions = Platform.select({
        ios: {
          fileCache: false, // Disable file caching on iOS
          title: configfb.title,
          path: filePath,
          appendExt: 'pdf'
        },
        android: configfb,
      });

      const response = await RNFetchBlob.config(configOptions).fetch(
        'GET',
        `${API_ENDPOINTS.nexudus_url}/en/invoices/print?guid=${uniqueId}`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      );
  
      console.log('response', response.info());
  
      if (response.info().status === 200) {
        console.log('File downloaded to:', filePath);
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.previewDocument(filePath);
          console.log('i am ios down');
        } else if (Platform.OS === 'android') {
          RNFetchBlob.android.actionViewIntent(response.path(), 'application/pdf');
          console.log('i am android down');
        }
      } else {
        console.log('Error downloading invoice:', response.info().status);
      }
    } catch (error) {
      console.log('Error downloading invoice catch error---:', error);
    }
  };
  
  ////////////////////////
  return (
    <Frame>
      <View style={styles.mainContainer}>
        <View style={styles.marginBottom}>
          <View>
            {/* <Svg width={'100%'}> */}
            <FintechLogoInvoice
              stroke={isDarkMode ? AppTheme.COLORS.white : AppTheme.COLORS.black}/>
            {/* </Svg> */}
          </View>

          <Text style={[styles.fintechDetails,{marginTop:normalize(7)}]}>169-A, Street 2, Al Riyadh</Text>
          <Text style={styles.fintechDetails}>+966-54345-65456</Text>
        </View>
    
        <View>
          <ShimmerPlaceHolder
            visible={GetSingleInvoiceDetailLoading === false}
            shimmerStyle={[styles.shimmerAvail,{width:'90%'}]}>

          </ShimmerPlaceHolder>
          {GetSingleInvoiceDetailLoading === false ?
            <InvoiceDayPassCard price={price} resourceName={resourceName} date={date} userName={userName} email={email}
              downloadInvoice={downloadInvoice}
            />
            : null}
        </View>
      </View>
    </Frame>
  );
  
};

export default InvoiceDayPass;
