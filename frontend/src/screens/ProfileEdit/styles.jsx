import {StyleSheet} from 'react-native';
import {moderateScale, width} from '../../styles/responsiveSize';

const styles = StyleSheet.create({
  boxView: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  imgStyle: {
    width: width / 3,
    height: width / 3,
    borderWidth: 0.5,
  },
  modalStyle: {
    padding: moderateScale(16),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
});

export default styles;
