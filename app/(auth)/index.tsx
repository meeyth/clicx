import { useLoginMutation } from '@/features/auth/authApi';
import { navigate } from 'expo-router/build/global-state/routing';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';



const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async () => {
        try {
            await login({ username, email, password }).unwrap();
            navigate("/(tabs)");
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <View className="flex-1 justify-center items-center">
            <TextInput placeholder="Username" placeholderTextColor="#000000" value={username} onChangeText={setUsername} className="text-amber-700" />
            <TextInput placeholder="Email" placeholderTextColor="#000000" value={email} onChangeText={setEmail} className="text-amber-700" />
            <TextInput placeholder="Password" placeholderTextColor="#000000" value={password} onChangeText={setPassword} secureTextEntry className="text-amber-700" />
            <Button title={isLoading ? "Logging in..." : "Login"} onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
