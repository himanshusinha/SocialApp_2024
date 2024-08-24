//import liraries
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import FastImageComp from '../../components/FastImageComp';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../navigations/navigationStrings';
import HeaderComp from '../../components/HeaderComp';
import strings from '../../constants/lang';
import TextInputComp from '../../components/TextInputComp';
import MultiTextInput from '../../components/MultiTextInput';
import ButtonComp from '../../components/ButttonComp';
import ModalComp from '../../components/ModalComp';
import styles from './styles';
import {resetAuthState} from '../../redux/slices/auth_slices';
import {useDispatch} from 'react-redux';

// create a component
const ProfileEditScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [showPassModal, setShowPassModal] = useState(false);
  const dispatch = useDispatch();
  const onSave = () => {
    alert('dfdf');
  };
  const handleLogout = () => {
    dispatch(resetAuthState());
  };

  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <HeaderComp
          leftText={strings.EDIT_PROFILE}
          rightText={strings.SAVE}
          onPressRight={onSave}
        />
        <TouchableOpacity activeOpacity={0.7} style={{alignSelf: 'center'}}>
          <FastImageComp
            url="https://www.nautiljon.com/images/perso/00/48/gojo_satoru_19784.webp"
            imageStyle={{
              borderRadius: moderateScale(50),
            }}
          />
          <Image
            style={{
              position: 'absolute',
              bottom: 4,
              right: 0,
            }}
            source={imagePath.icEdit}
          />
        </TouchableOpacity>

        <View style={{marginTop: moderateScaleVertical(24)}}>
          <TextInputComp
            value={userName}
            placeholder={strings.USERNAME}
            onChangeText={value => setUserName(value)}
          />

          <TextInputComp
            value={fullName}
            placeholder={strings.FULL_NAME}
            onChangeText={value => setFullName(value)}
          />

          <MultiTextInput
            value={bio}
            placeholder={strings.BIO}
            onChangeText={value => setBio(value)}
            multiline={true}
          />

          <ButtonComp
            text={strings.CHANGE_PASSWORD}
            onPress={() => setShowPassModal(true)}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 0.5,
              borderColor: colors.whiteColor,
            }}
          />
          <ButtonComp
            text={strings.ADD_LINKS}
            onPress={() => navigation.navigate(navigationStrings.LINK_SCREEN)}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 0.5,
              borderColor: colors.whiteColor,
              marginTop: moderateScaleVertical(16),
            }}
          />

          <ButtonComp
            text={strings.LOGOUT}
            onPress={handleLogout}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 0.5,
              borderColor: colors.redColor,
              marginTop: moderateScaleVertical(16),
            }}
          />
        </View>

        <ModalComp
          key={'1'}
          isVisible={showPassModal}
          style={{margin: 0, justifyContent: 'flex-end'}}
          avoidKeyboard
          onBackdropPress={() => setShowPassModal(false)}>
          <View
            style={{
              ...styles.modalStyle,
              backgroundColor: colors.whiteColorOpacity20,
            }}>
            <TextInputComp
              value={password}
              placeholder={strings.ENTER_OLD_PASSWORD}
              onChangeText={value => setPassword(value)}
              secureTextEntry={secureText}
              secureText={secureText ? strings.SHOW : strings.HIDE}
              onPressSecure={() => setSecureText(!secureText)}
            />
            <TextInputComp
              value={confirmPassword}
              placeholder={strings.CONFIRM_PASSWORD}
              onChangeText={value => setConfirmPassword(value)}
              secureTextEntry={secureText}
              secureText={secureText ? strings.SHOW : strings.HIDE}
              onPressSecure={() => setSecureText(!secureText)}
            />
            <ButtonComp text={strings.CHANGE_PASSWORD} />
          </View>
        </ModalComp>
      </View>
    </WrapperContainer>
  );
};

export default ProfileEditScreen;
