import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import strings from '../../constants/lang';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{strings.HOME}</Text>
    </View>
  );
};

export default HomeScreen;
