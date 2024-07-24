//import liraries
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImageComp from '../../components/FastImageComp';
import HeaderComp from '../../components/HeaderComp';
import TextComp from '../../components/TextComp';
import WrapperContainer from '../../components/WrapperContainer';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import styles from './styles';

const Notification = () => {
  const renderItem = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: moderateScale(16),
        }}>
        <FastImageComp
          url={
            'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
          }
          imageStyle={styles.imgStyle}
        />
        <View style={{marginHorizontal: moderateScale(16)}}>
          <TextComp text="User name" style={{fontSize: textScale(16)}}>
            <Text style={{color: colors.redColor}}>added new</Text>
          </TextComp>
          <TextComp
            text="1 hr"
            style={{
              marginVertical: moderateScaleVertical(4),
              color: colors.whiteColor,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <HeaderComp
          isLeftImage={false}
          leftText="Notifications"
          style={{marginBottom: moderateScaleVertical(16)}}
        />
        <FlashList
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          renderItem={renderItem}
          estimatedItemSize={70}
          ItemSeparatorComponent={() => (
            <View
              style={{
                ...styles.horizontalLine,
                borderBottomColor: colors.whiteColor,
              }}
            />
          )}
        />
      </View>
    </WrapperContainer>
  );
};

export default Notification;
