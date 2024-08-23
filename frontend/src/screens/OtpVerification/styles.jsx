import {StyleSheet} from 'react-native';
import {moderateScaleVertical, textScale} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';

// define your styles
const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(24),
    fontFamily: fontFamily.medium,
  },
  descStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    color: colors.blueColor,
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(52),
  },
  textInputContainer: {
    backgroundColor: colors.gray2,
    borderBottomWidth: 0,
    borderRadius: 8,
    color: colors.whiteColor,
  },
  resendCodeStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
});
export default styles;
