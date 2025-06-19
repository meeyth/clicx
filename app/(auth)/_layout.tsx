import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
    const user = useSelector(state => state.auth.user);

    if (user) return <Redirect href="/(tabs)" />

    return (
        <Stack screenOptions={{ headerShown: false }} />
    )
}

export default AuthLayout