import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './AccesskeyScreen.Style';
import Frame from '../../shared/components/core/Frame';
import {VIEW} from '../../shared/constants/Strings';
import {useDispatch, useSelector} from 'react-redux';
import Txt from '../../shared/components/core/Txt';
import {scale} from '../../shared/utils/scale';
import {AppTheme} from '../../shared/theme';
import {
  setQrDirection,
  setQrTrigger,
} from '../../shared/redux/slices/qrDirectionSlice';
//* Icons
import Accesskey from '../../assets/images/QRIcon.js';
import AccesskeyLeft from '../../assets/images/AccesskeySkeletonLeft.js';
import AccesskeyLeftActive from '../../assets/images/AccesskeySkeletonLeftActive.svg';
import AccesskeyRight from '../../assets/images/AccesskeySkeletonRight.svg';
import AccesskeyRightActive from '../../assets/images/AccesskeySkeletonRightActive.svg';
import AccesskeyRightDark from '../../assets/images/AccesskeySkeletonRightDark.svg';
import AccesskeyRightActiveDark from '../../assets/images/AccesskeySkeletonRightActiveDark.svg';
import AccesskeyLeftDark from '../../assets/images/AccesskeySkeletonLeftDark.svg';
import AccesskeyLeftActiveDark from '../../assets/images/AccesskeySkeletonLeftActiveDark.svg';

const AccesskeyScreen = () => {
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Tap');
  const dispatch = useDispatch();
  // *Dark Mode
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  //* QR Direction
  const QRTrigger = useSelector(state => state.qrAsset.qrTrigger);
  const QRDirection = useSelector(state => state.qrAsset.qrDirection);

  useEffect(() => {
    setSelectedOption(QRTrigger);
  }, [QRTrigger]);

  useEffect(() => {
    if (QRDirection === 'right') {
      setRightActive(true);
      setLeftActive(false);
    } else {
      setRightActive(false);
      setLeftActive(true);
    }
  }, [QRDirection, QRTrigger]);

  const toggleIcon = icon => {
    if (icon === 'left') {
      setLeftActive(true);
      setRightActive(false);
      dispatch(setQrDirection('left'));
    } else if (icon === 'right') {
      dispatch(setQrDirection('right'));
      setLeftActive(false);
      setRightActive(true);
    }
  };

  return (
    <Frame mode={VIEW}>
      <View style={styles.container}>
        <View style={styles.optionContainer}>
          <View style={styles.header}>
            <Accesskey
              height={scale(45)}
              width={scale(45, true)}
              stroke={isDarkMode ? AppTheme.COLORS.white : null}
            />
            <Txt style={styles.headerTxt}>Select trigger method</Txt>
          </View>
          <View style={styles.bodyOptions}>
            <TouchableOpacity
              onPress={() => {
                setSelectedOption('Drag');
                dispatch(setQrTrigger('Drag'));
              }}
              style={[
                styles.optionTxtContainer,
                {
                  borderColor:
                    selectedOption === 'Drag'
                      ? !isDarkMode
                        ? AppTheme.COLORS.black
                        : AppTheme.COLORS.white
                      : !isDarkMode
                        ? AppTheme.COLORS.greyLight
                        : AppTheme.COLORS.text,
                },
              ]}>
              <Txt
                style={[
                  styles.optionTxt,
                  {
                    color:
                      selectedOption === 'Drag'
                        ? !isDarkMode
                          ? AppTheme.COLORS.black
                          : AppTheme.COLORS.white
                        : !isDarkMode
                          ? AppTheme.COLORS.greyLight
                          : AppTheme.COLORS.text,
                  },
                ]}>
                Drag to open
              </Txt>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedOption('Tap');
                dispatch(setQrTrigger('Tap'));
              }}
              style={[
                styles.optionTxtContainer,
                {
                  borderColor:
                    selectedOption === 'Tap'
                      ? !isDarkMode
                        ? AppTheme.COLORS.black
                        : AppTheme.COLORS.white
                      : !isDarkMode
                        ? AppTheme.COLORS.greyLight
                        : AppTheme.COLORS.text,
                },
              ]}>
              <Txt
                style={[
                  styles.optionTxt,
                  {
                    color:
                      selectedOption === 'Tap'
                        ? !isDarkMode
                          ? AppTheme.COLORS.black
                          : AppTheme.COLORS.white
                        : !isDarkMode
                          ? AppTheme.COLORS.greyLight
                          : AppTheme.COLORS.text,
                  },
                ]}>
                Tap to open
              </Txt>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.directionContainer}>
          <View style={styles.header}>
            <Accesskey
              height={scale(45)}
              width={scale(45, true)}
              stroke={isDarkMode ? AppTheme.COLORS.white : null}
            />
            <Txt style={styles.headerTxt}>
              Select trigger location for access key
            </Txt>
          </View>
          <View style={styles.body}>
            <View style={styles.defAlignment}>
              {isDarkMode ? (
                <>
                  <TouchableOpacity onPress={() => toggleIcon('left')}>
                    {leftActive ? (
                      <AccesskeyLeftActiveDark />
                    ) : (
                      <AccesskeyLeftDark />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleIcon('right')}>
                    {rightActive ? (
                      <AccesskeyRightActiveDark />
                    ) : (
                      <AccesskeyRightDark />
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={() => toggleIcon('left')}>
                    {leftActive ? <AccesskeyLeftActive /> : <AccesskeyLeft />}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleIcon('right')}>
                    {rightActive ? (
                      <AccesskeyRightActive />
                    ) : (
                      <AccesskeyRight />
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </Frame>
  );
};

export default AccesskeyScreen;
