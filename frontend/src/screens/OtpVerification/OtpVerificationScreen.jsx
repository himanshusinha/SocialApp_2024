//import liraries
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
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import ButtonComp from '../../components/ButttonComp';
import HeaderComp from '../../components/HeaderComp';
import TextComp from '../../components/TextComp';
import OTPTextView from 'react-native-otp-textinput';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const OtpVerification = () => {
  const [otpInput, setOtpInput] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const input = useRef(null);
  const onDone = async () => {};
  const onResendCode = () => {};
  const handleCellTextChange = async (text, i) => {};
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timer]);
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
                text={strings.ENTER_THE_FOUR_DIGIT + ` xyz@gmail.com`}
              />
              <TextComp
                onPress={() => navigation.goBack()}
                style={styles.descStyle}
                text={strings.EDIT_MY_EMAIL}
              />

              <OTPTextView
                ref={input}
                textInputStyle={styles.textInputContainer}
                handleTextChange={setOtpInput}
                handleCellTextChange={handleCellTextChange}
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
                  style={{
                    ...styles.descStyle,
                    marginBottom: 12,
                  }}
                  text={strings.RESEND_CODE + 'In'}>
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
                onPress={onDone}
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
