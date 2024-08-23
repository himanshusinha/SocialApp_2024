import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import strings from '../../constants/lang';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import TextComp from '../../components/TextComp';
import TextInputComp from '../../components/TextInputComp';
import ButtonComp from '../../components/ButttonComp';
import styles from './styles';

const SignupScreen = () => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onPressSignup = async () => {};

  return (
    <WrapperContainer>
      <HeaderComp />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TextComp
              style={styles.headerStyle}
              text={strings.CREATE_NEW_ACCOUNT}
            />
            <TextComp
              style={styles.descStyle}
              text={strings.CREATE_AN_ACCOUNT_SO_YOU_CAN_CONTINUE}
            />
            <View style={styles.formContainer}>
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

              <TextInputComp
                value={email}
                placeholder={strings.EMAIL}
                onChangeText={value => setEmail(value)}
              />

              <TextInputComp
                value={password}
                placeholder={strings.PASSWORD}
                onChangeText={value => setPassword(value)}
                secureTextEntry={secureText}
                secureText={secureText ? strings.SHOW : strings.HIDE}
                onPressSecure={() => setSecureText(!secureText)}
              />
              <TextInputComp
                value={confirmpassword}
                placeholder={strings.CONFIRM_PASSWORD}
                onChangeText={value => setConfirmPassword(value)}
                secureTextEntry={secureText}
                secureText={secureText ? strings.SHOW : strings.HIDE}
                onPressSecure={() => setSecureText(!secureText)}
              />
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComp
                text={strings.SIGN_UP}
                onPress={onPressSignup}
                isLoading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};
export default SignupScreen;
