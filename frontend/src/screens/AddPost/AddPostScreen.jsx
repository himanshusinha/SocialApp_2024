import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import ImagePicker from 'react-native-image-crop-picker';
import MultiTextInput from '../../components/MultiTextInput';
import strings from '../../constants/lang';
import ButtonComp from '../../components/ButttonComp';
import styles from './styles';

// create a component
const AddPost = ({navigation, route}) => {
  console.log('route++++', route?.params);

  const [images, setImages] = useState(route?.params?.selectedImages || []);
  const [text, setText] = useState('');

  const onSelect = () => {};

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onSelect(item, index)}
        style={{marginRight: moderateScale(16)}}>
        <Image
          source={{uri: item?.image?.uri || item?.image?.path}}
          style={styles.imgStyle}
        />

        <Pressable onPress={() => removeImage(index)} style={styles.crossStyle}>
          <Image
            style={{tintColor: colors.whiteColor}}
            source={imagePath.icCross}
          />
        </Pressable>
      </TouchableOpacity>
    );
  };

  const onAdd = () => {
    if (images.length >= 4) {
      Alert.alert('You can only add 4 images');
      return;
    }

    Alert.alert('Upload Image', 'Choose an option', [
      {text: 'Camera', onPress: () => openCamera()},
      {text: 'Gallery', onPress: () => openGallery()},
      {text: 'Cancel', onPress: () => {}},
    ]);
  };
  const onSave = () => {
    if (images.length == 0) {
      Alert.alert('Please upload at least one photo');
      return;
    }
  };
  const openCamera = () => {
    try {
      const image = ImagePicker.openCamera({mediaType: 'photo'});
      console.log('image', image);
    } catch (error) {
      console.log('error raised');
    }
  };

  const openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({mediaType: 'photo'});
      console.log('image', image);
      // [{image: image}]
      setImages(prev => [...prev, ...[{image: image}]]);
    } catch (error) {
      console.log('error raised');
    }
  };

  const removeImage = index => {
    let cloneImages = [...images];
    cloneImages.splice(index, 1);
    setImages(cloneImages);
  };

  return (
    <WrapperContainer>
      <HeaderComp leftText="Create post" />

      <View style={styles.container}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{overflow: 'visible'}}>
            {images.length > 0
              ? images.map((val, i) => {
                  return renderItem(val, i);
                })
              : null}

            <TouchableOpacity
              onPress={onAdd}
              style={{
                ...styles.imgStyle,
                backgroundColor: colors.gray2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{tintColor: colors.whiteColor}}
                source={imagePath.icAdd}
              />
            </TouchableOpacity>
          </ScrollView>

          <MultiTextInput
            value={text}
            placeholder={strings.DESCRIPTION}
            onChangeText={value => setText(value)}
            multiline={true}
            inputStyle={{marginTop: moderateScaleVertical(24)}}
          />
        </View>

        <ButtonComp text={strings.SAVE} onPress={() => onSave()} />
      </View>
    </WrapperContainer>
  );
};

export default AddPost;
