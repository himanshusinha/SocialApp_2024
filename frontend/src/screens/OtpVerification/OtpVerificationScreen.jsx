import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import ButtonComp from '../../components/ButttonComp';
import HeaderComp from '../../components/HeaderComp';
import TextComp from '../../components/TextComp';
import OTPTextView from 'react-native-otp-textinput';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import validator from '../../utils/validations';
import {showError, showSucess} from '../../utils/helperFunction';
import {useDispatch} from 'react-redux';
import {OtpVerifyAsyncThunk} from '../../redux/asyncThunk/AsyncThunk';
import {setAuthenticated} from '../../redux/slices/auth_slices';
import navigationStrings from '../../navigations/navigationStrings';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const [timer, setTimer] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const routes = useRoute();
  const email = routes?.params?.email; // Get email from params
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [timer]);

  const isValidData = () => {
    const error = validator({email, otp});
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };
  const onResendCode = () => {
    setTimer(59);
  };
  const onPressOtp = async () => {
    if (!isValidData()) return;

    setIsLoading(true);

    const payload = {email, otp};

    try {
      const res = await dispatch(OtpVerifyAsyncThunk(payload)).unwrap();
      if (!!res?.data) {
        dispatch(setAuthenticated(res.data.token));
        navigation.navigate(navigationStrings.LOGIN_SCREEN);
      }
      setIsLoading(false);
    } catch (error) {
      let errorMessage = 'Invalid otp';
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      showError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <WrapperContainer>
      <HeaderComp />
      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <TextComp
                style={styles.headerStyle}
                text={strings.ENTER_THE_FOUR_DIGIT + ` ${email}`}
              />
              <TextComp
                onPress={() => navigation.goBack()}
                style={styles.descStyle}
                text={strings.EDIT_MY_EMAIL}
              />

              <OTPTextView
                textInputStyle={styles.textInputContainer}
                handleTextChange={setOtp}
                inputCount={4}
                keyboardType="numeric"
                autoFocus
                tintColor={colors.whiteColor}
                offTintColor={colors.whiteColorOpacity40}
              />
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(16),
              }}>
              {timer > 0 ? (
                <TextComp
                  style={{...styles.descStyle, marginBottom: 12}}
                  text={strings.RESEND_CODE + ' In'}>
                  <Text>{timer}</Text>
                </TextComp>
              ) : (
                <TextComp
                  onPress={onResendCode}
                  style={styles.resendCodeStyle}
                  text={strings.RESEND_CODE}
                />
              )}
              <ButtonComp
                text={strings.DONE}
                onPress={onPressOtp}
                isLoading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

export default OtpVerification;
