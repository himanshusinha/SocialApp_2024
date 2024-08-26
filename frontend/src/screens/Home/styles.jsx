import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(8),
  },
  boxStyle: {
    backgroundColor: colors.gray2,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
  },
  profileImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    marginRight: moderateScale(16),
  },
  nameStyle: {
    fontSize: textScale(16),
    fontFamily: fontFamily.medium,
    color: colors.whiteColor,
  },
  bioStyle: {
    fontSize: textScale(12),
    fontFamily: fontFamily.medium,
    color: colors.whiteColorOpacity50,
    marginTop: moderateScaleVertical(4),
  },
  postImage: {
    width: '100%',
    height: height / 2.8,
    borderRadius: moderateScale(8),
    marginRight: moderateScale(16),
    marginVertical: moderateScaleVertical(16),
  },
  descStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notDataFound: {
    fontSize: textScale(24),
    fontFamily: fontFamily.regular,
  },
  separator: {
    height: moderateScale(20),
  },
  innerContainer: {
    flex: 1,
  },
  commentLikeContainer: {
    flexDirection: 'row',
  },
  commentText: {
    marginRight: moderateScale(8),
  },
  videoContainer: {
    width: '100%',
    height: 200, // Adjust height as needed
    backgroundColor: 'black', // Optional: to give a background to the video container
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
