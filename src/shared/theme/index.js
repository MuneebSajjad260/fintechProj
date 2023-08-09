import {WP, HP} from './responsive';
import GLOBAL_STYLE from './global';
import Images from './images';
import {scale} from '../utils/scale';

const AppTheme = {
  COLORS: {
    descColor: '#333333',
    primaryBackground: '#FFFFFF',
    pending:'#EBB542',
    primaryDarkBackground: '#000000',
    primaryBlueBg: '#16275A',
    primaryGreenBg: '#35D7A1',
    available: '#30B991',
    secondaryBackground: 'rgba(202, 202, 202, 0.1)',
    greyLight: '#CACACA', // button bg
    transparent: 'transparent',
    greyDark: '#828282', //text
    secondaryGreyBackground: 'rgba(201, 206, 219, 0.42)',
    secondaryGreyLightBg: '#F5F5F5',
    changeGreen: '#00C053',
    changeRed: '#ff3939',
    yellow: '#F7B718',
    black: '#000000',
    inputView:'#EEEEEE',
    text: '#808080',
    darkText: '#999999',
    accentBlue: '#27A3E3',
    lightBlue: '#209EE2',
    textLight: '#928FA3',
    darkBlue: '#172659',
    disabledTextLight: '#7f7e83',
    textExtraLight: 'rgba(146, 143, 163, 0.5)',
    green: '#1CD983',
    blue: '#4C7BF6',
    red: '#FF0000',
    countRed: '#FD6969',
    gold: '#F89F36',
    white: '#ffffff',
    officialBlack: '#333333',
    lightGrey: '#7F819A',
    gradientTopColor: '#3e68df',
    gradientBottomColor: '#178ee8',
    error: '#EF4050',
    orange: '#F05F23',
    purple: '#0129FA',
    activeStepBar: '#474747',
    completedStepBar: '#F05F23',
    inActiveStepBar: '#222222',
    lightLightModeTxr:'rgba(0, 0, 0, 0.5)',
    chatBg: '#007AFF',
    chatBgLight: '#F2F2F7',
    
    //* Test by Haseeb Khan start
    // Dark Mode
    statusbar: '#0A0C12',
    darkModeBg: '#0A0C12',
    wrapperDarkModeBg: '#1D1D1D',
    btnActiveDarkMode: '#0129FA10',
    lightDarkModeTxt:'rgba(255, 255, 255, 0.5)',
    greyLightBtnDark: '#CACACA1A',
    //* Test by Haseeb Khan end
  },
  FONTS: {
    SIZE: {
      LARGE: WP(4),
      MEDIUM: WP(3.5),
      SMALL: WP(3),

      //* Test By Haseeb
      HEADINGS: {
        H1: scale(24),
        H2: scale(20),
        H3: scale(18),
        H4: scale(16),
      },
      TEXT: {
        T1: scale(16),
        T2: scale(14),
      },
      SUBTITLES: {
        S1: scale(12),
        TAG: scale(10),
      },
      //* Test By Haseeb End
    },
    TYPE: {
      LIGHT: 'Montserrat-Light',
      REGULAR: 'Montserrat-Regular',
      MEDIUM: 'Montserrat-Medium',
      SEMIBOLD: 'Montserrat-SemiBold',
      BOLD: 'Montserrat-Bold',
    },
  },
  MARGIN: {
    MID_LOW: WP(2.5),
    NORMAL: WP(2.9),
    HIGH: WP(4),
  },
  RADIUS: {
    BOX: WP(2.2),
    SMALL_BOX: WP(1.2),
    OVAL: WP(4),
  },
  METRICES: {
    BOTTOM: 0,
    BUTTON_WIDTH: WP(88),
    ROOT_WIDTH: WP(100) - HP(4),
    BUTTON_HEIGHT: HP(7),
    SMALL_BUTTON_HEIGHT: WP(10),
    FULL_WIDTH: WP(100),
  },

  //* Test By Haseeb Start
  SPACINGS: {
    MARGINS: {
      M1: scale(16),
      M2: scale(14),
      M3: scale(12),
      M4: scale(10),
      M5: scale(8),
      M6: scale(6),
      M7: scale(4),
    },
    PADDINGS: {
      P1: scale(16),
      P2: scale(14),
      P3: scale(12),
      P4: scale(10),
      P5: scale(8),
      P6: scale(6),
      P7: scale(4),
    },
  },
  //* Test By Haseeb End
};

export {AppTheme, GLOBAL_STYLE, WP, HP, Images};
