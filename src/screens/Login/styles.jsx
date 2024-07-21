import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';

// define your styles
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScaleVertical(16),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
  },
  headerStyle: {
    fontSize: textScale(24),
    fontFamily: fontFamily.medium,
  },
  descStyle: {
    fontSize: textScale(12),
    fontFamily: fontFamily.regular,
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(52),
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: colors.blueColor,
    fontFamily: fontFamily.semiBold,
    marginVertical: moderateScaleVertical(16),
  },
  buttonContainer: {
    marginBottom: moderateScaleVertical(16),
  },
});
export default styles;
