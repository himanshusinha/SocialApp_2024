import React, {useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import HeaderComp from '../../components/HeaderComp';
import TextInputComp from '../../components/TextInputComp';
import WrapperContainer from '../../components/WrapperContainer';
import strings from '../../constants/lang';
import TextComp from '../../components/TextComp';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import ButtonComp from '../../components/ButttonComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const isValidData = () => {
    // Your validation logic
    const error = validator({
      email,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    // Your login logic
  };

  return (
    <WrapperContainer>
      <HeaderComp />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <TextComp
                style={styles.headerStyle}
                text={strings.WELCOME_BACK}
              />
              <TextComp
                style={styles.descStyle}
                text={strings.WE_ARE_HAPPY_TO_SEE}
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

              <Text style={styles.forgotPasswordText}>
                {strings.FORGOT_PASSWORD}?
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComp
                text={strings.LOGIN}
                onPress={onLogin}
                isLoading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default LoginScreen;
