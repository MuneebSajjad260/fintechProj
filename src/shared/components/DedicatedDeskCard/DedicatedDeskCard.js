import {Text, View, Image} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import CardContainer from '../cardWrapper/CardContainer';
import {AppTheme, Images} from '../../theme';
import styles from './DedicatedDeskCard.style';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';

const DedicatedDeskCard = props => {
  const {item} = props;
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  return (
    <Wrapper style={styles.cardContainer}>
      <Image style={styles.img} source={Images.dedicatedDesk} />
      <View style={styles.allignInRow}>
        <Txt style={styles.title}>{item?.officeNo}</Txt>
        <View style={styles.row}>
          <Feather
            name="users"
            size={14}
            solid
            color={isDarkMode ? AppTheme.COLORS.greyLight : AppTheme.COLORS.purple}
          />
          <Txt style={styles.allocation}>{item?.Capacity}</Txt>
        </View>
      </View>
    </Wrapper>
  );
};

export default DedicatedDeskCard;
