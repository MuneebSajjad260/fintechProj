import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  cardContainer: {
    padding: hp('1.5%'),
    borderRadius: normalize(20),
    elevation: 10,
    shadowColor: 'rgba(152, 152, 152, 1)',
    marginTop: hp(1),
    margin: normalize(4),
  },
});

export default styles;