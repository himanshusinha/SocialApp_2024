import {StyleSheet} from 'react-native';
import {moderateScale, width} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    justifyContent: 'space-between',
  },
  imgStyle: {
    height: width / 4,
    width: width / 4,
    borderRadius: moderateScale(8),
  },
  crossStyle: {
    position: 'absolute',
    right: -8,
    top: -8,
    tintColor: colors.redColor,
  },
});

export default styles;
