//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {FlashList} from '@shopify/flash-list';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import navigationStrings from '../../navigations/navigationStrings';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {creatPostAsyncThunk} from '../../redux/asyncThunk/AsyncThunk';

// create a component
const CreatePostScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    try {
      let res = await CameraRoll.getPhotos({first: 100, assetType: 'Photos'});
      const result = res.edges.map((val, i) => val.node).reverse();
      setCurrentImage(result[0]);
      setPhotos(result);
    } catch (error) {
      console.log('erro raised');
    }
  }

  useEffect(() => {
    savePicture();
  }, []);

  const onSelect = (item, index) => {
    let clonePhotos = [...photos];
    clonePhotos[index].isSelected = !item?.isSelected;
    setPhotos(clonePhotos);
    setCurrentImage(clonePhotos[index]);

    let cloneSelectImg = [...selectedImages];
    const indexItem = cloneSelectImg.findIndex(
      val => val.timestamp === item?.timestamp,
    );
    if (indexItem === -1) {
      cloneSelectImg.push(item);
    } else {
      cloneSelectImg.splice(indexItem, 1);
    }
    setSelectedImages(cloneSelectImg);
  };

  const onNext = async () => {
    if (selectedImages.length === 0) {
      console.log('No images selected.');
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((item, index) => {
      if (item?.image?.uri) {
        formData.append('file', {
          uri: item.image.uri,
          type: item.image.mime || 'application/octet-stream',
          name: item.image.filename || `file${index}.jpg`,
        });
      } else {
        console.error('Invalid image item:', item);
      }
    });

    console.log('Form Data:', formData);

    try {
      const response = await dispatch(creatPostAsyncThunk(formData));
      console.log('Upload Response:', response);
      navigation.navigate(navigationStrings.ADD_POST_SCREEN, {selectedImages});
    } catch (error) {
      console.error('Error sending images:', {
        message: error.message,
        response: error.response?.data || 'No response data',
        stack: error.stack || 'No stack trace',
      });
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onSelect(item, index)}>
        <Image
          source={{uri: item.image.uri}}
          style={{
            height: width / 4,
            width: width / 4,
            borderWidth: 0.5,
          }}
        />
        {!!item?.isSelected ? (
          <Image style={styles.checkStyle} source={imagePath.icCheck} />
        ) : null}
      </TouchableOpacity>
    );
  };

  const listHeaderComponent = () => {
    return (
      <View style={{marginBottom: moderateScaleVertical(16)}}>
        {!!currentImage?.image && currentImage?.image?.uri ? (
          <Image
            source={{uri: currentImage.image.uri}}
            style={styles.parentImage}
          />
        ) : null}
      </View>
    );
  };
  const adjustImageUri = uri => {
    if (uri && uri.startsWith('file://')) {
      return uri.replace('file://', '');
    }
    return uri;
  };

  const onPressCamera = () => {
    ImagePicker.openPicker({
      multiple: true, // Allow multiple selection
      maxFiles: 4, // Set the maximum number of files
      width: 300,
      height: 400,
    })
      .then(images => {
        console.log('Selected images:', images); // Debug log to verify image details
        navigation.navigate(navigationStrings.ADD_POST_SCREEN, {
          selectedImages: images.map(image => ({
            image: {
              uri: adjustImageUri(image.path), // Adjust URI if needed
              type: image.mime,
              name: image.filename,
            },
          })),
        });
      })
      .catch(error => {
        console.log('Error occurred:', error); // Debug log for errors
      });
  };

  return (
    <WrapperContainer>
      <HeaderComp
        leftText="Add post"
        isLeftImage={true}
        rightText="Next"
        onPressRight={onNext}
      />
      <View style={{flex: 1}}>
        <FlashList
          numColumns={4}
          data={photos}
          renderItem={renderItem}
          ListHeaderComponent={listHeaderComponent}
          keyExtractor={(item, index) => String(item?.image?.uri || index)}
          estimatedItemSize={moderateScale(80)}
        />

        <TouchableOpacity onPress={onPressCamera} style={styles.cameraBtn}>
          <Image
            style={{tintColor: colors.whiteColor}}
            source={imagePath.icCamera}
          />
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default CreatePostScreen;
