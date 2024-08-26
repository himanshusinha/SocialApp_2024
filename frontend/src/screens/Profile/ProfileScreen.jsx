// Import libraries
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import FastImageComp from '../../components/FastImageComp';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import TextComp from '../../components/TextComp';
import colors from '../../styles/colors';
import {FlashList} from '@shopify/flash-list';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../navigations/navigationStrings';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create component
const ProfileScreen = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null); // State for error handling
  const [profileData, setProfileData] = useState({
    fullName: '',
    description: '',
  });
  const navigation = useNavigation();
  console.log(posts, '........profile posts');
  console.log(profileData, '...........profileData');

  useEffect(() => {
    const fetchUserIdAndPosts = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token'); // Retrieve token

        if (storedUserId && token) {
          setUserId(storedUserId);

          // Fetch posts after userId is retrieved
          const response = await axios.get('http://localhost:3000/myPosts', {
            params: {
              userId: storedUserId, // using the retrieved userId
              page: 1,
              limit: 10,
            },
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          });
          const fetchedPosts = response.data.data || [];
          setPosts(fetchedPosts); // Update state with fetched posts

          // Assuming the first post contains the profile information

          setProfileData({
            fullName: fetchedPosts[0].userId.fullName || '',
            description: fetchedPosts[0].description || '',
          });
        }
      } catch (error) {
        console.error(
          'Error fetching userId or posts:',
          error.response ? error.response.data : error.message,
        );
        setError(error.response ? error.response.data : error.message); // Set error state
      } finally {
        setLoading(false); // Ensure loading is set to false in case of success or error
      }
    };

    fetchUserIdAndPosts(); // Call the function to fetch userId and posts on component mount
  }, []);

  const listHeader = () => (
    <View style={{marginBottom: moderateScaleVertical(16)}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImageComp
            url="https://www.nautiljon.com/images/perso/00/48/gojo_satoru_19784.webp"
            imageStyle={{
              borderRadius: moderateScale(50),
            }}
          />
          <View style={{marginLeft: moderateScale(16)}}>
            <TextComp
              text={profileData.fullName}
              style={{fontSize: textScale(20)}}
            />
            <TextComp
              text="gojo@email.com"
              style={{
                fontSize: textScale(14),
                color: colors.themeColor,
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate(navigationStrings.PROFILE_EDIT_SCREEN)
          }>
          <Image source={imagePath.icEdit} />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: moderateScaleVertical(16)}}>
        <TextComp
          text={profileData.description}
          style={{fontSize: textScale(16)}}
        />
      </View>

      <View
        style={{
          ...styles.boxView,
          backgroundColor: colors.themeColor,
        }}>
        <TextComp text="Dashboard" style={{fontSize: textScale(14)}} />
        <TextComp
          text="1k account reached in the last 30 days"
          style={{
            fontSize: textScale(14),
            color: colors.themeColor,
          }}
        />
      </View>
    </View>
  );

  const renderItem = useCallback(({item}) => {
    const media = item.media.length > 0 ? item.media[0] : null;
    const mediaUrl = media
      ? media.url
      : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <FastImageComp
          url={mediaUrl}
          imageStyle={{
            ...styles.imgStyle,
            borderColor: colors.whiteColor,
          }}
        />
      </TouchableOpacity>
    );
  }, []); // Add dependencies if necessary

  if (loading) {
    return (
      <WrapperContainer>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      </WrapperContainer>
    );
  }

  if (error) {
    return (
      <WrapperContainer>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.errorColor}}>Error: {error}</Text>
        </View>
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <FlashList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={posts}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={() => <Text>No posts found</Text>}
          keyExtractor={item => item?._id || item.id || String(Math.random())}
          contentContainerStyle={{padding: moderateScale(4)}} // Adjust this value as needed
        />
      </View>
    </WrapperContainer>
  );
};

export default ProfileScreen;
