import { useCallback, useMemo } from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

export const useBottomSheetMethods = () => {
  const snapPointsSendInvitation = useMemo(() => ['60%'], []);
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

  return { snapPointsSendInvitation, renderBackdropBottomSheet };
};
