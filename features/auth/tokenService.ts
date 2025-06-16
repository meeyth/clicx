import AsyncStorage from '@react-native-async-storage/async-storage';

const REFRESH_TOKEN_KEY = 'refreshToken';

export const getRefreshToken = async () => {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = async (token: string) => {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeRefreshToken = async () => {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
};
