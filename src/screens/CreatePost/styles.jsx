import {StyleSheet} from 'react-native';
import {moderateScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  parentImage: {
    width: '100%',
    height: moderateScale(200),
  },
  checkStyle: {
    position: 'absolute',
    right: 10,
    top: 10,
    tintColor: colors.redColor,
  },
  cameraBtn: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: colors.redColor,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
export default styles;
