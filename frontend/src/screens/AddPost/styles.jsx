import {StyleSheet} from 'react-native';
import {moderateScale, width} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
  },
  imageScrollView: {
    overflow: 'visible',
  },
  imageWrapper: {
    marginRight: moderateScale(16),
  },
  imgStyle: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: 8,
    backgroundColor: colors.gray2,
  },
  crossStyle: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: moderateScale(20),
    height: moderateScale(20),
    backgroundColor: colors.red,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: moderateScaleVertical(24),
    paddingBottom: moderateScaleVertical(16), // Add some bottom padding
  },
});

export default styles;
