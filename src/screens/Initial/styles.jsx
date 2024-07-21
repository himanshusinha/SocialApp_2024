import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  height,
} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  logoStyle: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(150 / 2),
  },
  textStyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.whiteColor,
    textAlign: 'center',
    fontSize: textScale(14),
    textTransform: 'capitalize',
  },
  circularStyle: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  headingStyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.blackColor,
    fontSize: textScale(16),
    textTransform: 'capitalize',
    marginBottom: moderateScaleVertical(12),
  },
  langTextStyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.blackColor,
    fontSize: textScale(14),
    textTransform: 'capitalize',
    marginVertical: moderateScaleVertical(8),
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalStyle: {
    backgroundColor: colors.whiteColor,
    minHeight: moderateScale(height / 4),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    padding: moderateScale(16),
  },
});
export default styles;
