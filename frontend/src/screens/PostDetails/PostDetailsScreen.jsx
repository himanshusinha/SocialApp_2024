import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import strings from '../../constants/lang';
import TextComp from '../../components/TextComp';
import FastImageComp from '../../components/FastImageComp';
import WrapperContainer from '../../components/WrapperContainer';
import styles from './styles';
import TextInputComp from '../../components/TextInputComp';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import moment from 'moment';
import {
  addCommentAsyncThunk,
  deleteCommentAsyncThunk,
} from '../../redux/asyncThunk/AsyncThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PostDetailsScreen = ({navigation, route}) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const {item} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (item && item.user) {
      setName(item.user.userName);
    }
  }, [item]);

  useEffect(() => {
    const fetchUserIdAndComments = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');

        if (storedUserId && token) {
          setUserId(storedUserId);

          const response = await axios.get(
            'http://localhost:3000/postComments',
            {
              params: {
                postId: item?._id,
                page: 1,
                limit: 10,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          // Debugging: Check API response
          console.log('API Response:', response.data);

          setComments(response.data.data || []);
        } else {
          throw new Error('User ID or token not found');
        }
      } catch (error) {
        console.error(
          'Error fetching userId or comments:',
          error.response ? error.response.data : error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdAndComments();
  }, [item]);

  const handleDeleteComment = async commentId => {
    try {
      await dispatch(deleteCommentAsyncThunk({userId, commentId})).unwrap();
      setComments(prevComments =>
        prevComments.filter(comment => comment._id !== commentId),
      );
    } catch (error) {
      console.error(
        'Failed to delete comment:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const renderItem = ({item}) => (
    <Pressable
      style={[
        {
          marginHorizontal: moderateScale(16),
          marginTop: moderateScale(10),
          justifyContent: 'space-between',
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FastImageComp
          url={
            'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
          }
          imageStyle={styles.profileImage}
        />
        <View style={{flex: 1}}>
          <TextComp text={name} />
        </View>
        <Pressable onPress={() => handleDeleteComment(item?._id)}>
          <Image
            resizeMode="contain"
            source={imagePath.icDelete}
            style={styles.deleteImage}
          />
        </Pressable>
      </View>
      <TextComp
        text={moment(item.createdAt).fromNow()}
        style={{marginVertical: moderateScaleVertical(3)}}
      />
      <TextComp text={item.comment} />
    </Pressable>
  );

  const emptyComp = () =>
    comments.length === 0 ? (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextComp
          text={strings.NO_COMMENT_ADDED}
          style={{
            ...styles.descStyle,
            marginVertical: moderateScaleVertical(12),
            color: colors.whiteColor,
          }}
        />
      </View>
    ) : null;

  const headerComp = () => (
    <View style={[styles.boxStyle]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <FastImageComp
            url={item?.user?.profileImage}
            imageStyle={styles.profileImage}
          />
          <View>
            <TextComp
              text={item?.user?.fullName || item?.userId?.fullName}
              style={styles.nameStyle}
            />
            {!!item?.user?.bio || item?.userId?.bio ? (
              <TextComp
                text={item?.user?.bio || item?.userId?.bio}
                style={{
                  ...styles.bioStyle,
                  color: colors.blackOpacity70,
                }}
              />
            ) : null}
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={imagePath.icDots} />
        </TouchableOpacity>
      </View>

      <FastImageComp url={item?.media[0]?.url} imageStyle={styles.postImage} />

      {!!item?.description ? (
        <TextComp text={item?.description} style={styles.descStyle} />
      ) : null}

      <TextComp
        text={moment(item.createdAt).fromNow()}
        style={{
          ...styles.descStyle,
          marginVertical: moderateScaleVertical(12),
          color: colors.whiteColor,
        }}
      />
    </View>
  );

  const handleSendComment = async () => {
    if (commentText.trim()) {
      try {
        await dispatch(
          addCommentAsyncThunk({
            postId: item?._id,
            userId: userId,
            comment: commentText,
          }),
        ).unwrap();

        setComments(prevComments => [
          {comment: commentText, userId, createdAt: new Date().toISOString()},
          ...prevComments,
        ]);
        setCommentText('');
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <HeaderComp leftText={strings.POST_DETAIL} />

        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={item => String(item._id)}
          ListEmptyComponent={emptyComp}
          ListHeaderComponent={headerComp}
          ItemSeparatorComponent={() => (
            <View style={{height: moderateScale(10)}} />
          )}
        />

        <View style={styles.bottomStyle}>
          <View style={{flex: 0.9}}>
            <TextInputComp
              inputStyle={{marginBottom: 0}}
              value={commentText}
              onChangeText={text => setCommentText(text)}
            />
          </View>

          <TouchableOpacity
            style={{flex: 0.1, alignItems: 'flex-end'}}
            onPress={handleSendComment}>
            <Image
              style={{tintColor: colors.redColor}}
              source={imagePath.icSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default PostDetailsScreen;
