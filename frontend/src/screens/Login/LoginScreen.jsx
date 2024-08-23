import React, {useState} from 'react';
import {View, Text, Keyboard, TouchableWithoutFeedback} from 'react-native';
import HeaderComp from '../../components/HeaderComp';
import TextInputComp from '../../components/TextInputComp';
import WrapperContainer from '../../components/WrapperContainer';
import strings from '../../constants/lang';
import TextComp from '../../components/TextComp';
import ButtonComp from '../../components/ButttonComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {loginAsyncThunk} from '../../redux/asyncThunk/AsyncThunk';
import validator from '../../utils/validations';
import {showError, showSucess} from '../../utils/helperFunction';
import {useDispatch} from 'react-redux';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isValidData = () => {
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

  const onPressLogin = async () => {
    const checkValid = isValidData();

    if (!checkValid) return;

    setIsLoading(true);

    const payload = {
      email,
      password,
    };

    try {
      const res = await dispatch(loginAsyncThunk(payload)).unwrap();
      await setToken(res.data.token, '.....token');
      setIsLoading(false);
      showSucess('Login successful!');
    } catch (error) {
      let errorMessage = 'Invalid email or password';
      setIsLoading(false);

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.log('Error raised:', error);
      showError(errorMessage);
      setIsLoading(false);
    }
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
                autoCapitalize={'none'}
                autoCorrect={false}
              />

              <TextInputComp
                value={password}
                placeholder={strings.PASSWORD}
                onChangeText={value => setPassword(value)}
                secureTextEntry={secureText}
                secureText={secureText ? strings.SHOW : strings.HIDE}
                onPressSecure={() => setSecureText(!secureText)}
                autoCapitalize={'none'}
                autoCorrect={false}
              />

              <Text style={styles.forgotPasswordText}>
                {strings.FORGOT_PASSWORD}?
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComp
                text={strings.LOGIN}
                onPress={onPressLogin}
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
