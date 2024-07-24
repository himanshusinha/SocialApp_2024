import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  horizontalLine: {
    height: moderateScale(2),
    borderBottomWidth: 1,
    marginVertical: moderateScaleVertical(16),
  },
  addLinkStyle: {
    flexDirection: 'row',
    marginVertical: moderateScaleVertical(16),
    alignItems: 'center',
  },
  modalStyle: {
    padding: moderateScale(16),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
});
export default styles;
