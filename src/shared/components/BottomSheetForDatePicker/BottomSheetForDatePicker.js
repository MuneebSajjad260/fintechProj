import React, {useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styles from './BottomSheetForDatePicker.style';

export default function BottomSheetForDatePicker({
  bottomSheetRefSendInvitation,
}) {
  const snapPointsSendInvitation = useMemo(() => ['100%'], []);
  const renderBackdropBottomSheet = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        BackdropPressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheet
        ref={bottomSheetRefSendInvitation}
        snapPoints={snapPointsSendInvitation}
        backdropComponent={renderBackdropBottomSheet}
        index={-1}
        enablePanDownToClose={true}
        enabledInnerScrolling={true}>
        <View style={styles.btmContainer}>
          <Text style={styles.btmHeading}>Filter credits</Text>
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            style={styles.btmListItemContainer}>
            <View style={[styles.btmListItem, styles.btmListItemColorOne]}>
              <Text
                style={[
                  styles.btmListItemText,
                  styles.btmListItemTextColorOne,
                ]}>
                All
              </Text>
            </View>
            <View style={[styles.btmListItem, styles.btmListItemColorTwo]}>
              <Text
                style={[
                  styles.btmListItemText,
                  styles.btmListItemTextColorTwo,
                ]}>
                Last Month
              </Text>
            </View>
            <View style={[styles.btmListItem, styles.btmListItemColorTwo]}>
              <Text
                style={[
                  styles.btmListItemText,
                  styles.btmListItemTextColorTwo,
                ]}>
                Custom
              </Text>
            </View>
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
