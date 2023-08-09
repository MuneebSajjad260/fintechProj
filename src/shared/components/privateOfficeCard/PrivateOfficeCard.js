import { Text, View, Image } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { useSelector } from 'react-redux';
import Wrapper from '../core/Wrapper';
import Txt from '../core/Txt';
import CardContainer from '../cardWrapper/CardContainer';
import { AppTheme, Images } from '../../theme';
import styles from './PrivateOfficeCard.style';

const PrivateOfficeCard = (props) => {
  const { item } = props;
  const isDarkMode = useSelector(state => state.mode.colorScheme);
  return (
    <>
      <Wrapper style={styles.cardContainer}>
        <Image
          style={styles.img}
          source={Images.privateOffice}
        />
        <View style={styles.allignInRow}>
          <Txt style={styles.name}>{item?.ResourceName}</Txt>
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
    </>
  );
};

export default PrivateOfficeCard;
