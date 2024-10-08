import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import WrapperContainer from '../../components/WrapperContainer';
import styles from './styles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import FastImageComp from '../../components/FastImageComp';
import imagePath from '../../constants/imagePath';
import TextComp from '../../components/TextComp';
import colors from '../../styles/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../navigations/navigationStrings';
import {useDispatch} from 'react-redux';
import {likeDislikeAsyncThunk} from '../../redux/asyncThunk/AsyncThunk';
const HomeScreen = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null); // State for error handling
  const navigation = useNavigation();
  const [likedPosts, setLikedPosts] = useState(new Set());

  const dispatch = useDispatch();
  const onPresPost = item => {
    navigation.navigate(navigationStrings.POST_DETAILS_SCREEN, {item: item});
  };
  const posts_Id = posts.map(posts => posts?._id);
  console.log(posts_Id, '.......postIdsss');
  useEffect(() => {
    const fetchUserIdAndPosts = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token'); // Retrieve token

        if (storedUserId && token) {
          console.log('User ID:', storedUserId);
          setUserId(storedUserId);

          // Fetch posts after userId is retrieved
          const response = await axios.get('http://localhost:3000/allPost', {
            params: {
              userId: storedUserId, // using the retrieved userId
              page: 1,
              limit: 10,
            },
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          });
          console.log(posts?._id, '........posts data');
          setPosts(response.data.data || []); // Update state with fetched posts
        } else {
          throw new Error('User ID or token not found');
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
  }, []); // Empty dependency array ensures this effect runs only once
  const handleLikeDislike = async postId => {
    try {
      await dispatch(likeDislikeAsyncThunk({postId, userId}));

      setLikedPosts(prev => {
        const updatedLikes = new Set(prev);
        updatedLikes.has(postId)
          ? updatedLikes.delete(postId)
          : updatedLikes.add(postId);
        return updatedLikes;
      });
    } catch (error) {
      console.error('Error handling like/dislike:', error);
    }
  };
  const renderItem = useCallback(({item}) => {
    console.log(item, '.....homescreen');
    const heartColor = item.isLike ? colors.redColor : colors.blackColor;
    // Handle media URLs based on media type
    const media = item.media.length > 0 ? item.media[0] : null;
    const mediaUrl = media
      ? media.url
      : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
    const isImage = media && media.type === 'image';

    return (
      <Pressable style={styles.boxStyle} onPress={() => onPresPost(item)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <FastImageComp
              url={item?.user?.profileImage}
              imageStyle={styles.profileImage}
            />
            <View>
              <TextComp text={item?.user?.fullName} style={styles.nameStyle} />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={imagePath.icDots} />
          </TouchableOpacity>
        </View>

        {isImage && (
          <FastImageComp url={mediaUrl} imageStyle={styles.postImage} />
        )}

        <TextComp text={item.description} style={styles.descStyle} />
        <TextComp
          text={moment(item.createdAt).fromNow()}
          style={{
            ...styles.descStyle,
            marginVertical: moderateScaleVertical(12),
            color: colors.whiteColor,
          }}
        />
        <View style={styles.flexHorizontal}>
          <View style={{flexDirection: 'row'}}>
            <TextComp
              text={`Comments ${item.commentCount}`}
              style={{...styles.descStyle, marginRight: moderateScale(8)}}
            />
            <TextComp
              text={`Likes ${item.likeCount}`}
              style={styles.descStyle}
            />
            <TouchableOpacity
              onPress={() => handleLikeDislike(item._id)}
              activeOpacity={0.7}>
              <Image tintColor={heartColor} source={imagePath.icHeart} />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    );
  }, []);

  if (loading) {
    return (
      <WrapperContainer style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      </WrapperContainer>
    );
  }

  if (error) {
    return (
      <WrapperContainer style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.errorColor, fontSize: 16}}>
            Error: {error}
          </Text>
        </View>
      </WrapperContainer>
    );
  }

  if (posts.length === 0) {
    return (
      <WrapperContainer style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.whiteColor, fontSize: textScale(18)}}>
            No posts
          </Text>
        </View>
      </WrapperContainer>
    );
  }
  return (
    <WrapperContainer style={styles.container}>
      <View style={{flex: 1, padding: moderateScale(8)}}>
        <FlashList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={renderItem}
          estimatedItemSize={200}
          ItemSeparatorComponent={() => (
            <View style={{height: moderateScale(20)}} />
          )}
        />
      </View>
    </WrapperContainer>
  );
};

export default HomeScreen;
