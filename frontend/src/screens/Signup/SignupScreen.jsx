import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import strings from '../../constants/lang';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import TextComp from '../../components/TextComp';
import TextInputComp from '../../components/TextInputComp';
import ButtonComp from '../../components/ButttonComp';
import styles from './styles';
import {signupAsyncThunk} from '../../redux/asyncThunk/AsyncThunk';
import navigationStrings from '../../navigations/navigationStrings';
import {showError, showSucess} from '../../utils/helperFunction';
import validator from '../../utils/validations';

const SignupScreen = () => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isValidData = () => {
    const error = validator({
      userName,
      fullName,
      email,
      password,
    });

    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onPressSignup = async () => {
    const checkValid = isValidData();

    if (!checkValid) return;

    setIsLoading(true);

    const payload = {
      userName,
      fullName,
      email,
      password,
    };

    try {
      const res = await dispatch(signupAsyncThunk(payload)).unwrap();

      setIsLoading(false);
      showSucess('Signup successful!'); 
      navigation.navigate(navigationStrings.OTP_VERIFICATION_SCREEN);
    } catch (error) {
      let errorMessage = 'User already exists';
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
                onChangeText={setUserName}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <TextInputComp
                value={fullName}
                placeholder={strings.FULL_NAME}
                onChangeText={setFullName}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <TextInputComp
                value={email}
                placeholder={strings.EMAIL}
                onChangeText={setEmail}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <TextInputComp
                value={password}
                placeholder={strings.PASSWORD}
                onChangeText={setPassword}
                secureTextEntry={secureText}
                secureText={secureText ? strings.SHOW : strings.HIDE}
                onPressSecure={() => setSecureText(!secureText)}
                autoCapitalize={'none'}
                autoCorrect={false}
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
