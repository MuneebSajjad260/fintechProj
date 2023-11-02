import React from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import {API_ENDPOINTS} from '../../shared/config/api-endpoints';
import WV from 'react-native-webview';
import styles from './WebView.style';
import {useRef} from 'react';
import {useState} from 'react';
const WebView = ({route, navigation}) => {
  const [showWebsite, setShowWebsite] = useState(true);

  const {item} = route.params;
  const webViewRef = useRef(null);

  const handleWebViewNavigation = event => {
    const {url} = event;
    // console.log('Url:--------', url);
    // Check if the specific URL is opened
    if (url === `${API_ENDPOINTS.stage_Web_Views}/#/wellcome`) {
      // console.log('hiii');
      // handleCloseWebView();
      setShowWebsite(false);
    }
  };

  useEffect(() => {
    console.log('item', item);
  }, []);

  return (
    <View style={styles.safeAreaContainer}>
      {showWebsite ? (
        <>
          {item === 1 && (
            <WV
              ref={webViewRef}
              onNavigationStateChange={handleWebViewNavigation}
              source={{
                uri: `${API_ENDPOINTS.stage_Web_Views}/#/tours/emailInfo`,
              }}
            />
          )}
          {item === 2 && (
            <WV
              ref={webViewRef}
              onNavigationStateChange={handleWebViewNavigation}
              source={{
                uri: `${API_ENDPOINTS.stage_Web_Views}/#/day-pass/emailInfo`,
              }}
            />
          )}
          {item === 3 && (
            <WV
              ref={webViewRef}
              onNavigationStateChange={handleWebViewNavigation}
              source={{
                uri: `${API_ENDPOINTS.stage_Web_Views}/#/membership/emailInfo`,
              }}
            />
          )}
        </>
      ) : navigation.goBack()}
    </View>
  );
};

export default WebView;
