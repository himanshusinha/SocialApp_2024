import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import styles from './styles';
import strings from '../../constants/lang';
import imagePath from '../../constants/imagePath';
import WrapperContainer from '../../components/WrapperContainer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import TextComp from '../../components/TextComp';
import ButtonComp from '../../components/ButttonComp';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../navigations/navigationStrings';

const InitialScreen = () => {
  const navigation = useNavigation();
  const privacyPolicy = (type = 1) => {
    if (type == 1) {
      navigation.navigate(navigationStrings.WEBVIEW_SCREEN, {type});
    } else {
      navigation.navigate(navigationStrings.WEBVIEW_SCREEN, {type});
    }
  };
  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16), alignItems: 'center'}}>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Image style={styles.logoStyle} source={imagePath.icLogo} />
        </View>

        <View style={{flex: 0.7, justifyContent: 'flex-end'}}>
          <TextComp
            text={strings.BY_CLICKING_LOG_IN}
            style={{marginVertical: moderateScale(42)}}>
            <Text
              style={{color: colors.blueColor}}
              onPress={() => privacyPolicy(1)}>
              {strings.TERMS}
            </Text>
            . {strings.LEARN_HOW_WE_PRCOESS}{' '}
            <Text
              style={{color: colors.blueColor}}
              onPress={() => privacyPolicy(2)}>
              {strings.PRIVACY_POLICY}
            </Text>
          </TextComp>

          <ButtonComp
            text={strings.LOG_IN_WITH_PHONE_NUMBER}
            onPress={() => navigation.navigate(navigationStrings.LOGIN_SCREEN)}
          />

          <TextComp
            text={strings.OR}
            style={{
              alignSelf: 'center',
              marginVertical: moderateScaleVertical(16),
            }}
          />

          <ButtonComp
            text={strings.LOG_IN_WITH_GOOGLE}
            textStyle={{color: colors.blackColor}}
            style={{
              backgroundColor: colors.whiteColor,
            }}
            leftImg={imagePath.icGoogle}
          />
          <ButtonComp
            text={strings.LOG_IN_WITH_FACEBOOK}
            style={{
              marginVertical: moderateScaleVertical(16),
              backgroundColor: colors.whiteColor,
            }}
            textStyle={{color: colors.blackColor}}
            leftImg={imagePath.icFacebook}
          />
          <ButtonComp
            text={strings.LOG_IN_WITH_APPLE}
            textStyle={{color: colors.blackColor}}
            style={{
              backgroundColor: colors.whiteColor,
            }}
            leftImg={imagePath.icApple}
          />

          <TextComp
            style={{
              textAlign: 'center',
              fontFamily: fontFamily.medium,
              marginVertical: 16,
            }}>
            {strings.NEW_HERE}
            <Text
              onPress={() =>
                navigation.navigate(navigationStrings.SIGNUP_SCREEN)
              }
              style={{
                color: colors.blueColor,
                fontFamily: fontFamily.semiBold,
              }}>
              {strings.SIGN_UP}
            </Text>
          </TextComp>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default InitialScreen;
