import React, {useEffect} from 'react';
import {Text, StyleSheet, Dimensions, View, Image} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const AnimatedToast = ({message, visible, duration = 3000, type}) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(-150, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });

      setTimeout(() => {
        translateY.value = withTiming(150, {
          duration: 300,
          easing: Easing.in(Easing.ease),
        });
      }, duration);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <Animated.View style={[styles.toastContainer, animatedStyle]}>
      <View
        style={[
          styles.sideBar,
          {
            backgroundColor:
              type == 'SUCCESS'
                ? '#bcf7cc'
                : type == 'ERROR'
                ? '#f7bcbc'
                : type == 'WARNING'
                ? '#f7d6bc'
                : '#bcc9f7',
          },
        ]}></View>
      <View
        style={[
          styles.circle,
          {
            backgroundColor:
              type == 'SUCCESS'
                ? '#bcf7cc'
                : type == 'ERROR'
                ? '#f7bcbc'
                : type == 'WARNING'
                ? '#f7d6bc'
                : '#bcc9f7',
          },
        ]}>
        <Image
          source={
            type == 'SUCCESS'
              ? require('../assets/images/success.png')
              : type == 'ERROR'
              ? require('../assets/images/error.png')
              : type == 'WARNING'
              ? require('../assets/images/warning.png')
              : require('../assets/images/info.png')
          }
          style={styles.toastIcon}
        />
      </View>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: -60,
    marginHorizontal: 20,
    width: width - 40,
    alignContent: 'center',
    height: 70,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: {x: 2, y: 2},
    zIndex: 1000,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toastText: {
    color: '#000',
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 16,
  },
  sideBar: {
    width: 5,
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastIcon: {
    width: 16,
    height: 16,
  },
});

export default AnimatedToast;
