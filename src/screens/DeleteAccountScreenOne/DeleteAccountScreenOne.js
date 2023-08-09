import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from './DeleteAccountScreenOne.style';
import DeleteAccount from '../../assets/images/DeleteAccount.js';
import AccountInfoIcon from '../../assets/images/AccountInfoIcon.js';
import {ScreensName} from '../../shared/constants/ScreensStrings';
import Frame from '../../shared/components/core/Frame';
import Wrapper from '../../shared/components/core/Wrapper';
import Txt from '../../shared/components/core/Txt';
import {AppTheme} from '../../shared/theme';
import {useSelector} from 'react-redux';

export default function DeleteAccountScreenOne({navigation}) {
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  return (
    <Frame>
      <View style={styles.container}>
        {/* Card */}
        <Wrapper style={styles.cardContainer}>
          {/* Card Heading */}
          <View style={styles.cardTitleContainer}>
            <AccountInfoIcon
              stroke={isDarkMode ? AppTheme.COLORS.white : null}
            />
            <Txt style={styles.cardHeading}>Account Information</Txt>
          </View>
          <Txt style={styles.cardDescription}>
            Your company has an active contract with Fintech Hub, all of your
            data is managed according to the Hub policy.{'\n\n'}
            This policy is available on the Hub Website.
          </Txt>
        </Wrapper>
        {/* Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            accessibilityLabel="deleteAccount"
            onPress={() => {
              navigation.navigate(ScreensName.DeleteAccountScreenTwo);
            }}>
            <View style={styles.btnSubContainer}>
              <View style={styles.defAlignment}>
                <DeleteAccount
                  stroke={isDarkMode ? AppTheme.COLORS.white : null}
                />
                <View>
                  <Txt style={styles.btnHeading}>Delete Account & Data</Txt>
                  <Txt style={styles.btnSubHeading}>
                    Only an administrator can delete accounts
                  </Txt>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Frame>
  );
}
