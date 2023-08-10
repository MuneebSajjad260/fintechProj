import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from "./MeetingRoomDetails.style"
import ImageItem from '../core/ImageItem'
import { removeHtmlTags } from '../../utils/helper'
import PersonsIcon from '../../../assets/images/Persons.svg';
import Txt from '../core/Txt'

export default function MeetingRoomDetails({selectedRoom, isDarkMode, onViewImage}) {
  return (
    <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.tagContainer}>
            <PersonsIcon />
            <Txt style={styles.numOfPersons}>{selectedRoom?.Allocation}</Txt>
          </View>
          <TouchableOpacity
            onPress={() => onViewImage(selectedRoom?.Id)}
            activeOpacity={0.8}>
            <ImageItem
              priority={'high'}
              imageUrl={`https://nexudus.spaces.nexudus.com//en/publicresources/getimage/${selectedRoom?.Id}?w=600&h=600&anchor=middlecenter&cache=2023-03-16T07:23:02Z`}
              imageStyling={styles.img}
            />
          </TouchableOpacity>
        </View>
        <Txt style={styles.detail}>
          {removeHtmlTags(selectedRoom?.Description)}
        </Txt>
      </View>
  )
}

