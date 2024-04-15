import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(key, value);
}

export async function getData<T>(key: string): Promise<T | null> {
  let val = await AsyncStorage.getItem(key);
  try {
    if (val) {
      return JSON.parse(val) as T;
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
  return null;
}

export async function removeData(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}
