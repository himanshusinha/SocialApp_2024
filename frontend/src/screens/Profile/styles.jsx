import {StyleSheet} from 'react-native';
import {moderateScale, width} from '../../styles/responsiveSize';

const styles = StyleSheet.create({
  boxView: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  imgStyle: {
    width: width / 3.5,
    height: width / 3.5,
    borderWidth: 0.5,
    bottom: moderateScale(24),
  },
});

export default styles;
