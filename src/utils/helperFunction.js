import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    var jsonValue = value;
    if (typeof value !== 'string') {
      jsonValue = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    return e;
  }
};
