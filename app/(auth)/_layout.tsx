import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
    const user = useSelector((state: any) => state.auth.user);

    // console.log("Auth Layout");

    if (user) return <Redirect href="/(tabs)" />

    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="index" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="getotp" />
            <Stack.Screen name="resetpass" />
        </Stack>

    )
}

export default AuthLayout