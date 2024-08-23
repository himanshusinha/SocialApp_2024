//import liraries
import React from 'react';
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

// create a component
const Profile = ({navigation}) => {
  const listHeader = () => {
    return (
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
              <TextComp text="Satoru Gojo" style={{fontSize: textScale(20)}} />
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
            text="Developed a dynamic e-commerce website from scratch, providing customers with a"
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
  };

  const renderItem = () => {
    return (
      <TouchableOpacity>
        <FastImageComp
          url={
            'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
          }
          imageStyle={{
            ...styles.imgStyle,
            borderColor: colors.whiteColor,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <FlashList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={() => <Text>No posts found</Text>}
          keyExtractor={(item, index) => item?._id || String(index)}
        />
      </View>
    </WrapperContainer>
  );
};

export default Profile;
