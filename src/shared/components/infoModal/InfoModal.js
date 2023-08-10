import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';
import styles from './InfoModal.Style.js';
import { Modal, Portal } from 'react-native-paper';
import Txt from '../core/Txt.js';
import { AppTheme } from '../../theme/index.js';

const InfoModal = (props) => {
  const { infoModalVisible, title, description, onDismiss } = props;
  const isDarkMode = useSelector(state => state?.mode?.colorScheme);
  return (
    <Portal>
      <Modal
        transparent={true}
        presentation="modal"
        animationType={'fade'}
        visible={infoModalVisible}
        onDismiss={onDismiss}>
        <View style={styles.modalView}>
          <View style={[styles.activityIndicatorWrapper ,{backgroundColor:isDarkMode ? AppTheme.COLORS.wrapperDarkModeBg : AppTheme.COLORS.white}]}>
            <Txt style={styles.title}>{title}</Txt>
            <Txt style={styles.desc}>{description}</Txt>
          </View>
        </View>
      </Modal>
    </Portal >
  );
};
export default InfoModal;

