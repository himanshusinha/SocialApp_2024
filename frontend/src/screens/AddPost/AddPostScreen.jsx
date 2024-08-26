import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Pressable,
  Text,
  StyleSheet, // Import StyleSheet for custom styles
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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addPostAsyncThunk} from '../../redux/asyncThunk/AsyncThunk'; // Corrected import
import navigationStrings from '../../navigations/navigationStrings';

const AddPostScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [images, setImages] = useState(route?.params?.selectedImages || []);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          throw new Error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching userId:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

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

  const onSave = async () => {
    if (!userId) {
      Alert.alert('User ID is required');
      return;
    }

    if (images.length === 0) {
      Alert.alert('Please upload at least one photo');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('description', text);

    images.forEach((item, index) => {
      if (item?.image?.uri) {
        formData.append('file', {
          uri: item.image.uri.replace('file://', ''), // Handle local URI
          type: item.image.mime || 'application/octet-stream',
          name: item.image.filename || `file${index}.jpg`,
        });
      } else {
        console.error('Invalid image item:', item);
      }
    });

    console.log('Form Data:', formData); // Log FormData for debugging

    try {
      const response = await dispatch(addPostAsyncThunk(formData)).unwrap();
      navigation.navigate(navigationStrings.ADD_POST_SCREEN, {
        selectedImages: images,
      });
    } catch (error) {
      console.error(
        'Error sending images:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data || error.message);
    }
  };
  const openCamera = () => {
    ImagePicker.openCamera({mediaType: 'photo'})
      .then(image => {
        setImages(prev => [...prev, {image}]);
      })
      .catch(error => console.log('Camera error:', error));
  };

  const openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({mediaType: 'photo'});
      setImages(prev => [...prev, {image}]);
    } catch (error) {
      console.log('Gallery error:', error);
    }
  };

  const removeImage = index => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <WrapperContainer>
      <HeaderComp leftText="Create post" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollView}>
          {images.length > 0
            ? images.map((val, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.7}
                  onPress={() => removeImage(i)}
                  style={styles.imageWrapper}>
                  <Image
                    source={{uri: val?.image?.uri || val?.image?.path}}
                    style={styles.imgStyle}
                  />
                  <Pressable
                    onPress={() => removeImage(i)}
                    style={styles.crossStyle}>
                    <Image
                      style={{tintColor: colors.whiteColor}}
                      source={imagePath.icCross}
                    />
                  </Pressable>
                </TouchableOpacity>
              ))
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

        <View style={styles.buttonContainer}>
          <MultiTextInput
            value={text}
            placeholder={strings.DESCRIPTION}
            onChangeText={value => setText(value)}
            multiline={true}
            inputStyle={styles.multiTextInput}
          />
          <ButtonComp text={strings.SAVE} onPress={onSave} />
        </View>
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    justifyContent: 'space-between', // Ensure content is pushed to the top
  },
  scrollContainer: {
    flexGrow: 1, // Make ScrollView fill the available space
    flexDirection: 'row', // Ensure horizontal scrolling
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
  multiTextInput: {
    marginTop: moderateScaleVertical(24),
  },
  buttonContainer: {
    paddingBottom: moderateScaleVertical(16), // Add some bottom padding
  },
});

export default AddPostScreen;
