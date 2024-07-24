import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';

const styles = StyleSheet.create({
  imgStyle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  horizontalLine: {
    height: moderateScale(2),
    borderBottomWidth: 0.3,
    marginVertical: moderateScaleVertical(16),
  },
});

export default styles;
