//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
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

// create a component
const CreatePost = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  const navigation = useNavigation();
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
    setCurrentImage(item);

    let cloneSelectImg = [...selectedImages];

    const indexItem = cloneSelectImg.findIndex(
      val => val.timestamp === item?.timestamp,
    );
    if (indexItem === -1) {
      setSelectedImages(prev => [...prev, ...[item]]);
    } else {
      cloneSelectImg.splice(indexItem, 1);
      setSelectedImages(cloneSelectImg);
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

  const onNext = () => {
    navigation.navigate(navigationStrings.ADD_POST_SCREEN, {selectedImages});
  };

  const onPressCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    })
      .then(image => {
        navigation.navigate(navigationStrings.ADD_POST, {
          selectedImages: [{image: image}],
        });
      })
      .catch(error => {
        console.log('error riased', error);
      });
  };
  return (
    <WrapperContainer>
      <HeaderComp
        leftText="Add post"
        isLeftImage={false}
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

export default CreatePost;
