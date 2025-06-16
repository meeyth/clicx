import { useLoginMutation } from '@/features/auth/authApi';
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
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <View className='flex-1 justify-center items-center'>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title={isLoading ? "Logging in..." : "Login"} onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
