import { useLoginMutation } from '@/features/auth/authApi';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';


const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();


    const handleLogin = async () => {
        try {
            await login({ username, email, password }).unwrap();
            router.replace('/(tabs)');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center px-4">
            <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg">
                {/* Logo and Heading */}
                <View className="items-center mb-6">
                    <View className="w-14 h-14 rounded-full bg-black mb-4 flex justify-center items-center">
                        <Text className="text-3xl text-white font-pextrabold" >C</Text>
                    </View>
                    <Text className="text-xl font-psemibold text-black">Welcome to Clicx.</Text>
                    <Text className="text-sm font-plight  text-gray-500 mt-1 text-center">
                        Each experience, a story worth sharing.
                    </Text>
                </View>

                {/* Username */}
                <View className="mb-3">
                    <Text className="text-sm text-gray-700 font-plight mb-1">Username</Text>
                    <TextInput
                        className="border border-gray-300 font-plight rounded-lg px-4 py-2 text-sm text-black"
                        placeholder="john_doe"
                        placeholderTextColor="#999"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                {/* Email */}
                <View className="mb-3">
                    <Text className="text-sm font-plight text-gray-700 mb-1">Email Address</Text>
                    <TextInput
                        className="border font-plight border-gray-300 rounded-lg px-4 py-2 text-sm text-black"
                        placeholder="john.doe@gmail.com"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password */}
                <View className="mb-1">
                    <Text className="text-sm font-plight text-gray-700 mb-1">Password</Text>
                    <TextInput
                        className="border font-plight border-gray-300 rounded-lg px-4 py-2 text-sm text-black"
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {/* Reset Password */}
                <Link href="/(auth)/getotp" push className="text-right text-xs text-blue-500 font-plight mb-4 mt-1"> Reset Password</Link>

                {/* Login Button */}
                <TouchableOpacity
                    className={`bg-black rounded-lg py-3 items-center mb-4 ${isLoading ? 'opacity-60' : ''
                        }`}

                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <Text className="text-white font-psemibold">
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Text>
                </TouchableOpacity>

                {/* Sign Up */}

                <Text className="text-center text-sm text-gray-600 font-pregular ">
                    New to Clicx?

                    <Link href="/(auth)/signup" push className="text-blue-600 font-pregular"> Sign up</Link>
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
