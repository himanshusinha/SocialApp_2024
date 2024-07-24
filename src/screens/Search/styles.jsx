import {StyleSheet} from 'react-native';
import {height, moderateScale, width} from '../../styles/responsiveSize';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  imageStyle: {
    width: width / 2.2,
    height: height / 3,
    borderWidth: 1,
    borderRadius: moderateScale(10),
  },
});

export default styles;
