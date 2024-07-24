//import liraries
import React, {useCallback} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import WrapperContainer from '../../components/WrapperContainer';
import styles from './styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import FastImageComp from '../../components/FastImageComp';
import imagePath from '../../constants/imagePath';
import TextComp from '../../components/TextComp';
import colors from '../../styles/colors';

const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
];

// create a component
const Home = () => {
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.boxStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <FastImageComp
              url={
                'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
              }
              imageStyle={styles.profileImage}
            />
            <View>
              <TextComp text="Gojo Satru" style={styles.nameStyle} />
              <TextComp
                text="Software developer"
                style={{
                  ...styles.bioStyle,
                  color: colors.whiteColor,
                }}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={imagePath.icDots} />
          </TouchableOpacity>
        </View>
        <FastImageComp
          url={
            'https://e0.pxfuel.com/wallpapers/24/87/desktop-wallpaper-gojo-satoru-electric-blue-art.jpg'
          }
          imageStyle={styles.postImage}
        />

        <TextComp text="Lorem ipsum pipsum" style={styles.descStyle} />

        <TextComp
          text="1hr"
          style={{
            ...styles.descStyle,
            marginVertical: moderateScaleVertical(12),
            color: colors.whiteColor,
          }}
        />

        <View style={styles.flexHorizontal}>
          <View style={{flexDirection: 'row'}}>
            <TextComp
              text={`Comments ${20}`}
              style={{...styles.descStyle, marginRight: moderateScale(8)}}
            />

            <TextComp text={`Likes ${10}`} style={styles.descStyle} />
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={imagePath.icShare} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  return (
    <WrapperContainer style={styles.container}>
      <View style={{flex: 1, padding: moderateScale(8)}}>
        <FlashList
          showsVerticalScrollIndicator={false}
          data={DATA}
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

export default Home;
