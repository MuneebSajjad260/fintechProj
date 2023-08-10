import React from 'react';
import { Card } from 'react-native-paper';
import styles from './CardContainer.style';

const CardContainer = (props) => {
  return (
    <Card style={[styles.cardContainer, { ...props.style }]} >
      {props.children}
    </Card>
  );
};

export default CardContainer;
