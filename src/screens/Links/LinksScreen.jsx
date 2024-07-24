//import liraries
import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import HeaderComp from '../../components/HeaderComp';
import strings from '../../constants/lang';
import {FlashList} from '@shopify/flash-list';

import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';

import styles from './styles';
import WrapperContainer from '../../components/WrapperContainer';
import TextComp from '../../components/TextComp';
import ModalComp from '../../components/ModalComp';
import ButtonComp from '../../components/ButttonComp';
import TextInputComp from '../../components/TextInputComp';

// create a component
const Links = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const renderItem = () => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.itemStyle}>
        <View style={{flex: 0.1}}>
          <Image source={imagePath.icLink} />
        </View>
        <View style={{flex: 0.8}}>
          <TextComp
            numberOfLines={1}
            text="https://www.youtube.com/channel/UCe4N2QmyaYQwPHQn82mZy3w"
            style={{color: colors.blueColor}}
            numof
          />
        </View>
        <View style={{flex: 0.1}}>
          <Image
            style={{tintColor: colors.whiteColor}}
            source={imagePath.rightArrow}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <HeaderComp
          isLeftImage={imagePath.icBack}
          leftText={strings.ADD_LINKS}
        />
        <TouchableOpacity
          style={styles.addLinkStyle}
          activeOpacity={0.7}
          onPress={() => setShowModal(true)}>
          <Image
            style={{
              tintColor: colors.whiteColor,
              marginRight: moderateScale(16),
            }}
            source={imagePath.icAdd}
          />
          <TextComp
            text={strings.ADD_LINKS}
            style={{fontSize: textScale(16), fontFamily: fontFamily.medium}}
          />
        </TouchableOpacity>
        <FlashList
          data={[{}, {}]}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                ...styles.horizontalLine,
                borderBottomColor: colors.whiteColorOpacity40,
              }}
            />
          )}
        />
      </View>

      <ModalComp
        key={'1'}
        isVisible={showModal}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard
        onBackdropPress={() => setShowModal(false)}>
        <View
          style={{
            ...styles.modalStyle,
            backgroundColor: colors.whiteColorOpacity20,
          }}>
          <TextInputComp
            value={title}
            placeholder={strings.TITLE}
            onChangeText={value => setTitle(value)}
          />
          <TextInputComp
            value={url}
            placeholder={strings.LINKS}
            onChangeText={value => setUrl(value)}
          />
          <ButtonComp text={strings.SAVE} />
        </View>
      </ModalComp>
    </WrapperContainer>
  );
};

export default Links;
