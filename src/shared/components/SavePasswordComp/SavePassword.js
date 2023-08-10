import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import { SecondaryButton } from '../secondaryButton';
import { PrimaryButton } from '../primaryButton';
import Strings from '../../constants/Strings';
import styles from './SavePassword.Style.js';
import Txt from '../core/Txt';
import Botton from '../core/Botton';

export default function SavePassword({onSave, onReject}) {
  return (
    <View style={styles.bottomSheetSavePassContainer}>
      <View style={styles.savePasswordContent}>
        <Txt style={styles.savePasswordTxt}>{Strings.savePassword}</Txt>
        <Txt style={styles.saveSubPasswordTxt}>{Strings.wantToSavePass}</Txt>
      </View>
      <View style={styles.savePassButtonsContainer}>
        <Botton
          continueBtnAccessibilityLabel='save'
          cancelBtnAccessibilityLabel='notnow'
          variant={'v2'}
          loading={false}
          continueTitle={'Save'}
          cancelTitle={'Not Now'}
          disabled={false}
          button1Style={styles.btn1}
          onCancel={onReject}
          onContinue={onSave}
        />
        {/* <SecondaryButton
          loading={false}
          title={Strings.NotNow}
          disabled={false}
          small={false}
          onPress={onReject}
          styleMainContainer={styles.savaPassBtnDef}
        />

        <PrimaryButton
          loading={false}
          title={Strings.Save}
          disabled={false}
          small={false}
          onPress={onSave}
          stylesContainer={styles.savaPassBtnDef}
        /> */}
      </View>
    </View>
  );
}

SavePassword.propTypes = {
  onSave: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

SavePassword.defaultProps = {
  onSave: () => {},
  onReject: () => {},
};