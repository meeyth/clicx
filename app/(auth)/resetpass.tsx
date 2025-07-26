import { useResetPasswordWithOtpMutation } from '@/features/auth/authApi';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';


const ResetPassScreen = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetPass, { isLoading }] = useResetPasswordWithOtpMutation();

    const { email } = useLocalSearchParams();

    // console.log(email);


    const handleResetPass = async () => {
        try {
            await resetPass({ email, otp, newPassword }).unwrap();
            router.replace('/(auth)');
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
                    <Text className="text-xl font-psemibold text-black">New Password.</Text>
                    <Text className="text-sm font-plight  text-gray-500 mt-1 text-center">
                        Each experience, a story worth sharing.
                    </Text>
                </View>

                {/* OTP */}
                <View className="mb-3">
                    <Text className="text-sm font-plight text-gray-700 mb-1">OTP</Text>
                    <TextInput
                        className="border font-plight border-gray-300 rounded-lg px-4 py-2 text-sm text-black"
                        placeholder="123456"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        value={otp}
                        onChangeText={setOtp}
                    />
                </View>

                {/* New Password */}
                <View className="mb-1">
                    <Text className="text-sm font-plight text-gray-700 mb-1">New Password</Text>
                    <TextInput
                        className="border font-plight border-gray-300 rounded-lg px-4 py-2 text-sm text-black"
                        placeholder="Enter your new password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    className={`bg-black rounded-lg py-3 items-center mb-4 mt-4 ${isLoading ? 'opacity-60' : ''
                        }`}

                    onPress={handleResetPass}
                    disabled={isLoading}
                >
                    <Text className="text-white font-psemibold">
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </Text>
                </TouchableOpacity>

                {/* Sign Up */}


            </View>
        </SafeAreaView>
    );
};

export default ResetPassScreen;
