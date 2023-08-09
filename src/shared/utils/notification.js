import {Alert} from 'react-native';

export class Notification {
  static error(title = '', message) {
    Alert.alert(title, message, [{text: 'OK', onPress: () => {}}]);
  }
}
