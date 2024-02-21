import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key, value) {
  await AsyncStorage.setItem(key, value);
}
export async function getData(key) {
  let val = await AsyncStorage.getItem(key);
  try {
    if (val) {
      return JSON.parse(val);
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
  return null;
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}
