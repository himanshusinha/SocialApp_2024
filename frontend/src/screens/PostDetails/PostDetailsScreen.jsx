import React, {useCallback, useEffect, useState} from 'react';
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
import {addCommentAsyncThunk} from '../../redux/asyncThunk/AsyncThunk';
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
      setName(item.user.fullName);
    }
  }, [item]);

  useEffect(() => {
    const fetchUserIdAndComments = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');

        if (storedUserId && token) {
          console.log('User ID:', storedUserId);
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
      </View>
      <TextComp
        text={moment(item.createdAt).fromNow()}
        style={{marginVertical: moderateScaleVertical(3)}}
      />
      <TextComp text={item.comment} />
    </Pressable>
  );

  const emptyComp = () => (
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
  );

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
  const handleSendComment = useCallback(async () => {
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
  }, [dispatch, item?._id, userId, commentText]);

  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <HeaderComp leftText={strings.POST_DETAIL} />

        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(item._id)}
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
