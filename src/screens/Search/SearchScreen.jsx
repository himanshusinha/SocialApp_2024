//import liraries
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../styles/responsiveSize';
import {FlashList} from '@shopify/flash-list';
import FastImageComp from '../../components/FastImageComp';
import colors from '../../styles/colors';
import SearchBar from '../../components/SearchBar';
import styles from './styles';

// create a component
const Search = () => {
  const renderItem = ({index}) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: index % 2 == 0 ? moderateScaleVertical(16) : 0,
          marginStart: moderateScale(10),
        }}>
        <FastImageComp
          url={
            'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
          }
          imageStyle={{
            ...styles.imageStyle,
            borderColor: colors.whiteColor,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <SearchBar
          placeholder="Searach..."
          inputStyle={{marginHorizontal: moderateScale(8)}}
          // isSearch
        />
        <FlashList
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          numColumns={2}
          renderItem={renderItem}
          estimatedItemSize={width / 2}
          ItemSeparatorComponent={() => (
            <View style={{height: moderateScale(20)}} />
          )}
        />
      </View>
    </WrapperContainer>
  );
};

export default Search;
